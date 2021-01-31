import React from 'react';
import {
    Nav
} from 'react-bootstrap';
import '../styles/Sidebar.css';

const Sidebar = () => {
    return(
        <Nav
            className="mr-auto flex-column sidebar bg-dark mr-0 ml-0 p-0"
        >
            <Nav.Link href="#link">Panorama</Nav.Link>
            <Nav.Link href="#link">Mi Presupesto</Nav.Link>
            <Nav.Link href="#link">Mis Metas</Nav.Link>
            <Nav.Link href="#link">Movimientos</Nav.Link>
            <Nav.Link href="#link">Mis Inversiones</Nav.Link>
        </Nav>
    );
}

export default Sidebar;