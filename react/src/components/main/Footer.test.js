import React from 'react';
import { create } from 'react-test-renderer';
import Footer from './Footer';

describe('Footer', () => {
    const currentTime = 'October 20, 2020, 11:25:35 AM EDT';

    test('renders correctly', () => {
        const tree = create(<Footer currentTime={currentTime} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
