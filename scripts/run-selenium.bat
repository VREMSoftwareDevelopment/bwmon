@echo off
echo Starting Selenium Server
echo -------------------------------------------------------------------
set WEBDRIVER=node_modules\.bin\webdriver-manager

call %WEBDRIVER% update --standalone
%WEBDRIVER% start
