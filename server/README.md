# Bandwidth Monitor Server Scripts

Shell scripts for bandwidth monitoring on AsusWRT-Merlin routers.

## Files

| File | Purpose |
|------|---------|
| bwmon.sh | Core monitoring script - uses iptables to count traffic |
| S80bwmon | Init script - manages cron jobs for scheduled updates |
| install.sh | Installer - sets up dependencies and copies files |
| uninstall.sh | Clean removal of all installed files |
| sample-lighttpd-index.html | Sample landing page for lighttpd |

## Requirements

- [AsusWRT-Merlin](https://www.asuswrt-merlin.net/) router
- [Entware](https://github.com/Entware/Entware) package manager
- lighttpd web server (installed automatically)
- bc calculator (installed automatically)

## How It Works

### Data Collection

1. **iptables chain** (`RRDIPT`) counts bytes per IP address
2. **Cron job** runs every 30 minutes to collect data
3. **ARP table** (`/proc/net/arp`) identifies connected devices
4. **User resolution** maps MAC/IP to usernames via:
   - `/etc/hosts.dnsmasq`
   - `/etc/dnsmasq/hosts/hosts`
   - `/etc/hosts`
   - NVRAM `custom_clientlist`

### Data Flow

```
Router Traffic
      │
      ▼ (iptables RRDIPT chain)
bwmon.sh update
      │
      ▼ (writes)
usage.db ──► lighttpd ──► React Frontend
```

## Commands

### bwmon.sh

```bash
bwmon.sh setup <path>    # Create iptables rules
bwmon.sh update <path>   # Collect data and publish
bwmon.sh publish <path>  # Publish without collecting
```

### S80bwmon (Service)

```bash
/opt/etc/init.d/S80bwmon start    # Start cron jobs
/opt/etc/init.d/S80bwmon stop     # Stop cron jobs
/opt/etc/init.d/S80bwmon restart  # Restart service
/opt/etc/init.d/S80bwmon check    # List active cron jobs
```

## Cron Schedule

| Job | Frequency | Purpose |
|-----|-----------|---------|
| bwmon_setup | Every 1 minute | Ensure iptables rules exist |
| bwmon_update | Every 30 minutes | Collect and publish data |

## Data Format

### Input Database (bwmonUsage.db)

```
YYYY-MM,MAC,IP,USAGE_IN,USAGE_OUT,CREATE_TIME,UPDATE_TIME
```

### Output Database (usage.db)

Served to the React frontend:

```
YYYY-MM,IP,MAC,USER,USAGE_IN,USAGE_OUT,CREATE_TIME,UPDATE_TIME
```

- Usage values are in kilobytes
- Times are Unix timestamps

## Development Constraints

- **POSIX shell only** - No bash-isms (runs on router's busybox shell)
- **Use `bc` for math** - Shell has no built-in arithmetic for large numbers
- **File locking** - Uses `/tmp/bwmon.lock` to prevent concurrent updates
- **Flow Cache** - Disabled automatically for accurate packet counting

## Installation Paths

| Source | Destination |
|--------|-------------|
| bwmon.sh | /opt/share/bwmon/ |
| S80bwmon | /opt/etc/init.d/ |
| react/build/* | /opt/share/www/bwmon/ |
| sample-lighttpd-index.html | /opt/share/www/ |

## Logs

Log file: `/opt/var/log/bwmon.log`

---

For installation instructions, see the main [README.md](../README.md).
