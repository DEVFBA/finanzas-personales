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
    Form,
    Col
} from 'react-bootstrap';

import { 
    Link 
} from 'react-router-dom';

import UpdatingSpinner from '../components/UpdatingSpinner';

import {
    getDateString,
    convertStrAmountToNum,
    recurringString
} from '../utils/TextFormat';

import {
    completeTransaction, 
    saveTransaction
} from '../utils/APIFunctions';

import '../styles/Transactions.css';

const Transactions = (props) => {

    const [showAdd,             setShowAdd          ]           = useState(false);
    const [transactionData,     setTransactionData  ]           = useState(null);
    const [showDelete,          setShowDelete       ]           = useState(false);
    const [showUpdate,          setShowUpdate       ]           = useState(false);
    const [amount,              setAmount           ]           = useState(0);
    const [concept,             setConcept          ]           = useState('');
    const [date,                setDate             ]           = useState('');
    const [description,         setDescription      ]           = useState('');
    const [recurring,           setRecurring        ]           = useState(false);
    const [type,                setType             ]           = useState('');
    const [loading,             setLoading          ]           = useState(false);
    const [origin,              setOrigin           ]           = useState('');
    const [accountNumber,       setAccountNumber    ]           = useState('');
    const [bankTransactions,    setBankTransactions ]           = useState([]);

    useEffect(() => {

        getRowText();

    });

    console.log('User Transactions ', props);

    const handleShowAdd = () => {

        setBankTransactions(props.userBankTrans);

        console.log('1 ', props.userBankTrans);
        console.log('2 ', bankTransactions);

        setShowAdd(true);

    }

    const handleCloseAdd = () => {
        
        setAmount(0);
        setConcept('');
        setDate('');
        setDescription('');
        setRecurring('');
        setType('');
        setOrigin('');
        setAccountNumber('');
        setBankTransactions([]);
        
        setShowAdd(false);

    }

    async function handleShowDelete(){

        await getRowText();

        await setTransactionLocalStorage();

        setShowDelete(true);

    }

    async function handleShowUpdate(){
        
        await getRowText();

        await setTransactionLocalStorage();

        setShowUpdate(true);

    }

    const onChangeType = (event) => {
        setType(event.target.value);
        console.log('Type ', type);
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const onChangeConcept = (event) => {
        setConcept(event.target.value);
        console.log('Concept ', props.userBankTrans);
    }

    const onChangeAmount = (event) => {
        setAmount(event.target.value);
    }

    const onChangeDate = (event) => {
        setDate(event.target.value);
    }

    const onChangeRecurring = (event) => {
        setRecurring(event.target.checked);
    }

    const onChangeOrigin = (event) => {
        setOrigin(event.target.value);
        console.log('Origin ', origin);
    }

    const onChangeAccountNumber = (event) => {
        setAccountNumber(event.target.value);
    }

    async function saveNewTransaction(){

        let completeData = false;

        setLoading(true);

        completeData = await completeTransaction(type, concept, description, amount, date, origin);

        if(completeData){

            const userToken = localStorage.getItem('loginToken');

            await saveTransaction(type, concept, date, description, amount, recurring, origin, accountNumber, userToken);

        } else{
            alert('Data incompleta');
        }

        setAmount(0);
        setConcept('');
        setDate('');
        setDescription('');
        setRecurring('');
        setType('');
        setOrigin('');
        setAccountNumber('');

        props.dataChange();

        setLoading(false);

        handleCloseAdd();

    }

    async function setTransactionLocalStorage(){

        localStorage.setItem('transactionID', transactionData.transactionId);
        localStorage.setItem('type', transactionData.transactionType);
        localStorage.setItem('date', transactionData.transactionDate);
        localStorage.setItem('concept', transactionData.transactionConcept);
        localStorage.setItem('description', transactionData.transactionDescription);
        localStorage.setItem('amount', transactionData.transactionAmount);
        localStorage.setItem('recurring', transactionData.recurring);
        localStorage.setItem('origin', transactionData.origin);
        localStorage.setItem('accountNumber', transactionData.accountNumber);

    }

    async function removeTransactionLocalStorage(){

        localStorage.removeItem('transactionID');
        localStorage.removeItem('type');
        localStorage.removeItem('date');
        localStorage.removeItem('concept');
        localStorage.removeItem('description');
        localStorage.removeItem('amount');
        localStorage.removeItem('recurring');
        localStorage.removeItem('origin');
        localStorage.removeItem('accountNumber');

    }

    async function getRowText(){
        const table = document.getElementById('transactions-table');

        if(table){

            for(let i = 0; i < table.rows.length; i++){

                table.rows[i].onclick = async function(){
                    await tableText(this);
                }

            }
        }
    }

    async function tableText(tableRow) {

        const transactionId                 = tableRow.childNodes[0].innerHTML;
        const transactionType               = tableRow.childNodes[1].innerHTML;
        const transactionDate               = tableRow.childNodes[2].innerHTML;
        const transactionConcept            = tableRow.childNodes[3].innerHTML;
        const transactionDescription        = tableRow.childNodes[4].innerHTML;
        const transactionAmount             = tableRow.childNodes[5].innerHTML;
        const origin                        = tableRow.childNodes[6].innerHTML;
        const accountNumber                 = tableRow.childNodes[7].innerHTML;
        const recurring                     = tableRow.childNodes[8].innerHTML;


        const transactionData = {
            transactionId: transactionId,
            transactionType: transactionType,
            transactionDate: transactionDate,
            transactionConcept: transactionConcept,
            transactionDescription: transactionDescription,
            transactionAmount: transactionAmount,
            recurring: recurring,
            origin: origin,
            accountNumber: accountNumber
        }

        setTransactionData(transactionData);

    }

    return(
        <Container
            className='transactions'
        >
            <Row>
                <h3>Mis Movimientos</h3>
            </Row>

            <Row>
                <Button
                    variant     = 'outline-light'
                    type        = 'submit'
                    className   = 'transactionsButton mt-2'
                    onClick     = { handleShowAdd }
                >
                    Nueva Transacción
                </Button>
            </Row>

            <Table 
                responsive              = "md" 
                striped
                className               = "transactions-table mt-5"
                id                      = 'transactions-table'
            >
                <thead>
                    <tr>
                        <th
                            hidden = 'hidden'
                        ></th>
                        <th hidden = 'hidden'>
                            Object ID
                        </th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Concepto</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th>Origen</th>
                        <th>No. Cuenta</th>
                        <th hidden = 'hidden'>Recurrente</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {props.userTransactions.map((transaction) => {
                        return(
                            <tr
                                key = { transaction._id }
                            >
                                <td hidden = 'hidden'>
                                    { transaction._id }
                                </td>
                                <td>
                                    { transaction.type }
                                </td>
                                <td className="td-date">
                                    { getDateString(transaction.date) }
                                </td>
                                <td>
                                    { transaction.concept }
                                </td>
                                <td>
                                    { transaction.description }
                                </td>
                                <td className="td-amount">
                                    { transaction.amount.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                </td>
                                <td>
                                    { transaction.origin }
                                </td>
                                <td>
                                    { transaction.accountNumber }
                                </td>
                                <td className = "td-date" hidden = 'hidden'>
                                    { recurringString(transaction.recurring) }
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

            <Modal 
                show            = { showAdd } 
                onHide          = { handleCloseAdd }
                className       = 'add-transactions-modal'
                size            = 'lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Nueva Transacción
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        loading?
                            <UpdatingSpinner/>:
                            <Form>

                                <Form.Row>

                                    <Col>

                                        <Form.Label>
                                            Tipo Movimiento
                                        </Form.Label>
                                    
                                        <Form.Control
                                            as          = 'select'
                                            onChange    = { onChangeType }
                                        >
                                            <option></option>
                                            <option>Ingreso</option>
                                            <option>Egreso</option>
                                        </Form.Control>

                                    </Col>

                                    <Col>

                                    <Form.Label>
                                        Origen
                                    </Form.Label>
                                    
                                    <Form.Control
                                        as          = 'select'
                                        onChange    = { onChangeOrigin }
                                    >
                                        <option></option>
                                        <option>Efectivo</option>
                                        <option>Tarjeta de Débito</option>
                                        <option>Tarjeta de Crédito</option>
                                    </Form.Control>

                                </Col>

                                    <Col>
                                    
                                        {
                                            type === 'Ingreso'?
                                                <Fragment>

                                                    <Form.Label>
                                                        Concepto
                                                    </Form.Label>
                                                    
                                                    <Form.Control
                                                        as          = 'select'
                                                        onChange    = { onChangeConcept }
                                                    >
                                                        <option></option>
                                                        <option>Salario</option>
                                                        <option>Honorarios</option>
                                                        <option>Rentas</option>
                                                        <option>Otros</option>
                                                    </Form.Control>
                                                
                                                </Fragment>:
                                                type === 'Egreso'?
                                                    <Fragment>

                                                        <Form.Label>
                                                            Concepto
                                                        </Form.Label>

                                                        <Form.Control
                                                            as          = 'select'
                                                            onChange    = { onChangeConcept }
                                                        >
                                                            <option></option>
                                                            <option>Alimentos</option>
                                                            <option>Transporte</option>
                                                            <option>Alquiler</option>
                                                            <option>Hogar</option>
                                                            <option>Teléfono</option>
                                                            <option>Internet</option>
                                                            <option>Otros</option>
                                                        </Form.Control>

                                                    </Fragment>:
                                                    <Fragment/>
                                        }

                                    </Col>

                                </Form.Row>

                                {
                                    (concept && (origin === 'Efectivo'))?
                                        <Fragment>

                                                <Form.Control
                                                    type            = 'date'
                                                    onChange        = { onChangeDate }
                                                    className       = 'mt-3'
                                                />

                                                <Form.Control
                                                    type            = 'text'
                                                    placeholder     = 'Descripción'
                                                    onChange        = { onChangeDescription }
                                                    className       = 'mt-3'
                                                />
                                                
                                                <Form.Control
                                                    type            = 'number'
                                                    placeholder     = 'Monto'
                                                    onChange        = { onChangeAmount }
                                                    className       = 'mt-3'
                                                />

                                                <Form.Check
                                                    onChange        = { onChangeRecurring }
                                                    className       = 'mt-3'
                                                    label           = 'Recurrente' 
                                                />

                                        </Fragment>:
                                        (concept && (origin === 'Tarjeta de Débito' || origin === 'Tarjeta de Crédito'))?
                                            <Fragment>
                                                
                                                <Table
                                                    responsive          = 'md'
                                                    striped
                                                    className           = 'mt-3'
                                                    id                  = 'bank-table'
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                hidden      = 'hidden'
                                                            ></th>
                                                            <th
                                                                hidden      = 'hidden'
                                                            >
                                                                Object ID
                                                            </th>
                                                            <th>Fecha</th>
                                                            <th>Tipo</th>
                                                            <th>Descripción</th>
                                                            <th>Monto</th>
                                                            <th>Seleccionar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {props.userBankTrans.map((bankTrans) => {   
                                                            return(
                                                                <tr
                                                                    key     = { bankTrans._id }
                                                                >
                                                                    <td
                                                                        hidden = 'hidden'
                                                                    >
                                                                        { bankTrans._id }
                                                                    </td>
                                                                    <td
                                                                        className   = 'td-date'
                                                                    >
                                                                        { getDateString(bankTrans.date) }
                                                                    </td>
                                                                    <td>{ bankTrans.transactionType }</td>
                                                                    <td>{ bankTrans.description }</td>
                                                                    <td
                                                                        className   = 'td-amount'
                                                                    >
                                                                        { bankTrans.amount.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                                                    </td>
                                                                    <td>
                                                                        <Form.Check/>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </Table>

                                            </Fragment>:
                                            <Fragment/>
                                }

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
                        onClick             = { saveNewTransaction }
                    >
                        Guardar Transacción
                    </Button>

                </Modal.Footer>
            </Modal>

            

        </Container>
    );
}

export default Transactions;