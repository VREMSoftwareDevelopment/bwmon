import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const DropDown = ({ items, ...props }) => {
    return items && props.value ? (
        <Select {...props}>
            {items.map((item, index) => (
                <MenuItem key={index} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    ) : null;
};

export default DropDown;
