import React from 'react';
import { Input } from 'reactstrap';

export default function InputText({ onChange, readOnly, value, id, placeholder }) {
    return (
        <Input onChange={onChange}
            type="text"
            readOnly={readOnly}
            id={id}
            value={value}
            placeholder={placeholder} />
    )
}