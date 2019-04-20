import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { Card, Loader, Button, Message , Confirm} from 'semantic-ui-react';
import * as ROUTES from '../../constants/routes';


class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false ,
      loading: false,
      user: null,
      ok:false,
      ...props.location.state,
    };
  }
  show = () => this.setState({ open: true })
  handleConfirm = (uid) => {
    this.setState({ open: false }) 
    this.props.firebase.user(uid).remove()
    this.props.history.push(ROUTES.ADMIN);
}
  handleCancel = () => this.setState({ open: false })

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
    this.setState({ok:!this.state.ok})
  };

  render() {
    const { user, loading, ok  } = this.state;

    return (
      <Card fluid={true}>

      {ok ? (    <Message
    success
    header='You have sent a Reset Password Email to'
    content= {this.state.user.username} 
  />) : null}
        {loading ? (
          <Loader active inline="centered" />
        ) : (
          <Card.Content>
            <Card.Header>Username: {user.username}</Card.Header>
            <Card.Description>
              {user && (
                <div>
                  <Card.Content>
                    <Card.Description>Email: {user.email}</Card.Description>
                    {!user.sport == '' ?  (
                        <Card.Description>Sport: {user.sport}</Card.Description>
                        ) : <Card.Description>Status: Coach</Card.Description>}

                    <br />
                    <Button
                      primary
                      type="button"
                      onClick={this.onSendPasswordResetEmail}
                    >
                      Send Password Reset
                    </Button>
                    <Button
                      color={'red'}
                      type="button"
                      onClick={this.show}
                    >
                      Delete
                    </Button>
                    <Confirm
          open={this.state.open}
          header='Are you sure you want to delete this user?'
          content='This change is irrevertable. The selected user will not be able to access the platform anymore.'
          onCancel={this.handleCancel}
          confirmButton="Delete"
          onConfirm={() =>{this.handleConfirm(user.uid)}}
        />
                  </Card.Content>
                </div>
              )}
            </Card.Description>
          </Card.Content>
        )}
      </Card>
    );
  }
}

export default withFirebase(UserItem);
