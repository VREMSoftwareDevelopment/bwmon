#!/bin/sh
#
#     Copyright (C) 2010 - 2018 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
#
#     Licensed under the Apache License, Version 2.0 (the "License");
#     you may not use this file except in compliance with the License.
#     You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#     Unless required by applicable law or agreed to in writing, software
#     distributed under the License is distributed on an "AS IS" BASIS,
#     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#     See the License for the specific language governing permissions and
#     limitations under the License.
# 
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
exit 0 
