import React , { useState } from 'react'

import Registry from '../components/Registry'
import Login from '../components/Login'
import ForgotPassword from '../components/ForgotPassword';

const Home = () => {
    // const logout = () => {
    //     setLoginUser(false);
    //     sessionStorage.removeItem("token");
    //     localStorage.removeItem("usuario");
    //     console.log(localStorage.getItem("usuario"));

    //     // setStore({ token: false });
    // };

    // useEffect(()=>{
    //     if(loginUser){
    //         let usuario = JSON.parse(localStorage.getItem("usuario"))
    //         console.log("user:", usuario.name)
    //         setUserName(usuario.name);
    //         setMostrarLogout("");
    //     }
    //     else{
    //         setUserName("Aun no hay usuario logueado")
    //         setMostrarLogout("d-none");
    //     }
    // }, [loginUser]);

    const [showRegistry, setShowRegistry] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const popUpOn = (abrir) => {
        if(abrir === "registry")
            setShowRegistry(true)
        else
            setShowLogin(true)
    }
    const handleCloseRegistry = () => {
        setShowRegistry(false)
    }
    const handleCloseLogin = (variable) => {
        if(variable === "openForgotPassword"){
            setShowLogin(false)
            setShowForgot(true)
        }
        else
            setShowLogin(false)
    }
    const handleCloseForgot = () => {
        setShowForgot(false)
    };

    return (
        <div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <button className="my-2 btn btn-primary" onClick={()=>popUpOn("registry")}>Registrarse</button>
                <button className="my-2 btn btn-primary" onClick={()=>popUpOn("login")}>Log in</button>
            </div>
            <Registry show={showRegistry} handleClose={handleCloseRegistry}/>
            <Login show={showLogin} handleClose={handleCloseLogin}/>
            <ForgotPassword show={showForgot} handleClose={handleCloseForgot}/>
        </div>
    )
}

export default Home
