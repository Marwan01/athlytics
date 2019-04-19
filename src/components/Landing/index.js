import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon,Form } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash'
import { Dropdown } from 'semantic-ui-react'

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
          <Form.Select  label='Block' options={options} placeholder='Block' />
          <Form.Input  label='Exercise Name' placeholder='Push Ups' />
          <Form.Input  label='Reps' placeholder='8x3' />
          <Form.Input  label='Weight (lb)' placeholder='45' />
        </Form.Group>
    </Form>




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