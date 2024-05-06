import React, { Component } from 'react';
import styled from "styled-components";
import avatar from '../img/avatarPlaceholder.jpg';
import jaba from '../img/jabaTest.jpg';
import avatar1 from '../img/Avatars/Avatar-1.svg';
import avatar2 from '../img/Avatars/Avatar-2.svg';
import avatar3 from '../img/Avatars/Avatar-3.svg';
import avatar4 from '../img/Avatars/Avatar-4.svg';
import avatar5 from '../img/Avatars/Avatar-5.svg';
import avatar6 from '../img/Avatars/Avatar-6.svg';
import avatar7 from '../img/Avatars/Avatar-7.svg';
import avatar8 from '../img/Avatars/Avatar-8.svg';
import avatar9 from '../img/Avatars/Avatar-9.svg';
import avatar10 from '../img/Avatars/Avatar-10.svg';

const StyledAvatarContainer = styled.div`
    margin-left: 20px;
    margin-top: 20px;
    width: 100%;
    height: 100px;
    border: 3px solid black;
    border-radius: 11px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    gap: 10px;
`;

const StyledImg = styled.img` 
  width: 95px;
  height: 95px;
  cursor: pointer;
`;

export default class avatarSelect extends Component {
  render() {
    return (
        <StyledAvatarContainer>
            <StyledImg src={avatar1} onClick={() => this.props.handleImageSelect(avatar1)} />
            <StyledImg src={avatar2} onClick={() => this.props.handleImageSelect(avatar2)} />
            <StyledImg src={avatar3} onClick={() => this.props.handleImageSelect(avatar3)} />
            <StyledImg src={avatar4} onClick={() => this.props.handleImageSelect(avatar4)} />
            <StyledImg src={avatar5} onClick={() => this.props.handleImageSelect(avatar5)} />
            <StyledImg src={avatar6} onClick={() => this.props.handleImageSelect(avatar6)} />
            <StyledImg src={avatar7} onClick={() => this.props.handleImageSelect(avatar7)} />
            <StyledImg src={avatar8} onClick={() => this.props.handleImageSelect(avatar8)} />
            <StyledImg src={avatar9} onClick={() => this.props.handleImageSelect(avatar9)} />
            <StyledImg src={avatar10} onClick={() => this.props.handleImageSelect(avatar10)} />
        </StyledAvatarContainer>
    )
  }
}
