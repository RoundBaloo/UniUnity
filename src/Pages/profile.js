import React, { Component } from "react";
import Registration from "../Components/registration";
import Signin from "../Components/signin"
import styled from "styled-components";
import axios from 'axios';
import { getToken } from '../tokenService';
import ProfilePlate from "../Components/profilePlate";
import ProfilePlateEditor from "../Components/profilePlateEditor";
import LinkPlates from "../Components/linkPlates";
import avatar from '../img/Avatars/Avatar-1.svg'

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

const StyledBut = styled.button`
  width: 100px;
  height: 50px;
  position: absolute;
  top: 110px;
  right: 10px;
  border: 3px solid black;
  border-radius: 11px;
  z-index: 10;
`;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      frame: this.props.frames[0],
      userId: this.props.userId,
      avatar: avatar,
    };

    this.makeEditing = this.makeEditing.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
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
    axios.get('http://127.0.0.1:5000/get_user_with_projects', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    this.setState({
      userId: response.data.user.id,
      frame: this.props.frames[response.data.user.id - 1],
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  }

  handleAvatar = (selectedAvatar) => {
    this.setState({avatar: selectedAvatar})
  }

  render () { 
    return (
      <StyledDiv>
        {this.props.onLoggedIn
          ? (
            <>
              <StyledBut type='button' onClick={() => {this.props.makeNotLoggedIn()}}>
                выйти
              </StyledBut>
              <StyledFormContainer>
                {!this.state.isEditing 
                  ? <ProfilePlate thisFrame={this.props.thisFrame} 
                  makeEditing={this.makeEditing} userId={this.state.userId}
                  avatar={this.state.avatar}/>
                  : <ProfilePlateEditor thisFrame={this.props.thisFrame} makeEditing={this.makeEditing} 
                  onUpdateUsers={this.props.onUpdateUsers} userId={this.state.userId}
                  handleAvatar={this.handleAvatar}
                  avatar={this.state.avatar} onUpdateThisFrame={this.props.onUpdateThisFrame}/>}
              </StyledFormContainer>
              <StyledProjectsContainer>
                <LinkPlates linkPlates={this.props.linkPlates}/>
              </StyledProjectsContainer>
            </>
          )
          : (this.props.onRegistarion 
            ? (<Registration onLogIn={this.props.onLogIn} onUpdateThisFrame={this.props.onUpdateThisFrame} 
              onUpdateUsers={this.props.onUpdateUsers}
              onAdd={this.props.onAdd} updateToken={this.props.updateToken} 
              frames={this.props.frames} setFrames={this.props.setFrames}
              getUserProjects={this.props.getUserProjects} currentPage={this.props.currentPage}/>) 
            : (<Signin onMakeRegistration={this.props.onMakeRegistration} onRegistarion={this.props.onRegistarion} 
                onLogIn={this.props.onLogIn} onUpdateThisFrame={this.props.onUpdateThisFrame}
                getUserProjects={this.props.getUserProjects}/>))}
      </StyledDiv>
    )
  }
}
