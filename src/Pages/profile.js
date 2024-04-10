import React, { Component } from "react";
import Form from '../Components/form'
import Registration from "../Components/registration";

export default class Profile extends Component {
  
  render () {
    return (
      <div>
        <p>Hello Profile!</p>
        <div>
          {this.props.onLoggedIn ? ("yes") : ("no")}
          {this.props.onLoggedIn
            ? (<Form onAdd={this.props.onAdd} onFill={this.props.onFill} onFilled={this.props.onFilled} onAdd1={this.props.onAdd1}/>)
            : (<Registration onLogIn={this.props.onLogIn}/>)}

        </div>
      </div>
    )
  }
}
