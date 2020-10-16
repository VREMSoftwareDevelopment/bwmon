import React from 'react';
import { create } from 'react-test-renderer';
import Info from './Info';

describe('Info', () => {
    test('renders correctly with message', () => {
        const tree = create(<Info message="message" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly with no message', () => {
        const tree = create(<Info />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
