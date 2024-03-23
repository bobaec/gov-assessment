import React, { useState } from 'react'
import './Paints.scss';
import SingleUpdatePaintModal from '../Modals/SingleUpdatePaintModal';
import { canUpdateInventory } from '../../utilities/utilities';
import { useAuth } from '../../contexts/AuthContext';

const Paints = ({ paint }) => {
  const [showPaintModal, setShowPaintModal] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <div className={`paint-container ${paint.color.toLowerCase()}`} style={{color: paint.color === 'Black' ? 'white' : 'black'}} onClick={() => setShowPaintModal(true)}>
          <div className="paint-color">{paint.color}</div>
          <div className="paint-quantity">Quantity: {paint.quantity}</div>
      </div>
      {canUpdateInventory(user.role_id) ? <SingleUpdatePaintModal show={showPaintModal} setShow={setShowPaintModal} paint={paint} /> : null}
    </>
    
  )
}

export default Paints