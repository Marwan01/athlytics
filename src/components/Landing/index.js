import { Button, Checkbox, Form } from 'semantic-ui-react'
import React, { Component } from 'react'
import { Icon, Modal } from 'semantic-ui-react'

class NestedModal extends Component {
  state = { open: false }


  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button primary icon>
            Proceed <Icon name='right chevron' />
          </Button>
        }
      >
        <Modal.Header>Modal #2</Modal.Header>
        <Modal.Content>
          <p>That's everything!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='All Done' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}

const CalendarComponent = () => (
  <Modal trigger={<Button>Multiple Modals</Button>}>
    <Modal.Header>
            <div className='image'>
        <Icon name='trophy' />
        Create and assign a new workout for {{date}}
      </div>
      
    </Modal.Header>
    <Modal.Content image>
    <Form>
  <Form.Field>
    <label>Workout Name</label>
    <input placeholder='Upper body workout' />
  </Form.Field>
  <Form.Field>
<label>Date</label>
<input placeholder='First Name' />
</Form.Field>
  </Form>
   </Modal.Content>
    <Modal.Actions>
      <NestedModal />
    </Modal.Actions>
  </Modal>
  )

  export default CalendarComponent
