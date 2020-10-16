import React from 'react';
import { create } from 'react-test-renderer';
import Body from './Body';
import CellInfo from './CellInfo';

describe('Body', () => {
    const convert = (value) => value / 1000;

    const cellInfos = [new CellInfo('IP', true, 'left', 'IP', false), new CellInfo('up', false, 'right', 'Down', true, convert)];

    const values = [
        { id: 1, IP: '192.168.1.14', up: 12345202809 },
        { id: 2, IP: '192.168.1.21', up: 123453907 },
        { id: 3, IP: '192.168.1.10', up: 5370488 },
    ];

    test('renders correctly', () => {
        const tree = create(<Body prefix="test" cellInfos={cellInfos} values={values} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
