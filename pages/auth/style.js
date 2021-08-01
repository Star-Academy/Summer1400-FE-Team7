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

//

const DISPLAY_NONE = "display-none";
const SIGNUP_FORM_WRAPPER = "signup-form-wrapper";
const BG_ANIMATION = {
  TYPE1: "bg-animation-1",
  TYPE2: "bg-animation-2",
  TYPE3: "bg-animation-3",
  TYPE4: "bg-animation-4",
};
const STOP_TRANSITION = "stop-transitions";
const FULL_LABEL = "full-label";
const UNSHOW_PASSWORD = "../../assets/images/unshow-password.svg";
const SHOW_PASSWORD = "../../assets/images/show-password.svg";

//FUNCTIONS IMPLEMENTATION

/**
 * Toggel position of login/sign-up form.
 */
const formPosChanHandler = () => {
  loginForm.classList.toggle(DISPLAY_NONE);
  signForm.classList.toggle(DISPLAY_NONE);
  formWrapper.classList.toggle(SIGNUP_FORM_WRAPPER);
};
/**
 * Change position of background and forms.
 */
const backgroundAnimation = () => {
  createNewAccountCta.addEventListener("click", () => {
    formPosChanHandler();

    main[0].className = BG_ANIMATION.TYPE1;

    setTimeout(() => {
      main[0].className = BG_ANIMATION.TYPE3;
    }, 400);
  });

  alreadyHaveAnAccountCta.addEventListener("click", () => {
    formPosChanHandler();
    main[0].className = BG_ANIMATION.TYPE4;
    setTimeout(() => {
      main[0].className = BG_ANIMATION.TYPE1;
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
    } else classes.add(STOP_TRANSITION);

    timer = setTimeout(() => {
      classes.remove(STOP_TRANSITION);
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
        i.nextElementSibling.classList.toggle(FULL_LABEL);
      }

      if (main[0].offsetWidth < 900 && (i.id == "login-email-input" || i.id == "login-password-input")) {
        main[0].className = BG_ANIMATION.TYPE2;
      }
    });

    i.addEventListener("blur", () => {
      if (i.value == "") {
        i.nextElementSibling.classList.toggle(FULL_LABEL);
      }

      if (main[0].offsetWidth < 900 && (i.id == "login-email-input" || i.id == "login-password-input")) {
        main[0].className = BG_ANIMATION.TYPE1;
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
        cta.src = UNSHOW_PASSWORD;
        see = true;
        cta.previousElementSibling.previousElementSibling.type = "text";
      } else {
        cta.src = SHOW_PASSWORD;
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
