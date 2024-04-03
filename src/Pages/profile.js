import React, { Component } from "react";
import Form from '../Components/form'
import Registration from "../Components/registration";

export default class Profile extends Component {
  render () {
    return (
      <div>
        <p>Hello Profile!</p>
        <div>
          <Form onAdd={this.props.onAdd}/>
          <Registration onLogIn={this.props.onLogIn}/>
        </div>
      </div>
    )
  }
}
