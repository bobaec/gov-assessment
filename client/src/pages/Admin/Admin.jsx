import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAuth } from '../../contexts/AuthContext';
import './Admin.scss';
import { userRole } from '../../utilities/utilities';

const Admin = () => {
    const { allUsers } = useAuth();

    return (
        <div className="admin-page-container">
            <h1>Admin</h1>
            <div className="admins-container">
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Enabled</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user) => {
                    return (
                        <tr key={user.user_id}>
                            <td>
                                {user.user_id}
                            </td>
                            <td>
                                {user.user_name}
                            </td>
                            <td>
                                {user.user_email}
                            </td>
                            <td>
                                {userRole(user.role_id)}
                            </td>
                            <td>checkbox</td>
                        </tr>                        
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Admin