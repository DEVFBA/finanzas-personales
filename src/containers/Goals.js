import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import PageConstruction from '../components/PageConstruction';

import '../styles/Goals.css';

const Goals = () => {
    return(
        <Container
            className='goals'
        >
            <Row>
                <h3>Mis Metas</h3>
            </Row>
            <Row>
                <PageConstruction />
            </Row>
        </Container>
    );
}

export default Goals;