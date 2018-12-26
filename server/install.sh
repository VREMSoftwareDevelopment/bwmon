#!/bin/sh
# Bandwidth Usage Installation
# AsusWRT-Merlin Version
#
set -e
echo ""
echo " Bandwidth Usage Installation "
echo ""
echo " Please make sure the following is done before continue"
echo "    - install entware or optware"
echo "       https://github.com/Entware/Entware"
echo "       https://github.com/Optware/Optware-ng"
echo "    - install lighttpd"
echo "       https://www.lighttpd.net"
echo ""
read -p "Press [Enter] key continue or [^C] abort..."
echo ""
echo " Installing..."
chmod +x bwmon.sh
chmod +x uninstall.sh
chmod +x S80bwmon
mkdir -p /opt/share/bwmon
mkdir -p /opt/share/www/bwmon
mkdir -p /opt/share/www/bwmon/js
mkdir -p /opt/share/www/bwmon/css
cp -f bwmon.sh /opt/share/bwmon/.
cp -f S80bwmon /opt/etc/init.d/.
cp -f sample-lighttpd-index.html /opt/share/www/.
cp -f favicon.ico /opt/share/www/bwmon/.
cp -f index.html /opt/share/www/bwmon/.
cp -f js/* /opt/share/www/bwmon/js/.
cp -f css/* /opt/share/www/bwmon/css/.
echo " Done..."
echo " Starting bwmon service..."
/opt/etc/init.d/S80bwmon restart
echo " Visit 'http://<your_router_ip>:<lighttpd_port>/bwmon/index.html' to view bandwidth usage statistics"
