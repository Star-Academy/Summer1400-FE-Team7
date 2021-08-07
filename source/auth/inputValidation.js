const registerForm = document.querySelector(".signup-form");
const registerBtn = document.querySelector("#register-btn");
const emailRegisterInput = document.querySelector("#signup-email-input");
const passwordRegisterInput = document.querySelector("#signup-password-input");
const emailRegisterInputWrapper = document.querySelector("#email-register-input-wrapper");
const passwordRegisterInputWrapper = document.querySelector("#password-register-input-wrapper");
const confirmPasswordRegisterInputWrapper = document.querySelector("#confirm-password-register-input-wrapper");
const confirmPasswordRegister = document.querySelector("#signup-confirm-password-input");

const loginForm = document.querySelector(".login-form");
const emailLoginInput = document.querySelector("#login-email-input");
const passwordLoginInput = document.querySelector("#login-password-input");
const loginBtn = document.querySelector("#login-submit-btn");
const emailInputWrapper = document.querySelector("#email-login-input-wrapper");
const passwordInputWrapper = document.querySelector("#password-login-input-wrapper");

const ERROR_MSG = {
  MSG_EMAIL_EMPTY: "ایمیل نمی‌تواند خالی باشد",
  MSG_EMAIL_NOT_VALID: "ایمیل وارد شده معتبر نیست",
  MSG_PASSWORD_EMPTY: "رمزعبور نمی‌تواند خالی باشد",
  MSG_PASSWORD_NOT_VALID: "رمز عبور باید دارای حداقل ۵ کاراکتر،یک حرف و یک عدد باشد",
  MSG_CONFIRM_PASSWORD_EPMTY: "تکرار رمزعبور نمی‌تواند خالی باشد",
  MSG_PASSWORDS_NOT_MATCH: "رمزعبور و تکرارش باید برابر باشند",
  MSG_USER_ALREADY_EXIST: "کاربر دیگری با این ایمیل موجود می‌باشد",
  MSG_UNSUCCESSFUL_REGISTER: "ثبت‌نام ناموفق ",
  MSG_UNSUCCESSFUL_LOGIN: "ایمیل یا رمز عبور صحیح نمی باشد",
};

const ERROR_TYPES = {
  TYPE_ERROR: "error",
  TYPE_WARNING: "warning",
};

let isEmailRegisterValid = false;
let isPasswordRegisterValid = false;
let isEmailLoginValid = false;
let isPasswordLoginValid = false;
let isFirstLoginSubmit = true;

const validPassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  return passwordPattern.test(String(password).toLowerCase());
};

const validateEmail = (email) => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(String(email).toLowerCase());
};

const errorGenerator = (element, erorText, errorType) => {
  element.setAttribute("data-error", erorText);
  element.classList.add(errorType);
};

const classRemover = (parent, className) => {
  parent.classList.remove(className);
};

///Register Validations

const checkRegisterEmail = () => {
  if (registerInputs.email == "") {
    errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_EMAIL_EMPTY, ERROR_TYPES.TYPE_ERROR);
    return false;
  } else if (!validateEmail(registerInputs.email)) {
    errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_EMAIL_NOT_VALID, ERROR_TYPES.TYPE_ERROR);
    return false;
  } else {
    classRemover(emailRegisterInputWrapper, ERROR_TYPES.TYPE_ERROR);
    return true;
  }
};

emailRegisterInput.addEventListener("input", () => {
  if (emailRegisterInput.value == "") {
    errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_EMAIL_EMPTY, ERROR_TYPES.TYPE_WARNING);
    isEmailRegisterValid = false;
  } else if (!validateEmail(emailRegisterInput.value)) {
    errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_EMAIL_NOT_VALID, ERROR_TYPES.TYPE_WARNING);
    isEmailRegisterValid = false;
  } else {
    classRemover(emailRegisterInputWrapper, ERROR_TYPES.TYPE_ERROR);
    classRemover(emailRegisterInputWrapper, ERROR_TYPES.TYPE_WARNING);
    isEmailRegisterValid = true;
  }
});

passwordRegisterInput.addEventListener("input", () => {
  if (passwordRegisterInput.value == "") {
    errorGenerator(passwordRegisterInputWrapper, ERROR_MSG.MSG_PASSWORD_EMPTY, ERROR_TYPES.TYPE_WARNING);
    isPasswordRegisterValid = false;
  } else if (!validPassword(passwordRegisterInput.value)) {
    errorGenerator(passwordRegisterInputWrapper, ERROR_MSG.MSG_PASSWORD_NOT_VALID, ERROR_TYPES.TYPE_WARNING);
    isPasswordRegisterValid = false;
  } else {
    classRemover(passwordRegisterInputWrapper, ERROR_TYPES.TYPE_ERROR);
    classRemover(passwordRegisterInputWrapper, ERROR_TYPES.TYPE_WARNING);
    isPasswordRegisterValid = true;
  }
});

