import React, { Component } from 'react';
import '../css/registration.css';
import styled from 'styled-components';
import axios from 'axios';
import { saveToken, setAuthHeader, getToken } from '../tokenService';

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
            repeated_password: "",
            FIO: ""
        }
    }
    render() {
        return (
            <FormContainer>
                <StyledForm className='registration'>
                    <ContainerTwoElements>
                        <StyledP>Логин</StyledP>
                        <StyledInput onChange={(e) => this.setState({email: e.target.value})} />
                    </ContainerTwoElements>
                    <ContainerTwoElements>
                        <StyledP>Пароль</StyledP>
                        <StyledInput onChange={(e) => this.setState({password: e.target.value})} />
                    </ContainerTwoElements>
                    <ContainerTwoElements>
                        <StyledP>Подтвердите пароль</StyledP>
                        <StyledInput onChange={(e) => this.setState({repeated_password: e.target.value})} />
                    </ContainerTwoElements>
                    <ContainerTwoElements>
                        <StyledP>ФИО</StyledP>
                        <StyledInput onChange={(e) => this.setState({FIO: e.target.value})} />
                    </ContainerTwoElements>
                </StyledForm>
                <StyledButton type="button" onClick={() => {
                    axios.post(apiUrl, {
                        "email": this.state.email, 
                        "password": this.state.password,
                        "lastName": this.state.FIO.split(" ")[0],
                        "firstName": this.state.FIO.split(" ")[1],
                        "fatherName": this.state.FIO.split(" ")[2]
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
                        });
                }}>
                Зарегистрироваться</StyledButton>
            </FormContainer> 
        )
    }
}
