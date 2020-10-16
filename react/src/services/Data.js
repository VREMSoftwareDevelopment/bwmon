export default class Data {
    constructor(id, date, ip, mac, user, down, up, first, last) {
        this.id = id;
        this.IP = ip;
        this.MAC = mac;
        this.user = user;
        this.download = Number(down);
        this.upload = Number(up);
        this.firstSeen = Number(first);
        this.lastSeen = Number(last);
        this.year = +date.split('-')[0];
        this.month = +date.split('-')[1];
        this.total = this.download + this.upload;
        this.days = Math.floor(Math.abs(this.lastSeen - this.firstSeen) / (60 * 60 * 24) + 1);
        this.average = +(this.total / this.days).toFixed(3);
    }
}
