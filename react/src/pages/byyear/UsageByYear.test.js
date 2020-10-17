import React from 'react';
import UsageByYear from './UsageByYear';
import { act, create } from 'react-test-renderer';
import wait from '../../__test__/utils/Wait';

jest.mock('../../services/Usage');

describe('UsageByYear', () => {
    test('renders correctly', () => {
        const tree = create(<UsageByYear />);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('renders correctly after data load', async () => {
        let tree;
        act(() => {
            tree = create(<UsageByYear />);
        });
        await wait(1);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
