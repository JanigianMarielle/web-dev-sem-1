import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import { getAuth } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBdDZCTk5XnlLs2xUcxXCvRueO_azJR-Bc",
authDomain: "web-dev-1-71fa4.firebaseapp.com",
projectId: "web-dev-1-71fa4",
storageBucket: "web-dev-1-71fa4.firebasestorage.app",
messagingSenderId: "689032636166",
appId: "1:689032636166:web:1f2e85d2dccb27a3fae087",
measurementId: "G-RP8BQFKHG1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged, getAuth }