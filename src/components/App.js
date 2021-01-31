import React from 'react';
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import '../styles/App.css';
import NavBar from './NavBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Hero from './Hero';
import LoguedUser from './LoguedUser';

const App = () => {
  return(
    <div className="App">
      <>
        <BrowserRouter>
          <NavBar />

          <Route exact path="/" component={Hero} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/loguedUser" component={LoguedUser} />

        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
