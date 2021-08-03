import React, { useState, useEffect, useContext} from 'react'
import { AccountContext } from './Account'

const Settings = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const { getSession } = useContext(AccountContext)

    useEffect(() => {
        getSession()
          .then(()=>{
              setLoggedIn(true)
          })
    }, [])
    return (
        <div>
            {loggedIn && (
                <div>
                    <h2>Settings</h2>
                </div>
            )}
        </div>
    )
}

export default Settings
