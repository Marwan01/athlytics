import React, { Component } from 'react'
import { Table, Divider, Image } from 'semantic-ui-react'
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification,AuthUserContext } from '../Session';



class Workouts extends Component {
  render() {
    return (
    <div>
      <TableExampleInverted />
      <TableExampleInverted />
    </div>
    );
  }
}
const TableExampleInverted = () => (
  <div>
<Divider horizontal>Workout 1</Divider>

<Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell><Image src={require('./../../img/exercise.png')} rounded size='mini' /></Table.HeaderCell>
      <Table.HeaderCell>Exercise</Table.HeaderCell>
      <Table.HeaderCell>Repetition</Table.HeaderCell>
      <Table.HeaderCell>Weight (lb)</Table.HeaderCell>

      
    </Table.Row>
  </Table.Header>

  <Table.Body>
    <Table.Row>
    <Table.Cell>1</Table.Cell>
      <Table.Cell>Push ups</Table.Cell>
      <Table.Cell>25</Table.Cell>
      <Table.Cell>None</Table.Cell>
    </Table.Row>
    {/* <Table.Row>
      <Table.Cell>Jamie</Table.Cell>
      <Table.Cell>Approved</Table.Cell>
      <Table.Cell>Requires call</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Jill</Table.Cell>
      <Table.Cell>Denied</Table.Cell>
      <Table.Cell>None</Table.Cell>
    </Table.Row> */}
  </Table.Body>

</Table>

  </div>
  
)

const condition = authUser =>
  authUser;


export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Workouts);
