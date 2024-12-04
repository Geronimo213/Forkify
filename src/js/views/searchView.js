import View from './View.js';

class SearchView extends View {
  #searchForm;
  constructor() {
    super();
    this.#searchForm = document.querySelector('.search');
  }
  get searchForm() {
    return this.#searchForm;
  }
  addHandlerRender(handler) {
    this.searchForm.addEventListener('submit', handler);
  }
}

export default new SearchView();
