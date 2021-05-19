import React, {
    useState,
    useEffect
} from 'react';

import {
    Navbar,
    Nav
} from 'react-bootstrap';

import {
    Link
} from 'react-router-dom';

import '../styles/NavBar.css';

const NavBar = () => {

    const [user, setUser]           =   useState('');

    useEffect(() => {
        
        setUser(localStorage.getItem('loginToken'));

    },[user])

    return(
        <Navbar
            bg="dark"
            expand="md"
            fixed="top"
            className="custom-navbar"
        >
            <Navbar.Brand 
                href="/"
                className="brand-name"
            >Finanzas Personales</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                 
                    <Link
                        to="/signUp"
                        className="nav-link register"
                    >
                        Regístrate
                    </Link>

                    <Link
                        to="/signIn"
                        className="nav-link register"
                    >
                        Inicia Sesión
                    </Link>
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;