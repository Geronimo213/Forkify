import icons from 'url:../../img/icons.svg';
export default class View {
  #data;
  #icons = icons;
  #parentElement;
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
  _clear() {
    this.parentElement.innerHTML = '';
  }
  render(data) {
    this.data = data;
    const markup = this._generateMarkup();
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _generateMarkup() {
    console.error('should be overloaded!');
    return `<div>${this.data}</div>`;
  }
}
