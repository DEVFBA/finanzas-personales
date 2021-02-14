import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import PageConstruction from './PageConstruction';

import '../styles/FinancialMarkets.css';

const FinancialMarkets = () => {
    return(
        <Container
            className='financial-markets'
        >
            <Row>
                <h3>Mercados Financieros</h3>
            </Row>
            <Row>
                <PageConstruction />
            </Row>
        </Container>
    );
}

export default FinancialMarkets;