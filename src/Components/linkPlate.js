import React, { Component } from 'react'
import styled from 'styled-components';
import avatar from '../img/avatarPlaceholder.jpg';

const StyledPlate = styled.div`
    width: 200px;
    height: 200px;
    border: 3px solid black;
`;

export default class linkPlate extends Component {
  render() {
    return (
        <a href={this.props.linkPlate.project_link} target="_blank">
            <StyledPlate>
                <img src={avatar} alt="Лого проекта" />
                <p>{this.props.linkPlate.name}</p>
                <p>{this.props.linkPlate.type}</p>
                <p>{this.props.linkPlate.description}</p>
            </StyledPlate>
        </a>
    )
  }
}
