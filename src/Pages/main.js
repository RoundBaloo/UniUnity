import React from 'react';
import '../css/style.css'
import Frames from '../Components/frames.js'
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
        <Frames frames={props.frames} updateUserId={props.updateUserId}/>
        <div>
          <p onClick={() => {props.scrollBack()}}>назад</p>
          <p onClick={() => {props.scrollForward()}}>вперед</p>
        </div>
      </>
  );
};

export default Main;
