import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { usePaints } from '../../contexts/PaintsProvider';

const SingleUpdatePaintModal = ({ show, setShow, paint }) => {
    const [paintQuantity, setPaintQuantity] = useState(paint.quantity)
    const { getPaints } = usePaints();
    const updatePaintQuantity = async () => {
        try {
            const result = await fetch('/paints/update-single', {
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
            <div>{paint.color} currently has {paint.quantity} paints in stock.</div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter the value you wish to update {paint.color} to:</Form.Label>
                    <Form.Control type="number" name="number" value={paintQuantity} onChange={(e) => setPaintQuantity(e.target.value)} required />
                </Form.Group>
            </Form>
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

export default SingleUpdatePaintModal;