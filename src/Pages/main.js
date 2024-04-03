import React, {Component} from "react"
import * as ReactDOMClient from "react-dom/client"
import '../css/style.css'
import logo from '../img/LogoPlaceholder.png'
import notification from '../img/NotificationButton.svg'
import avatar from '../img/avatarPlaceholder.jpg'
import Frames from '../Components/frames.js'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './profile.js'

export default class Main extends Component {
  render () {
    return (
      <>
        <main>
            <div className="Filter">
              <p className="button-text">Фильтр и поиск</p>
            </div>
            <Frames frames={this.props.frames}/>
          </main>
      </>
    )
  }
}