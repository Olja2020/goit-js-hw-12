//const { default: iziToast } = require('izitoast');
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
// Controls the group number
 let page = 1;
// Controls the number of items in the group
let limit = 15;
const totalPages = Math.ceil(100 / limit);

const button = document.querySelector('button');
const inputSearch = document.querySelector('.search');
const loader = document.querySelector('.loader');
import { renderUsers } from './render-functions';

export async function fetchImages() {
  let inputSearchValue = inputSearch.value;
  const url = `https://pixabay.com/api/?key=42766573-a347fa67a5b7233d1286bfaa7&q=${inputSearchValue}&image_type=photo&orientation=horizontal&safesearch=true`;
  {
      const params = new URLSearchParams({
        _limit: limit,
        _page: page
      });

  if (inputSearchValue) {
    setTimeout(() => {
      //try {
      const response =  axios.get(url)
        .then(response => {
          
        return response.json();
        })
      
        .then(data => {
          if (response.data.hits.length === 0) {
            iziToast.error({
              title: '',
              message:
                'Sorry, there are no images matching your search query. Please try again!',
            });
          } else {
            const imagesData = {
              totalHits: data.totalHits,
              total: data.total,
              images: data.hits,
            };
            renderUsers(response.data.hits);
          }
      })
      
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          loader.style.display = 'none';
        });
  }, 1000);
  }
}
}


// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");

// // Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let limit = 40;
// // In our case total number of pages is calculated on frontend
// const totalPages = Math.ceil(100 / limit);

// fetchPostsBtn.addEventListener("click", async () => {
//   // Check the end of the collection to display an alert
//   if (page > totalPages) {
//     return iziToast.error({
//       position: "topRight",
//       message: "We're sorry, there are no more posts to load"
//     });
//   }

//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts);
//     // Increase the group number
//     page += 1;

//     // Replace button text after first request
//     if (page > 1) {
//       fetchPostsBtn.textContent = "Fetch more posts";
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// async function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: limit,
//     _page: page
//   });

//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts?${params}`
//   );
//   return response.data;
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   postList.insertAdjacentHTML("beforeend", markup);
// }
// ********************************
// export async function fetchImages() {
//   let inputSearchValue = inputSearch.value;
//   const url = https://pixabay.com/api/?key=42766573-a347fa67a5b7233d1286bfaa7&q=${inputSearchValue}&image_type=photo&orientation=horizontal&safesearch=true;

//   if (inputSearchValue) {
//     setTimeout(() => {
//       axios.get(url)
//         .then(response => {
//           return response.data;
//         })
//         .then(data => {
//           if (data.hits.length === 0) {
//             iziToast.error({
//               title: '',
//               message: 'Sorry, there are no images matching your search query. Please try again!',
//             });
//           } else {
//             const imagesData = {
//               totalHits: data.totalHits,
//               total: data.total,
//               images: data.hits,
//             };
//             renderUsers(data.hits);
//           }
//         })
//         .catch(error => {
//           console.log(error);
//         })
//         .finally(() => {
//           loader.style.display = 'none';
//         });
//     }, 1000);
//   }
// }