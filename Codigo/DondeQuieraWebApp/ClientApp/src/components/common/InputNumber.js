import React from 'react';
import { Input } from 'reactstrap';

export default function InputNumber({ onChange, value, id, placeholder, min, max }) {
    return (
        <Input onChange={onChange}
            type="number"
            id={id}
            value={value}
            min={min}
            max={max}
            placeholder={placeholder} />
    )
}