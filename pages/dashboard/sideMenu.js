const sideMenuBtns = document.querySelectorAll(".btn-wrapper");
const MENU_SELECTED = "menu-selected";
const playlistContainer = document.querySelector(".playlist-container");

sideMenuBtns.forEach((menu) => {
  menu.addEventListener("click", () => {
    if (!menu.classList.contains(MENU_SELECTED)) {
      const sectionHeader = menu.children[1].innerText;
      songListFiller(playList[sectionHeader], sectionHeader);
    }

    document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
    menu.classList.add(MENU_SELECTED);
  });
});

playlistContainer.addEventListener("click", () => {
  if (!playlistContainer.classList.contains(MENU_SELECTED)) {
    console.log(menu.children[1]);
  }
  document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
  playlistContainer.classList.add(MENU_SELECTED);
});
