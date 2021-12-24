import firebase from 'firebase'
import {createContext} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyDtKxGbfgPgohMkPtJ5mLTc04FOES8jHBE",
    authDomain: "shop-163be.firebaseapp.com",
    databaseURL: "https://shop-163be-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shop-163be",
    storageBucket: "shop-163be.appspot.com",
    messagingSenderId: "328220146995",
    appId: "1:328220146995:web:73d8785bc1716417295246"
};

export const ContextGlobal = createContext(null);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;