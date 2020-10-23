#
#     Copyright (C) 2010 - 2020 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
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
# Bandwidth Usage Monitor Installation
# AsusWRT-Merlin Version
#
#!/bin/sh
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
chmod +x server/bwmon.sh
chmod +x server/uninstall.sh
chmod +x server/S80bwmon
mkdir -p /opt/share/bwmon
mkdir -p /opt/share/www/bwmon
cp -f server/bwmon.sh /opt/share/bwmon/.
cp -f server/S80bwmon /opt/etc/init.d/.
cp -f server/sample-lighttpd-index.html /opt/share/www/.
cp -av react/build/* /opt/share/www/bwmon
echo " Done..."
echo " Starting bwmon service..."
/opt/etc/init.d/S80bwmon restart
echo " Visit 'http://<your_router_ip>:<lighttpd_port>/bwmon/index.html' to view bandwidth usage statistics"
exit 0 
