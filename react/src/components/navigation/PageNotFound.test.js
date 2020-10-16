import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
    test('renders correctly', () => {
        const tree = create(<PageNotFound />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
