import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCGmvE7wqlcK4Qt36tFtAlb_WHFB_3S_nw",
  authDomain: "athlytics5g.firebaseapp.com",
  databaseURL: "https://athlytics5g.firebaseio.com",
  projectId: "athlytics5g",
  storageBucket: "athlytics5g.appspot.com",
  messagingSenderId: "168458170038"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth