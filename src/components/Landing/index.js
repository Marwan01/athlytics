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

      <Image wrapped size='small' src={require('./../../img/exercise.png')} />
      <Modal.Description image>
        <Form>
          <Form.Group>
          <Form.Input  label='Workout Name' onChange={(evt1) => { console.log(evt1.target.value); }} placeholder='Upper Body Workout' />
          <Form.Select  onChange={() => { console.log("teamname"); }} label='Assign to' options={teams} placeholder='Block' />
          </Form.Group>
         </Form>
          
      </Modal.Description>
    </Modal.Content>


      <Modal.Content image>
      <Form image>
      <Form.Group>
        {/* FIX THE BLOCKVALUE TO GET SELECTED VALUE OF DROPDOWN MENU */}
        <Form.Select  onChange={() => { console.log("blockvalue"); }} label='Block' options={options} placeholder='Block' />
        <Form.Input  onChange={(evt) => { console.log(evt.target.value); }} label='Exercise Name' placeholder='Push Ups' />
        <Form.Input  onChange={(evt) => { console.log(evt.target.value); }}label='Reps' placeholder='8x3' />
       <Form.Input  onChange={(evt) => { console.log(evt.target.value); }}label='Weight (lb)' placeholder='45' />
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
              content="Confirm"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalExampleDimmer