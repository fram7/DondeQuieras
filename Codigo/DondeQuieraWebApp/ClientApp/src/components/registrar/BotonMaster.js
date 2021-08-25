import React, { useState } from 'react';
import ListaEspera from './ListaEspera';
const imgEspera = require('../../assets/waitlist.png');

export default function BotonMaster({ cantLibre, isActive, onClick, options }) {
    const { imagen, color, titulo, valor } = options;

    return cantLibre == 0 ? <ListaEspera imagen={imgEspera} /> :
        <div className="item"
            onClick={() => onClick(valor)}
            style={{
                cursor: cantLibre == 0 ? null : "pointer",
                filter: `grayscale(${isActive ? 0 : 1})`
            }}>
            {cantLibre && cantLibre <= 3 && cantLibre > 0 ?
                <span style={{ background: color }}
                    className="notify-badge">{cantLibre}</span>
                : null}
            <img src={imagen} width="50px" disabled={cantLibre == "0"}
                style={{ cursor: cantLibre == 0 ? null : "pointer" }} />
            <small style={{ color: color }} className="form-text">{titulo}</small>
        </div>
}