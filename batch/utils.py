import json
from typing import Any, Dict, List
from pathlib import Path
from datetime import datetime

def save_results(results: List[Dict], filepath: str):
    """Save results to a JSON file"""
    filepath = Path(filepath)
    filepath.parent.mkdir(parents=True, exist_ok=True)
    
    with open(filepath, 'w') as f:
        json.dump(results, f, indent=2, default=str)

def load_results(filepath: str) -> List[Dict]:
    """Load results from a JSON file"""
    filepath = Path(filepath)
    
    if not filepath.exists():
        return []
    
    with open(filepath, 'r') as f:
        return json.load(f)

def format_duration(seconds: float) -> str:
    """Format a duration given in seconds"""
    if seconds < 60:
        return f"{seconds:.1f} seconds"
    elif seconds < 3600:
        minutes = seconds / 60
        return f"{minutes:.1f} minutes"
    else:
        hours = seconds / 3600
        return f"{hours:.1f} hours"

def get_timestamp() -> str:
    """Get the current timestamp as a string"""
    return datetime.now().strftime("%Y%m%d_%H%M%S")

def ensure_directory(dirpath: str) -> Path:
    """Ensure that a directory exists"""
    path = Path(dirpath)
    path.mkdir(parents=True, exist_ok=True)
    return path


def tail_text(text: str, limit: int = 200) -> str:
    """Return the last `limit` characters of text"""
    if not text:
        return ""
    return text[-limit:]
