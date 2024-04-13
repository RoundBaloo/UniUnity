import React from "react";
import Frame from './frame.js'

class Frames extends React.Component {
    render() {
        return (
            <div className="frames-container">
                {this.props.frames.map((frame) => (
                    <Frame 
                    key={frame.id} 
                    frame={frame}
                    frames={this.props.frames} />
                ))}
            </div>
        );
    }
}

export default Frames;
