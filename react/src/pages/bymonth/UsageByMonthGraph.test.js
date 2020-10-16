import React from 'react';
import { create } from 'react-test-renderer';
import UsageByMonthGraph from './UsageByMonthGraph';

describe('UsageByMonth', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByMonthGraph />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
