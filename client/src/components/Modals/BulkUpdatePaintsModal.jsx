import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { usePaints } from '../../contexts/PaintsProvider';

const BulkUpdateModal = ({ showModal, setShowModal }) => {
    const [updatedPaintQuantities, setUpdatedPaintQuantities] = useState({
        blue: 0,
        grey: 0,
        black: 0,
        white: 0,
        purple: 0,
    });

    const close = () => {
        setShowModal(false);
    }
    const updateBulkPaintQuantity = async () => {
        try {
            const result = await fetch('http://localhost:5000/paints/update-bulk', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(updatedPaintQuantities),
            })
            const response = await result.json();
            close();
            window.location.reload();
        } catch (error) {
            console.log('updatePaintQuantity', error.message);
        }
    }

    const inputValues = (color) => {
        return (
            <input 
                type="number" 
                value={updatedPaintQuantities[color]} 
                onChange={(e) => setUpdatedPaintQuantities({...updatedPaintQuantities, [color]: parseInt(e.target.value)})}
            />
        )
    }

    return (
        <Modal show={showModal} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Update Paints in Bulk</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Enter the value you wish to add paints to.
                </div>
                <div className="blue-input-container">Blue: {inputValues('blue')}</div>
                <div className="grey-input-container">Grey: {inputValues('grey')}</div>
                <div className="black-input-container">Black:  {inputValues('black')}</div>
                <div className="white-input-container">White:  {inputValues('white')}</div>
                <div className="purple-input-container">Purple: {inputValues('purple')}</div>

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

export default BulkUpdateModal;