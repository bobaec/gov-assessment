import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '../../contexts/AuthContext';
import './Admin.scss';
import { userRole } from '../../utilities/utilities';
import AdminModal from '../../components/Modals/AdminModal';

const Admin = () => {
    const { getAllUsers, allUsers } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [editType, setEditType] = useState("");
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getAllUsers();
    }, [])

    const onEnabledChange = async (e, user) => {
        try {
            const result = await fetch("/admin/enable-or-disable-user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({userId: user.user_id, isEnabled: !user.is_enabled}),
            });
            const response = await result.json();
            if (!response.success) {
                throw new Error('Could not update user');
            }
            getAllUsers();
        } catch (error) {
            console.log('onEnabledChange', error.message);
        }
    }

    const onRoleChange = async (e, user) => {
        try {
            const result = await fetch("/admin/change-role", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({userId: user.user_id, role: e.toLowerCase()})
            });
            const response = await result.json();
            if (!response.success) {
                throw new Error('Could not update user');
            }
            getAllUsers();
        } catch (error) {
            console.log('onRoleChange', error.message);
        }
    }

    const onUserInfoChange = async (user, type) => {
        setShowModal(true);
        setEditType(type);
        setUserInfo(user);
    }

    return (
        <div className="admin-page-container">
            <h1>Admin</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Enabled</th>
                    </tr>
                </thead>
                <tbody className="admin-table-body-container">
                    {allUsers.length > 0 && allUsers?.map((user) => {
                    return (
                        <tr className="admin-table-row-container" key={user.user_id}>
                            <td>
                                {user.user_id}
                            </td>
                            <td>
                                {user.user_name}
                                <FontAwesomeIcon icon={faEdit} onClick={() => onUserInfoChange(user, "name")}/>
                            </td>
                            <td>
                                {user.user_email}
                                <FontAwesomeIcon icon={faEdit} onClick={() => onUserInfoChange(user, "email")}/>

                            </td>
                            <td className="admin-table-data-role-container">
                                <DropdownButton id="dropdown-basic-button" title={userRole(user.role_id)} onSelect={(e) => onRoleChange(e, user)} >
                                    <Dropdown.Item active={userRole(user.role_id) === "Administrator"} eventKey="1">Administrator</Dropdown.Item>
                                    <Dropdown.Item active={userRole(user.role_id) === "Manager"} eventKey="2">Manager</Dropdown.Item>
                                    <Dropdown.Item active={userRole(user.role_id) === "Painter"} eventKey="3">Painter</Dropdown.Item>
                                    <Dropdown.Item active={userRole(user.role_id) === "Viewer"} eventKey="4">Viewer</Dropdown.Item>
                                </DropdownButton>
                            </td>
                            <td><input type="checkbox" checked={user.is_enabled} onChange={(e) => onEnabledChange(e.target.value, user)}></input></td>
                        </tr>                        
                        )
                    })}
                </tbody>
            </Table>
            <AdminModal show={showModal} setShow={setShowModal} userInfo={userInfo} editType={editType} onSave={getAllUsers} />
        </div>
    )
}

export default Admin