import json
import threading
import copy
from datetime import datetime
from typing import List, Optional
import requests
from models import BatchStatistics

class FeishuWebhookNotifier:
    HEADERS = {"Content-Type": "application/json"}

    def __init__(self, webhook_url: str, interval: int = 60):
        self.webhook_url = webhook_url
        self.interval = interval
        self._stop_event = threading.Event()
        self._thread: Optional[threading.Thread] = None
        self._last_stats: Optional[BatchStatistics] = None

    def start(self, stats_ref: BatchStatistics, lock: threading.Lock):
        """启动定时发送线程"""
        if not self.webhook_url:
            return

        self._stop_event.clear()
        # 立即发送一条开始消息
        self.send_notification(stats_ref, title="🚀 ESAT Batch Analysis Started")

        def _loop():
            while not self._stop_event.is_set():
                if self._stop_event.wait(self.interval):
                    break
                
                current_stats = None
                with lock:
                    current_stats = copy.copy(stats_ref)
                
                self.send_notification(current_stats, title="🔄 ESAT Batch Progress")

        self._thread = threading.Thread(target=_loop, daemon=True)
        self._thread.start()

    def stop(self, stats_ref: BatchStatistics):
        """停止定时发送并发送最终报告"""
        if not self.webhook_url:
            return

        self._stop_event.set()
        if self._thread:
            self._thread.join(timeout=5)
        
        self.send_notification(stats_ref, title="✅ ESAT Batch Analysis Completed")

    def send_notification(self, stats: BatchStatistics, title: str = None) -> bool:
        if not self.webhook_url:
            return False

        payload = {
            "msg_type": "text",
            "content": {
                "text": self._build_message(stats, title)
            },
        }

        try:
            resp = requests.post(
                self.webhook_url,
                headers=self.HEADERS,
                data=json.dumps(payload),
                timeout=10,
            )
            resp.raise_for_status()
            return True
        except Exception as e:
            print(f"Webhook send failed: {e}")
            return False

    def _build_message(self, stats: BatchStatistics, title: str = None) -> str:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        head = title if title else "🚀 ESAT Batch Analysis Update"

        # 使用 get_completed_count() 方法而不是 completed 属性
        completed_count = stats.get_completed_count()
        
        lines: List[str] = [
            head,
            f"🕒 Time: {now}",
        ]

        if stats.total > 0:
            progress_percentage = (completed_count / stats.total) * 100
            lines.append(
                f"📊 Progress: {progress_percentage:.1f}% "
                f"({completed_count}/{stats.total})"
            )

        if stats.start_time:
            end = stats.end_time if stats.end_time else datetime.now()
            elapsed = (end - stats.start_time).total_seconds()
            
            # 估算剩余时间
            if completed_count > 0 and not stats.end_time:
                avg_time = elapsed / completed_count
                remaining = stats.total - completed_count
                eta_seconds = remaining * avg_time
                eta_str = f"{eta_seconds/60:.1f}m" if eta_seconds > 60 else f"{eta_seconds:.0f}s"
                lines.append(f"⏱ Duration: {elapsed/60:.1f}m (ETA: {eta_str})")
            else:
                lines.append(f"⏱ Duration: {elapsed:.1f}s")
        
        if stats.processing > 0:
             lines.append(f"⚡ Processing: {stats.processing} threads active")

        lines.extend([
            "",
            "📈 Details:",
            f"✅ Success: {stats.success}",
            f"❌ Failed: {stats.failed}",
            f"⏭️ Skipped: {stats.skipped}",
            f"⌛ Timeout: {stats.timeout}",
            f"💥 OOM: {stats.memory_exceeded}",
            f"❗ Error: {stats.error}"
        ])
        
        return "\n".join(lines)