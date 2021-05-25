import React from 'react';
import {
    Nav,
    Container,
    Row,
    Image,
    Button
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
                className   =   "mt-3 flex-column"
            >
                <Link
                    to          =   { `/user/summary` }
                    className   =   "sidebar-link mt-1 ml-3"
                >
                    Resumen Financiero
                </Link>
                <Link
                    to          =   { `/user/budget` }
                    className   =   "sidebar-link mt-1 ml-3"
                >
                    Mi Presupesto
                </Link>
                <Link
                    to          =   { `/user/goals` }
                    className   =   "sidebar-link mt-1 ml-3"
                >
                    Mis Metas
                </Link>
                <Link
                    to          =   { `/user/transactions` }
                    className   =   "sidebar-link mt-1 ml-3"
                >
                    Movimientos
                </Link>
                <Link
                    to          =   { `/user/investments` }
                    className   =   "sidebar-link mt-1 ml-3"
                >
                    Mis Inversiones
                </Link>
                <Link
                    to          =   { `/user/finMarket` }
                    className   =   "sidebar-link mt-1 ml-3"
                >
                    Mercados Financieros
                </Link>
                <Link
                    to          =   { `/` }
                    className   =   "sidebar-link mt-1 ml-3"
                    onClick     =   { localStorage.removeItem('loginToken') }
                >
                    Salir
                </Link>
            </Nav>
        </Container>
    );
}

export default withRouter(Sidebar);