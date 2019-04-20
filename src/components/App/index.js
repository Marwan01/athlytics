import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Workouts from '../Workouts'
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import CalendarPage from '../Calendar';


import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import { Container } from 'semantic-ui-react';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Container fluid >
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.CALENDAR} component={CalendarPage} />
        <Route path={ROUTES.WORKOUTS} component={Workouts} />

      </Container>
    </div>
  </Router>
);

export default withAuthentication(App);
