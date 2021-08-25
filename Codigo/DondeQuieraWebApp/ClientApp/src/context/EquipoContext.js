import React, { createContext, useEffect, useState } from 'react';
import firebaseConf from './Firebase';

export const EquipoContext = createContext();

const EquipoProvider = (props) => {
    //Dias Semana Cargados
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firebaseConf.database().ref('registros').on('value', function (snapshot) {
            if (snapshot.val() != null) {
                setRegistros(snapshot.val());
            }
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        if (registros != null && registros.length > 0) {
            firebaseConf.database().ref('registros').set(registros);
        }
        // setLoading(false);
    }, [registros, setRegistros]);


    const addDiaEquipo = (accountId, unDia) => {
        const index = registros.findIndex(d => d.accountId == accountId);

        if (index !== -1) {
            const diasEquipo = registros[index].diasEquipo;
            const indexEquipos = diasEquipo.findIndex(d => d.fecha
                && d.fecha.fecha == unDia.fecha.fecha);

            let copyRegistros = [...registros]

            if (indexEquipos !== -1) {
                copyRegistros[index].diasEquipo[indexEquipos] = unDia
            } else {
                let copyDias = [...copyRegistros[index].diasEquipo, unDia];
                copyRegistros[index].diasEquipo = copyDias
            }

            setRegistros(copyRegistros);
        } else {
            setRegistros([...registros, {
                accountId: accountId,
                diasEquipo: [unDia]
            }])
        }



    }

    return (
        <EquipoContext.Provider
            value={{
                registros,
                addDiaEquipo,
                loading
            }}
        >
            {props.children}
        </EquipoContext.Provider>
    )
}

export default EquipoProvider;