import React, { Component } from "react";
import Form from '../Components/form'
import Registration from "../Components/registration";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.onLoggedIn,
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister = () => {
    this.setState({isLoggedIn: true})
  }

  render () {
    return (
      <div>
        <div>
          {this.state.isLoggedIn
            ? (<Form onAdd={this.props.onAdd} onFill={this.props.onFill} onFilled={this.props.onFilled} onAdd1={this.props.onAdd1}/>)
            : (<Registration onLogIn={this.props.onLogIn} onHandleRegister={this.handleRegister}/>)}
        </div>
      </div>
    )
  }
}
