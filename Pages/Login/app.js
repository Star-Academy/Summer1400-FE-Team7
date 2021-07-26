const loginForm = document.querySelector(".login-form");
const signForm = document.querySelector(".signup-form");
const formWrapper = document.querySelector(".form-wrapper");
const alreadyHaveAnAccountCta = document.querySelector("#already-have-account");

alreadyHaveAnAccountCta.addEventListener("click", () => {
  loginForm.classList.toggle("display-none");
  signForm.classList.toggle("display-none");
  formWrapper.classList.toggle("signup-form-wrapper");
});
