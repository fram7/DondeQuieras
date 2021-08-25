import React from 'react';


export default function Loading() {

    return (
        <div className="d-flex align-items-center">
            <h2><strong>Cargando...</strong></h2>
            <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
    )

}