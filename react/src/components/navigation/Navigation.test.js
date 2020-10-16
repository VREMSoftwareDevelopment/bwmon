import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import Navigation from './Navigation';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: '/pathname2',
    }),
}));

describe('Navigation', () => {
    const menu = [
        { id: 'id1', pathname: '/pathname1', label: 'label1', icon: 'icon1' },
        { id: 'id2', pathname: '/pathname2', label: 'label2', icon: 'icon2' },
        { id: 'id3', pathname: '/pathname3', label: 'label3', icon: 'icon3' },
    ];

    test('renders correctly', () => {
        const tree = create(
            <BrowserRouter>
                <Navigation menu={menu} />
            </BrowserRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
