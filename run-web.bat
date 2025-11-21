@echo off

:: 设置系统编码为GBK
chcp 936 > nul

:: 运行前端服务
echo 运行前端服务
cd "Web"
:: pnpm install
pnpm run dev
pause