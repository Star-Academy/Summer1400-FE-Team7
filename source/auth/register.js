const registerInputs = {
  email: "",
  password: "",
  confirmPassword: "",
};
const isRegisterFormValid = () => {
  if (!checkRegisterEmail()) return false;
  if (!checkRegisterPassword()) return false;
  if (!checkRegisterConfirmPassword()) return false;
  if (!checkMatchPasswordAndConfirmPassword()) return false;
  if (!isEmailRegisterValid) return false;
  if (!isPasswordRegisterValid) return false;
  return true;
};

const performRegister = async () => {
  registerInputs.email = emailRegisterInput.value;
  registerInputs.password = passwordRegisterInput.value;
  registerInputs.confirmPassword = confirmPasswordRegister.value;
  registerInputs.username = registerInputs.email.split("@")[0];

  if (!isRegisterFormValid) return false;

  const body = JSON.stringify(registerInputs);
  let response = await fetchInterceptor(USER_REGISTER_URI, METHOD_POST, body);
  const responseBody = await response.json();
  if (response.ok) {
    initializeNewUser(
      registerInputs.email,
      responseBody.id,
      responseBody.token
    );
    resetRegisterForm();
    //* we create a favorite playlist for each user by default*/
    await createFavouritePlayList(responseBody.token);
    window.location.href = DASHBOARD_URL;
  } else {
    if (response.status == 400) {
      errorGenerator(
        emailRegisterInputWrapper,
        ERROR_MSG.MSG_USER_ALREADY_EXIST,
        ERROR_TYPES.TYPE_ERROR
      );
    } else if (response.status == 500) {
      errorGenerator(
        registerBtn,
        ERROR_MSG.MSG_UNSUCCESSFUL_REGISTER,
        ERROR_TYPES.TYPE_ERROR
      );
    } else {
      errorGenerator(registerBtn, responseBody.message, ERROR_TYPES.TYPE_ERROR);
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

  await fetchInterceptor(
    CREATE_PLAYLIST_URI,
    METHOD_POST,
    body
  );
};
