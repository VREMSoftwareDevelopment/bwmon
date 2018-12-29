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
# Bandwidth Usage
# TomatoUSB Version
#

display() {
	echo "Usage : $0 {setup|update|publish} path"
	echo "Parameters: "
	echo "	$0 setup path"
	echo "	$0 update path"
	echo "	$0 publish path"
}

[ -z "${1}" ] && display && exit 1
[ -z "${2}" ] && display && exit 1

LAN0_IFACE=$(nvram get lan_ifname)
LAN1_IFACE=$(nvram get lan1_ifname)
MACNAMES=$(nvram find macnames)
USERSFILE="/etc/hosts.dnsmasq"
[ -f "${USERSFILE}" ] || USERSFILE="/etc/dnsmasq/hosts/hosts"
[ -f "${USERSFILE}" ] || USERSFILE="/dev/null"
MACNAMESFILE=${2}/macnames
USAGE_DB="bwmonUsage.db"
USAGE_JS="bwmonUsage.js"
USAGEDB=${2}/${USAGE_DB}
USAGEJS=${2}/${USAGE_JS}

log() {
	logger -p user.info -t $0 "$1"
	echo -p user.info -t $0 "$1"
}

lock() {
	while [ -f /tmp/bwmon.lock ]; do
		if [ ! -d /proc/$(cat /tmp/bwmon.lock) ]; then
			log "WARNING : Lockfile detected but process $(cat /tmp/bwmon.lock) does not exist !"
			rm -f /tmp/bwmon.lock
		fi
		sleep 1
	done
	echo $$ > /tmp/bwmon.lock
}

unlock() {
	rm -f /tmp/bwmon.lock
}

usage() {
	#publish results
	#header
	echo "/*Bandwidth Usage Monitor Data*/" > ${USAGEJS}
	echo "var bwmonData=function(){" > ${USAGEJS}
	echo "'use strict';" >> ${USAGEJS}
	echo "var i=0, data=[]," >> ${USAGEJS}
	echo "Data=function(id,date,ip,mac,user,down,up,first,last){" >> ${USAGEJS}
	echo "this.id=id;" >> ${USAGEJS}
	echo "this.IP=ip;" >> ${USAGEJS}
	echo "this.MAC=mac;" >> ${USAGEJS}
	echo "this.user=user;" >> ${USAGEJS}
	echo "this.download=down;" >> ${USAGEJS}
	echo "this.upload=up;" >> ${USAGEJS}
	echo "this.firstSeen=first;" >> ${USAGEJS}
	echo "this.lastSeen=last;" >> ${USAGEJS}
	echo "this.year=+(date.split('-')[0]);" >> ${USAGEJS}
	echo "this.month=+(date.split('-')[1]-1);" >> ${USAGEJS}
	echo "this.total=this.download + this.upload;" >> ${USAGEJS}
	echo "this.days=Math.floor((Math.abs(this.lastSeen-this.firstSeen)/(60*60*24))+1);" >> ${USAGEJS}
	echo "this.average=+(this.total/this.days).toFixed(3);" >> ${USAGEJS}
	echo "};" >> ${USAGEJS}

	#details
	echo "$(echo ${MACNAMES/'macnames='/} | tr '>' '\n' | tr '<' ',')" > ${MACNAMESFILE}

	cat ${USAGEDB} | while IFS=, read CURRENT_MONTH MAC IP USAGE_IN USAGE_OUT CREATE_TIME UPDATE_TIME
	do
		USER=$(grep "${IP} " "${USERSFILE}" | cut -f2 -s -d' ' )
		if [ -z "$USER" ]; then
			USER=$(grep "$(echo ${MAC} | sed 's/://g')" "${MACNAMESFILE}" | cut -f2 -s -d',' )
			[ -z "$USER" ] && USER=${MAC}
		fi
		echo "data.push(new Data(i++,'${CURRENT_MONTH}','${IP}','${MAC}','${USER}',${USAGE_IN},${USAGE_OUT},${CREATE_TIME},${UPDATE_TIME}));" >> ${USAGEJS}
	done
	#footer
	echo "return data;};" >> ${USAGEJS}
}

