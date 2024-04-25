import React, { Component } from 'react'
import styled from 'styled-components';

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
                <p>Ваш проект</p>
            </StyledPlate>
        </a>
    )
  }
}
