import ApiPixabay from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderMarkup } from './mark-up';
import { refs } from './refs';
import { smoothScroll } from './smoothScroll';

const apiPixabay = new ApiPixabay();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

async function onSearch(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  apiPixabay.page = 1;
  apiPixabay.query = e.currentTarget.elements.searchQuery.value;
  if (!apiPixabay.query) {
    refs.loadMoreBtn.classList.add('hidden');
    onError('Write the value');
    return;
  }

  try {
    refs.loadMoreBtn.classList.add('hidden');
    const card = await getData();
    if (card.totalHits === 0) {
      onError(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (card.hits.length < 40) {
      renderMarkup(card.hits);
      onResultNotify(card.totalHits);
      lightbox.refresh();
      return;
    }
    refs.loadMoreBtn.classList.remove('hidden');
    renderMarkup(card.hits);
    onResultNotify(card.totalHits);
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
}

export async function getData() {
  const response = await apiPixabay.fetchImages();
  const res = await response.data;
  return res;
}

export async function onLoadMore() {
  apiPixabay.incrementPage();
  try {
    const card = await getData();
    apiPixabay.totalPage = Math.ceil(card.totalHits / 40);
    renderMarkup(card.hits);
    smoothScroll();
    if (apiPixabay.totalPage === apiPixabay.page) {
      onEndCollection();
      refs.loadMoreBtn.classList.add('hidden');
    }
  } catch (err) {
    console.log(err);
  }
  lightbox.refresh();
}

function onError(message) {
  return Notify.failure(message);
}

function onResultNotify(total) {
  return Notify.success(`Hooray! We found ${total} images.`);
}

function onEndCollection() {
  return Notify.success(
    `"We're sorry, but you've reached the end of search results."`
  );
}
