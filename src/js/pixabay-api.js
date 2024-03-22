import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
//const { default: iziToast } = require('izitoast');
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
// Controls the group number
 let page = 1;
// Controls the number of items in the group
let per_page = 15;
const totalPages = Math.ceil(100 / per_page);
const loadMoreButton = document.querySelector(".load");
const button = document.querySelector('button');
const inputSearch = document.querySelector('.search');
const loader = document.querySelector('.loader');
import { renderUsers } from './render-functions';

export async function fetchImages(globalQuery) {
  let inputSearchValue = inputSearch.value;
  const url = `https://pixabay.com/api/?key=42766573-a347fa67a5b7233d1286bfaa7&q=${inputSearchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`;
  

  if (inputSearchValue) {
    
      try{
        const response =  await axios.get(url);
      
     
      
      if (response.data.hits.length === 0) {
                    loader.style.display = 'none'; 
                    loadMoreButton.style.display = 'none';
                    iziToast.error({
                        title: '',
                        message: "Sorry, no images found for your search. Please try again!",
                    });
                } else {
                    renderUsers(response.data.hits);
                    loader.style.display = 'none'; 
                    loadMoreButton.style.display = 'block'; 
                }}
        catch(error) {
          console.log(error);
        };
       
  
  }
  }
