import React from "react"
import * as ReactDOMClient from "react-dom/client"
import './css/style.css'

class Profile extends React.Component {
    render () {
      return (
        <body>
          <header className="header">
            <a href="#" className = "Logo"><img src={logo} width={200} height={69} /></a>
            <a href="#"><p className = "PublishProject"> Опубликовать проект</p></a>
            <a href="#" className = "Notification"><img className = "Notification" src={notification} width={45} /></a>
            <a href="#" className="Avatar"><img className="Avatar" src={avatar} width={90} /></a>
          </header>
          <main>
            <p>POEEEEV PELMENY</p>
          </main>
        </body>
      )
    }
  } 

console.log(123)
const app = ReactDOMClient.createRoot(document.getElementById("app"))

app.render(<Profile />)