import React, { useState, useContext } from 'react';
import uuid from 'uuid/v4'; //Genera un Id unico npm i uuid
import { InputText, InputMail, InputPassword, Alert, Error } from '../common';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';

export default function NewUser({ history }) {
    const [msjAlert, setMsjAlert] = useState();
    const [msjError, setMsjError] = useState();
    const { addUsers } = useContext(UserContext);
    const { getConfigByAccountId } = useContext(ConfigContext);

    const getEmptyUser = () => {
        return {
            id: uuid(),
            accountId: "", //TODO: Traerlo del codigo de invitacion que se envia
            name: "",
            mail: "",
            cargo: "",
            password: "",
            rol: ""
        };
    }
    const [user, setUser] = useState(() => getEmptyUser());

    const cambioValor = e => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        const mensaje = validarFormulario();

        setMsjAlert(mensaje);
        if (mensaje == null) {
            const config = getConfigByAccountId(user.accountId);
            if (config == null) {
                setMsjAlert("No existe la cuenta")
            } else {
                user.rol = "Colaborador";
                addUsers(user);
                setUser(getEmptyUser());
                history.push('/login');
            }
        }
    }

    const { accountId, name, mail, cargo, password } = user;

    const validarFormulario = () => {
        if (accountId == null || accountId.trim().length == 0) {
            return 'Id Cuenta'
        }
        if (name == null || name.trim().length == 0) {
            return 'Nombre';
        }
        if (cargo == null || cargo.trim().length == 0) {
            return 'Cargo';
        }
        if (mail == null || mail.trim().length == 0) {
            return 'Correo';
        }
        if (password == null || password.trim().length == 0) {
            return 'Contraseña';
        }
        return null;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group text-center">
                <h3>Nuevo usuario</h3>
            </div>
            <div className="form-group">
                <label htmlFor="accountId">Id Cuenta</label>
                <InputText value={accountId} id="accountId" onChange={cambioValor} placeholder="Ingrese su id de cuenta" />
            </div>
            <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <InputText id="name" value={name} onChange={cambioValor} placeholder="Ingrese su nombre" />
            </div>
            <div className="form-group">
                <label htmlFor="cargo">Cargo</label>
                <InputText id="cargo" value={cargo} onChange={cambioValor} placeholder="Ingrese su cargo" />
            </div>
            <div className="form-group">
                <label htmlFor="mail">Correo</label>
                <InputMail id="mail" value={mail} onChange={cambioValor} placeholder="Ingrese su correo" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <InputPassword id="password" value={password} onChange={cambioValor} placeholder="Contraseña" />
            </div>
            {!msjAlert ? null :
                <div className="form-group">
                    <Alert message="es obligatorio" field={msjAlert} />
                </div>
            }
            <div className="form-group text-center justify-content-center">
                <button type="submit" className="btn btn-primary">Registrar</button>
                	&nbsp;
                <button type="submit" className="btn btn-outline-primary">Cancelar</button>
            </div>
            {!msjError ? null :
                <div className="form-group">
                    <Error message={msjError} />
                </div>
            }
        </form>
    )
}