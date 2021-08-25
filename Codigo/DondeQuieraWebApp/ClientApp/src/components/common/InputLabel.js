import React from 'react';

export default function InputLabel({ id, value }) {
    return (
        <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id={id}
            value={value}
        />
    )
}