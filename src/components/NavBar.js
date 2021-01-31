import React from 'react';
import {
    Navbar,
    Nav
} from 'react-bootstrap';
import {
    Link
} from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
    return(
        <Navbar
            bg="dark"
            expand="md"
            fixed="top"
            variant="dark"
        >
            <Navbar.Brand href="/">Finanzas Personales</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link 
                        to="/signIn"
                        className="nav-link"
                    >
                        Regístrate
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;