import React, { createContext, useEffect, useState } from 'react';
import firebaseConf from './Firebase';
import bcrypt from 'bcryptjs';

export const UserContext = createContext();

const UserProvider = (props) => {
    //var starCountRef = firebaseConf.database().ref('users');
    //starCountRef.on('value', function (snapshot) {
    //    console.log('rt', snapshot.val());
    //});

    //1. Usuario Logeado
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('loginUser')));

    useEffect(() => {
        localStorage.setItem('loginUser', JSON.stringify(usuario));
    }, [usuario, setUsuario]);

    //2. Listado Usuarios Registrados
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebaseConf.database().ref('users').on('value', function (snapshot) {
            if (snapshot.val() != null) {
                setUsers(snapshot.val());
            }
        });
    }, [])

    useEffect(() => {
        if (users && users.length > 0) {
            firebaseConf.database().ref('users').set(users);
        }
    }, [users, setUsers]);

    const addUsers = (user) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;

        const index = users.findIndex(u => u.mail && u.mail === user.mail);

        if (index !== -1) {
            let copyUsers = [...users];
            user.id = copyUsers[index].id
            copyUsers[index] = user;
            setUsers(copyUsers);
        } else {
            setUsers([...users, user]);
        }
    }

    const getUserById = userId => {
        return users.find(u => u.id == userId);
    }

    return (
        <UserContext.Provider
            value={{
                usuario,
                setUsuario,
                users,
                addUsers,
                getUserById
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider;