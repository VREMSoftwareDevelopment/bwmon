import React from 'react';
import { create } from 'react-test-renderer';
import UsageByUser from './UsageByUser';

jest.mock('../../services/Usage');

describe('UsageByUser', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByUser />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
