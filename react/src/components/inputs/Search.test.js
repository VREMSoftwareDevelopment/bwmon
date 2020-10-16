import React from 'react';
import { create } from 'react-test-renderer';
import Search from './Search';

describe('Search', () => {
    const handleChange = (event) => {
        console.log('handle change');
    };

    test('renders correctly', () => {
        const tree = create(<Search id="12345" value="XYZ" onChange={handleChange} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
