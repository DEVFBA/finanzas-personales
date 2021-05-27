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
    completeIncome,
    saveIncome,
    deleteIncome,
    updateIncome,
    completeUpdateIncome,
    completeExpense,
    saveExpense,
    deleteExpense,
    completeUpdateExpense,
    updateExpense
} from '../utils/APIFunctions';

import {
    recurringString,
    convertStrAmountToNum
} from '../utils/TextFormat';

import '../styles/Budget.css';

const Budget = (props) => {

    const [showAddIncome,       setShowAddIncome        ]           = useState(false);
    const [showAddExpense,      setShowAddExpense       ]           = useState(false);
    const [incomeData,          setIncomeData           ]           = useState(null);
    const [expenseData,         setExpenseData          ]           = useState(null);
    const [showDeleteIncome,    setShowDeleteIncome     ]           = useState(false);
    const [showDeleteExpense,   setShowDeleteExpense    ]           = useState(false);
    const [showUpdateIncome,    setShowUpdateIncome     ]           = useState(false);
    const [showUpdateExpense,   setShowUpdateExpense    ]           = useState(false);
    const [concept,             setConcept              ]           = useState('');
    const [incomeAmount,        setIncomeAmount         ]           = useState(0);
    const [expenseAmount,       setExpenseAmount        ]           = useState(0);
    const [recurring,           setRecurring            ]           = useState(false);
    const [loading,             setLoading              ]           = useState(false);
    const [totalIncome,         setTotalIncome          ]           = useState(0);
    const [totalExpense,        setTotalExpense         ]           = useState(0);
    const [budgetDifference,    setBudgetDifference     ]           = useState(0);
    const [budgetString,        setBudgetString         ]           = useState('');

    useEffect(() => {

        getRowText();
        getRowTextExpense();

        const incomes = props.userIncomes.map((income) => {
            return income.incomeAmount;
        });

        const incomeTotal = incomes.length > 0?incomes.reduce((total, income) => {
            return total + income;
        }):0;

        const expenses = props.userExpenses.map((expense) => {
            return expense.expenseAmount;
        });

        const expenseTotal = expenses.length > 0?expenses.reduce((total, expense) => {
            return total + expense;
        }):0;

        setTotalIncome(incomeTotal);
        setTotalExpense(expenseTotal);
        setBudgetDifference(incomeTotal - expenseTotal);

        const superavitDeficit = budgetDifference < 0?'Déficit':'Súperavit';

        setBudgetString(superavitDeficit);

    });

    const handleCloseAddIncome = () => {
        
        setConcept('');
        setIncomeAmount(0);
        setRecurring(false);
        
        setShowAddIncome(false);

    }

    const handleCloseAddExpense = () => {
        
        setConcept('');
        setExpenseAmount(0);
        setRecurring(false);
        
        setShowAddExpense(false);

    }

    const handleShowAddIncome = () => setShowAddIncome(true);

    const handleShowAddExpense = () => setShowAddExpense(true);

    async function handleShowDeleteIncome(){

        await getRowText();

        await setIncomeLocalStorage();

        setShowDeleteIncome(true);

    }

    async function handleShowDeleteExpense(){

        await getRowTextExpense();

        await setExpenseLocalStorage();

        setShowDeleteExpense(true);

    }

    async function handleShowUpdateIncome(){
        
        await getRowText();

        await setIncomeLocalStorage();

        setShowUpdateIncome(true);

    }

    async function handleShowUpdateExpense(){
        
        await getRowTextExpense();

        await setExpenseLocalStorage();

        setShowUpdateExpense(true);

    }

    const handleCloseUpdateIncome = () => {

        removeIncomeLocalStorage();

        setIncomeData(null);
        setShowUpdateIncome(false);

    }

    const handleCloseUpdateExpense = () => {

        removeExpenseLocalStorage();

        setExpenseData(null);
        setShowUpdateExpense(false);

    }

    async function getRowText(){

        const table = document.getElementById('incomes-table');

        if(table){

            for(let i = 0; i < table.rows.length; i++){

                table.rows[i].onclick = async function(){
                    await tableText(this);
                }

            }
        }
    }

    async function getRowTextExpense(){

        const table = document.getElementById('expenses-table');

        if(table){

            for(let i = 0; i < table.rows.length; i++){

                table.rows[i].onclick = async function(){
                    await tableTextExpense(this);
                }

            }
        }
    }

    async function updateIncomeId(){
        
        let completeData                        = false;

        setLoading(true);
        
        const incomeAmountUpdated               = document.getElementById('income-amount').value;
        const recurringUpdated                  = document.getElementById('recurring').checked;

        completeData = await completeUpdateIncome(incomeAmountUpdated);

        if(completeData){

            const userToken                 = localStorage.getItem('loginToken');
            const id                        = localStorage.getItem('incomeID');

            await updateIncome(incomeAmountUpdated, recurringUpdated, id, userToken);

        } else{
            alert('Data incompleta ó Monto Objetivo debe ser mayor a cero');
        }

        setConcept('');
        setIncomeAmount(0);
        setRecurring(false);

        props.dataChange();

        setLoading(false);

        handleCloseUpdateIncome();

    }

    async function updateExpenseId(){
        
        let completeData                        = false;

        setLoading(true);
        
        const expenseAmountUpdated              = document.getElementById('expense-amount').value;
        const recurringUpdated                  = document.getElementById('recurring').checked;

        completeData = await completeUpdateExpense(expenseAmountUpdated);

        if(completeData){

            const userToken                 = localStorage.getItem('loginToken');
            const id                        = localStorage.getItem('expenseID');

            await updateExpense(expenseAmountUpdated, recurringUpdated, id, userToken);

        } else{
            alert('Data incompleta ó Monto Objetivo debe ser mayor a cero');
        }

        setConcept('');
        setExpenseAmount(0);
        setRecurring(false);

        props.dataChange();

        setLoading(false);

        handleCloseUpdateExpense();

    }

    async function tableText(tableRow) {

        const incomeId                      = tableRow.childNodes[0].innerHTML;
        const concept                       = tableRow.childNodes[1].innerHTML;
        const incomeAmount                  = tableRow.childNodes[2].innerHTML;
        const recurringString               = tableRow.childNodes[3].innerHTML;
        let recurring                       = false;

        if(recurringString === "Recurrente"){
            recurring = true;
        }

        const incomeData = {
            incomeId: incomeId,
            incomeConcept: concept,
            incomeAmount: incomeAmount,
            recurring: recurring
        }

        setIncomeData(incomeData);

    }

    async function tableTextExpense(tableRow) {

        const expenseId                         = tableRow.childNodes[0].innerHTML;
        const concept                           = tableRow.childNodes[1].innerHTML;
        const expenseAmount                     = tableRow.childNodes[2].innerHTML;
        const recurringString                   = tableRow.childNodes[3].innerHTML;

        let recurring                           = false;

        if(recurringString === "Recurrente"){
            recurring = true;
        }

        const expenseData = {
            expenseId: expenseId,
            expenseConcept: concept,
            expenseAmount: expenseAmount,
            recurring: recurring
        } 

        setExpenseData(expenseData);

    }

    const onChangeConcept = (event) => {
        setConcept(event.target.value);
    }

    const onChangeIncomeAmount = (event) => {
        setIncomeAmount(event.target.value);
    }

    const onChangeExpenseAmount = (event) => {
        setExpenseAmount(event.target.value);

        console.log(expenseAmount)
    }

    const onChangeRecurring = (event) => {
        setRecurring(event.target.checked);
    }

    const onChangeUpdateIncome = (event) => {
        setIncomeAmount(event.target.value);
    }

    const onChangeUpdateRecurring = (event) => {
        setRecurring(event.target.checked);
    }

    async function deleteIncomeId(){

        setLoading(true);

        const id = localStorage.getItem('incomeID');
        const token = localStorage.getItem('loginToken');

        await deleteIncome(id, token);

        props.dataChange();

        setLoading(false);

        handleCloseDeleteIncome();

    }

    async function deleteExpenseId(){

        setLoading(true);

        const id = localStorage.getItem('expenseID');
        const token = localStorage.getItem('loginToken');

        await deleteExpense(id, token);

        props.dataChange();

        setLoading(false);

        handleCloseDeleteExpense();

    }

    const checkRecurring = (recurring) => {

        let checked = false;

        if(recurring === 'true'){
            checked = true;
        }

        return checked;

    }

    const handleCloseDeleteIncome = () => {

        removeIncomeLocalStorage()
        
        setIncomeData(null);
        setShowDeleteIncome(false);

    }

    const handleCloseDeleteExpense = () => {

        removeExpenseLocalStorage()
        
        setExpenseData(null);
        setShowDeleteExpense(false);

    }

    async function saveNewIncome(){

        let completeData = false;

        setLoading(true);

        completeData = await completeIncome(concept, incomeAmount);

        console.log('Datos a pasar Goal ', recurring)

        if(completeData){

            const userToken = localStorage.getItem('loginToken');

            await saveIncome(concept, incomeAmount, recurring, userToken);

        } else{
            alert('Data incompleta');
        }

        setConcept('');
        setIncomeAmount(0);
        setRecurring(false);

        props.dataChange();

        setLoading(false);

        handleCloseAddIncome();

    }

    async function saveNewExpense(){

        let completeData = false;

        setLoading(true);

        completeData = await completeExpense(concept, expenseAmount);

        if(completeData){

            const userToken = localStorage.getItem('loginToken');

            await saveExpense(concept, expenseAmount, recurring, userToken);

        } else{
            alert('Data incompleta');
        }

        setConcept('');
        setExpenseAmount(0);
        setRecurring(false);

        props.dataChange();

        setLoading(false);

        handleCloseAddExpense();

    }

    async function setIncomeLocalStorage(){

        localStorage.setItem('incomeID', incomeData.incomeId);
        localStorage.setItem('concept', incomeData.incomeConcept);
        localStorage.setItem('incomeAmount', incomeData.incomeAmount);
        localStorage.setItem('recurring', incomeData.recurring);

    }

    async function setExpenseLocalStorage(){

        localStorage.setItem('expenseID', expenseData.expenseId);
        localStorage.setItem('concept', expenseData.expenseConcept);
        localStorage.setItem('expenseAmount', expenseData.expenseAmount);
        localStorage.setItem('recurring', expenseData.recurring);

    }

    async function removeIncomeLocalStorage(){

        localStorage.removeItem('incomeID');
        localStorage.removeItem('concept');
        localStorage.removeItem('incomeAmount');
        localStorage.removeItem('recurring');

    }

    async function removeExpenseLocalStorage(){

        localStorage.removeItem('expenseID');
        localStorage.removeItem('concept');
        localStorage.removeItem('expenseAmount');
        localStorage.removeItem('recurring');

    }

    return(
        <Container
            className='budgets'
        >
            <Row>
                <h3>Mi Presupuesto</h3>
            </Row>

                <Container
                    className = 'incomes mt-5'
                >

                    <Row>
                        <h4>Mis Ingresos</h4>
                    </Row>

                    <Row>

                        <Col>
                        
                            <Button
                                variant     = 'outline-light'
                                type        = 'submit'
                                className   = 'incomesButton mt-2'
                                onClick     = { handleShowAddIncome }
                            >
                                Nuevo Ingreso
                            </Button>

                        </Col>

                        <Col>

                            {
                                loading?
                                    <UpdatingSpinner/>:
                                    <Fragment>

                                        <h4>
                                            { `Total Ingresos:   ${ totalIncome.toLocaleString('en', { style: 'currency', currency: 'USD' })}` }
                                        </h4>

                                    </Fragment>
                            }
                        

                        </Col>

                    </Row>

                    <Table 
                        responsive              = "md" 
                        striped
                        className               = "budget-table mt-5"
                        id                      = 'incomes-table'
                    >
                        <thead>
                            <tr>
                                <th
                                    hidden = 'hidden'
                                ></th>
                                <th hidden = 'hidden'>
                                    Object ID
                                </th>
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Recurrente</th>
                                <th hidden = 'hidden'>
                                    Recurring Check
                                </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.userIncomes.map((income) => {
                                return(
                                    <tr
                                        key = { income._id }
                                    >
                                        <td hidden = 'hidden'>
                                            { income._id }
                                        </td>
                                        <td>
                                            { income.concept }
                                        </td>
                                        <td className = "td-amount">
                                            { income.incomeAmount.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                        </td>
                                        <td className = "td-date">
                                            { recurringString(income.recurring) }
                                        </td>
                                        <td
                                            hidden = 'hidden'
                                        >
                                            <Form.Check
                                                defaultChecked          = { income.recurring }
                                            />
                                        </td>
                                        <td className = "td-buttons text-center">
                                            <Link
                                                className               = 'mr-3'
                                                onClick                 = { handleShowUpdateIncome }
                                            >
                                                    Actualizar
                                            </Link>
                                            <Link 
                                                onClick                 = { handleShowDeleteIncome }
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
                        show            = { showAddIncome } 
                        onHide          = { handleCloseAddIncome }
                        className       = 'add-incomes-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Nuevo Ingreso
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {
                                loading?
                                    <UpdatingSpinner/>:
                                    <Form>

                                        <Form.Label
                                            className       = 'mt-1'                                        
                                        >
                                            Concepto
                                        </Form.Label>

                                        <Form.Control
                                            as              = "select"
                                            onChange        = { onChangeConcept }
                                            className       = 'mt-1'
                                        >
                                            <option></option>
                                            <option>Salario</option>
                                            <option>Honorarios</option>
                                            <option>Rentas</option>
                                            <option>Otros</option>
                                        </Form.Control>

                                        <Form.Control
                                            type            = "number"
                                            placeholder     = "Monto Ingreso"
                                            onChange        = { onChangeIncomeAmount }
                                            className       = 'mt-3'
                                        />

                                        <Form.Check
                                            onChange        = { onChangeRecurring }
                                            className       = 'mt-3'
                                            label           = 'Recurrente'
                                        />

                                    </Form>
                            }


                        </Modal.Body>

                        <Modal.Footer>

                            <Button 
                                variant             = "secondary" 
                                onClick             = { handleCloseAddIncome }
                            >
                                Cerrar
                            </Button>
                            <Button 
                                variant             ="primary" 
                                onClick             = { saveNewIncome }
                            >
                                Guardar Ingreso
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    <Modal 
                        show            = { showDeleteIncome } 
                        onHide          = { handleCloseDeleteIncome }
                        className       = 'delete-incomes-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Borrar Ingreso
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {
                                loading?
                                    <UpdatingSpinner/>:
                                    <Fragment>

                                        <h6>
                                            { `¿Deseas borrar este ingreso de tu presupuesto?` }
                                        </h6>
                                        <h6>
                                            { `Concepto: ${localStorage.getItem('concept')}` }
                                        </h6>
                                        <h6>
                                            { `Monto: ${localStorage.getItem('incomeAmount')}` }
                                        </h6>

                                    </Fragment>
                            }


                        </Modal.Body>

                        <Modal.Footer>

                            <Button 
                                variant             = "secondary" 
                                onClick             = { handleCloseDeleteIncome }
                            >
                                Cerrar
                            </Button>
                            <Button 
                                variant             ="primary" 
                                onClick             = { deleteIncomeId }
                            >
                                Borrar Ingreso
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    <Modal 
                        show            = { showUpdateIncome } 
                        onHide          = { handleCloseUpdateIncome }
                        className       = 'update-incomes-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Actualizar Ingreso
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {
                                loading?
                                    <UpdatingSpinner/>:
                                    <Form>

                                        <Form.Label
                                            className           = 'mt-1'
                                        >
                                            Concepto
                                        </Form.Label>
                                        <Form.Control
                                            type                = 'text'
                                            placeholder         = { localStorage.getItem('concept') }
                                            disabled
                                        />

                                        <Form.Label
                                            className           = 'mt-3'
                                        >
                                            Monto
                                        </Form.Label>
                                        <Form.Control
                                            type                = 'number'
                                            defaultValue        = { convertStrAmountToNum(localStorage.getItem('incomeAmount')) }
                                            onChange            = { onChangeUpdateIncome }
                                            id                  = 'income-amount'
                                        />

                                        <Form.Check 
                                            defaultChecked      = { checkRecurring(localStorage.getItem('recurring')) }
                                            onChange            = { onChangeUpdateRecurring }
                                            id                  = 'recurring'   
                                            label               = 'Recurrente'
                                        />
                                    
                                    </Form>
                            }


                        </Modal.Body>

                        <Modal.Footer>

                            <Button 
                                variant             = "secondary" 
                                onClick             = { handleCloseUpdateIncome }
                            >
                                Cerrar
                            </Button>
                            <Button 
                                variant             ="primary" 
                                onClick             = { updateIncomeId }
                            >
                                Actualizar Ingreso
                            </Button>

                        </Modal.Footer>
                    </Modal>

                </Container>

                <Container
                        className = 'expenses mt-5'
                >

                <Row>
                    <h4>Mis Gastos</h4>
                </Row>

                <Row>

                    <Col>
                    
                        <Button
                            variant     = 'outline-light'
                            type        = 'submit'
                            className   = 'expensesButton mt-2'
                            onClick     = { handleShowAddExpense }
                        >
                            Nuevo Gasto
                        </Button>

                    </Col>

                    <Col>

                        {
                            loading?
                                <UpdatingSpinner/>:
                                <Fragment>

                                    <h4>
                                        { `Total Egresos:   ${ totalExpense.toLocaleString('en', { style: 'currency', currency: 'USD' })}` }
                                    </h4>

                                </Fragment>
                        }
                        

                    </Col>

                </Row>

                <Table 
                        responsive              = "md" 
                        striped
                        className               = "budget-table mt-5"
                        id                      = 'expenses-table'
                    >
                        <thead>
                            <tr>
                                <th
                                    hidden = 'hidden'
                                ></th>
                                <th hidden = 'hidden'>
                                    Object ID
                                </th>
                                <th>Concepto</th>
                                <th>Monto</th>
                                <th>Recurrente</th>
                                <th hidden = 'hidden'>
                                    Recurring Check
                                </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.userExpenses.map((expense) => {
                                return(
                                    <tr
                                        key = { expense._id }
                                    >
                                        <td hidden = 'hidden'>
                                            { expense._id }
                                        </td>
                                        <td>
                                            { expense.concept }
                                        </td>
                                        <td className = "td-amount">
                                            { expense.expenseAmount.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                        </td>
                                        <td className = "td-date">
                                            { recurringString(expense.recurring) }
                                        </td>
                                        <td
                                            hidden = 'hidden'
                                        >
                                            <Form.Check
                                                defaultChecked          = { expense.recurring }
                                            />
                                        </td>
                                        <td className = "td-buttons text-center">
                                            <Link
                                                className               = 'mr-3'
                                                onClick                 = { handleShowUpdateExpense }
                                            >
                                                    Actualizar
                                            </Link>
                                            <Link 
                                                onClick                 = { handleShowDeleteExpense }
                                            >
                                                Eliminar
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>

                    <Row>
                        <Col
                            className = 'offset-md-6'
                        >
                        
                            <h4>
                                { `${budgetString}:   ${budgetDifference.toLocaleString('en', { style: 'currency', currency: 'USD' })}` }
                            </h4>

                        </Col>
                    </Row>

                    <Modal 
                        show            = { showAddExpense } 
                        onHide          = { handleCloseAddExpense }
                        className       = 'add-expenses-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Nuevo Gasto
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {
                                loading?
                                    <UpdatingSpinner/>:
                                    <Form>

                                        <Form.Label
                                            className       = 'mt-1'                                        
                                        >
                                            Concepto
                                        </Form.Label>

                                        <Form.Control
                                            as              = "select"
                                            onChange        = { onChangeConcept }
                                            className       = 'mt-1'
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

                                        <Form.Control
                                            type            = "number"
                                            placeholder     = "Monto Gasto"
                                            onChange        = { onChangeExpenseAmount }
                                            className       = 'mt-3'
                                        />

                                        <Form.Check
                                            onChange        = { onChangeRecurring }
                                            className       = 'mt-3'
                                            label           = 'Recurrente'
                                        />

                                    </Form>
                            }


                        </Modal.Body>

                        <Modal.Footer>

                            <Button 
                                variant             = "secondary" 
                                onClick             = { handleCloseAddExpense }
                            >
                                Cerrar
                            </Button>
                            <Button 
                                variant             ="primary" 
                                onClick             = { saveNewExpense }
                            >
                                Guardar Gasto
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    <Modal 
                        show            = { showDeleteExpense } 
                        onHide          = { handleCloseDeleteExpense }
                        className       = 'delete-expenses-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Borrar Gasto
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {
                                loading?
                                    <UpdatingSpinner/>:
                                    <Fragment>

                                        <h6>
                                            { `¿Deseas borrar este gasto de tu presupuesto?` }
                                        </h6>
                                        <h6>
                                            { `Concepto: ${localStorage.getItem('concept')}` }
                                        </h6>
                                        <h6>
                                            { `Monto: ${localStorage.getItem('expenseAmount')}` }
                                        </h6>

                                    </Fragment>
                            }

                        </Modal.Body>

                        <Modal.Footer>

                            <Button 
                                variant             = "secondary" 
                                onClick             = { handleCloseDeleteExpense }
                            >
                                Cerrar
                            </Button>
                            <Button 
                                variant             ="primary" 
                                onClick             = { deleteExpenseId }
                            >
                                Borrar Gasto
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    <Modal 
                        show            = { showUpdateExpense } 
                        onHide          = { handleCloseUpdateExpense }
                        className       = 'update-expenses-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Actualizar Gasto
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {
                                loading?
                                    <UpdatingSpinner/>:
                                    <Form>

                                        <Form.Label
                                            className           = 'mt-1'
                                        >
                                            Concepto
                                        </Form.Label>
                                        <Form.Control
                                            type                = 'text'
                                            placeholder         = { localStorage.getItem('concept') }
                                            disabled
                                        />

                                        <Form.Label
                                            className           = 'mt-3'
                                        >
                                            Monto
                                        </Form.Label>
                                        <Form.Control
                                            type                = 'number'
                                            defaultValue        = { convertStrAmountToNum(localStorage.getItem('expenseAmount')) }
                                            onChange            = { onChangeUpdateIncome }
                                            id                  = 'expense-amount'
                                        />

                                        <Form.Check 
                                            defaultChecked      = { checkRecurring(localStorage.getItem('recurring')) }
                                            onChange            = { onChangeUpdateRecurring }
                                            id                  = 'recurring'   
                                            label               = 'Recurrente'
                                        />
                                    
                                    </Form>
                            }


                        </Modal.Body>

                        <Modal.Footer>

                            <Button 
                                variant             = "secondary" 
                                onClick             = { handleCloseUpdateExpense }
                            >
                                Cerrar
                            </Button>
                            <Button 
                                variant             ="primary" 
                                onClick             = { updateExpenseId }
                            >
                                Actualizar Gasto
                            </Button>

                        </Modal.Footer>
                    </Modal>


                </Container>

        </Container>
    );
}

export default Budget;