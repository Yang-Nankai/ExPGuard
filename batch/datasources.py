import os
import sqlite3
from abc import ABC, abstractmethod
from pathlib import Path
from typing import List, Optional, Iterator
from models import ExtensionInfo

class DataSource(ABC):
    @abstractmethod
    def get_extensions(self) -> Iterator[ExtensionInfo]:
        raise NotImplementedError

class ExtSpiderDataSource(DataSource):
    def __init__(self, db_path: str):
        self.db_path = db_path

    def get_extensions(self) -> Iterator[ExtensionInfo]:
        if not Path(self.db_path).exists():
            raise FileNotFoundError(f"Database file not found: {self.db_path}")

        conn = None
        try:
            conn = sqlite3.connect(self.db_path, check_same_thread=False)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            
            query = """
            SELECT extension_id, version, crx_path, byte_size 
            FROM extensions 
            WHERE crx_path IS NOT NULL AND crx_path != ''
            """
            
            cursor.execute(query)
            
            batch_size = 1000
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                    
                for row in rows:
                    yield ExtensionInfo(
                        extension_id=row["extension_id"],
                        version=row["version"],
                        crx_path=row["crx_path"],
                        byte_size=row["byte_size"],
                        source="extspider"
                    )
                    
        except Exception as e:
            print(f"Error reading from database: {e}")
            raise
        finally:
            if conn:
                conn.close()

class FolderDataSource(DataSource):
    def __init__(self, folder_path: str):
        self.folder_path = Path(folder_path)
        
    def get_extensions(self) -> Iterator[ExtensionInfo]:
        if not self.folder_path.exists():
            raise FileNotFoundError(f"Folder does not exist: {self.folder_path}")
        
        crx_files = list(self.folder_path.rglob("*.crx"))
        if not crx_files:
            raise FileNotFoundError(f"No CRX files found in: {self.folder_path}")
        
        for crx_file in crx_files:
            try:
                filename = crx_file.stem
                
                # 解析扩展ID和版本
                if len(filename) > 32 and filename[32] == '.':
                    ext_id, ver = filename[:32], filename[33:]
                else:
                    # 如果格式不符合预期，使用文件名作为ID
                    ext_id, ver = filename, "unknown"
                
                yield ExtensionInfo(
                    extension_id=ext_id,
                    version=ver,
                    crx_path=str(crx_file.absolute()),
                    byte_size=crx_file.stat().st_size,
                    source="folder"
                )
            except Exception as e:
                print(f"Error processing file {crx_file}: {e}")
                continue