import React, { Component } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const StyledPlate = styled.div`
    width: 174px;
    height: 174px;
    margin-top: 64px;
    margin-right: 13px;
`;

const StyledImg = styled.img`
    border-radius: 7px;
    width: 174px;
    height: 174px;
    border: 3px solid black;
`;

const StyledP = styled.p`
    text-align: center;
    font-size: 22px;
`;

export default class linkPlate extends Component {
  render() {
    return (
        <Link to={this.props.isOwner ? "/projectPage" : "/otherUserProjectPage"}>
            <StyledPlate onClick={() => {this.props.updateCurrentProjectId(this.props.linkPlate.id)}}>
              <StyledImg src={require(`../projectImages/${this.props.linkPlate.id}.png`)} alt="Лого проекта"/>
                <StyledP>{this.props.linkPlate.name}</StyledP>
            </StyledPlate>
        </Link>
    )
  }
}
