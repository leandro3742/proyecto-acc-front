import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap';

const ForgotPassword = (props) => {
    const handleSubmit = async(event) => {

    };
    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <h2 className="text-center">Iniciar sesion</h2>
                </Modal.Header>
                <Form className="row m-0 p-0" onSubmit={handleSubmit}>
                        <Form.Group className="col-lg-12 col-12 my-2">
                            <Form.Label>Ingrese su email</Form.Label>
                            <Form.Control type="text" placeholder="Email"/>
                        </Form.Group>

                        <div className="col-12 my-2 d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Recuperar contraseña
                            </Button>
                        </div>
                </Form>
            </Modal>
        </div>
    )
}

export default ForgotPassword
