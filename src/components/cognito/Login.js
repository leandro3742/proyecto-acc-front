import React, { useContext } from 'react'
import { AccountContext } from './Account';

const Login = () => {

    const  { authenticate } = useContext(AccountContext);

    const onSubmit = async event => {
        event.preventDefault();
        let form = event.currentTarget;
        let email = form.email;
        let password = form.password;
        const autenticar = async (email, password) => {
            try{
                const res = await authenticate(email, password);
                const data = await res;
                console.log("Logueado correctamente",data)
            }
            catch(err){
                console.log("Error en el logeo",err)
            }
        }
        autenticar(email, password)

    }
    return (
        <div onClick={onSubmit}>
            
        </div>
    )
}

export default Login
