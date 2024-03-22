import React from 'react'
import { swimLaneColor, swimLaneTitle } from '../../utilities/utilities'
import './SwimLane.scss';

const SwimLanes = ({ type }) => {
  return (
    <div className="swim-lane-container">
      <div className={`swim-lane-title ${swimLaneColor(type)}`}>{swimLaneTitle(type)}</div>
      <div className={`swim-lane-content-container ${swimLaneColor(type)}`}>{type}</div>
    </div>
  )
}

export default SwimLanes