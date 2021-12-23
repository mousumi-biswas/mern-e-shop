import  firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhSCJPAgMyP7OSAB39rhzQ0cXC-T6izmU",
    authDomain: "e-commerce-bee44.firebaseapp.com",
    projectId: "e-commerce-bee44",
    storageBucket: "e-commerce-bee44.appspot.com",
    messagingSenderId: "102833434179",
    appId: "1:102833434179:web:fc02ee465552cadada6ef6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  //export
  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()