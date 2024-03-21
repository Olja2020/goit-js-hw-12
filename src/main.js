// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';

const button = document.querySelector('button');
const inputSearch = document.querySelector('.search');
const imagesGallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector(".load");
let page = 1;
// Controls the number of items in the group
let per_page = 15;
const totalPages = Math.ceil(100 / limit);

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
