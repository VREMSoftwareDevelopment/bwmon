#!/bin/sh

BASEDIR=$(dirname $0)
SELENIUM=selenium
HTTPSERVER=http-server

if ps a | grep -v grep | grep $SELENIUM >/dev/null
then
  echo $SELENIUM is running.
else
  gnome-terminal -x $BASEDIR/run-$SELENIUM.sh
fi

if ps a | grep -v grep | grep $HTTPSERVER >/dev/null
then
  echo $HTTPSERVER is running.
else
  gnome-terminal -x $BASEDIR/run-$HTTPSERVER.sh
fi

grunt --gruntfile $BASEDIR/../config/gruntfile.js --base $BASEDIR/.. "$@"

pkill -f $SELENIUM
pkill -f $HTTPSERVER



