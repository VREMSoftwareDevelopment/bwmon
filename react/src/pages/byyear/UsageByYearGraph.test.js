import React from 'react';
import UsageByYearGraph from './UsageByYearGraph';
import { create } from 'react-test-renderer';

describe('UsageByYearGraph', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByYearGraph />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
