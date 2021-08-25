import React, { createContext, useState, useEffect } from 'react';
import firebaseConf from './Firebase';

//Crear el context
export const ConfigContext = createContext();

//Provider datos y funciones
const ConfigProvider = (props) => {
    const [loading, setLoading] = useState(true);
    //2. Config
    const [configs, setConfigs] = useState([]);

    useEffect(() => {
        firebaseConf.database().ref('configs').on('value', function (snapshot) {
            if (snapshot.val() != null) {
                setConfigs(snapshot.val());
            }
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        if (configs && configs.length > 0) {
            firebaseConf.database().ref('configs').set(configs);
        }
    }, [configs, setConfigs]);

    const addConfig = (config) => {
        const index = configs && configs.findIndex(u => u.accountId && u.accountId === config.accountId);

        if (index !== -1) {
            let copyConfigs = [...configs];
            copyConfigs[index] = config;
            setConfigs(copyConfigs);
        } else {
            setConfigs([...configs, config]);
        }
    }

    const getConfigByAccountId = accountId => {
        return configs.find(u => u.accountId == accountId);
    }

    const validateIsFestivo = (config, fecha) => {
        let nada = config != null && config.diasFestivos && config.diasFestivos.filter(unDia => unDia.fecha == fecha);
        return nada != null ? nada.length > 0 : false;
    }

    return (
        <ConfigContext.Provider
            value={{
                validateIsFestivo,
                addConfig,
                getConfigByAccountId,
                loading,
                configs
            }}
        >
            {props.children}
        </ConfigContext.Provider>
    )
}




export default ConfigProvider