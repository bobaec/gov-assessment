import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { usePaints } from '../../contexts/PaintsProvider';

const PaintModal = ({ show, setShow, paint }) => {
    const [paintQuantity, setPaintQuantity] = useState(paint.quantity)
    const { getPaints } = usePaints();
    const updatePaintQuantity = async () => {
        try {
            const result = await fetch('http://localhost:5000/paints/update-single', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({color: paint.color, quantity: paintQuantity}),
            })
            const response = await result.json();
            setShow(false);
            getPaints();
        } catch (error) {
            console.log('updatePaintQuantity', error.message);
        }
    }
  return (
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Update {paint.color}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>{paint.color} has {paint.quantity} paints in stock.</div>
            <div>Enter the value you wish to update paints to:
                <input type="number" value={paintQuantity} onChange={(e) => setPaintQuantity(e.target.value)}></input>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => updatePaintQuantity()}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default PaintModal