##Bandwidth Usage Monitor

A simple shell script designed to run on linux powered routers

![Sample Usage by User Screenshot](https://github.com/VREMSoftwareDevelopment/bwmon/raw/master/screenshots/UsageByUserData.jpg "Sample Usage by User Screenshot")

###Software Features:
- Designed to run on linux based routers such as: [Tomato](https://en.wikipedia.org/wiki/Tomato_firmware), [OpenWrt](https://en.wikipedia.org/wiki/OpenWrt), [DD-WRT](https://en.wikipedia.org/wiki/DD-WRT), etc
- Provides per user bandwidth usage monitoring
- Generates bandwidth usage reports per user/month/year

###Technical Features:
- Shell script to collect bandwidth usage and to generate JSON data structure.
- Web Based GUI to display bandwidth usage
- Web Based GUI is using Bootstrap and AngularJS

##*Installation instructions:*
- Make sure that you have a harddisk or USB flash drive attached to router and it is formated and mounted.
- Log into your router via *ssh*.
- To install application type the following command in *ssh* terminal:
	- `cd /mnt/<mounted_name>/`
	- `mkdir bwmon`
	- `cd bwmon`
	- `wget https://github.com/VREMSoftwareDevelopment/bwmon/releases/download/v2.2/bwmon.tar.gz`
	- `tar -xzvf bwmon.tar.gz`
	- `chmod +x *.sh`
	- `./bwmon-cron.sh install`
- Visit `http://<your_router_ip>/user/bwmon/index.html` to view bandwidth usage statistics.
- To setup bandwidth usage monitor to start automatically after router reboots add the following to autostart script on mount: `./mnt/<mounted_ name>/bwmon/bwmon-cron.sh install`

###Usage:
`./bwmon-cron.sh {install|remove}` - shell script to install or remove bandwidth usage monitor from cron jobs

######Note:
- Problem using `wget`:
	- *error getting response: Connection reset by peer* - add the following option `--no-check-certificate`
	- Or download the file from the web-site and copy to the folder.

##*Build Instructions:*
- Install NodeJS
- Install Gulp and Bower: `npm install -g gulp bower`
- Create project: `git clone https://github.com/VREMSoftwareDevelopment/bwmon.git`
- Install required node modules: `npm install`
- Build application: `gulp`

###Gulp tasks:
- `gulp` #Places a fully optimized application (minified, concatenated, and more) in `/dist`
- `gulp build`  #Same as `gulp`
- `gulp webserver` #This will run a server with sample data on `http://localhost:8080`
- `gulp unit` #Run local unit tests.
- `gulp unit_auto` #This will run a test with watch.
- `gulp e2e` #Run local e2e tests.
- `gulp coverage` #Create unit test coverage report in `/logs/PhantomJS...`

