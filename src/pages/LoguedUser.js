import React, {
    useState,
    useEffect
} from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import {
    useParams,
    BrowserRouter,
    Route,
    Switch,
    withRouter
} from 'react-router-dom';

import Sidebar from '../containers/Sidebar';
import Summary from '../containers/Summary';
import FinancialMarkets from '../containers/FinancialMarkets';
import Investments from '../containers/Investments';
import Transactions from '../containers/Transactions';
import Goals from '../containers/Goals';
import Budget from '../containers/Budget';

import '../styles/LoguedUser.css';

import { 
    retrieveUserProfileByID 
} from '../utils/UserFunctions';

const LoguedUser = (props) => {

    const [userName,        setUserName         ]       = useState('');
    const [userLastName,    setUserLastName     ]       = useState('');
    const [profilePicture,  setProfilePicture   ]       = useState('');
    const [userGoals,       setUserGoals        ]       = useState([]);
    const [userInvestments, setUserInvestments  ]       = useState([]);
    const [userBudget,      setUserBudget       ]       = useState([]);

    const  { userID } = useParams();

    console.log('In Logued User params', userID);

    const months        = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const years         = [2021, 2020, 2019];

    useEffect(() => {

        const userProfile = retrieveUserProfileByID(userID)
        
        setUserName(userProfile.userName);
        setProfilePicture(userProfile.profilePicture);
        setUserLastName(userProfile.userLastName);
        setUserGoals(userProfile.savingsGoals);
        setUserInvestments(userProfile.investments);
        setUserBudget(userProfile.budget);

    }, [])

   return(
        <BrowserRouter>
            <Container 
                className = "logued-user"
                fluid
            >
                <Row>
                    <Col
                        md={2}
                        className="p-0"
                    >
                        <Sidebar
                            userName        = { userName }
                            userLastName    = { userLastName }
                            profilePicture  = { profilePicture }
                            userID          = { userID }
                        />
                    </Col>
                    <Col
                        md={10}
                        className="logued-user-sections"
                    >
                        <Switch>
                            <Route path = { `/user/:userID/summary` }>
                                <Summary
                                    userGoals       = { userGoals }
                                    userInvestments = { userInvestments }
                                    userBudget      = { userBudget }
                                    months          = { months }
                                    years           = { years }
                                />
                            </Route>
                            <Route exact path = { `/user/:userID/finMarket` }>
                                <FinancialMarkets />
                            </Route>
                            <Route exact path = { `/user/:userID/investments` }>
                                <Investments />
                            </Route>
                            <Route exact path = { `/user/:userID/transactions` }>
                                <Transactions />
                            </Route>
                            <Route exact path = { `/user/:userID/goals` }>
                                <Goals />
                            </Route>
                            <Route exact path = { `/user/:userID/budget` }>
                                <Budget />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}

export default withRouter(LoguedUser);