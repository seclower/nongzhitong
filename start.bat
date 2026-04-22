@echo off
title 农智通 - 启动中
cd /d "%~dp0backend"
echo ========================================
echo    农智通农技服务平台
echo ========================================
echo.
echo 正在安装依赖（首次运行）...
npm install
if errorlevel 1 (
    echo.
    echo [错误] 依赖安装失败，请检查Node.js是否正确安装
    pause
    exit /b 1
)
echo.
echo ========================================
echo    依赖安装完成，正在启动服务...
echo ========================================
echo.
npm start