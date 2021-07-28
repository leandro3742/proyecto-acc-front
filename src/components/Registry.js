import React, { useState, useEffect } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import Test from '../views/Test';

const Registry = (props) => {
    // props.function, props.show
    console.log(props)
    const [pass, setPass] = useState(""); //Guardo la pass para poder validarla con repeat_password
    const [styleButtom, setStyleButtom] = useState({ opacity: "25%"})
    const [show, setShow] = useState(props.show);
    const [childAddress, setChildAddress] = useState(""); //Guardo la direccion que recibo desde mi hijo

    const createUser = (name, password, adress, email) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            name: name,
            password: password,
            adress: adress,
            email: email,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const fetchUsuario = async () => {
            try {
                // setStore({ loading: true });
                const res = await fetch(process.env.REACT_APP_URL + "/user", requestOptions);
                const data = await res.json();
                console.log(data);
                // console.log(usuarios);
            } catch (error) {
                console.log(error);
                // setStore({ loading: false });
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

        adress: Joi.string()
            .alphanum()
    })
    ///////////////////////////////////////////////
    const [backgroundName, setBackgroundName] = useState({backgroundColor: ""});
    const [backgroundEmail, setBackgroundEmail] = useState({backgroundColor: ""});
    const [backgroundPassword, setBackgroundPassword] = useState({backgroundColor: ""});
    const [backgroundRepeatPassword, setBackgroundRepeatPassword] = useState({backgroundColor: ""});
    const [validatedName, setValidatedName] = useState(false);
    const [validatedEmail, setValidatedEmail] = useState(false);
    const [validatedAdress, setValidatedAdress] = useState(false);
    const [validatedPassword, setValidatedPassword] = useState(false);
    const [validatedRepeatPassword, setValidatedRepeatPassword] = useState(false);


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
        let verify = schema.validate({password: e.target.value});
        let aux;
        if(verify.error){
            aux = {backgroundColor: "#F57979"}
            setValidatedPassword(false);
        }
        else{
            aux = {backgroundColor: "#7AFC71"}
            setValidatedPassword(true);
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
        if(validatedName && validatedEmail && validatedAdress && validatedPassword && validatedRepeatPassword){
            style = { opacity: "100%" }
            setSendForm(true);
        }
        // Si alguno de los campos no es valido
        else{
            style = { opacity: "25%" }
            setSendForm(false);

        }
        setStyleButtom(style);
    },[validatedName, validatedEmail, validatedAdress, validatedPassword, validatedRepeatPassword])  
    
    const handleClose = () => {
        setShow(false);
        props.function();
    }
    const mostrarBoton = (childAddress, mostrar) => {
        console.log(childAddress)
        if(mostrar){
            setChildAddress(childAddress);
            setValidatedAdress(true);
        }
        else{
            setValidatedAdress(false);            
        }
    }

    const [ocultarPass, setOcultarPass] = useState("password");
    const mostrarPassword = () => {
        if(ocultarPass === "password")
            setOcultarPass("text")
        else
            setOcultarPass("password")
    }

    const generarPassword = () => {
        const  generateRandomString = (length) => {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        
        let pass = generateRandomString(22);
        setPass(pass);

        let formPass = document.querySelector("#password");
        formPass.value = pass;

        let formRepeatPass = document.querySelector("#repeatPassword");
        formRepeatPass.value = pass;
        
        setValidatedPassword(true);
        setValidatedRepeatPassword(true);

        setBackgroundPassword({backgroundColor: "#7AFC71"})
        setBackgroundRepeatPassword({backgroundColor: "#7AFC71"})

        // formRepeatPass.value = pass;

        // schema.validate({password: formPass.value, repeat_password: formRepeatPass })
    
    }

    return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <h2 className="text-center">Registrarme</h2>
            </Modal.Header>
            <Form className="row m-0 p-0" onSubmit={handleSubmit}>
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" id="name" placeholder="Enter email" onChange={verifyName} style={backgroundName}/>
                </Form.Group>

                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={ocultarPass} id="password" placeholder="Password" onChange={verifyPassword} style={backgroundPassword}/>
                    <Form.Check type="checkbox" label="Mostrar Password" onClick={mostrarPassword} />
                </Form.Group>

                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control type="password" id="repeatPassword" placeholder="Password" onChange={verifyRepeatPassword} style={backgroundRepeatPassword}/>
                </Form.Group>
                
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Button className="btn-success" onClick={generarPassword}>Crear Password segura</Button>
                </Form.Group>

                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" id="email" placeholder="Email" onChange={verifyEmail} style={backgroundEmail}/>
                </Form.Group>
                
                <Form.Group className="col-lg-6 col-12 my-2">
                    <Form.Label>Address</Form.Label>
                    <Test mostrarBoton={mostrarBoton}/>
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
