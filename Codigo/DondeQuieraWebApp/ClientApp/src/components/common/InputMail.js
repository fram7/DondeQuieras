import React from 'react';
import { Input } from 'reactstrap';

export default function InputMail({ value, onChange, id, placeholder }) {
    return (
        <Input onChange={onChange}
            type="email"
            id={id}
            value={value}
            placeholder={placeholder} />
    )
}