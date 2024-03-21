// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { renderUsers } from './js/render-functions';

const button = document.querySelector('button');
const inputSearch = document.querySelector('.search');
const imagesGallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector(".load");
let page = 1;
// Controls the number of items in the group
let per_page = 15;
const totalPages = Math.ceil(100 / per_page);

const gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const submitSearchImages = form.addEventListener('submit', async function (e) {
  e.preventDefault();

  loader.style.display = 'flex';
  imagesGallery.innerHTML = '';
  if (page > totalPages) {
        return iziToast.error({
          position: "topRight",
          message: "We're sorry, but you've reached the end of search results."
        });
      }
  try {
   await fetchImages();
   renderUsers(response.data.hits);
  }
  
  catch (error) {
    iziToast.error({
      color: 'red',
      message: `:x: Sorry, there was a mistake. Please try again!`,
      position: 'topRight',
    });
  }

  form.reset();
});

const loadMoreImages = form.addEventListener('submit', async function (e) {
  e.preventDefault();

  loader.style.display = 'flex';
  
  try {
   await fetchImages();
   
    page += 1;
    if (page > 1) {
      //fetchPostsBtn.textContent = "Fetch more images";
     }
  }
  
  catch (error) {
    iziToast.error({
      color: 'red',
      message: `:x: Sorry, there was a mistake. Please try again!`,
      position: 'topRight',
    });
  }

  form.reset();
});


// +++++++++++++++++++++++++++==
// import axios from 'axios';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const button = document.querySelector('button');
// const inputSearch = document.querySelector('.search');
// const imagesGallery = document.querySelector('.gallery');
// const loader = document.querySelector('.loader');
// const loadMoreButton = document.querySelector('.load');

// let page = 1;
// let limit = 15; // Показувати по 15 зображень на сторінці
// let globalQuery = ''; // Глобальна змінна для збереження запиту користувача

// form.addEventListener("submit", async function(e) {
//     e.preventDefault();
//     globalQuery = inputSearch.value;
//     page = 1; // Скидаємо сторінку до початкового значення при новому запиті.
//     imagesGallery.innerHTML = ''; // Очистка галереї перед новим пошуком
//     loader.style.display = 'block'; // Показуємо індикатор завантаження
//     await fetchImages();
// });

// loadMoreButton.addEventListener('click', async () => {
//     page++;
//     await fetchImages();
// });

// async function fetchImages() {
//     const url = https://pixabay.com/api/?key=42766573-a347fa67a5b7233d1286bfaa7&q=${globalQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limit};

//     try {
//         const response = await axios.get(url);

//         if (response.data.hits.length === 0) {
//             loader.style.display = 'none'; // Приховуємо індикатор завантаження
//             iziToast.error({
//                 title: '',
//                 message: "Sorry, no images found for your search. Please try again!",
//             });
//         } else {
//             renderImages(response.data.hits);
//             loader.style.display = 'none'; // Приховуємо індикатор завантаження
//             loadMoreButton.style.display = 'block'; // Показуємо кнопку "Load more"
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// function renderImages(images) {
//     const markup = images.map(image => {
//         return <div class="card">
//             <a class="gallery-link" href="${image.largeImageURL}">
//                 <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
//             </a>
//             <ul class="list">
//                 <li class="item">Likes: <span>${image.likes}</span></li>
//                 <li class="item">Views: <span>${image.views}</span></li>
//                 <li class="item">Comments: <span>${image.comments}</span></li>
//                 <li class="item">Downloads: <span>${image.downloads}</span></li>
//             </ul>
//         </div>;
//     }).join('');

//     imagesGallery.innerHTML += markup; // Додаємо нові зображення до існуючого контенту галереї

//     const lightbox = new SimpleLightbox('.gallery a');
//     lightbox.refresh();
// }