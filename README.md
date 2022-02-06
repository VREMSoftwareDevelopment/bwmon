[![Workflow Status](https://github.com/VREMSoftwareDevelopment/bwmon/workflows/TestsWithCoverage/badge.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/actions?query=workflow%3A%22TestsWithCoverage%22)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4bc1d97a37564d63acf4e9e02dd06615)](https://app.codacy.com/gh/VREMSoftwareDevelopment/bwmon?utm_source=github.com&utm_medium=referral&utm_content=VREMSoftwareDevelopment/bwmon&utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/VREMSoftwareDevelopment/bwmon/branch/master/graph/badge.svg?token=qoDvVAvNaw)](https://codecov.io/gh/VREMSoftwareDevelopment/bwmon)

[![Issues](https://img.shields.io/github/issues/VREMSoftwareDevelopment/bwmon.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/issues)
[![Star](https://img.shields.io/github/stars/VREMSoftwareDevelopment/bwmon.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/stargazers)
[![Fork](https://img.shields.io/github/forks/VREMSoftwareDevelopment/bwmon.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/network)

## Bandwidth Monitor

A simple shell script designed to run on [AsusWRT-Merlin](https://www.asuswrt-merlin.net/) powered routers

![Sample Usage by User Screenshot](https://github.com/VREMSoftwareDevelopment/bwmon/raw/master/screenshots/UsageByUserData.jpg 'Sample Usage by User Screenshot')

[Try a demo version of this application](https://vremsoftwaredevelopment.github.io/bwmon)

### Software Features:

-   Designed to run on [AsusWRT-Merlin](https://asuswrt.lostrealm.ca) powered routers
-   Provides per user Bandwidth Monitoring
-   Generates bandwidth usage reports per user/month/year

### Technical Features:

-   Shell script to collect bandwidth usage and to generate data file.
-   Web Based GUI to display bandwidth usage

### _Installation instructions:_

-   Make sure that you have a harddisk or USB flash drive attached to router and it is formated and mounted.
-   Log into your router via _ssh_.
-   To install application type the following command in _ssh_ terminal:
    -   `cd /mnt/<mounted_name>/`
    -   `mkdir bwmon`
    -   `cd bwmon`
    -   `wget https://github.com/VREMSoftwareDevelopment/bwmon/releases/download/v3.0.6/bwmon.tar.gz`
    -   `tar -xzvf bwmon.tar.gz`
    -   `chmod +x server/install.sh`
    -   `./server/install.sh`
-   Visit `http://<your_router_ip>:<lighttpd_port>/bwmon/index.html` to view bandwidth usage statistics.

### Note:

-   Problem using `wget`:
    -   _error getting response: Connection reset by peer_ - add the following option `--no-check-certificate`
    -   Or download the file from the web-site and copy to the folder.

### _Build Instructions:_

-   Install node: see [https://nodejs.org](https://nodejs.org)
-   Create project: `git clone https://github.com/VREMSoftwareDevelopment/bwmon.git`
-   Go to react subfolder
-   Install required node modules: `npm install`
-   See README.md in react subfolder
