import React from 'react';
import {
    Nav,
    Container,
    Row,
    Image
} from 'react-bootstrap';
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
                        src={props.profilePicture}
                        className="profile-picture"
                    />
                </Row>
                <Row
                    className="mt-2 justify-content-center"
                >
                    <h6
                        className="text-center text-white user-name"
                    >
                        {`${props.userName} ${props.userLastName}`}
                    </h6>
                </Row>
            </div>

            <Nav
                className="mt-3 flex-column"
            >
                <Nav.Link
                    className="text-white nav-pills"
                >
                    Resumen Financiero
                </Nav.Link>
                <Nav.Link
                    className="text-white"
                >
                    Mi Presupesto
                </Nav.Link>
                <Nav.Link
                    className="text-white"
                >
                    Mis Metas
                </Nav.Link>
                <Nav.Link
                    className="text-white"
                >
                    Movimientos
                </Nav.Link>
                <Nav.Link
                    className="text-white"
                >
                    Mis Inversiones
                </Nav.Link>
                <Nav.Link
                    className="text-white"
                >
                    Salir
                </Nav.Link>
            </Nav>
        </Container>
    );
}

export default Sidebar;