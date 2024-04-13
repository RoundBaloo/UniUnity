import React, { Component } from 'react'
import styled from 'styled-components';


const StyledBottomButton = styled.button`
    background-color: white;
    color: black;
    border: 3px solid black; // Убираем стандартные границы
    border-top: none; 
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 70px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    &:hover {
        cursor: pointer;
        color: white;
        background-color: black;
    }
`;

const StyledTopButton = styled.button`
    background-color: white;
    color: black;
    border: 3px solid black; // Убираем стандартные границы
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 70px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    &:hover {
        cursor: pointer;
        color: white;
        background-color: black;
    }
`;

const LargeContainer = styled.div`
    display: flex;
    flex-direction: column; // Указывает, что компоненты должны располагаться в ряд
    justify-content: space-between; // Распределяет компоненты равномерно вдоль оси контейнера
    align-items: center; // Выравнивает компоненты по центру по вертикали
    width: 100%;
    height: 80vh;   
`;

const BigContainer = styled.div`
    display: flex;
    flex-direction: row; // Указывает, что компоненты должны располагаться в ряд
    justify-content: space-between; // Распределяет компоненты равномерно вдоль оси контейнера
    align-items: center; // Выравнивает компоненты по центру по вертикали
    margin: 30px;
`;

const SmallContainer = styled.div`
    width: 30%;
    margin: 70px 60px 0px 300px;
    // display: flex;
    // flex-direction: column; // Указывает, что компоненты должны располагаться в ряд
    // justify-content: space-between; // Распределяет компоненты равномерно вдоль оси контейнера
    // align-items: center; // Выравнивает компоненты по центру по вертикали
`;

const StyledP = styled.p`
    width: 30%;
    margin: 70px 300px 0px 60px;
    font-size: 65px;
`;

const TriangleWithBorder = styled.div`
 width: 0;
 height: 0;
 border-left: 30px solid transparent;
 border-right: 30px solid transparent;
 border-top: 50px solid white; // Белый фон треугольника
 position: relative; // Позиционирование для псевдоэлемента
 margin: 0px 100px 0px 100px;

 &::before {
    content: "";
    position: absolute;
    top: -55px; // Смещение вверх для создания рамки
    left: -40px; // Смещение влево для создания рамки
    border-left: 40px solid transparent; // Увеличиваем ширину границ для создания рамки
    border-right: 40px solid transparent;
    border-top: 65px solid black; // Черная рамка
    z-index: -1; // Позиционирование рамки за треугольником
 }
`;

export default class newUserAgitation extends Component {
  render() {
    return (
        <>
            <LargeContainer>
                <BigContainer>   
                    <StyledP>
                        СОБЕРИ <br />КОМАНДУ <br />МЕЧТЫ
                    </StyledP>
                    <SmallContainer>
                        <StyledTopButton onClick={() => {
                            this.props.onGoToin()
                            this.props.onMakeNonRegistration()
                        }}>ВОЙТИ</StyledTopButton>
                        <StyledBottomButton onClick={() => {
                            this.props.onGoToin()
                            this.props.onMakeRegistration()
                        }}>ЗАРЕГИСТРИРОВАТЬСЯ</StyledBottomButton>
                    </SmallContainer>
                </BigContainer>
                <BigContainer>
                    <TriangleWithBorder />
                    <TriangleWithBorder />
                    <TriangleWithBorder />
                    <TriangleWithBorder />
                    <TriangleWithBorder />
                </BigContainer>
            </LargeContainer>
        </>
    )
  }
}
