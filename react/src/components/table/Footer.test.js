import React from 'react';
import { create } from 'react-test-renderer';
import Footer from './Footer';
import CellInfo from './CellInfo';

describe('Footer', () => {
    const convert = (value) => value + 'xyz';

    const cellInfos = [
        new CellInfo('IP', true, 'left', 'IP', true),
        new CellInfo('MAC', false, 'left', 'MAC', false),
        new CellInfo('download', true, 'right', 'Down', true),
        new CellInfo('upload', false, 'right', 'Up', true, convert),
        new CellInfo('total', false, 'right', 'Total', false),
    ];

    const values = {
        IP: 'IP ADDRESS',
        MAC: 'MAC ADDRESS',
        download: 12345,
        upload: 67890,
        total: 2468,
    };

    test('renders correctly', () => {
        const tree = create(<Footer prefix="test" cellInfos={cellInfos} values={values} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
