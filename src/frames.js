import React from "react";
import Frame from './frame.js'

class Frames extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            frames: [
                {
                    id: 0,
                    firstName: "Имя",
                    secondName: "Фамилия",
                    specialization: "UX-дизайнер",
                    isLookinForTeam: true,
                    info: "пожилой",
                    institute: "ИРИТ-РТФ",
                    direction: "Программная инженерия",
                    year: 1,
                    skill: "Junior"
                },
                {
                    id: 1,
                    firstName: "Вася",
                    secondName: "Программистов",
                    specialization: "UX-дизайнер",
                    isLookinForTeam: false,
                    info: "очень пожилой",
                    institute: "ИРИТ-РТФ",
                    direction: "Программная инженерия",
                    year: 0,
                    skill: "Senior"
                },
                {
                    id: 2,
                    firstName: "Сквайр",
                    secondName: "Трелони",
                    specialization: "Землевладелец",
                    isLookinForTeam: true,
                    info: "Характер отсутствует",
                    institute: "ИРИТ-РТФ",
                    direction: "Программная инженерия",
                    year: 1984,
                    skill: "Отсутствует"
                }
            ]
        }
    }
    render () {
        return (
            <div className="frames-container">
                {this.state.frames.map((frame) => (
                    <Frame 
                    key={frame.id} 
                    frame={frame} />
                ))}
            </div>
        )
    }
}

export default Frames