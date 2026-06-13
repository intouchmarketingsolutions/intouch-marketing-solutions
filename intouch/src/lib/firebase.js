import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { isSupported, getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

let app = null
let auth = null
let googleProvider = null

try {
  if (!firebaseConfig.apiKey) {
    throw new Error('Missing Firebase configuration (VITE_FIREBASE_* env vars).')
  }

  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  googleProvider = new GoogleAuthProvider()

  // Analytics only works in supported browser environments
  isSupported().then((supported) => {
    if (supported && firebaseConfig.measurementId) {
      getAnalytics(app)
    }
  }).catch(() => {})
} catch (err) {
  console.error('❌ Firebase initialization failed:', err.message)
}

export { auth, googleProvider }
export default app
