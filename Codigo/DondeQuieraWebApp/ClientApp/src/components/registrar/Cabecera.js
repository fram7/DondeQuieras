import React, { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import { UserContext } from '../../context/UserContext';

export default function Cabecera({ unaFecha, semanaSeleccionada, diaSelect, setDiaSelect }) {

    const { usuario } = useContext(UserContext);
    const onClickTD = id => {
        setDiaSelect(semanaSeleccionada.filter(sem => sem.id == id)[0]);
    }

    const [isFestivo, setIsFestivo] = useState(false);
    const { getConfigByAccountId, validateIsFestivo } = useContext(ConfigContext);

    useEffect(() => {
        const config = getConfigByAccountId(usuario.accountId);
        setIsFestivo(validateIsFestivo(config,unaFecha.fecha));
    }, []);

    const { id, dia, fecha } = unaFecha

    return (
        <th style={{
            cursor: isFestivo ? "" : "pointer",
            backgroundColor: diaSelect.id == id ? "#3D7EF1" : "#343A40",
            fontStyle: diaSelect.id == id ? "oblique" : "normal"
        }}
            onClick={() => isFestivo ? null : onClickTD(id)}
            scope="col">{dia}<small
                className="form-text">{fecha}</small>
        </th>
    )
}