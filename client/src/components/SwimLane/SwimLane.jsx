import React from 'react'
import { swimLaneColor, swimLaneTitle } from '../../utilities/utilities'
import { usePaints } from '../../contexts/PaintsProvider';
import './SwimLane.scss';
import Paints from '../Paints/Paints';

const SwimLanes = ({ type }) => {
  const { sortedPaints } = usePaints();
  const paintInventory = sortedPaints[type];

  return (
    <div className="swim-lane-container">
      <div className={`swim-lane-title ${swimLaneColor(type)}`}>{swimLaneTitle(type)}</div>
      <div className={`swim-lane-content-container ${swimLaneColor(type)}`}>
        {paintInventory?.map((paint, index) => {
          return (
            <div className="paints-container" key={index}>
              <Paints paint={paint} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SwimLanes