import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import {
  Grid,
  Form,
  Button,
  Header,
  Message,
} from 'semantic-ui-react';

const SignInPage = () => (
  <Grid centered columns={2}>
    <Grid.Column>
      <Header as="h2" textAlign="center">
        Sign In
      </Header>
      <SignInForm />
      <SignUpLink />
    </Grid.Column>
  </Grid>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        {error && (
          <Message negative>
            <p>{error.message}</p>
          </Message>
        )}
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </Form.Field>
          <Button primary disabled={isInvalid} type="submit">
            Submit
          </Button>
          
        </Form>
        <br></br>
        <PasswordForgetLink />
      </div>
    );
  }
}


const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);


export default SignInPage;

export { SignInForm };
