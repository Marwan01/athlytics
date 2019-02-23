// Import React
import React, { Component } from 'react';
import Home from './Home';
import Welcome from './Welcome'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class App extends Component {

constructor() {
  super();
  this.state = {
    user: null
  };
}

  render() {
    return ( 
      <div>
        <Home user={this.state.user}/>
        {this.state.user &&
            <Welcome user={this.state.user}/>
        }



      </div>
      );
  }
}

export default App;
