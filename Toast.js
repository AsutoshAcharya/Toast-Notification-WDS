const DEFAULT_OPTIONS = {
  autoClose: 3000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  showProgress: true,
};
export default class Toast {
  #toastElement; //private variable
  #autoCloseTimeout;
  #progressInterval;
  #removeBinded;
  #visibleSince;
  #autoClose;

  constructor(options) {
    this.#toastElement = document.createElement("div");
    this.#toastElement.classList.add("toast");
    requestAnimationFrame(() => {
      this.#toastElement.classList.add("show");
    });
    this.#visibleSince = new Date();
    this.#removeBinded = this.remove.bind(this);
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }
  set position(value) {
    console.log(value);
    const currentContainer = this.#toastElement.parentElement;
    const selector = `.toast-container[data-position="${value}]"`;
    const container =
      document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElement);
    if (currentContainer === null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }
  set text(value) {
    this.#toastElement.textContent = value;
  }
  set autoClose(value) {
    this.#autoClose = value;
    this.#visibleSince = new Date();
    if (value === false) return;
    if (this.#autoCloseTimeout !== null) clearTimeout(this.#autoCloseTimeout);
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }
  set canClose(value) {
    this.#toastElement.classList.toggle("can-close", value);
    if (value) {
      this.#toastElement.addEventListener("click", this.#removeBinded);
    } else {
      this.#toastElement.removeEventListener("click", this.#removeBinded);
    }
  }
  set showProgress(value) {
    this.#toastElement.classList.toggle("progress", value);
    this.#toastElement.style.setProperty("--progress", 1);
    if (value) {
      this.#progressInterval = setInterval(() => {
        const timeVisible = new Date() - this.#visibleSince;
        this.#toastElement.style.setProperty(
          "--progress",
          1 - timeVisible / this.#autoClose
        );
      }, 10);
    }
  }
  remove() {
    // document.body.remove(".toast-container");
    // or
    clearTimeout(this.#autoCloseTimeout);
    clearInterval(this.#progressInterval);

    const container = this.#toastElement.parentElement;
    this.#toastElement.classList.remove("show");
    this.#toastElement.addEventListener("transitionend", () => {
      this.#toastElement.remove();
      if (container.hasChildNodes()) return;
      container.remove();
    });
    this.onClose();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.append(container);
  return container;
}
