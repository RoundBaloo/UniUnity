import React, {Component} from 'react'
import styled from 'styled-components';
import avatar from '../img/avatarPlaceholder.jpg';
import axios from 'axios';
import {getToken} from '../tokenService';
import {Link} from 'react-router-dom';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 438px;
    height: 700px;
    margin-top: 65px;
    margin-left: 65px;
`;

const StyledForm = styled.form`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Расстояние между элементами формы */
    border: 3px solid black;
    padding: 20px;
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
    width: 100%; /* Ширина формы */
    height: 100%;
    box-sizing: border-box;
    justify-content: flex-end;
`;


const StyledImg = styled.img`
    top: 21px;
    left: 21px;
    width: 110px;
    height: 110px;
`;

const StyledMainInfoContainer = styled.div`
    position: absolute;
    text-align: left;
    top: 34px;
    width: 80%;
    left: 153px;
    right: 0;
`;

const StyledOtherInfoContainer = styled.div`
    position: absolute;
    top: 150px;
    padding-right: 44px;
    padding-left: 22px;
`;

const StyledP = styled.p`
    width: 95%;
    text-align: left;
    white-space: normal;
    font-size: 18px;
    margin-bottom: 11px;
`;

const StyledButton = styled.button`
    background-color: white;
    color: black;
    border: 3px solid black; // Убираем стандартные границы
    border-top: none;
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 67px;
    // border-bottom-left-radius: 11px;
    // border-bottom-right-radius: 11px;

    &:hover {
        cursor: pointer;
        color: white;
        background-color: black;
    }
`;

const StyledButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center; // Выравнивание элементов по центру по вертикали
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



var token;
var userId;

// axios.get('http://127.0.0.1:5000/get_user_id', {
//   headers: {
//       'Authorization': `Bearer ${token}`
//   }
// })
// .then(response => {
//   console.log(response.data.user_id);
//   userId = response.data.user_id;
// })
// .catch(error => {
//   console.error('Error:', error);
// });


export default class profilePlate extends Component {
    render() {
        const frame = this.props.thisFrame;
        if (!frame) {
            console.log(frame)
            return <div>Loading...</div>;
        }
        return (
            <StyledContainer>
                <StyledForm>
                    <StyledImg className="Avatar" src={avatar} width={90}/>
                    <StyledMainInfoContainer>
                        <UserName>{frame.lastName} {frame.firstName}</UserName>
                        <ul>
                            <Direction>{frame.profession}</Direction>
                            <Search>{frame.teamSearchState ?
                                <InSearch>В поисках команды</InSearch>
                                : <NotInSearch>Не ищет команду</NotInSearch>}
                            </Search>
                        </ul>
                    </StyledMainInfoContainer>
                    <StyledOtherInfoContainer>
                        <StyledP className="description">{frame.institute}</StyledP>
                        <StyledP>{frame.studyDirection}</StyledP>
                        <StyledP className="description">{frame.course}</StyledP>
                        <StyledP className="description">{frame.skillLevel}</StyledP>
                        <StyledP className="description">Цель поиска: {frame.searchAim}</StyledP>
                        <StyledP>О себе</StyledP>
                        <StyledP>{frame.about}</StyledP>
                        <StyledP>Что хочу от команды</StyledP>
                        <StyledP>Хочу быть частью динамичной и технологичной продвинутой команды для создания
                            действительно проработанной визуальной новеллы.</StyledP>
                        <StyledP>{frame.TG_link}</StyledP>
                        <StyledP>{frame.VK_link}</StyledP>
                        <StyledP>{frame.mail}</StyledP>
                    </StyledOtherInfoContainer>
                </StyledForm>
                <StyledButtonContainer>
                    <StyledButton style={{borderBottomLeftRadius: '11px', borderRight: '1px', textAlign:'left', paddingLeft:'21px'}}
                                  onClick={this.props.makeEditing}>Редактировать профиль</StyledButton>
                    <Link to='/uploadProject' style={{width: '218px'}}>
                        <StyledButton style={{borderBottomRightRadius: '11px', width: '218px', textAlign:'left', paddingLeft:'21px'}}>Добавить проект</StyledButton>
                    </Link>
                </StyledButtonContainer>
            </StyledContainer>
        )
    }
}
