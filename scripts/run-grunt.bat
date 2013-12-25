@echo off
echo Starting Grunt
echo -------------------------------------------------------------------
REM Windows script for running grunt
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - grunt (npm install -g grunt)
set BASE_DIR=%~dp0
grunt --gruntfile "%BASE_DIR%..\config\gruntfile.js" --base "%BASE_DIR%.." %*
