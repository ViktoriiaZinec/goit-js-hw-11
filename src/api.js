import axios from 'axios';

// https://pixabay.com/api/?key=36254227-b1cc2f8da5f48ab7368a52fdf&q=yellow+flowers&image_type=photo&pretty=true

// key: 36254227-b1cc2f8da5f48ab7368a52fdf;
// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '34532945-6dd9e50d65c600f2d5972702b';

const API = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '36254227-b1cc2f8da5f48ab7368a52fdf',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 10,
  },
});
// const API = 'https://rickandmortyapi.com/api/';
// const KEY = '36254227-b1cc2f8da5f48ab7368a52fdf';

export async function fetchPhotos(input, index) {
  //   console.log(input);
  return await API.get('', { params: { q: input, page: index } }).then(
    response => {
      console.log(response.data);
      return response.data;
    }
  );
}
