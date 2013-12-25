#!/bin/bash
echo ""
echo "Starting Grunt"
echo "-------------------------------------------------------------------"
BASE_DIR=`dirname $0`
grunt --gruntfile $BASE_DIR/../config/gruntfile.js" --base $BASE_DIR/.. %*
