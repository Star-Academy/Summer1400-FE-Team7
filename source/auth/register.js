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

const register = () => {
  user.email = emailRegister.value;
  user.password = passwordRegister.value;
  user.confirmPassword = confirmPasswordRegister.value;

  if (user.password != user.confirmPassword) {
    return confirmPasswordRegister.setCustomValidity("پسورد ها یکسان نمیباشند");
  } else {
    confirmPasswordRegister.setCustomValidity("");
  }

  window.location.href = "../dashboard/index.html";
  window.location.href = "../dashboardasasdasd/";
  // console.log(window.location);
  // document.location.href = ("Your url", true);

  // let response = await fetch(`${BASE_URL}/user/login`, {
  //   method: "POST",
  //   body: JSON.stringify({ username: user.email.split("@")[0], email: user.email, password: user.password }),
  // })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log(responseJson);
  //   });

  // await fetch(`${BASE_URL}/user/one/8`)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log(responseJson);
  //   });

  // if (response.ok) {
  //   const currentUser = { id: response.body.id, email: user.email };
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  //   console.log(localStorage.getItem("user"));
  // }
};

// registerBtn.addEventListener("click", () => {
//   console.log("here");
//   registerForm.submit();
// });

registerForm.addEventListener("submit", () => {
  register();
});
