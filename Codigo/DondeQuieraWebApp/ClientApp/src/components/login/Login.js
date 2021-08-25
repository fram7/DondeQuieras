import React, { useState, useContext } from 'react';
import { InputText, InputPassword, InputMail, Alert, Error } from '../common';
import { UserContext } from '../../context/UserContext';
import bcrypt from 'bcryptjs';

const login = require('../../assets/login.png');

export default function Login({ history }) {
    const { users, setUsuario } = useContext(UserContext);

    const [user, setUser] = useState({});
    const [msjAlert, setMsjAlert] = useState();
    const [msjError, setMsjError] = useState();

    const { accountId, mail, password } = user;

    const cambioValor = e => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    }

    const userExists = () => {
        return users && users.find(u =>
            u.accountId == accountId
            && u.mail === mail
            && bcrypt.compareSync(password, u.password));
    }

    const onSubmit = e => {
        e.preventDefault();

        const mensaje = validarFormulario();

        setMsjAlert(mensaje);
        if (mensaje == null) {

            const theUser = userExists();
            if (theUser) {
                setUsuario(theUser);
                history.push('/registrar');
            } else {
                setMsjError('Login incorrecto');
            }
        }
    }

    const validarFormulario = () => {
        if (accountId == null) {
            return 'Id Cuenta'
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
                <img width="160px" src={login} />
            </div>
            <div className="form-group">
                <label htmlFor="accountId">Id Cuenta</label>
                <InputText onChange={cambioValor} id="accountId" placeholder="Ingrese su Id de cuenta" />
            </div>
            <div className="form-group">
                <label htmlFor="mail">Correo</label>
                <InputMail id="mail" onChange={cambioValor} placeholder="Ingrese su correo" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <InputPassword id="password" onChange={cambioValor} placeholder="Contraseña" />
            </div>
            {!msjAlert ? null :
                <div className="form-group">
                    <Alert field={msjAlert} message="es obligatorio" />
                </div>
            }
            <div className="form-group text-center justify-content-center">
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </div>
            {!msjError ? null :
                <div className="form-group">
                    <Error message={msjError} />
                </div>
            }
        </form>
    )
}