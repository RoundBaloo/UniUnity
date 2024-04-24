import React, { Component } from 'react'
import LinkPlate from './linkPlate'

export default class linkPlates extends Component {
  render() {
    return (
        <>
            {this.props.linkPlates.map((linkPlate) => (
                <LinkPlate 
                key={linkPlate.id} 
                linkPlate={linkPlate} />
            ))}
        </>
    )
  }
}
