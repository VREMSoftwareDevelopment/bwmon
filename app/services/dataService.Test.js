describe('BWMonApp.DataService module, dataService factory ', function() {
	var dataService;

	beforeEach(module('BWMonApp.DataService'));
	beforeEach(inject(function(_dataService_){
		dataService =_dataService_;
	}));

	it('should return years', function() {
		var expected = [2013, 2012, 2011],
			actual = dataService.getYears();

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return months', function() {
		var expected = [ 'November', 'October', 'September', 'August', 'July', 'June', 'May', 'April', 'March', 'February', 'January' ],
			actual = dataService.getMonths(2013);

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return data by year', function() {
		var expected = [
				{id: 2013, download: 603928097, upload: 35772955, total: 639701052, average: 1752605.622, days: 365},
				{id: 2012, download: 413484937, upload: 23242362, total: 436727299, average: 1193243.986, days: 366},
				{id: 2011, download: 139938627, upload: 10744984, total: 150683611, average: 412831.811, days: 365}
			],
			actual = dataService.getUsageByYear().data;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});
	
	it('should return chart data by year', function() {
		var expected = [
				{x: 2011, y: 150.684},
				{x: 2012, y: 436.727},
				{x: 2013, y: 639.701}
			],
			actual = dataService.getUsageByYear().chartData;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return usage data by month', function() {
		var expected = [
				{id: 11, download: 21926209, upload: 1936607, total: 23862816, average: 769768.258, days: 31, percent: 15.8},
				{id: 10, download: 10920971, upload: 693868, total: 11614839, average: 387161.3, days: 30, percent: 7.7},
				{id: 9, download: 13960244, upload: 1577944, total: 15538188, average: 501231.871, days: 31, percent: 10.3},
				{id: 8, download: 14874630, upload: 1162039, total: 16036669, average: 534555.633, days: 30, percent: 10.6},
				{id: 7, download: 29506551, upload: 1782830, total: 31289381, average: 1009334.871, days: 31, percent: 20.8},
				{id: 6, download: 21800593, upload: 1506038, total: 23306631, average: 751826.806, days: 31, percent: 15.5},
				{id: 5, download: 26949429, upload: 2085658, total: 29035087, average: 967836.233, days: 30, percent: 19.3}
			],
			actual = dataService.getUsageByMonth(2011).data.usage;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return total by month', function() {
		var expected = {id: 2011, download: 139938627, upload: 10744984, total: 150683611, average: 412831.811, days: 365},
			actual = dataService.getUsageByMonth(2011).data.total;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return chart usage by month', function() {
		var expected = [
				{x: 5, y: 29.035},
				{x: 6, y: 23.307},
				{x: 7, y: 31.289},
				{x: 8, y: 16.037},
				{x: 9, y: 15.538},
				{x: 10, y: 11.615},
				{x: 11, y: 23.863}
			],
			actual = dataService.getUsageByMonth(2011).chartData;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return usage data by user', function() {
		var expected = [
				{id:37, IP: '192.168.1.10', MAC: '00:1C:25:27:9B:AE', user: 'COMPUTER-3', download: 7241231, upload: 410184, firstSeen: 1320188401, lastSeen: 1322703002, year: 2011, month: 10, total: 7651415, days: 30, average: 255047.167, percent: 65.9},
				{id:36, IP: '192.168.1.12', MAC: '00:26:9E:C4:A0:40', user: 'COMPUTER-5', download: 2734650, upload: 246716, firstSeen: 1320184802, lastSeen: 1322701201, year: 2011, month: 10, total: 2981366, days: 30, average: 99378.867, percent: 25.7},
				{id:33, IP: '192.168.1.14', MAC: '00:24:8D:28:F2:9A', user: 'COMPUTER-1', download: 232214, upload: 6366, firstSeen: 1320519602, lastSeen: 1322361007, year: 2011, month: 10, total: 238580, days: 22, average: 10844.545, percent: 2.1},
				{id:35, IP: '192.168.1.15', MAC: '00:1A:A0:C7:19:08', user: 'COMPUTER-9', download: 655493, upload: 22010, firstSeen: 1321403402, lastSeen: 1322701201, year: 2011, month: 10, total: 677503, days: 16, average: 42343.938, percent: 5.8},
				{id:38, IP: '192.168.1.21', MAC: '00:23:7A:F7:A0:D0', user: 'COMPUTER-2', download: 654, upload: 210, firstSeen: 1320183002, lastSeen: 1322713801, year: 2011, month: 10, total: 864, days: 30, average: 28.8, percent: 0},
				{id:34, IP: '192.168.1.24', MAC: '00:27:10:0E:B5:60', user: 'COMPUTER-4', download: 56729, upload: 8382, firstSeen: 1322274602, lastSeen: 1322407802, year: 2011, month: 10, total: 65111, days: 2, average: 32555.5, percent: 0.6}
			],
			actual = dataService.getUsageByUser(2011, 'November').data.usage;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return usage data by user with filter using IP', function() {
		var expected = [
				{id:38, IP: '192.168.1.21', MAC: '00:23:7A:F7:A0:D0', user: 'COMPUTER-2', download: 654, upload: 210, firstSeen: 1320183002, lastSeen: 1322713801, year: 2011, month: 10, total: 864, days: 30, average: 28.8, percent: 0},
				{id:34, IP: '192.168.1.24', MAC: '00:27:10:0E:B5:60', user: 'COMPUTER-4', download: 56729, upload: 8382, firstSeen: 1322274602, lastSeen: 1322407802, year: 2011, month: 10, total: 65111, days: 2, average: 32555.5, percent: 0.6}
			],
			actual = dataService.getUsageByUser(2011, 'November', '.2').data.usage;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return usage data by user with filter using MAC', function() {
		var expected = [
				{id:36, IP: '192.168.1.12', MAC: '00:26:9E:C4:A0:40', user: 'COMPUTER-5', download: 2734650, upload: 246716, firstSeen: 1320184802, lastSeen: 1322701201, year: 2011, month: 10, total: 2981366, days: 30, average: 99378.867, percent: 25.7},
				{id:35, IP: '192.168.1.15', MAC: '00:1A:A0:C7:19:08', user: 'COMPUTER-9', download: 655493, upload: 22010, firstSeen: 1321403402, lastSeen: 1322701201, year: 2011, month: 10, total: 677503, days: 16, average: 42343.938, percent: 5.8},
				{id:38, IP: '192.168.1.21', MAC: '00:23:7A:F7:A0:D0', user: 'COMPUTER-2', download: 654, upload: 210, firstSeen: 1320183002, lastSeen: 1322713801, year: 2011, month: 10, total: 864, days: 30, average: 28.8, percent: 0},
			],
			actual = dataService.getUsageByUser(2011, 'November', ':A0').data.usage;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return usage data by user with filter using user', function() {
		var expected = [
				{id:38, IP: '192.168.1.21', MAC: '00:23:7A:F7:A0:D0', user: 'COMPUTER-2', download: 654, upload: 210, firstSeen: 1320183002, lastSeen: 1322713801, year: 2011, month: 10, total: 864, days: 30, average: 28.8, percent: 0 },
			],
			actual = dataService.getUsageByUser(2011, 'November', '-2').data.usage;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return total by user', function() {
		var expected = {id: 10, download: 10920971, upload: 693868, total: 11614839, average: 387161.3, days: 30},
			actual = dataService.getUsageByUser(2011, 'November').data.total;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

	it('should return chart usage by user', function() {
		var expected = [
				{x: 33, y: 0.239},
				{x: 34, y: 0.065},
				{x: 35, y: 0.678},
				{x: 36, y: 2.981},
				{x: 37, y: 7.651},
				{x: 38, y: 0.001}
			],
			actual = dataService.getUsageByUser(2011, 'November').chartData;

		expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
	});

});
