import React from 'react';
import UsageByMonth from './UsageByMonth';
import { act, create } from 'react-test-renderer';
import wait from '../../__test__/utils/Wait';

jest.mock('../../services/Usage');

describe('UsageByMonth', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByMonth />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly after data load', async () => {
        let tree;
        act(() => {
            tree = create(<UsageByMonth />);
        });
        await wait(1);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
