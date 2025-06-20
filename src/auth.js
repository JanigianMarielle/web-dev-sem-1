import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { auth, onAuthStateChanged } from './firebasee.js'
import { doc, getDoc } from "./db.js";
let userName = "";

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}
export async function signIn(email, password) {

const docRef = doc(db, "users", email);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  console.log("firstname:", docSnap.firstName + docSnap.lastName);
  userName = docSnap.firstName + docSnap.lastName;
  console.log("username", userName);
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!")
}
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    console.log("Session persistence set");
    // New sign-in will be persisted with session persistence.
    console.log(userName);
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
export function logOut() {
  userName = "";
  return signOut(auth)
}

export { auth, onAuthStateChanged, userName }