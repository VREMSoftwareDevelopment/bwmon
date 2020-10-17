import React from 'react';
import { create } from 'react-test-renderer';
import UsageByMonth from './UsageByMonth';

jest.mock('../../services/Usage');

describe('UsageByMonth', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByMonth />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
