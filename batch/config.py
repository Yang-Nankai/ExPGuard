import os
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
from typing import Any, Dict


PROJECT_ROOT = Path(__file__).resolve().parents[1]


class ProcessStatus(Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SUCCESS = "success"
    FAILED = "failed"
    TIMEOUT = "timeout"
    MEMORY_EXCEEDED = "memory_exceeded"
    ERROR = "error"
    SKIPPED = "skipped"


@dataclass
class DefaultConfig:
    TIMEOUT: int = 630
    MAX_WORKERS: int = min(4, os.cpu_count() or 1)
    MEMORY_LIMIT_MB: int = 4096
    PROGRESS_INTERVAL: int = 100
    NODE_PATH: str = "node"
    WEBHOOK_URL: str = "https://open.feishu.cn/open-apis/bot/v2/hook/7482d140-53c1-41bd-ac32-47e1ad89abf1"
    WEBHOOK_INTERVAL: int = 60
    MAX_RETRIES: int = 1
    LOG_DIR: str = str(PROJECT_ROOT / "logs")
    OUTPUT_DIR: str = str(PROJECT_ROOT / "output")
    ESAT_PATH: str = str(PROJECT_ROOT / "dist" / "main.js")

    _config_overrides: Dict[str, Any] = field(default_factory=dict)

    def __getattribute__(self, name):
        overrides = object.__getattribute__(self, "_config_overrides")
        if name in overrides:
            return overrides[name]
        return object.__getattribute__(self, name)

    def set(self, name, value):
        self._config_overrides[name] = value

    def validate(self):
        if self.MAX_WORKERS < 1:
            self.set("MAX_WORKERS", 1)
            print(f"WARNING: MAX_WORKERS cannot be less than 1, set to {self.MAX_WORKERS}")

        if self.TIMEOUT < 1:
            self.set("TIMEOUT", 1)
            print(f"WARNING: TIMEOUT cannot be less than 1, set to {self.TIMEOUT}")

        if self.MEMORY_LIMIT_MB < 100:
            self.set("MEMORY_LIMIT_MB", 100)
            print(f"WARNING: MEMORY_LIMIT_MB cannot be less than 100MB, set to {self.MEMORY_LIMIT_MB}")

        if self.MAX_RETRIES < 0:
            self.set("MAX_RETRIES", 0)
            print(f"WARNING: MAX_RETRIES cannot be negative, set to {self.MAX_RETRIES}")

        try:
            os.makedirs(self.LOG_DIR, exist_ok=True)
            os.makedirs(self.OUTPUT_DIR, exist_ok=True)

            esat_path = Path(self.ESAT_PATH)
            if not esat_path.is_absolute():
                candidates = [
                    (Path.cwd() / esat_path).resolve(),
                    (PROJECT_ROOT / esat_path).resolve(),
                    (Path(__file__).resolve().parent / esat_path).resolve(),
                ]
                for candidate in candidates:
                    if candidate.exists():
                        self.set("ESAT_PATH", str(candidate))
                        break
                else:
                    print(f"WARNING: ESAT_PATH does not exist: {self.ESAT_PATH}")
            elif not esat_path.exists():
                print(f"WARNING: ESAT_PATH does not exist: {self.ESAT_PATH}")

        except Exception as e:
            print(f"ERROR: Failed to validate config: {e}")
            raise


config = DefaultConfig()
