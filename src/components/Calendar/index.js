import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withAuthorization, withEmailVerification } from '../Session';

import MyCalendar from './calendar.js'; //from me
import './index.css';

const Calendar = () => (
  <div>
    <h1 style={{fontSize:'100px'}}>Calendar page alex </h1>
  </div>
);
const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Calendar);
