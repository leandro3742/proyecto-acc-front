import React, { createContext } from 'react'
import Pool from './UserPool';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const AccountContext = createContext(); 

const Account = (props) => {

    const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });

            const token = session.getIdToken().getJwtToken()

            resolve({
              user,
              headers: {
                Authorization: token,
              },
              ...session,
              ...attributes,
            });
          }
        });
      } else {
        reject();
      }
    });
    const authenticate = async (Username, Password) => {
        await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username,Pool });
            const authDetails = new AuthenticationDetails({ Username, Password })    
            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    console.log(data);
                    resolve(data);
                },
                
                onFailure: err => {
                    console.log(err);
                    reject(err)
                },
    
                newPasswordRequired: data => {
                    console.log("new password required: ", data);
                    resolve(data)
                }
    
            })
        })
    }

    const loguot = () => {
        const user = Pool.getCurrentUser();
        if(user)
            user.loguot()
    }
    return (
        <AccountContext.Provider value={{
            authenticate,
            getSession,
            loguot
        }}>
            {props.children}
        </AccountContext.Provider>
    )
}

export {Account , AccountContext}
