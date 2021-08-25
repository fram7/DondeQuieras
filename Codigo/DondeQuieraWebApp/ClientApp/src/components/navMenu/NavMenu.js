import React, { useState, useContext } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './NavMenu.css';

export default function NavMenu() {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    const { usuario, setUsuario } = useContext(UserContext);
    const closeSesion = () => {
        setUsuario(null);
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                light>
                <Container>
                    <NavbarBrand tag={Link} to="/">DondeQuiera</NavbarBrand>
                    <NavbarToggler onClick={() => toggleNavbar()} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            {!usuario ? //login y registrar solo si no he entrado
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/newUser">Registrar</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/newAdmin">Nuevo Admin</NavLink>
                                    </NavItem>
                                </>
                                : null}
                            {usuario ? //cargar, configurar y cerrar sesion si ya entro
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/registrar">Cargar</NavLink>
                                    </NavItem>
                                    {usuario && usuario.rol == "Admin" ? //Muestro configuracion solo al rol Admin
                                        <>
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to="/config">Configuracion</NavLink>
                                            </NavItem>
                                        </>
                                        : null}
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/login" onClick={() => closeSesion()}>Cerrar Session</NavLink>
                                    </NavItem>
                                </>
                                : null}
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
