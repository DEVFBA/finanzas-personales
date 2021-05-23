import React, {
    useState,
    useEffect,
    Fragment
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
    Link 
} from 'react-router-dom';

import GoalsChart from '../components/GoalsChart';
import NoDataRegistered from '../components/NoDataRegistered';
import UpdatingSpinner from '../components/UpdatingSpinner';

import {
    getDateString,
    convertStrAmountToNum
} from '../utils/TextFormat'

import completeGoal, {
    saveGoal,
    deleteGoal,
    completeUpdate,
    updateGoal
} from '../utils/APIFunctions';

import '../styles/Goals.css';

const Goals = (props) => {

    const [showAdd,         setShowAdd      ]           = useState(false);
    const [showDelete,      setShowDelete   ]           = useState(false);
    const [showUpdate,      setShowUpdate   ]           = useState(false);
    const [goal,            setGoal         ]           = useState('');
    const [targetAmount,    setTargetAmount ]           = useState(0);
    const [savedAmount,     setSavedAmount  ]           = useState(0);
    const [targetDate,      setTargetDate   ]           = useState(0);
    const [goalData,        setGoalData     ]           = useState(null);
    const [loading,         setLoading      ]           = useState(false);

    useEffect(() => {

        getRowText();

    });

    const handleCloseAdd = () => {
        
        setGoal('');
        setTargetAmount(0);
        setSavedAmount(0);
        setTargetDate(null);
        
        setShowAdd(false);

    }

    const handleShowAdd = () => setShowAdd(true);

    const handleCloseDelete = () => {

        removeGoalLocalStorage()
        
        setGoalData(null);
        setShowDelete(false);

    }

    async function handleShowDelete(){

        await getRowText();

        await setGoalLocalStorage();

        setShowDelete(true);

    }

    const handleCloseUpdate = () => {

        removeGoalLocalStorage();

        setGoalData(null);
        setShowUpdate(false);

    }

    async function handleShowUpdate(){
        
        await getRowText();

        await setGoalLocalStorage();

        setShowUpdate(true);

    }

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

        setLoading(true);

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

        props.dataChange();

        setLoading(false);

        handleCloseAdd();

    }

    const onChangeUpdateSaved = (event) => {
        
        setSavedAmount(event.target.value);

    }

    const onChangeUpdateTarget = (event) => {

        setTargetAmount(event.target.value);

    }

    async function updateGoalId(){
        
        let completeData                    = false;

        setLoading(true);
        
        const savedAmountUpdated            = document.getElementById('saved-amount').value;
        const targetAmountUpdated           = document.getElementById('target-amount').value;

        completeData = await completeUpdate(targetAmountUpdated);

        if(completeData){

            const userToken                 = localStorage.getItem('loginToken');
            const id                        = localStorage.getItem('goalID');

            await updateGoal(targetAmountUpdated, savedAmountUpdated, userToken, id);

        } else{
            alert('Data incompleta ó Monto Objetivo debe ser mayor a cero');
        }

        setTargetAmount(0);
        setSavedAmount(0);
        props.dataChange();

        setLoading(false);

        handleCloseUpdate();

    }

    async function deleteGoalId(){

        const id = localStorage.getItem('goalID');
        const token = localStorage.getItem('loginToken');

        await deleteGoal(id, token);

        props.dataChange();

        handleCloseDelete();

    }

    async function getRowText(){
        const table = document.getElementById('goals-table');

        if(table){

            for(let i = 0; i < table.rows.length; i++){

                table.rows[i].onclick = async function(){
                    await tableText(this);
                }

            }
        }
    }

    async function tableText(tableRow) {

        const goalId                    = tableRow.childNodes[0].innerHTML;
        const goalDescription           = tableRow.childNodes[1].innerHTML;
        const goalSavedAmount           = tableRow.childNodes[2].innerHTML;
        const goalTargetAmount          = tableRow.childNodes[3].innerHTML;
        const goalTargetDate            = tableRow.childNodes[4].innerHTML;

        const goalData = {
            goalId: goalId,
            goalDescription: goalDescription,
            goalSavedAmount: goalSavedAmount,
            goalTargetAmount: goalTargetAmount,
            goalTargetDate: goalTargetDate
        }

        setGoalData(goalData);

    }

    async function setGoalLocalStorage(){

        localStorage.setItem('goalID', goalData.goalId);
        localStorage.setItem('goalDescription', goalData.goalDescription);
        localStorage.setItem('goalSavedAmount', goalData.goalSavedAmount);
        localStorage.setItem('goalTargetAmount', goalData.goalTargetAmount);
        localStorage.setItem('goalTargetDate', goalData.goalTargetDate);

    }

    async function removeGoalLocalStorage(){

        localStorage.removeItem('goalID');
        localStorage.removeItem('goalDescription');
        localStorage.removeItem('goalSavedAmount');
        localStorage.removeItem('goalTargetAmount');
        localStorage.removeItem('goalTargetDate');

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
                    onClick     = { handleShowAdd }
                    col         = 'sm-3'
                >
                    Nuevo Ahorro
                </Button>
            </Row>

            <Table 
                responsive              = "md" 
                striped
                className               = "goals-table mt-5"
                id                      = 'goals-table'
            >
                <thead>
                    <tr>
                        <th
                            hidden = 'hidden'
                        ></th>
                        <th hidden = 'hidden'>
                            Object ID
                        </th>
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
                                <td hidden = 'hidden'>
                                    { goal._id }
                                </td>
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
                                    <Link
                                        className               = 'mr-3'
                                        onClick                 = { handleShowUpdate }
                                    >
                                            Actualizar
                                    </Link>
                                    <Link 
                                        onClick                 = { handleShowDelete }
                                    >
                                        Eliminar
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
                
            {props.userGoals.length > 0?
                <GoalsChart
                    userGoals = { props.userGoals }
                />:<NoDataRegistered />
            }

            <Modal 
                show            = { showAdd } 
                onHide          = { handleCloseAdd }
                className       = 'add-goals-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Nuevo Ahorro
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        loading?
                            <UpdatingSpinner />:
                            <Form>

                                <Form.Control
                                    type            = "text"
                                    placeholder     = "¿Para qué quieres ahorrar?"
                                    onChange        = { onChangeGoal }
                                    className       = 'mt-1'
                                />

                                <Form.Control
                                    type            = "number"
                                    placeholder     = "¿Cuánto quieres ahorrar?"
                                    onChange        = { onChangeTargetAmount }
                                    className       = 'mt-3'
                                />

                                <Form.Control
                                    type            = "number"
                                    placeholder     = "¿Cuánto llevas ahorrado?"
                                    onChange        = { onChangeSavedAmount }
                                    className       = 'mt-3'
                                />

                                <Form.Control
                                    type            = "date"
                                    placeholder     = "¿Para cuándo quieres lograrlo?"
                                    onChange        = { onChangeTargetDate }
                                    className       = 'mt-3'
                                />

                            </Form>
                    }

                </Modal.Body>

                <Modal.Footer>

                    <Button 
                        variant             = "secondary" 
                        onClick             = { handleCloseAdd }
                    >
                        Cerrar
                    </Button>
                    <Button 
                        variant             ="primary" 
                        onClick             = { saveNewGoal }
                    >
                        Guardar Ahorro
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal 
                show            = { showDelete } 
                onHide          = { handleCloseDelete }
                className       = 'delete-goals-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Borrar Ahorro
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <h6>
                        { `Has cumplido tu meta de ahorro ${localStorage.getItem('goalDescription')} y ¿deseas borrarla?. Recuerda que la disciplina te puede llevar a lograr todo eso que tanto anhelas` }
                    </h6>
                    <h6>
                        { `Meta de Ahorro: ${localStorage.getItem('goalTargetAmount')}` }
                    </h6>
                    <h6>
                        { `Monto Ahorrado: ${localStorage.getItem('goalSavedAmount')}` }
                    </h6>
                    <h6>
                        { `Fecha Objetivo: ${localStorage.getItem('goalTargetDate')}` }
                    </h6>

                </Modal.Body>

                <Modal.Footer>

                    <Button 
                        variant             = "secondary" 
                        onClick             = { handleCloseDelete }
                    >
                        Cerrar
                    </Button>
                    <Button 
                        variant             ="primary" 
                        onClick             = { deleteGoalId }
                    >
                        Borrar Ahorro
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal 
                show            = { showUpdate } 
                onHide          = { handleCloseUpdate }
                className       = 'update-goals-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Actualizar Ahorro
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        loading?
                            <UpdatingSpinner/>:
                            <Form>

                                <Form.Control
                                    type                = 'text'
                                    placeholder         = { localStorage.getItem('goalDescription') }
                                    className           = 'mt-1'
                                    disabled
                                />

                                <Form.Label
                                    className           = 'mt-3'
                                >
                                    Monto Objetivo
                                </Form.Label>
                                <Form.Control
                                    type                = 'number'
                                    defaultValue        = { convertStrAmountToNum(localStorage.getItem('goalTargetAmount')) }
                                    onClick             = { onChangeUpdateTarget }
                                    id                  = 'target-amount'
                                />

                                <Form.Label
                                    className           = 'mt-3'
                                >
                                    Monto Ahorrado
                                </Form.Label>
                                <Form.Control
                                    type                = 'number'
                                    defaultValue        = { convertStrAmountToNum(localStorage.getItem('goalSavedAmount')) }
                                    onClick             = { onChangeUpdateSaved }
                                    id                  = 'saved-amount'   
                                />
                            
                            </Form>
                    }


                </Modal.Body>

                <Modal.Footer>

                    <Button 
                        variant             = "secondary" 
                        onClick             = { handleCloseUpdate }
                    >
                        Cerrar
                    </Button>
                    <Button 
                        variant             ="primary" 
                        onClick             = { updateGoalId }
                    >
                        Actualizar Ahorro
                    </Button>

                </Modal.Footer>
            </Modal>
            
        </Container>
    );
}

export default Goals;