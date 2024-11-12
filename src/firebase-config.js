import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCnNVPDBtyruuqk1CudYYHWdlYubvbWBn0",
    authDomain: "icyspace-814d1.firebaseapp.com",
    projectId: "icyspace-814d1",
    storageBucket: "icyspace-814d1.firebasestorage.app",
    messagingSenderId: "378865521279",
    appId: "1:378865521279:web:2b0f9828f315f28d41254a",
    measurementId: "G-SW06NQNW1F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const googleAuth = new GoogleAuthProvider();