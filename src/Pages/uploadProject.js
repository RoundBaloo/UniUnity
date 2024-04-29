import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken } from '../tokenService';

const projects = 'http://127.0.0.1:5000/post_project';


export default class uploadProject extends Component {
    constructor(props){
        super(props)
        this.state ={
            description: "",
            name: "",
            project_link: "",
            type: ""
        }
    }

  render() {
    const token = getToken();
    return (
        <>
            <input placeholder='description' onChange={(e) => this.setState({description: e.target.value})} />
            <input placeholder='name' onChange={(e) => this.setState({name: e.target.value})} />
            <input placeholder='project_link' onChange={(e) => this.setState({project_link: e.target.value})} />
            <input placeholder='type' onChange={(e) => this.setState({type: e.target.value})} />
            <Link to="/profile">
                <button type='button' onClick={() => {
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
                        console.log(response.data);
                        this.props.updateThisFrame(token);
                      })
                }}>
                Добавить</button>
            </Link>
        </>
    )
  }
}
