const registerInputs = {
  email: "",
  password: "",
  confirmPassword: "",
};

const performRegister = async () => {
  registerInputs.email = emailRegister.value;
  registerInputs.password = passwordRegister.value;
  registerInputs.confirmPassword = confirmPasswordRegister.value;

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

    initializeNewUser(registerInputs.email, responseBody.id, responseBody.token);
    resetRegisterForm();
    await createFavouritePlayList(responseBody.token);

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

const createFavouritePlayList = async (token) => {
  const body = JSON.stringify({
    token: token,
    name: "مورد علاقه",
  });

  const response = await fetchInterceptor(CREATE_PLAYLIST_URI, METHOD_POST, body);
  console.log(await response.json());
};

const initializeNewUser = (email, token, id) => {
  localStorage.setItem("email", email);
  localStorage.setItem("id", token);
  localStorage.setItem("token", id);
};
