import React, { Component } from "react";
import Form from '../Components/form'
import Registration from "../Components/registration";
import Signin from "../Components/signin"
import styled from "styled-components";
import axios from 'axios';
import { getToken } from '../tokenService';
import ProfilePlate from "../Components/profilePlate";
import ProfilePlateEditor from "../Components/profilePlateEditor";
import LinkPlates from "../Components/linkPlates";
import userEvent from "@testing-library/user-event";

const StyledFormContainer = styled.div`
  width: 30%;
  left: 0px;
  position: sticky;
  top: 0px;
  padding: 0px;
`;

const StyledProjectsContainer = styled.div`
  width: 60%;
  position: absolute;
  right: 0px;
  top: 120px;
  margin: 5px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 100px;
`;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      frame: this.props.frames[0],
      userId: this.props.userId,
      frames: [],
    };

    this.makeEditing = this.makeEditing.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.updateFrames = this.updateFrames.bind(this);
  }

  updateFrames(data) {
    this.setState(prevState => ({
      frames: data,
    }))
  }
  
  componentDidMount() {
    this.updateToken();
  }

  makeEditing() {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  }

  updateToken = () => {
    var token = getToken();
    axios.get('http://127.0.0.1:5000/get_user_id', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    this.setState({
      userId: response.data.user_id,
      frame: this.props.frames[response.data.user_id - 1],
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  }

  render () { 
    return (
      <StyledDiv>
        {this.props.onLoggedIn
          ? (
            <>
              <StyledFormContainer>
                {!this.state.isEditing 
                  ? <ProfilePlate thisFrame={this.props.thisFrame} frames={this.props.frames} makeEditing={this.makeEditing} userId={this.state.userId}/>
                  : <ProfilePlateEditor thisFrame={this.props.thisFrame} makeEditing={this.makeEditing} onUpdateUsers={this.props.onUpdateUsers} userId={this.state.userId}/>}
              </StyledFormContainer>
              <StyledProjectsContainer>
                <LinkPlates linkPlates={this.props.linkPlates}/>
              </StyledProjectsContainer>
            </>
          )
          : (this.props.onRegistarion 
            ? (<Registration onLogIn={this.props.onLogIn} onUpdateThisFrame={this.props.onUpdateThisFrame} 
              onUpdateUsers={this.props.onUpdateUsers} updateFrames={this.updateFrames}
              onAdd={this.props.onAdd} updateToken={this.props.updateToken} 
              frames={this.props.frames} setFrames={this.props.setFrames}
              getUserProjects={this.props.getUserProjects}/>) 
            : (<Signin onMakeRegistration={this.props.onMakeRegistration} onRegistarion={this.props.onRegistarion} 
                onLogIn={this.props.onLogIn} onUpdateThisFrame={this.props.onUpdateThisFrame}
                getUserProjects={this.props.getUserProjects}/>))}
      </StyledDiv>
    )
  }
}
