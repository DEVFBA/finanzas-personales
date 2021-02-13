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
    useParams
} from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/LoguedUser.css';
import Summary from './Summary';
import { retrieveUserProfileByID } from '../utils/UserFunctions';

const LoguedUser = (props) => {

    const [userName,        setUserName]            = useState('');
    const [userLastName,    setUserLastName]        = useState('');
    const [profilePicture,  setProfilePicture]      = useState('');
    const [userGoals,       setUserGoals]           = useState([]);
    const [userInvestments, setUserInvestments]     = useState([]);
    
    const  { userID } = useParams();

    const userProfile = retrieveUserProfileByID(userID)

    const months        = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const years         = [2021, 2020, 2019];

    useEffect(() => {
        
        setUserName(userProfile.userName);
        setProfilePicture(userProfile.profilePicture);
        setUserLastName(userProfile.userLastName);
        setUserGoals(userProfile.savingsGoals);
        setUserInvestments(userProfile.investments);

    }, [])

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