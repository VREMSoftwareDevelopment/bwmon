#!/bin/bash
echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"
BASE_DIR=`dirname $0`
karma/bin/karma start $BASE_DIR/../config/karma.conf.js $*
