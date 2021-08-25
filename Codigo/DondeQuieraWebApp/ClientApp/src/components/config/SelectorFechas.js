import React from 'react';

export default function SelectorFechas({ semanas, cambioSemana }) {
    return (
        <select className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => cambioSemana(e)}>
            {semanas && semanas.map((unaFecha, idx) =>
                <option value={unaFecha.id}
                    key={unaFecha.id}>Semana [{unaFecha.dias[0].fecha} - {unaFecha.dias[unaFecha.dias.length - 1].fecha} ]
                </option>
            )};
        </select>
    )
}