import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import MyGoals from '../components/MyGoals';
import MyInvestments from '../components/MyInvestments';
import MyBudget from '../components/MyBudget';
import GoalsChart from '../components/GoalsChart';
import InvestmentsChart from '../components/InvestmentsChart';
import SummaryHeader from './SummaryHeader';
import '../styles/Summary.css';

const Summary = (props) => {

    return(
        <Container
            className="summary"
        >
            <Row className="ml-2">
                <SummaryHeader
                    months      = { props.months }
                    years       = { props.years  }
                />
            </Row>
            <Row className="mt-5">
                <Col md={6}>
                    <GoalsChart
                        userGoals = { props.userGoals }
                    />
                </Col>
                <Col md={6}>
                    <InvestmentsChart
                        userInvestments = { props.userInvestments }
                    />
                </Col>
            </Row>
            <Row className  = "mt-5">
                <Col md={6}>
                    <MyGoals
                        userGoals = { props.userGoals }
                    />
                </Col>
                <Col md={6}>
                    <MyInvestments
                        userInvestments = { props.userInvestments }
                    />
                </Col>
            </Row>
            <Row className  ="mt-5">
                <Col>
                    <MyBudget 
                        userBudget = { props.userBudget }  
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Summary;