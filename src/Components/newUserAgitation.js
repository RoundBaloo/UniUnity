import React, {Component} from 'react'
import styled from 'styled-components';


const StyledBottomButton = styled.button`
    background-color: white;
    color: black;
    border: 4px solid black; // Убираем стандартные границы
    border-top: none;
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 50%;
    border-bottom-left-radius: 36px;
    border-bottom-right-radius: 36px;
    font-size: 35px;
    text-align: left;
    padding-left: 60px;

    &:hover {
        cursor: pointer;
        color: white;
        background-color: black;
    }
`;

const StyledTopButton = styled.button`
    background-color: white;
    color: black;
    border: 4px solid black; // Убираем стандартные границы
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 50%;
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
    font-size: 35px;
    text-align: left;
    padding-left: 60px;

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
    flex-direction: row;
    justify-content: flex-start; // Распределяет компоненты равномерно вдоль оси контейнера
    flex-flow: row nowrap;
    margin-left: 65px;
    margin-top: 75px;
    align-items: center; // Выравнивает компоненты по центру по вертикали
`;

const TrianglesContainer = styled.div`
    display: flex;
    justify-content: flex-start; // Распределяет компоненты равномерно вдоль оси контейнера
    flex-flow: row nowrap;
    margin-top: 60px;
    //align-items: center; // Выравнивает компоненты по центру по вертикали
    //margin-top: 90px;
`;

const SmallContainer = styled.div`
    width: 394px;
    height: 219px;
    margin-left: auto;
    margin-right: 65px;
    //margin: 70px 60px 0px 300px;
    // display: flex;
    // flex-direction: column; // Указывает, что компоненты должны располагаться в ряд
    // justify-content: space-between; // Распределяет компоненты равномерно вдоль оси контейнера
    // align-items: center; // Выравнивает компоненты по центру по вертикали

`;

const StyledP = styled.p`
    font-size: 93px;
    line-height: 117%;
    letter-spacing: 11px;
`;

const TriangleWithBorder = styled.div`
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 50px solid white; // Белый фон треугольника
    position: relative; // Позиционирование для псевдоэлемента
    margin: 0px 120px 0px 100px;

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
                <BigContainer>
                    <StyledP>
                        Собери <br/>команду <br/>мечты
                    </StyledP>
                    <SmallContainer>
                        <StyledTopButton onClick={() => {
                            this.props.onGoToin()
                            this.props.onMakeNonRegistration()
                        }}>вход</StyledTopButton>
                        <StyledBottomButton onClick={() => {
                            this.props.onGoToin()
                            this.props.onMakeRegistration()
                        }}>регистрация</StyledBottomButton>
                    </SmallContainer>
                </BigContainer>
                <TrianglesContainer>
                    <TriangleWithBorder/>
                    <TriangleWithBorder/>
                    <TriangleWithBorder/>
                    <TriangleWithBorder/>
                    <TriangleWithBorder/>
                </TrianglesContainer>
            </>
        )
    }
}
