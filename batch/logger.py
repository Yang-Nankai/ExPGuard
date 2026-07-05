"""
Logger
"""

import json
import logging
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, List
from dataclasses import asdict

from models import ProcessResult, BatchStatistics
from config import ProcessStatus


class BatchLogger:
    """Batch processing logger"""

    def __init__(self, log_dir: str):
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(parents=True, exist_ok=True)

        # Set log files
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.batch_log_file = self.log_dir / f"batch_{timestamp}.log"
        self.detailed_log_file = self.log_dir / f"detailed_{timestamp}.jsonl"

        # Initialize logging
        self._setup_logging()

    def _setup_logging(self):
        """Configure logging"""
        # Create custom logger
        self.logger = logging.getLogger("ESATBatch")
        self.logger.setLevel(logging.INFO)

        # Prevent duplicate handlers
        if self.logger.handlers:
            return

        # File handler
        file_handler = logging.FileHandler(self.batch_log_file)
        file_handler.setLevel(logging.INFO)

        # Console handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO)

        # Formatter
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)

        # Add handlers
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

    def log_progress(self, stats: BatchStatistics):
        elapsed_sec = (datetime.now() - stats.start_time).total_seconds()
        elapsed_sec = max(elapsed_sec, 1e-6)  # avoid division by zero

        done = stats.get_completed_count()

        # speed: extensions per minute
        speed_per_min = done / elapsed_sec * 60

        self.logger.info(
            f"Progress: {done}/{stats.total} | "
            f"Duration={elapsed_sec:.2f}s "
            f"Success={stats.success} "
            f"Failed={stats.failed} "
            f"Timeout={stats.timeout} "
            f"OOM={stats.memory_exceeded} "
            f"Error={stats.error} "
            f"Skipped={stats.skipped} | "
            f"{speed_per_min:.2f} ext/min"
        )

    def log_summary(self, stats: BatchStatistics):
        duration = (
            stats.end_time - stats.start_time
        ).total_seconds()

        self.logger.info("=" * 60)
        self.logger.info("BATCH PROCESSING SUMMARY")
        self.logger.info(f"Duration: {duration:.1f}s")
        self.logger.info(f"Total: {stats.total}")
        self.logger.info(f"Success: {stats.success}")
        self.logger.info(f"Failed: {stats.failed}")
        self.logger.info(f"Timeout: {stats.timeout}")
        self.logger.info(f"OOM: {stats.memory_exceeded}")
        self.logger.info(f"Error: {stats.error}")
        self.logger.info(f"Skipped: {stats.skipped}")
        self.logger.info("=" * 60)