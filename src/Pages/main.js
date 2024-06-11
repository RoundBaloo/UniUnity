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
    position: absolute;
    top: 0px;
    text-align: left;
    width: 420px;
    border: 3px solid black;
    border-radius: 23px;
    margin-top: 44px;
    margin-left: 65px;
    margin-bottom: 100px;
    cursor: pointer;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(5px);
    z-index: 1;
    transition: height 2s;
`;

const FilterContainer2 = styled.div`
    display: flex;
`;

const FilterButtonP = styled.div`
    font-size: 18px;
    margin:0;
    margin-top: 44px;
    height: 50px;
    width: 360px;
    border: 3px solid black;
    border-radius: 31px;
    margin-left: 65px;
    padding-left: 40px;
    padding-top: 12px;
`;

const FilterButtonPHidden = styled.div`
    /*костыль жесткий:(*/
    height: 94px;
    width: 360px;
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
    padding: 25px;
    padding-bottom: 0;
    border-right: 3px solid black;
`;

const RightColumn = styled.div`
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 18px;
    padding-bottom: 0;
`;

const StyledUlLeft = styled.ul`
    list-style-type: none;
    font-weight: bold;
    & > li {
        font-size: 20px;
        line-height: 17.5px;
        margin-bottom: 34px;
    }
`;

const StyledUlRight = styled.ul`
    list-style-type: none;
    font-weight: bold;
    & > li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        font-size: 18px;
        line-height: 15px;
        border: 2px solid black;
        border-radius: 15px;
        width: 200px;
        height: 32px;
        padding-left: 10px
    }

    & > li:first-child {
        width: 56px;
    }

    & > li:last-child {
        width: 56px;
    }
`;

const FilterWrapper = styled.div`
    position: relative;
    width: 400px;
`;

const CheckBox = styled.input`
    width: 20px;
    height: 20px;
    margin-left: 6px;
`;

const SaveFiltersButton = styled.button`
    width: 100%; 
    position: relative;
    border-top: 3px solid black;
    text-align: left;
    padding: 18px;
    padding-left: 25px;
    font-size: 20px;
    &:hover {
        background-color: black;
        color: white;
    }
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
        if (latest > previous && latest > 300) {
            setHidden(true);
        }
        else {
            setHidden(false);
        }
    });

    const [isFilterVisible, setIsFilterVisible] = useState(false); // Новое состояние


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
            transition={{duration: 0.8, ease: "easeInOut"}}>
                {!props.onLogIn && <NewUserAgitation onGoToin={goToIn} onMakeRegistration={props.onMakeRegistration}
                                                     onMakeNonRegistration={props.onMakeNonRegistration}/>}
            </motion.div>
            <FilterWrapper>
                {isFilterVisible ? (
                    <div>
                    <FilterContainer>
                        <FilterContainer2>
                            <LeftColumn>
                                <StyledUlLeft>
                                    <li>Курс</li>
                                    <li>Институт</li>
                                    <li>Направление</li>
                                    <li>Профессия</li>
                                    <li>Поиск команды</li>
                                </StyledUlLeft>
                            </LeftColumn>
                            <RightColumn>
                                <StyledUlRight>
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
                                    <li><input placeholder="" onChange={(e) => {
                                        setInstituteFilter(e.target.value)
                                    }}></input></li>
                                    <li>
                                        <input placeholder="" onChange={(e) => {
                                            setStudyDirectionFilter(e.target.value)
                                        }}>
                                        </input>
                                    </li>
                                    <li>
                                        <input placeholder="" onChange={(e) => {
                                            setprofessionFilter(e.target.value)
                                        }}></input>
                                    </li>
                                    <li>
                                        <CheckBox
                                            type="checkbox"
                                            onChange={(e) => {
                                                setTeamSearchStateFilter(e.target.checked)
                                            }}/>
                                    </li>
                                </StyledUlRight>
                            </RightColumn>

                        </FilterContainer2>

                        <SaveFiltersButton type='button' onClick={(e) => {
                            props.updateFilters({
                                institute: instituteFilter,
                                studyDirection: studyDirectionFilter,
                                course: courseFilter,
                                profession: professionFilter,
                                skillLevel: skillLevelFilter,
                                teamSearchState: teamSearchStateFilter
                            });
                            setIsFilterVisible(false);
                        }}>Сохранить фильтры
                        </SaveFiltersButton>
                    </FilterContainer>
                    <FilterButtonPHidden></FilterButtonPHidden></div>
                ) : (
                    <FilterButtonP onClick={() => setIsFilterVisible(true)}>Фильтр и поиск</FilterButtonP>
                )}
            </FilterWrapper>


            {/*<FilterContainer>
                <FilterButtonP>Фильтр и поиск</FilterButtonP>
                <LeftColumn>
                    <ul>
                        <--!dfghgh!--><li>Курс</li>
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
                    props.updateFilters({
                        institute: instituteFilter,
                        studyDirection: studyDirectionFilter,
                        course: courseFilter,
                        profession: professionFilter,
                        skillLevel: skillLevelFilter,
                        teamSearchState: teamSearchStateFilter
                    })
                }}>сохранить фильтры
                </button>
            </FilterContainer>*/}


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
