import Data from './Data';

describe('Data', () => {
    test('should construct', () => {
        const data = new Data(111, '2011-06', '192.168.1.14', '00:24:8D:28:F2:9A', 'COMPUTER-1', 202809, 11512, 1307160300, 1308013207);
        expect(data.id).toEqual(111);
        expect(data.IP).toEqual('192.168.1.14');
        expect(data.MAC).toEqual('00:24:8D:28:F2:9A');
        expect(data.user).toEqual('COMPUTER-1');
        expect(data.download).toEqual(202809);
        expect(data.upload).toEqual(11512);
        expect(data.firstSeen).toEqual(1307160300);
        expect(data.lastSeen).toEqual(1308013207);
        expect(data.year).toEqual(2011);
        expect(data.month).toEqual(6);
        expect(data.total).toEqual(214321);
        expect(data.days).toEqual(10);
        expect(data.average).toEqual(21432.1);
    });
});
