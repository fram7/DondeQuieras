import React from 'react';


export default function ListaEspera({ imagen }) {
    return (
        <div onClick={() => alert("Comming soon")}
            style={{
                cursor: "pointer",
            }}>
            <br />
            <img src={imagen} width="35px" />
            <small style={{ color: "#26C6DA" }} className="form-text">Lista de espera</small>
        </div>
    )
}