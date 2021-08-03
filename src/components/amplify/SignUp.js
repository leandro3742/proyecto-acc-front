// import React from 'react'
import { Auth } from 'aws-amplify';

// const SignUp = () => {
    export default async function SignUp(userName, email,password,address,familyName, name, phoneNumber) {
        try {
            const { user } = await Auth.signUp({
                username: userName,
                password: password,
                attributes: {
                    name: name,
                    email: email,          // optional
                    phone_number: phoneNumber,   // optional - E.164 number convention
                    family_name: familyName,
                    address: address
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }
    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     const form = e.currentTarget
    //     let email = form.email.value;
    //     let password = form.password.value;
    //     let address = form.address.value;
    //     let name = form.name.value;
    //     let familyName = form.familyName.value;
    //     let phoneNumber = form.phoneNumber.value;
    //     let userName = form.userName.value;
    //     // debugger
    //     signUp(userName, email, password, address, familyName, name, phoneNumber)
    // }

    // return (
    //     <div >
    //         <form onSubmit={onSubmit}>
    //             <input id="userName" placeholder="userName"/>
    //             <input id="name" placeholder="name"/>
    //             <input id="email" placeholder="email"/>
    //             <input id="password" placeholder="password"/>
    //             <input id="familyName" placeholder="familyName"/>
    //             <input id="address" placeholder="address"/>
    //             <input id="phoneNumber" type="text" placeholder="phoneNumber"/>
    //             <button type="submit">Enviar</button>
    //         </form>
    //     </div>
    // )
// }

// export default SignUp
