import { Environment } from "../app/shared/interfaces/environmentInterface";

export const environment: Environment = {
  production: false,
    firebase: {
    apiKey: "AIzaSyBdp7Vu97AJzVMuka2--tc46cWiJjMpfH8",
    authDomain: "angular-social-network-81860.firebaseapp.com",
    projectId: "angular-social-network-81860",
    storageBucket: "angular-social-network-81860.appspot.com",
    messagingSenderId: "594870193533",
    appId: "1:594870193533:web:135b7529b9008451539014",
    measurementId: "G-E8QTVSRW1K"
  }
};

export const authURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`;
export const baseURL = 'https://angular-social-network-81860-default-rtdb.europe-west1.firebasedatabase.app';


