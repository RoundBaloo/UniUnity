import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { saveToken, setAuthHeader } from '../tokenService';
import {Link} from "react-router-dom";


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

const ContainerTwoElements = styled.div`
    margin-bottom: 22px;
`;

const StyledP = styled.p`
    color: ${props => props.color};
    font-size: 23px;
    margin-right: auto;
    margin-bottom: 15px;
`;

const StyledInput = styled.input`
    background-color: ${props => props.isValid ? 'white' : '#ffcccb'};
    height: 44px;
    border: 2px solid ${props => props.isValid ? 'black' : "#f1807e"};
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

const StyledButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center; // Выравнивание элементов по центру по вертикали
`;

export default class signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          isEmailValid: true,
          isPasswordValid: true,
          isCorrectData: true
        };
    }

  render() {

    return (
        <FormContainer>
            <StyledForm className='registration'>
                <ContainerTwoElements>
                    <StyledP color='black'>Логин</StyledP>
                    <StyledInput isValid={this.state.isEmailValid} value={this.state.email} onChange={(e) => {
                        this.setState({email: e.target.value});
                        this.setState({isEmailValid: true});
                    }}/>
                    {!this.state.isEmailValid ? <StyledP color='#f1807e'>требуется ввести email</StyledP> : null}
                </ContainerTwoElements>
                <ContainerTwoElements>
                    <StyledP color='black'>Пароль</StyledP>
                    <StyledInput isValid={this.state.isPasswordValid} value={this.state.password} onChange={(e) => {
                        this.setState({password: e.target.value});
                        this.setState({isPasswordValid: true});
                    }}/>
                    {!this.state.isPasswordValid ? <StyledP color='#f1807e'>требуется ввести пароль</StyledP> : null}  
                    {!this.state.isCorrectData ? <StyledP color='#f1807e'>логин или пароль неверный</StyledP> : null}
                </ContainerTwoElements>
            </StyledForm>

            <StyledButtonContainer>
                <StyledButton style={{borderBottomRightRadius: '0px'}} type="button" onClick={() => {
                    this.setState({isCorrectData: true});
                    if (this.state.email.length < 1) {
                        this.setState({isEmailValid: false});
                    } else if (this.state.password.length < 1) {
                        this.setState({isPasswordValid: false});
                    } else {
                        axios.post('http://127.0.0.1:5000/login', {
                            email: this.state.email,
                            password: this.state.password
                        })
                            .then(response => {
                                console.log(response.data);
                                const token = response.data.access_token;
                                saveToken(token);
                                setAuthHeader(token);
                                this.props.onUpdateThisFrame(token);
                            })
                            .catch(error => {
                                this.setState({isCorrectData: false});
                                console.error('Error:', error);
                            });
                    };
                }}>
                    Войти</StyledButton>
                <StyledButton style={{borderBottomLeftRadius: '0px', borderLeft: 'none'}} onClick={() => {
                    this.props.onMakeRegistration()
                }}>Регистрация</StyledButton>
            </StyledButtonContainer>
        </FormContainer>
    )
  }
}
