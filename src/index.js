import { fetchPhotos } from './api';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

const gallery = document.querySelector('.gallery');

const form = document.querySelector('form');
const btn = document.querySelector('button');
let inputValue = '';
let page = 2;

// console.log(gallery, form, btn);
let simpleLightBox;
const loadMore = document.querySelector('.more');

form.addEventListener('submit', handleInput);

function handleInput(event) {
  // console.log(event);
  page = 1;
  event.preventDefault();
  const input = event.target.elements.searchQuery.value.trim();
  inputValue = input;
  if (input === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    gallery.innerHTML = '';
    return;
  }
  fetchPhotos(input, 1).then(data => {
    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
    } else {
      console.log(data);
      const res = markup(data.hits);
      printCount(res);
      gallery.innerHTML = res;
      // simpleLightBox = new SimpleLightbox({
      //   elements: document.querySelectorAll('li'),
      //   captionDelay: 250,
      // });

      // simpleLightBox = new SimpleLightbox('li');
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  });
}

function printCount(text) {
  let idx = 0;
  let count = 0;
  while (idx !== -1) {
    idx = text.indexOf('<li class', idx);
    if (idx !== -1) {
      idx++;
      count++;
    }
  }
  console.log(count);
}

const markup = elements => {
  return elements
    .map(
      element =>
        `<li class="gallery__item photo-card">
        <a class="gallery__link" href="${element.largeImageURL}">
    <img class="gallery__image" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
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
  </a>
  </li>`
    )
    .join('');
};

const images = document.querySelectorAll('img');
const altValues = [];

images.forEach(image => {
  altValues.push(image.alt);
});

console.log(altValues);

//  simpleLightBox = new SimpleLightbox('li').refresh();
// simpleLightBox = new SimpleLightbox({
//   elements: document.querySelectorAll('img'),
//   captions: altValues,
//   captionDelay: 250,
// });

const observer = new IntersectionObserver(callback);

async function callback(entries, observer) {
  if (entries[0].isIntersecting && inputValue !== '') {
    console.log(entries);
    const data = await fetchPhotos(inputValue, page).then(data => {
      page++;
      console.log(data);
      const res = markup(data.hits);
      // printCount(res);
      gallery.innerHTML += res;
      // simpleLightBox = new SimpleLightbox({
      //   elements: document.querySelectorAll('li'),
      //   captionDelay: 250,
      // });

      // simpleLightBox = new SimpleLightbox('li');
    });
  }
}

console.log(loadMore);
observer.observe(loadMore);

function cleanGallery() {
  refs.gallery.innerHTML = '';
  page = 1;
  loadMore.innerHTML = '';
}
