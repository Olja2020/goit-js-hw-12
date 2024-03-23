import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { renderUsers } from './js/render-functions';

const button = document.querySelector('.searchButton');
const inputSearch = document.querySelector('.search');
const imagesGallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load');

export let page = 1;
export let per_page = 15;
export let inputSearchValue = '';
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
  inputSearchValue = e.target.elements.searchImages.value;
  try {
    const response = await fetchImages();
    page += 1;
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `:x: Sorry, there was a mistake. Please try again!`,
      position: 'topRight',
    });
  }

  form.reset();
});
const loadMoreImages = loadMoreButton.addEventListener(
  'click',
  async function (e) {
    e.preventDefault();

    loader.style.display = 'flex';
    loadMoreButton.style.display = 'none';
    try {
      const response = await fetchImages();
      page += 1;
      loader.style.display = 'none';

      if (page > response.totalHits / per_page) {
        loadMoreButton.style.display = 'none';
        return iziToast.error({
          color: 'blue',
          message: `:x: We're sorry, but you've reached the end of search results.`,
          position: 'topRight',
        });
      }
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  }
);
