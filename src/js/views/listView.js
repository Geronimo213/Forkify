import View from './view';
class ListView extends View {
  #page;
  #pageSize;
  #paginationContainer;
  #totalPages;
  constructor() {
    super();
    this.parentElement = document.querySelector('.results');
    this.#pageSize = 14;
    this.#page = 1;
    this.#paginationContainer = document.querySelector('.pagination');
  }
  render(data) {
    this.data = data;
    this.#totalPages = Math.ceil(data.length / this.#pageSize);
    this.#page = 1;
    const markup = this._generateMarkup(data);
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
    this.#generatePageBtns();
  }
  #refresh(data) {
    this._clear();
    const markup = this._generateMarkup(data);
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
    this.#generatePageBtns();
  }
  nextHandler = e => {
    e.preventDefault();
    this.#page++;
    this.#refresh(this.data);
  };
  prevHandler = e => {
    e.preventDefault();
    this.#page--;
    this.#refresh(this.data);
  };

  _generateMarkup(data) {
    const id = window.location.hash.slice(1);
    const startIndex = (this.#page - 1) * this.#pageSize;
    const endIndex = startIndex + this.#pageSize;
    return data
      .slice(startIndex, endIndex)
      .map(recipe => {
        return `
      <li class="preview">
        <a class="preview__link ${recipe.id === id ? 'preview__link--active' : ''}" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.imageUrl}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title.substring(0, 30)} ...</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${this.icons}#icon-user"></use>
            </svg>
          </div>
        </div>
        </a>
      </li>`;
      })
      .join('');
  }
  #generatePageBtns = () => {
    const hasPrevPage = this.#page > 1;
    const hasNextPage = this.#page < this.#totalPages;
    this.#paginationContainer.innerHTML = '';
    this.#paginationContainer.insertAdjacentHTML(
      'afterbegin',
      `
    <button class="btn--inline pagination__btn--prev ${hasPrevPage ? '' : 'hidden'}" ${hasPrevPage ? '' : 'disabled'}>
      <svg class="search__icon">
        <use href="${this.icons}.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${this.#page - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next ${hasNextPage ? '' : 'hidden'}" ${hasNextPage ? '' : 'disabled'}>
      <span>Page ${this.#page + 1}</span>
      <svg class="search__icon">
        <use href="${this.icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `,
    );
    document
      .querySelector('.pagination__btn--prev')
      .addEventListener('click', this.prevHandler);
    document
      .querySelector('.pagination__btn--next')
      .addEventListener('click', this.nextHandler);
  };
  addHandlerRender(handler) {}
}

export default new ListView();
