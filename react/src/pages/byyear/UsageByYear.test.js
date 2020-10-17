import React from 'react';
import { create } from 'react-test-renderer';
import UsageByYear from './UsageByYear';

jest.mock('../../services/Usage');

describe('UsageByYear', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByYear />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
