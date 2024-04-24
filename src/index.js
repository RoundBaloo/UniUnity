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
import OtherManProfile from "./Pages/otherManProfile";
import axios from 'axios';
import { saveToken, setAuthHeader, getToken } from './tokenService';
import UploadProject from "./Pages/uploadProject";

const baseUrl = 'http://127.0.0.1:5000/users';
const projects = 'http://127.0.0.1:5000/post_project';
const getprojs = 'http://127.0.0.1:5000/get_user_projects/${userId}';

var token = getToken();
var selfId;

function App() {
  const [frames, setFrames] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFill, setIsFill] = useState(false);
  const [isOnline, setOnline] = useState(false);
  const [isRegistration, setRegistration] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [linkPlates, setLinkPlates] = useState();

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
      selfId = response.data.user_id;
      updateUsersArray();
      makeLoggedIn();
      getUserProjects(response.data.user_id);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const getUserProjects = (_userId) => {
    axios.get(`http://127.0.0.1:5000/get_user_projects/${_userId}`)
    .then(response => {
      setLinkPlates(response.data)
    })
    .catch(error => {
      console.error('Ошибка при выполнении запроса:', error);
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

  const updateUserId = (_userId) => {
    setUserId(_userId);
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
            <Link to="/" className="Logo"><img src={logo} width={145} height={50} onClick={updateUsersArray}/></Link>
            <Link to='/uploadProject'><p className="PublishProject">Опубликовать проект</p></Link>
            <a href="#" ><img className="Notification" src={notification} width={45} /></a>
            <Link to="/profile" onClick={() => { makeNonRegistration(); updateUserId(selfId); updateThisFrame(token)}}>
              <img className="Avatar" src={avatar} width={90}/>
            </Link>
          </header>
          <Routes>
            <Route exact path="/" element={<Main frames={frames} onAdd={addFrame} onLogIn={isLoggedIn}
              onMakeRegistration={makeRegistration} onRegistarion={isRegistration}
              onMakeNonRegistration={makeNonRegistration} 
              updateUserId={updateUserId}/>} />
            <Route exact path="/profile" element={<Profile frames={frames}
              onLogIn={makeLoggedIn} onLoggedIn={isLoggedIn} onFill={makeFill}
              onFilled={isFill} onAdd={addFrame} onAdd1={addFrame1}
              onOnline={isOnline} onMakeRegistration={makeRegistration}
              onRegistarion={isRegistration} onUpdateUsers={updateUsersArray}
              thisFrame={frames[userId - 1]} onUpdateThisFrame={updateThisFrame}
              updateToken={updateToken} setFrames={setFrames}
              userId={userId} linkPlates={linkPlates}
              getUserProjects={getUserProjects}/>} />
            <Route exact path="/otherManProfile" element={<OtherManProfile 
              frames={frames} thisFrame={frames[userId - 1]}
              userId={userId}/>} />
            <Route exact path="/uploadProject" element={<UploadProject token={token} updateThisFrame={updateThisFrame}/>} /> 
          </Routes>
        </>
      </Router>
 );
}

const root = document.getElementById("app");
createRoot(root).render(<App />);
