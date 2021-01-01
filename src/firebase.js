import firebase  from 'firebase';

// usad vuestros datos aquí:
var firebaseConfig = {
    apiKey: "AIzaSyDAyURuEkvuNk9ZqB8Kgc2wB0ViTkordjA",
    authDomain: "uocify-f399f.firebaseapp.com",
    projectId: "uocify-f399f",
    storageBucket: "uocify-f399f.appspot.com",
    messagingSenderId: "747948841051",
    appId: "1:747948841051:web:107b272e8e4609c7cdc77e"
};

const app = firebase .initializeApp(firebaseConfig);

export const db = app.database();