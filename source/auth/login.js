const loginForm = document.querySelector(".login-form");
const emailLoginInput = document.querySelector("#login-email-input");
const passwordLoginInput = document.querySelector("#login-password-input");
const loginBtn = document.querySelector(".login-btn");

const loginInputs = {
  email: "",
  password: "",
};

const performLogin = () => {
  loginInputs.email = emailLoginInput.value;
  loginInputs.password = passwordLoginInput.value;

  if (loginInputs.email == "") {
    console.log("email cant be empty");
    return false;
  }
  if (loginInputs.password == "") {
    console.log("password cant be empty");
    return false;
  }

  let result = false;
  for (const user of testUsers) {
    if (
      user.username == loginInputs.email.split("@")[0] &&
      user.passowrd == loginInputs.password
    ) {
      console.log("login seccussed");
      result = true;
      break;
    }
  }
  if (!result) {
    console.log("login failed");
  } else {
    emailLoginInput.value = "";
    passwordLoginInput.value = "";
  }

  return result;
};

const loginUser = () => {
  if (performLogin()) {
    localStorage.setItem("email", loginInputs.email);

    window.location.href = "../../pages/dashboard/index.html";
  }
};

// loginBtn.addEventListener("click",()=>{
// })
// loginForm.addEventListener("submit", () => {
//   getLoginForm();
// });

// const login = async () => {
//   user.email = emailLogin.value;
//   user.password = passwordLogin.value;
//   user.confirmPassword = "";

//   let response = await fetch(`${BASE_URL}/user/login`, {
//     method: "POST",
//     body: {
//       email: user.email,
//       password: user.password,
//     },
//   });

//   if (!response.error) {
//     const currentUser = { id: response.body.id, email: user.email };
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }
// };

// loginForm.addEventListener("submit", () => {
//   login();
// });
