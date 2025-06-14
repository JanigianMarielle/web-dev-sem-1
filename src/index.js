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

// userForm.addEventListener("submit", (e) => {
//   e.preventDefault(); // Prevent the form from submitting in the traditional way

//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;

//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const uid = user.uid;
//       console.log("User is signed in with UID:", uid);
//       // You can now use this UID to create the user profile in Firestore.
//       const user = {
//         name: name,
//         email: email,
//         uid: uid,
//         createdAt: serverTimestamp()
//       };
//       try {
//         const docRef = await addDoc(collection(db, "users"), user);
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     } else {
//       // User is signed out
//       console.log("User is signed out");
//     }
//   });
// });s
  
  //test info for user adding
/*  let fN = window.prompt("first name:","John");
  let lN = window.prompt("last name:","Doe");
  let email = window.prompt("email", "john@doe.com");
  let userid = window.prompt("uid", "jd");



  addUser(fN, lN, email, userid, [1,2,3,0])

  console.log(getUsers())
*/
  const emailInput = document.querySelector("#email")
  const passwordInput = document.querySelector("#password")
  const statusText = document.querySelector('#status')
  
import { signUp, signIn, logOut, auth } from './auth.js'
import { addUser, db } from './db.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

let userName = "";

try {
  document.getElementById("signup").addEventListener('click', async () => {
    const email = emailInput.value
    const password = passwordInput.value
    const selectedCategories = Array.from(document.querySelectorAll('input[class="subcategory"]:checked'))
    .map(checkbox => checkbox.value);
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
  
    signUp(email, password)
      .then(userCred => {
        statusText.textContent = `Signed up: ${userCred.user.email}`
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            console.log("User is signed in with UID:", uid);
            // You can now use this UID to create the user profile in Firestore.
            addUser(firstName, lastName, email, user.uid, selectedCategories)
            
            try {
              const userCred = await signIn(email, password);
              statusText.textContent = `Signed in: ${userCred.user.email}`;
          
              const docRef = doc(db, "users", email);
              const docSnap = await getDoc(docRef); // Await the Promise here
          
              if (docSnap.exists()) {
                const userData = docSnap.data(); // Use .data() to get the document's data
                console.log("docSnap data:", userData);
                document.getElementById("helloName").innerHTML = `Hello, ${userData.firstName}`;
              } else {
                console.log("No such document!");
                document.getElementById("helloName").innerHTML = "Hello, Guest";
              }
              const authModal = new bootstrap.Modal(document.getElementById('authModal'));
          authModal.hide();
            } catch (err) {
              statusText.textContent = `Error: ${err.message}`;
              console.error("Error signing in or fetching document:", err);
            }
          
          } else {
            // User is signed out
            console.log("User is signed out");
          }
        });
      })
      .catch(err => {
        statusText.textContent = `Error: ${err.message}`
      })

  })
}
catch {}
  
import { setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

try {
  document.querySelector('#signin').addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log("email:", email, "password:", password);
  
    try {
      setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    console.log("Session persistence set");
    // New sign-in will be persisted with session persistence.
    const userCred = signInWithEmailAndPassword(auth, email, password);
    statusText.textContent = `Signed in: ${userCred.user.email}`;
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  

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
        console.log(userName);

      } else {
        console.log("No such document!");
        document.getElementById("helloName").innerHTML = "Hello, Guest";
      }
      const authModal = new bootstrap.Modal(document.getElementById('authModal'));
          authModal.hide();
          console.log("4");
    } catch (err) {
      statusText.textContent = `Error: ${err.message}`;
      console.error("Error signing in or fetching document:", err);
    }
  });
  
} catch {}

try {
  document.querySelector('#logout').addEventListener('click', () => {
    logOut()
      .then(() => {
        statusText.textContent = 'Signed out'
      })
      .catch(err => {
        statusText.textContent = `Error: ${err.message}`
      })
  })
} catch {}


  // document.addEventListener("DOMContentLoaded", () => {
  //   const signupForm = document.getElementById("signupForm");
  //   const submitButton = document.getElementById("submitButton");
  
  //   submitButton.addEventListener("click", () => {
  //     const username = document.getElementById("username").value.trim();
  //     const selectedCategories = Array.from(
  //       signupForm.querySelectorAll("input[name='category']:checked")
  //     ).map((checkbox) => checkbox.value);
  
  //     if (username && selectedCategories.length > 0) {
  //       selectedCategories.forEach((category) => {
  //         const categorySection = document.getElementById(category);
  //         const cardContainer = categorySection.querySelector(".cards");
  
  //         // Create a new card
  //         const card = document.createElement("div");
  //         card.classList.add("card");
  //         card.textContent = username;
  
  //         // Append the card to the category
  //         cardContainer.appendChild(card);
  //       });
  
  //       // Clear the form
  //       signupForm.reset();
  //     } else {
  //       alert("Please enter your name and select at least one category.");
  //     }
  //   });
  // });


 export { userName }