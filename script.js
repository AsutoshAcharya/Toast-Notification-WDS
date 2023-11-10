import Toast from "./Toast.js";
document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    position: "bottom-right",
    text: "hello",
    // canClose: true,
    autoClose: 1000,
    showProgress: true,
  });
});
