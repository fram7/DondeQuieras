import React, { Suspense, useEffect } from 'react';
import { Route } from 'react-router';
import Layout from './Layout';
import Home from './home/Home';
import Config from './config/Config';
import Registrar from './registrar/Registrar'
import Login from './login/Login';
import NewUser from './newUser/NewUser';
import NewAdmin from './newAdmin/NewAdmin';
import UserProvider from '../context/UserContext';
import EquipoProvider from '../context/EquipoContext';
import ConfigProvider from '../context/ConfigContext';
import FechaProvider from '../context/FechaContext';
import './custom.css';
import 'font-awesome/css/font-awesome.min.css';

//npm install react-bootstrap bootstrap
export default function App() {

    return (
        <UserProvider>
            <FechaProvider>
                <EquipoProvider>
                    <ConfigProvider>
                        <Layout>
                            <Route exact path='/' component={Home} />
                            <Route path='/registrar' component={Registrar} />
                            <Route path='/config' component={Config} />
                            <Route path='/login' component={Login} />
                            <Route path='/newUser' component={NewUser} />
                            <Route path='/newAdmin' component={NewAdmin} />
                        </Layout>
                    </ConfigProvider>
                </EquipoProvider>
            </FechaProvider>
        </UserProvider>
    );
}
