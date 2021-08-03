import React, { useState } from 'react'
import { Auth } from 'aws-amplify';

const Prueba = () => {

    async function confirmSignUp(username, code) {
        try {
            await Auth.confirmSignUp(username, code);
            console.log("ok")
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }
    const onSubmit = (event) => {
        event.preventDefault()
        let form = event.currentTarget;
        let user = form.user.value;
        let code = form.code.value;
        confirmSignUp(user, code);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input placeholder="nombre de usuario" id="user" />
                <input placeholder="codigo" id="code" />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Prueba
