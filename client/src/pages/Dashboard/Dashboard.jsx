import React from 'react'
import SwimLane from '../../components/SwimLane/SwimLane'
import './Dashboard.scss';

const Dashboard = ({ setAuth }) => {
  return (
    <div className="dashboard-page-container">
      <h1 className="dashboard-title">#KANBAN</h1>
      <div className="kanban-container">
        <SwimLane type="available" />
        <SwimLane type="low" />
        <SwimLane type="out" />
      </div>
    </div>
  )
}

export default Dashboard