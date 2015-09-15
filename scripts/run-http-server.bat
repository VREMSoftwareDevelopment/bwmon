@echo off
echo Starting HTTP Server
echo -------------------------------------------------------------------
set BASE_DIR=%~dp0
node_modules\.bin\http-server "%BASE_DIR%..\app" -p 8080
