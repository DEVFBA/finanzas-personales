import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import Sidebar from './Sidebar';
import '../styles/LoguedUser.css';
import Summary from './Summary';

const LoguedUser = () => {

    return(
        <Container fluid>
            <Row>
                <Col md={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <Summary />
                </Col>
            </Row>
        </Container>
    );
}

export default LoguedUser;