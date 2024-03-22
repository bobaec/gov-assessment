import React from 'react'

const Dashboard = ({ setAuth }) => {
  return (
    <div className="dashboard-page-container">
      <h1>Dashboard</h1>
      <div className="kanban-container">
        
      </div>
      <button onClick={() => setAuth(false)}>Logout</button>
    </div>
  )
}

export default Dashboard