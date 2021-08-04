const registerForm = document.querySelector(".signup-form");
const registerBtn = document.querySelector("#register-btn");
const emailRegister = document.querySelector("#signup-email-input");
const passwordRegister = document.querySelector("#signup-password-input");
const emailRegisterInputWrapper = document.querySelector("#email-register-input-wrapper");
const passwordRegisterInputWrapper = document.querySelector("#password-register-input-wrapper");
const confirmPasswordRegisterInputWrapper = document.querySelector("#confirm-password-register-input-wrapper");

const confirmPasswordRegister = document.querySelector("#signup-confirm-password-input");

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

const registerInputs = {
  email: "",
  password: "",
  confirmPassword: "",
};
let isEmailRegisterValid = false;
let isPasswordRegisterValid = false;

const validPassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordPattern.test(String(password).toLowerCase());
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

const performRegister = () => {
  registerInputs.email = emailRegister.value;
  registerInputs.password = passwordRegister.value;
  registerInputs.confirmPassword = confirmPasswordRegister.value;

  let result = true;

  if (!checkRegisterEmail()) return false;
  if (!checkRegisterPassword()) return false;
  if (!checkRegisterConfirmPassword()) return false;
  if (!checkMatchPasswordAndConfirmPassword()) return false;

  if (!isEmailRegisterValid) return false;
  if (!isPasswordRegisterValid) return false;
  for (const user of testUsers) {
    if (user.username === registerInputs.email.split("@")[0]) {
      errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_7, ERROR_TYPES.TYPE_1);
      result = false;
      break;
    }
  }
  if (!result) {
    errorGenerator(registerBtn, ERROR_MSG.MSG_8, ERROR_TYPES.TYPE_1);
  } else {
    resetRegisterForm();
  }

  return result;
};

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (performRegister()) {
    localStorage.setItem("email", registerInputs.email);
    registerForm.submit();
    window.location.href = "../../pages/dashboard/index.html";
  }
});

const errorGenerator = (element, erorText, errotType) => {
  element.setAttribute("data-error", erorText);
  element.classList.add(errotType);
};

const classRemover = (parent, className) => {
  parent.classList.remove(className);
};
