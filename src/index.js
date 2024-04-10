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

const baseUrl = 'http://127.0.0.1:5000/users';
const apiUrl = 'http://127.0.0.1:5000/register'

function App() {
 const [frames, setFrames] = useState([]);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [isFill, setIsFill] = useState(false);

 useEffect(() => {
  axios.get(baseUrl).then((res) => {
    console.log(res.data.users);
    let arr = res.data.users;
    addFrame(arr);
  });
  
  axios.post(apiUrl, {
    "email": "123", 
    "password": "1223",
  })
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
          <Routes>
            <Route exact path="/" element={<Main frames={frames} onAdd={addFrame} onLogIn={isLoggedIn}/>} />
            <Route exact path="/profile" element={<Profile frames={frames} 
              onLogIn={makeLoggedIn} onLoggedIn={isLoggedIn} onFill={makeFill} onFilled={isFill} onAdd={addFrame} onAdd1={addFrame1}/>} />
          </Routes>
        </>
      </Router>
 );
}

const root = document.getElementById("app");
createRoot(root).render(<App />);
