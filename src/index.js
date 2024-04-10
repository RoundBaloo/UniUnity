import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import './css/style.css';
import logo from './img/LogoPlaceholder.png';
import notification from './img/NotificationButton.svg';
import avatar from './img/avatarPlaceholder.jpg';
import Frames from './Components/frames.js';
import { Link, useSearchParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Pages/profile';
import Main from './Pages/main';
import axios from 'axios';

const baseUrl = 'https://reqres.in/api/users';
const apiUrl = 'https://reqres.in/api/users'

function App() {
 const [frames, setFrames] = useState([]);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [isFill, setIsFill] = useState(false);
 const [users, setUsers] = useState([]);

 useEffect(() => {
  axios.get(baseUrl).then((res) => {
    console.log(res.data.data);
    let arr = res.data.data;
    addFrame(arr);
  });
  
  axios.post(apiUrl, {"first_name": "morpheus", "last_name": "leader"})
    .then(response => {
      console.log('User added successfully:', response.data);
    })
    .catch(error => {
      console.error('Error adding user:', error);
    });

 }, []);

 const addFrame = (data) => {
      const id = frames.length + 1;
      const specialization = "default";
      const isLookingForTeam = true;

      setFrames(data);
 };

 const addFrame1 = (frame) => {
  setFrames(prevFrames => [...prevFrames, [{frame}]])
 };
  
  const makeLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const makeFill = () => {
    setIsFill(true);
  };

 return (
      <Router>
        <>
          <header className="header">
            <Link to="/" className="Logo"><img src={logo} width={200} height={69} /></Link>
            <a href="#"><p className="PublishProject">Опубликовать проект</p></a>
            <a href="#" className="Notification"><img className="Notification" src={notification} width={45} /></a>
            <Link to="/profile" className="Avatar">
              <img className="Avatar" src={avatar} width={90} />
            </Link>
          </header>
          {isLoggedIn 
          ? (<p>Вы молодец</p>) : (<p>Зарегистрируйтесь пожалуйста или войдите в аккаунт</p>)}  
          <Routes>
            <Route exact path="/" element={<Main frames={frames} onAdd={addFrame}/>} />
            <Route exact path="/profile" element={<Profile frames={frames} onLogIn={makeLoggedIn} onFill={makeFill} onFilled={isFill} onAdd={addFrame} onAdd1={addFrame1}/>} />
          </Routes>
        </>
      </Router>
 );
}

const root = document.getElementById("app");
createRoot(root).render(<App />);
