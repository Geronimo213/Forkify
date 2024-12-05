import View from './View.js'

class BookmarksView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.bookmarks__list');
    this.errorMessage = 'Add a bookmark to save them here.'
  }


  _generateMarkup(data) {
    return data.map(recipe => {
      return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              ${recipe.title}
            </h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>
      `
    })
  }
  // render(data) {
  //   this.data = data;
  //   const markup = this._generateMarkup(data);
  //   this._clear();
  //   this.parentElement.insertAdjacentHTML('afterbegin', markup);
  // }
  addHandlerRender(handler) {
    document.querySelector('.nav__btn--bookmarks').addEventListener('mouseover', handler);
  }
}
export default new BookmarksView();