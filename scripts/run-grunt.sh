#!/bin/sh

BASEDIR=$(dirname $0)
SELENIUM=selenium
HTTPSERVER=http-server

gnome-terminal -x $BASEDIR/run-$SELENIUM.sh
gnome-terminal -x $BASEDIR/run-$HTTPSERVER.sh
grunt --gruntfile $BASEDIR/../config/gruntfile.js --base $BASEDIR/.. "$@"

pkill -f $SELENIUM
pkill -f $HTTPSERVER



