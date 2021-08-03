import React from 'react'
import { Account } from '../components/cognito/Account'
import SignUp from '../components/cognito/SignUp'
import Login from '../components/cognito/Login';
import Status from '../components/cognito/Status';
import ForgotPassword from '../components/cognito/ForgotPassword';

const Cognito = () => {
    return (
        <Account>
            <Status />
            <SignUp />
            <Login />
            <ForgotPassword />
        </Account>
    )
}

export default Cognito
