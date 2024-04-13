import React from "react"
import '../css/style.css'
import avatar from '../img/avatarPlaceholder.jpg'

class Frame extends React.Component {
    render () {  
        const { frame } = this.props;
        console.log(frame)
        return (
            <div className = "Frame">
                <a className="Avatar Bigger"><img className="Avatar Bigger" src={avatar} width={210} height={210}/></a>
                <p className = "UserName">{frame.lastName} {frame.firstName}</p>
                <ul>
                    <li className = "Direction">{frame.profession}</li>
                    <li className="Search">{frame.teamSearchState ? 
                        <span className="Search InSearch">В поисках команды</span> 
                        : <span className="NotInSearch">Не ищет команду</span>}
                    </li>
                </ul>
                <ul>
                    <li>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="naming">Институт</div>
                            <div className="description">{frame.institute}</div>
                        </div>
                    </li>
                    <li>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="naming">Направление</div>
                            <div className="description">{frame.studyDirection}</div>
                        </div>
                    </li>
                    <li>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="naming">Курс</div>
                            <div className="description">{frame.course}</div>
                        </div>
                    </li>
                    <li>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="naming">Уровень</div>
                            <div className="description">{frame.skillLevel}</div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    } 
}

export default Frame