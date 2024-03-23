import React, { useEffect, useState } from 'react'
import { PaintsProvider } from '../../contexts/PaintsProvider';
import SwimLane from '../../components/SwimLane/SwimLane';

import './Dashboard.scss';
import BulkUpdatePaintsModal from '../../components/Modals/BulkUpdatePaintsModal';
import { useAuth } from '../../contexts/AuthContext';
import { canOrderBulk } from '../../utilities/utilities';

const Dashboard = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  
  return (
    <PaintsProvider>
      <div className="dashboard-page-container">
        <h1 className="dashboard-title">Paint Inventory</h1>
        <div className="kanban-container">
          <SwimLane type="available" />
          <SwimLane type="low" />
          <SwimLane type="out" />
        </div>
        {canOrderBulk(user.role_id) ? <div className="bulk-update-and-modal-container">
          <div className="bulk-update-container" onClick={() => setShowModal(true)}>Bulk Update</div>
          <BulkUpdatePaintsModal showModal={showModal} setShowModal={setShowModal}/>
        </div> : null}
      </div>
    </PaintsProvider>
    
  )
}

export default Dashboard