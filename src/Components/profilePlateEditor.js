import React, {Component} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import {getToken} from '../tokenService';
import ImageSelect from './avatarSelect';
import avatar from '../img/Avatars/Avatar-1.svg'

const StyledContainer = styled.div`
    display: flex;
    width: 438px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    padding-bottom: 65px;
    margin-left: 65px;
    margin-top: 65px;
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
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
    width: 100%; /* Ширина формы */
    height: 850px;
    box-sizing: border-box;
    justify-content: flex-end;
`;

const StyledImg = styled.img`
    top: 10px;
    left: 10px;
    width: 100px;
    height: 100px;
    cursor: pointer;
`;

const Avatar = styled.img`
    position: absolute;
    width: 120px;
    height: 120px;
    left: 0;
    top: 0;
`;

const AvatarContainer = styled.div`
    border-radius: 100%;
    position: absolute;
    width: 100px;
    height: 100px;
    left: 20px;
    top: 20px;
    border: 3px solid black;
    overflow: hidden;
`;

const StyledMainInfoContainer = styled.div`
    position: absolute;
    top: 10px;
    width: 80%;
    right: 0;
    left: 115px;
`;

const StyledOtherInfoContainer = styled.div`
    position: absolute;
    top: 120px;
    width: 100%;
`;

const StyledP = styled.p`
    width: 95%;
    text-align: left;
    margin: 10px 20px 10px 20px;
    white-space: normal;
`;

const StyledButton = styled.button`
    background-color: white;
    color: black;
    border: 3px solid black; // Убираем стандартные границы
    border-top: none;
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 100%;
    height: 40px;
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;
    
    &:hover {
        cursor: pointer;
        color: white;
        background-color: black;
    }
`;

const StyledButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center; // Выравнивание элементов по центру по вертикали
`;

const StyledInput = styled.input.attrs({
    maxLength: 50,
})`
    font-size: 18px;
    background-color: white;
    border-bottom: 2px solid black;
    //padding-bottom: 1px;
    padding-left: 1px;
    width: 90%;
    height: 35px;
    box-sizing: border-box;
    margin-left: 20px;
    margin-top: 5px;
`;

const StyledDirection = styled.li`
    padding-right: 40px;
`;

const StyledSearch = styled.li`
    font-size: 18px;
    margin-top: 10px;
    margin-left: 20px;
`;


const StyledTextarea = styled.textarea.attrs({
    maxLength: 200,
})`
    background-color: white;
    border: 2px solid black;
    border-radius: 11px;
    padding: 10px;
    width: 90%;
    height: 180px;
    margin-left: 20px;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
