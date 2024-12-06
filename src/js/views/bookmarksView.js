import View from './View.js'

class BookmarksView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.bookmarks__list');
    this.successMessage = 'Add a bookmark to save them here.'
  }


  _generateMarkup(data) {
    const id = window.location.hash.slice(1);

    return data.map(recipe => {
      return `
      <li class="preview">
        <a class="preview__link ${recipe.id === id ? 'preview__link--active' : ''}" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">
              ${recipe.title}
            </h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>
      `
    })
  }
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderMessage();
    }
    this.data = data;
    const markup = this._generateMarkup(data);
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // addHandlerRender(handler) {
  //   document.querySelector('.nav__btn--bookmarks').addEventListener('mouseover', handler);
  // }
}
export default new BookmarksView();