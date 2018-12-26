#!/bin/sh
# Bandwidth Usage Uninstall
# AsusWRT-Merlin Version
#
set -e
echo ""
echo " Bandwidth Usage Uninstall "
echo ""
read -p "Press [Enter] key continue or [^C] abort..."
echo ""
echo " Stopping bwmon service..."
/opt/etc/init.d/S80bwmon stop
echo " Removing..."
rm -rf /opt/share/bwmon
rm -rf /opt/share/www/bwmon
rm -rf /opt/share/www/sample-lighttpd-index.html
rm -rf /opt/etc/init.d/S80bwmon
echo " Done..."
