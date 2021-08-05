const loginInputs = {
  email: "",
  password: "",
};

const performLogin = async () => {
  loginInputs.email = emailLoginInput.value;
  loginInputs.password = passwordLoginInput.value;

  if (!checkLoginEmail()) return false;
  if (!checkLoginPasswords()) return false;

  if (!isEmailLoginValid) return false;
  if (!isPasswordLoginValid) return false;

  const body = JSON.stringify(loginInputs);

  let response = await fetchInterceptor(USER_LOGIN_URI, METHOD_POST, body);
  console.log("🚀 ~ file: login.js ~ line 19 ~ performLogin ~ response", response);

  if (response.ok) {
    const responseBody = await response.json();
    localStorage.setItem("email", loginInputs.email);
    localStorage.setItem("id", responseBody.id);
    localStorage.setItem("token", responseBody.token);
    window.location.href = "../../pages/dashboard/index.html";
    resetLoginForm();
  } else {
    errorGenerator(loginBtn, ERROR_MSG.MSG_9, ERROR_TYPES.TYPE_1);
  }
};

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  performLogin();
});
