import React from 'react';
import { create } from 'react-test-renderer';
import UsageByYearGraph from './UsageByYearGraph';

jest.mock('../../services/Usage');

describe('UsageByYearGraph', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByYearGraph />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
