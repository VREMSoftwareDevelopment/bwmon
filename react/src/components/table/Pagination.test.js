import React from 'react';
import { create } from 'react-test-renderer';
import Pagination from './Pagination';

describe('Pagination', () => {
    const handleChangePage = (event, newPage) => {};

    const handleChangeRowsPerPage = (event) => {};

    test('renders correctly', () => {
        const tree = create(
            <Pagination
                colSpan={7}
                count={20}
                minumum={5}
                rowsPerPage={10}
                page={0}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
