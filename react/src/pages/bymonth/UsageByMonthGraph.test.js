import React from 'react';
import { create } from 'react-test-renderer';
import UsageByMonthGraph from './UsageByMonthGraph';

jest.mock('../../services/Usage');

describe('UsageByMonth', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByMonthGraph />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
