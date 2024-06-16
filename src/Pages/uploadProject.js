import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {getToken} from '../tokenService';
import styled from "styled-components";
import FileLoader from "../Components/fileLoader"
import { v4 as uuidv4 } from 'uuid';

const projects = 'http://127.0.0.1:5000/post_project';

const StyledContainer = styled.div`
    display: flex;
    width: 438px;
    flex-direction: column;
    align-items: center;
    height: auto;
    padding-top: 65px;
    margin-left: 65px;
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
            file: null
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
                    <button type='button'>назад в профиль</button>
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
                </StyledForm>

                    <StyledButton>
                    <button type='button' onClick={() => {
                        if (this.state.file) {
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
                            })
                        }
                        }}>
                            Добавить проект
                        </button>
                    </StyledButton>
                {this.state.file ? null : <StyledP color='red'>Загрузите картинку, описывающую проект</StyledP>}
                <StyledP>Загружайте только png картинки!</StyledP>
                <div>
                    <input type="file" accept="image/png" onChange={this.handleFileChange}/>
                    {this.state.errorMessage && <StyledP color='red'>{this.state.errorMessage}</StyledP>}
                </div>
            </StyledContainer>
        )
    }
}
