import React, { createContext, useState, useEffect } from 'react';
import { getSemanaIX } from './DateHelper';

//Crear el context
export const FechaContext = createContext();

//Provider datos y funciones
const FechaProvider = (props) => {
    const [semanas, setSemanas] = useState(getSemanaIX(0) );

    const getSemana = indicador => {
        return getSemanaIX(indicador);
    }

    /*
     TODO:!
            1. (NO Aplica lo hice dinamico) Semanas debe ser un arreglo con una propiedad que indique que semana es
            2. Ajustar Helper
            3. Ajustar Grilla de semana
     4. getFechaById
     5. En DiasEquipo => cambiar Fecha por FechaId
            6. Ajustar Festivo (calculo en caliente por fuera de seteo Inicial (solo debe ser cuando es nulo o la semana ya paso))
     */
    const getFechaById = fechaId => {
        return semanas.find(u => u.id == fechaId);
    }

    return (
        <FechaContext.Provider
            value={{
                semanas,
                setSemanas,
                getSemana
            }}
        >
            {props.children}
        </FechaContext.Provider>
    )
}
export default FechaProvider