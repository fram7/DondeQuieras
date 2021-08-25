import React from 'react';
import { Input } from 'reactstrap';

export default function InputPassword({ value, onChange, id, placeholder }) {
    return (
        <Input onChange={onChange}
            type="password"
            value={value}
            id={id}
            placeholder={placeholder} />
    )
}