import React, {
  useState
} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import {
  UserContext
} from '../context/UserContext';
import NavBar from '../components/NavBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import LoguedUser from './LoguedUser';

import '../styles/App.css';

const App = () => {

  const [user, setUser]     = useState(null);

  return(
    <div className="App">
      <UserContext.Provider value = {{ user, setUser }}>
        <BrowserRouter>
          {/* <NavBar /> */}

          <Switch>
            <Route path='/signUp'                         component = { SignUp } />
            <Route path='/signIn'                         component = { SignIn } />
            <Route path='/user'                           component = { LoguedUser } />
            <Route path='/'                               component = { Home } />
          </Switch>

        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
