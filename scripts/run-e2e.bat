@echo off
echo Starting e2e Tests
echo -------------------------------------------------------------------
set BASE_DIR=%~dp0
protractor "%BASE_DIR%..\config\protractor.conf.js" %*