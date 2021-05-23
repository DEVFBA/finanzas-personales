import React, { 
    useState,
    useContext, 
    useEffect
} from 'react';

import {
    Container,
    Form,
    Button,
    Spinner
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

    const [eMail,       setEmail    ]           = useState('');
    const [password,    setPassword ]           = useState('');
    const [loading,     setLoading  ]           = useState(false);

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

        setLoading(true);
        
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
            
            history.push(`/user/summary`, { user });

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

                {
                    loading?
                        <Button variant="dark" disabled>
                            <Spinner
                                as          = "span"
                                animation   = "border"
                                size        = "sm"
                                role        = "status"
                                aria-hidden = "true"
                                className   = "mr-3"
                            />
                            Iniciando Sesión
                        </Button>:
                        <Button
                            variant     = "dark"
                            type        = "submit"
                        >
                            Ingresar
                        </Button>
                }

            </Form>
        </Container>
    );
}

export default SignIn;