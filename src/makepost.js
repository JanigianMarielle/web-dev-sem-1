import {userName} from "./index.js";
import { db } from './db.js';
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

      console.log("Username:", userName);
      console.log("Session storage name: ", sessionStorage.getItem("name"));
    //   document.getElementById("test").innerHTML = userName;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addPostBtn");
  const name = sessionStorage.getItem("name");
  addBtn.style.display = "none";

  if (name && name.trim() != "") {
    addBtn.style.display = "inline-block";
  }
});


async function savePost(name, category, content, title) {
    const post = {
      name: name,
      category: category,
      content: content,
      title: title,
      createdAt: serverTimestamp(),
    };
  
    try {
      const docRef = await setDoc(doc(db, "posts", title), post);
      console.log("Document written with Title: ", title);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


    let postCount = 1;
    const modal = document.getElementById('modal');
    const addPostBtn = document.getElementById('addPostBtn');
    const submitPost = document.getElementById('submitPost');
    const closeModal = document.getElementById('closeModal');

    addPostBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    submitPost.addEventListener('click', () => {
      const container = document.getElementById('postsContainer');
      const titleValue = document.getElementById('postTitle').value.trim();
      const contentValue = document.getElementById('postContent').value.trim();
      if (!titleValue || !contentValue) return;

      addPost(titleValue, sessionStorage.getItem("name"), contentValue, container);
      modal.style.display = 'none';
      document.getElementById('postTitle').value = '';
      document.getElementById('postContent').value = '';
      postCount++;

      savePost(sessionStorage.getItem("name"), document.getElementById("category").textContent.toLowerCase(), contentValue, titleValue);
    });

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }


export async function addPost(titleValue, posterName, contentValue, container) {
    const card = document.createElement('div');
      card.className = 'postCard';

      const title = document.createElement('h3');
      title.textContent = titleValue;

      const name = document.createElement('p');
      name.className = 'name';
      name.textContent = posterName;

      const hr = document.createElement('hr');

      const content = document.createElement('p');
      content.className = 'content';
      content.textContent = contentValue;

      card.appendChild(title);
      card.appendChild(name);
      card.appendChild(hr);
      card.appendChild(content);

      container.prepend(card);
}