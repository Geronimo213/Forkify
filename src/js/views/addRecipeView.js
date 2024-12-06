import View from './View.js';
import { state } from '../model';

class AddRecipeView extends View {
  #window;
  #overlay;
  #btnOpn;
  #btnCls;
  #submitRecipeBtn;
  constructor() {
    super();
    this.parentElement = document.querySelector('.upload');
    this.#window = document.querySelector('.add-recipe-window');
    this.#overlay = document.querySelector('.overlay');
    this.#btnOpn = document.querySelector('.nav__btn--add-recipe');
    this.#btnCls = document.querySelector('.btn--close-modal');
    this.#submitRecipeBtn = document.querySelector('.upload__btn');
    this.#addHandlerToggleWindow();
  }
  toggleWindow() {
    this.#overlay.classList.toggle('hidden');
    this.#window.classList.toggle('hidden');
  }

  #addHandlerToggleWindow() {
    [this.#btnOpn, this.#btnCls, this.#overlay].forEach(btn =>
      btn.addEventListener('click', this.toggleWindow.bind(this)),
    );
  }
  addHandlerSubmit(handler) {
    this.#submitRecipeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      try {
        const dataArr = [...new FormData(this.parentElement)];
        const data = Object.fromEntries(dataArr);
        handler(data);
      } catch (e) {
        console.error(e);
      }
    });
  }

  render() {
    this._clear();
    const markup = this._generateMarkup();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
    this.#submitRecipeBtn = document.querySelector('.upload__btn');
  }

  _generateMarkup(data) {
    return `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST123" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST123" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${this.icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
    `;
  }
}

export default new AddRecipeView();
