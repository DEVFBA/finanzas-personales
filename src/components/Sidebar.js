import React, {
    useEffect,
    useState
} from 'react';
import {
    Nav,
    Container,
    Row,
    Image
} from 'react-bootstrap';
import {
    useLocation
} from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {

    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const location = useLocation();

    useEffect(() => {
        setUserName(location.state.userProfile.userName);
        setProfilePicture(location.state.userProfile.profilePicture);
        setUserLastName(location.state.userProfile.userLastName);
    }, [location])

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
                        src={profilePicture}
                        className="profile-picture"
                    />
                </Row>
                <Row
                    className="mt-2 justify-content-center"
                >
                    <h6
                        className="text-center text-white user-name"
                    >
                        {`${userName} ${userLastName}`}
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