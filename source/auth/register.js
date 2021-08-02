const registerForm = document.querySelector(".signup-form");
const registerBtn = document.querySelector(".register-btn");
const emailRegister = document.querySelector("#signup-email-input");
const passwordRegister = document.querySelector("#signup-password-input");
const confirmPasswordRegister = document.querySelector("#signup-confirm-password-input");

const user = {
  email: "",
  password: "",
  confirmPassword: "",
};

const register = async () => {
  user.email = emailRegister.value;
  user.password = passwordRegister.value;
  user.confirmPassword = confirmPasswordRegister.value;

  if (user.password != user.confirmPassword) {
    return confirmPasswordRegister.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPasswordRegister.setCustomValidity("");
  }

  let response = await fetch(`${BASE_URL}/user/register`, {
    method: "POST",
    body: {
      username: user.email.split("@")[0],
      email: user.email,
      password: user.password,
    },
  });

  // if (response.ok) {
  if (!response.error) {
    const currentUser = { id: response.body.id, email: user.email };
    localStorage.setItem("user", JSON.stringify(currentUser));
    console.log(localStorage.getItem("user"));
  }
};

registerForm.addEventListener("submit", () => {
  register();
});
