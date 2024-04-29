import React, { Component } from 'react';
import styled from "styled-components";
import avatar from '../img/avatarPlaceholder.jpg';
import jaba from '../img/jabaTest.jpg'


const StyledAvatarContainer = styled.div`
    margin-left: 20px;
    width: 100%;
    height: 130px;
    border: 3px solid black;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    padding: 10px;
    gap: 10px;
`;

const StyledImg = styled.img` 
  top: 10px;
  left: 10px;
  width: 95px;
  height: 95px;
  cursor: pointer;
`;

export default class avatarSelect extends Component {
  render() {
    return (
        <StyledAvatarContainer>
            <StyledImg src={avatar} onClick={() => this.props.handleImageSelect(avatar)} />
            <StyledImg src={jaba} onClick={() => this.props.handleImageSelect(jaba)} />
            <StyledImg src={avatar} onClick={() => this.props.handleImageSelect(avatar)} />
            <StyledImg src={avatar} onClick={() => this.props.handleImageSelect(avatar)} />
            <StyledImg src={avatar} onClick={() => this.props.handleImageSelect(avatar)} />
        </StyledAvatarContainer>
    )
  }
}
