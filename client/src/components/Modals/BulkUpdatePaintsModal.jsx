import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { usePaints } from '../../contexts/PaintsProvider';

const BulkUpdatePaintsModal = ({ showModal, setShowModal }) => {
    const { getPaints } = usePaints();
    const resetQuantities = {
        blue: 0,
        grey: 0,
        black: 0,
        white: 0,
        purple: 0,
    }
    const [updatedPaintQuantities, setUpdatedPaintQuantities] = useState(resetQuantities);

    const close = () => {
        setShowModal(false);
        setUpdatedPaintQuantities(resetQuantities)
    }
    const updateBulkPaintQuantity = async () => {
        try {
            const result = await fetch('/paints/update-bulk', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(updatedPaintQuantities),
            })
            const response = await result.json();
            if (!response.success) {
                throw new Error('Could not update paints in bulk');
            } else {
                close();
                getPaints();
                setUpdatedPaintQuantities(resetQuantities)
            }
        } catch (error) {
            console.log('updatePaintQuantity', error.message);
        }
    }

    const inputValues = (color) => {
        return (
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{color.charAt(0).toUpperCase() + color.slice(1)}:</Form.Label>
                <Form.Control 
                    type="number" 
                    name="number" 
                    value={updatedPaintQuantities[color]} 
                    onChange={(e) => setUpdatedPaintQuantities({...updatedPaintQuantities, [color]: parseInt(e.target.value)})}
                />
            </Form.Group>
        )
    }

    return (
        <Modal show={showModal} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Update Paints in Bulk</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                {inputValues('blue')}
                {inputValues('grey')}
                {inputValues('black')}
                {inputValues('white')}
                {inputValues('purple')}
            </Form>
            <div>Whatever number (positive or negative) you enter in these fields will be added to the current stock of paint.</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => updateBulkPaintQuantity()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BulkUpdatePaintsModal;