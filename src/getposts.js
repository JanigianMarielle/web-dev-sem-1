
  import { addUser, getUsers, getDoc, collection, addDoc, getDocs, doc, db, serverTimestamp, query, where, orderBy } from '/src/db.js'
import { addPost } from '/src/makepost.js';

  export async function getPosts(main) {
    const postsRef = collection(db, "posts");
    const thisCategory = document.getElementById("category").textContent.toLowerCase();
    let q;

    if(main){
      const sub1 = document.getElementById("sub1").textContent.toLowerCase();
    const sub2 = document.getElementById("sub2").textContent.toLowerCase();
    const sub3 = document.getElementById("sub3").textContent.toLowerCase();
      q = query(postsRef, 
        where("category", "in", [thisCategory, sub1, sub2, sub3]),
      orderBy("createdAt", "asc"));
    }
    else {
    q = query(postsRef, 
      where("category", "==", thisCategory),
    orderBy("createdAt", "asc"));
    }

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        addPost(data.title, data.name, data.content, document.getElementById("postsContainer"));
      });

    } catch(error) {
      console.error("Error retrieving users:", error);
    }

  }

  document.addEventListener('DOMContentLoaded', () => {
    const mainCats = ["pets", "art", "health", "home and utility", "tech", "stats", "education"];
  if(mainCats.includes(document.getElementById("category").textContent.toLowerCase())){
    getPosts(true);
  } else getPosts(false);
});

  // export async function getNamesMC(categories) {
  //   const usersRef = collection(db, "users");

  //   const allUsers = new Map(); // use Map to avoid duplicates by user ID

  //   for (const category of categories) {
  //   const q = query(usersRef, where("categories", "array-contains", category));
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach((doc) => {
  //     const data = doc.data();
  //     const firstname = data.firstname || "";
  //     const lastname = data.lastname || "";
  //     allUsers.set(doc.id, `${firstname} ${lastname}`.trim());
  //   });
  

  // return Array.from(allUsers.values());
  // }