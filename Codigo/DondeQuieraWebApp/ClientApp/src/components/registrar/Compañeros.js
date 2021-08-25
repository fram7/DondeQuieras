import React, { Fragment } from 'react';
import UnCompañero from './UnCompañero';
const imgUser = require('../../assets/user.png');

export default function Compañeros({ diaSelect, diaEquipo }) {

    const getCompañeros = () => {
        const { miembros } = !diaEquipo ? {} : diaEquipo
        const { dia, fecha } = diaSelect;
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col">
                            <h4>En la Oficina:</h4>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col">
                            <h5><strong>{dia}: </strong> {fecha}</h5>
                        </div>
                    </div>
                    {diaEquipo && miembros.filter(e => e.isRemoto == false).length > 0 ?
                        <div className="row">
                            {miembros && miembros.filter(e => e.isRemoto == false).map((usuario, index) =>
                                <UnCompañero
                                    key={usuario.userId}
                                    imgUser={imgUser}
                                    userId={usuario.userId}
                                />
                            )}
                        </div>
                        :
                        <div className="row">
                            <div className="col">
                                <h5> Aun no hay compañeros en la oficina</h5>
                            </div>
                        </div>
                    }
                </div>
            </Fragment>
        )
    }

    let render = !diaSelect ? <h5>Seleciona un dia para ver tus compañeros en la oficina</h5> : getCompañeros();

    return render;
};
