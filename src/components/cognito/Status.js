import React, { useEffect, useState, useContext } from 'react'
import { AccountContext  } from './Account'

export default function Status() {
    const [status, setStatus] = useState(false);
    
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
          .then(session => {
              console.log("session", session)
              setStatus(true)
          })
    }, []);

    return (
        <div>
            {status ?
            <div>
                Estas Logueado
                <button onClick={logout}>Salir</button>
            </div> : "Logearte"}        
        </div>
    )
}
