import React from "react"
import * as ReactDOMClient from "react-dom/client"
import './css/style.css'
import logo from './img/LogoPlaceholder.png'
import notification from './img/NotificationButton.svg'
import avatar from './img/avatarPlaceholder.jpg'
import Frame from './frame.js'
import Frames from './frames.js'

class App extends React.Component {
  render () {
    return (
      <body>
        <header className="header">
          <a href="#" className = "Logo"><img src={logo} width={200} height={69} /></a>
          <a href="#"><p className = "PublishProject"> Опубликовать проект</p></a>
          <a href="#" className = "Notification"><img className = "Notification" src={notification} width={45} /></a>
          <a href="profile.html" className="Avatar"><img className="Avatar" src={avatar} width={90} /></a>
        </header>
        <main>
          <div className="Filter">
            <p className="button-text">Фильтр и поиск</p>
          </div>
          <Frames />
        </main>
      </body>
    )
  }
} 

const app = ReactDOMClient.createRoot(document.getElementById("app"))

app.render(<App />)