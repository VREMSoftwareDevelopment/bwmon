@echo off

set BASE_DIR=%~dp0
set SELENIUM=selenium
set HTTPSERVER=http-server

taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq %HTTPSERVER% - %BASE_DIR%run-%HTTPSERVER%"
taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq %SELENIUM% - %BASE_DIR%run-%SELENIUM%"

start "%SELENIUM%" %BASE_DIR%run-%SELENIUM%
start "%HTTPSERVER%" %BASE_DIR%run-%HTTPSERVER%

call gulp %*

taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq %HTTPSERVER% - %BASE_DIR%run-%HTTPSERVER%"
taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq %SELENIUM% - %BASE_DIR%run-%SELENIUM%"
