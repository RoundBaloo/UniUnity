import React from "react"
import * as ReactDOMClient from "react-dom/client"
import './css/style.css'
import logo from './img/LogoPlaceholder.png'
import notification from './img/NotificationButton.svg'
import avatar from './img/avatarPlaceholder.jpg'
import Frames from './Components/frames.js'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Pages/profile'
import Main from './Pages/main'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        frames: [
        ],
        isLoggedIn: false
    }

    this.AddFrame = this.AddFrame.bind(this)
    this.MakeLoggedIn = this.MakeLoggedIn.bind(this)
  }
  render () {
    return (
      <Router>
        <>
            <header className="header">
              <Link to="/" className = "Logo"><img src={logo} width={200} height={69} /></Link>
              <a href="#"><p className = "PublishProject"> Опубликовать проект</p></a>
              <a href="#" className = "Notification"><img className = "Notification" src={notification} width={45} /></a>
              <Link to="/profile" className="Avatar">
                <img className="Avatar" src={avatar} width={90} />
              </Link>
            </header>
            {this.state.isLoggedIn 
            ? (<p>Вы молодец</p>) : (<p>Зарегестрируйтесь пожалуйста или войдите в аккаунт</p>)}  
            <Routes>
              <Route exact path="/" element={<Main frames={this.state.frames} onAdd={this.AddFrame}/>} />
              <Route exact path="/profile" element={<Profile frames={this.state.frames} onLogIn={this.MakeLoggedIn} onAdd={this.AddFrame}/>} />
            </Routes>
        </>
        </Router>
    )
  }

  AddFrame(frame){
    const id = this.state.frames.length + 1
    const specialization = "deafault"
    const isLookinForTeam = true

    this.setState({frames: [...this.state.frames, {id, ...frame, specialization, isLookinForTeam }]})
  }

  MakeLoggedIn(){
    this.setState({isLoggedIn: true})
  }
} 

const app = ReactDOMClient.createRoot(document.getElementById("app"))

app.render(<App />)