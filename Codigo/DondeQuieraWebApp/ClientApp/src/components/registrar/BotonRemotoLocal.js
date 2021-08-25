import React, { Fragment, useState, useEffect } from 'react';
import BotonMaster from './BotonMaster';
const remoto = require('../../assets/home2.png');
const oficina = require('../../assets/company.png');

const BotonRemotoLocal = ({ cantLibreLocal, cantLibreRemoto, isRemoto, setIsRemoto }) => {

    const onClick = (isValue) => {
        setIsRemoto(isValue);
    }

    const Remoto = {
        titulo: "Casa",
        valor: true,
        imagen: remoto,
        color: "#FC573B"
    }

    const Local = {
        titulo: "Oficina",
        valor: false,
        imagen: oficina,
        color: "#BE63F9"
    }

    return (
        <Fragment>
            <BotonMaster cantLibre={cantLibreRemoto} isActive={isRemoto} onClick={onClick} options={Remoto} />
            <br />
            <BotonMaster cantLibre={cantLibreLocal} isActive={!isRemoto} onClick={onClick} options={Local} />
        </Fragment >
    )
}

export default BotonRemotoLocal;