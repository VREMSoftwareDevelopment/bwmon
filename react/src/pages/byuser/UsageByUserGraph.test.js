import React from 'react';
import UsageByUserGraph from './UsageByUserGraph';
import { create } from 'react-test-renderer';

jest.mock('../../services/Usage');

describe('UsageByUserGraph', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByUserGraph />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
