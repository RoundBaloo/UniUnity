import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { saveToken, setAuthHeader } from '../tokenService';


const StyledForm = styled.form`
    border: 4px solid black;
    padding-right: 43px;
    padding-left: 43px;
    padding-top: 24px;
    border-top-left-radius: 22px;
    border-top-right-radius: 22px;
    width: 100%; /* Ширина формы */
    box-sizing: border-box;
    justify-content: flex-end;
`;

const ContainerTwoElements = styled.form`
    margin-bottom: 22px;
`;

const StyledP = styled.p`
    font-size: 23px;
    margin-right: auto;
    margin-bottom: 15px;
`;

const StyledInput = styled.input`
    background-color: white;
    height: 44px;
    border: 2px solid black;
    border-radius: 7px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
`;

const StyledButton = styled.button`
    font-size: 35px;
    text-align: left;
    padding-left: 43px;
    background-color: white;
    color: black;
    border: 4px solid black; // Убираем стандартные границы
    border-top: none; 
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 85px;
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
    &:hover {
        cursor: pointer;
        color: white;
        background-color: black;
    }
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // Выравнивание по центру по горизонтали
    justify-content: center; // Выравнивание по центру по вертикали
    width: 656px;
    margin-top: 65px;
    margin-left: auto;
    margin-right: auto;
`;

export default class signin extends Component {
  render() {
    return (
        <FormContainer>
            <StyledForm className='registration'>
                <ContainerTwoElements>
                    <StyledP>Логин</StyledP>
                    <StyledInput onChange={(e) => this.setState({email: e.target.value})}/>
                </ContainerTwoElements>
                <ContainerTwoElements>
                    <StyledP>Пароль</StyledP>
                    <StyledInput onChange={(e) => this.setState({password: e.target.value})}/>
                </ContainerTwoElements>
                <p onClick={() => {
                    console.log(1)
                    this.props.onMakeRegistration()
                }}>зарегистрироваться</p>
            </StyledForm>
            <StyledButton type="button" onClick={() => {
                axios.post('http://127.0.0.1:5000/login', {
                    email: this.state.email,
                    password: this.state.password
                })
                .then(response => {
                    console.log(response.data.access_token);
                    const token = response.data.access_token;
                    saveToken(token);
                    setAuthHeader(token);
                    this.props.onUpdateThisFrame(token);

                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }}>
            Войти</StyledButton>
        </FormContainer>
    )
  }
}
