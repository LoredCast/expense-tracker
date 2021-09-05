
//import firebase from 'firebase/app';
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/firestore';
//import 'firebase/compat/auth';
import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth'
import { Firestore, getFirestore } from '@firebase/firestore'
import type { Auth } from '@firebase/auth'
import type { FirebaseApp} from '@firebase/app'
import { browser } from '$app/env';



//import 'firebase/auth';
//import 'firebase/firestore'



export const firebaseConfig = {
    apiKey: "AIzaSyBvtKCep9-UHQJl-fe32YTAf8ZXNCi9QNE",
    authDomain: "expense-tracker-86457.firebaseapp.com",
    projectId: "expense-tracker-86457",
    storageBucket: "expense-tracker-86457.appspot.com",
    messagingSenderId: "839590745940",
    appId: "1:839590745940:web:0eb74b7fa597258d439ac1",
    measurementId: "G-F0H746NWWD"
}


//firebase.initializeApp(firebaseConfig)

export let auth : Auth
export let db : Firestore
export let firebase : FirebaseApp

if (browser) {
    firebase = initializeApp(firebaseConfig)
    auth = getAuth(firebase)
    db = getFirestore(firebase)
}



//export const auth = firebase.auth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();

//export const db = firebase.firestore();