import React, {
    useState
} from 'react';
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button
} from 'react-bootstrap';
import {
    Link,
    useHistory
} from 'react-router-dom';
import correctLogin, {
    retrieveUserProfile,
    completeLogin
} from '../utils/UserFunctions';
import '../styles/NavBar.css';

const NavBar = () => {

    const[eMail,        setEmail]       = useState('');
    const[password,     setPassword]    = useState('');
    
    const history                       = useHistory();
    
    let userProfile                     = {};

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitForm = (event) => {
        event.preventDefault();

        if(completeLogin(eMail, password)){

            if(correctLogin(eMail, password)){

                userProfile = retrieveUserProfile(eMail, password);
                history.push(`/${userProfile.userID}/summary`);

            } else{
                alert(`El usuario ${eMail} y password ${password} no existen`);
            }

        } else {
            alert(`Ingrese contraseña y password`);
        }

    }

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
                        to="/signIn"
                        className="nav-link register"
                    >
                        Regístrate
                    </Link>
                    <Form
                        inline
                        onSubmit={onSubmitForm}
                    >
                        <FormControl
                            type="text"
                            placeholder="E-Mail"
                            className="mr-sm-2"
                            onChange={onChangeEmail}
                        />
                        <FormControl
                            type="password"
                            placeholder="Password"
                            className="mr-sm-2"
                            onChange={onChangePassword}
                        />
                        <Button type="submit" variant="outline-light">Ingresa</Button>
                    </Form>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;