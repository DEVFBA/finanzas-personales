import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import MyGoals from './MyGoals';
import MyInvestments from './MyInvestments';
import MyBudget from './MyBudget';
import GoalsChart from './GoalsChart';
import InvestmentsChart from './InvestmentsChart';
import SummaryHeader from './SummaryHeader';
import '../styles/Summary.css';

const Summary = () => {
    return(
        <Container>
            <Row className="overview ml-2">
                <SummaryHeader />
            </Row>
            <Row className="mt-5">
                <Col md={6}>
                    <GoalsChart />
                </Col>
                <Col md={6}>
                    <InvestmentsChart />
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={6}>
                    <MyGoals />
                </Col>
                <Col md={6}>
                    <MyInvestments />
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <MyBudget />
                </Col>
            </Row>
        </Container>
    );
}

export default Summary;