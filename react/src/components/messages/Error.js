import React from 'react';
import Message from './Message';

const Error = ({ message }) => {
    return <Message severity="error" message={message} />;
};

export default Error;
