import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// var firebaseConfigProdSds = {
//   apiKey: 'AIzaSyD-gtoTTzcaTjNd3byG4mX2Fb_CsQX6h00',
//   authDomain: 'mportal-prod2.firebaseapp.com',
//   projectId: 'mportal-prod2',
//   storageBucket: 'mportal-prod2.appspot.com',
//   messagingSenderId: '584598513234',
//   appId: '1:584598513234:web:e6e6a4c3b4a9e5c898a18b',
//   measurementId: 'G-S6MV0181DS'
// }

var firebaseConfigProd = {
  apiKey: 'AIzaSyBcoiGmZ1E6ptc07oTEIkqEc9tOaNZC63U',
  authDomain: 'mportal-prod1.firebaseapp.com',
  projectId: 'mportal-prod1',
  storageBucket: 'mportal-prod1.appspot.com',
  messagingSenderId: '1073952611086',
  appId: '1:1073952611086:web:7801f333f2680313cb155f',
  measurementId: 'G-TCXMN5M10S'
}

firebase.initializeApp(firebaseConfigProd)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()
var storageRef = storage.ref()

db.settings({ timestampInSnapshots: true })

export { db, auth, googleProvider, storageRef, firebase }
