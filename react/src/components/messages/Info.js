import React from 'react';
import Message from './Message';

const Info = ({ message }) => {
    return <Message severity="info" message={message} />;
};

export default Info;
