import React, { Fragment } from 'react';

export default function Festivo({imagen}) {
    return (
        <Fragment>
            <img src={imagen} width="50px" />
            <small className="form-text text-muted">Festivo</small>
        </Fragment>
    )
}