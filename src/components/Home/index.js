import PropTypes from 'prop-types'
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';


import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Athlytics'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    
    
    <Header
      as='h4'
      content='Lindenwood University'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <p>Click Get Started to sign up, or sign in if you have an existing account.</p>
    <Link to={ROUTES.SIGN_UP}><Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
    </Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
         <Image src={require('./ll.jpg')} rounded size='medium'/>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
            color = 'teal'
            
          >
          <HomepageHeading />
          </Segment>
         
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We help coaches and athletes:
            </Header>
            <p style={{ fontSize: '1.33em' }}>
               Athlytics is working for coaches and athletes to save time.</p>
               <p style={{ fontSize: '1.33em' }}>
               Athlytics is easy to use.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              The purpose:
            </Header>
            <p style={{ fontSize: '1.33em' }}>
            Athlytics is helping the coach to train and schedule student-athletes in a more effective way.</p>
            <p style={{ fontSize: '1.33em' }}>
            Athlytics provides services for coaches to easily add and edit workout-sheets for student-athletes.</p>
            <p style={{ fontSize: '1.33em' }}>
            Athlytics provides a well detailed calendar ready and easy to use.
            </p>
            
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
          <Image src={require('./logoNobackground.png')} rounded size='medium'/>
          </Grid.Column>
        </Grid.Row>
       
      </Grid>
    </Segment>
   
    
    <Segment 
    inverted 
    vertical 
    style={{ padding: '5em 0em' }}
    color = 'teal'
    textAlign='center'
    >
           
      <Container>
        
            <Grid.Column width={7}>
            <Link to={ROUTES.SIGN_UP}><Button primary size='huge'>
      SIGN UP
      <Icon name='right arrow' />
    </Button>
    </Link>
            </Grid.Column>
         
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default HomepageLayout
