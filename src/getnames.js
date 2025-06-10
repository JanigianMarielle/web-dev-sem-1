
  import { addUser, getUsers, getDoc, collection, addDoc, getDocs, doc, db, serverTimestamp, query, where } from '/src/db.js'


  export async function getNames(category) {
    const usersRef = collection(db, "users");
    const thisCategory = category;

    const q = query(usersRef, where("categories", "array-contains", thisCategory));
    const matchingUsers = [];

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const name = (data.firstName || "") + ' ' + (data.lastName || "");
        matchingUsers.push(name);
        console.log("User found:", name);
      });
      console.log("Total users found in category:", matchingUsers.length);
      console.log("Users in category:", thisCategory, matchingUsers);
      return matchingUsers;

    } catch(error) {
      console.error("Error retrieving users:", error);

      return [];
    }

  }

  export async function getNamesMC(categories) {
    const usersRef = collection(db, "users");

    const allUsers = new Map(); // use Map to avoid duplicates by user ID

    for (const category of categories) {
    const q = query(usersRef, where("categories", "array-contains", category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const firstname = data.firstname || "";
      const lastname = data.lastname || "";
      allUsers.set(doc.id, `${firstname} ${lastname}`.trim());
    });
  

  return Array.from(allUsers.values());
  }
}