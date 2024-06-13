import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import FileLoader from "../Components/fileLoader"


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


export default class profileInfoEditor extends Component {
    constructor(props) {
        super(props);
        const {thisProject} = props;
        const defaultProject = {
            name: '',
            description: '',
            type: '',
            project_link: ''
        };
        const actualProject = thisProject || defaultProject;

        this.state = {
            name: actualProject.name,
            description: actualProject.description,
            type: actualProject.type,
            project_link: actualProject.project_link
        };
    }

    render() {
        console.log(this.state.project_link)
        return (
            <>
                <StyledContainer>
                    <FileLoader onImageUpload={(file) => console.log(file)} />
                    <StyledForm>
                        <Input>
                            <input style={{width:'100%'}} placeholder='Название проекта' value={this.state.name} onChange={(e) => {
                                this.setState({name: e.target.value})
                            }}/>
                        </Input>
                        <InputDescription
                            placeholder='Опишите проект'
                            value={this.state.description}
                            onChange={(e) => this.setState({description: e.target.value})}
                        />
                        <Input>
                            <input style={{width:'100%'}} placeholder='Добавьте ссылку'
                                   value={this.state.project_link}
                                   onChange={(e) => this.setState({project_link: e.target.value})}/>
                        </Input>
                        <Input>
                            <input style={{width:'100%'}} placeholder='Тип проекта' value={this.state.value} onChange={(e) => {
                                this.setState({type: e.target.value})
                            }}/>
                        </Input>
                    </StyledForm>
                    <Link to={'/projectPage'}>
                        <StyledButton>
                            <button type='button' onClick={(e) => {
                                axios.put(`http://127.0.0.1:5000/update_project/${this.props.thisProject.id}`, {
                                    name: this.state.name,
                                    type: this.state.type,
                                    description: this.state.description,
                                    project_link: this.state.project_link
                                }).then(res => {
                                    this.props.updateCurrentProjectId(this.props.thisProject.id);
                                })
                            }}>изменить
                            </button>
                        </StyledButton>
                    </Link>
                </StyledContainer>
            </>
        )
    }
}
