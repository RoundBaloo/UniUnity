import React, { Component } from 'react';
import '../css/registration.css';
import styled from 'styled-components';
import axios from 'axios';
import { saveToken, setAuthHeader } from '../tokenService';
import standartAvatar from '../img/Avatars/Avatar-1.svg'

const apiUrl = 'http://127.0.0.1:5000/register';


const StyledForm = styled.div`
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
    color: ${props => props.color || 'initial'};
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
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
`;

export default class registration extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: "",
            password: "",
            repeatedPassword: "",
            FIO: "",
            IsEmailValid: true,
            IsPasswordValid: true,
            IsPasswordsMatch: true,
            IsFIOHasThreeWords: true,
            IsLoginAlreadyUsed: false
        }
    }
    render() {
        return (
            <FormContainer>
                <StyledForm className='registration'>
                    <ContainerTwoElements>
                        <StyledP>Логин</StyledP>
                        <StyledInput isValid={this.state.IsEmailValid} onChange={(e) => {
                            this.setState({email: e.target.value})
                            this.setState({IsEmailValid: true})
                            this.setState({IsLoginAlreadyUsed: false})
                        }} />
                        {!this.state.IsEmailValid ? <StyledP color='#f1807e'>введен некорректный email</StyledP> : null}
                    </ContainerTwoElements>
                    <ContainerTwoElements>
                        <StyledP>Пароль</StyledP>
                        <StyledInput type='password' isValid={this.state.IsPasswordValid} onChange={(e) => {
                            this.setState({password: e.target.value})
                            this.setState({IsPasswordValid: true})
                        }} />
                        {!this.state.IsPasswordValid ? <StyledP color='#f1807e'>длина пароля должна быть более 8 символов</StyledP> : null}
                    </ContainerTwoElements>
                    <ContainerTwoElements>
                        <StyledP>Подтвердите пароль</StyledP>
                        <StyledInput type='password' isValid={this.state.IsPasswordsMatch} onChange={(e) => {
                            this.setState({repeatedPassword: e.target.value})
                            this.setState({IsPasswordsMatch: true})
                        }} />
                        {!this.state.IsPasswordsMatch ? <StyledP color='#f1807e'>пароли не совпадают</StyledP> : null}
                    </ContainerTwoElements>
                    <ContainerTwoElements>
                        <StyledP>ФИО</StyledP>
                        <StyledInput isValid={this.state.IsFIOHasThreeWords} onChange={(e) => {
                            this.setState({FIO: e.target.value})
                            this.setState({IsFIOHasThreeWords: true})
                        }} />
                        {!this.state.IsFIOHasThreeWords ? <StyledP color='#f1807e'>Введите ФИО полностью</StyledP> : null}
                    </ContainerTwoElements>
                    {this.state.IsLoginAlreadyUsed ? <StyledP color='#f1807e'>данный логин уже занят</StyledP> : null}
                </StyledForm>
                <StyledButton type="button" onClick={() => {
                    if (!this.state.email.includes('@')){
                        this.setState({IsEmailValid: false})
                        console.log(1)
                    } else if (this.state.password.length < 8) {
                        this.setState({IsPasswordValid: false})
                        console.log(2)
                    } else if (this.state.password !== this.state.repeatedPassword) {
                        this.setState({IsPasswordsMatch: false})
                        console.log(3)
                    } else if (this.state.FIO.split(" ").length !== 3) {
                        this.setState({IsFIOHasThreeWords: false})
                        console.log(4)
                    } else {
                        axios.post(apiUrl, {
                            "email": this.state.email, 
                            "password": this.state.password,
                            "lastName": this.state.FIO.split(" ")[0],
                            "firstName": this.state.FIO.split(" ")[1],
                            "fatherName": this.state.FIO.split(" ")[2],
                            "image_link": standartAvatar
                            })
                            .then(response => {
                                this.props.onUpdateUsers(); // mbd
                                this.props.updateToken(response.data.access_token); //mbd 
                                console.log('User added successfully:', response.data);
                                const token = response.data.access_token; 
                                saveToken(token);
                                setAuthHeader(token);
                                this.props.onUpdateThisFrame(token);
                                this.props.getUserProjects();
                            })
                            .catch(error => {
                              console.error('Error adding user:', error);
                              this.setState({IsLoginAlreadyUsed: true})
                            });
                    }
                }}>
                Зарегистрироваться</StyledButton>
            </FormContainer> 
        )
    }
}
