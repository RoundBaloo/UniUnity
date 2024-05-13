import React from 'react';
import '../css/style.css'
import Frames from '../Components/frames.js'
import NewUserAgitation from '../Components/newUserAgitation.js'
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';


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
    height: 44px;
    width: 330px;
    border: 3px solid black;
    border-radius: 23px;
    margin-top: 44px;
    margin-left: 65px;
    margin-bottom: 0;
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

const Main = (props) => {
    const navigate = useNavigate();

    const goToIn = () => {
        navigate('/profile');
    }


    return (
        <>
            {!props.onLogIn && <NewUserAgitation onGoToin={goToIn} onMakeRegistration={props.onMakeRegistration}
                                                 onMakeNonRegistration={props.onMakeNonRegistration}/>}
            <FilterContainer>
                <FilterButtonP>Фильтр и поиск</FilterButtonP>
            </FilterContainer>
            <Frames frames={props.frames} updateUserId={props.updateUserId} onUpdateThisFrame={props.onUpdateThisFrame} updateThisFrameToOther={props.updateThisFrameToOther}/>
            <StyledTurningPagesButtonsContainer>
                <StyledTurningButton type='button' onClick={() => {
                    props.scrollBack();
                    window.scrollTo(0, 0);
                }}>назад</StyledTurningButton>
                <p>{props.currentPage}</p>
                <StyledTurningButton type='button' onClick={() => {
                    props.scrollForward();
                    window.scrollTo(0, 0);
                }}>вперед</StyledTurningButton>
            </StyledTurningPagesButtonsContainer>
        </>
    );
};

export default Main;
