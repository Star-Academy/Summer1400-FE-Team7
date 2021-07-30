// //VARIABLES DECLARATIONS
const menuButtons = document.querySelectorAll(".btn-wrapper");
const favIcon = document.querySelectorAll(".fav-icon");
const munuOpenerCloser = document.querySelector("#side-menu-opener-closer-btn");
const sideMenu = document.querySelector(".side-menu");
const layoutBtns = document.querySelectorAll(".radio-btn");
const lyricsBtn = document.querySelector("#lyrics-btn");
const lyricsWrapper = document.querySelector(".lyric-wrapper");
const mainSection = document.querySelector(".section-1");
const sideMenuOpener = document.querySelector(".side-menu-opener-closer");
console.log("🚀 ~ file: styles.js ~ line 11 ~ sideMenuOpener", sideMenuOpener);

const menuClassOmmiter = () => {
  for (let m of menuButtons) {
    if (m.classList.contains("menu-selected")) {
      m.classList.remove("menu-selected");
    }
  }
};

const handelmenuButtonsSelect = () => {
  for (let m of menuButtons) {
    m.addEventListener("click", () => {
      menuClassOmmiter();
      m.classList.add("menu-selected");
    });
  }
};

handelmenuButtonsSelect();

munuOpenerCloser.addEventListener("click", () => {
  sideMenu.classList.toggle("side-menu-closed");
  songList.classList.toggle("side-menu-opended");
});

layoutBtns.forEach((layout) => {
  layout.addEventListener("change", (event) => {
    switch (event.target.id) {
      case "list-compact-view":
        if (songList.classList.contains("grid-view")) {
          songList.classList.remove("grid-view");
        }
        songList.classList.add("list-compact-view");
        break;

      case "grid-view":
        if (songList.classList.contains("list-compact-view")) {
          songList.classList.remove("list-compact-view");
        }
        songList.classList.add("grid-view");
        break;

      default:
        if (songList.classList.contains("grid-view")) {
          songList.classList.remove("grid-view");
        }
        if (songList.classList.contains("list-compact-view")) {
          songList.classList.remove("list-compact-view");
        }
        break;
    }
  });
});

lyricsBtn.addEventListener("click", () => {
  mainSection.classList.toggle("section-close");
  lyricsWrapper.classList.toggle("lyrics-wrapper-open");
  sideMenuOpener.classList.toggle("side-menu-opener-closed");
  lyricsBtn.classList.toggle("lyric-btn-active");
});
