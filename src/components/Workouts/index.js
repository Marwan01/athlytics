import React, { Component } from 'react'
import { Table, Divider, Image, Button } from 'semantic-ui-react'
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, AuthUserContext } from '../Session';
import dateFormat from 'dateformat'
import * as ROUTES from '../../constants/routes';



class Workouts extends Component {

  constructor(...props) {
    super(...props)

    this.state = {
      events: []
    }
  }

  componentWillMount() {
    this.getEvents()

  }

  getEvents = () => {
    let token = JSON.parse(localStorage.getItem('authUser'))
    this.props.firebase.user(token.uid)
      .once('value')
      .then(snapshot => {
        const dbUser = snapshot.val();
        let w = dbUser.workouts
        if (w) {
          var newArrayDataOfOjbect = Object.values(w)
          newArrayDataOfOjbect.forEach(function (element) {
            element.end = new Date(element.end)
            element.start = new Date(element.start)

          });
          this.setState({ events: newArrayDataOfOjbect })
        }
        console.log(this.state.events)


      });

  }
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {this.state.events.map((workout_obj) =>
              <TableExampleInverted eventToDisplay={workout_obj} user={authUser} firebase={this.props.firebase} history={this.props.history} />
            )}

          </div>)}

      </AuthUserContext.Consumer>
    );
  }
}


const condition = authUser =>
  authUser;


class TableExampleInverted extends Component {
  constructor(...props) {
    super(...props)
    this.deleteWorkout = this.deleteWorkout.bind(this);


  }

  deleteWorkout = async (uid, ui) => {
    await this.props.firebase.user_workout(uid, ui).remove()
    window.location.reload();

  }



  render() {
    let workout = this.props.eventToDisplay
    let exercises = workout.exercises
    let w_uid = workout.workoutName + workout.start
    let user = this.props.user
    return (
      <div style={{ padding: '2vh', marginBottom: '2vh' }}>
        <Divider horizontal>{dateFormat(new Date(workout.start), " mmmm dS, yyyy")}</Divider>
        <Divider horizontal>{workout.workoutName + "-" + workout.sport}</Divider>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><Image src={require('./../../img/exercise.png')} rounded size='mini' /></Table.HeaderCell>
              <Table.HeaderCell width={5}>Exercise</Table.HeaderCell>
              <Table.HeaderCell width={5}>Repetition</Table.HeaderCell>
              <Table.HeaderCell width={5}>Weight (lb)</Table.HeaderCell>
              <Table.HeaderCell><Button icon='trash' color='red' onClick={ (e) => {this.deleteWorkout(user.uid, w_uid)} }/></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {exercises.map((ex, index) =>
            <RowItem exercises={ex} index={index} />
          )}
        </Table>

      </div>
    )
  }
}
compose(
  withEmailVerification,
  withAuthorization(condition),
)(TableExampleInverted)

class RowItem extends React.Component {
  constructor(...props) {
    super(...props)
  }

  render() {
    let exercises = this.props.exercises
    let index = this.props.index
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{index + 1}</Table.Cell>
          <Table.Cell>{exercises.exerciseName}</Table.Cell>
          <Table.Cell>{exercises.reps}</Table.Cell>
          <Table.Cell>{exercises.weight}</Table.Cell>
        </Table.Row>
      </Table.Body>
    )
  }
}

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Workouts);
