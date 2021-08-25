import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4'; //Genera un Id unico npm i uuid

const AgregarDias = ({ title, reqTipoDia, id, setPropiedadById, valor }) => {

    const [valorFecha, setValorFecha] = useState('');
    const [tipoDia, setTipoDia] = useState(reqTipoDia ? 'L' : '');
    const [fechas, setFechas] = useState(valor);

    const agregarFecha = () => {
        if (Date.parse(valorFecha)) {
            let newFechas;
            if (fechas) {
                newFechas = [...fechas, {
                    id: uuid(),
                    fecha: valorFecha,
                    tipoDia: tipoDia
                }];
            } else {
                newFechas = [{
                    id: uuid(),
                    fecha: valorFecha,
                    tipoDia: tipoDia
                }];
            }
            setFechas(newFechas);
            setPropiedadById(id, newFechas);
            setValorFecha('');
        }
    }

    const quitarFecha = idAQuitar => {
        const newFechas = fechas.filter(unaFecha => unaFecha.id != idAQuitar);
        setFechas(newFechas);
        setPropiedadById(id, newFechas);
    }

    const cambioTipo = e => {
        setTipoDia(e.currentTarget.value);
    }

    return (
        <Fragment>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail2"
                        value={title} />
                </div>
                <div className="form-group col-md-3">
                    <div className="col-10">
                        <input className="form-control" type="date" value={valorFecha} onChange={e => setValorFecha(e.target.value)}
                            id="example-date-input" />
                    </div>
                </div>
                {reqTipoDia ?
                    <div className="form-group col-md-3">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input className="form-check-input" type="radio" onChange={e => cambioTipo(e)} name="exampleRadios"
                                id="exampleRadios1" value="L" checked={tipoDia == "L"} />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Local
                        </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input className="form-check-input" type="radio" name="exampleRadios"
                                id="exampleRadios2" value="V" onChange={e => cambioTipo(e)} checked={tipoDia == "V"} />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Virtual
                        </label>
                        </div>
                    </div>
                    : null}
                <div className="form-group col-md-2">
                    <button type="button" className="btn btn-link" onClick={agregarFecha}>Agregar</button>
                </div>
            </div>
            <div className="form-group">
                {/*Agregar de a 3 filas y luego una nueva columna*/}
                <ul className="list-group" role="tablist">
                    <div className="row">
                        {fechas && fechas.map(unaFecha =>
                            <div key={unaFecha.id} className="col-sm-6 col-md-4 col-lg-3">
                                <li className="list-group-item">
                                    {`${unaFecha.fecha} ${tipoDia ? `(${unaFecha.tipoDia.substring(0, 1)})` : ''}`}
                                    &nbsp;
                                    <button type="button" className="btn btn-danger"
                                        onClick={() => quitarFecha(unaFecha.id)}>
                                        <i className="fa fa-close"></i></button>
                                </li>
                            </div>
                        )}
                    </div>
                </ul>
            </div>

        </Fragment>
    )
}

export default AgregarDias;