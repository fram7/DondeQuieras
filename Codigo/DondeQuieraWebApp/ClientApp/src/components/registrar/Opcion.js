import React, { useEffect, useState, useContext } from 'react';
import BotonRemotoLocal from './BotonRemotoLocal';
import Festivo from './Festivo';
import { ConfigContext } from '../../context/ConfigContext';
const festivo = require('../../assets/beach.png');

const Opcion = ({ fecha, diaEquipo, setDiaOpcion, cantPuestosLocales, usuario, setDiaSelect }) => {

    const [isRemote, setIsRemote] = useState(true);//Por defecto en casa
    const [isFestivo, setIsFestivo] = useState(false);
    const { getConfigByAccountId, validateIsFestivo } = useContext(ConfigContext);

    useEffect(() => {
        const config = getConfigByAccountId(usuario.accountId);
        setIsFestivo(validateIsFestivo(config, fecha.fecha));
    }, []);

    useEffect(() => {
        if (!isFestivo) {
            if (diaEquipo == null) {
                setIsRemote(isRemote);
                diaEquipo = {
                    fecha: fecha,
                    miembros: [{
                        userId: usuario.id,
                        isRemoto: isRemote
                    }]
                };
            } else {
                const userDayOption = diaEquipo.miembros.find(d => usuario != null && d.userId == usuario.id);
                setIsRemote(userDayOption ? userDayOption.isRemoto : isRemote);
            }
        }
    }, [diaEquipo, isRemote]);

    const [cantLibreRemoto, setCantLibreRemoto] = useState(0);
    const [cantLibreLocal, setCantLibreLocal] = useState(0);
    useEffect(() => {
        const cantGenteLocal = !diaEquipo ? 0 : diaEquipo.miembros.filter(f => f != null
            && usuario != null && f.isRemoto == false && f.userId != usuario.id).length;
        const cantGenteRemota = !diaEquipo ? 0 : diaEquipo.miembros.filter(f => f != null
            && usuario != null && f.isRemoto == true && f.userId != usuario.id).length;
        /*Pendiente poner valores reales*/
        setCantLibreLocal(cantPuestosLocales - cantGenteLocal);
        setCantLibreRemoto(null);
    }, [diaEquipo]);

    const setIsRemoto = (value) => {
        setIsRemote(value);

        let newMiembros = [{
            userId: usuario.id,
            isRemoto: value
        }];
        if (diaEquipo) {
            let { miembros } = diaEquipo;
            const index = miembros.findIndex(d => d.userId == usuario.id);
            if (index !== -1) {
                let copyMiembros = [...miembros];
                copyMiembros[index].isRemoto = value;
                newMiembros = copyMiembros;
            } else {
                newMiembros = [...miembros, {
                    userId: usuario.id,
                    isRemoto: value
                }];
            }
        }
        setDiaSelect(fecha);

        setDiaOpcion(usuario.accountId, {
            fecha: fecha,
            miembros: newMiembros
        });
    }



    return (
        <td rowSpan="2" className="text-center"
            style={{
                verticalAlign: "middle",
            }}>
            {isFestivo ? <Festivo imagen={festivo} /> :
                <BotonRemotoLocal
                    isRemoto={isRemote}
                    setIsRemoto={setIsRemoto}
                    cantLibreLocal={cantLibreLocal}
                    cantLibreRemoto={cantLibreRemoto} />}
        </td >
    )
}

export default Opcion;