import React from 'react';
import { create } from 'react-test-renderer';
import UsageByYear from './UsageByYear';

describe('UsageByYear', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByYear />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
