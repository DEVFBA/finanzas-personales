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
    recurringString,
    unformatDate
} from '../utils/TextFormat';

import {
    completeTransaction, 
    saveTransaction,
    deleteTransaction,
    updateTransaction,
    saveTransactionFromBank,
    updateBankTransaction
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
    const [bankTransId,         setBankTransId      ]           = useState('');

    useEffect(() => {

        getRowText();

    });

    const handleShowAdd = () => {

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
        setBankTransId('');
        
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

    const handleCloseUpdate = () => {

        removeTransactionLocalStorage();

        setTransactionData(null);
        setShowUpdate(false);

    }

    const handleCloseDelete = () => {

        removeTransactionLocalStorage()
        
        setTransactionData(null);
        setShowDelete(false);

    }

    const onChangeType = (event) => {
        setType(event.target.value);
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const onChangeConcept = (event) => {
        setConcept(event.target.value);
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

    async function saveCashTransaction(){

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
        setBankTransId('');

        props.dataChange();

        setLoading(false);

        handleCloseAdd();

    }

    async function saveNewTransaction(){

        if(origin === 'Efectivo'){
            await saveCashTransaction();
        } else {
            await saveBankTransaction();
        }

    }

    async function updateTransactionId(){
        
        let completeData                    = false;
        let descriptionUpdated              = '';
        let amountUpdated                   = 0;
        let recurring                       = false;
        let conceptUpdated                  = '';
        let body                            = {};

        setLoading(true);

        if(localStorage.getItem('origin') === 'Efectivo'){

            descriptionUpdated                = document.getElementById('transaction-description').value;
            amountUpdated                     = document.getElementById('transaction-amount').value;
            recurring                         = document.getElementById('recurring').checked;

            body = {
                description: descriptionUpdated,
                amount: amountUpdated,
                recurring: recurring
            }

        } else {

            conceptUpdated                    = document.getElementById('transaction-concept').value;
            descriptionUpdated                = document.getElementById('transaction-description').value;

            body = {
                concept: conceptUpdated,
                description: descriptionUpdated
            }

        }

        console.log('Body ', body);

        

        const userToken                 = localStorage.getItem('loginToken');
        const id                        = localStorage.getItem('transactionID');

        await updateTransaction(body, id, userToken);

        setAmount(0);
        setConcept('');
        setDate('');
        setDescription('');
        setRecurring('');
        setType('');
        setOrigin('');
        setAccountNumber('');
        setBankTransId('');

        props.dataChange();

        setLoading(false);

        handleCloseUpdate();

    }

    async function deleteCashTransaction(){

        setLoading(true);

        const id = localStorage.getItem('transactionID');
        const token = localStorage.getItem('loginToken');

        await deleteTransaction(id, token);

        props.dataChange();

        handleCloseDelete();

        setLoading(false);

    }

    async function uncategorizeBankTransaction(){

        setLoading(true);
        
        const token         = localStorage.getItem('loginToken');
        const bankTransId   = localStorage.getItem('bankTransId');
        const transactionID = localStorage.getItem('transactionID');

        let body;

        body = {
            categorized: false
        }

        await updateBankTransaction(body, bankTransId, token);

        await deleteTransaction(transactionID, token);

        setLoading(false);

        props.dataChange();

        handleCloseDelete();

    }

    async function deleteTransactionId(){

        if(localStorage.getItem('origin') === 'Efectivo'){
            await deleteCashTransaction();
        } else {
            await uncategorizeBankTransaction();
        }

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
        localStorage.setItem('bankTransId', transactionData.bankTransId);

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
        localStorage.removeItem('bankTransId');

    }

    async function saveBankTransaction(){

        const table = document.getElementById('bank-table');

        setLoading(true);

        if(table){

            const origin                = document.getElementById('select-origin').value;
            const transactionConcept    = document.getElementById('select-concept').value;

            for(let i = 1; i < table.rows.length; i++){
     
                const save = table.rows[i].childNodes[6].childNodes[0].childNodes[0].checked;

                if(save){

                    const bankTransId           = table.rows[i].childNodes[0].innerHTML;
                    const accountNumber         = table.rows[i].childNodes[1].innerHTML;
                    const transactionDate       = unformatDate(table.rows[i].childNodes[2].innerHTML);
                    const transactionType       = table.rows[i].childNodes[3].innerHTML === 'Cargo'?'Egreso':'Ingreso';
                    const transactionDescription= table.rows[i].childNodes[4].innerHTML;
                    const transactionAmount     = convertStrAmountToNum(table.rows[i].childNodes[5].innerHTML);
                    const token                 = localStorage.getItem('loginToken');

                    let body;

                    body = {
                        origin: origin,
                        accountNumber: accountNumber,
                        amount: transactionAmount,
                        concept: transactionConcept,
                        date: transactionDate,
                        description: transactionDescription,
                        recurring: false,
                        type: transactionType,
                        bankTransId: bankTransId
                    }

                    await saveTransactionFromBank(body, token);

                    body = {
                        categorized: true
                    }

                    await updateBankTransaction(body, bankTransId, token);

                }
            }

        }

        setAmount(0);
        setConcept('');
        setDate('');
        setDescription('');
        setRecurring('');
        setType('');
        setOrigin('');
        setAccountNumber('');
        setBankTransId('');

        props.dataChange();

        setLoading(false);

        handleCloseAdd();

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
        const bankTransId                   = tableRow.childNodes[9].innerHTML;


        const transactionData = {
            transactionId: transactionId,
            transactionType: transactionType,
            transactionDate: transactionDate,
            transactionConcept: transactionConcept,
            transactionDescription: transactionDescription,
            transactionAmount: transactionAmount,
            recurring: recurring,
            origin: origin,
            accountNumber: accountNumber,
            bankTransId: bankTransId
        }

        setTransactionData(transactionData);

    }

    const checkRecurring = (recurring) => {

        let checked = false;

        if(recurring === 'Recurrente'){
            checked = true;
        }

        return checked;

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
                        <th hidden = 'hidden'>Bank Trans Id</th>
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
                                <td className = "td-date">
                                    { getDateString(transaction.date) }
                                </td>
                                <td>
                                    { transaction.concept }
                                </td>
                                <td>
                                    { transaction.description }
                                </td>
                                <td className = "td-amount">
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
                                <td hidden = 'hidden'>
                                    { transaction.bankTransId }
                                </td>
                                <td className = "td-buttons text-center">
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
                                            id          = 'select-type'
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
                                        id          = 'select-origin'
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
                                                        id          = 'select-concept'
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
                                                            id          = 'select-concept'
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
                                                            <th>No. Cuenta</th>
                                                            <th>Fecha</th>
                                                            <th>Tipo</th>
                                                            <th>Descripción</th>
                                                            <th>Monto</th>
                                                            <th>Seleccionar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {props.userBankTrans.filter((bankTrans) => {
                                                            return bankTrans.categorized === false;
                                                        }).filter((bankTrans) => {
                                                            let type = document.getElementById('select-type').value;
                                                            
                                                            if(type === 'Ingreso'){
                                                                type = 'Abono'
                                                            } else {
                                                                type = 'Cargo'
                                                            }


                                                            return bankTrans.transactionType === type;

                                                        }).map((bankTrans) => {   
                                                            return(
                                                                <tr
                                                                    key     = { bankTrans._id }
                                                                >
                                                                    <td
                                                                        hidden = 'hidden'
                                                                    >
                                                                        { bankTrans._id }
                                                                    </td>
                                                                    <td>{ bankTrans.accountNumber }</td>
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

            <Modal 
                        show            = { showDelete } 
                        onHide          = { handleCloseDelete }
                        className       = 'delete-transactions-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Borrar Transacción
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {localStorage.getItem('origin') === 'Efectivo'?

                                <Fragment>

                                    <h6>
                                        ¿Deseas borrar esta transacción?
                                    </h6>
                                    <h6>
                                        { `Concepto: ${localStorage.getItem('concept')}` }
                                    </h6>
                                    <h6>
                                        { `Descripción: ${localStorage.getItem('description')}` }
                                    </h6>
                                    <h6>
                                        { `Monto: ${localStorage.getItem('amount')}` }
                                    </h6>

                                </Fragment>:
                                <Fragment>

                                    <h6>
                                        ¿Deseas descategorizar esta transacción?
                                    </h6>
                                    <h6>
                                        { `Concepto: ${localStorage.getItem('concept')}` }
                                    </h6>
                                    <h6>
                                        { `Descripción: ${localStorage.getItem('description')}` }
                                    </h6>
                                    <h6>
                                        { `No. Cuenta: ${localStorage.getItem('accountNumber')}` }
                                    </h6>

                                </Fragment>

                            }


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
                                onClick             = { deleteTransactionId }
                            >
                                {localStorage.getItem('origin') === 'Efectivo'?
                                    'Borrar Transacción': 'Descategorizar'
                                }
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    <Modal 
                        show            = { showUpdate } 
                        onHide          = { handleCloseUpdate }
                        className       = 'update-transactions-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Actualizar Transacción
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {
                                loading?
                                    <UpdatingSpinner/>:
                                        localStorage.getItem('origin') === 'Efectivo'?
                                            <Fragment>

                                                <Form>
                                                    <Form.Label>
                                                        Concept
                                                    </Form.Label>
                                                    <Form.Control
                                                        type        = 'text'
                                                        placeholder = { localStorage.getItem('concept') }
                                                        disabled
                                                    />

                                                    <Form.Label>
                                                        Description
                                                    </Form.Label>
                                                    <Form.Control
                                                        type        = 'text'
                                                        defaultValue= { localStorage.getItem('description') }
                                                        id          = 'transaction-description'
                                                    />

                                                    <Form.Label>
                                                        Monto
                                                    </Form.Label>
                                                    <Form.Control
                                                        type        = 'number'
                                                        defaultValue= { convertStrAmountToNum(localStorage.getItem('amount')) }
                                                        id          = 'transaction-amount'
                                                    />

                                                    <Form.Check
                                                        defaultChecked      = { checkRecurring(localStorage.getItem('recurring')) }
                                                        id                  = 'recurring'
                                                        label               = 'Recurrente'
                                                    />

                                                </Form>

                                            </Fragment>:
                                            <Fragment>
                                                
                                                <Form>

                                                    <Form.Label>
                                                        Número de Cuenta
                                                    </Form.Label>
                                                    <Form.Control
                                                        type                = 'text'
                                                        placeholder         = { localStorage.getItem('accountNumber') }
                                                        disabled
                                                    />

                                                    <Form.Label>
                                                        Concepto
                                                    </Form.Label>
                                                    <Form.Control
                                                            as          = 'select'
                                                            onChange    = { onChangeConcept }
                                                            defaultValue= { localStorage.getItem('concept') }
                                                            id          = 'transaction-concept'
                                                        >
                                                            <option>Alimentos</option>
                                                            <option>Transporte</option>
                                                            <option>Alquiler</option>
                                                            <option>Hogar</option>
                                                            <option>Teléfono</option>
                                                            <option>Internet</option>
                                                            <option>Otros</option>
                                                    </Form.Control>

                                                    <Form.Label>
                                                        Descripción
                                                    </Form.Label>
                                                    <Form.Control
                                                        type        = 'text'
                                                        defaultValue= { localStorage.getItem('description') }
                                                        id          = 'transaction-description'
                                                    />

                                                </Form>

                                            </Fragment>
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
                                onClick             = { updateTransactionId }
                            >
                                Actualizar Transacción
                            </Button>

                        </Modal.Footer>
                    </Modal>

        </Container>
    );
}

export default Transactions;