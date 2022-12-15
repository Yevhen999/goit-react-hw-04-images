const API_KEY = '30605118-54820a4d2e3a7aef14eca812a';

export async function getImages(tag, number) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${tag}&page=${number}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const data = await response.json();
  return data;
}
