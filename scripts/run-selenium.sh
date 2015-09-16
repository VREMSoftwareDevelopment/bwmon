#!/bin/sh
WEBDRIVER=node_modules/webdriver-manager/bin/webdriver-manager

$WEBDRIVER update --standalone
$WEBDRIVER start

