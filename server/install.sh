#!/bin/sh
# Bandwidth Usage Installation
# AsusWRT-Merlin Version
#
echo ""
echo " Bandwidth Usage Installation "
echo ""
echo " Please make sure the following is done before continue this process"
echo ""
read -p "Press [Enter] key continue..."
echo ""
echo " Installing..."
chmod +x bwmon.sh
chmod +x S80bwmon
cp -f bwmon.sh /opt/share/bwmon/. 
cp -f S80bwmon /opt/etc/init.d/.
cp -f sample-lighttpd-index.html /opt/share/www/. 
cp -f bwmonUsage.js /opt/share/www/bwmon/. 
cp -f favicon.ico /opt/share/www/bwmon/. 
cp -f index.html /opt/share/www/bwmon/. 
cp -f js /opt/share/www/bwmon/. 
cp -f css /opt/share/www/bwmon/. 
