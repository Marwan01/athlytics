import React, { Component } from 'react'
import { Button, Image, Modal, Icon,Form ,Divider} from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash'

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
      
      fields:[0],
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
    this.addField = this.addField.bind(this);
  }
  handleChange = (i,event) => {
  let a = event.target.name

  let w = this.state.workout
  w.exercises[i][a] = event.target.value
  console.log(w.exercises[i][a])


  
    this.setState({ workout: w})}

  addField = () => {
    console.log("called")
    let last = this.state.fields[this.state.fields.length - 1]
    let arr = this.state.fields
    arr.push(last + 1)

    this.setState({
      fields: arr
    });

    let w = this.state.workout
    let exercise1 = {
      exerciseName: 'Test', reps: '3', weight: '12',
    }

    w.exercises.push(exercise1)
    this.setState({
      workout: w
    });
    console.log(this.state.workout)

  };

  handleSubmit = () => {
    const {exerciseName, reps, weight } = this.state

    this.setState({
      submittedExerciseName: exerciseName,
      submittedReps: reps,
      submittedWeight: weight
    })
  }


  show = dimmer => () => this.setState({ dimmer, open: true })
  confirm = () => this.setState({ workout: {} })

  render() {
    const { open, dimmer } = this.state
    const { exerciseName, reps, weight,
      submittedName, submittedExerciseName, submittedReps, submittedWeight } = this.state

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
                  <Form.Select onChange={() => { console.log("teamname"); }} label='Assign to' options={teams} placeholder='Team' />
                </Form.Group>
              </Form>

            </Modal.Description>
          </Modal.Content>
          <Divider horizontal>Exercises</Divider>

          {this.state.fields.map((i) =>
            <Line action={this.handleChange} state={this.state} index={i}> </Line>
            )
          }

          <Modal.Content image>
            <Button icon onClick={this.addField}><Icon name='plus' /></Button>
          </Modal.Content>

          <strong>onChange:</strong>
        <pre>{JSON.stringify({ exerciseName, reps, weight }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedExerciseName, submittedReps, submittedWeight}, null, 2)}</pre>

          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon='arrow right'
              labelPosition='right'
              content="Confirm"
              onClick={this.confirm}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}


class Line extends Component {

  componentDidMount() {

  }
  render() {
    let clicked = false;
    let last = this.props.state.fields[this.props.state.fields - 1] == this.props.index
    let el = this.props.state.workout.exercises[this.props.index]
    return (
      <Modal.Content image>
      <Form image size={'big'}>
        <Form.Group>
          <label>{this.props.index + 1}.</label>
          <Form.Input name='exerciseName' value={el.exerciseName} onChange={(e) => this.props.action(this.props.index, e)} label='Exercise Name' placeholder='Push Ups' />
          <Form.Input name='reps' value={el.reps} onChange={(e) => this.props.action(this.props.index, e)} label='Reps' placeholder='8x3' />
          <Form.Input name='weight' value={el.weight} onChange={(e) => this.props.action(this.props.index, e)} label='Weight (lb)' placeholder='45' />
        </Form.Group>
      </Form>
    </Modal.Content>
    )
  }
}


export default ModalExampleDimmer