update() {
	#Read and reset counters
	iptables -L RRDIPT -vnxZ -t filter > /tmp/traffic_$$.tmp
	grep -v "0x0" /proc/net/arp  | while read IP TYPE FLAGS MAC MASK IFACE
	do
		#Add new data to the graph. Count in Kbs to deal with 16 bits signed values (up to 2G only)
		#Have to use temporary files because of crappy busybox shell
		echo 0 > /tmp/in_$$.tmp
		echo 0 > /tmp/out_$$.tmp
		grep ${IP} /tmp/traffic_$$.tmp | while read PKTS BYTES TARGET PROT OPT IFIN IFOUT SRC DST
		do
			[ "${DST}" = "${IP}" ] && echo $((${BYTES}/1000)) > /tmp/in_$$.tmp
			[ "${SRC}" = "${IP}" ] && echo $((${BYTES}/1000)) > /tmp/out_$$.tmp
		done
		IN=$(cat /tmp/in_$$.tmp)
		OUT=$(cat /tmp/out_$$.tmp)
		if [ ${IN} -gt 0 -o ${OUT} -gt 0 ];  then
			log "DEBUG: New traffic for ${MAC} since last update : ${IN}k:${OUT}k"
			CURRENT_MONTH=$(date +'%Y-%m')
			LINE=$(grep "${CURRENT_MONTH},${MAC}" ${USAGEDB})
			if [ -z "${LINE}" ]; then
				log "DEBUG: ${CURRENT_MONTH},${MAC} new month and host!"
				USAGE_IN=0
				USAGE_OUT=0
				CREATE_TIME=$(date +%s)
			else
				USAGE_IN=$(echo ${LINE} | cut -f4 -s -d, )
				USAGE_OUT=$(echo ${LINE} | cut -f5 -s -d, )
				CREATE_TIME=$(echo ${LINE} | cut -f6 -s -d, )
			fi
			USAGE_IN=$((${USAGE_IN}+${IN}))
			USAGE_OUT=$((${USAGE_OUT}+${OUT}))
			UPDATE_TIME=$(date +%s)
			grep -v "${CURRENT_MONTH},${MAC}" ${USAGEDB} > /tmp/db_$$.tmp
			mv /tmp/db_$$.tmp ${USAGEDB}
			echo ${CURRENT_MONTH},${MAC},${IP},${USAGE_IN},${USAGE_OUT},${CREATE_TIME},${UPDATE_TIME} >> ${USAGEDB}
		fi
	done
	rm -f /tmp/*_$$.tmp
}

create() {
	iptables -N RRDIPT 2> /dev/null
	#Add the RRDIPT CHAIN to the FORWARD chain (if non existing).
	iptables -L FORWARD --line-numbers -n | grep "RRDIPT" | grep "1" > /dev/null
	if [ $? -ne 0 ]; then
		iptables -L FORWARD -n | grep "RRDIPT" > /dev/null
		if [ $? -eq 0 ]; then
			log "DEBUG : iptables chain misplaced, recreating it..."
			iptables -D FORWARD -j RRDIPT
		fi
		iptables -I FORWARD -j RRDIPT
	fi
	#LAN0 For each host in the ARP table
	grep ${LAN0_IFACE} /proc/net/arp | while read IP TYPE FLAGS MAC MASK IFACE
	do
		#Add iptable rules (if non existing).
		iptables -nL RRDIPT | grep "${IP} " > /dev/null
		if [ $? -ne 0 ]; then
			iptables -I RRDIPT -d ${IP} -j RETURN
			iptables -I RRDIPT -s ${IP} -j RETURN
		fi
	done
	#LAN1 For each host in the ARP table
	grep ${LAN1_IFACE} /proc/net/arp | while read IP TYPE FLAGS MAC MASK IFACE
	do
		#Add iptable rules (if non existing).
		iptables -nL RRDIPT | grep "${IP} " > /dev/null
		if [ $? -ne 0 ]; then
			iptables -I RRDIPT -d ${IP} -j RETURN
			iptables -I RRDIPT -s ${IP} -j RETURN
		fi
	done
}

case ${1} in
"setup" )
	#Create the RRDIPT CHAIN (it doesn't matter if it already exists).
	create
	;;
"update" )
	log "INFO: Running update - ${USAGEDB} ${USAGEJS} ${USERSFILE}"
	lock
	update
	usage
	unlock
	;;
"publish" )
	log "INFO: Running publish - ${USAGEDB} ${USAGEJS} ${USERSFILE}"
	lock
	usage
	unlock
	;;
*)
	display
	exit 1
	;;
esac

exit 0