#!/bin/bash
# 脚本名称：Vue3项目初始化脚本
# 功能：检查Node版本+安装依赖+初始化.env文件

# 定义颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 第一步：检查Node.js是否安装
if ! command -v node &> /dev/null; then
  echo -e "${RED}错误：未安装Node.js，请先安装（推荐16+版本）${NC}"
  exit 1
fi

# 检查Node版本（最低要求16.x）
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ $NODE_VERSION -lt 16 ]; then
  echo -e "${YELLOW}警告：Node版本为v$(node -v)，推荐升级到16+版本${NC}"
else
  echo -e "${GREEN}Node版本检测通过：v$(node -v)${NC}"
fi

# 第二步：检查package.json
if [ ! -f "package.json" ]; then
  echo -e "${RED}错误：当前目录不是Vue3项目根目录${NC}"
  exit 1
fi

# 第三步：安装依赖（优先npm，也可替换为yarn/pnpm）
echo -e "${YELLOW}开始安装项目依赖...${NC}"
npm install
# 若用pnpm：pnpm install
# 若用yarn：yarn install

# 检查依赖安装是否成功
if [ $? -eq 0 ]; then
  echo -e "${GREEN}子包依赖安装成功！${NC}"
else
  echo -e "${RED}子包依赖安装失败！请检查网络或package.json${NC}"
  exit 1
fi

# 第四步：初始化环境变量文件（若项目有.env.example，复制为.env）
if [ -f ".env.example" ] && [ ! -f ".env" ]; then
  cp .env.example .env
  echo -e "${GREEN}环境变量初始化成功：已从.env.example复制为.env${NC}"
elif [ -f ".env" ]; then
  echo -e "${YELLOW}环境变量文件.env已存在，无需初始化${NC}"
else
  echo -e "${YELLOW}未找到.env.example，跳过环境变量初始化${NC}"
fi

# 第五步：输出初始化完成信息
echo -e "${YELLOW}====================================${NC}"
echo -e "${GREEN}子包初始化完成！${NC}"
echo -e "${YELLOW}====================================${NC}"

# 脚本名称：Vue3项目打包脚本
# 功能：一键打包多环境，生成打包日志，检查打包结果

# 检查package.json
if [ ! -f "package.json" ]; then
  echo -e "${RED}错误：当前目录不是Vue3项目根目录${NC}"
  exit 1
fi

# 定义配置（可修改：prod=生产，test=测试，dev=开发）
BUILD_ENV=prod
# 打包日志保存路径（自动生成当前时间戳，避免覆盖）
LOG_FILE="build_log_$(date +%Y%m%d_%H%M%S).log"

# 输出打包信息
echo -e "${YELLOW}====================================${NC}"
echo -e "${GREEN}Vue3子包项目打包中...${NC}"
echo -e "${GREEN}打包环境：${BUILD_ENV}${NC}"
echo -e "${YELLOW}====================================${NC}"

npm run build


# 检查打包是否成功
if [ $? -eq 0 ]; then
  # 检查打包目录是否存在（Vite默认dist，Cli默认dist，一致）
  if [ -d "dist" ]; then
    echo -e "${GREEN}====================================${NC}"
    echo -e "${GREEN}子包打包成功！打包目录：./options/dist${NC}"
    echo -e "${GREEN}即将开始初始化主包${NC}"
    echo -e "${GREEN}====================================${NC}"
  else
    echo -e "${RED}打包命令执行成功，但未找到dist目录！${NC}"
    exit 1
  fi
else
  echo -e "${RED}====================================${NC}"
  echo -e "${RED}子包打包失败${NC}"
  echo -e "${RED}====================================${NC}"
  exit 1
fi