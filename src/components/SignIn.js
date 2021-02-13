import React, { 
    useState 
} from 'react';
import {
    Container,
    Form,
    Button
} from 'react-bootstrap';
import {
    useHistory
} from 'react-router-dom';
import correctLogin, {
    retrieveUserProfile,
    completeLogin
} from '../utils/UserFunctions';
import '../styles/SignIn.css';

const SignIn = () => {

    const[eMail, setEmail]              = useState('');
    const[password, setPassword]        = useState('');
    
    const history                       = useHistory();
    
    let userProfile                     = {};

    const onChangeEmail = (event) => {
        setEmail(event.target.value.trim());
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
        <Container className="signIn row justify-content-center">
            <Form
                className   = "col-md-6 mt-4 offset-3"
                onSubmit    = { onSubmitForm }
            >

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                        Correo Electrónico
                    </Form.Label>
                    <Form.Control
                        type            = "email"
                        placeholder     = "Ingresa tu Correo Electrónico"
                        onChange        = { onChangeEmail }
                    />
                </Form.Group>

                <Form.Group controlId   ="formBasicPassword">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type        = "password"
                        placeholder = "Password"
                        onChange    = { onChangePassword }
                    />
                </Form.Group>
                <Button
                    variant     = "dark"
                    type        = "submit"
                >
                    Ingresar
                </Button>
            </Form>
        </Container>
    );
}

export default SignIn;