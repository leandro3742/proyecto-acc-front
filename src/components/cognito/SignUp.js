import React from 'react'
import UserPool from './UserPool'

const SignUp = () => {
    
    const onSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        let email = form.email.value;
        let password = form.password.value;
        let address = form.address.value;
        // (address, email, familyName, name, phoneNumber )
        UserPool.signUp("email", password, [], null, (err, data) => {
            if (err) console.error(err);
            console.log(data);
          });
    }
    return (
        <div >
            <form onSubmit={onSubmit}>
                <input id="email" />
                <input id="password" />
                <input id="familyName" />
                <input id="address" />
                <input id="foundNumber" />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )}

export default SignUp
