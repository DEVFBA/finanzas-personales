import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import PageConstruction from '../components/PageConstruction';

import '../styles/Investments.css';

const Investments = () => {
    return(
        <Container
        className = 'investments'
        >
            <Row>
                <h3>Mis Inversiones</h3>
            </Row>
            <Row>
                <PageConstruction />
            </Row>
        </Container>
    );
}

export default Investments;