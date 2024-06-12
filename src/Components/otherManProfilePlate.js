import React, {Component} from 'react'
import styled from 'styled-components';
import avatar from '../img/Avatars/Avatar-1.svg'

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 438px;
    height: 700px;
    margin-top: 65px;
    margin-left: 65px;
`;

const StyledForm = styled.form`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Расстояние между элементами формы */
    border: 3px solid black;
    padding: 20px;
    border-radius: 11px;
    width: 100%; /* Ширина формы */
    height: 100%;
    box-sizing: border-box;
    justify-content: flex-end;
    margin-bottom: 30px;
`;

const Avatar = styled.img`
    position: absolute;
`;

const AvatarContainer = styled.div`
    border-radius: 100%;
    position: absolute;
    top: 21px;
    left: 21px;
    width: 110px;
    height: 110px;
    border: 3px solid black;
    overflow: hidden;
`;

const StyledMainInfoContainer = styled.div`
    position: absolute;
    text-align: left;
    top: 34px;
    width: 80%;
    left: 153px;
    right: 0;
`;

const StyledOtherInfoContainer = styled.div`
    position: absolute;
    top: 150px;
    padding-right: 44px;
    padding-left: 22px;
`;

const StyledP = styled.p`
    width: 95%;
    text-align: left;
    white-space: normal;
    font-size: 18px;
    margin-bottom: 11px;
`;

const UserName = styled.p`
    font-size: 24px;
    font-weight: 400;
    text-align: left;
`;

const Direction = styled.li`
    margin-top: 8px;
    font-size: 15px;
    text-align: left;
    font-weight: 300;
    color: #6C6C6C;
`;

const Search = styled.li`
    text-align: left;
    margin-top: 8px;
`;

const InSearch = styled.span`
    font-size: 18px;
    font-weight: 300;
    color: #568c35;
`;

const NotInSearch = styled.span`
    font-size: 18px;
    font-weight: 300;
    color: red;
`;



export default class otherManProfilePlate extends Component {
    render() {
        const frame = this.props.thisFrame;
        if (!frame) {
            return <div>Loading...</div>; 
        }
        return (
            <StyledContainer>
                <StyledForm>
                    <AvatarContainer>
                        <Avatar src={frame.image_link ? frame.image_link : avatar}/>
                    </AvatarContainer>
                    <StyledMainInfoContainer>
                        <UserName>{frame.lastName} {frame.firstName}</UserName>
                        <ul>
                            <Direction>{frame.profession}</Direction>
                            <Search>{frame.teamSearchState ?
                                <InSearch>В поисках команды</InSearch>
                                : <NotInSearch>Не ищет команду</NotInSearch>}
                            </Search>
                        </ul>
                    </StyledMainInfoContainer>
                    <StyledOtherInfoContainer>
                        <StyledP>{frame.institute}</StyledP>
                        <StyledP>{frame.studyDirection}</StyledP>
                        <StyledP>{frame.course}</StyledP>
                        <StyledP>{frame.skillLevel}</StyledP>
                        <StyledP>Цель поиска: {frame.searchAim}</StyledP>
                        <StyledP>О себе</StyledP>
                        <StyledP>{frame.about}</StyledP>
                        <StyledP>Что хочу от команды</StyledP>
                        <StyledP>Хочу быть частью динамичной и технологичной продвинутой команды для создания
                            действительно проработанной визуальной новеллы.</StyledP>
                        <StyledP>{frame.TG_link}</StyledP>
                        <StyledP>{frame.VK_link}</StyledP>
                        <StyledP>{frame.mail}</StyledP>
                    </StyledOtherInfoContainer>
                </StyledForm>
            </StyledContainer>
        )
    }
}
