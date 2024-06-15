import React, {useState, useEffect} from "react";
import {createRoot} from 'react-dom/client';
import './css/reset.css';
import './css/style.css';
import newLogo from './img/UniUnityLogo.png';
import avatar from './img/avatarPlaceholder.svg'
import {Link} from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from './Pages/profile';
import Main from './Pages/main';
import OtherManProfile from "./Pages/otherUserProfile";
import ProjectPage from "./Pages/projectPage"
import OtherUserProjectPage from "./Pages/otherUserProjectPage"
import ProfileInfoEditor from "./Pages/projectInfoEditor";
import axios from 'axios';
import {saveToken, setAuthHeader, getToken} from './tokenService';
import UploadProject from "./Pages/uploadProject";
import styled from "styled-components";


var token = getToken();
var selfId;
var selfAvatarLink;

function App() {
    const [frames, setFrames] = useState([]);
    const [thisFrame, setThisFrame] = useState({ image_link: avatar });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFill, setIsFill] = useState(false);
    const [isRegistration, setRegistration] = useState(false);
    const [userId, setUserId] = useState(-1);
    const [linkPlates, setLinkPlates] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProjectId, setCurrentProjectId] = useState();
    const [currentProject, setCurrentProject] = useState();

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
                selfAvatarLink = response.data.user.image_link;
                console.log("я был вызван")
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

    const updateFilters = (filters) => {
        axios.patch('http://127.0.0.1:5000/filters', {
            institute: filters.institute,
            studyDirection: filters.studyDirection,
            course: filters.course,
            profession: filters.profession,
            skillLevel: filters.skillLevel,
            teamSearchState: filters.teamSearchState
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            updateUsersArray();
            console.log(filters);
        })
        .catch((error) => {
            console.error('Error:', error);
          });
    };

    const getUserProjects = (_userId) => {
        if (!!_userId) {
            axios.get(`http://127.0.0.1:5000/get_user_projects/${_userId}`)
            .then(response => {
                setLinkPlates(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса:', error);
            });
        }
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
        updateThisFrameToOther(_userId);
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

    const updateThisFrameToOther = (_userId) => {
        if (!!_userId){
            axios.get(`http://127.0.0.1:5000/get_user/${_userId}`).then((res) => {
                setThisFrame(res.data.user);
            });
        }
    }

    const updateCurrentProjectId = (projId) => {
        setCurrentProjectId(projId);
        axios.get(`http://127.0.0.1:5000/get_project/${projId}`)
        .then (res => {
            setCurrentProject(res.data);
            console.log(res.data)
        })
        console.log(projId);
    }

    const Avatar = styled.img`
        position: absolute;
        width: 45px;
        height: 60px;
        left: 10px;
        top: 12px;
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

    return (
        <Router>
            <>
                <header className="header">
                    <Link to="/" className="Logo"><img src={newLogo} width={245} height={58} onClick={updateUsersArray}
                                                       alt="Логотип"/></Link>
                    {/* <Link to='/uploadProject'><p className="PublishProject">Опубликовать проект</p></Link> */}
                    <Link to="/profile" onClick={() => {
                        makeNonRegistration();
                        updateUserId(selfId);
                        updateThisFrame1(token)
                    }}>
                        <AvatarContainer>
                            <Avatar
                                src={(isLoggedIn) ? selfAvatarLink : avatar} width={90}
                                alt='Профиль'/>
                        </AvatarContainer>
                    </Link>
                </header>
                <Routes>
                    <Route exact path="/" element={<Main frames={frames} 
                                                         onAdd={addFrame} 
                                                         onLogIn={isLoggedIn}
                                                         onMakeRegistration={makeRegistration}
                                                         onRegistarion={isRegistration}
                                                         onMakeNonRegistration={makeNonRegistration}
                                                         updateUserId={updateUserId}
                                                         scrollBack={scrollBack} scrollForward={scrollForward}
                                                         currentPage={currentPage}
                                                         onUpdateThisFrame={updateThisFrame}
                                                         updateThisFrameToOther={updateThisFrameToOther}
                                                         updateFilters={updateFilters}/>}/>
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
                                                                   updateToken={updateToken} 
                                                                   setFrames={setFrames}
                                                                   userId={userId} 
                                                                   linkPlates={linkPlates}
                                                                   getUserProjects={getUserProjects}
                                                                   currentPage={currentPage}
                                                                   updateCurrentProjectId={updateCurrentProjectId}/>}/>
                    <Route exact path="/otherManProfile" element={<OtherManProfile
                        frames={frames} 
                        thisFrame={thisFrame}
                        userId={userId} 
                        linkPlates={linkPlates}
                        updateCurrentProjectId={updateCurrentProjectId}/>}/>
                    <Route exact path="/uploadProject"
                           element={<UploadProject token={token} 
                                                   updateThisFrame={updateThisFrame}/>}/>
                    <Route exact path="/projectPage" element={
                        thisFrame!== undefined && linkPlates!== undefined?
                            <ProjectPage thisFrame={thisFrame}
                                         thisProject={currentProject}
                                         avatar={thisFrame.image_link}
                                         currentProjectId={currentProjectId}
                                         getUserProjects={getUserProjects}
                                         selfId={selfId}/> :
                            null
                        }/>
                    <Route exact path="/otherUserProjectPage" element={
                        thisFrame!== undefined && linkPlates!== undefined?
                            <OtherUserProjectPage thisFrame={thisFrame}
                                         thisProject={currentProject}
                                         avatar={thisFrame.image_link}
                                         currentProjectId={currentProjectId}
                                         getUserProjects={getUserProjects}
                                         selfId={selfId}/> :
                            null
                    }/>
                    <Route exact path="/profileEditor" element={<ProfileInfoEditor thisProject={currentProject}
                                                                                   updateCurrentProjectId={updateCurrentProjectId}/>} />
                </Routes>
            </>
        </Router>
    );
}

const root = document.getElementById("app");
createRoot(root).render(<App/>);
