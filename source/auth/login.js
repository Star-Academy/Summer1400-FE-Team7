const loginForm = document.querySelector(".login-form");
const emailLoginInput = document.querySelector("#login-email-input");
const passwordLoginInput = document.querySelector("#login-password-input");
const loginBtn = document.querySelector("#login-submit-btn");
const emailInputWrapper = document.querySelector("#email-login-input-wrapper");
const passwordInputWrapper = document.querySelector(
  "#password-login-input-wrapper"
);

const loginInputs = {
  email: "",
  password: "",
};

let isEmailLoginValid = false;
let isPasswordLoginValid = false;
let isFirstLoginSubmit = true;
const validateEmail = (email) => {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(String(email).toLowerCase());
};

const checkLoginEmail = () => {

  if (emailLoginInput.value == "") {
    emailInputWrapper.setAttribute("data-error", "ایمیل نمی‌تواند خالی باشد");
    emailInputWrapper.classList.add("error");
    return false;
  } else if (!validateEmail(emailLoginInput.value)) {
    emailInputWrapper.setAttribute("data-error", "ایمیل وارد شده معتبر نیست!");
    emailInputWrapper.classList.add("error");

    return false;
  } else {
    emailInputWrapper.classList.remove("error");
    return true;
  }
};

emailLoginInput.addEventListener("input", () => {
  if (!isFirstLoginSubmit) {
    if (emailLoginInput.value == "") {
      emailInputWrapper.setAttribute("data-error", "ایمیل نمی‌تواند خالی باشد");
      emailInputWrapper.classList.add("error");
      isEmailLoginValid = false;
    } else if (!validateEmail(emailLoginInput.value)) {
      emailInputWrapper.setAttribute(
        "data-error",
        "ایمیل وارد شده معتبر نیست!"
      );
      emailInputWrapper.classList.add("error");

      isEmailLoginValid = false;
    } else {
      emailInputWrapper.classList.remove("error");
      isEmailLoginValid = true;
    }
  }
});

const checkLoginPasswords = () => {
  if (passwordLoginInput.value == "") {
    passwordInputWrapper.setAttribute(
      "data-error",
      "رمزعبور نمی‌تواند خالی باشد"
    );

    passwordInputWrapper.classList.add("error");
    return false;
  } else {
    passwordInputWrapper.classList.remove("error");
    return true;
  }
};
passwordLoginInput.addEventListener("input", () => {
  if (!isFirstLoginSubmit) {
    if (passwordLoginInput.value == "") {
      passwordInputWrapper.setAttribute(
        "data-error",
        "رمزعبور نمی‌تواند خالی باشد"
      );

      passwordInputWrapper.classList.add("error");
      isPasswordLoginValid = false;
    } else {
      passwordInputWrapper.classList.remove("error");
      isPasswordLoginValid = true;
    }
  }
});

const resetLoginForm = () => {
  loginBtn.classList.remove("error");
  emailLoginInput.value = "";
  passwordLoginInput.value = "";
};

const performLogin = () => {
  loginInputs.email = emailLoginInput.value;
  loginInputs.password = passwordLoginInput.value;

  if (!isFirstLoginSubmit) {
    if (!isEmailLoginValid) return false;
    if (!isPasswordLoginValid) return false;
  } else {
    isFirstLoginSubmit = false;

    if (!checkLoginEmail()) return false;
    if (!checkLoginPasswords()) return false;
  }

  let result = false;
  for (const user of testUsers) {
    if (
      user.username == loginInputs.email.split("@")[0] &&
      user.passowrd == loginInputs.password
    ) {
      result = true;
      break;
    }
  }

  if (!result) {
    loginBtn.setAttribute("data-error", "ایمیل یا رمز عبور صحیح نمی باشد");
    loginBtn.classList.add("error");
  } else {
    resetLoginForm();
  }

  return result;
};

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (performLogin()) {
    localStorage.setItem("email", loginInputs.email);
    loginForm.submit();
    window.location.href = "../../pages/dashboard/index.html";
  } else {
    console.log("failed");
  }
});
