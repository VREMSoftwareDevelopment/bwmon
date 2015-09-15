@echo off

set BASE_DIR=%~dp0

taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq selenium - %BASE_DIR%run-selenium"
taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq http-server - %BASE_DIR%run-http-server"

start "selenium" %BASE_DIR%run-selenium
start "http-server" %BASE_DIR%run-http-server

grunt --gruntfile "%BASE_DIR%..\config\gruntfile.js" --base "%BASE_DIR%.." %*

taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq selenium - %BASE_DIR%run-selenium"
taskkill /FI "Imagename eq cmd.exe" /FI "Windowtitle eq http-server - %BASE_DIR%run-http-server"
