import { comparator, sort } from './SortUtils';

describe('SortUtils', () => {
    describe('comparator', () => {
        test('ascending', () => {
            const a = { value: 10 };
            const b = { value: 20 };

            const fn = comparator(true, 'value');

            expect(fn(a, b)).toEqual(-1);
        });

        test('ascending equals', () => {
            const a = { value: 10 };
            const b = { value: 10 };

            const fn = comparator(true, 'value');

            expect(fn(a, b)).toEqual(0);
        });

        test('descending', () => {
            const a = { value: 10 };
            const b = { value: 20 };

            const fn = comparator(false, 'value');

            expect(fn(a, b)).toEqual(1);
        });

        test('descending equals', () => {
            const a = { value: 10 };
            const b = { value: 10 };

            const fn = comparator(false, 'value');

            expect(fn(a, b)).toEqual(0);
        });
    });

    describe('sort', () => {
        test('ascending', () => {
            const values = [{ value: 20 }, { value: 10 }, { value: 30 }, { value: 20 }];
            const fn = comparator(true, 'value');
            const expected = [{ value: 10 }, { value: 20 }, { value: 20 }, { value: 30 }];

            const result = sort(values, fn);

            expect(result).toEqual(expected);
            expect(values !== result).toBeTruthy();
            expect(values != result).toBeTruthy();
        });

        test('descending', () => {
            const values = [{ value: 20 }, { value: 10 }, { value: 30 }];
            const fn = comparator(false, 'value');
            const expected = [{ value: 30 }, { value: 20 }, { value: 10 }];

            const result = sort(values, fn);

            expect(result).toEqual(expected);
            expect(values !== result).toBeTruthy();
            expect(values != result).toBeTruthy();
        });
    });
});
