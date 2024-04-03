import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './css/style.css';
import logo from './img/LogoPlaceholder.png';
import notification from './img/NotificationButton.svg';
import avatar from './img/avatarPlaceholder.jpg';
import Frames from './Components/frames.js';
import { Link, useSearchParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Pages/profile';
import Main from './Pages/main';

function App() {
 const [frames, setFrames] = useState([]);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [users, setUsers] = useState([]);

 useEffect(() => {
  fetchUsers()
 }, []);
 
 const fetchUsers = async () => {
  const response = await fetch("https://127.0.0.1:5500/users")
  const data = await response.json()
  setUsers(data.users)
  console.log(data.users)
 }

 const addFrame = (frame) => {
    const id = frames.length + 1;
    const specialization = "default";
    const isLookingForTeam = true;

    setFrames([...frames, {id, ...frame, specialization, isLookingForTeam }]);
 };
  
 const makeLoggedIn = () => {
    setIsLoggedIn(true);
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
          <Route exact path="/profile" element={<Profile frames={frames} onLogIn={makeLoggedIn} onAdd={addFrame}/>} />
        </Routes>
      </>
    </Router>
 );
}

ReactDOM.render(<App />, document.getElementById("app"));
