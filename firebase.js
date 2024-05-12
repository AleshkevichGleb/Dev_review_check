// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGu_eB1VL-ttaOY8r0UEUE5qeDEswaY3Q",
    authDomain: "blackjack-af001.firebaseapp.com",
    projectId: "blackjack-af001",
    storageBucket: "blackjack-af001.appspot.com",
    messagingSenderId: "449815062924",
    appId: "1:449815062924:web:1fcaf1c5b78f6498dd0ea9"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const authFirebase = getAuth(appFirebase);
export const firestoreFirebase = getFirestore(appFirebase);