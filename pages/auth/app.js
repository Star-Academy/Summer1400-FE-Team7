const loginForm = document.querySelector(".login-form");
const signForm = document.querySelector(".signup-form");
const formWrapper = document.querySelector(".form-wrapper");
const alreadyHaveAnAccountCta = document.querySelector("#already-have-account");
const createNewAccountCta = document.querySelector("#create-new-account");
const main = document.getElementsByTagName("main");

createNewAccountCta.addEventListener("click", () => {
  formPosChanHandler();

  main[0].className = "bg-animation-2";

  setTimeout(() => {
    main[0].className = "bg-animation-3";
  }, 400);
});

alreadyHaveAnAccountCta.addEventListener("click", () => {
  formPosChanHandler();
  main[0].className = "bg-animation-4";
  setTimeout(() => {
    main[0].className = "bg-animation-1";
  }, 400);
});

const formPosChanHandler = () => {
  loginForm.classList.toggle("display-none");
  signForm.classList.toggle("display-none");
  formWrapper.classList.toggle("signup-form-wrapper");
};
