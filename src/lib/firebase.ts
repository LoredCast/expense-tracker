
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyBvtKCep9-UHQJl-fe32YTAf8ZXNCi9QNE",
    authDomain: "expense-tracker-86457.firebaseapp.com",
    projectId: "expense-tracker-86457",
    storageBucket: "expense-tracker-86457.appspot.com",
    messagingSenderId: "839590745940",
    appId: "1:839590745940:web:0eb74b7fa597258d439ac1",
    measurementId: "G-F0H746NWWD"
}


firebase.default.initializeApp(firebaseConfig)

export const auth = firebase.default.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.default.firestore();