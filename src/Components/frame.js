import React from "react"
import '../css/style.css'
import avatar from '../img/avatarPlaceholder.jpg'
import {Link} from 'react-router-dom';
import styled from "styled-components";

const FrameContainer = styled.div`
    position: relative;
    top: 90px;
    margin-left: 64px;
    margin-top: 15px;
    margin-bottom: 47px;
    border: 3px solid black;
    border-radius: 11px;
    width: 284px;
    height: 481px;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease;
`;

const Avatar = styled.img`
    border-radius: 100%;
    position: absolute;
    width: 153px;
    height: 153px;
    right: 65px;
    top: 22px;
`;

const UserName = styled.p`
    font-size: 17.5px;
    font-weight: 400;
    text-align: center;
`;

const FirstUl = styled.ul`
    margin-top: 180px;
    margin-bottom: 13px;
    font-size: 24px;
    text-align: center;
`;

const Direction = styled.li`
    margin-top: 8px;
    font-size: 15px;
    text-align: center;
    font-weight: 300;
    color: #6C6C6C;
`;

const Search = styled.li`
    text-align: center;
    margin-top: 8px;
`;

const InSearch = styled.span`
    font-size: 15px;
    font-weight: 300;
    color: #568c35;
`;

const NotInSearch = styled.span`
    font-size: 15px;
    font-weight: 300;
    color: red;
`;

const Naming = styled.div`
    font-size: 15px;
    margin-left: 22px;
`;

const Description = styled.div`
    text-align: right;
    font-size: 15px;
    margin-right: 22px;
    font-weight: 300;
`;

const TwoElementsContainer = styled.div`
    margin-bottom: 11px;
    height: 35px;
    display: flex;
    justify-content: space-between;
`;

class Frame extends React.Component {
    render() {
        const {frame} = this.props;
        return (
            <Link to="/otherManProfile" onClick={() => this.props.updateUserId(frame.id)}>
                <FrameContainer>
                    <Avatar src={avatar} width={210} height={210}/>
                    <FirstUl>
                        <UserName>{frame.lastName} {frame.firstName}</UserName>
                        <Direction>{frame.profession}</Direction>
                        <Search>{frame.teamSearchState ?
                            <InSearch>В поисках команды</InSearch>
                            : <NotInSearch>Не ищет команду</NotInSearch>}
                        </Search>
                    </FirstUl>
                    <TwoElementsContainer>
                        <Naming>Институт</Naming>
                        <Description>{frame.institute}</Description>
                    </TwoElementsContainer>


                    <TwoElementsContainer>
                        <Naming>Направление</Naming>
                        <Description>{frame.studyDirection}</Description>
                    </TwoElementsContainer>

                    <TwoElementsContainer>
                        <Naming>Курс</Naming>
                        <Description>{frame.course}</Description>
                    </TwoElementsContainer>

                    <TwoElementsContainer>
                        <Naming>Уровень</Naming>
                        <Description>{frame.skillLevel}</Description>
                    </TwoElementsContainer>

                </FrameContainer>
            </Link>
        )
    }
}

export default Frame
