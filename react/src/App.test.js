import React from 'react';
import { act, create } from 'react-test-renderer';
import wait from './__test__/utils/Wait';

jest.mock('./services/Usage');

import App from './App';

describe('App', () => {
    const currentTime = 'October 20, 2020, 11:25:35 AM EDT';

    test('renders correctly', () => {
        const tree = create(<App currentTime={currentTime} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    // current issue in Material UI Table Pagination label id
    /*
    test('renders correctly after data load', async () => {
        let tree;
        act(() => {
            tree = create(<App currentTime={currentTime} />);
        });
        await wait(1);
        expect(tree.toJSON()).toMatchSnapshot();
    });
    */
});
