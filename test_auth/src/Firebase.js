import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCGmvE7wqlcK4Qt36tFtAlb_WHFB_3S_nw",
  authDomain: "athlytics5g.firebaseapp.com",
  databaseURL: "https://athlytics5g.firebaseio.com",
  projectId: "athlytics5g",
  storageBucket: "athlytics5g.appspot.com",
  messagingSenderId: "168458170038"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
