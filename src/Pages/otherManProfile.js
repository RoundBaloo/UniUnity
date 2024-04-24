import React, { Component } from "react";
import Form from '../Components/form'
import Registration from "../Components/registration";
import Signin from "../Components/signin"
import styled from "styled-components";
import axios from 'axios';
import { getToken } from '../tokenService';
import OtherManProfilePlate from "../Components/otherManProfilePlate";
import ProfilePlateEditor from "../Components/profilePlateEditor";
import userEvent from "@testing-library/user-event";

const StyledFormContainer = styled.div`
  width: 30%;
  left: 0px;
  position: sticky;
  top: 0px;
  padding: 0px;
`;

export default class otherManProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: this.props.frames[0],
      userId: this.props.userId,
    };

    this.updateToken = this.updateToken.bind(this);
  }

  updateFrames(data) {
    this.setState(prevState => ({
      frames: data,
    }))
  }
  
  componentDidMount() {
    this.updateToken();
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
        <>
            <StyledFormContainer> 
                <OtherManProfilePlate thisFrame={this.props.thisFrame} frames={this.props.frames} userId={this.state.userId}/>
            </StyledFormContainer>
        </>
    )
  }
}
