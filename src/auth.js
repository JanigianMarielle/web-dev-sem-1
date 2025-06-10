import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { auth, onAuthStateChanged } from '/src/firebasee.js'

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}
export function signIn(email, password) {
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    console.log("Session persistence set");
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
export function logOut() {
  return signOut(auth)
}

export { auth, onAuthStateChanged}