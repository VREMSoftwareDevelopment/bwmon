import React from 'react';
import { create } from 'react-test-renderer';
import UsageByUserGraph from './UsageByUserGraph';

describe('UsageByUserGraph', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByUserGraph />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
