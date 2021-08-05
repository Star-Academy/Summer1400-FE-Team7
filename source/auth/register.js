const registerInputs = {
  email: "",
  password: "",
  // confirmPassword: "",
};

const performRegister = async () => {
  registerInputs.email = emailRegister.value;
  registerInputs.password = passwordRegister.value;

  if (!checkRegisterEmail()) return false;
  if (!checkRegisterPassword()) return false;
  if (!checkRegisterConfirmPassword()) return false;
  if (!checkMatchPasswordAndConfirmPassword()) return false;

  if (!isEmailRegisterValid) return false;
  if (!isPasswordRegisterValid) return false;

  registerInputs.username = registerInputs.email.split("@")[0];

  const body = JSON.stringify(registerInputs);

  let response = await fetchInterceptor(USER_REGISTER_URI, METHOD_POST, body);

  if (response.ok) {
    const responseBody = await response.json();
    localStorage.setItem("email", registerInputs.email);
    localStorage.setItem("id", responseBody.id);
    localStorage.setItem("token", responseBody.token);
    resetRegisterForm();
    window.location.href = "../../pages/dashboard/index.html";
  } else {
    if (response.status == 400) {
      errorGenerator(emailRegisterInputWrapper, ERROR_MSG.MSG_7, ERROR_TYPES.TYPE_1);
    } else if (response.status == 500) {
      errorGenerator(registerBtn, ERROR_MSG.MSG_8, ERROR_TYPES.TYPE_1);
    }
  }
};

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  performRegister();
});
