#!/bin/sh
# Bandwidth Usage Setup - TomatoUSB Version
#
# Cron Utility
# add:    cru a <unique id> <"min hour day month week command">
#		min (0 - 59)
#		hour (0 - 23)
#		day (1 - 31)
#		month (1 - 12)
#		week (0 - 6) (Sunday=0)
# delete: cru d <unique id>
# list:   cru l


BWDIR=/mnt/Asus-RT-N16/logs
BWMON=$BWDIR/bwmon.sh

case ${1} in
"install" )
	cru a bwmon_setup "* * * * * $BWMON setup $BWDIR"
	cru a bwmon_update "0,30 * * * * $BWMON update $BWDIR"
	;;
"remove" )
	cru d bwmon_update
	cru d bwmon_setup
	;;
*)
	echo "Usage : $0 {install|remove}"
	echo "Examples : "
	echo "	$0 install"
	echo "	$0 remove"
	exit
	;;
esac

