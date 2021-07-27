const loginForm = document.querySelector(".login-form");
const signForm = document.querySelector(".signup-form");
const formWrapper = document.querySelector(".form-wrapper");
const alreadyHaveAnAccountCta = document.querySelector("#already-have-account");
const createNewAccountCta = document.querySelector("#create-new-account");
const main = document.getElementsByTagName("main");

const input = document.getElementsByTagName("input");
const showPassCta = document.querySelectorAll(".show-pass-cta");

createNewAccountCta.addEventListener("click", () => {
  formPosChanHandler();

  main[0].className = "bg-animation-2";

  setTimeout(() => {
    main[0].className = "bg-animation-3";
  }, 400);
});

alreadyHaveAnAccountCta.addEventListener("click", () => {
  formPosChanHandler();
  main[0].className = "bg-animation-4";
  setTimeout(() => {
    main[0].className = "bg-animation-1";
  }, 400);
});

const formPosChanHandler = () => {
  loginForm.classList.toggle("display-none");
  signForm.classList.toggle("display-none");
  formWrapper.classList.toggle("signup-form-wrapper");
};

const classes = document.getElementsByTagName("main")[0].classList;

let timer = 0;
window.addEventListener("resize", function () {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  } else classes.add("stop-transitions");

  timer = setTimeout(() => {
    classes.remove("stop-transitions");
    timer = null;
  }, 100);
});

for (let i of input) {
  i.addEventListener("focus", () => {
    if (i.value == "") {
      i.nextElementSibling.classList.toggle("full-label");
    }
  });

  i.addEventListener("blur", () => {
    if (i.value == "") {
      i.nextElementSibling.classList.toggle("full-label");
      console.log("dasdas");
    }
  });
}

for (let cta of showPassCta) {
  let see = false;
  cta.addEventListener("click", () => {
    if (!see) {
      cta.src = "../../assets/images/unshow-password.svg";
      see = true;
      cta.previousElementSibling.previousElementSibling.type = "text";
    } else {
      cta.src = "../../assets/images/show-password.svg";
      see = false;
      cta.previousElementSibling.previousElementSibling.type = "password";
    }
  });
}
