"""
Data model definitions - 修复版本
"""

from dataclasses import dataclass, field, asdict
from datetime import datetime
from typing import Dict, List, Optional, Any
from config import ProcessStatus


@dataclass
class ExtensionInfo:
    """Extension information"""
    extension_id: str
    version: str
    crx_path: str
    name: Optional[str] = None
    description: Optional[str] = None
    byte_size: Optional[int] = None
    source: str = "unknown"
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class ProcessResult:
    """Processing result"""
    extension_id: str
    version: str
    status: ProcessStatus
    start_time: datetime
    end_time: Optional[datetime] = None
    duration: Optional[float] = None
    output_path: Optional[str] = None
    error_message: Optional[str] = None
    exit_code: Optional[int] = None
    memory_used_mb: Optional[float] = None
    node_output: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    
    def complete(self, status: ProcessStatus, error_message: str = None):
        """Mark the processing as completed"""
        self.end_time = datetime.now()
        self.duration = (self.end_time - self.start_time).total_seconds()
        self.status = status
        if error_message:
            self.error_message = error_message

    def to_dict(self) -> Dict[str, Any]:
        """Convert result to dict (JSON serializable)"""
        data = asdict(self)

        # Enum → value
        if hasattr(self.status, "value"):
            data["status"] = self.status.value

        # datetime → isoformat
        if self.start_time:
            data["start_time"] = self.start_time.isoformat()
        if self.end_time:
            data["end_time"] = self.end_time.isoformat()

        return data


@dataclass
class BatchStatistics:
    """Batch processing statistics"""
    total: int = 0
    pending: int = 0
    processing: int = 0
    success: int = 0
    failed: int = 0
    timeout: int = 0
    memory_exceeded: int = 0
    error: int = 0
    skipped: int = 0
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    duration: Optional[float] = None
    
    def get_completed_count(self) -> int:
        """Get the number of completed tasks"""
        return (
            self.success
            + self.failed
            + self.skipped
        )
    
    @property
    def completed(self) -> int:
        """只读的 completed 属性"""
        return self.get_completed_count()
    
    @property
    def progress_percentage(self) -> float:
        """Get progress percentage"""
        if self.total == 0:
            return 0.0
        return (self.get_completed_count() / self.total) * 100

    def update_from_results(self, results: List[ProcessResult]):
        """Update statistics from a list of results"""
        counts = {
            ProcessStatus.PENDING: 0,
            ProcessStatus.PROCESSING: 0,
            ProcessStatus.SUCCESS: 0,
            ProcessStatus.FAILED: 0,
            ProcessStatus.TIMEOUT: 0,
            ProcessStatus.MEMORY_EXCEEDED: 0,
            ProcessStatus.ERROR: 0,
            ProcessStatus.SKIPPED: 0
        }
        
        for result in results:
            counts[result.status] += 1
        
        self.pending = counts[ProcessStatus.PENDING]
        self.processing = counts[ProcessStatus.PROCESSING]
        self.success = counts[ProcessStatus.SUCCESS]
        self.failed = counts[ProcessStatus.FAILED]
        self.timeout = counts[ProcessStatus.TIMEOUT]
        self.memory_exceeded = counts[ProcessStatus.MEMORY_EXCEEDED]
        self.error = counts[ProcessStatus.ERROR]
        self.skipped = counts[ProcessStatus.SKIPPED]
        self.total = sum(counts.values())

    def to_dict(self) -> Dict[str, Any]:
        """Convert statistics to dictionary"""
        return {
            "total": self.total,
            "pending": self.pending,
            "processing": self.processing,
            "success": self.success,
            "failed": self.failed,
            "timeout": self.timeout,
            "memory_exceeded": self.memory_exceeded,
            "error": self.error,
            "skipped": self.skipped,
            "completed": self.get_completed_count(),
            "progress_percentage": self.progress_percentage,
            "start_time": self.start_time.isoformat() if self.start_time else None,
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "duration": self.duration
        }