import React, { Component } from 'react'

export default class registration extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: "",
            password: "",
            repeated_password: ""
        }
    }
    render() {
        return (
            <form>
                <input placeholder='email' onChange={(e) => this.setState({email: e.target.value})} />
                <input placeholder='password' onChange={(e) => this.setState({password: e.target.value})} />
                <input placeholder='repeat password' onChange={(e) => this.setState({repeated_password: e.target.value})} />
                <button type="button" onClick={() => {
                    if (this.state.password === this.state.repeated_password
                        && this.state.email.includes('@'))
                        this.props.onLogIn()
                    else
                        console.log("bad")
                }}>
                зарегистрироваться</button> 
            </form>
        )
    }
}
