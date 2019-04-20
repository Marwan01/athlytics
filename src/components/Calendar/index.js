import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withAuthorization, withEmailVerification, AuthUserContext } from '../Session';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import events from './events'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Header,
  Button
} from 'semantic-ui-react';

//fmkdfjklnglekdjmlefg.agnrfjr


class Calendar extends React.Component {
  constructor(...props) {
    super(...props)

    this.state = { events }
  }
  componentDidMount() {
    console.log(events[0])
    this.ciao()
  }
  ciao = () => {
    let token = JSON.parse(localStorage.getItem('authUser'))
    this.props.firebase.user(token.uid)
      .once('value')
      .then(snapshot => {
        const dbUser = snapshot.val();
        let w = dbUser.workouts
        if (w) {
          var newArrayDataOfOjbect = Object.values(w)
          console.log(newArrayDataOfOjbect)
          newArrayDataOfOjbect.forEach(function (element) {
            element.end = new Date(element.end)
            element.start = new Date(element.start)

          });
          console.log(newArrayDataOfOjbect)

          // console.log(myData)

          this.setState({ events: newArrayDataOfOjbect })
        }


      });

  }

  addWorkout = (uid) => {
    console.log("called")
    let workout = {
      title: 'ALLWOMEN',
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
    console.log(workout)
    this.props.firebase.user_workout(uid, ui).set(workout)
    this.ciao()
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  render() {
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div style={{ height: '750px' }}>
            <Header as="h2">Account: {authUser.email}</Header>
            <BigCalendar
              selectable
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              events={this.state.events}
              defaultView={BigCalendar.Views.WEEK}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date(2019, 3, 20)}
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={this.handleSelect}
            />
            <Button
              onClick={() => this.addWorkout(authUser.uid)}>
              click
        </Button>
          </div>
        )}
      </AuthUserContext.Consumer>

    )
  }
}


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.




const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Calendar);
