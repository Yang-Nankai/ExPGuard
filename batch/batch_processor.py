# batch_processor.py
import threading
import traceback
from concurrent.futures import ProcessPoolExecutor, wait, FIRST_COMPLETED
from dataclasses import asdict
from datetime import datetime
from typing import Iterator, Optional

from result_sink import AsyncSQLiteSink
from processor import analyze_extension_task
from config import DefaultConfig, ProcessStatus, config
from models import BatchStatistics, ExtensionInfo
from webhook import FeishuWebhookNotifier
from logger import BatchLogger


class BatchProcessor:
    def __init__(
        self,
        logger: BatchLogger,
        datasource: Iterator[ExtensionInfo],
        sink: AsyncSQLiteSink,
        webhook_notifier: Optional[FeishuWebhookNotifier] = None,
        max_workers: int = None,
        timeout: int = None,
    ):
        self.logger = logger
        self.datasource = datasource
        self.sink = sink
        self.webhook = webhook_notifier

        self.max_workers = max_workers or DefaultConfig.MAX_WORKERS
        self.timeout = timeout or DefaultConfig.TIMEOUT

        self.stats = BatchStatistics()
        self.lock = threading.Lock()
        self._stop_event = threading.Event()

    # -------------------------
    # Public entry
    # -------------------------

    def process(self):
        self.stats.start_time = datetime.now()

        if self.webhook:
            self.webhook.start(self.stats, self.lock)

        try:
            return self._process_batch()
        except Exception as e:
            self.logger.logger.error(f"Batch failed: {e}")
            self.logger.logger.debug(traceback.format_exc())
            raise
        finally:
            self._cleanup()

    # -------------------------
    # Core loop
    # -------------------------

    def _process_batch(self):
        inflight = {}
        stream = self.datasource

        with ProcessPoolExecutor(max_workers=self.max_workers) as pool:
            for _ in range(min(self.max_workers * 2, 100)):
                if not self._submit_next(stream, pool, inflight):
                    break

            self.logger.logger.info(
                f"Task pool primed with {len(inflight)} workers"
            )

            while inflight and not self._stop_event.is_set():
                done, _ = wait(
                    inflight.keys(),
                    timeout=1.0,
                    return_when=FIRST_COMPLETED,
                )

                for fut in done:
                    ext = inflight.pop(fut)
                    self._handle_done(fut, ext)
                    self._submit_next(stream, pool, inflight)

        return self.stats

    # -------------------------
    # Task submission
    # -------------------------

    def _submit_next(self, stream, pool, inflight) -> bool:
        try:
            while True:
                ext = next(stream)

                if self.sink.is_processed(ext.extension_id, ext.version):
                    with self.lock:
                        self.stats.skipped += 1
                        self.stats.total += 1
                    continue

                fut = pool.submit(
                    analyze_extension_task,
                    asdict(ext),
                    config.ESAT_PATH,
                    config.NODE_PATH,
                    config.OUTPUT_DIR,
                    self.timeout,
                    config.MEMORY_LIMIT_MB,
                )

                inflight[fut] = ext

                with self.lock:
                    self.stats.total += 1
                    self.stats.processing += 1

                return True

        except StopIteration:
            return False
        except Exception as e:
            self.logger.logger.error(f"Submit error: {e}")
            self.logger.logger.debug(traceback.format_exc())
            raise

    # -------------------------
    # Completion handling
    # -------------------------

    def _handle_done(self, fut, ext):
        try:
            result = fut.result() 
            self.sink.save_result(result)

            status = ProcessStatus(result["status"])
            self._update_stats(status)

            if self.stats.get_completed_count() % DefaultConfig.PROGRESS_INTERVAL == 0:
                self.logger.log_progress(self.stats)

        except Exception as e:
            self.logger.logger.error(
                f"Unhandled worker error ({ext.extension_id}): {e}"
            )
            self.logger.logger.debug(traceback.format_exc())
            with self.lock:
                self.stats.failed += 1
                self.stats.error += 1
                self.stats.processing -= 1

    # -------------------------
    # Statistics
    # -------------------------

    def _update_stats(self, status: ProcessStatus):
        with self.lock:
            self.stats.processing -= 1

            if status == ProcessStatus.SUCCESS:
                self.stats.success += 1
            elif status == ProcessStatus.TIMEOUT:
                self.stats.timeout += 1
                self.stats.failed += 1
            elif status == ProcessStatus.MEMORY_EXCEEDED:
                self.stats.memory_exceeded += 1
                self.stats.failed += 1
            else:
                self.stats.failed += 1
                self.stats.error += 1

    # -------------------------
    # Clean
    # -------------------------

    def _cleanup(self):
        self.stats.end_time = datetime.now()
        if self.stats.start_time:
            self.stats.duration = (
                self.stats.end_time - self.stats.start_time
            ).total_seconds()

        if self.webhook:
            self.webhook.stop(self.stats)

        self.sink.close()
        self.logger.log_summary(self.stats)


    def stop(self):
        self._stop_event.set()
