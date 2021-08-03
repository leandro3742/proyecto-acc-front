import React, { useState, useContext } from 'react'
import { AccountContext } from './Account'

const ChangePassword = () => {
    const [password, setPassword] = useState("")
    const [newpassword, setNewPassword] = useState("")

    const { getSession, authenticate } = useContext(AccountContext)
    
    const onSubmit = (event) => {
        event.preventDefault();
        getSession().then(({ user, email })=> {
            authenticate(email, password)
              .then(()=>{
                  user.changePassword(password, newpassword, (err, result)=>{
                      if(err) console.log(err);
                      console.log(result)                
                  })
              })
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={password} 
                    onChange={(event)=> setPassword(event.target.value)}    
                />
                <input
                    value={newpassword} 
                    onChange={(event)=> setNewPassword(event.target.value)}    
                />
                <button type="onSubmit">ChangePassword </button>
            </form>
        </div>
    )
}

export default ChangePassword
