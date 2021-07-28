//this file uses for managing UI elements.

//VARIABLES DECLARATIONS
const loginForm = document.querySelector(".login-form");
const signForm = document.querySelector(".signup-form");
const formWrapper = document.querySelector(".form-wrapper");
const alreadyHaveAnAccountCta = document.querySelector("#already-have-account");
const createNewAccountCta = document.querySelector("#create-new-account");
const main = document.getElementsByTagName("main");
const input = document.getElementsByTagName("input");
const showPassCta = document.querySelectorAll(".show-pass-cta");

//FUNCTIONS IMPLEMENTATION

/**
 * Toggel position of login/sign-up form.
 */
const formPosChanHandler = () => {
  loginForm.classList.toggle("display-none");
  signForm.classList.toggle("display-none");
  formWrapper.classList.toggle("signup-form-wrapper");
};
/**
 * Change position of background and forms.
 */
const backgroundAnimation = () => {
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
};

/**
 * Handel form transitions when user resize the page manually and avoid changing position with animation.
 */

const AvoidFormTransitionsOnPageResize = () => {
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
};

/**
 * Handel input's floating label by listening to input's events and value and toggel next sibling
 * state. next sibling is its label.
 */
const HandelFloatingLabel = () => {
  for (let i of input) {
    i.addEventListener("focus", () => {
      if (i.value == "") {
        i.nextElementSibling.classList.toggle("full-label");
      }

      if (main[0].offsetWidth < 900 && (i.id == "login-email-input" || i.id == "login-password-input")) {
        main[0].className = "bg-animation-2";
      }
    });

    i.addEventListener("blur", () => {
      if (i.value == "") {
        i.nextElementSibling.classList.toggle("full-label");
      }

      if (main[0].offsetWidth < 900 && (i.id == "login-email-input" || i.id == "login-password-input")) {
        main[0].className = "bg-animation-1";
      }
    });
  }
};

/**
 * Handel show password and change show-password icon.
 */
const HandelShowPassword = () => {
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
};

///FUNCTION CALLS

backgroundAnimation();
AvoidFormTransitionsOnPageResize();
HandelFloatingLabel();
HandelShowPassword();
