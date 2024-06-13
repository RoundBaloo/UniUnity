import React, { Component } from 'react'
import LinkPlate from './linkPlate'

export default class linkPlates extends Component {
  render() {
    if (!this.props.linkPlates) {
      return <div>Loading...</div>;
    }
    return (
        <>
            {this.props.linkPlates.map((linkPlate) => (
                <LinkPlate 
                key={linkPlate.id} 
                linkPlate={linkPlate}
                updateCurrentProjectId={this.props.updateCurrentProjectId}
                isOwner={this.props.isOwner} />
            ))}
        </>
    )
  }
}
