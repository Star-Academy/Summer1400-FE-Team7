const registerForm = document.querySelector(".signup-form");
const emailRegister = document.querySelector("#signup-email-input");
const passwordRegister = document.querySelector("#signup-password-input");
const confirmPasswordRegister = document.querySelector(
  "#signup-confirm-password-input"
);

const registerInputs = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validPassword = (password) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordPattern.test(String(password).toLowerCase());
};

const performRegister = () => {
  registerInputs.email = emailRegister.value;
  registerInputs.password = passwordRegister.value;
  registerInputs.confirmPassword = confirmPasswordRegister.value;

  let result = true;

  if (registerInputs.email == "") {
    console.log("email cant be empty");
    return false;
  }
  if (registerInputs.password == "") {
    console.log("password cant be empty");
    return false;
  }
  if (registerInputs.confirmPassword == "") {
    console.log("confirmPassword cant be empty");
    return false;
  }
  if (!validateEmail(registerInputs.email)) {
    console.log("email is not a valid ");
    return false;
  }
  if (!validPassword(registerInputs.password)) {
    console.log("passwoed is not a valid ");
    return false;
  }

  if (registerInputs.password != registerInputs.confirmPassword) {
    result = false;
    console.log("passwords not match");
  }

  for (const user of testUsers) {
    if (user.username === registerInputs.email.split("@")[0]) {
      console.log("this email is allready registered");
      result = false;
      break;
    }
  }
  if (!result) {
    console.log("register failed");
  } else {
    console.log("register seccussed");
    emailRegister.value = "";
    passwordRegister.value = "";
    confirmPasswordRegister.value = "";
  }

  return result;
};

const registerUser = () => {
  if (performRegister()) {
    localStorage.setItem("email", registerInputs.email);

    window.location.href = "../../pages/dashboard/index.html";
  }
};
