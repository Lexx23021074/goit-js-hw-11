import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loaderContainer = document.querySelector('.loader-container');

let lightbox = null;

function initOrRefreshLightbox() {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

function showLoader() {
  loaderContainer.classList.remove('hidden');
}

function hideLoader() {
  loaderContainer.classList.add('hidden');
}

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topLeft',
    });
    return;
  }

  try {
    showLoader(); // 🔹 показуємо лоадер перед запитом

    const data = await fetchImages(query);

    if (!data.hits.length) {
      gallery.innerHTML = '';
      initOrRefreshLightbox();
      iziToast.info({
        title: 'Немає результатів',
        message: 'За вашим запитом нічого не знайдено.',
        position: 'topRight',
      });
      return;
    }

    gallery.innerHTML = renderGallery(data.hits);
    initOrRefreshLightbox();
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Помилка',
      message: 'Щось пішло не так. Спробуйте пізніше.',
      position: 'topRight',
    });
  } finally {
    hideLoader(); // 🔹 ховаємо лоадер у будь-якому випадку
  }
}
