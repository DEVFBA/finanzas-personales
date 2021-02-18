import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import PageConstruction from '../components/PageConstruction';

import '../styles/Transactions.css';

const Transactions = () => {
    return(
        <Container
            className='transactions'
        >
            <Row>
                <h3>Mis Movimientos</h3>
            </Row>
            <Row>
                <PageConstruction />
            </Row>
        </Container>
    );
}

export default Transactions;