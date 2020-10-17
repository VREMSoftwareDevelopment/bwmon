import React from 'react';
import UsageByMonthGraph from './UsageByMonthGraph';
import { create } from 'react-test-renderer';

jest.mock('../../services/Usage');

describe('UsageByMonth', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByMonthGraph />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
