import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminModal = ({ show, setShow, userInfo, editType, onSave}) => {
    const [currentValue, setCurrentValue] = useState("");

    useEffect(() => {
        if (editType === 'name') {
            setCurrentValue(userInfo.user_name)
        } else if (editType ==='email') {
            setCurrentValue(userInfo.user_email);
        }
    }, [userInfo]);

    const updateUserInfo = async () => {
        // takes in editType to to update either name or email in the administrator's page
        try {
            const result = await fetch(`/admin/update-${editType}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({userId: userInfo.user_id, [editType]: currentValue}),
            })
            const response = await result.json();
            if (!response.success) {
                throw new Error('Could not update user');
            } else {
                setShow(false);
                setCurrentValue("");
                onSave();
            }
        } catch (error) {
            console.log('updateUserInfo', error.message);
        }
    }
  return (
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Update {editType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter the value you wish to update to:</Form.Label>
                    <Form.Control type="text" name="text" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} required />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => updateUserInfo()}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default AdminModal;