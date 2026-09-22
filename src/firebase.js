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

// Safely load configuration from environment variables or local applet config
let rawConfig = null;
try {
  // Dynamically attempt to load the gitignored config file if present in sandbox
  const imported = await import('../firebase-applet-config.json', { assert: { type: 'json' } }).catch(() => null);
  rawConfig = imported?.default || null;
} catch {
  rawConfig = null;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || rawConfig?.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || rawConfig?.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || rawConfig?.projectId || "symbolic-brand-sjq9c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || rawConfig?.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || rawConfig?.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || rawConfig?.appId,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || rawConfig?.firestoreDatabaseId || "ai-studio-samriddhiaisih26-ceed7ce1-4b46-4a32-8fdf-3360a7931ae9"
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId if configured, or default
const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : getFirestore(app);

export { app, db, collection, doc, getDocs, setDoc, updateDoc, onSnapshot, query, orderBy };

