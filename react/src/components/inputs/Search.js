import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({ ...props }) => (
    <TextField
        {...props}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
        placeholder="IP, MAC or USER"
    />
);

export default Search;
