import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import './css/reset.css';
import './css/style.css';
import logo from './img/LogoPlaceholder.png';
import notification from './img/NotificationButton.svg';
import avatar from './img/avatarPlaceholder.jpg';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Pages/profile';
import Main from './Pages/main';
import axios from 'axios';
import { saveToken, setAuthHeader, getToken } from './tokenService';

const baseUrl = 'http://127.0.0.1:5000/users';

function App() {
  const [frames, setFrames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFill, setIsFill] = useState(false);
  const [isOnline, setOnline] = useState(false);
  const [isRegistration, setRegistration] = useState(false);
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      let arr = res.data.users;
      addFrame(arr);
    });
    }, []);

  const updateThisFrame = (token) => {
    axios.get('http://127.0.0.1:5000/get_user_id', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
    })
    .then(response => {
      setUserId(response.data.user_id);
      updateUsersArray();
      makeLoggedIn();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const addFrame = (data) => {
    setFrames(data);
  };

  const addFrame1 = (frame) => {
    setFrames(prevFrames => [...prevFrames, [{frame}]])
  };

    const makeOnline = () => {
    setOnline(true);
  }

  const makeLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const makeFill = () => {
    setIsFill(true);
  };

  const updateUsersArray = () => {
    axios.get(baseUrl).then((res) => {
      addFrame(res.data.users);
    });
  }

  const updateToken = (data) => {
    saveToken(data);
    setAuthHeader(data);
  }

  const makeRegistration = () => {
    setRegistration(true);
  }

  const makeNonRegistration = () => {
    setRegistration(false);
  }

 return (
      <Router>
        <>
          <header className="header">
            <Link to="/" className="Logo"><img src={logo} width={200} height={69} onClick={updateUsersArray}/></Link>
            <a href="#"><p className="PublishProject">Опубликовать проект</p></a>
            <a href="#" className="Notification"><img className="Notification" src={notification} width={45} /></a>
            <Link to="/profile" className="Avatar" onClick={makeNonRegistration}>
              <img className="Avatar" src={avatar} width={90}/>
            </Link>
          </header>
          <Routes>
            <Route exact path="/" element={<Main frames={frames} onAdd={addFrame} onLogIn={isLoggedIn}
              onMakeRegistration={makeRegistration} onRegistarion={isRegistration}
              onMakeNonRegistration={makeNonRegistration}/>} />
            <Route exact path="/profile" element={<Profile frames={frames}
              onLogIn={makeLoggedIn} onLoggedIn={isLoggedIn} onFill={makeFill}
              onFilled={isFill} onAdd={addFrame} onAdd1={addFrame1}
              onOnline={isOnline} onMakeRegistration={makeRegistration}
              onRegistarion={isRegistration} onUpdateUsers={updateUsersArray}
              thisFrame={frames[userId - 1]} onUpdateThisFrame={updateThisFrame}
              updateToken={updateToken} setFrames={setFrames}
              userId={userId}/>} />
          </Routes>
        </>
      </Router>
 );
}

const root = document.getElementById("app");
createRoot(root).render(<App />);
