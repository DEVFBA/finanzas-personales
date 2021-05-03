import React, { 
    useState,
    useContext 
} from 'react';
import {
    Container,
    Form,
    Button
} from 'react-bootstrap';
import {
    useHistory
} from 'react-router-dom';

import {
    UserContext
} from '../context/UserContext';
import userLogin, {
    retrieveUserProfile,
    completeLogin
} from '../utils/UserFunctions';

import '../styles/SignIn.css';

const SignIn = () => {

    const[eMail, setEmail]              = useState('');
    const[password, setPassword]        = useState('');

    const { setUser }                   = useContext(UserContext);
    
    const history                       = useHistory();
    
    let userProfile                     = {};

    const onChangeEmail = (event) => {
        setEmail(event.target.value.trim());
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    async function onSubmitForm(event){
        event.preventDefault();
        
        let userData = {};
        let completeData = false;

        completeData = await completeLogin(eMail, password);
        
        if(completeData){
            userData = await userLogin(eMail, password);
        } else {
            alert(`Ingrese contraseña y password`);
        }

        localStorage.setItem("loginToken", userData.user.token)
        const user = await retrieveUserProfile(userData.user.token);

        if(user){

            console.log('Usuario ', user.userName);
            
            history.push(`/user/${user.id}/summary`, { user });

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