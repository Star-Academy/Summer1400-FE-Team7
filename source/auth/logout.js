const logoutUser = () => {
  localStorage.removeItem("email");
  window.location.href = "../../pages/landing/index.html";
};
