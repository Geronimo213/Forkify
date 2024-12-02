import View from './view';
class ListView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.results');
  }

  _generateMarkup() {
    return this.data
      .map(recipe => {
        return `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${recipe.id}">
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
}

export default new ListView();
