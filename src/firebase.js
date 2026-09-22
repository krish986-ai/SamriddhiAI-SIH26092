import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';

// Standard Firebase Client Configuration via Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBo6FIhrbbQdwUVU4-AES8Qk96fCxespy8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "symbolic-brand-sjq9c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "symbolic-brand-sjq9c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "symbolic-brand-sjq9c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "280538861841",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:280538861841:web:4e99e0d84c8d1f24f2fcb0",
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || "ai-studio-samriddhiaisih26-ceed7ce1-4b46-4a32-8fdf-3360a7931ae9"
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId if configured, or default
const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : getFirestore(app);

export { app, db, collection, doc, getDocs, setDoc, updateDoc, onSnapshot, query, orderBy };

