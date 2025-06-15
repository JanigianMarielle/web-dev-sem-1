function register(event) {
    console.log(`register called ${event}`);
    event.preventDefault();
    alert("hi");
  }
  
  function logSearch() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();
    const resultsContainer = document.getElementById("searchResults");
    const categories = document.querySelectorAll("#main-categories .card-body");

    resultsContainer.innerHTML = ""; // Clear previous results

    if (searchInput.trim() === "") return; // Do nothing if input is blank

    categories.forEach((category) => {
      const h5 = category.querySelector("h5");
      const link = category.querySelector("a");

      if (h5 && link && h5.textContent.toLowerCase().startsWith(searchInput)) {
        const resultItem = document.createElement("div");
        resultItem.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-3"; // Add vertical gap with mb-3
        resultItem.innerHTML = `
          <div class="card">
            <div class="card-body"> <!-- Set text color -->
              <a href="${link.getAttribute("href")}">${h5.textContent}</a>
            </div>
          </div>
        `;
        resultsContainer.appendChild(resultItem);
      }
    });
  }
  
import { signUp, signIn, logOut, auth } from './auth.js'
import { addUser, db } from './db.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

let userName = "";

try {
  document.getElementById("signUpBtn").addEventListener('click', async () => {
    const emailInput = document.querySelector("#signUpEmail")
    const passwordInput = document.querySelector("#signUpPassword")
    const email = emailInput.value;
    const password = passwordInput.value;
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    console.log("email:", email, "password:", password);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            console.log("User is signed in with UID:", uid);
            // You can now use this UID to create the user profile in Firestore.
            addUser(firstName, lastName, email, user.uid)
          
              const docRef = doc(db, "users", email);
              const docSnap = await getDoc(docRef); // Await the Promise here
          
              if (docSnap.exists()) {
              const userData = docSnap.data();
              console.log("3"); // Use .data() to get the document's data
              console.log("docSnap data:", userData);
              document.getElementById("helloName").innerHTML = `Hello, ${userData.firstName}`;
              userName = userData.firstName + " " + userData.lastName;
              console.log("Username: ", userName);
              sessionStorage.setItem("name", userName);
              console.log("Session storage name: ", sessionStorage.getItem("name"));

            } else {
              console.log("No such document!");
              document.getElementById("helloName").innerHTML = "Hello, Guest";
            }
              const authModal = new bootstrap.Modal(document.getElementById('loginModal'));
          authModal.hide();
}
        })
        
    } catch{}
  });
}
catch {}
  
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

try {
  document.querySelector('#signInBtn').addEventListener('click', async () => {
    const email = document.querySelector("#signInEmail").value;
    const password = document.querySelector("#signInPassword").value;
    console.log("email:", email, "password:", password);

    try {
      const userCred = signInWithEmailAndPassword(auth, email, password);

      console.log("0");
      const docRef = doc(db, "users", email);
      console.log("1");
      const docSnap = await getDoc(docRef);
      console.log("2"); // Await the Promise here
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("3"); // Use .data() to get the document's data
        console.log("docSnap data:", userData);
        document.getElementById("helloName").innerHTML = `Hello, ${userData.firstName}`;
        userName = userData.firstName + " " + userData.lastName;
        console.log("Username: ", userName);
        sessionStorage.setItem("name", userName);
        console.log("Session storage name: ", sessionStorage.getItem("name"));

      } else {
        console.log("No such document!");
        document.getElementById("helloName").innerHTML = "Hello, Guest";
      }
      const authModal = new bootstrap.Modal(document.getElementById('loginModal'));
          authModal.hide();
          console.log("4");
    } catch (err) {
      console.error("Error signing in or fetching document:", err);
    }
  });
  
} catch {}

try {
  document.querySelector('#logout').addEventListener('click', () => {
    logOut()
      .then(() => {
        sessionStorage.removeItem("name");

      })
      .catch(err => {
      })
  })
} catch {}

document.addEventListener("DOMContentLoaded", () => {
  if(sessionStorage.getItem("name")){
    let firstName = sessionStorage.getItem("name").split(" ")[0];
    document.getElementById("helloName").innerHTML = `Hello, ${firstName}`;
  }
 
});


 export { userName }