`;


export default class profilePlateEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: this.props.thisFrame.firstName,
            lastName: this.props.thisFrame.lastName,
            fatherName: this.props.thisFrame.fatherName,
            institute: this.props.thisFrame.institute,
            studyDirection: this.props.thisFrame.studyDirection,
            course: this.props.thisFrame.course,
            skillLevel: this.props.thisFrame.skillLevel,
            profession: this.props.thisFrame.profession,
            searchAim: this.props.thisFrame.searchAim,
            about: this.props.thisFrame.about,
            teamSearchState: this.props.thisFrame.teamSearchState,
            TG_link: this.props.thisFrame.TG_link,
            VK_link: this.props.thisFrame.VK_link,
            mail: this.props.thisFrame.mail,
            what_want_from_command: this.props.thisFrame.what_want_from_command,
            showImageSelector: false,
            image_link: this.props.thisFrame.image_link,
        }

        this.handleImageSelect = this.handleImageSelect.bind(this);
    }

    handleImageSelect = (selectedImage) => {
        this.setState({showImageSelector: false});
        this.props.handleAvatar(selectedImage);
        this.setState({image_link: selectedImage});
    }

    render() {
        return (
            <StyledContainer>
                {this.state.showImageSelector && <ImageSelect handleImageSelect={this.handleImageSelect}/>}
                <StyledForm>
                    <AvatarContainer>
                        <Avatar className="Avatar" src={this.state.image_link ? this.state.image_link : avatar} onClick={() => this.setState({ showImageSelector: true })}/>
                    </AvatarContainer>
                    <StyledMainInfoContainer>
                        <StyledInput placeholder='Фамилия' value={this.state.lastName} style={{width: "40%", height: "30px"}} onChange={(e) => {this.setState({lastName: e.target.value})}}></StyledInput>
                        <StyledInput placeholder='Имя' value={this.state.firstName} style={{width: "34%", height: "30px"}} onChange={(e) => {this.setState({firstName: e.target.value})}}></StyledInput>
                        <ul>
                            <StyledDirection>
                                <StyledInput placeholder='Роль в команде' value={this.state.profession} onChange={(e) => this.setState({profession: e.target.value})}></StyledInput>
                            </StyledDirection>
                            <StyledSearch>
                                <input
                                    type="checkbox"
                                    checked={this.state.teamSearchState}
                                    onChange={(e) => this.setState({teamSearchState: e.target.checked})}
                                />
                                В поисках команды
                            </StyledSearch>
                        </ul>


                    </StyledMainInfoContainer>
                    <StyledOtherInfoContainer>
                        <StyledInput placeholder='Институт' value={this.state.institute}
                                     onChange={(e) => this.setState({institute: e.target.value})}></StyledInput>
                        <StyledInput placeholder='Направление обучения' value={this.state.studyDirection}
                                     onChange={(e) => this.setState({studyDirection: e.target.value})}></StyledInput>
                        <StyledInput placeholder='Курс' value={this.state.course}
                                     onChange={(e) => this.setState({course: e.target.value})}></StyledInput>
                        <StyledInput placeholder='Уровень навыка' value={this.state.skillLevel}
                                     onChange={(e) => this.setState({skillLevel: e.target.value})}></StyledInput>
                        <StyledInput placeholder='Цель поиска команды' value={this.state.searchAim}
                                     onChange={(e) => this.setState({searchAim: e.target.value})}></StyledInput>
                        <StyledP>О себе</StyledP>
                        <StyledTextarea value={this.state.about}
                                        onChange={(e) => this.setState({about: e.target.value})}></StyledTextarea>
                        <StyledP>Что хочу от команды</StyledP>
                        <StyledTextarea value={this.state.what_want_from_command}
                                        style={{height: "110px"}} onChange={(e) => {
                            this.setState({what_want_from_command: e.target.value})
                        }}></StyledTextarea>
                        <StyledInput placeholder='Ссылка на ТГ' value={this.state.TG_link}
                                     onChange={(e) => this.setState({TG_link: e.target.value})}></StyledInput>
                        <StyledInput placeholder='Ссылка на ВК' value={this.state.VK_link}
                                     onChange={(e) => this.setState({VK_link: e.target.value})}></StyledInput>
                        <StyledInput placeholder='Контактная почта' value={this.state.mail}
                                     onChange={(e) => this.setState({mail: e.target.value})}></StyledInput>
                    </StyledOtherInfoContainer>
                </StyledForm>
                <StyledButtonContainer>
                    <StyledButton onClick={() => {
                        const token = getToken();
                        if (token) {
                            axios.patch('http://127.0.0.1:5000/update_user', {
                                "firstName": this.state.firstName,
                                "lastName": this.state.lastName,
                                "fatherName": this.state.fatherName,
                                "institute": this.state.institute,
                                "studyDirection": this.state.studyDirection,
                                "course": this.state.course,
                                "skillLevel": this.state.skillLevel,
                                "profession": this.state.profession,
                                "searchAim": this.state.searchAim,
                                "about": this.state.about,
                                "what_want_from_command": this.state.what_want_from_command,
                                "teamSearchState": this.state.teamSearchState,
                                "TG_link": this.state.TG_link,
                                "VK_link": this.state.VK_link,
                                "mail": this.state.mail,
                                "fillPercentage": "123",
                                "image_link": this.state.image_link,
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                                .then(response => {
                                    console.log(response.data);
                                    this.props.makeEditing();
                                    this.props.onUpdateUsers();
                                    this.props.onUpdateThisFrame(getToken());
                                    console.log("123po")
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        }
                    }}>сохранить</StyledButton>
                </StyledButtonContainer>
            </StyledContainer>
        )
    }
}
