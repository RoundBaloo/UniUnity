import React, { Component } from 'react'
import styled from 'styled-components';
import project from '../img/FolderIcon.svg';
import projectHover from '../img/FolderIconActive.svg';
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
`;

const StyledP = styled.p`
    text-align: center;
    font-size: 22px;
`;

export default class linkPlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    };

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    };

  render() {
      const { isHovered } = this.state;
    return (
        <Link to={this.props.isOwner ? "/projectPage" : "/otherUserProjectPage"}>
            <StyledPlate onClick={() => {this.props.updateCurrentProjectId(this.props.linkPlate.id)}}>
                <StyledImg
                    src={isHovered ? projectHover : project}
                    alt="Лого проекта"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                />
                <StyledP>{this.props.linkPlate.name}</StyledP>
            </StyledPlate>
        </Link>
        
    )
  }
}
