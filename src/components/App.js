import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import '../styles/App.css';
import NavBar from './NavBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import LoguedUser from './LoguedUser';
import Test from './test';

const App = () => {

  return(
    <div className="App">
      <>
        <BrowserRouter>
          <NavBar />

          <Switch>
            <Route exact path='/'                         component = { Home } />
            <Route exact path='/signUp'                   component = { SignUp } />
            <Route exact path='/signIn'                   component = { SignIn } />
            <Route exact path='/user/:userID/summary'     component = { LoguedUser } />
            <Route exact path='/user/:userID/finMarket'     component = { LoguedUser } />
            <Route exact path='/user/:userID/investments'     component = { LoguedUser } />
            <Route exact path='/user/:userID/transactions'     component = { LoguedUser } />
            <Route exact path='/user/:userID/goals'     component = { LoguedUser } />
            <Route exact path='/user/:userID/budget'     component = { LoguedUser } />
          </Switch>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
