import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                          'Authorization': `Bearer ${this.props.token}`
                        }
                      }).then(response => {
                        console.log(response.data);
                        this.props.updateThisFrame(this.props.token);
                      })
                }}>
                Добавить</button>
            </Link>
        </>
    )
  }
}
