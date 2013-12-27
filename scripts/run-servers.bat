@echo off
set BASE_DIR=%~dp0
REM
echo Starting e2e Tests
echo -------------------------------------------------------------------
echo Starting Selenium Server
REM
start "selenium" webdriver-manager start
REM
echo Starting HTTP Server
echo -------------------------------------------------------------------
start "http-server" http-server "%BASE_DIR%..\app" -p 8080
