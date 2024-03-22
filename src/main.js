import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { renderUsers } from './js/render-functions';

const button = document.querySelector('button');
const inputSearch = document.querySelector('.search');
const imagesGallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load');

let page = 1;
let per_page = 15;
export let inputSearchValue = inputSearch.value;
const totalPages = Math.ceil(100 / per_page);
const gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const submitSearchImages = form.addEventListener('submit', async function (e) {
  e.preventDefault();
  page = 1;
  loader.style.display = 'flex';
  imagesGallery.innerHTML = '';

  try {
    const response = await fetchImages();
    loadMoreButton.style.display = 'block';
    page += 1;
  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `:x: Sorry, there was a mistake. Please try again!`,
      position: 'topRight',
    });
  }

  // form.reset();
});
const loadMoreImages = loadMoreButton.addEventListener(
  'click',
  async function (e) {
    e.preventDefault();

    loader.style.display = 'none';

    try {
      //  await fetchImages();
      const response = await fetchImages();
    } catch (error) {
      iziToast.error({
        color: 'red',
        message: `:x: Sorry, there was a mistake. Please try again!`,
        position: 'topRight',
      });
    }

    //form.reset();
  }
);
