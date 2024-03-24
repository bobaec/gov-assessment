import React, { useState } from 'react'
import './Paints.scss';
import SingleUpdatePaintModal from '../Modals/SingleUpdatePaintModal';
import { canOrderBulk, canUpdateInventory } from '../../utilities/utilities';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faMinus,
    faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { usePaints } from '../../contexts/PaintsProvider';
const Paints = ({ paint }) => {
  const [showPaintModal, setShowPaintModal] = useState(false);
  const { user } = useAuth();
  const { getPaints } = usePaints();

  const addByOne = async (color) => {
    try {
      const result = await fetch("/paints/update-add-by-one", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({color})
      });
      getPaints();
    } catch (error) {
      console.log('addByOne', error.message);
    }
  }

  const subtractByOne = async (color) => {
    try {
      const result = await fetch("/paints/update-subtract-by-one", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({color})
      })
      getPaints();
    } catch (error) {
      console.log('addByOne', error.message);
    }
  }

  return (
    <>
      <div className={`paint-container ${paint.color.toLowerCase()}`} style={{color: paint.color === 'Black' ? 'white' : 'black'}}>
          <div className="paint-color">
            <div className="paint-color-title">{paint.color}</div>
            {canUpdateInventory(user.role_id) ? <span><FontAwesomeIcon icon={faSquareArrowUpRight} onClick={() => setShowPaintModal(true)}/></span> : null}
            </div>
          <div className="paint-quantity">Quantity: {paint.quantity}</div>
          {canUpdateInventory(user.role_id) ? <div className="button-containers">
            <FontAwesomeIcon icon={faMinus} onClick={() => subtractByOne(paint.color)}/>
            <FontAwesomeIcon icon={faPlus} onClick={() => addByOne(paint.color)}/>
          </div> : null}
      </div>
      {canUpdateInventory(user.role_id) ? <SingleUpdatePaintModal show={showPaintModal} setShow={setShowPaintModal} paint={paint} /> : null}
    </>
    
  )
}

export default Paints