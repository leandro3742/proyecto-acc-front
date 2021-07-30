import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import Places from './Places';
import Spinner from './Spinner';

import Swal from 'sweetalert2'

const Registry = (props) => {
    // props.function, props.show
    const [ocultarPass, setOcultarPass] = useState("text");
    const [randomPass, setRandomPass] = useState(""); //Guardo la varable random que se crea para mostrarla
    const [pass, setPass] = useState(""); //Guardo la pass para poder validarla con repeat_password
    const [styleButtom, setStyleButtom] = useState({ opacity: "25%"})
    const [childAddress, setChildAddress] = useState(""); //Guardo la direccion que recibo desde mi hijo
    const [spinner, setSpinner] = useState("d-none");
    const [opacidadModal, setOpacidadModal] = useState("100%");

    const createSuccess = () => {
        Swal.fire({
            title: 'El usuario fue creado exitosamente!',
            text: 'Revisa tu casilla de correo para validar la cuenta',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

    const errorCreate = (error) => {
        Swal.fire({
            title: error,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    const createUser = (name, password, address, email) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            name: name,
            password: password,
            address: address,
            email: email,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const fetchUsuario = async () => {
            try {
                setOpacidadModal("75%")
                setSpinner("")
                const res = await fetch(process.env.REACT_APP_URL + "/user", requestOptions);
                const data = await res.json();
                console.log(data);
                setSpinner("d-none")
                if(data.message !== "ok")
                    errorCreate(data.message)
                else
                    createSuccess();

                setOpacidadModal("100%")
            } catch (error) {
                setSpinner("d-none")
                setOpacidadModal("100%")
                errorCreate(error.message)
                console.log(error);
                return "error";
            }
        };
        fetchUsuario();
    };

    //////////// VALIDACIONES CON JOI //////////////
    const Joi = require('joi');
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30),
        
        password: Joi.string()
            .min(3),

        repeat_password: Joi.ref('password'),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } ),

        address: Joi.string()
            .alphanum()
    })
    ///////////////////////////////////////////////
    const [backgroundName, setBackgroundName] = useState({backgroundColor: ""});
    const [backgroundEmail, setBackgroundEmail] = useState({backgroundColor: ""});
    const [backgroundPassword, setBackgroundPassword] = useState({backgroundColor: ""});
    const [backgroundRepeatPassword, setBackgroundRepeatPassword] = useState({backgroundColor: ""});
    const [validatedName, setValidatedName] = useState(false);
    const [validatedEmail, setValidatedEmail] = useState(false);
    const [validatedAddress, setValidatedAddress] = useState(false);
    const [validatedPassword, setValidatedPassword] = useState(false);
    const [validatedRepeatPassword, setValidatedRepeatPassword] = useState(false);

// FUNCION RANDOM STRING
    const  generateRandomString = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

// VERIFICACIONES
    const verifyName = (e) => {
        let verify = schema.validate({name: e.target.value});
        let aux;
        if(verify.error){
            aux = {backgroundColor: "#F57979"}
            setValidatedName(false);
        }
        else{
            aux = {backgroundColor: "#7AFC71"}
            setValidatedName(true);
        }
        setBackgroundName(aux)

    };
    const verifyPassword = (e) => {
        setOcultarPass("password") //Para que no se vea la pass a simple vista, hace que sean *

        let verify = schema.validate({password: e.target.value});
        let aux;
        if(verify.error){
            aux = {backgroundColor: "#F57979"}
            setValidatedPassword(false);
        }
        else{
            aux = {backgroundColor: "#7AFC71"}
            setValidatedPassword(true);
            if(e.target.value === randomPass){
                document.querySelector("#repeatPassword").value = randomPass;
                setBackgroundRepeatPassword(aux)
                setValidatedRepeatPassword(true)
            }
        }
        setBackgroundPassword(aux)
        setPass(e.target.value); //Guardo la pass para poder validarla con repeat_pass
    };
    const verifyRepeatPassword = (e) => { // Ver como hacemos para usar la api de joi para validar este campo
        let verify = schema.validate({password: pass, repeat_password: e.target.value});
        let aux;
        if(verify.error){
            aux = {backgroundColor: "#F57979"}
            setValidatedRepeatPassword(false);
        }
        else{
            aux = {backgroundColor: "#7AFC71"}
            setValidatedRepeatPassword(true);
        }
        setBackgroundRepeatPassword(aux)
    };
    
    const verifyEmail = (e) => {
        let verify = schema.validate({email: e.target.value});
        let aux;
        if(verify.error){
            aux = {backgroundColor: "#F57979"}
            setValidatedEmail(false);
        }
        else{
            aux = {backgroundColor: "#7AFC71"}
            setValidatedEmail(true);
        }
        setBackgroundEmail(aux)
    };


    const handleSubmit = async(event) => {
        event.preventDefault();
        if(sendForm){
            const form = event.currentTarget;
            console.log(form)
            let name = form.name.value;
            let password = form.password.value;
            console.log(childAddress)
            let email = form.email.value;

            let validated = schema.validate({name: name, password: password, repeat_password: password, email: email});
            console.log(validated)
            if(!validated.error){ //Si no existe un error en la validacion
                createUser(name, password, childAddress, email);
            }
        }

    };
    const [sendForm, setSendForm] = useState(false);

    useEffect(()=>{
        let style;
        // Si todos los campos pasaron la validacion
        if(validatedName && validatedEmail && validatedAddress && validatedPassword && validatedRepeatPassword){
            style = { opacity: "100%" }
            setSendForm(true);
        }
        // Si alguno de los campos no es valido
        else{
            style = { opacity: "25%" }
            setSendForm(false);

        }
        setStyleButtom(style);
    },[validatedName, validatedEmail, validatedAddress, validatedPassword, validatedRepeatPassword])  
    
    const mostrarBoton = (childAddress, mostrar) => {
        console.log(childAddress)
        if(mostrar){
            setChildAddress(childAddress);
            setValidatedAddress(true);
        }
        else{
            setValidatedAddress(false);            
        }
    }

    const mostrarPassword = () => {
        if(ocultarPass === "password")
            setOcultarPass("text")
        else
            setOcultarPass("password")
    }
    
    useEffect(() => {
        let aux = generateRandomString(10);
        setRandomPass(aux)
    }, []);
        
    const cerrarModal = () => {
        setValidatedName(false)
        setValidatedEmail(false)
        setValidatedAddress(false)
        setValidatedPassword(false)
        setValidatedRepeatPassword(false);
        setBackgroundName({})
        setBackgroundEmail({})
        setBackgroundPassword({})
        setBackgroundRepeatPassword({})
        setOpacidadModal("");
        props.handleClose();
    }

    return (
    <div>
        <Modal show={props.show} onHide={cerrarModal} style={{ opacity: opacidadModal }}>
            <div style={{position: "absolute", top:"50%", left: "40%", width:"10%", zIndex: "1", opacity: "100%"}} className={spinner}><Spinner/></div> 
           <Modal.Header closeButton>
                <h2 className="text-center">Registrarme</h2>
            </Modal.Header>
            <Form className="row m-0 p-0" onSubmit={handleSubmit}>
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control autoComplete="off" type="text" id="name" placeholder="Enter email" onChange={verifyName} style={backgroundName}/>
                </Form.Group>
               
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Password</Form.Label>   
                    <Form.Control onInput={verifyPassword} type={ocultarPass} multiple name="password" placeholder="Password" id="password" list="lista" style={backgroundPassword} />
                    <datalist id="lista">
                        <option key="1" value={randomPass}>Password segura</option>
                    </datalist>
                    <Form.Check className="mt-1" type="checkbox" label="Mostrar Password" onClick={mostrarPassword} />
                </Form.Group>
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control type="password" id="repeatPassword" placeholder="Password" onInput={verifyRepeatPassword} style={backgroundRepeatPassword}/>
                </Form.Group>

                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control  autoComplete="off" type="text" id="email" placeholder="Email" onInput={verifyEmail} style={backgroundEmail}/>
                </Form.Group>
                
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Address</Form.Label>
                    <Places mostrarBoton={mostrarBoton}/>
                </Form.Group>
                
                <div className="col-12 my-2 d-flex justify-content-center">
                    <Button style={styleButtom} variant="primary" type="submit">
                        Registrarme
                    </Button>
                </div>
            </Form>
        </Modal>
    </div>
    )
}

export default Registry
