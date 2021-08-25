import React, { Fragment } from 'react';
import SelectorFechas from '../config/SelectorFechas';


export default function Header({ usuario, nombreEquipo }) {

    const { name, cargo } = usuario;
    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <h2>Hola {nombreEquipo}!</h2>
                </div>
                <div className="col">
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <h4><strong>Nombre:&nbsp;</strong>{name}</h4>
                </div>
                <div className="col">
                    <h4><strong>Cargo:&nbsp;</strong><label>{cargo}</label></h4>
                </div>
            </div>
        </Fragment>
    )
}