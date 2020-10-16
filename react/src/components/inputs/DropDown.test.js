import React from 'react';
import { create } from 'react-test-renderer';
import DropDown from './DropDown';

describe('DropDown', () => {
    const handleChange = (event) => {
        console.log('handle change');
    };

    test('renders correctly with items', () => {
        const tree = create(<DropDown id="12345" value="ZYXUW" onChange={handleChange} items={['ABC', 'ZYXUW', 'WGKF']} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly with no items', () => {
        const tree = create(<DropDown />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly with no value', () => {
        const tree = create(<DropDown items={['ABC', 'ZYXUW', 'WGKF']} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
