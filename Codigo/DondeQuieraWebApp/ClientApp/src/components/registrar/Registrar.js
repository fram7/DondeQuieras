import React, { useState, useEffect, useContext } from 'react';
import Opcion from './Opcion';
import Compañeros from './Compañeros';
import Header from './Header';
import Cabecera from './Cabecera';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { EquipoContext } from '../../context/EquipoContext';
import { Redirect } from 'react-router-dom';
import { FechaContext } from '../../context/FechaContext';
import { Loading } from '../common';

export default function Registrar() {
    const { usuario } = useContext(UserContext);
    const { registros, addDiaEquipo, loading } = useContext(EquipoContext);
    const { getConfigByAccountId } = useContext(ConfigContext);
    const config = getConfigByAccountId(usuario.accountId);
    const { semanas, setSemanas, getSemana } = useContext(FechaContext);
    const [ixSemana, setIXSemana] = useState(0);

    const r = registros.find(u => u.accountId == usuario.accountId)
    const registroEquipo = r != null ? r.diasEquipo : []

    useEffect(() => {
        setIXSemana(0);
        setSemanas(getSemana(ixSemana));
        setDiaSelect('');
    }, []);

    const [diaSelect, setDiaSelect] = useState('');

    const setDiaOpcion = (accountId, unDia) => {
        addDiaEquipo(accountId, unDia);
    }

    const changeWeek = (indicador) => {
        setSemanas(getSemana(ixSemana + indicador));
        const copyixSemana = ixSemana;
        setIXSemana(copyixSemana + indicador);
        setDiaSelect('');
    }

    //if (config == null) {
    //    return <Redirect to='/config' /> ;
    //}
    const nombreEquipo = config ? config.nombreEquipo : '';
    const { tamañoPuestos } = config ? config : 0;
    return (
        <>
            {!usuario ?
                <Redirect to='/login' />
                : loading || registroEquipo == null ? <Loading /> :
                    <div className="container">
                        <Header
                            usuario={usuario}
                            nombreEquipo={nombreEquipo}
                            semanas={semanas}
                        />
                        <div className="row justify-content-center">
                            <div className="col">
                                <table className="table">
                                    <thead style={{ color: "white" }} >
                                        <tr className="text-center"  >
                                            <th title="Anterior semana" onClick={() => changeWeek(-1)}
                                                style={{
                                                    width: "5%",
                                                    cursor: "pointer",
                                                    fontSize: "40px",
                                                    backgroundColor: "#343A40"
                                                }}><i className="fa fa-arrow-circle-left"></i></th>
                                            {semanas && semanas.map(unaFecha =>
                                                <Cabecera unaFecha={unaFecha}
                                                    key={unaFecha.id}
                                                    semanaSeleccionada={semanas}
                                                    diaSelect={diaSelect}
                                                    setDiaSelect={setDiaSelect}
                                                />
                                            )}
                                            <th title="Siguiente semana" onClick={() => changeWeek(+1)}
                                                style={{
                                                    width: "5%",
                                                    cursor: "pointer",
                                                    fontSize: "40px",
                                                    backgroundColor: "#343A40"
                                                }}><i className="fa fa-arrow-circle-right"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            {semanas && semanas.map(unaFecha =>
                                                <Opcion key={unaFecha.id}
                                                    fecha={unaFecha}
                                                    isFestivo={unaFecha.isFestivo}
                                                    diaEquipo={registroEquipo.find(d => d.fecha && d.fecha.fecha === unaFecha.fecha)}
                                                    setDiaOpcion={setDiaOpcion}
                                                    usuario={usuario}
                                                    cantPuestosLocales={tamañoPuestos}
                                                    setDiaSelect={setDiaSelect}
                                                />
                                            )}
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <Compañeros
                                diaSelect={diaSelect}
                                diaEquipo={registroEquipo.find(d => d.fecha && d.fecha.fecha === diaSelect.fecha)}
                            />
                        </div>
                    </div >
            }
        </>
    )
}