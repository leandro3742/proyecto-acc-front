import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import Spinner from './Spinner';

import Swal from 'sweetalert2';

const ForgotPassword = (props) => {
    const [spinner, setSpinner] = useState("d-none");
    const [opacidadModal, setOpacidadModal] = useState("100%");

    const errorChangePassword = (error) => {
        Swal.fire({
            title: error,
            icon: "error"
        })
    }

    const changeSuccess = () => {
        Swal.fire({
            title: "Cambio exitoso",
            icon: "success",
            text: "Verifique su casilla de correos para entcontrar su nueva password"
        })
    }
    const changePassword = async (email) => { 
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            email: email,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const fetchChangePassword = async () => {
            try {
                setOpacidadModal("75%")
                setSpinner("")
                const res = await fetch(process.env.REACT_APP_URL + "/forgotPassword", requestOptions);
                const data = await res.json();
                console.log(data);
                setSpinner("d-none")
                if(data.message !== "ok")
                    errorChangePassword(data.message)
                else
                    changeSuccess();

                setOpacidadModal("100%")
            } catch (error) {
                setSpinner("d-none")
                setOpacidadModal("100%")
                errorChangePassword(error.message)
                console.log(error);
                return "error";
            }
        }
        fetchChangePassword();    
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let form = event.currentTarget;
        console.log(form.email.value);
        changePassword(form.email.value)
    };

    const cerrarModal = () => {
        setOpacidadModal("");
        props.handleClose()
    }
    return (
        <div>
            <Modal style={{ opacity: opacidadModal }} show={props.show} onHide={cerrarModal}>
                <div style={{position: "absolute", top:"50%", left: "40%", width:"10%", zIndex: "1", opacity: "100%"}} className={spinner}><Spinner/></div> 
                <Modal.Header closeButton>
                    <h2 className="text-center">Recuperar contraseña</h2>
                </Modal.Header>
                <Form className="row m-0 p-0" onSubmit={handleSubmit}>
                        <Form.Group className="col-lg-12 col-12 my-2">
                            <Form.Label>Ingrese su email</Form.Label>
                            <Form.Control type="text" id="email" placeholder="Email"/>
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
