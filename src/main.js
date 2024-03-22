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
const loadMoreButton = document.querySelector(".load");
let page = 1;
// Controls the number of items in the group
let per_page = 15;
const totalPages = Math.ceil(100 / per_page);
let globalQuery = '';
const gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
loadMoreButton.style.display = 'none';
const submitSearchImages = form.addEventListener('submit', async function (e) {
  e.preventDefault();
  globalQuery = inputSearch.value;
  page = 1;
  loader.style.display = 'flex';
  imagesGallery.innerHTML = '';
  
  try {
   await fetchImages();
   renderUsers(response.data.hits);
   loadMoreButton.style.display = 'block';
  }
  
  catch (error) {
    console.log(error);
  }

 // form.reset();
});
debugger
const loadMoreImages = loadMoreButton.addEventListener('click', async function (e) {
  e.preventDefault();
  loader.style.display = 'none';
    
  try {
   
   await fetchImages(globalQuery);
   
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

  //form.reset();
});


