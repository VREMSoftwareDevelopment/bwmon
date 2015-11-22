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

BWDIR=${2}
[ -z "${2}" ] && BWDIR=$(pwd)
BWMON=$BWDIR/bwmon.sh
BWMONWWW=/tmp/var/wwwext/bwmon

case ${1} in
"install" )
	cru a bwmon_setup "* * * * * $BWMON setup $BWDIR"
	cru a bwmon_update "1,31 * * * * $BWMON update $BWDIR"
	ln -s $BWDIR $BWMONWWW
	;;
"remove" )
	rm -f $BWMONWWW
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
