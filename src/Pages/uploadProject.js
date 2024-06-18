import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {getToken} from '../tokenService';
import styled from "styled-components";
import arrow from '../img/arrowLeft.svg'
import arrowActive from '../img/arrowLeftActive.svg'

const projects = 'http://127.0.0.1:5000/post_project';

const StyledContainer = styled.div`
    display: flex;
    width: 438px;
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-left: 65px;
    margin-bottom: 20px;
`;

const StyledForm = styled.form`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    gap: 20px; /* Расстояние между элементами формы */
    border: 3px solid black;
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
    width: 100%; /* Ширина формы */
    height: 100%;
    box-sizing: border-box;
    justify-content: flex-end;
    padding-top: 25px;
    padding-bottom: 20px;
`;

const StyledButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center; // Выравнивание элементов по центру по вертикали
`;

const StyledButton = styled.button`
    background-color: white;
    color: black;
    border: 3px solid black; // Убираем стандартные границы
    border-top: none;
    outline: none; // Убираем стандартный контур при фокусе
    box-shadow: none;
    width: 438px;
    height: 47px;
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;

    &:hover {
        cursor: pointer;
        color: white;
        background-color: black;
    }
`;

const Input = styled.p`
    align-self: flex-start;
    margin-left: 22px;
    border-bottom: 2px solid black;
    padding-bottom: 2px;
    width: 90%;
`;

const InputDescription = styled.textarea`
    align-self: flex-start;
    margin-left: 22px;
    border: 2px solid black;
    border-radius: 11px;
    width: 90%;
    height: 160px;
    resize: none;
    padding-top: 7px;
    padding-left: 9px;
`;

const StyledP = styled.p`
    color: ${props => props.color};
    font-size: 23px;
    margin-right: auto;
    margin-bottom: 15px;
`;

const StyleButton = styled.button`
    margin-bottom: 10px;
`;

const uploadImageToServer = (file, projectId) => {
    const formData = new FormData();
    formData.append('files[]', file);
  
    try {
      const response = axios.post(`http://127.0.0.1:5000/add_image_for_project/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

export default class uploadProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: "",
            name: "",
            project_link: "",
            type: "",
            id: 0,
            file: null,
            isHovered: false,
            isUploaded: false,
        }
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file ||!/\.(png)$/i.test(file.name)) {
            this.setState({errorMessage: 'Используйте ТОЛЬКО png формат'});
        } else {
            this.setState({file});
            this.setState({errorMessage: ''});
        }
    };


    render() {
        const token = getToken();
        return (
            <StyledContainer>
                <Link to="/profile">
                    <StyleButton
                        onMouseOver={() => this.setState({isHovered: true})} // обработчик наведения мыши
                        onMouseOut={() => this.setState({isHovered: false})} // обработчик убирания мыши
                    >
                        <img src={this.state.isHovered ? arrowActive : arrow} />
                        {/* выбор изображения в зависимости от состояния */}
                    </StyleButton>
                </Link>
                <StyledForm>
                    <Input>
                        <input placeholder='Название проекта' onChange={(e) => this.setState({name: e.target.value})}/>
                    </Input>
                    <InputDescription placeholder='Опишите проект'
                                      onChange={(e) => this.setState({description: e.target.value})}/>
                    <Input>
                        <input placeholder='Добавьте ссылку'
                               onChange={(e) => this.setState({project_link: e.target.value})}/>
                    </Input>
                    <Input>
                        <input placeholder='Тип проекта' onChange={(e) => this.setState({type: e.target.value})}/>
                    </Input>
                    {this.state.file ? null : <StyledP style={{margin: '0 22px 0'}} color='red'>Загрузите картинку, описывающую проект</StyledP>}
                    {this.state.isUploaded ? <StyledP style={{margin: '0 auto 0 22px'}} color='green'>Проект успешно добавлен</StyledP> : null}
                    <StyledP style={{marginRight: 'auto', marginLeft: '22px'}}>Загружайте только png картинки!</StyledP>
                    <div style={{padding: '0 22px 0', width: '438px'}}>
                        <input type="file" accept="image/png" onChange={this.handleFileChange}/>
                        {this.state.errorMessage && <StyledP color='red'>{this.state.errorMessage}</StyledP>}
                    </div>
                </StyledForm>

                    <StyledButton>
                    <button type='button' onClick={() => {
                        if (this.state.file && !this.state.isUploaded) {
                            this.props.updateLastProjectId();
                            axios.post(projects, {
                                "name": this.state.name,
                                "type": this.state.type,
                                "description": this.state.description,
                                "project_link": this.state.project_link
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            }).then(response => {
                                console.log(response.data.project_id);
                                this.props.updateThisFrame(token);
                                this.setState({id: response.data.project_id});
                                uploadImageToServer(this.state.file, response.data.project_id);
                                this.setState({isUploaded: true})
                            })
                        }
                        }}>
                            Добавить проект
                        </button>
                    </StyledButton>
            </StyledContainer>
        )
    }
}
