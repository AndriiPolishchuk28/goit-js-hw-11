import ApiPixabay from './api-service';
import { getData } from './index';
import { renderMarkup } from './mark-up';
import SimpleLightbox from 'simplelightbox';
import refs from './refs';

const apiPixabay = new ApiPixabay();
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

export async function onLoadMore() {
  apiPixabay.incrementPage();
  try {
    const card = await getData();
    apiPixabay.totalPage = Math.ceil(card.totalHits / 40);
    renderMarkup(card.hits);
    if (apiPixabay.totalPage === apiPixabay.page) {
      refs.loadMoreBtn.classList.add('hidden');
    }
  } catch (err) {
    console.log(err);
  }
}
