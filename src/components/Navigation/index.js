import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { Container, Menu, Image } from 'semantic-ui-react';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Menu pointing secondary fluid size='huge'>
    <Container>
      <Menu.Item  as={Link} to={ROUTES.HOME} >
      <img src='https://cdn.swimswam.com/wp-content/uploads/2014/11/Lindenwood-logo.jpg'/>
      </Menu.Item>
      <Menu.Item icon='settings' name="Account" as={Link} to={ROUTES.ACCOUNT} />
      {authUser.roles.includes(ROLES.ADMIN) && (
        <Menu.Item icon='user secret' name="Admin" as={Link} to={ROUTES.ADMIN} />
      )}
      {authUser.roles.includes(ROLES.ADMIN) && (
        <Menu.Item icon='calendar' name="Calendar" as={Link} to={ROUTES.CALENDAR} />
      )}
      <Menu.Item icon='football ball' name="Workouts" as={Link} to={ROUTES.WORKOUTS} />
      <SignOutButton />
    </Container>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu pointing secondary fluid size='huge'>
    <Container>
    <Menu.Item  as={Link} to={ROUTES.HOME} >
    <img src='https://cdn.swimswam.com/wp-content/uploads/2014/11/Lindenwood-logo.jpg'/>
      </Menu.Item>      <Menu.Menu position="right">
        <Menu.Item icon='sign in' name="signin" as={Link} to={ROUTES.SIGN_IN} />
      </Menu.Menu>
    </Container>
  </Menu>
);

export default Navigation;
