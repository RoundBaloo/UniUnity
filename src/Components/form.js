import React, { Component } from 'react'
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

export default class form extends Component {
  constructor(props){
    super(props)
    this.state ={
      firstName: "",
      secondName: "",
      fatherName: "",
      institute: "",
      direction: "",
      year: 0,
      skill: ""
    }
  }
  render() {
    return (
      !this.props.onFilled ? (
        <FormContainer>
          <StyledForm>
            <StyledInput placeholder='Фамилия' onChange={(e) => this.setState({secondName: e.target.value})}/>
            <StyledInput placeholder='Имя' onChange={(e) => this.setState({firstName: e.target.value})}/>
            <StyledInput placeholder='Отчество' onChange={(e) => this.setState({fatherName: e.target.value})}/>
            <StyledInput placeholder='Институт' onChange={(e) => this.setState({institute: e.target.value})}/>
            <StyledSelect onChange={(e) => this.setState({direction: e.target.value})}>
              <StyledOption value="">Выберите направление</StyledOption>
              <StyledOption value="direction1">Направление 1</StyledOption>
              <StyledOption value="direction2">Направление 2</StyledOption>
              <StyledOption value="direction3">Направление 3</StyledOption>
            </StyledSelect>
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
              <StyledOption value="skill1">Начинающий</StyledOption>
              <StyledOption value="skill2">Junior</StyledOption>
              <StyledOption value="skill3">Middle</StyledOption>
              <StyledOption value="skill4">Senior</StyledOption>
            </StyledSelect>
          </StyledForm>
          <StyledButton type="button" onClick={() => {
              if (this.state.firstName.length < 3)
                console.log('error')
              else {
                  this.props.onAdd1({
                  firstName: this.state.firstName,
                  secondName: this.state.secondName,
                  fatherName: this.state.fatherName,
                  institute: this.state.institute,
                  direction: this.state.direction,
                  year: this.state.year,
                  skill: this.state.skill
              })
              this.props.onFill()
            }
            }}>Добавить</StyledButton>
        </FormContainer>
      ) : (<span>Форма заполнена</span>)
    )
  }
}
