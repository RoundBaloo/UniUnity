import React, { Component } from 'react'
import styled from 'styled-components';
import project from '../img/projectZaglushka.jpg';
import {Link} from 'react-router-dom';

const StyledPlate = styled.div`
    width: 254px;
    height: 254px;
    margin-top: 64px;
    margin-right: 13px;
`;

const StyledImg = styled.img`
    border-radius: 7px;
    width: 100%;
    height: 100%;
`;

const StyledP = styled.p`
    position: absolute;
`;

export default class linkPlate extends Component {
  render() {
    return (
        <Link to="/projectPage">
            <StyledPlate onClick={() => {this.props.updateCurrentProjectId(this.props.linkPlate.id)}}>
                <StyledImg src={project} alt="Лого проекта" />
                <StyledP>{this.props.linkPlate.name}</StyledP>
            </StyledPlate>
        </Link>
        
    )
  }
}
