import React, { Component } from "react";
import styled from "styled-components";
import OtherManProfilePlate from "../Components/otherManProfilePlate";
import LinkPlates from "../Components/linkPlates";

const StyledFormContainer = styled.div`
  width: 30%;
  left: 0px;
  position: sticky;
  top: 0px;
  padding: 0px;
`;

const StyledProjectsContainer = styled.div`
    width: 63%;
    position: absolute;
    right: 0;
    top: 180px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 40px;

`;

const PortfolioP = styled.p`
  width: 63%;
  position: absolute;
  right: 0px;
  top: 175px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 30px;
`;

export default class otherManProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: this.props.frames[0],
      userId: this.props.userId,
    };
  }

  updateFrames(data) {
    this.setState(prevState => ({
      frames: data,
    }))
  }

  render () { 
    return (
        <>
            <StyledFormContainer>
                <OtherManProfilePlate thisFrame={this.props.thisFrame} frames={this.props.frames}
                                      userId={this.state.userId}/>
            </StyledFormContainer>
            <div>
                <PortfolioP>Портфолио</PortfolioP>
                <StyledProjectsContainer>
                    <LinkPlates linkPlates={this.props.linkPlates}
                                updateCurrentProjectId={this.props.updateCurrentProjectId}
                                isOwner={false}/>
                </StyledProjectsContainer>
            </div>
        </>
    )
  }
}
