import React from 'react';
import {
    Nav,
    Container,
    Row,
    Image
} from 'react-bootstrap';
import {
    withRouter, 
    Link
} from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = (props) => {

    return(
        <Container
            className="sidebar bg-dark"
        >
            <div
                className="pt-3"
            >
                <Row
                    className="justify-content-center"
                >
                    <Image
                        roundedCircle
                        fluid
                        src             = {props.profilePicture}
                        className       = "profile-picture"
                    />
                </Row>
                <Row
                    className="mt-4 justify-content-center  d-block"
                >
                    <h6
                        className="text-center text-white user-name"
                    >
                        Bienvenid@
                    </h6>
                    <h6
                        className="text-center text-white user-name"
                    >
                        { `${props.userName} ${props.userLastName}` }
                    </h6>
                </Row>
            </div>

            <Nav
                className="mt-3 flex-column"
            >
                <Link
                    to='/user/:userID/summary'
                    className="sidebar-link"
                >
                    Resumen Financiero
                </Link>
                <Nav.Link
                    className="sidebar-link"
                >
                    Mi Presupesto
                </Nav.Link>
                <Nav.Link
                    className="sidebar-link"
                >
                    Mis Metas
                </Nav.Link>
                <Nav.Link
                    className="sidebar-link"
                >
                    Movimientos
                </Nav.Link>
                <Nav.Link
                    className="sidebar-link"
                >
                    Mis Inversiones
                </Nav.Link>
                <Link
                    to='/user/:userID/finMarket'
                    className="sidebar-link"
                >
                    Mercados Financieros
                </Link>
                <Nav.Link
                    className="sidebar-link"
                >
                    Salir
                </Nav.Link>
            </Nav>
        </Container>
    );
}

export default withRouter(Sidebar);