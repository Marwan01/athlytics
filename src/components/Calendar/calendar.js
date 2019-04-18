import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { Icon, Modal } from 'semantic-ui-react'

// import MultiModalPopUp from './MultiModalPopUp.js'; // create a new component for the modal pop up
import ListDivided from './DividedList.js';
import './index.css';

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

class CalendarComponent extends Component {
  constructor(props)
  {
    super(props)
    this.state = { open: props.open, onChange: props.onChange, refference: props.refference }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  //The content of this return should be imported form a new file named MultiModalPopUp
  render(){
    return(
      <Modal open={this.props.open} onOpen={this.open} onClose={() => this.props.onChange(this.props.refference, false)}>
        <Modal.Header>Modal #1</Modal.Header>
        <Modal.Content>
          <Form>
		    <Form.Field>
			  <div class ="list-PopUpDiv">
		        <ListDivided>
		        </ListDivided>
			  </div>
			  <div class ="list-PopUpDiv">
		        <ListDivided>
		        </ListDivided>
			  </div>
		    </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <NestedModal/>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, key: props.id, showModal: false }
  }

  changeOpen(refference, bool)
  {
    refference.setState({ showModal: bool })
  }

  render()
  {
    const showModal = this.state.showModal
	  return(
	  <div>
	  <Calendar
      onClickDay={() => {this.changeOpen(this, true)}}
    />
    <CalendarComponent open={showModal} onChange={this.changeOpen} refference={this}/>
	  </div>
	  );
  }
}


