import { Auth } from 'aws-amplify';

export async function signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        console.log(user)
    } catch (error) {
        console.log('error signing in', error);
    }
}
