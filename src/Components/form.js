import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from '../tokenService';

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

const StyledInput = styled.input.attrs({
  maxLength: 50,
})`
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
    padding-bottom: 20px;
    line-height: 40px;
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
  height: 100vh;
  margin-top: 170px;
  margin-bottom: 170px;
`;

const StyledSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
`;

const StyledOption = styled.option`
  background: white;
  color: black;
  padding: 10px;
  border-radius: 5px;
`;

const StyledTextarea = styled.textarea.attrs({
  maxLength: 200,
})`
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  resize: none; 
`;

export default class form extends Component {
  constructor(props){
    super(props)
    this.state ={
      firstName: this.props.frames[],
      secondName: "",
      fatherName: "",
      institute: "",
      direction: "",
      year: 0,
      skill: "",
      profession: "",
      searchAim: "",
      about: ""
    }
  }
  render() {
    return (
      !this.props.onFilled ? (
        <FormContainer>
          <StyledForm>
            <StyledP>Фамилия</StyledP>
            <StyledInput placeholder='' onChange={(e) => this.setState({secondName: e.target.value})}/>
            <StyledP>Имя</StyledP>
            <StyledInput placeholder='' onChange={(e) => this.setState({firstName: e.target.value})}/>
            <StyledP>Отчество</StyledP>
            <StyledInput placeholder='' onChange={(e) => this.setState({fatherName: e.target.value})}/>
            <StyledP>Институт</StyledP>
            <StyledInput placeholder='' onChange={(e) => this.setState({institute: e.target.value})}/>
            <StyledP>Направление обучения</StyledP>
            <StyledInput placeholder='' onChange={(e) => this.setState({direction: e.target.value})}/>
            <StyledP>Специальность</StyledP>
            <StyledInput placeholder='' onChange={(e) => {this.setState({profession: e.target.value})}}/>
            <StyledP>Цель поиска команды</StyledP>
            <StyledInput placeholder='' onChange={(e) => {this.setState({searchAim: e.target.value})}}/>
            <StyledP>О себе</StyledP>
            <StyledTextarea placeholder='' onChange={(e) => this.setState({about: e.target.value})}/>
            <StyledSelect onChange={(e) => this.setState({year: e.target.value})}>
              <StyledOption value="">Курс</StyledOption>
              <StyledOption value="1">1</StyledOption>
              <StyledOption value="2">2</StyledOption>
              <StyledOption value="3">3</StyledOption>
              <StyledOption value="4">4</StyledOption>
              <StyledOption value="5">5</StyledOption>
              <StyledOption value="6">6</StyledOption>
            </StyledSelect>
            <StyledSelect onChange={(e) => this.setState({skill: e.target.value})}>
              <StyledOption value="">Уровень</StyledOption>
              <StyledOption value="Начинающий">Начинающий</StyledOption>
              <StyledOption value="Junior">Junior</StyledOption>
              <StyledOption value="Middle">Middle</StyledOption>
              <StyledOption value="Senior">Senior</StyledOption>
            </StyledSelect>
          </StyledForm>
          <StyledButton type="button" onClick={() => {
              console.log(this.state)
              if (this.state.firstName.length < 3)
                console.log('error')
              else {
                const token = getToken();
                if (token) {
                    axios.patch('http://127.0.0.1:5000/update_user', {
                        "firstName": this.state.firstName,
                        "lastName": this.state.secondName,
                        "fatherName": this.state.fatherName,
                        "institute": this.state.institute,
                        "studyDirection": this.state.direction,
                        "course": this.state.year,
                        "skillLevel": this.state.skill,
                        "profession": this.state.profession,
                        "searchAim": this.state.searchAim,
                        "about": this.state.about
                      }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                    this.props.onFill()
                }
            }
            }}>обновить</StyledButton>
        </FormContainer>
      ) : (<span>Форма заполнена</span>)
    )
  }
}
