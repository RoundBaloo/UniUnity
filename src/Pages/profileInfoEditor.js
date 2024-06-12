import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class profileInfoEditor extends Component {
    constructor(props) {
        super(props);
        const { thisProject } = props;
        const defaultProject = {
            name: '',
            description: '',
            type: '' 
        };
        const actualProject = thisProject || defaultProject; 

        this.state = {
            name: actualProject.name,
            description: actualProject.description,
            type: actualProject.type
        };
    }
  render() {
    return (
        <>
            <input value={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}} />
            <input value={this.state.description} onChange={(e) => {this.setState({description: e.target.value})}} />
            <input value={this.state.value} onChange={(e) => {this.setState({type: e.target.value})}} />
            <Link to={'/projectPage'}>
                <button type='button' onClick={(e) => {
                    axios.put(`http://127.0.0.1:5000/update_project/${this.props.thisProject.id}`, {
                        name: this.state.name,
                        type: this.state.type,
                        description: this.state.description
                      }).then(res => {
                        console.log('success')
                        this.props.updateCurrentProjectId(this.props.thisProject.id);
                    })
                }}>изменить</button>
            </Link>
        </>
    )
  }
}
