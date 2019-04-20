import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon, Form, Divider } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash'
import { withFirebase } from '../Firebase';

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




class ModalExampleDimmer extends Component {
  constructor(props) {

    super(props);
    this.state = {
      open: false,

      fields: [0],
      workout: {
        workoutName: '',
        team: '',
        //date
        exercises: [
          {
            exerciseName: '', reps: '', weight: '',
          }
        ],
      },

      exerciseName: '', reps: '', weight: '',

      submittedName: '', submittedExerciseName: '', submittedReps: '', submittedWeight: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addWorkout = this.addWorkout.bind(this);
    this.addField = this.addField.bind(this);
  }
  addWorkout = (uid) => {
    let workout = {
      title: 'test2',
      start: "April 19, 2019 11:00:00",
      end: "April 19, 2019 19:30:00",
      exercises: [
        {
          name: "curls",
          reps: "25",
          weight: '20lb'
        }, {
          name: "squats",
          reps: "4",
          weight: '200lb'
        }
      ]
    }

    //DATE DOES NOT GET SEND
    let ui = workout.title + workout.start

    // workouts.push(workout[0])
    console.log(uid)
    this.props.firebase.user_workout(uid, ui).set(workout)
  }

  getStudentsBySport = () => {

    this.props.firebase
    .users()
    .on('value', snapshot => {
      const users = snapshot.val();
      let  newArrayDataOfOjbect = Object.values(users)
      let local_sport = "Women soccer"
      let uids_to_update=[]
      let  keys = Object.keys(users)

      for (var i = 0; i < newArrayDataOfOjbect.length-1; i++) {
        let user = newArrayDataOfOjbect[i]
        if(user.sport == local_sport){
          console.log("match")
          uids_to_update.push(keys[i])
        }
      }
      console.log(uids_to_update)
      uids_to_update.map(uid => {
        this.addWorkout(uid)
      } )
      
      // for (var i = 0; i < uids_to_update.length-1; i++) {
      //   this.addWorkout(uids_to_update[i])
      // }

    });
  }


  handleChange = (exercise_index, event) => {
    let field_to_change = event.target.name
    let workout_copy = this.state.workout
    workout_copy.exercises[exercise_index][field_to_change] = event.target.value
    this.setState({ workout: workout_copy})
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
  close = () => this.setState({ open: !this.state.open})
  // confirm = () => this.setState({ workout: {} })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button onClick={this.show(true)}>Default</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>
            <div className='image'>
              <Icon name='trophy' />
              Create and assign a new workout for "mm/dd/yyyy and given time(display here)"
    </div>
          </Modal.Header>
          <Modal.Content image>
            <Image wrapped size='small' src={require('./../../img/exercise.png')} />
            <Modal.Description image>
              <Form>
                <Form.Group>
                  <Form.Input label='Workout Name' onChange={(evt1) => { console.log(evt1.target.value); }} placeholder='Upper Body Workout' />
                  <Form.Select onChange={(e, { value }) => { console.log(value); }} label='Assign to' options={teams} placeholder='Team' />
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
    )
  }
}


class Line extends Component {
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


export default withFirebase(ModalExampleDimmer);
