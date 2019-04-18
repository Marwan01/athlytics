import React from 'react'
import { Image, List } from 'semantic-ui-react'

const ListDivided = () => (
<div>
  <List divided verticalAlign='middle'>
    <List.Item>
      <List.Content>
        <List.Header as='a'> Lorem ipsum A </List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header as='a'> Lorem ipsum B </List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header as='a'> Lorem ipsum C </List.Header>
      </List.Content>
    </List.Item>
  </List>
</div>
)
	
export default ListDivided