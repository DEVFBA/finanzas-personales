import React from 'react';
import {
    Nav,
    Container,
    Row,
    Image
} from 'react-bootstrap';
import {
    withRouter, 
    Link,
    useParams
} from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = (props) => {

    //const { userID } = useParams();
    
    console.log('In Sidebar params: ', props);

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
                    className="sidebar-link mt-1 ml-3"
                >
                    Resumen Financiero
                </Link>
                <Link
                    to='/user/:userID/budget'
                    className="sidebar-link mt-1 ml-3"
                >
                    Mi Presupesto
                </Link>
                <Link
                    to='/user/:userID/goals'
                    className="sidebar-link mt-1 ml-3"
                >
                    Mis Metas
                </Link>
                <Link
                    to='/user/:userID/transactions'
                    className="sidebar-link mt-1 ml-3"
                >
                    Movimientos
                </Link>
                <Link
                    to='/user/:userID/investments'
                    className="sidebar-link mt-1 ml-3"
                >
                    Mis Inversiones
                </Link>
                <Link
                    to='/user/:userID/finMarket'
                    className="sidebar-link mt-1 ml-3"
                >
                    Mercados Financieros
                </Link>
                <Link
                    className="sidebar-link mt-1 ml-3"
                >
                    Salir
                </Link>
            </Nav>
        </Container>
    );
}

export default withRouter(Sidebar);