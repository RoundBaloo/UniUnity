import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { saveToken, setAuthHeader } from '../tokenService';


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Расстояние между элементами формы */
    border: 3px solid black;
    padding: 20px;
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
    width: 100%; /* Ширина формы */
    box-sizing: border-box;
    justify-content: flex-end;
`;  

const StyledP = styled.p`
`;

const StyledInput = styled.input`
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
`;

const StyledButton = styled.button`
    background-color: white;
    color: black;
    border: 3px solid black; // Убираем стандартные границы
    border-top: none; 
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 40px;
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;
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
    width: 300px;
    margin: auto;
    height: 80vh;
`;

export default class signin extends Component {
  render() {
    return (
        <FormContainer>
            <StyledForm className='registration'>
                <StyledP>Логин</StyledP>
                <StyledInput onChange={(e) => this.setState({email: e.target.value})} />
                <StyledP>Пароль</StyledP>
                <StyledInput onChange={(e) => this.setState({password: e.target.value})} />
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
                 console.log(response.data);
                 const token = response.data.access_token;
                 saveToken(token);
                 setAuthHeader(token);
                 this.props.onLogIn()
                })
                .catch(error => {
                 console.error('Error:', error);
                });
            }}>
            войти</StyledButton> 
        </FormContainer>
    )
  }
}
