import React, {useState} from "react";
import '../css/style.css'
import Frames from '../Components/frames.js'
import NewUserAgitation from '../Components/newUserAgitation.js'
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {motion, useScroll, useMotionValueEvent} from "framer-motion";



const StyledTurningPagesButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    padding: 20px;
`;

const FilterContainer = styled.div`
    text-align: left;
    height: 440px;
    width: 372px;
    border: 3px solid black;
    border-radius: 23px;
    margin-top: 44px;
    margin-left: 65px;
    margin-bottom: 100px;
    cursor: pointer;
    overflow: hidden;
`;

const FilterButtonP = styled.div`
    font-size: 18px;
    padding-left: 40px;
    padding-top: 9px;
    margin:0;
`;

const StyledTurningButton = styled.button`
    border: 3px solid black;
    border-radius: 25px;
    padding: 2px 9px;

    &:hover {
        color: white;
        background-color: black;
    }
`;

const LeftColumn = styled.div`
    border-right: 2px;
    width: 143px;
`;

const RightColumn = styled.div`
    
`;

const Main = (props) => {
    const [instituteFilter, setInstituteFilter] = useState('');
    const [studyDirectionFilter, setStudyDirectionFilter] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [professionFilter, setprofessionFilter] = useState('');
    const [skillLevelFilter, setSkillLevelFilter] = useState('');
    const [teamSearchStateFilter, setTeamSearchStateFilter] = useState();

    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        }
        else {
            setHidden(false);
        }
    });

    const navigate = useNavigate();

    const goToIn = () => {
        navigate('/profile');
    };

    return (
        <>
            <motion.div variants={{
                hidden: {y:"-100%"},
                visible: {y:0},
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{duration: 0.35, ease: "easeInOut"}}>
                {!props.onLogIn && <NewUserAgitation onGoToin={goToIn} onMakeRegistration={props.onMakeRegistration}
                                                     onMakeNonRegistration={props.onMakeNonRegistration}/>}
            </motion.div>

            <FilterContainer>
                <FilterButtonP>Фильтр и поиск</FilterButtonP>
                <LeftColumn>
                    <ul>
                        <li>Курс</li>
                        <li>Институт</li>
                        <li>Направление</li>
                        <li>Профессия</li>
                        <li>Поиск команды</li>
                    </ul>
                </LeftColumn>

                <RightColumn>
                    <ul>
                        <li>
                            <select onChange={(e) => {
                                setCourseFilter(e.target.value)
                            }}>курс
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </li>
                        <li><input placeholder="input field" onChange={(e) => {
                            setInstituteFilter(e.target.value)
                        }}></input></li>
                        <li>
                            <input placeholder="input field" onChange={(e) => {
                            setStudyDirectionFilter(e.target.value)}}>
                            </input>
                        </li>
                        <li>
                            <input placeholder="input field" onChange={(e) => {
                            setprofessionFilter(e.target.value)
                        }}></input>
                        </li>
                        <li>
                            <input
                            type="checkbox"
                            onChange={(e) => {
                                setTeamSearchStateFilter(e.target.checked)
                            }}/>
                        </li>
                    </ul>
                </RightColumn>
                <select onChange={(e) => {
                    setCourseFilter(e.target.value)
                }}>курс
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <p>институт</p>
                <input placeholder="input field" onChange={(e) => {
                    setInstituteFilter(e.target.value)
                }}></input>
                <p>направление обучения</p>
                <input placeholder="input field" onChange={(e) => {
                    setStudyDirectionFilter(e.target.value)
                }}></input>
                <p>профессия</p>
                <input placeholder="input field" onChange={(e) => {
                    setprofessionFilter(e.target.value)
                }}></input>
                <p>скилл</p>
                <input placeholder="input field" onChange={(e) => {
                    setSkillLevelFilter(e.target.value)
                }}></input>
                <p>ищет команду?</p>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        setTeamSearchStateFilter(e.target.checked)
                    }}
                />

                <button type='button' onClick={(e) => {
                    props.updateUsersByFilters({
                        institute: instituteFilter,
                        studyDirection: studyDirectionFilter,
                        course: courseFilter,
                        profession: professionFilter,
                        skillLevel: skillLevelFilter,
                        teamSearchState: teamSearchStateFilter
                    })
                }}>сохранить фильтры
                </button>
            </FilterContainer>
            <Frames frames={props.frames} updateUserId={props.updateUserId} onUpdateThisFrame={props.onUpdateThisFrame}
                    updateThisFrameToOther={props.updateThisFrameToOther}/>
            <StyledTurningPagesButtonsContainer>
                <StyledTurningButton type='button' onClick={() => {
                    props.scrollBack();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }}>назад</StyledTurningButton>
                <p>{props.currentPage}</p>
                <StyledTurningButton type='button' onClick={() => {
                    props.scrollForward();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }}>вперед</StyledTurningButton>
            </StyledTurningPagesButtonsContainer>
        </>
    );
};

export default Main;
