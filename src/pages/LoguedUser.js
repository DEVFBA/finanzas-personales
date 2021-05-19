import React, {
    useState,
    useEffect
} from 'react';
import {
    Container,
    Row,
    Col, 
    Image,
    Nav
} from 'react-bootstrap';
import {
    BrowserRouter,
    Route,
    Switch,
    withRouter,
    useRouteMatch,
    Link
} from 'react-router-dom';

import Summary from '../containers/Summary';
import FinancialMarkets from '../containers/FinancialMarkets';
import Investments from '../containers/Investments';
import Transactions from '../containers/Transactions';
import Goals from '../containers/Goals';
import Budget from '../containers/Budget';

import '../styles/LoguedUser.css';

import { 
    retrieveUserProfileByID,
    retrieveUserGoals,
    retrieveUserInvestments,
    retrieveUserBudget 
} from '../utils/UserFunctions';

const LoguedUser = (props) => {

    const [userName,        setUserName         ]       = useState('');
    const [userLastName,    setUserLastName     ]       = useState('');
    const [profilePicture,  setProfilePicture   ]       = useState('');
    const [userGoals,       setUserGoals        ]       = useState([]);
    const [userInvestments, setUserInvestments  ]       = useState([]);
    const [userBudget,      setUserBudget       ]       = useState([]);

    const { path, url } = useRouteMatch();

    const months        = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const years         = [2021, 2020, 2019];

    useEffect(async() => {

        const userProfile = await retrieveUserProfileByID(localStorage.getItem("loginToken"));

        const savingsGoals = await retrieveUserGoals(localStorage.getItem("loginToken"));
        
        const investments = await retrieveUserInvestments(localStorage.getItem("loginToken"));

        const budgets = await retrieveUserBudget(localStorage.getItem("loginToken"));
        
        setUserName(userProfile.userName);
        setProfilePicture(userProfile.profilePicture);
        setUserLastName(userProfile.userLastName);
        setUserGoals(savingsGoals);
        setUserInvestments(investments);
        setUserBudget(budgets);

    }, []);

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
                        <Container
                            className="sidebar bg-dark"
                        >
                            <div
                                className="pt-3"
                            >
                                <Row
                                    className="justify-content-center"
                                >
                                    <Image
                                        roundedCircle
                                        fluid
                                        src             = {profilePicture}
                                        className       = "profile-picture"
                                    />
                                </Row>
                                <Row
                                    className="mt-4 justify-content-center  d-block"
                                >
                                    <h6
                                        className="text-center text-white user-name"
                                    >
                                        Bienvenid@
                                    </h6>
                                    <h6
                                        className="text-center text-white user-name"
                                    >
                                        { `${userName} ${userLastName}` }
                                    </h6>
                                </Row>
                            </div>

                            <Nav
                                className   =   "mt-3 flex-column"
                            >
                                <Link
                                    to          =   { `${url}/summary` }
                                    className   =   "sidebar-link mt-1 ml-3"
                                >
                                    Resumen Financiero
                                </Link>
                                <Link
                                    to          =   { `${url}/budget` }
                                    className   =   "sidebar-link mt-1 ml-3"
                                >
                                    Mi Presupesto
                                </Link>
                                <Link
                                    to          =   { `${url}/goals` }
                                    className   =   "sidebar-link mt-1 ml-3"
                                >
                                    Mis Metas
                                </Link>
                                <Link
                                    to          =   { `${url}/transactions` }
                                    className   =   "sidebar-link mt-1 ml-3"
                                >
                                    Movimientos
                                </Link>
                                <Link
                                    to          =   { `${url}/investments` }
                                    className   =   "sidebar-link mt-1 ml-3"
                                >
                                    Mis Inversiones
                                </Link>
                                <Link
                                    to          =   { `${url}/finMarket` }
                                    className   =   "sidebar-link mt-1 ml-3"
                                >
                                    Mercados Financieros
                                </Link>
                                <Link
                                    to          =   { `/` }
                                    className   =   "sidebar-link mt-1 ml-3"
                                >
                                    Salir
                                </Link>
                            </Nav>
                        </Container>
                    </Col>
                    <Col
                        md={10}
                        className="logued-user-sections"
                    >
                        <Switch>
                            <Route path = { `${path}/summary` }>
                                <Summary
                                    userGoals       = { userGoals }
                                    userInvestments = { userInvestments }
                                    userBudget      = { userBudget }
                                    months          = { months }
                                    years           = { years }
                                />
                            </Route>
                            <Route exact path = { `${path}/finMarket` }>
                                <FinancialMarkets />
                            </Route>
                            <Route exact path = { `${path}/investments` }>
                                <Investments />
                            </Route>
                            <Route exact path = { `${path}/transactions` }>
                                <Transactions />
                            </Route>
                            <Route exact path = { `${path}/goals` }>
                                <Goals 
                                    userGoals       = { userGoals }
                                />
                            </Route>
                            <Route exact path = { `${path}/budget` }>
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