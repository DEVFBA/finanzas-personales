import React, {
    useState
} from 'react';

import {
    Container,
    Row,
    Button,
    Table,
    Modal,
    Form
} from 'react-bootstrap';

import {
    getDateString
} from '../utils/TextFormat'

import completeGoal, {
    saveGoal
} from '../utils/APIFunctions';

import '../styles/Goals.css';

const Goals = (props) => {

    const [show, setShow]                           = useState(false);
    const [goal, setGoal]                           = useState('');
    const [targetAmount, setTargetAmount]           = useState(0);
    const [savedAmount, setSavedAmount]             = useState(0);
    const [targetDate, setTargetDate]               = useState(0);

    const handleClose       = () => {
        
        setGoal('');
        setTargetAmount(0);
        setSavedAmount(0);
        setTargetDate(null);
        
        setShow(false);

    }
        
    const handleShow        = () => setShow(true);

    const onChangeGoal = (event) => {
        setGoal(event.target.value);
    }

    const onChangeTargetAmount = (event) => {
        setTargetAmount(event.target.value);
    }
    
    const onChangeSavedAmount = (event) => {
        setSavedAmount(event.target.value);
    }

    const onChangeTargetDate = (event) => {
        setTargetDate(event.target.value);
    }

    async function saveNewGoal(){

        let completeData = false;

        completeData = await completeGoal(goal, targetAmount, targetDate);

        if(completeData){

            const userToken = localStorage.getItem('loginToken');

            await saveGoal(goal, targetAmount, savedAmount, targetDate, userToken);

        } else{
            alert('Data incompleta');
        }

        setGoal('');
        setTargetAmount(0);
        setSavedAmount(0);
        setTargetDate(null);

        handleClose();

    }

    return(
        <Container
            className='goals'
        >
            <Row>
                <h3>Mis Metas</h3>
            </Row>
            <Row>
                <Button
                    variant     = 'outline-light'
                    type        = 'submit'
                    className   = 'goalsButton mt-5'
                    onClick     = { handleShow }
                >
                    Nuevo Ahorro
                </Button>
            </Row>
            <Table 
                responsive="md" 
                striped
                className="goals-table mt-5"
            >
                <thead>
                    <tr>
                        <th>Meta</th>
                        <th>$ Ahorrado</th>
                        <th>Total Meta</th>
                        <th>Fecha Objetivo</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {props.userGoals.map((goal) => {
                        return(
                            <tr
                                key = { goal._id }
                            >
                                <td>{ goal.goal }</td>
                                <td className="td-amount">
                                    { goal.amountSaved.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                </td>
                                <td className="td-amount">
                                    { goal.targetAmount.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                </td>
                                <td className="td-date">
                                    { getDateString(goal.targetDate) }
                                </td>
                                <td className="td-buttons text-center">
                                    <a 
                                        href="https://www.w3schools.com"
                                        className = 'mr-3'
                                    >
                                            Actualizar
                                    </a>
                                    <a href="https://www.w3schools.com">Eliminar</a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Nuevo Ahorro
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form>

                        <Form.Control
                            type            = "text"
                            placeholder     = "¿Para qué quieres ahorrar?"
                            onChange        = { onChangeGoal }
                        />

                        <Form.Control
                            type            = "number"
                            placeholder     = "¿Cuánto quieres ahorrar?"
                            onChange        = { onChangeTargetAmount }
                        />

                        <Form.Control
                            type            = "number"
                            placeholder     = "¿Cuánto llevas ahorrado?"
                            onChange        = { onChangeSavedAmount }
                        />

                        <Form.Control
                            type            = "date"
                            placeholder     = "¿Para cuándo quieres lograrlo?"
                            onChange        = { onChangeTargetDate }
                        />

                    </Form>

                </Modal.Body>

                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={ saveNewGoal }>
                        Guardar Ahorro
                    </Button>

                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default Goals;