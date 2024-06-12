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

    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: none;
    min-height: 300px;
    padding: 0;
`;

const DescriptionName = styled.p`
    margin-top: 150px;
    margin-left: 22px;
`;

const Description = styled.p`
    margin-top: 11px;
    margin-left: 22px;
    margin-bottom: 30px;
    font-size: 18px;
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

const ButtonsContainer = styled.div`
    border-bottom-right-radius: 11px;
    border-bottom-left-radius: 11px;
    display: flex;
    width: 440px;
`;

const StyledButton = styled.button`
    background-color: white;
    color: black;
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 60px;
    padding-left: 22px;
    padding-right: 10px;
    border: 3px solid black;

    // border-bottom-left-radius: 11px;
    // border-bottom-right-radius: 11px;

    &:hover {
        cursor: pointer;
        color: white;
        background-color: black;
    }
`;

const StyledA = styled.a`
    color: ;
    display: inline-bock;
    font-size: 23px;
    margin: 50px auto 0px 21px;
    text-decoration: underline;
`;

export default class projectPage extends Component {
    render() {
        if (!this.props.thisProject) {
            return <div>Loading...</div>;
        }
        return (
            <>

                <FlexContainer>
                    <ImagesContainer>  {/*  это под картинки и название  */}
                        <ProjectName>
                            {this.props.thisProject.name}
                        </ProjectName>
                        <img src={Stub}
                             alt='Фото проекта'></img> {/*  тут потом сделаю так, чтобы оно все фотки выводило, Рома еще не намутил мутку  */}
                    </ImagesContainer>
                    <div>
                        <DescrContainer>  {/*  это под описание и профиль  */}
                            <Link to='/profile'>
                                <div style={{zIndex: '1'}}> {/*  этот контейнер перебрасывает в профиль  */}
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
                            </Link>
                            <DescriptionName>Описание работы</DescriptionName>
                            <Description>{this.props.thisProject.description}</Description>
                            <StyledA href={this.props.thisProject.project_link} target="_blank" rel="noopener noreferrer">Ссылка на проект</StyledA>
                        </DescrContainer>
                        <ButtonsContainer>
                            <Link to='/profileEditor'>
                                <StyledButton  style={{borderBottomLeftRadius: '11px', borderRight: '10px', paddingLeft:'0px'}}>Редактировать проект</StyledButton>
                            </Link>
                            <Link to='/profile'>
                                <StyledButton  style={{borderBottomRightRadius: '11px', width:'220px'}} onClick={
                                    (e) => {
                                        axios.delete(`http://127.0.0.1:5000/delete_project/${this.props.currentProjectId}`)
                                            .then(res => {
                                                this.props.getUserProjects(this.props.selfId);
                                            })
                                    }
                                }>Удалить проект
                                </StyledButton>
                            </Link>
                        </ButtonsContainer>
                    </div>

                </FlexContainer>

            </>
        )
    }
}
