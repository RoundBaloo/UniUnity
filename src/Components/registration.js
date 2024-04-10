import React, { Component } from 'react';
import '../css/registration.css';
import styled from 'styled-components';

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
                    <StyledP>Логин</StyledP>
                    <StyledInput onChange={(e) => this.setState({email: e.target.value})} />
                    <StyledP>Пароль</StyledP>
                    <StyledInput onChange={(e) => this.setState({password: e.target.value})} />
                    <StyledP>Подтвердите пароль</StyledP>
                    <StyledInput onChange={(e) => this.setState({repeated_password: e.target.value})} />
                    <StyledP>ФИО</StyledP>
                    <StyledInput onChange={(e) => this.setState({FIO: e.target.value})} />  
                </StyledForm>
                <StyledButton type="button" onClick={() => {
                    if (this.state.password === this.state.repeated_password
                        && this.state.email.includes('@')
                        && this.state.FIO.split(' ').length == 3){
                            this.props.onLogIn()
                            this.props.onHandleRegister()
                        }
                    else
                        console.log("bad")
                }}>
                зарегистрироваться</StyledButton>
                
            </FormContainer> 
        )
    }
}
