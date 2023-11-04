import { refs } from './refs';

export function renderMarkup(data) {
  const markup = data
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<div class="photo-card">
      <a href="${largeImageURL}" class='large-image'><img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200"/></a>
    <div class="info">
      <p class="info-item">
       <b>Likes</b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
      <b>Views</b>
        <span>${views}</span>
      </p>
      <p class="info-item">
      <b>Comments</b>
        <span>${comments}</span>
      </p>
      <p class="info-item">
      <b>Downloads</b>
        <span>${downloads}</span>
      </p>
    </div>
  </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
