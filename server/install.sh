#!/bin/sh
#
#     Copyright (C) 2010 - 2025 VREM Software Development <VREMSoftwareDevelopment@gmail.com>
#
#     Licensed under the Apache License, Version 2.0 (the "License");
#     you may not use this file except in compliance with the License.
#     You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#     Unless required by applicable law or agreed to in writing, software
#     distributed under the License is distributed on an "AS IS"BASIS,
#     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#     See the License for the specific language governing permissions and
#     limitations under the License.
# 
# Bandwidth Monitor Installation
# AsusWRT-Merlin Version
#
set -e
echo "...Bandwidth Usage Installation..."
if opkg print-architecture > /dev/null 2>&1; then
    echo "Entware is installed"
else
    echo "Please install entware!"
    echo "https://github.com/Entware/Entware"
    exit 1
fi
if [ ! -x /opt/sbin/lighttpd ] || ! opkg list-installed lighttpd > /dev/null 2>&1; then
    echo "Installing lighttpd (Entware build) ..."
    opkg install lighttpd
else
    echo "lighttpd (Entware) is already installed"
fi
if ! bc -v >/dev/null 2>&1; then
    echo "Installing bc ..."
    opkg install bc
else
    echo "bc is installed"
fi
if (type fc >/dev/null 2>&1 || command -v fc >/dev/null 2>&1); then
    if fc status >/dev/null 2>&1; then
        echo "Flow Cache will be disabled ..."
        fc disable
        fc flush
    fi
fi
echo "Installing bwmon ..."
chmod +x server/bwmon.sh
chmod +x server/uninstall.sh
chmod +x server/S80bwmon
mkdir -p /opt/share/bwmon
mkdir -p /opt/share/www/bwmon
cp -fv server/bwmon.sh /opt/share/bwmon/.
cp -fv server/S80bwmon /opt/etc/init.d/.
cp -fv server/sample-lighttpd-index.html /opt/share/www/.
cp -auv react/build/* /opt/share/www/bwmon
echo "Done..."
echo "Starting bwmon service..."
/opt/etc/init.d/S80bwmon restart
echo "Please configure lighttpd 'server.port'"
echo " https://www.lighttpd.net"
echo " /opt/etc/lighttpd/lighttpd.conf"
echo " /opt/etc/init.d/./S80lighttpd restart"
echo "Visit 'http://<your_router_ip>:<lighttpd_port>/bwmon' to view bandwidth usage statistics"
exit 0 
