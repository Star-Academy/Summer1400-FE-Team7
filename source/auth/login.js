const loginForm = document.querySelector(".login-form");
const emailLoginInput = document.querySelector("#login-email-input");
const passwordLoginInput = document.querySelector("#login-password-input");
const loginBtn = document.querySelector(".login-btn");
const emailInputWrapper = document.querySelector("#email-login-input-wrapper");
const passwordInputWrapper = document.querySelector("#password-login-input-wrapper");

const loginInputs = {
  email: "",
  password: "",
};
const validateEmail = (email) => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(String(email).toLowerCase());
};

const checkLoginEmail = () => {
  if (loginInputs.email == "") {
    emailInputWrapper.setAttribute("data-error", "ایمیل نمی‌تواند خالی باشد");
    emailInputWrapper.classList.add("error");
    return false;
  } else if (!validateEmail(loginInputs.email)) {
    emailInputWrapper.setAttribute("data-error", "ایمیل وارد شده معتبر نیست!");
    emailInputWrapper.classList.add("error");

    return false;
  } else {
    emailInputWrapper.classList.remove("error");
    return true;
  }
};

const checkLoginPasswords = () => {
  if (loginInputs.password == "") {
    passwordInputWrapper.setAttribute("data-error", "رمزعبور نمی‌تواند خالی باشد");

    passwordInputWrapper.classList.add("error");

    return false;
  } else {
    passwordInputWrapper.classList.remove("error");
    return true;
  }
};

const resetLoginForm = () => {
  loginBtn.classList.remove("error");
  emailLoginInput.value = "";
  passwordLoginInput.value = "";
};

const performLogin = () => {
  loginInputs.email = emailLoginInput.value;
  loginInputs.password = passwordLoginInput.value;

  if (!checkLoginEmail()) return false;
  if (!checkLoginPasswords()) return false;

  let result = false;
  for (const user of testUsers) {
    if (user.username == loginInputs.email.split("@")[0] && user.passowrd == loginInputs.password) {
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

const loginUser = () => {
  if (performLogin()) {
    localStorage.setItem("email", loginInputs.email);

    window.location.href = "../../pages/dashboard/index.html";
  }
};
