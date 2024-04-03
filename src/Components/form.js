import React, { Component } from 'react'

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
      <form>
        <input placeholder='Фамилия' onChange={(e) => this.setState({secondName: e.target.value})}/>
        <input placeholder='Имя' onChange={(e) => this.setState({firstName: e.target.value})}/>
        <input placeholder='Отчество' onChange={(e) => this.setState({fatherName: e.target.value})}/>
        <input placeholder='Институт' onChange={(e) => this.setState({institute: e.target.value})}/>
        <select onChange={(e) => this.setState({direction: e.target.value})}>
          <option value="">Выберите направление</option>
          <option value="direction1">Направление 1</option>
          <option value="direction2">Направление 2</option>
          <option value="direction3">Направление 3</option>
        </select>
        <select onChange={(e) => this.setState({year: e.target.value})}>
          <option value="">Курс</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <select onChange={(e) => this.setState({skill: e.target.value})}>
          <option value="">Уровень</option>
          <option value="skill1">Начинающий</option>
          <option value="skill2">Junior</option>
          <option value="skill3">Middle</option>
          <option value="skill4">Senior</option>
        </select>
        <button type="button" onClick={() => {
          if (this.state.firstName.length < 3)
            console.log('error')
          else {
            this.props.onAdd({
              firstName: this.state.firstName,
              secondName: this.state.secondName,
              fatherName: this.state.fatherName,
              institute: this.state.institute,
              direction: this.state.direction,
              year: this.state.year,
              skill: this.state.skill
          })
        }
        }}>Добавить</button>
      </form>
    )
  }
}
