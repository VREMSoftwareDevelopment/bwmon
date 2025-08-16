[![Workflow Status](https://github.com/VREMSoftwareDevelopment/bwmon/workflows/CI/badge.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/actions?query=workflow%3A%22CI%22)
[![Release CI](https://github.com/VREMSoftwareDevelopment/bwmon/workflows/Release-CI/badge.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/actions?query=workflow%3A%22Release-CI%22)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4bc1d97a37564d63acf4e9e02dd06615)](https://app.codacy.com/gh/VREMSoftwareDevelopment/bwmon?utm_source=github.com&utm_medium=referral&utm_content=VREMSoftwareDevelopment/bwmon&utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/VREMSoftwareDevelopment/bwmon/branch/main/graph/badge.svg?token=qoDvVAvNaw)](https://codecov.io/gh/VREMSoftwareDevelopment/bwmon)

[![Issues](https://img.shields.io/github/issues/VREMSoftwareDevelopment/bwmon.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/issues)
[![Star](https://img.shields.io/github/stars/VREMSoftwareDevelopment/bwmon.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/stargazers)
[![Fork](https://img.shields.io/github/forks/VREMSoftwareDevelopment/bwmon.svg)](https://github.com/VREMSoftwareDevelopment/bwmon/network)

# Bandwidth Monitor

A simple shell script designed to run on [AsusWRT-Merlin](https://www.asuswrt-merlin.net/) powered routers

![Sample Usage by User Screenshot](https://github.com/VREMSoftwareDevelopment/bwmon/raw/main/screenshots/UsageByUserData.jpg 'Sample Usage by User Screenshot')

[Try a demo version of this application](https://vremsoftwaredevelopment.github.io/bwmon)

---

## Table of Contents

-   [Bandwidth Monitor](#bandwidth-monitor)
-   [Table of Contents](#table-of-contents)
-   [Software Features](#software-features)
-   [Technical Features](#technical-features)
-   [Project Structure](#project-structure)
-   [Requirements](#requirements)
-   [Installation instructions](#installation-instructions)
-   [Note](#note)
-   [Build Instructions](#build-instructions)
-   [Contributing](#contributing)
-   [License](#license)

## Software Features

-   Per-user bandwidth monitoring
-   Usage reports by user/month/year

## Technical Features

-   Shell script for data collection
-   Web-based GUI for visualization

## Project Structure

```
react/         # Frontend React app (web GUI)
server/        # Shell scripts and server-side install files
screenshots/   # Example screenshots
scripts/       # Release and utility scripts
README.md      # Project documentation
LICENSE        # License file
```

## Requirements

-   AsusWRT-Merlin powered router (see [AsusWRT-Merlin](https://www.asuswrt-merlin.net/))
-   Hard disk or USB flash drive attached, formatted, and mounted
-   Node.js (for building the web GUI)

## Installation instructions:

-   Make sure that you have a harddisk or USB flash drive attached to router and it is formatted and mounted
-   Log into your router via _ssh_
-   To install application type the following command in _ssh_ terminal:
    -   `cd /mnt/<mounted_name>/`
    -   `mkdir bwmon`
    -   `cd bwmon`
    -   `wget https://github.com/VREMSoftwareDevelopment/bwmon/releases/download/v3.1.4/bwmon.tar.gz`
    -   `tar -xzvf bwmon.tar.gz`
    -   `chmod +x server/install.sh`
    -   `./server/install.sh`
-   Visit `http://<your_router_ip>:<lighttpd_port>/bwmon/index.html` to view bandwidth usage statistics

## Note:

-   Problem using `wget`:
    -   _error getting response: Connection reset by peer_ - add the following option `--no-check-certificate`
    -   Or download the file from the web-site and copy to the folder

## Build Instructions:

-   Install node: see [https://nodejs.org](https://nodejs.org)
-   Clone the project: `git clone https://github.com/VREMSoftwareDevelopment/bwmon.git`
-   See detailed build and installation instructions in the `react` subfolder's [README.md](react/README.md) file.

## Reports

View the latest test and analysis reports:

-   [Coverage Report](https://vremsoftwaredevelopment.github.io/bwmon/reports/coverage/lcov-report/index.html)
-   [Mutation Report](https://vremsoftwaredevelopment.github.io/bwmon/reports/mutation/mutation.html)
-   [Playwright Report](https://vremsoftwaredevelopment.github.io/bwmon/reports/playwright/html/index.html)
-   [Duplication Report](https://vremsoftwaredevelopment.github.io/bwmon/reports/duplication/index.html)

## Contributing

Contributions are welcome! Please open issues or submit pull requests via GitHub. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the terms of the [Apache License 2.0](LICENSE).
