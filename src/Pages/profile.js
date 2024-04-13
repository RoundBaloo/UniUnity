import React, { Component } from "react";
import Form from '../Components/form'
import Registration from "../Components/registration";
import Signin from "../Components/signin"

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }


  render () {
    return (
      <div>
        <div>
          {this.props.onLoggedIn
            ? (<Form onAdd={this.props.onAdd} onFill={this.props.onFill} 
              onFilled={this.props.onFilled} onAdd1={this.props.onAdd1}
              frames={this.props.frames}/>)
            : (this.props.onRegistarion 
              ? (<Registration onLogIn={this.props.onLogIn}/>) 
              : (<Signin onMakeRegistration={this.props.onMakeRegistration} onRegistarion={this.props.onRegistarion} 
                  onLogIn={this.props.onLogIn}/>))}
        </div>
      </div>
    )
  }
}
