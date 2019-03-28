import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';

import './index.css';
 
export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, key: props.id }
  }
  render()
  {
	  return(
	  <div>
	  <Calendar/>
	  </div>
	  );
  }
}

