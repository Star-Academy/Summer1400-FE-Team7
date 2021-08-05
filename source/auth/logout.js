const logoutUser = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  window.location.href = "../../pages/landing/index.html";
};
