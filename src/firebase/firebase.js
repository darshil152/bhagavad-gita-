

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';  // <----
let firebaseApp;
SetupFirebase();

/**
* Firebase Initialization Function
* This must be called before any firebase query
*/
function SetupFirebase() {
    const firebaseConfig = {

        apiKey: "AIzaSyCraOssOmxtxH9S0Fy-pPyf1gQ6nCCy8oM",
        authDomain: "chilly-s-52073.firebaseapp.com",
        projectId: "chilly-s-52073",
        storageBucket: "chilly-s-52073.appspot.com",
        messagingSenderId: "575057259967",
        appId: "1:575057259967:web:3939d90d0bdb1d7921850a",
        measurementId: "G-54N75V0JTZ"
    };
    // Initialize Firebase
    firebaseApp = firebase.initializeApp(firebaseConfig);
}

export default firebaseApp;





