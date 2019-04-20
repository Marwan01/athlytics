import React, { Component } from 'react'
import { Table, Divider, Image } from 'semantic-ui-react'
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, AuthUserContext } from '../Session';
import { auth } from 'firebase';



class Workouts extends Component {

  constructor(...props) {
    super(...props)
    this.state={
      events:[]
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
              <TableExampleInverted eventToDisplay={workout_obj} />
            )}

          </div>)}

      </AuthUserContext.Consumer>
    );
  }
}


const condition = authUser =>
  authUser;


  class TableExampleInverted extends React.Component {
    constructor(...props) {
      super(...props)
    }
    render() {
      let workout = this.props.eventToDisplay
      let exercises = workout.exercises
      return (
        <div>
        <Divider horizontal>{workout.workoutName}</Divider>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><Image src={require('./../../img/exercise.png')} rounded size='mini' /></Table.HeaderCell>
              <Table.HeaderCell width={5}>Exercise</Table.HeaderCell>
              <Table.HeaderCell width={5}>Repetition</Table.HeaderCell>
              <Table.HeaderCell width={5}>Weight (lb)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {exercises.map((ex,index) => 
            <RowItem exercises={ex} index={index}/>
          )}
        </Table>
        </div>
      )
    }
  }

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
              <Table.Cell>{index+1}</Table.Cell>
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
