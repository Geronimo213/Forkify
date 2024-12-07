import icons from 'url:../../img/icons.svg';
export default class View {
  #data;
  #icons = icons;
  /**
   * @type Element
   */
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

  /**
   *
   * @returns {Element}
   */
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
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this.data = data;
    const markup = this._generateMarkup(data);
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this.data = data;
    const newMarkup = this._generateMarkup(data);
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));
    newElements.forEach((newElement, idx) => {
      const currentElement = curElements[idx];
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }
      // Update new attributes
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value),
        );
      }
    });
  }
  _clear() {
    this.parentElement.innerHTML = '';
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
   * @param handler - callback function to handler
   * @returns void
   */
  addHandlerRender(handler) {
    throw 'Abstract method is not implemented.';
  }
}
