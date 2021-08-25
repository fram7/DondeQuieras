import React, { useState, Fragment } from 'react';
import { InputLabel, InputNumber } from '../common';

const ToogleNumeric = ({ id, title, cantEquipo, setPropiedadById, valor }) => {
    const [limiteFisico, setLimiteFisico] = useState(valor > 0);
    const [cant, setCant] = useState(valor);

    const cambiarValor = e => {
        setCant(e.target.value);
        setPropiedadById(id, e.target.value);
    }

    const cambiarToogle = e => {
        setLimiteFisico(!limiteFisico);
        if (limiteFisico) {
            setCant(0);
            setPropiedadById(id, 0);
        }
    }

    return (
        <Fragment>
            <div className="form-group col-md-3">
                <InputLabel id="titulo" value={title} />
            </div>
            <div className="form-group col-md-1">
                <label className="switch">
                    <input type="checkbox" checked={limiteFisico} onChange={e => cambiarToogle()} />
                    <span className="slider round"></span>
                </label>
            </div>
            {limiteFisico || valor > 0 ?
                <Fragment>
                    <div className="form-group col-md-1">
                        <InputLabel id="dias" value="Dias:" />
                    </div>
                    <div className="form-group col-md-3">
                        <InputNumber min="0" max={cantEquipo} value={cant} onChange={cambiarValor} />
                    </div>
                    <div className="form-group col-md-3">
                        {cant ?
                            <InputLabel id="porcentaje"
                                value={`Capacidad del ${Math.round((cant / cantEquipo) * 100)} %`} />
                            : null}
                    </div>
                </Fragment>
                : null}
        </Fragment >
    )
}

export default ToogleNumeric;