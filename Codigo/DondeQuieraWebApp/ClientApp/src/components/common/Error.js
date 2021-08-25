import React from 'react';


export default function Error({ field, message }) {
    return (
        <div className="alert alert-danger" role="alert">
            <i className="fa fa-exclamation-circle" />
             &nbsp;<strong>{field}</strong>&nbsp;{message}
        </div>
    )
}