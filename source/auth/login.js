const loginForm = document.querySelector(".login-form");
const emailLoginInput = document.querySelector("#login-email-input");
const passwordLoginInput = document.querySelector("#login-password-input");
const loginBtn = document.querySelector("#login-submit-btn");
const emailInputWrapper = document.querySelector("#email-login-input-wrapper");
const passwordInputWrapper = document.querySelector("#password-login-input-wrapper");

const loginInputs = {
  email: "",
  password: "",
};

let isEmailLoginValid = false;
let isPasswordLoginValid = false;
let isFirstLoginSubmit = true;
const validateEmail = (email) => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(String(email).toLowerCase());
};

const checkLoginEmail = () => {
  if (emailLoginInput.value == "") {
    errorGenerator(emailInputWrapper, ERROR_MSG.MSG_1, ERROR_TYPES.TYPE_1);
    return false;
  } else if (!validateEmail(emailLoginInput.value)) {
    errorGenerator(emailInputWrapper, ERROR_MSG.MSG_2, ERROR_TYPES.TYPE_1);

    return false;
  } else {
    classRemover(emailInputWrapper, ERROR_TYPES.TYPE_1);
    return true;
  }
};

emailLoginInput.addEventListener("input", () => {
  if (emailLoginInput.value == "") {
    isEmailLoginValid = false;
    errorGenerator(emailInputWrapper, ERROR_MSG.MSG_1, ERROR_TYPES.TYPE_2);
  } else if (!validateEmail(emailLoginInput.value)) {
    errorGenerator(emailInputWrapper, ERROR_MSG.MSG_2, ERROR_TYPES.TYPE_2);
    isEmailLoginValid = false;
  } else {
    classRemover(emailInputWrapper, ERROR_TYPES.TYPE_1);
    classRemover(emailInputWrapper, ERROR_TYPES.TYPE_2);
    isEmailLoginValid = true;
  }
});

const checkLoginPasswords = () => {
  if (passwordLoginInput.value == "") {
    errorGenerator(passwordInputWrapper, ERROR_MSG.MSG_3, ERROR_TYPES.TYPE_1);
    return false;
  } else {
    classRemover(passwordInputWrapper, ERROR_TYPES.TYPE_1);
    return true;
  }
};

passwordLoginInput.addEventListener("input", () => {
  if (passwordLoginInput.value == "") {
    errorGenerator(passwordInputWrapper, ERROR_MSG.MSG_3, ERROR_TYPES.TYPE_2);
    isPasswordLoginValid = false;
  } else {
    classRemover(passwordInputWrapper, ERROR_TYPES.TYPE_2);
    isPasswordLoginValid = true;
  }
});

const resetLoginForm = () => {
  classRemover(loginBtn, ERROR_TYPES.TYPE_1);
  emailLoginInput.value = "";
  passwordLoginInput.value = "";
};

const performLogin = () => {
  loginInputs.email = emailLoginInput.value;
  loginInputs.password = passwordLoginInput.value;

  if (!checkLoginEmail()) return false;
  if (!checkLoginPasswords()) return false;

  if (!isEmailLoginValid) return false;
  if (!isPasswordLoginValid) return false;

  let result = false;
  for (const user of testUsers) {
    if (user.username == loginInputs.email.split("@")[0] && user.passowrd == loginInputs.password) {
      result = true;
      break;
    }
  }

  if (!result) {
    errorGenerator(loginBtn, ERROR_MSG.MSG_9, ERROR_TYPES.TYPE_1);
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
  }
});
