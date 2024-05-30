import React, { Component } from 'react';
import Stub from '../img/projectZaglushka.jpg';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class projectPage extends Component {
  render() {
    if (!this.props.thisProject) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <Link to='/profile'>
          <button type='button' onClick={
            (e) => {
              axios.delete(`http://127.0.0.1:5000/delete_project/${this.props.currentProjectId}`)
            }
          }>удалить проект</button>
        </Link>
        <div>  {/*  это под картинки и название  */}
            <p>
                {this.props.thisProject.name}
            </p>
            <img src={Stub} alt='Фото проекта'></img>  {/*  тут потом сделаю так, чтобы оно все фотки выводило, Рома еще не намутил мутку  */}
        </div>
        <div>  {/*  это под описание и профиль  */}
            <div className> {/*  этот контейнер перебрасывает в профиль  */}
                <img src={this.props.avatar} alt></img>
                <p>{this.props.thisFrame.lastName} {this.props.thisFrame.firstName}</p>
                <p>{this.props.thisFrame.profession}</p>
                <p>{this.props.thisFrame.teamSearchState 
                    ?<p>В поисках команды</p>
                    : <p>Не ищет команду</p>}
                </p>
            </div>
            <p>Описание работы</p>
            <p>{this.props.thisProject.description}</p> 
        </div>
      </>
    )
  }
}
