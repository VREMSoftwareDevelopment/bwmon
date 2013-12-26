@echo off
echo Starting Grunt
echo -------------------------------------------------------------------
set BASE_DIR=%~dp0
grunt --gruntfile "%BASE_DIR%..\config\gruntfile.js" --base "%BASE_DIR%.." %*