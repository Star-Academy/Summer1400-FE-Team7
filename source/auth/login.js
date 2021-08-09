const loginInputs = {
  email: "",
  password: "",
};

const isLoginFormValid = () => {
  if (!checkLoginEmail()) return false;
  if (!checkLoginPasswords()) return false;

  if (!isEmailLoginValid) return false;
  if (!isPasswordLoginValid) return false;

  return true;
};

const performLogin = async () => {
  loginInputs.email = emailLoginInput.value;
  loginInputs.password = passwordLoginInput.value;

  if (!isLoginFormValid()) return false;

  const body = JSON.stringify(loginInputs);

  let response = await fetchInterceptor(USER_LOGIN_URI, METHOD_POST, body);
  // console.log(await response.text());
  const responseBody = await response.json();

  if (response.ok) {
    console.log('we are HERE1')
    initializeNewUser(loginInputs.email, responseBody.id, responseBody.token);
    window.location.href = DASHBOARD_URL;
    resetLoginForm();
  } else if (response.status == 401) {
    console.log('we are HERE2')
    errorGenerator(loginBtn, ERROR_MSG.MSG_UNSUCCESSFUL_LOGIN, ERROR_TYPES.TYPE_ERROR);
  } else {
    errorGenerator(loginBtn, responseBody.message, ERROR_TYPES.TYPE_ERROR);
    console.log('we are HERE3')
  }
};

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  performLogin();
});

const initializeNewUser = (email, token, id) => {
  localStorage.setItem("email", email);
  localStorage.setItem("id", token);
  localStorage.setItem("token", id);
};
