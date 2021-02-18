import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import PageConstruction from '../components/PageConstruction';

import '../styles/Budget.css';

const Budget = () => {
    return(
        <Container
            className='budget'
        >
            <Row>
                <h3>Mi Presupuesto</h3>
            </Row>
            <Row>
                <PageConstruction />
            </Row>
        </Container>
    );
}

export default Budget;