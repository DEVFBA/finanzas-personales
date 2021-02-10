import React from 'react';
import {
    BrowserRouter,
    Route
  } from "react-router-dom";
import NavBar from './NavBar';
import Hero from './Hero';
import SignUp from './SignUp';
import SignIn from './SignIn';
import '../styles/Home.css';

const Home = () => {
    return(
        <BrowserRouter>
            <NavBar />

            <Route exact path="/home" component={Hero} />
            <Route exact path="/home/signUp" component={SignUp} />
            <Route exact path="/home/signIn" component={SignIn} />
        </BrowserRouter>
    );
}

export default Home;