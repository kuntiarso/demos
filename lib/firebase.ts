import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

try {
  firebase.initializeApp(firebaseConfig)
} catch (e) {
  if (!/already exists/.test((e as Error).message)) {
    console.error('Firebase initialization error', (e as Error).stack)
  }
}

export default firebase