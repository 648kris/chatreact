import React, { Component } from 'react';
import '../style.css';
import './landing.css';
import Buttons from './Buttons'

class Landing extends Component {
  render(){
    return(
      <div class="gradientBackground">
        <h1 class="landingTitle">Welcome to My Chat App</h1>
        <Buttons />
      </div>
    )
  }
}
export default Landing
