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
import NoDataRegistered from '../components/NoDataRegistered';

const Summary = (props) => {

    console.log('Props ', props);

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
                    {props.userGoals?
                        <GoalsChart
                            userGoals = { props.userGoals }
                        />:<NoDataRegistered />
                    }
                </Col>
                <Col md={6}>
                    {props.userInvestments?
                        <InvestmentsChart
                            userInvestments = { props.userInvestments }
                        />:<NoDataRegistered />
                    }
                </Col>
            </Row>
            <Row className  = "mt-5">
                <Col md={6}>
                    {props.userGoals?
                        <MyGoals
                            userGoals = { props.userGoals }
                        />:<NoDataRegistered />
                    }
                </Col>
                <Col md={6}>
                    {props.userInvestments?
                        <MyInvestments
                            userInvestments = { props.userInvestments }
                        />:<NoDataRegistered />
                    }
                </Col>
            </Row>
            <Row className  ="mt-5">
                <Col>
                    {props.userBudget?
                        <MyBudget 
                            userBudget = { props.userBudget }  
                        />:<NoDataRegistered />
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Summary;