const checkRegisterPassword = () => {
  if (passwordRegisterInput.value == "") {
    errorGenerator(passwordRegisterInputWrapper, ERROR_MSG.MSG_PASSWORD_EMPTY, ERROR_TYPES.TYPE_ERROR);
    return false;
  } else if (!validPassword(passwordRegisterInput.value)) {
    errorGenerator(passwordRegisterInputWrapper, ERROR_MSG.MSG_PASSWORD_NOT_VALID, ERROR_TYPES.TYPE_ERROR);
    return false;
  } else {
    classRemover(passwordRegisterInputWrapper, ERROR_TYPES.TYPE_ERROR);
    return true;
  }
};

const checkRegisterConfirmPassword = () => {
  if (registerInputs.confirmPassword == "") {
    errorGenerator(confirmPasswordRegisterInputWrapper, ERROR_MSG.MSG_CONFIRM_PASSWORD_EPMTY, ERROR_TYPES.TYPE_ERROR);
    return false;
  } else {
    classRemover(confirmPasswordRegisterInputWrapper, ERROR_TYPES.TYPE_ERROR);
    return true;
  }
};

const checkMatchPasswordAndConfirmPassword = () => {
  if (registerInputs.password != registerInputs.confirmPassword) {
    result = false;
    errorGenerator(confirmPasswordRegisterInputWrapper, ERROR_MSG.MSG_PASSWORDS_NOT_MATCH, ERROR_TYPES.TYPE_ERROR);
    return false;
  } else {
    classRemover(confirmPasswordRegisterInputWrapper, ERROR_TYPES.TYPE_ERROR);
    return true;
  }
};

const resetRegisterForm = () => {
  classRemover(registerBtn, ERROR_TYPES.TYPE_ERROR);
  classRemover(emailRegisterInputWrapper, ERROR_TYPES.TYPE_ERROR);
  emailRegisterInput.value = "";
  passwordRegisterInput.value = "";
  confirmPasswordRegister.value = "";
};

///Login Validations
const checkLoginEmail = () => {
  if (emailLoginInput.value == "") {
    errorGenerator(emailInputWrapper, ERROR_MSG.MSG_EMAIL_EMPTY, ERROR_TYPES.TYPE_ERROR);
    return false;
  } else if (!validateEmail(emailLoginInput.value)) {
    errorGenerator(emailInputWrapper, ERROR_MSG.MSG_EMAIL_NOT_VALID, ERROR_TYPES.TYPE_ERROR);

    return false;
  } else {
    classRemover(emailInputWrapper, ERROR_TYPES.TYPE_ERROR);
    return true;
  }
};

emailLoginInput.addEventListener("input", () => {
  if (emailLoginInput.value == "") {
    isEmailLoginValid = false;
    errorGenerator(emailInputWrapper, ERROR_MSG.MSG_EMAIL_EMPTY, ERROR_TYPES.TYPE_WARNING);
  } else if (!validateEmail(emailLoginInput.value)) {
    errorGenerator(emailInputWrapper, ERROR_MSG.MSG_EMAIL_NOT_VALID, ERROR_TYPES.TYPE_WARNING);
    isEmailLoginValid = false;
  } else {
    classRemover(emailInputWrapper, ERROR_TYPES.TYPE_ERROR);
    classRemover(emailInputWrapper, ERROR_TYPES.TYPE_WARNING);
    isEmailLoginValid = true;
  }
});

const checkLoginPasswords = () => {
  if (passwordLoginInput.value == "") {
    errorGenerator(passwordInputWrapper, ERROR_MSG.MSG_PASSWORD_EMPTY, ERROR_TYPES.TYPE_ERROR);
    return false;
  } else {
    classRemover(passwordInputWrapper, ERROR_TYPES.TYPE_ERROR);
    return true;
  }
};

passwordLoginInput.addEventListener("input", () => {
  if (passwordLoginInput.value == "") {
    errorGenerator(passwordInputWrapper, ERROR_MSG.MSG_PASSWORD_EMPTY, ERROR_TYPES.TYPE_WARNING);
    isPasswordLoginValid = false;
  } else {
    classRemover(passwordInputWrapper, ERROR_TYPES.TYPE_WARNING);
    isPasswordLoginValid = true;
  }
});

const resetLoginForm = () => {
  classRemover(loginBtn, ERROR_TYPES.TYPE_ERROR);
  emailLoginInput.value = "";
  passwordLoginInput.value = "";
};
