import React, { useState, Fragment, useEffect, useContext } from 'react';
import ToogleNumeric from './ToogleNumeric';
import AgregarDias from './AgregarDias';
import { InputText, InputNumber, Loading } from '../common';
import { ConfigContext } from '../../context/ConfigContext';
import { UserContext } from '../../context/UserContext';
import { Redirect } from 'react-router-dom';

const Config = ({ history }) => {
    const { usuario } = useContext(UserContext);
    const { getConfigByAccountId, addConfig, loading } = useContext(ConfigContext);

    let config = getConfigByAccountId(usuario.accountId);

    if (config == null) {
        config = {
            accountId: usuario.accountId,
            nombreEquipo: '',
            tamañoEquipo: 0,
            tamañoPuestos: 0,
            limiteFisico: 0,
            limiteVirtual: 0,
            diasObligatorios: [],
            diasFestivos: []
        };
    }

    const setPropiedadById = (id, valorPropiedad) => {
        const newConfig = {
            ...config,
            [id]: valorPropiedad
        };
        addConfig(newConfig)
    }

    const cambioValor = e => {
        const newConfig = {
            ...config,
            [e.target.id]: e.target.value
        }
        addConfig(newConfig)
    }

    const { nombreEquipo, tamañoEquipo, tamañoPuestos, limiteFisico, limiteVirtual, diasObligatorios, diasFestivos } = config ? config : {};

    return (
        <>
            {!usuario ?
                <Redirect to='/login' />
                : loading ? < Loading /> :
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="nombreEquipo">Nombre Equipo</label>
                                <InputText id="nombreEquipo" value={nombreEquipo} onChange={cambioValor} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="nombreEquipo">Id Cuenta</label>
                                <InputText value={usuario.accountId} readOnly id="accountId" />
                            </div>                           
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="tamañoEquipo">Tamaño Equipo</label>
                                <InputNumber value={tamañoEquipo} onChange={cambioValor} id="tamañoEquipo" min="0" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="tamañoPuestos">Cant Puestos fisicos</label>
                                <InputNumber value={tamañoPuestos} onChange={cambioValor}
                                    max={tamañoEquipo} min="0" id="tamañoPuestos"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <ToogleNumeric id="limiteFisico" title="Limite Fisico:" cantEquipo={tamañoEquipo}
                                valor={limiteFisico} setPropiedadById={setPropiedadById} />
                        </div>
                        <div className="form-row">
                            <ToogleNumeric id="limiteVirtual" title="Limite Virtual:" cantEquipo={tamañoEquipo}
                                valor={limiteVirtual} setPropiedadById={setPropiedadById} />
                        </div>
                        <AgregarDias title="Agregar dias obligatorios:" reqTipoDia={true}
                            id="diasObligatorios" valor={diasObligatorios}
                            setPropiedadById={setPropiedadById} />
                        <AgregarDias title="Agregar dias festivos:" id="diasFestivos"
                            valor={diasFestivos} setPropiedadById={setPropiedadById} />
                    </form>
            }
        </>
    );

};

export default Config;