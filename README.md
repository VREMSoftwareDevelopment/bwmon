##Bandwidth Usage Monitor

A simple shell script designed to run on linux powered routers

![Sample Usage by User Screenshot](https://github.com/VREMSoftwareDevelopment/bwmon/raw/master/screenshots/UsageByUserData.jpg "Sample Usage by User Screenshot")

####*Software Features:*
- Designed to run on linux based routers such as: [Tomato](https://en.wikipedia.org/wiki/Tomato_firmware), [OpenWrt](https://en.wikipedia.org/wiki/OpenWrt), [DD-WRT](https://en.wikipedia.org/wiki/DD-WRT), etc
- Provides per user bandwidth usage monitoring
- Generates bandwidth usage reports per user/month/year

####*Technical Features:*
- Shell script to collect bandwidth usage and to generate JSON data structure.
- Web Based GUI to display bandwidth usage
- Web Based GUI is using Bootstrap and AngularJS

####*Installation instructions:*
- Make sure that you have a harddisk or USB flash drive attached to router and it is formated and mounted.
- Log into your router via *ssh*.
- In *ssh* terminal type the following:
  1. `cd /mnt/<mounted name>/` - go to mounted folder
  2. `mkdir bwmon` - make bandwidth usage monitor folder
  3. `cd bwmon`  - go to bandwidth usage monitor folder
  4. `wget https://github.com/VREMSoftwareDevelopment/bwmon/releases/download/v2.1/bwmon.tar.gz` - get software from github
  5. `tar -xzvf bwmon.tar.gz` - extract the software
  6. `chmod +x *.sh` - make all shell script executable
  7. `./bwmon-cron.sh install` - install bandwidth usage monitor
- Visit `http://<your_router_ip>/user/bwmon/index.html` to view bandwidth usage statistics.
- To setup bandwidth usage monitor to start automatically after router reboot add the following to autostart this script on mount: `./mnt/<mounted name>/bwmon/bwmon-cron.sh install`

####*Usage:*
`./bwmon-cron.sh {install|remove}` - shell script to install or remove bandwidth usage monitor from cron jobs
