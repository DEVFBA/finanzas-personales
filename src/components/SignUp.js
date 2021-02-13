import React, {
    useState
} from 'react';
import {
    Form,
    Button,
    Container
} from 'react-bootstrap';
import {
    completeRegister
} from '../utils/UserFunctions';
import '../styles/SignUp.css';

const SignUp = () => {

    const[name,         setName]                    = useState('');
    const[lastName,     setLastName]                = useState('');
    const[eMail,        setEmail]                   = useState('');
    const[password,     setPassword]                = useState('');

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

    const onSubmitForm = (event) => {
        event.preventDefault();

        if(completeRegister(name, lastName, eMail, password)){
            alert(`El usuario ${name} ${lastName} con correo ${eMail} y password ${password} fue registrado`);
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
                        placeholder     = "Ingresa tu Nombre"
                        onChange        = { onChangeName }
                    />
                </Form.Group>

                <Form.Group controlId   = "formBasicUserName">
                    <Form.Label>
                        Apellidos
                    </Form.Label>
                    <Form.Control
                        type            = "text"
                        placeholder     = "Ingresa tu Nombre"
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