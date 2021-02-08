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
    useLocation
} from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/LoguedUser.css';
import Summary from './Summary';

const LoguedUser = (props) => {

    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [userGoals, setUserGoals] = useState([]);
    const [userInvestments, setUserInvestments] = useState([]);
    const location = useLocation();

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const years = [2021, 2020, 2019];

    useEffect(() => {
        setUserName(location.state.userProfile.userName);
        setProfilePicture(location.state.userProfile.profilePicture);
        setUserLastName(location.state.userProfile.userLastName);
        setUserGoals(location.state.userProfile.savingsGoals);
        setUserInvestments(location.state.userProfile.investments);
    }, [location])

   return(
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
                    <Summary
                        userGoals={userGoals}
                        userInvestments={userInvestments}
                        months={months}
                        years={years}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default LoguedUser;