import { collection, addDoc, doc, setDoc, getDoc, getDocs, serverTimestamp, query, where, orderBy } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";
import { db } from "/src/firebasee.js"

export async function addUser(firstName, lastName, email, uid) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      uid: uid,
      createdAt: serverTimestamp(),
    };
  
    try {
      const docRef = await setDoc(doc(db, "users", email), user);
      console.log("Document written with ID: ", email);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

export async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  export { collection, addDoc, getDocs, getDoc, serverTimestamp, doc, db, query, where, orderBy }