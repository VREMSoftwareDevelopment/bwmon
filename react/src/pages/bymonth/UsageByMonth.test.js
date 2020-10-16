import React from 'react';
import { create } from 'react-test-renderer';
import UsageByMonth from './UsageByMonth';

describe('UsageByMonth', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByMonth />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
