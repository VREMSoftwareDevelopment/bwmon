import React from 'react';
import { create } from 'react-test-renderer';
import Message from './Message';

describe('Message', () => {
    test('renders correctly with message', () => {
        const tree = create(<Message severity="success" message="message" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly with no message', () => {
        const tree = create(<Message severity="success" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
