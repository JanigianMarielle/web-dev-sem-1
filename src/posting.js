import { collection, addDoc, getDocs, getDoc, serverTimestamp, doc, db, query, where } from "./db.js";
import { auth, onAuthStateChanged } from './auth.js';

const user = auth.currentUser;

console.log(user);
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const email = user.email;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
  console.log("User is logged in:", email, uid);
}
else {console.log("No user is logged in");}