import { DateTime } from 'luxon';

export const timeToDate = (time) => DateTime.fromSeconds(Number(time)).toFormat('MMM dd, yyyy HH:mm');
export const toMonth = (month) => DateTime.local(2012, month).toFormat('MMMM');
export const usageInGBytes = (value) => (Number(value) / 1000000).toFixed(3);
export const toPercent = (value) => Number(value).toFixed(1) + '%';
