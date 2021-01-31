import React, {useState} from 'react';
import '../styles/SignUp.css';
import {
    Form,
    Button,
    Container
} from 'react-bootstrap';

const SignUp = () => {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    console.log('Name', name);
    console.log('Correo', email);
    console.log('Password', password);

    return(
        <Container className="signUp row justify-content-center">
            <Form className="col-md-6 mt-4 offset-3">

                <Form.Group controlId="formBasicUserName">
                    <Form.Label>
                        Nombre
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu Nombre"
                        onChange={onChangeName}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                        Correo Electrónico
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu Correo Electrónico"
                        onChange={onChangeEmail}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={onChangePassword}
                    />
                </Form.Group>
                <Button
                    variant="dark"
                    type="submit"
                >
                    Regístrate
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;