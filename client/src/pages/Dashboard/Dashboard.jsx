import React, { useEffect, useState } from 'react'
import { PaintsProvider } from '../../contexts/PaintsProvider';
import SwimLane from '../../components/SwimLane/SwimLane'
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <PaintsProvider>
      <div className="dashboard-page-container">
        <h1 className="dashboard-title">Paint Inventory</h1>
        <div className="kanban-container">
          <SwimLane type="available" />
          <SwimLane type="low" />
          <SwimLane type="out" />
        </div>
      </div>
    </PaintsProvider>
    
  )
}

export default Dashboard