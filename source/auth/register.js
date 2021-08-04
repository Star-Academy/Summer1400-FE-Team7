const registerForm = document.querySelector(".signup-form");
const registerBtn = document.querySelector("#register-btn");
const emailRegister = document.querySelector("#signup-email-input");
const passwordRegister = document.querySelector("#signup-password-input");
const emailRegisterInputWrapper = document.querySelector("#email-register-input-wrapper");
const passwordRegisterInputWrapper = document.querySelector("#password-register-input-wrapper");
const confirmPasswordRegisterInputWrapper = document.querySelector("#confirm-password-register-input-wrapper");

const confirmPasswordRegister = document.querySelector("#signup-confirm-password-input");

const registerInputs = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validPassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordPattern.test(String(password).toLowerCase());
};

const checkRegisterEmail = () => {
  if (registerInputs.email == "") {
    emailRegisterInputWrapper.setAttribute("data-error", "ایمیل نمی‌تواند خالی باشد");
    emailRegisterInputWrapper.classList.add("error");
    return false;
  } else if (!validateEmail(registerInputs.email)) {
    emailRegisterInputWrapper.setAttribute("data-error", "ایمیل وارد شده معتبر نیست");
    emailRegisterInputWrapper.classList.add("error");
    return false;
  } else {
    emailRegisterInputWrapper.classList.remove("error");
    return true;
  }
};

const checkRegisterPassword = () => {
  if (registerInputs.password == "") {
    passwordRegisterInputWrapper.setAttribute("data-error", "رمزعبور نمی‌تواند خالی باشد");
    passwordRegisterInputWrapper.classList.add("error");
    return false;
  } else if (!validPassword(registerInputs.password)) {
    passwordRegisterInputWrapper.setAttribute("data-error", "رمز عبور باید دارای حداقل ۸ کاراکتر،یک حرف و یک عدد باشد");
    passwordRegisterInputWrapper.classList.add("error");
    return false;
  } else {
    passwordRegisterInputWrapper.classList.remove("error");
    return true;
  }
};

const checkRegisterConfirlPassword = () => {
  if (registerInputs.confirmPassword == "") {
    confirmPasswordRegisterInputWrapper.setAttribute("data-error", "تکرار رمزعبور نمی‌تواند خالی باشد");
    confirmPasswordRegisterInputWrapper.classList.add("error");
    return false;
  } else {
    confirmPasswordRegisterInputWrapper.classList.remove("error");
    return true;
  }
};

const checkMatchPasswordAndConfirlPassword = () => {
  if (registerInputs.password != registerInputs.confirmPassword) {
    result = false;
    confirmPasswordRegisterInputWrapper.setAttribute("data-error", "رمزعبور و تکرارش باید برابر باشند");
    confirmPasswordRegisterInputWrapper.classList.add("error");
    return false;
  } else {
    confirmPasswordRegisterInputWrapper.classList.remove("error");
    return true;
  }
};

const resetRegisterForm = () => {
  registerBtn.classList.remove("error");
  emailRegisterInputWrapper.classList.remove("error");
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
  if (!checkRegisterConfirlPassword()) return false;
  if (!checkMatchPasswordAndConfirlPassword()) return false;

  for (const user of testUsers) {
    if (user.username === registerInputs.email.split("@")[0]) {
      emailRegisterInputWrapper.setAttribute("data-error", "کاربر دیگری با این ایمیل موجود می‌باشد");
      emailRegisterInputWrapper.classList.add("error");
      result = false;
      break;
    }
  }
  if (!result) {
    registerBtn.setAttribute("data-error", "ثبت‌نام ناموفق ");
    registerBtn.classList.add("error");
  } else {
    resetRegisterForm();
  }

  return result;
};

const registerUser = () => {
  if (performRegister()) {
    localStorage.setItem("email", registerInputs.email);
    window.location.href = "../../pages/dashboard/index.html";
  }
};
