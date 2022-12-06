const API_KEY = '30605118-54820a4d2e3a7aef14eca812a';

export function getImages(word) {
  return fetch(
    `https://pixabay.com/api/?q=${word}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}
