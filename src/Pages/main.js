import React, { useState } from 'react';
import '../css/style.css'
import logo from '../img/LogoPlaceholder.png'
import notification from '../img/NotificationButton.svg'
import avatar from '../img/avatarPlaceholder.jpg'
import Frames from '../Components/frames.js'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './profile.js'
import NewUserAgitation from '../Components/newUserAgitation.js'
import { useNavigate } from 'react-router-dom';

const Main = (props) => {
  const navigate = useNavigate();

  const goToIn = () => {
    navigate('/profile');
}

  return (
        <>
        {!props.onLogIn && <NewUserAgitation onGoToin={goToIn} onMakeRegistration={props.onMakeRegistration} onMakeNonRegistration={props.onMakeNonRegistration}/>} 
        <div className="Filter">
          <p className="button-text">Фильтр и поиск</p>
        </div>
        <Frames frames={props.frames}/>
      </>
  );
};

export default Main;
