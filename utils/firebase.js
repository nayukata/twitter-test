import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()

export default firebase
const FieldValue = firebase.firestore.FieldValue
const storage = firebase.storage().ref()
const auth = firebase.auth()
const onAuthStateChanged = () => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user || false)
    })
  })
}
const googleProvider = new firebase.auth.GoogleAuthProvider()
export { auth, storage, googleProvider, db, FieldValue, onAuthStateChanged }
