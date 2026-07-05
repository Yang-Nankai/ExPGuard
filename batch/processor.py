import os
import re
import sys
import time
import signal
import subprocess
import threading
import psutil
from typing import Dict, Optional
from contextlib import contextmanager
from config import ProcessStatus
from utils import tail_text

# =========================
# Platform detection
# =========================

IS_WINDOWS = sys.platform.startswith("win")
CHROME_EXTENSION_ID_RE = re.compile(r"^[a-p]{32}$")

# =========================
# Process kill utilities
# =========================

def kill_process_tree(pid: int):
    """
    Kill process and all its children (cross-platform, best effort)
    """
    try:
        if IS_WINDOWS:
            # Windows: must use taskkill to kill process tree
            subprocess.run(
                ["taskkill", "/F", "/T", "/PID", str(pid)],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
        else:
            # Unix: kill process group
            os.killpg(pid, signal.SIGKILL)
    except Exception:
        # Fallback: psutil recursive kill
        try:
            p = psutil.Process(pid)
            for c in p.children(recursive=True):
                try:
                    c.kill()
                except Exception:
                    pass
            p.kill()
        except Exception:
            pass


# =========================
# Memory monitor
# =========================

@contextmanager
def memory_monitor(
    pid: int,
    memory_limit_mb: int,
    poll_interval: float = 0.5,
):
    """
    Monitor RSS memory usage of a process.
    Kill process tree once memory limit exceeded.
    """
    stop_event = threading.Event()
    exceeded = threading.Event()
    max_memory = 0.0

    def _monitor():
        nonlocal max_memory
        try:
            proc = psutil.Process(pid)
            while not stop_event.is_set():
                try:
                    rss_mb = proc.memory_info().rss / 1024 / 1024
                    max_memory = max(max_memory, rss_mb)

                    if rss_mb > memory_limit_mb:
                        exceeded.set()
                        kill_process_tree(pid)
                        return
                    time.sleep(poll_interval)
                except psutil.NoSuchProcess:
                    return
        except Exception:
            return

    t = threading.Thread(target=_monitor, daemon=True)
    t.start()

    try:
        yield exceeded, lambda: max_memory
    finally:
        stop_event.set()
        t.join(timeout=1.0)


# =========================
# Main worker entry
# =========================

def analyze_extension_task(
    extension: Dict,
    esat_path: str,
    node_path: str,
    output_dir: str,
    timeout: int,
    memory_limit_mb: int,
) -> Dict:
    """
    Analyze a single extension.
    """

    start_ts = time.time()

    ext_id = extension.get("extension_id", "unknown")
    version = extension.get("version", "unknown")
    crx_path = extension.get("crx_path", "")

    result = {
        "extension_id": ext_id,
        "version": version,
        "status": ProcessStatus.ERROR.value,
        "duration": None,
        "error_message": None,
    }

    # -------------------------
    # Validate input
    # -------------------------

    if not crx_path or not os.path.exists(crx_path):
        result.update(
            status=ProcessStatus.FAILED.value,
            error_message=f"CRX file not found: {crx_path}",
        )
        end_ts = time.time()
        result["duration"] = end_ts - start_ts
        return result

    ext_output_dir = os.path.join(output_dir, ext_id, version)
    os.makedirs(ext_output_dir, exist_ok=True)

    # -------------------------
    # Build command
    # -------------------------

    cmd = [
        node_path,
        esat_path,
        "analyze",
        "--type=crx",
        f"--input={crx_path}",
        f"--out={ext_output_dir}",
        f"--extension-version={version}",
    ]

    if CHROME_EXTENSION_ID_RE.fullmatch(ext_id):
        cmd.append(f"--id={ext_id}")

    env = os.environ.copy()
    env["NODE_OPTIONS"] = f"--max-old-space-size={memory_limit_mb}"

    # -------------------------
    # Platform-specific spawn
    # -------------------------

    creationflags = 0
    preexec_fn = None

    if IS_WINDOWS:
        creationflags = subprocess.CREATE_NEW_PROCESS_GROUP
    else:
        preexec_fn = os.setsid

    proc: Optional[subprocess.Popen] = None

    try:
        proc = subprocess.Popen(
            cmd,
            stdout=subprocess.DEVNULL,   # avoid pipe blocking
            stderr=subprocess.PIPE,      # keep stderr for diagnostics
            env=env,
            text=True,
            errors="replace",
            creationflags=creationflags,
            preexec_fn=preexec_fn,
        )

        with memory_monitor(proc.pid, memory_limit_mb) as (mem_exceeded, max_mem):
            try:
                _, stderr = proc.communicate(timeout=timeout)
                exit_code = proc.returncode

                if mem_exceeded.is_set():
                    result.update(
                        status=ProcessStatus.MEMORY_EXCEEDED.value,
                        error_message=f"Memory exceeded (> {memory_limit_mb}MB)",
                        peak_memory_mb=max_mem()
                    )
                elif exit_code == 0:
                    result.update(
                        status=ProcessStatus.SUCCESS.value,
                        peak_memory_mb=max_mem()
                    )
                else:
                    stderr_tail = tail_text(stderr, 2000)
                    message = f"Exit code {exit_code}"
                    if stderr_tail:
                        message = f"{message}: {stderr_tail}"
                    result.update(
                        status=ProcessStatus.FAILED.value,
                        error_message=message,
                        peak_memory_mb=max_mem()
                    )

            except subprocess.TimeoutExpired:
                kill_process_tree(proc.pid)
                result.update(
                    status=ProcessStatus.TIMEOUT.value,
                    error_message=f"Timeout after {timeout}s",
                    peak_memory_mb=max_mem()
                )

    except Exception as e:
        result.update(
            status=ProcessStatus.ERROR.value,
            error_message=str(e),
            peak_memory_mb=None
        )

    finally:
        if proc and proc.poll() is None:
            kill_process_tree(proc.pid)

    end_ts = time.time()
    result["duration"] = end_ts - start_ts

    return result
