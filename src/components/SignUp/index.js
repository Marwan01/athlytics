import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {
  Form,
  Radio,
  Button,
  Grid,
  Header,
  Message,
  Checkbox,
  Dropdown,
  Divider
} from 'semantic-ui-react';

const SignUpPage = () => (
  <Grid centered columns={2}>
    <Grid.Column>
      <Header as="h2" textAlign="center">
        Sign Up
      </Header>
      <SignUpForm />
    </Grid.Column>
  </Grid>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  sport: null,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  handleChange = (e, { value }) => {
  if(value == 'Choose Team:'){
    this.setState({isAdmin:false})
  }


    this.setState({  value })}
    handleTeamChange = (e, { value }) => this.setState({ sport: value  })

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin,sport } = this.state;
    const roles = [];
    console.log(this.state)
    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
          sport
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    console.log(event.target.value )
    this.setState({ [event.target.name]: event.target.value });
  };

  validateCode = event => {
    this.setState({sport:''})
    if (event.target.value == "secretcode")
{    this.setState({isAdmin: true });
console.log("success" )
} 
else{
  this.setState({isAdmin: true })}
 };

  onChangeCheckbox = () => {
    this.setState({ isAdmin: !this.state.isAdmin });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      sport,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
      const options = [
        { key: 'Women soccer', text: 'Women Soccer', value: 'Women soccer' },
        { key: 'Men soccer', text: 'Men Soccer', value: 'Men soccer' },
        { key: 'Softball', text: 'Softball', value: 'Softball' },
        { key: 'Men baseball', text: 'Men Baseball', value: 'Men baseball' },
        { key: 'Women tennis', text: 'Women Tennis', value: 'Women tennis' },
        { key: 'Men tennis', text: 'Men Tennis', value: 'Men tennis' },
        { key: 'Women basketball', text: 'Women Basketball', value: 'Women basketball' },
        { key: 'Men basketball', text: 'Men Basketball', value: 'Men basketball' },
        { key: 'Women diving', text: 'Women Diving', value: 'Women diving' },
        { key: 'Men diving', text: 'Men Diving', value: 'Men diving' },
        { key: 'Women cross country', text: 'Women Cross Country', value: 'Women cross country' },
        { key: 'Men cross country', text: 'Men Cross Country', value: 'Men cross country' },
        { key: 'Women track and field', text: 'Women Track and Field', value: 'Women track and field' },
        { key: 'Men track and field', text: 'Men Track and Field', value: 'Men track and field' },
        { key: 'Women golf', text: 'Women Golf', value: 'Women golf' },
        { key: 'Men golf', text: 'Men Golf', value: 'Men golf' },
        { key: 'Women ice hockey', text: 'Women Ice Hockey', value: 'Women ice hockey' },
        { key: 'Men ice hockey', text: 'Men Ice Hockey', value: 'Men ice hockey' },
        { key: 'Field Hockey', text: 'Field Hockey', value: 'Field hockey' },
        { key: 'Women lacrosse', text: 'Women Lacrosse', value: 'Women lacrosse' },
        { key: 'Men lacrosse', text: 'Men Lacrosse', value: 'Men lacrosse' },
        { key: 'Women rugby', text: 'Women Rugby', value: 'Women rugby' },
        { key: 'Men rugby', text: 'Men Rugby', value: 'Men rugby' },
        { key: 'Women swimming', text: 'Women Swimming', value: 'Women swimming' },
        { key: 'Men swimming', text: 'Men Swimming', value: 'Men swimming' },
        { key: 'Synchronized swimming', text: 'Synchronized Swimming', value: 'Synchronized swimming' },
        { key: 'Women volleyball', text: 'Women Volleyball', value: 'Women volleyball' },
        { key: 'Men volleyball', text: 'Men Volleyball', value: 'Men volleyball' },
        { key: 'Women water polo', text: 'Women Water Polo', value: 'Women water polo' },
        { key: 'Men water polo', text: 'Men Water Polo', value: 'Men water polo' },
        { key: 'Women wrestling', text: 'Women Wrestling', value: 'Women wrestling' },
        { key: 'Men wrestling', text: 'Men Wrestling', value: 'Men wrestling' },
        { key: 'Gymnastics', text: 'Gymnastics', value: 'Gymnastics' },
      ]

    return (
      <div>
        {error && (
          <Message negative>
            <p>{error.message}</p>
          </Message>
        )}
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Full Name</label>
            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
          </Form.Field>
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
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Student'
                name='radioGroup'
                value='Choose Team:'
                checked={this.state.value === 'Choose Team:'}
                onChange={this.handleChange}
                defaultChecked
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Coach'
                name='radioGroup'
                value='Enter Secret Seed:'
                checked={this.state.value === 'Enter Secret Seed:'}
                onChange={this.handleChange}
              />
            </Form.Field>

            {this.state.value == "Choose Team:"&& (
                <Form.Field>         
                <label>{"Pick a sport:"}</label>
                <Dropdown placeholder='Sport' 
                search 
                selection 
                options={options} 
                onChange={this.handleTeamChange}
                />

            </Form.Field>
            )}
            {this.state.value == "Enter Secret Seed:"&& (
                <Form.Field>         
                <label>{this.state.value}</label>
                <input
                  name="notemail"
                  // value={email}
                  onChange={this.validateCode}
                  type="text"
                  placeholder="Value"
                />
            </Form.Field>
            )}
          <Button primary disabled={isInvalid} type="submit">
            Sign Up
          </Button>

        </Form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <div>
    <br></br>
    <Divider horizontal>Or</Divider>
      <p>
    Don't have an account? 
  </p>
  <Link to={ROUTES.SIGN_UP}><Button>Sign Up</Button></Link>
  </div>

);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
