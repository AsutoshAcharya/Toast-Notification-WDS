import Toast from "./Toast.js";
document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    position: "top-right",
    text: "hello",
    // canClose: true,
    showProgress: true,
    autoClose: 10000,
  });
});
