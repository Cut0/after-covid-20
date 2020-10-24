import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
const firebaseConfig = {
  apiKey: process.env.VUE_APP_AFIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_AFIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_AFIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_AFIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_AFIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_AFIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_AFIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_AFIREBASE_MEASUREMENT_ID
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
