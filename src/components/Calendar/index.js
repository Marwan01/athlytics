import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withAuthorization, withEmailVerification,AuthUserContext } from '../Session';
import BigCalendar from 'react-big-calendar'
import dateFormat from 'dateformat'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Header, Image, Modal, Icon, Form, Divider } from 'semantic-ui-react'

const teams = [
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


class Calendar extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      open: false,

      events:[],
      fields: [0],

      workout: {
        workoutName: '',
        sport: '',
        start : new Date(),
        end : new Date(),
        exercises: [
          {
            exerciseName: '', reps: '', weight: '',
          }
        ],
      }

    };
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addWorkout = this.addWorkout.bind(this);
    this.addField = this.addField.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }
componentDidMount(){
  this.getEvents()
}
componentWillUnmount(){
  this.props.firebase.users().off();
}
  getEvents = () =>{
    let token = JSON.parse(localStorage.getItem('authUser'))
    this.props.firebase.user(token.uid)
    .once('value')
    .then(snapshot => {
      const dbUser = snapshot.val();
      let w = dbUser.workouts
      if (w){
        var newArrayDataOfOjbect = Object.values(w)
        newArrayDataOfOjbect.forEach(function(element) {
          element.workoutName = element.workoutName+ "-"+element.sport
          element.end = new Date(element.end)
          element.start = new Date(element.start)
          
        });
        this.setState({events: newArrayDataOfOjbect})
        console.log(this.state.events)
      }
    });

  }

  handleSelect = ({ start, end }) => {
    let workout_copy = this.state.workout
    workout_copy['start']= start.toString()
    workout_copy['end']= end.toString()
    this.setState({open:true})
    this.setState({workout:workout_copy})
  }

  addWorkout = (uid, update) => {
    let workout = this.state.workout
    //DATE DOES NOT GET SEND
    let ui = workout.workoutName + workout.start
    this.props.firebase.user_workout(uid, ui).set(workout)
    update()
  }

  addWorkoutforAdmin = (uid,list_uids, update) => {
    let workout = this.state.workout
    workout["uids_list"]=list_uids
    //DATE DOES NOT GET SEND
    let ui = workout.workoutName + workout.start
    this.props.firebase.user_workout(uid, ui).set(workout)
    update()
  }


  

  getStudentsBySport = () => {
    let token = JSON.parse(localStorage.getItem('authUser'))
    this.props.firebase
      .users()
      .on('value', snapshot => {
        const users = snapshot.val();
        let newArrayDataOfOjbect = Object.values(users)
        let uids_to_update = []
        let keys = Object.keys(users)

        for (var i = 0; i < newArrayDataOfOjbect.length - 1; i++) {
          let user = newArrayDataOfOjbect[i]
          if (user.sport == this.state.workout.sport) {
            uids_to_update.push(keys[i])
          }
        }

        this.addWorkoutforAdmin(token.uid,uids_to_update,this.update)
        
        uids_to_update.map(uid => {
          this.addWorkout(uid,this.update)
        })
      })

      this.setState({ open: false })
  }

  update = ()=> {
    this.props.history.push(ROUTES.WORKOUTS)
  }


  handleChange = (exercise_index, event) => {
    let field_to_change = event.target.name
    let workout_copy = this.state.workout
    workout_copy.exercises[exercise_index][field_to_change] = event.target.value
    this.setState({ workout: workout_copy })
  }

  addField = () => {
    let last = this.state.fields[this.state.fields.length - 1]
    let arr = this.state.fields
    arr.push(last + 1)
    this.setState({
      fields: arr
    });


    let w = this.state.workout
    let default_exercise = {
      exerciseName: '', reps: '', weight: '',
    }
    w.exercises.push(default_exercise)
    this.setState({
      workout: w
    });
  };

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: !this.state.open })


  render() {

    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    return (
          <AuthUserContext.Consumer>
    {authUser => (
      <div style={{height:'750px', padding:'5vh'}}>
        <Header as="h2">{authUser.username}'s Calendar</Header>
        {!authUser.roles.includes(ROLES.ADMIN) &&
          <Header as="h2">Sport: {authUser.sport}</Header>
        }
        
      <BigCalendar
          selectable
          localizer={localizer}
          startAccessor="start"
          titleAccessor="workoutName"
          endAccessor="end"
          timeslots={8}
          step={15}
          events={this.state.events}
          views={['month', 'week', 'day']}
          defaultView={BigCalendar.Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2019, 3, 12)}
          onSelectEvent={event => this.props.history.push(ROUTES.WORKOUTS)}
          onSelectSlot={this.handleSelect}
        />
              <div>
        <Modal open={this.state.open} onClose={this.close}>
          <Modal.Header>
            <div className='image'>
              
              <h1><Icon name='trophy' /> Assign a New Workout On: {dateFormat(new Date(this.state.workout.start), "dddd, mmmm dS, yyyy")}
              </h1>
              <h2>From: {dateFormat(new Date(this.state.workout.start), "h:MM TT")} Until: {dateFormat(new Date(this.state.workout.end), "h:MM TT")}</h2>
            </div>
          </Modal.Header>
          <Modal.Content image>
            <Image wrapped size='small' src={require('./../../img/exercise.png')} />
            <Modal.Description image>
              <Form>
                <Form.Group>
                  <Form.Input label='Workout Name' onChange={(e) => {    
                    let workout_copy = this.state.workout
    workout_copy['workoutName']= e.target.value
    this.setState({workout:workout_copy})}}  placeholder='Upper Body Workout' />
                  <Form.Select onChange={(e, { value }) => {    
                    let workout_copy = this.state.workout
    workout_copy['sport']= value
    this.setState({workout:workout_copy})}} label='Assign to' options={teams} placeholder='Team' />
                </Form.Group>
              </Form>

            </Modal.Description>
          </Modal.Content>
          <Divider horizontal>Exercises</Divider>

          {this.state.fields.map((i) =>
            <Line handleChange={this.handleChange} state={this.state} index={i}> </Line>
          )
          }

          <Modal.Content image>
            <Button icon onClick={this.addField}><Icon name='plus' /></Button>
          </Modal.Content>

          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon='arrow right'
              labelPosition='right'
              content="Confirm"
              onClick={this.getStudentsBySport}
            />
          </Modal.Actions>
        </Modal>
      </div>
      </div>)}

  </AuthUserContext.Consumer>
      
    )
  }
}

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

class Line extends React.Component {
  render() {
    let index = this.props.index
    let exercise_path_in_state = this.props.state.workout.exercises[index]
    return (
      <Modal.Content image>
        <Form image size={'big'}>
          <Form.Group>
            <label>{index + 1}.</label>
            <Form.Input name='exerciseName' value={exercise_path_in_state.exerciseName} onChange={(e) => this.props.handleChange(index, e)} label='Exercise Name' placeholder='Push Ups' />
            <Form.Input name='reps' value={exercise_path_in_state.reps} onChange={(e) => this.props.handleChange(index, e)} label='Reps' placeholder='8x3' />
            <Form.Input name='weight' value={exercise_path_in_state.weight} onChange={(e) => this.props.handleChange(index, e)} label='Weight (lb)' placeholder='45' />
          </Form.Group>
        </Form>
      </Modal.Content>
    )
  }
}


const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Calendar);
