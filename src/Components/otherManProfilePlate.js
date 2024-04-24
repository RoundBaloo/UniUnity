import React, { Component } from 'react'
import styled from 'styled-components';
import avatar from '../img/avatarPlaceholder.jpg';
import axios from 'axios';
import { getToken } from '../tokenService';

const StyledContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
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
    border-radius: 11px;
    width: 100%; /* Ширина формы */
    height: 800px;
    box-sizing: border-box;
    justify-content: flex-end;
    margin: 20px 0px 0px 20px;
`; 

const StyledImg = styled.img` 
  top: 10px;
  left: 10px;
  width: 100px;
  height: 100px;
`;

const StyledMainInfoContainer = styled.div`
position: absolute;  
top: 20px;
width: 80%;
right: 0px;
`;

const StyledOtherInfoContainer = styled.div`
position: absolute;  
top: 110px;
width: 100%;
`;

const StyledP = styled.p`
width: 95%;
text-align: left;
margin: 10px 20px 10px 20px;
white-space: normal;
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



export default class otherManProfilePlate extends Component {
  render() {
    const frame = this.props.thisFrame;
    if (!frame) {
      console.log(frame)
        return <div>Loading...</div>; // Или любой другой компонент загрузки
    }  
    return (
        <StyledContainer>
          <StyledForm>
              <StyledImg className="Avatar" src={avatar} width={90}/>
              <StyledMainInfoContainer>
                <p className = "UserName">{frame.lastName} {frame.firstName}</p>
                <ul>
                    <li className = "Direction">{frame.profession}</li>
                    <li className="Search">{frame.teamSearchState ? 
                        <span className="Search InSearch">В поисках команды</span> 
                        : <span className="NotInSearch">Не ищет команду</span>}
                    </li>
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
                <StyledP>Хочу быть частью динамичной и технологичной продвинутой команды для создания действительно проработанной визуальной новеллы.</StyledP>
              </StyledOtherInfoContainer>
          </StyledForm>
        </StyledContainer>
    )
  }
}