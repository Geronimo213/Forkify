import View from './View.js';
import { state } from '../model';
import { timeout } from '../helpers';

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
    this.#submitRecipeBtn.addEventListener('click', e => {
      e.preventDefault();
      try {
        this.#validateForm();
        const dataArr = [...new FormData(this.parentElement)];
        const data = Object.fromEntries(dataArr);
        handler(data);
      } catch (e) {
        // this.renderError(e.message);
      }
    });
  }
  #validateForm() {
    for (const el of this.parentElement.querySelectorAll('[required]')) {
      if (!el.reportValidity()) {
        throw new Error('Please fill in all fields');
      }
    }
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
          <label for="title">Title</label>
          <input
            value=""
            placeholder="Shrimp Fried Rice"
            required
            id="title"
            name="title"
            type="text"
          />
          <label for="sourceUrl">Instructions URL</label>
          <input
            value=""
            placeholder="https://www.example.com/my-recipe"
            required
            id="sourceUrl"
            name="sourceUrl"
            type="text"
          />
          <label for="image">Image URL</label>
          <input
            value=""
            placeholder="https://www.example.com/my-image.jpg"
            required
            id="image"
            name="image"
            type="text"
          />
          <label for="publisher">Publisher</label>
          <input
            value=""
            placeholder="America's Test Kitchen"
            required
            id="publisher"
            name="publisher"
            type="text"
          />
          <label for="cookingTime">Prep time</label>
          <input
            value=""
            placeholder="45 (in minutes)"
            required
            id="cookingTime"
            name="cookingTime"
            type="number"
          />
          <label for="servings">Servings</label>
          <input
            value=""
            placeholder="4"
            required
            id="servings"
            name="servings"
            type="number"
          />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label for="ingredient-1">Ingredient 1</label>
          <input
            value=""
            type="text"
            required
            id="ingredient-1"
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label for="ingredient-2">Ingredient 2</label>
          <input
            value=""
            type="text"
            id="ingredient-2"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label for="ingredient-3">Ingredient 3</label>
          <input
            value=""
            type="text"
            id="ingredient-3"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label for="ingredient-4">Ingredient 4</label>
          <input
            type="text"
            id="ingredient-4"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label for="ingredient-5">Ingredient 5</label>
          <input
            type="text"
            id="ingredient-5"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label for="ingredient-6">Ingredient 6</label>
          <input
            type="text"
            id="ingredient-6"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
    `;
  }
}

export default new AddRecipeView();
