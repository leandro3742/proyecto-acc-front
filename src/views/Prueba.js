import React, { useState } from 'react'
import ForgotPassword from '../components/ForgotPassword';

const Prueba = () => {
    const [show, setShow] = useState(false)
    
    const mostrarModal = () => {
        setShow(true)
    };
    
    const handleClose = () => {
        setShow(false)
    }

    return (
        <div>
            <button onClick={mostrarModal} className="btn btn-secondary">Boton de modal</button>
            <ForgotPassword show={show} handleClose={handleClose}/>
        </div>
    )
}

export default Prueba
