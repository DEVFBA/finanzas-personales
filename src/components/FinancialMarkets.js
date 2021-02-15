import React, {
    useState
} from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
import {
    Line
} from 'react-chartjs-2';

import PageConstruction from './PageConstruction';

import '../styles/FinancialMarkets.css';

const FinancialMarkets = () => {

    const [ticker, setTicker]           = useState('');
    const [dateFrom, setDateFrom]       = useState('');
    const [dateThru, setDateThru]       = useState('');
    const [tickerData, setTickerData]   = useState([{}]);

    const onChangeTicker = (event) => {
        setTicker(event.target.value.trim());
    }

    const onChangeDateFrom = (event) => {
        setDateFrom(event.target.value);
    }

    const onChangeDateThru = (event) => {
        setDateThru(event.target.value);
    }

    const onSubmitTicker = (event) => {

        const token                     = process.env.REACT_APP_MARKETSTACK_TOKEN;

        event.preventDefault();

        fetch(`http://api.marketstack.com/v1/eod?access_key=${token}&symbols=${ticker}&date_from=${dateFrom}&date_to=${dateThru}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setTickerData(data.data);
            //console.log('Data', data.data);
            //console.log('Data for State', ...data.data);
            //console.log('Ticker 1', tickerData);
        });
    }

    console.log('Ticker Data Out', tickerData);

    const dates = tickerData.map((e) => e.date.substring(0, 10)).reverse();
    const closes = tickerData.map((e) => e.close).reverse();

    console.log('Dates', dates);
    console.log('Closes', closes);
    //const dates = tickerData.map((data) => data.date);



    return(
        <Container
            fluid
            className='financial-markets'
        >
            <Row>
                <h3>Mercados Financieros</h3>
            </Row>
            <Row>
                <PageConstruction />
            </Row>
            <Row>
                <Form
                    onSubmit = { onSubmitTicker }
                >
                    <Form.Row>
                        <Col
                            md = { 3 }
                        >
                            <Form.Label>
                                Ticker
                            </Form.Label>
                            <Form.Control 
                                type            = 'text'
                                placeholder     = 'Ticker'
                                onChange        = { onChangeTicker }    
                            />
                        </Col>
                        <Col
                            md = { 3 }
                        >
                            <Form.Label>
                                Fecha Desde
                            </Form.Label>
                            <Form.Control 
                                type        ='date' 
                                onChange    = { onChangeDateFrom }   
                            />
                        </Col>
                        <Col
                            md = { 3 }
                        >
                            <Form.Label>
                                Fecha Hasta
                            </Form.Label>
                            <Form.Control 
                                type        = 'date'  
                                onChange    = { onChangeDateThru }  
                            />
                        </Col>
                        <Col
                            md = { 3 }
                        >
                            <Button
                                variant = 'outline-light'
                                type    = 'submit'
                            >
                                Buscar
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Row>
            <Row
                className = "mt-5"
            >
                <Line 
                    data = {{
                        labels: dates,
                        datasets: [{
                            label: 'Close',
                            data: closes,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                        }]
                    }}
                />
            </Row>
        </Container>
    );
}

export default FinancialMarkets;