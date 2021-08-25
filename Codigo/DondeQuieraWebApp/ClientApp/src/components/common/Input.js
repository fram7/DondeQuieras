import React from 'react';

export default function Input({ onChange, id, placeholder, type }) {
    return (
        <input
            type={type}
            onChange={onChange}
            id={id}
            value={value}
            className="form-control"
            placeholder={placeholder}
        />
    )
}