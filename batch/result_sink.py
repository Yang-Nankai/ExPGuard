# result_sink.py
import sqlite3
import threading
import queue
import time
from pathlib import Path
from typing import Dict, Set


class AsyncSQLiteSink:
    """
    High-performance async SQLite sink
    """

    INSERT_SQL = """
    INSERT OR REPLACE INTO results (
        extension_id,
        version,
        status,
        duration,
        error_message,
        peak_memory_mb
    )
    VALUES (
        :extension_id,
        :version,
        :status,
        :duration,
        :error_message,
        :peak_memory_mb
    )
    """

    def __init__(self, db_path: str):
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)

        self.queue = queue.Queue()
        self.running = True
        self._completed_cache: Set[str] = set()

        self._init_db()
        self._load_cache()

        self.worker = threading.Thread(
            target=self._writer_loop,
            daemon=True
        )
        self.worker.start()

    # -------------------------
    # DB init & cache
    # -------------------------

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("PRAGMA journal_mode=WAL;")
            conn.execute("""
            CREATE TABLE IF NOT EXISTS results (
                extension_id TEXT,
                version TEXT,
                status TEXT,
                duration REAL,
                error_message TEXT,
                peak_memory_mb REAL,
                PRIMARY KEY (extension_id, version)
            )
            """)

    def _load_cache(self):
        with sqlite3.connect(self.db_path) as conn:
            for ext_id, version in conn.execute(
                "SELECT extension_id, version FROM results WHERE status = 'success'"
            ):
                self._completed_cache.add(f"{ext_id}:{version}")

    # -------------------------
    # Public API
    # -------------------------

    def is_processed(self, extension_id: str, version: str) -> bool:
        return f"{extension_id}:{version}" in self._completed_cache

    def save_result(self, result: Dict):
        """
        Non-blocking enqueue
        """
        result.setdefault("error_message", None)
        result.setdefault("duration", None)
        result.setdefault("peak_memory_mb", None)
        result.setdefault("attempt", 1)

        self.queue.put(result)

        # only success marks completion
        if result.get("status") == "success":
            self._completed_cache.add(
                f"{result['extension_id']}:{result['version']}"
            )


    def close(self):
        self.running = False
        self.worker.join()

    # -------------------------
    # Writer loop
    # -------------------------

    def _writer_loop(self):
        conn = sqlite3.connect(self.db_path, check_same_thread=False)
        cur = conn.cursor()

        batch = []
        last_commit = time.time()

        while self.running or not self.queue.empty():
            try:
                item = self.queue.get(timeout=1.0)
                batch.append(item)
            except queue.Empty:
                pass

            if (
                len(batch) >= 100 or
                (batch and time.time() - last_commit >= 3)
            ):
                try:
                    cur.executemany(self.INSERT_SQL, batch)
                    conn.commit()
                    batch.clear()
                    last_commit = time.time()
                except Exception as e:
                    print(f"[DB] write error: {e}")

        if batch:
            try:
                cur.executemany(self.INSERT_SQL, batch)
                conn.commit()
            except Exception as e:
                print(f"[DB] final write error: {e}")

        conn.close()
