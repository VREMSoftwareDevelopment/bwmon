import React from 'react';
import { create } from 'react-test-renderer';
import Loading from './Loading';

describe('Loading', () => {
    test('renders correctly', () => {
        const tree = create(<Loading />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
