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

import '../styles/FinancialMarkets.css';

const FinancialMarkets = () => {

    const [ticker, setTicker]           = useState('');
    const [dateFrom, setDateFrom]       = useState('');
    const [dateThru, setDateThru]       = useState('');
    //const [tickerData, setTickerData]   = useState([{}]);
    const [dates, setDates]             = useState([]);
    const [closes, setCloses]           = useState([]);

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
            setDates(data.data.map((e) => e.date.substring(0, 10)).reverse());
            setCloses(data.data.map((e) => e.close).reverse());
        });
    }

    return(
        <Container
            fluid
            className='financial-markets'
        >
            <Row className = 'ml-2'>
                <h3>Mercados Financieros</h3>
            </Row>
            <Row className = 'mt-5 ml-2'>
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
                                variant     = 'outline-light'
                                type        = 'submit'
                                className   = 'stock-search'
                            >
                                Buscar
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Row>
            <Row
                className = "mt-5 col-10 ml-2"
            >
                <Line 
                    data = {{
                        labels: dates,
                        datasets: [{
                            label: 'Close',
                            data: closes,
                            fill: false,
                            borderColor: 'rgba(255, 255, 255)',
                            lineTension: 0.2
                        }
                        ]
                    }
                    }
                    options = {{
                        scales: {
                            xAxes:[{
                                ticks: {
                                    fontColor: 'rgba(255, 255, 255)'
                                },
                                scaleLabel: {
                                    fontColor: 'rgba(255, 255, 255)'
                                }
                            }
                            ],
                            yAxes:[{
                                ticks: {
                                    fontColor: 'rgba(255, 255, 255)'
                                },
                                scaleLabel: {
                                    fontColor: 'rgba(255, 255, 255)'
                                }
                            }
                            ]
                        }
                    }}                    
                />
            </Row>
        </Container>
    );
}

export default FinancialMarkets;