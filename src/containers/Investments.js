import React, {
    useState,
    useEffect,
    Fragment
} from 'react';
import {
    Container,
    Row,
    Table,
    Modal,
    Form,
    Button,
    Col
} from 'react-bootstrap';

import { 
    Link 
} from 'react-router-dom';

import InvestmentsChart from '../components/InvestmentsChart';
import NoDataRegistered from '../components/NoDataRegistered';
import UpdatingSpinner from '../components/UpdatingSpinner';

import {
    completeInvestment,
    saveInvestment,
    deleteInvestment,
    completeUpdateInvestment,
    updateInvestment
} from '../utils/APIFunctions';

import {
    convertStrAmountToNum
} from '../utils/TextFormat'

import '../styles/Investments.css';

const Investments = (props) => {

    const [showAdd,             setShowAdd              ]           = useState(false);
    const [investmentData,      setInvestmentData       ]           = useState(null);
    const [showDelete,          setShowDelete           ]           = useState(false);
    const [showUpdate,          setShowUpdate           ]           = useState(false);
    const [broker,              setBroker               ]           = useState('');
    const [investmentInstrument,setInvestmentInstrument ]           = useState('');
    const [investedAmount,      setInvestedAmount       ]           = useState(0);
    const [investmentTotal,     setInvestmentTotal      ]           = useState(0);
    const [loading,             setLoading              ]           = useState(false);
    const [totalInvestment,     setTotalInvestment      ]           = useState(0);
    const [totalInvested,       setTotalInvested        ]           = useState(0);

    useEffect(() => {

        getRowText();

        const investmentAmounts = props.userInvestments.map((investment) => {
            return investment.total;
        });
    
        const totalInvestment = investmentAmounts.length > 0?investmentAmounts.reduce((total, investmentAmount) => {
            return total + investmentAmount;
        }, 0):0;
    
        const investedAmounts = props.userInvestments.map((investment) => {
            return investment.investedAmount;
        });
    
        const totalInvested = investedAmounts > 0?investedAmounts.reduce((total, investedAmount) => {
            return total + investedAmount;
        }):0;

        setTotalInvestment(totalInvestment);
        setTotalInvested(totalInvested);

    });

    const handleCloseAdd = () => {
        
        setBroker('');
        setInvestmentInstrument('');
        setInvestedAmount(0);
        setInvestmentTotal(0);
        
        setShowAdd(false);

    }

    const handleShowAdd = () => setShowAdd(true);

    const handleCloseUpdate = () => {

        removeInvestmentLocalStorage();

        setInvestmentData(null);
        setShowUpdate(false);

    }

    async function handleShowUpdate(){
        
        await getRowText();

        await setInvestmentLocalStorage();

        setShowUpdate(true);

    }

    const handleCloseDelete = () => {

        removeInvestmentLocalStorage()
        
        setInvestmentData(null);
        setShowDelete(false);

    }

    async function handleShowDelete(){

        await getRowText();

        await setInvestmentLocalStorage();

        setShowDelete(true);

    }

    const onChangeBroker = (event) => {
        setBroker(event.target.value);
    }
    
    const onChangeInvInstrument = (event) => {
        setInvestmentInstrument(event.target.value);
    }

    const onChangeInvestedAmount = (event) => {
        setInvestedAmount(event.target.value);
    }

    const onChangeInvestTotal = (event) => {
        setInvestmentTotal(event.target.value);
    }

    async function saveNewInvestment(){

        let completeData = false;

        setLoading(true);

        completeData = await completeInvestment(broker, investmentInstrument, investedAmount, investmentTotal);

        if(completeData){

            const userToken = localStorage.getItem('loginToken');

            await saveInvestment(broker, investmentInstrument, investedAmount, investmentTotal, userToken);

        } else{
            alert('Data incompleta');
        }

        setBroker('');
        setInvestmentInstrument('');
        setInvestedAmount(0);
        setInvestmentTotal(0);

        props.dataChange();

        setLoading(false);

        handleCloseAdd();

    }

    const onChangeUpdateInvested = (event) => {

        setInvestedAmount(event.target.value);

    }

    const onChangeUpdateTotal = (event) => {

        setInvestmentTotal(event.target.value);

    }

    async function updateInvestmentId(){
        
        let completeData                    = false;

        setLoading(true);
        
        const investedAmountUpdated            = document.getElementById('invested-amount').value;
        const investmentTotalUpdated           = document.getElementById('investment-total').value;

        completeData = await completeUpdateInvestment(investedAmountUpdated, investmentTotalUpdated);

        if(completeData){

            const userToken                 = localStorage.getItem('loginToken');
            const id                        = localStorage.getItem('investmentID');

            await updateInvestment(investedAmountUpdated, investmentTotalUpdated, id, userToken);

        } else{
            alert('Data incompleta ó Monto Objetivo debe ser mayor a cero');
        }

        setBroker('');
        setInvestmentInstrument('');
        setInvestedAmount(0);
        setInvestmentTotal(0);

        props.dataChange();

        setLoading(false);

        handleCloseUpdate();

    }

    async function deleteInvestmentId(){

        setLoading(true);

        const id = localStorage.getItem('investmentID');
        const token = localStorage.getItem('loginToken');

        await deleteInvestment(id, token);

        props.dataChange();

        setLoading(false);

        handleCloseDelete();

    }

    async function getRowText(){
        const table = document.getElementById('investments-table');

        if(table){

            for(let i = 0; i < table.rows.length; i++){

                table.rows[i].onclick = async function(){
                    await tableText(this);
                }

            }
        }
    }

    async function tableText(tableRow) {

        const investmentId                  = tableRow.childNodes[0].innerHTML;
        const broker                        = tableRow.childNodes[1].innerHTML;
        const investmentInstrument          = tableRow.childNodes[2].innerHTML;
        const investedAmount                = tableRow.childNodes[3].innerHTML;
        const investmentTotal               = tableRow.childNodes[4].innerHTML;
        const porfolioPerc                  = tableRow.childNodes[5].innerHTML;

        const investmentData = {
            investmentId: investmentId,
            investingCompany: broker,
            investingInstrument: investmentInstrument,
            investedAmount: investedAmount,
            total: investmentTotal,
            portfolioPerc: porfolioPerc
        }

        setInvestmentData(investmentData);

    }

    async function setInvestmentLocalStorage(){

        localStorage.setItem('investmentID', investmentData.investmentId);
        localStorage.setItem('broker', investmentData.investingCompany);
        localStorage.setItem('investmentInstrument', investmentData.investingInstrument);
        localStorage.setItem('investedAmount', investmentData.investedAmount);
        localStorage.setItem('investmentTotal', investmentData.total);
        localStorage.setItem('portfolioPerc', investmentData.portfolioPerc);

    }

    async function removeInvestmentLocalStorage(){

        localStorage.removeItem('investmentID');
        localStorage.removeItem('broker');
        localStorage.removeItem('investmentInstrument');
        localStorage.removeItem('investedAmount');
        localStorage.removeItem('investmentTotal');
        localStorage.removeItem('portfolioPerc');

    }

    return(
        <Container
        className = 'investments'
        >
            <Row>
                <h3>Mis Inversiones</h3>
            </Row>

            <Row>

                <Col>
                
                    <Button
                        variant     = 'outline-light'
                        type        = 'submit'
                        className   = 'investmentsButton mt-2'
                        onClick     = { handleShowAdd }
                    >
                        Nueva Inversión
                    </Button>

                </Col>

                <Col>

                    {
                        !props.loading?
                            <Fragment>

                                <h4>
                                    { `Rendimiento Total ${ totalInvested?(((totalInvestment / totalInvested) - 1) * 100).toFixed(2):'' } %` }
                                </h4>

                            </Fragment>:
                            <UpdatingSpinner/>
                    }
                
                
                </Col>

            </Row>

            <Table 
                responsive              = "md" 
                striped
                className               = "investments-table mt-5"
                id                      = 'investments-table'
            >
                <thead>
                    <tr>
                        <th
                            hidden = 'hidden'
                        ></th>
                        <th hidden = 'hidden'>
                            Object ID
                        </th>
                        <th>Broker</th>
                        <th>Instrumento Inversión</th>
                        <th>$ Aportado</th>
                        <th>Total Inversión</th>
                        <th>% Portafolio</th>
                        <th>Rendimiento</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {props.userInvestments.map((investment) => {
                        return(
                            <tr
                                key = { investment._id }
                            >
                                <td hidden = 'hidden'>
                                    { investment._id }
                                </td>
                                <td>
                                    { investment.investingCompany }
                                </td>
                                <td className="td-amount">
                                    { investment.investingInstrument }
                                </td>
                                <td className="td-amount">
                                    { investment.investedAmount.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                </td>
                                <td className="td-amount">
                                    { investment.total.toLocaleString('en', { style: 'currency', currency: 'USD' }) }
                                </td>
                                <td className="td-date">
                                    { `${(((investment.total) / totalInvestment) * 100).toFixed(2)} %` }
                                </td>
                                <td>
                                    { `${(((investment.total / investment.investedAmount) - 1) * 100).toFixed(2)} %` }
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

            {props.userInvestments.length > 0?
                <InvestmentsChart
                    userInvestments = { props.userInvestments }
                />:<NoDataRegistered />
            }

            <Modal 
                show            = { showAdd } 
                onHide          = { handleCloseAdd }
                className       = 'add-investments-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Nueva Inversión
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        loading?
                            <UpdatingSpinner/>:
                            <Form>

                                <Form.Control
                                    type            = "text"
                                    placeholder     = "Broker de Inversión"
                                    onChange        = { onChangeBroker }
                                    className       = 'mt-1'
                                />

                                <Form.Control
                                    type            = "text"
                                    placeholder     = "Instrumento de Inversión"
                                    onChange        = { onChangeInvInstrument }
                                    className       = 'mt-3'
                                />

                                <Form.Control
                                    type            = "number"
                                    placeholder     = "Monto Invertido"
                                    onChange        = { onChangeInvestedAmount }
                                    className       = 'mt-3'
                                />

                                <Form.Control
                                    type            = "number"
                                    placeholder     = "Saldo Total de la Inversión"
                                    onChange        = { onChangeInvestTotal }
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
                        onClick             = { saveNewInvestment }
                    >
                        Guardar Inversión
                    </Button>

                </Modal.Footer>
            </Modal>
    
            <Modal 
                show            = { showDelete } 
                onHide          = { handleCloseDelete }
                className       = 'delete-investments-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Borrar Inversión
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        loading?
                            <UpdatingSpinner/>:
                            <Fragment>

                                <h6>
                                    { `¿Ya no cuentas con la siguiente inversión y deseas borrarla?` }
                                </h6>
                                <h6>
                                    { `Broker: ${localStorage.getItem('broker')}` }
                                </h6>
                                <h6>
                                    { `Intrumento de Inversión: ${localStorage.getItem('investmentInstrument')}` }
                                </h6>
                                <h6>
                                    { `Total: ${localStorage.getItem('investmentTotal')}` }
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
                        onClick             = { deleteInvestmentId }
                    >
                        Borrar Inversión
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal 
                show            = { showUpdate } 
                onHide          = { handleCloseUpdate }
                className       = 'update-investments-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Actualizar Inversión
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
                                    Broker
                                </Form.Label>
                                <Form.Control
                                    type                = 'text'
                                    placeholder         = { localStorage.getItem('broker') }
                                    disabled
                                />

                                <Form.Label
                                    className           = 'mt-3'
                                >
                                    Intrumento de Inversión
                                </Form.Label>
                                <Form.Control
                                    type                = 'text'
                                    placeholder         = { localStorage.getItem('investmentInstrument') }
                                    disabled
                                />

                                <Form.Label
                                    className           = 'mt-3'
                                >
                                    Monto Invertido
                                </Form.Label>
                                <Form.Control
                                    type                = 'number'
                                    defaultValue        = { convertStrAmountToNum(localStorage.getItem('investedAmount')) }
                                    onClick             = { onChangeUpdateInvested }
                                    id                  = 'invested-amount'
                                />

                                <Form.Label
                                    className           = 'mt-3'
                                >
                                    Saldo Inversión
                                </Form.Label>
                                <Form.Control
                                    type                = 'number'
                                    defaultValue        = { convertStrAmountToNum(localStorage.getItem('investmentTotal')) }
                                    onClick             = { onChangeUpdateTotal }
                                    id                  = 'investment-total'   
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
                        onClick             = { updateInvestmentId }
                    >
                        Actualizar Inversión
                    </Button>

                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default Investments;