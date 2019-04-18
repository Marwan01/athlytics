import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { Container } from 'semantic-ui-react'
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withAuthorization, withEmailVerification } from '../Session';

import MyCalendar from './calendar.js';
import ModalExampleMultiple from './MultipleModals.js';
import ListDivided from './DividedList.js';
import './index.css';

const Calendar = () => (
  <div>
  <MyCalendar></MyCalendar>
  <Container></Container>
  <ListDivided></ListDivided>
  
  </div>
);
const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Calendar);
