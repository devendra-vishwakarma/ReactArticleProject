import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyBjxB7b3N9HcJ__HwRRuX8dsndTeq78LDc",
    authDomain: "my-article-2e6c0.firebaseapp.com",
    projectId: "my-article-2e6c0",
    storageBucket: "my-article-2e6c0.appspot.com",
    messagingSenderId: "646905880300",
    appId: "1:646905880300:web:05457e4138edc330f14fc9"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);