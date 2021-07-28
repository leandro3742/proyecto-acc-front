import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';

const Login = (props) => {
    // const [loginUser, setLoginUser] = useState(false);

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
                const res = await fetch(process.env.REACT_APP_URL + "/login", requestOptions);
                const data = await res.json();

                if (data.message !== "Ok") {
                    //Ocurre un error y lo muestro en una alerta
                    alert(data.message)
                    return "error";
                }
                console.log(data);
                sessionStorage.setItem("token", data.token); //Guardo el token que recibo del back
                let usuario = data.usuario;               
                localStorage.setItem("usuario", JSON.stringify(usuario)); //Guardo el usuario completo para no tener que pediro a cada rato
                // setLoginUser(true); 
                return "ok";
            } catch (error) {
                console.log(error);
                return "error";
            }
        };
        let result = fetchLogin();
        console.log(localStorage.getItem("usuario"));
        return result;
    };

    const Joi = require('joi');
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ),
    })

    const handleSubmit = async(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        let password = form.password.value;
        let email = form.email.value;

        let validated = schema.validate({email: email});
        console.log(validated)
        if(!validated.error) //Si no existe un error en la validacion
            login(email, password);
    };
    const [show, setShow] = useState(props.show);
    const [mostrarRecuperarPass, setMostrarRecuperarPass] = useState(false);

    const handleClose = (variable) => {
        if(variable === "show"){
            setShow(false);
        }
        else{
            setMostrarRecuperarPass(false)
            props.function();    
        }
    }
    const mostrarPassword = () => {
        setMostrarRecuperarPass(true)
        handleClose("show")
    }
    return (
        <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <h2 className="text-center">Iniciar sesion</h2>
            </Modal.Header>
            <Form className="row m-0 p-0" onSubmit={handleSubmit}>
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Email o nombre </Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su email o su nombre"/>
                </Form.Group>

                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="col-lg-6 col-12 my-2">
                    <span onClick={mostrarPassword} className="text-primary">Olvide mi contrasena</span>
                </Form.Group>

                <div className="col-12 my-2 d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </div>
            </Form>
        </Modal>

        <Modal show={mostrarRecuperarPass} onHide={handleClose}>
            <Modal.Header closeButton>
                <h2 className="text-center">Iniciar sesion</h2>
            </Modal.Header>
            <Form className="row m-0 p-0" onSubmit={handleSubmit}>
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Email o nombre </Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su email o su nombre"/>
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

export default Login
