@echo off
set BASE_DIR=%~dp0
REM
REM Kill servers previously started
taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq selenium - %BASE_DIR%run-selenium"
taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq http-server - %BASE_DIR%run-http-server"
REM
REM Start servers
start "selenium" %BASE_DIR%run-selenium
start "http-server" %BASE_DIR%run-http-server
REM
REM Start Grunt
echo -------------------------------------------------------------------
grunt --gruntfile "%BASE_DIR%..\config\gruntfile.js" --base "%BASE_DIR%.." %*
