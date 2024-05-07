import React, {useState, useEffect} from "react";
import {createRoot} from 'react-dom/client';
import './css/reset.css';
import './css/style.css';
import logo from './img/LogoPlaceholder.png';
import notification from './img/NotificationButton.svg';
import avatar from './img/Avatars/Avatar-1.svg'
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from './Pages/profile';
import Main from './Pages/main';
import OtherManProfile from "./Pages/otherManProfile";
import axios from 'axios';
import {saveToken, setAuthHeader, getToken} from './tokenService';
import UploadProject from "./Pages/uploadProject";
import styled from "styled-components";


var token = getToken();
var selfId;

function App() {
    const [frames, setFrames] = useState([]);
    const [thisFrame, setThisFrame] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFill, setIsFill] = useState(false);
    const [isRegistration, setRegistration] = useState(false);
    const [userId, setUserId] = useState(-1);
    const [linkPlates, setLinkPlates] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/users/${currentPage}`).then((res) => {
            let arr = res.data.users;
            addFrame(arr);
        });
    }, [currentPage]);

    const updateThisFrame = (token) => {
        axios.get('http://127.0.0.1:5000/get_user_with_projects', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setUserId(response.data.user.id);
                selfId = response.data.user.id;
                setThisFrame(response.data.user);
                updateUsersArray();
                makeLoggedIn();
                getUserProjects(response.data.user.id);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const updateThisFrame1 = (token) => {
        axios.get('http://127.0.0.1:5000/get_user_with_projects', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setUserId(response.data.user.id);
                selfId = response.data.user.id;
                updateUsersArray();
                getUserProjects(response.data.user.id);
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

    const makeLoggedIn = () => {
        setIsLoggedIn(true);
    };

    const makeNotLoggedIn = () => {
        setIsLoggedIn(false);
    }

    const makeFill = () => {
        setIsFill(true);
    };

    const updateUsersArray = () => {
        axios.get(`http://127.0.0.1:5000/users/${currentPage}`).then((res) => {
            addFrame(res.data.users);
        });
    }

    const updateUserId = (_userId) => {
        setUserId(_userId);
        getUserProjects(_userId);
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

    const scrollForward = () => {
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        updateUsersArray();
    }

    const scrollBack = () => {
        if (currentPage > 1)
            setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
        updateUsersArray();
    }
    const Avatar = styled.img`
        position: absolute;
        width: 90px;
        height: 90px;
        left: 0;
        top: 0;
    `;

    const AvatarContainer = styled.div`
        border-radius: 100%;
        position: absolute;
        width: 70px;
        height: 70px;
        right: 65px;
        top: 16px;
        border: 3px solid white;
        overflow: hidden;
    `;

    const NotificationImg = styled.img`
        position: absolute;
        width: 33px ;
        right: 163px;
        top: 36px;
    `;

    return (
        <Router>
            <>
                <header className="header">
                    <Link to="/" className="Logo"><img src={logo} width={145} height={50} onClick={updateUsersArray}
                                                       alt="Логотип"/></Link>
                    {/* <Link to='/uploadProject'><p className="PublishProject">Опубликовать проект</p></Link> */}
                    <NotificationImg src={notification} width={45} alt="Уведомления"/>
                    <Link to="/profile" onClick={() => {
                        makeNonRegistration();
                        updateUserId(selfId);
                        updateThisFrame1(token)
                    }}>

                        <AvatarContainer>
                            <Avatar
                                src={(isLoggedIn && thisFrame.image_link) ? thisFrame.image_link : avatar} width={90}
                                alt='Профиль'/>
                        </AvatarContainer>

                    </Link>
                </header>
                <Routes>
                    <Route exact path="/" element={<Main frames={frames} onAdd={addFrame} onLogIn={isLoggedIn}
                                                         onMakeRegistration={makeRegistration}
                                                         onRegistarion={isRegistration}
                                                         onMakeNonRegistration={makeNonRegistration}
                                                         updateUserId={updateUserId}
                                                         scrollBack={scrollBack} scrollForward={scrollForward}
                                                         currentPage={currentPage}
                                                         onUpdateThisFrame={updateThisFrame}/>}/>
                    <Route exact path="/profile" element={<Profile frames={frames}
                                                                   onLogIn={makeLoggedIn}
                                                                   makeNotLoggedIn={makeNotLoggedIn}
                                                                   onLoggedIn={isLoggedIn} onFill={makeFill}
                                                                   onFilled={isFill} onAdd={addFrame} onAdd1={addFrame1}
                                                                   onMakeRegistration={makeRegistration}
                                                                   onRegistarion={isRegistration}
                                                                   onUpdateUsers={updateUsersArray}
                                                                   thisFrame={thisFrame}
                                                                   onUpdateThisFrame={updateThisFrame}
                                                                   updateToken={updateToken} setFrames={setFrames}
                                                                   userId={userId} linkPlates={linkPlates}
                                                                   getUserProjects={getUserProjects}
                                                                   currentPage={currentPage}/>}/>
                    <Route exact path="/otherManProfile" element={<OtherManProfile
                        frames={frames} thisFrame={frames[userId - 1 - (4 * (currentPage - 1))]}
                        userId={userId} linkPlates={linkPlates}/>}/>
                    <Route exact path="/uploadProject"
                           element={<UploadProject token={token} updateThisFrame={updateThisFrame}/>}/>
                </Routes>
            </>
        </Router>
    );
}

const root = document.getElementById("app");
createRoot(root).render(<App/>);
