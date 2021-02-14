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
    Switch
} from 'react-router-dom';

import Sidebar from './Sidebar';
import Summary from './Summary';
import FinancialMarkets from './FinancialMarkets';

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
            <Container fluid>
                <Row>
                    <Col
                        md={2}
                        className="p-0"
                    >
                        <Sidebar
                            userName={userName}
                            userLastName={userLastName}
                            profilePicture={profilePicture}
                        />
                    </Col>
                    <Col
                        md={10}
                        className="logued-user-sections"
                    >
                        <Switch>
                            <Route path='/user/:userID/summary'>
                                <Summary
                                    userGoals       = { userGoals }
                                    userInvestments = { userInvestments }
                                    userBudget      = { userBudget }
                                    months          = { months }
                                    years           = { years }
                                />
                            </Route>
                            <Route path='/user/:userID/finMarket'>
                                <FinancialMarkets />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    );
}

export default LoguedUser;