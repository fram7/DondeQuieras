import React from 'react';


export default function Alert({ field, message }) {
    return (
        <div className="alert alert-warning" role="alert">
            <i className="fa fa-exclamation-triangle" />
           &nbsp;<strong>{field}</strong>&nbsp;{message}
        </div>
    )
}