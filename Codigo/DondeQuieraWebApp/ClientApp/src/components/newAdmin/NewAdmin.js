import React, { useState, useContext } from 'react';
import uuid from 'uuid/v4'; //Genera un Id unico npm i uuid
import { InputText, InputMail, InputPassword, Alert, Error } from '../common';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { Loading } from '../common';

export default function NewUser({ history }) {
    const [msjAlert, setMsjAlert] = useState();
    const [msjError, setMsjError] = useState();
    const { configs, loading } = useContext(ConfigContext);
    const { addUsers } = useContext(UserContext);

    const getRandom = length => {
        let config;
        let number = 0;
        do {
            number = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
            config = configs.find(u => u.accountId === number);
        } while (config != null)

        return number;
    }

    const getEmptyUser = () => {
        return {
            id: uuid(),
            accountId: getRandom(6),
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

            user.rol = "Admin";
            addUsers(user);
            setUser(getEmptyUser());
            history.push('/login');
        }
    }

    const { accountId, name, mail, cargo, password } = user;

    const validarFormulario = () => {
        if (accountId == null) {
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
            return 'Constraseña';
        }
        return null;
    }

    return (
        <>
            {loading ? <Loading /> :
                <form onSubmit={onSubmit}>
                    <div className="form-group text-center">
                        <h3>Nuevo administrador</h3>
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountId">Id Cuenta</label>
                        <InputText value={accountId} readOnly id="accountId" placeholder="Ingrese su Id de cuenta" />
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
            }
        </>
    )
}