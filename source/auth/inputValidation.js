const registerForm = document.querySelector(".signup-form");
const registerBtn = document.querySelector("#register-btn");
const emailRegister = document.querySelector("#signup-email-input");
const passwordRegister = document.querySelector("#signup-password-input");
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
  MSG_1: "ایمیل نمی‌تواند خالی باشد",
  MSG_2: "ایمیل وارد شده معتبر نیست",
  MSG_3: "رمزعبور نمی‌تواند خالی باشد",
  MSG_4: "رمز عبور باید دارای حداقل ۸ کاراکتر،یک حرف و یک عدد باشد",
  MSG_5: "تکرار رمزعبور نمی‌تواند خالی باشد",
  MSG_6: "رمزعبور و تکرارش باید برابر باشند",
  MSG_7: "کاربر دیگری با این ایمیل موجود می‌باشد",
  MSG_8: "ثبت‌نام ناموفق ",
  MSG_9: "ایمیل یا رمز عبور صحیح نمی باشد",
};

const ERROR_TYPES = {
  TYPE_1: "error",
  TYPE_2: "warning",
};

let isEmailRegisterValid = false;
let isPasswordRegisterValid = false;
let isEmailLoginValid = false;
let isPasswordLoginValid = false;
let isFirstLoginSubmit = true;

const validPassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordPattern.test(String(password).toLowerCase());
};

const validateEmail = (email) => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(String(email).toLowerCase());
};

const checkRegisterEmail = () => {
  if (registerInputs.email == "") {
    errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_1, ERROR_TYPES.TYPE_1);
    return false;
  } else if (!validateEmail(registerInputs.email)) {
    errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_2, ERROR_TYPES.TYPE_1);
    return false;
  } else {
    classRemover(emailRegisterInputWrapper, ERROR_TYPES.TYPE_1);
    return true;
  }
};

emailRegister.addEventListener("input", () => {
  if (emailRegister.value == "") {
    errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_1, ERROR_TYPES.TYPE_2);
    isEmailRegisterValid = false;
  } else if (!validateEmail(emailRegister.value)) {
    errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_2, ERROR_TYPES.TYPE_2);
    isEmailRegisterValid = false;
  } else {
    classRemover(emailRegisterInputWrapper, ERROR_TYPES.TYPE_1);
    classRemover(emailRegisterInputWrapper, ERROR_TYPES.TYPE_2);
    isEmailRegisterValid = true;
  }
});

passwordRegister.addEventListener("input", () => {
  if (passwordRegister.value == "") {
    errorGenerator(passwordRegisterInputWrapper, ERROR_MSG.MSG_3, ERROR_TYPES.TYPE_2);
    isPasswordRegisterValid = false;
  } else if (!validPassword(passwordRegister.value)) {
    errorGenerator(passwordRegisterInputWrapper, ERROR_MSG.MSG_4, ERROR_TYPES.TYPE_2);
    isPasswordRegisterValid = false;
  } else {
    classRemover(passwordRegisterInputWrapper, ERROR_TYPES.TYPE_1);
    classRemover(passwordRegisterInputWrapper, ERROR_TYPES.TYPE_2);
    isPasswordRegisterValid = true;
  }
});

const checkRegisterPassword = () => {
  if (passwordRegister.value == "") {
    errorGenerator(passwordRegisterInputWrapper, ERROR_MSG.MSG_3, ERROR_TYPES.TYPE_1);
    return false;
  } else if (!validPassword(passwordRegister.value)) {
    errorGenerator(passwordRegisterInputWrapper, ERROR_MSG.MSG_4, ERROR_TYPES.TYPE_1);
    return false;
  } else {
    classRemover(passwordRegisterInputWrapper, ERROR_TYPES.TYPE_1);
    return true;
  }
};

const checkRegisterConfirmPassword = () => {
  if (registerInputs.confirmPassword == "") {
    errorGenerator(confirmPasswordRegisterInputWrapper, ERROR_MSG.MSG_5, ERROR_TYPES.TYPE_1);
    return false;
  } else {
    classRemover(confirmPasswordRegisterInputWrapper, ERROR_TYPES.TYPE_1);
    return true;
  }
};

const checkMatchPasswordAndConfirmPassword = () => {
  if (registerInputs.password != registerInputs.confirmPassword) {
    result = false;
    errorGenerator(confirmPasswordRegisterInputWrapper, ERROR_MSG.MSG_6, ERROR_TYPES.TYPE_1);
    return false;
  } else {
    classRemover(confirmPasswordRegisterInputWrapper, ERROR_TYPES.TYPE_1);
    return true;
  }
};

const resetRegisterForm = () => {
  classRemover(registerBtn, ERROR_TYPES.TYPE_1);
  classRemover(emailRegisterInputWrapper, ERROR_TYPES.TYPE_1);
  emailRegister.value = "";
  passwordRegister.value = "";
  confirmPasswordRegister.value = "";
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

const errorGenerator = (element, erorText, errotType) => {
  element.setAttribute("data-error", erorText);
  element.classList.add(errotType);
};

const classRemover = (parent, className) => {
  parent.classList.remove(className);
};
