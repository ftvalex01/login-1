import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyDW-iJBz14o4VknsYcN4DdZRSjxSxIj5Lo",
  authDomain: "crud-firebase-b9442.firebaseapp.com",
  projectId: "crud-firebase-b9442",
  storageBucket: "crud-firebase-b9442.appspot.com",
  messagingSenderId: "195747619924",
  appId: "1:195747619924:web:4341ab4cb73f5c87a479c1"
};


app.initializeApp(firebaseConfig);

const db = app.firestore()
const auth = app.auth()

export {db,auth}