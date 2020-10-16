import React from 'react';
import { create } from 'react-test-renderer';
import Header from './Header';

describe('Header', () => {
    test('renders correctly', () => {
        const tree = create(<Header />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
