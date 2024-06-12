import React, {Component} from 'react';
import Stub from '../img/projectZaglushka.jpg';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from "styled-components";

const ImagesContainer = styled.div`
    position: relative;
    width: 760px;
`;

const DescrContainer = styled.div`
    position: relative;
    width: 440px;
    border: 3px solid black;
    border-radius: 11px;
    min-height: 300px;
    height: 100%;
`;

const DescriptionName = styled.p`
    margin-top: 150px;
    margin-left: 22px;
`;

const Description = styled.p`
    margin-top: 11px;
    margin-left: 22px;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 65px;
    margin-right: 65px;
    margin-top: 65px;
`;

const ProjectName = styled.div`
    font-size: 30px;
    margin-bottom: 20px;
`;

const AvatarContainer = styled.div`
    border-radius: 100%;
    position: absolute;
    top: 21px;
    left: 21px;
    width: 110px;
    height: 110px;
    border: 3px solid black;
    overflow: hidden;
`;

const Avatar = styled.img`
    position: absolute;
`;

const StyledMainInfoContainer = styled.div`
    position: absolute;
    text-align: left;
    top: 34px;
    width: 80%;
    left: 153px;
    right: 0;
`;

const UserName = styled.p`
    font-size: 24px;
    font-weight: 400;
    text-align: left;
`;

const Direction = styled.li`
    margin-top: 8px;
    font-size: 15px;
    text-align: left;
    font-weight: 300;
    color: #6C6C6C;
`;

const Search = styled.li`
    text-align: left;
    margin-top: 8px;
`;

const InSearch = styled.span`
    font-size: 18px;
    font-weight: 300;
    color: #568c35;
`;

const NotInSearch = styled.span`
    font-size: 18px;
    font-weight: 300;
    color: red;
`;

export default class projectPage extends Component {
    render() {
        if (!this.props.thisProject) {
            return <div>Loading...</div>;
        }
        return (
            <>
                <Link to='/profile'>
                    <button type='button' onClick={
                        (e) => {
                            axios.delete(`http://127.0.0.1:5000/delete_project/${this.props.currentProjectId}`)
                            .then(res => {
                                this.props.getUserProjects(this.props.selfId);
                            })
                        }
                    }>удалить проект
                    </button>
                </Link>
                <Link to='/profileEditor'>
                    <button type='button'>редактировать проект</button>
                </Link>
                <FlexContainer>
                    <ImagesContainer>  {/*  это под картинки и название  */}
                        <ProjectName>
                            {this.props.thisProject.name}
                        </ProjectName>
                        <img src={Stub}
                             alt='Фото проекта'></img> {/*  тут потом сделаю так, чтобы оно все фотки выводило, Рома еще не намутил мутку  */}
                    </ImagesContainer>
                    <DescrContainer>  {/*  это под описание и профиль  */}
                        <div> {/*  этот контейнер перебрасывает в профиль  */}
                            <AvatarContainer>
                                <Avatar src={this.props.avatar}/>
                            </AvatarContainer>
                            <StyledMainInfoContainer>
                                <UserName>{this.props.thisFrame.lastName} {this.props.thisFrame.firstName}</UserName>
                                <ul>
                                    <Direction>{this.props.thisFrame.profession}</Direction>
                                    <Search>{this.props.thisFrame.teamSearchState ?
                                        <InSearch>В поисках команды</InSearch>
                                        : <NotInSearch>Не ищет команду</NotInSearch>}
                                    </Search>
                                </ul>
                            </StyledMainInfoContainer>
                        </div>

                        {/*<div className>   этот контейнер перебрасывает в профиль
                            <img src={this.props.avatar} alt></img>
                            <p>{this.props.thisFrame.lastName} {this.props.thisFrame.firstName}</p>
                            <p>{this.props.thisFrame.profession}</p>
                            <p>{this.props.thisFrame.teamSearchState
                                ? <p>В поисках команды</p>
                                : <p>Не ищет команду</p>}
                            </p>
                        </div>p*/}
                        <DescriptionName>Описание работы</DescriptionName>
                        <Description>{this.props.thisProject.description}</Description>
                    </DescrContainer>
                </FlexContainer>

            </>
        )
    }
}
