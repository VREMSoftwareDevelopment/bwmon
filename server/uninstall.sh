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
exit 0 
