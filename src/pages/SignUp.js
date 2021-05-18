import React, {
    useState
} from 'react';
import {
    Form,
    Button,
    Container
} from 'react-bootstrap';
import {
    useHistory
} from 'react-router-dom';
import userLogin, {
    completeRegister,
    signUp,  
    retrieveUserProfile
} from '../utils/UserFunctions';
import '../styles/SignUp.css';

const SignUp = () => {

    const[name,         setName]                    = useState('');
    const[lastName,     setLastName]                = useState('');
    const[eMail,        setEmail]                   = useState('');
    const[password,     setPassword]                = useState('');

    const history                       = useHistory();

    const onChangeName = (event) => {
        setName(event.target.value.trim());
    }

    const onChangeLastName = (event) => {
        setLastName(event.target.value.trim());
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value.trim());
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    async function onSubmitForm(event) {
        event.preventDefault();

        let completeData = false;
        let userData = {};

        completeData = await completeRegister(name, lastName, eMail, password);

        if(completeData){
            userData = await signUp(name, lastName, eMail, password);

            console.log(userData);

            localStorage.setItem("loginToken", userData.token);

            const user = await retrieveUserProfile(userData.token);

            history.push(`/user/${user.id}/summary`, { user });
        } else {
            alert(`Debes ingresar todos los datos para registrarte`);
        }

    }

    return(
        <Container className="signUp row justify-content-center">
            <Form
                className       = "col-md-6 mt-4 offset-3"
                onSubmit        = { onSubmitForm }
            >

                <Form.Group controlId   = "formBasicUserName">
                    <Form.Label>
                        Nombre
                    </Form.Label>
                    <Form.Control
                        type            = "text"
                        placeholder     = "Nombre"
                        onChange        = { onChangeName }
                    />
                </Form.Group>

                <Form.Group controlId   = "formBasicUserName">
                    <Form.Label>
                        Apellidos
                    </Form.Label>
                    <Form.Control
                        type            = "text"
                        placeholder     = "Apellido"
                        onChange        = { onChangeLastName }
                    />
                </Form.Group>

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

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type            = "password"
                        placeholder     = "Password"
                        onChange        = { onChangePassword }
                    />
                </Form.Group>
                <Button
                    variant     =   "dark"
                    type        =   "submit"
                >
                    Regístrate
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;