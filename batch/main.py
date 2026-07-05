#!/usr/bin/env python3
"""
ESAT Batch Processing Program
"""

import argparse
import sys
import os
import signal
import traceback
import re
from pathlib import Path

from config import DefaultConfig, config
from datasources import FolderDataSource, ExtSpiderDataSource
from logger import BatchLogger
from webhook import FeishuWebhookNotifier
from batch_processor import BatchProcessor
from result_sink import AsyncSQLiteSink

def parse_arguments():
    parser = argparse.ArgumentParser(
        description="ESAT Batch Processing for Chrome Extensions",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )

    # data source
    src_group = parser.add_mutually_exclusive_group(required=True)
    src_group.add_argument("--folder", type=str, 
                         help="Local folder path containing .crx files")
    src_group.add_argument("--groups-root", type=str,
                         help="Root directory containing multiple group folders (processed sequentially)")
    src_group.add_argument("--extspider-db", type=str, 
                         help="ExtSpider sqlite database path")
    parser.add_argument("--group-pattern", type=str,
                       default="group_*",
                       help="Glob pattern used to match group folders under --groups-root")

    # output
    parser.add_argument("--output-dir", type=str, 
                       default=DefaultConfig.OUTPUT_DIR,
                       help="Directory for analysis results")
    parser.add_argument("--log-dir", type=str, 
                       default=DefaultConfig.LOG_DIR,
                       help="Directory for logs")

    # performance
    parser.add_argument("--max-workers", type=int, 
                       default=DefaultConfig.MAX_WORKERS,
                       help="Number of parallel worker processes")
    parser.add_argument("--timeout", type=int, 
                       default=DefaultConfig.TIMEOUT,
                       help="Timeout per extension in seconds")
    parser.add_argument("--memory-limit", type=int, 
                       default=DefaultConfig.MEMORY_LIMIT_MB,
                       help="Memory limit per worker in MB")

    # webhook
    parser.add_argument("--webhook-url", type=str,
                       default=DefaultConfig.WEBHOOK_URL,
                       help="Feishu webhook URL for notifications")

    return parser.parse_args()

def setup_environment(args):
    """设置运行环境"""
    # 验证和创建目录
    for dir_path in [args.output_dir, args.log_dir]:
        Path(dir_path).mkdir(parents=True, exist_ok=True)
    
    # 动态配置覆盖
    if args.webhook_url:
        config.set("WEBHOOK_URL", args.webhook_url)
    
    config.set("OUTPUT_DIR", args.output_dir)
    config.set("LOG_DIR", args.log_dir)
    config.set("MAX_WORKERS", args.max_workers)
    config.set("TIMEOUT", args.timeout)
    config.set("MEMORY_LIMIT_MB", args.memory_limit)
    
    # 验证配置
    config.validate()

def create_data_source(args):
    """创建数据源"""
    if args.folder:
        print(f"Using folder source: {args.folder}")
        return FolderDataSource(args.folder).get_extensions()
    elif args.groups_root:
        print(
            f"Using grouped folder source: {args.groups_root} "
            f"(pattern: {args.group_pattern})"
        )
        return create_grouped_folder_stream(args.groups_root, args.group_pattern)
    else:
        print(f"Using ExtSpider database: {args.extspider_db}")
        return ExtSpiderDataSource(args.extspider_db).get_extensions()

def _natural_sort_key(path_obj: Path):
    # Keep group ordering intuitive: group_2 before group_10.
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path_obj.name)]

def create_grouped_folder_stream(groups_root: str, pattern: str):
    root = Path(groups_root)
    if not root.exists() or not root.is_dir():
        raise FileNotFoundError(f"Group root does not exist or is not a directory: {groups_root}")

    group_dirs = sorted(
        [p for p in root.glob(pattern) if p.is_dir()],
        key=_natural_sort_key,
    )
    if not group_dirs:
        raise FileNotFoundError(
            f"No group folders matched under {groups_root} with pattern '{pattern}'"
        )

    print(f"Discovered {len(group_dirs)} group folders")

    def _stream():
        for idx, group_dir in enumerate(group_dirs, start=1):
            print(f"[{idx}/{len(group_dirs)}] Processing group folder: {group_dir}")
            source = FolderDataSource(str(group_dir))
            try:
                for ext in source.get_extensions():
                    yield ext
            except FileNotFoundError as e:
                # Skip empty/invalid group folders and continue with next group.
                print(f"WARNING: Skip group folder {group_dir}: {e}")

    return _stream()

def main():
    args = parse_arguments()
    
    try:
        # 1. 环境设置
        setup_environment(args)
        
        # 2. 初始化日志
        logger = BatchLogger(args.log_dir)
        logger.logger.info("ESAT Batch Processor Starting...")
        
        # 3. 初始化数据源
        extensions_stream = create_data_source(args)

        # 4. 初始化结果存储
        db_sink_path = os.path.join(args.output_dir, "results.sqlite")
        sink = AsyncSQLiteSink(db_sink_path)
        
        # 5. 初始化 Webhook
        webhook = None
        if config.WEBHOOK_URL:
            webhook = FeishuWebhookNotifier(
                webhook_url=config.WEBHOOK_URL,
                interval=config.WEBHOOK_INTERVAL
            )
            logger.logger.info("Webhook notifications enabled")

        # 6. 信号处理
        def signal_handler(sig, frame):
            print("\nReceived shutdown signal. Stopping gracefully...")
            # 这里可以添加更优雅的关闭逻辑
            sys.exit(0)
        
        signal.signal(signal.SIGINT, signal_handler)
        signal.signal(signal.SIGTERM, signal_handler)
        
        # 7. 创建处理器
        processor = BatchProcessor(
            logger=logger,
            datasource=extensions_stream,
            sink=sink,
            webhook_notifier=webhook,
            max_workers=args.max_workers,
            timeout=args.timeout
        )
        
        logger.logger.info(f"Starting processing with {args.max_workers} workers...")
        
        # 8. 开始处理
        stats = processor.process()
        
        # 9. 根据结果决定退出码
        if stats.failed + stats.error > 0:
            logger.logger.warning(f"Processing completed with {stats.failed + stats.error} failures")
            return 1
        else:
            logger.logger.info("Processing completed successfully")
            return 0
            
    except KeyboardInterrupt:
        print("\nProcessing interrupted by user")
        return 130
    except Exception as e:
        print(f"Critical error: {e}")
        traceback.print_exc()
        return 2
    finally:
        # 确保资源清理
        if 'sink' in locals():
            sink.close()
        print("Processing completed.")

if __name__ == "__main__":
    sys.exit(main())
    

# 跑全量
# python3 main.py --groups-root /home/yangxin/expguard/data --output-dir /home/yangxin/expguard/new_output --max-workers 30 --timeout 630

# 跑部分
# python3 main.py --groups-root /home/yangxin/expguard/data --group-pattern group_1* --output-dir /home/yangxin/expguard/new_output --max-workers 30 --timeout 630

