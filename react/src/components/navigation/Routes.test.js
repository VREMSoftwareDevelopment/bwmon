import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import Routes from './Routes';

describe('Routes', () => {
    const menu = [
        { component: 'Component1', pathname: '/pathname1', label: 'label1' },
        { component: 'Component2', pathname: '/pathname2', label: 'label2' },
        { component: 'Component3', pathname: '/pathname3', label: 'label3' },
    ];

    test('renders correctly', () => {
        const tree = create(
            <BrowserRouter>
                <Routes menu={menu} />
            </BrowserRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
