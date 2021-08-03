import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import Spinner from './Spinner';
import { Auth } from 'aws-amplify';

import Swal from 'sweetalert2';

const Login = (props) => {
    // const [loginUser, setLoginUser] = useState(false);
    const [ocultarPass, setOcultarPass] = useState("password");
    const [spinner, setSpinner] = useState("d-none");
    const [opacidadModal, setOpacidadModal] = useState("100%");

    const errorLogin = (error) => {
        Swal.fire({
            title: error,
            icon: "error",
        })
    }
    const login = async(email, password) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            email: email,
            password: password
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        };

        const fetchLogin = async () => {
            try {
                setSpinner("");
                setOpacidadModal("75%");
                const res = await fetch(process.env.REACT_APP_URL + "/login", requestOptions);
                const data = await res.json();
                console.log("data", data)
                setSpinner("d-none")
                setOpacidadModal("100%");
                if (data.message !== "Ok") {
                    //Ocurre un error y lo muestro en una alerta
                    errorLogin(data.message);
                    return "error";
                }
                else{
                let usuario = data.usuario;               
                localStorage.setItem("token", data.token); //Guardo el token en el local
                localStorage.setItem("nombre", usuario.name); //Guardo el usuario en el local
                console.log(localStorage.getItem("nombre"));
                console.log(localStorage.getItem("token"));

                // setLoginUser(true); 
                }
            } catch (error) {
                errorLogin(error);
                    console.log(error);
                return "error";
            }
        };
        let result = fetchLogin();
        return result;
    };

    const signIn = async(username, password) => {
        try {
            const user = await Auth.signIn(username, password);
            console.log(user)
        } catch (error) {
            console.log('error signing in', error);
        }
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        const form = event.target;
        let password = form.password.value;
        let email = form.email.value;
        signIn(email, password)
        // login(email, password);
    };

    const mostrarPassword = () => {
        if(ocultarPass === "password")
            setOcultarPass("text")
        else
            setOcultarPass("password")
    }
    const cerrarModal = () => {
        setOpacidadModal("");
        props.handleClose("close")
    }
    return (
        <div>
        <Modal style={{ opacity: opacidadModal }} show={props.show} onHide={cerrarModal}>
            <div style={{position: "absolute", top:"50%", left: "40%", width:"10%", zIndex: "1", opacity: "100%"}} className={spinner}><Spinner/></div> 
            <Modal.Header closeButton>
                <h2 className="text-center">Iniciar sesion</h2>
            </Modal.Header>
            <Form className="row m-0 p-0" onSubmit={handleSubmit}>
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Email o nombre </Form.Label>
                    <Form.Control id="email" type="text" autoComplete="off" placeholder="Ingrese su email o su nombre"/>
                </Form.Group>

                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="password" type={ocultarPass} placeholder="Password" />
                    <Form.Check className="mt-1" type="checkbox" label="Mostrar Password" onClick={mostrarPassword} />
                </Form.Group>

                <Form.Group className="col-lg-12 col-12 my-2">
                    <span onClick={()=>props.handleClose("openForgotPassword")} className="text-primary float-right" style={{cursor: "pointer", textDecoration: "underline"}}>Forgot password</span>
                </Form.Group>

                <div className="col-12 my-2 d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </div>
            </Form>
           
        </Modal>        
        </div>
    )
}

export default Login
