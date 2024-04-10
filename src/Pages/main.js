import React, { useState } from 'react';
import '../css/style.css'
import logo from '../img/LogoPlaceholder.png'
import notification from '../img/NotificationButton.svg'
import avatar from '../img/avatarPlaceholder.jpg'
import Frames from '../Components/frames.js'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './profile.js'

const Main = (props) => {

 return (
      <>
        {props.onLogIn 
          ? (<p>Вы молодец</p>) : (<p>Зарегистрируйтесь, пожалуйста, или войдите в аккаунт</p>)} 
      <div className="Filter">
        <p className="button-text">Фильтр и поиск</p>
      </div>
      <Frames frames={props.frames}/>
    </>
 );
};

export default Main;
