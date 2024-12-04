import icons from 'url:../../img/icons.svg';

/**
 * @template
 */
export default class View {
  #data;
  #icons = icons;
  #parentElement;
  #errorMessage = '';
  #successMessage = '';
  get data() {
    return this.#data;
  }
  set data(data) {
    this.#data = data;
  }
  get icons() {
    return this.#icons;
  }
  get parentElement() {
    return this.#parentElement;
  }
  set parentElement(parentElement) {
    this.#parentElement = parentElement;
  }
  get errorMessage() {
    return this.#errorMessage;
  }
  set errorMessage(msg) {
    this.#errorMessage = msg;
  }
  get successMessage() {
    return this.#successMessage;
  }
  set successMessage(msg) {
    this.#successMessage = msg;
  }
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${this.icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.parentElement.innerHTML = '';
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this.#errorMessage) {
    this._clear();
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${this.icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this.#successMessage) {
    this._clear();
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${this.icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this.parentElement.innerHTML = '';
  }
  render(data) {
    this.data = data;
    const markup = this._generateMarkup();
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   *
   * @private
   * @returns string - HTML markup
   */
  _generateMarkup(data) {
    return `<div>${data}</div>`;
  }

  /**
   * @abstract
   * @param handler - callback function to handler
   * @returns void
   */
  addHandlerRender(handler) {
    throw 'Abstract method is not implemented.';
  }
}
