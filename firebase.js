/**
 * firebase.js — Shared Firebase initialisation
 * Exposes: window._fbAuth, window._fbFavs, window._fbCharLib
 * Import via: <script type="module" src="js/firebase.js"></script>
 */

import { initializeApp }   from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAnalytics }    from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
import {
  getAuth, GoogleAuthProvider,
  signInWithPopup, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import {
  getFirestore,
  doc, getDoc, setDoc,
  collection, addDoc, getDocs, deleteDoc,
  query, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

/* ── Config ── */
const firebaseConfig = {
  apiKey:            "AIzaSyAU0hfv8sM6PlFqeJgHh7upYSkMEm2ilpc",
  authDomain:        "anime-prompt-studio-main.firebaseapp.com",
  projectId:         "anime-prompt-studio-main",
  storageBucket:     "anime-prompt-studio-main.firebasestorage.app",
  messagingSenderId: "617164431718",
  appId:             "1:617164431718:web:3dcb036700a52ec83ba8a7",
  measurementId:     "G-X01T4B2E1B",
};

const app      = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth     = getAuth(app);
const db       = getFirestore(app);
const provider = new GoogleAuthProvider();

/* ── Auth helpers ── */
window._fbAuth = {
  signIn:  ()   => signInWithPopup(auth, provider),
  signOut: ()   => signOut(auth),
  onAuth:  (cb) => onAuthStateChanged(auth, cb),
};

/* ── Favourites (Firestore) ── */
window._fbFavs = {
  save: async (uid, fav) => {
    const ref = collection(db, 'users', uid, 'favourites');
    await addDoc(ref, { ...fav, createdAt: serverTimestamp() });
  },
  load: async (uid) => {
    const ref  = collection(db, 'users', uid, 'favourites');
    const q    = query(ref, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ _docId: d.id, ...d.data() }));
  },
  del: async (uid, docId) => {
    await deleteDoc(doc(db, 'users', uid, 'favourites', docId));
  },
  clear: async (uid) => {
    const ref  = collection(db, 'users', uid, 'favourites');
    const snap = await getDocs(ref);
    await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
  },
};

/* ── Character Library (Firestore) ── */
window._fbCharLib = {
  save: async (uid, entry) => {
    const ref = doc(db, 'users', uid, 'charLib', String(entry.id));
    await setDoc(ref, { ...entry, updatedAt: serverTimestamp() });
  },
  load: async (uid) => {
    const ref  = collection(db, 'users', uid, 'charLib');
    const q    = query(ref, orderBy('updatedAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ ...d.data() }));
  },
  del: async (uid, entryId) => {
    await deleteDoc(doc(db, 'users', uid, 'charLib', String(entryId)));
  },
};

/* ── Export for pages that need to listen to auth state ── */
export { auth, onAuthStateChanged };
