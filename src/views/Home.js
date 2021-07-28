import React , { useState, useEffect } from 'react'

import Registry from '../components/Registry'
import Login from '../components/Login'

const Home = () => {
    // const [usuarios, setUsuarios] = useState([]); //Guardo los usuarios registrados en un array
    // const [userName, setUserName] = useState("Aun no hay usuario logueado")
    // const [mostrarLogout, setMostrarLogout] = useState("d-none");

    // const traerUsuarios = async() => {
    //     try {
    //         const res = await fetch(process.env.REACT_APP_URL + "/user");
    //         const data = await res.json();
    //         console.log("data:",data);
    //         setUsuarios(data);
    //     } catch (error) {
    //         console.log(error);
    //         return "error";
    //     }
    // };

    // const deleteUser = async (id) => {   
    //     console.log(id);
    //     var requestOptions = {
    //         method: "DELETE",
    //     };

    //     try {
    //         const res = await fetch(process.env.REACT_APP_URL + "/"+id, requestOptions);
    //         await res.json();
    //         traerUsuarios(); //Vuelvo a traer a los usuarios ahora actualizado

    //     } catch (error) {
    //         console.log(error);
    //         return "error";
    //     }  

    // }

    // const logout = () => {
    //     setLoginUser(false);
    //     sessionStorage.removeItem("token");
    //     localStorage.removeItem("usuario");
    //     console.log(localStorage.getItem("usuario"));

    //     // setStore({ token: false });
    // };

    // useEffect(()=>{
    //     traerUsuarios();
    // },[]);

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
    const [registry, setRegistry] = useState("");
    const [login, setLogin] = useState("");
    // const [popUp, setPopUp] = useState(false);

    const popUpOff = () => {
        setRegistry("");
        setLogin("");
    }

    const popUpOn = (abrir) => {
        // setPopUp(true);
        if(abrir === "registry")
            setRegistry(<Registry show={true} function={popUpOff} />)
        else
            setRegistry(<Login show={true} function={popUpOff} />)
    }
   
    return (
        <div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <button className="my-2 btn btn-primary" onClick={()=>popUpOn("registry")}>Registrarse</button>
                <button className="my-2 btn btn-primary" onClick={()=>popUpOn("login")}>Log in</button>
            </div>
            {registry}
            {/* <Registry function={handleShow} show={popUp}/> */}
            {login}
            {/* <Login /> */}
        </div>
    )
}

export default Home
