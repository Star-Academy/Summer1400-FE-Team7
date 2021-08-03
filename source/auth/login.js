const loginForm = document.querySelector(".login-form");
const emailLoginInput = document.querySelector("#login-email-input");
const passwordLoginInput = document.querySelector("#login-password-input");
const loginBtn = document.querySelector(".login-btn");

const loginInput = {
  email: "",
  password: "",
};

const performLogin = () => {
  loginInput.email = emailLoginInput.value;
  loginInput.password = passwordLoginInput.value;

  const result = testUsers.filter((user) => {
    if (user.username == loginInput.email.split("@")[0]) {
      return true;
    }
    return false;
  });
  console.log(result);
  return false;
};

const loginUser = (e) => {
  if (performLogin()) {
    window.location.replace("../../pages/dashboard/index.html");
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
