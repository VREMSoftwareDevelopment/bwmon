import React from 'react';
import UsageByUser from './UsageByUser';
import { act, create } from 'react-test-renderer';
import wait from '../../__test__/utils/Wait';

jest.mock('../../services/Usage');

describe('UsageByUser', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByUser />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    /*
    // current issue in Material UI Table Pagination label id
    test('renders correctly after data load', async () => {
        let tree;
        act(() => {
            tree = create(<UsageByUser />);
        });
        await wait(1);
        expect(tree.toJSON()).toMatchSnapshot();
    });
    */
});
