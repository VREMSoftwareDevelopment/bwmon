import React from 'react';
import { create } from 'react-test-renderer';
import Header from './Header';
import CellInfo from './CellInfo';

describe('Header', () => {
    const cellInfos = [
        new CellInfo('IP', true, 'left', 'IP'),
        new CellInfo('MAC', false, 'left', 'MAC'),
        new CellInfo('download', true, 'right', 'Down'),
        new CellInfo('upload', false, 'right', 'Up'),
    ];

    const handleRequestSort = (event, property) => {};

    test('renders correctly', () => {
        const tree = create(
            <Header prefix="test" cellInfos={cellInfos} onRequestSort={handleRequestSort} ascending={true} orderBy={cellInfos[0].id} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
