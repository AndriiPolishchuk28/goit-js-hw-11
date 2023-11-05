const axios = require('axios').default;

const API_KEY = '40423678-d168429128686f2691e5973ea';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPage = null;
  }

  async fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&safesearch=true&orientation=horizontal&per_page=40&page=${this.page}`;
    return await axios.get(url);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
}
