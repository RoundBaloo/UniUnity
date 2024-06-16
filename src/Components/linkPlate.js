import React, { Component } from 'react'
import styled from 'styled-components';
import project from '../img/FolderIcon.svg';
import projectHover from '../img/FolderIconActive.svg';
import {Link} from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const StyledP = styled.p`
    text-align: center;
    font-size: 22px;
`;

const loadImage = (imageUrl) => {
    return (
      <LazyLoad>
        <StyledImg src={import(imageUrl)} alt="Лого проекта"/>
      </LazyLoad>
    );
  };

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
