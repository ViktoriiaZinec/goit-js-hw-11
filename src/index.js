import { fetchPhotos } from './api';
import debounce from 'lodash.debounce';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

const gallery = document.querySelector('.gallery');

const form = document.querySelector('form');
const btn = document.querySelector('button');
// console.log(gallery, form, btn);
let simpleLightBox;

form.addEventListener('submit', handleInput);

function handleInput(event) {
  // console.log(event);
  page = 1;
  event.preventDefault();
  const input = event.target.elements.searchQuery.value.trim();
  if (input === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    gallery.innerHTML = '';
    return;
  }
  fetchPhotos(input).then(data => {
    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
    } else {
      console.log(data);
      const res = markup(data.hits);
      gallery.innerHTML = res;
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  });
}

const markup = elements => {
  return elements
    .map(
      element =>
        `<a class="photo-card gallery__link" href="${element.largeImageURL}">
    <img src="${element.webformatURL}" alt="" width='340' height='220' loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes:<br/> ${element.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:<br/> ${element.views}</b>
      </p>
      <p class="info-item">
        <b>Comments:<br/> ${element.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:<br/> ${element.downloads}</b>
      </p>
    </div>
  </a>`
    )
    .join('');
};

const images = document.querySelectorAll('img');
const altValues = [];

images.forEach(image => {
  altValues.push(image.alt);
});

console.log(altValues);

simpleLightBox = new SimpleLightbox({
  elements: document.querySelectorAll('img'),
  captions: altValues,
  captionDelay: 250,
});
simpleLightBox = new SimpleLightbox('.gallery a').refresh();
Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
