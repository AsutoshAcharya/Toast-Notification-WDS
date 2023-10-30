const DEFAULT_OPTIONS = {
  autoClose: 3000,
  position: "top-right",
};
export default class Toast {
  #toastElement; //private variable
  #autoCloseTimeout;
  constructor(options) {
    this.#toastElement = document.createElement("div");
    this.#toastElement.classList.add("toast");
    Object.entries({ ...DEFAULT_OPTIONS, ...options }).forEach(
      ([key, value]) => {
        this[key] = value;
      }
    );
  }
  set position(value) {
    console.log(value);
    const selector = `.toast-container[data-position="${value}]"`;
    const container =
      document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElement);
  }
  set text(value) {
    this.#toastElement.textContent = value;
  }
  set autoClose(value) {
    if (value === false) return;
    if (this.#autoCloseTimeout !== null) clearTimeout(this.#autoCloseTimeout);
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }
  //   show() {

  //   }
  update() {}
  remove() {
    // document.body.remove(".toast-container");
    // or
    const container = this.#toastElement.parentElement;
    this.#toastElement.remove();
    if (container.hasChildNodes()) return;
    container.remove();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.append(container);
  return container;
}
