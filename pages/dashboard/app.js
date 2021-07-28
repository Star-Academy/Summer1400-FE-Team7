// //VARIABLES DECLARATIONS
const menuButtons = document.querySelectorAll(".btn-wrapper");
("menu--selected");
const menuClassOmmiter = () => {
  for (let m of menuButtons) {
    if (m.classList.contains("menu-selected")) {
      m.classList.remove("menu-selected");
    }
  }
};

const handelmenuButtonsSelect = () => {
  console.log(menuButtons);
  for (let m of menuButtons) {
    m.addEventListener("click", () => {
      menuClassOmmiter();
      m.classList.add("menu-selected");
      console.log(m);
    });
  }
};

handelmenuButtonsSelect();
