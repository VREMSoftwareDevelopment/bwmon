import React from 'react';
import { create } from 'react-test-renderer';
import Footer from './Footer';

describe('Footer', () => {
    test('renders correctly', () => {
        const tree = create(<Footer />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
