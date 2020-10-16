import React from 'react';
import { create } from 'react-test-renderer';
import Error from './Error';

describe('Error', () => {
    test('renders correctly with message', () => {
        const tree = create(<Error message="message" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly with no message', () => {
        const tree = create(<Error />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
