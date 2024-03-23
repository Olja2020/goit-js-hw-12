import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import { per_page } from '../main.js';

const loadMoreButton = document.querySelector('.load');
const button = document.querySelector('.searchButton');
const inputSearch = document.querySelector('.search');
const loader = document.querySelector('.loader');
import { renderUsers } from './render-functions';
import { page } from '../main.js';
import { inputSearchValue } from '../main.js';
const totalPages = Math.ceil(100 / per_page);

export async function fetchImages() {
  const url = `https://pixabay.com/api/?key=42766573-a347fa67a5b7233d1286bfaa7&q=${inputSearchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`;

  if (inputSearchValue) {
    try {
      const response = await axios.get(url);
      if (response.data.hits.length === 0) {
        loader.style.display = 'none';
        loadMoreButton.style.display = 'none';
      } else {
        renderUsers(response.data.hits);
        loader.style.display = 'none';
        loadMoreButton.style.display = 'block';
      }

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
