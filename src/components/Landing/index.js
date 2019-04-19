import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon,Form } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash'


const options = [
  { key: 'A', text: 'A', value: 'A' },
  { key: 'B', text: 'B', value: 'B' },
  { key: 'C', text: 'C', value: 'C' },
  { key: 'D', text: 'D', value: 'D' },
  { key: 'E', text: 'E', value: 'E' },
  { key: 'F', text: 'F', value: 'F' },
  { key: 'G', text: 'G', value: 'G' },
  { key: 'H', text: 'H', value: 'H' },
  { key: 'I', text: 'I', value: 'I' },
  { key: 'J', text: 'J', value: 'J' }
]




class ModalExampleDimmer extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      open: false,

      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  
  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button onClick={this.show(true)}>Default</Button>
        {/* <Button onClick={this.show('inverted')}>Inverted</Button>
        <Button onClick={this.show('blurring')}>Blurring</Button> */}

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>
          <div className='image'>
      <Icon name='trophy' />
      Create and assign a new workout for "mm/dd/yyyy and given time(display here)"
    </div>
    </Modal.Header>
    <Modal.Content image>

      <Image wrapped size='small' src='http://pluspng.com/img-png/png-exercise-exercise-icon-image-16341-300.png' />
      <Modal.Description>
        <Header>Workout Name:</Header>
        <Form>
          <Form.Field>
            <input placeholder='Upper body workout' />
          </Form.Field>
          </Form>
      </Modal.Description>
    </Modal.Content>


      <Modal.Content image>
      <Form image>
      <Form.Group>
        {/* FIX THE BLOCKVALUE TO GET SELECTED VALUE OF DROPDOWN MENU */}
        <Form.Select  onChange={() => { console.log("blockvalue"); }} label='Block' options={options} placeholder='Block' />
        <Form.Input  onChange={(evt1) => { console.log(evt1.target.value); }} label='Exercise Name' placeholder='Push Ups' />
        <Form.Input  onChange={(evt2) => { console.log(evt2.target.value); }}label='Reps' placeholder='8x3' />
       <Form.Input  onChange={(evt3) => { console.log(evt3.target.value); }}label='Weight (lb)' placeholder='45' />
     </Form.Group>
  </Form>
</Modal.Content>
<Modal.Content image>
<Button icon><Icon name='plus' /></Button>
</Modal.Content>




          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon='arrow right'
              labelPosition='right'
              content="Next"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalExampleDimmer