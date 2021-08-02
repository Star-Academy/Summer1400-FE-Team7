const loginForm = document.querySelector(".login-form");
const emailLogin = document.querySelector("#login-email-input");
const passwordLogin = document.querySelector("#login-password-input");
const loginBtn = document.querySelector(".login-btn");

const login = async () => {
  user.email = emailLogin.value;
  user.password = passwordLogin.value;
  user.confirmPassword = "";

  let response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    body: {
      email: user.email,
      password: user.password,
    },
  });

  if (!response.error) {
    const currentUser = { id: response.body.id, email: user.email };
    localStorage.setItem("user", JSON.stringify(currentUser));
  }
};

loginForm.addEventListener("submit", () => {
  login();
});
