import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut ,getAuth } from 'firebase/auth';


const INITIAL_CONFIG_FIREBASE = {
    apiKey: "AIzaSyCFru0FajNyNEbz2cLbWfufNXT33ycZmzM",
    authDomain: "javi-login.firebaseapp.com",
    projectId: "javi-login",
    storageBucket: "javi-login.appspot.com",
    messagingSenderId: "750094152471",
    appId: "1:750094152471:web:520faade128661dc8f7d52"

}

class Login {
    constructor() {
        this.auth = initializeApp(INITIAL_CONFIG_FIREBASE);
    }


    async logOut(){
        try{
            debugger
            
            return await signOut(auth);
            
        }catch (err){
            debugger
            return err;
        }
    }

    async registerUser({ email, password }){
        try {
            
            return await createUserWithEmailAndPassword(getAuth(), email, password);

        } catch (err) {
            
            switch(err.code){

                case "auth/email-already-in-use":
                    try{
                        return await signInWithEmailAndPassword(getAuth(), email, password);
                        break;
                    }catch{
                        return err;
                    }
                default:
                    return err;
            }
            
        }
    }


}

export default new Login();