//VARIABLES DECLARATIONS
const menuButtons = document.querySelectorAll(".btn-wrapper");
const favIcon = document.querySelectorAll(".fav-icon");
const sideMenu = document.querySelector(".side-menu");
const layoutBtns = document.querySelectorAll(".radio-btn");
const lyricsBtn = document.querySelector("#lyrics-btn");
const lyricsBtnMobile = document.querySelector("#lyrics-btn-mobile");
const lyricsBtnReturn = document.querySelector("#return");
const lyricsWrapper = document.querySelector(".lyric-wrapper");
const mainSection = document.querySelector(".section-1");
const sideMenuOpener = document.querySelector(".side-menu-opener-closer");
const volumeBtn = document.querySelector("#volume-btn");
const volumeBtnImg = volumeBtn.childNodes[1];
const volumeText = document.getElementById("volume-text");
const volumeSlider = document.getElementById("volume-slider");
const mobileInfo = document.querySelectorAll(".mobile-info");
const listViewLayout = document.querySelector("#list-view");
const allSongsTabNavigation = document.querySelector("#all-songs-tab-navigation-mobile");
const userEmail = document.querySelector("#user-email");
const pofileWrapper = document.querySelector(".profile-wrapper");

const songList = document.querySelector(".song-list");
const bgCover = document.querySelector(".bg-cover");
const bgGlass2 = document.querySelector(".dark-glass2");
const addPlayListBtn = document.querySelector(".add-btn");
const addPlayListWrapper = document.querySelector(".add-playlist-wrapper");

const seekSlider = document.querySelectorAll(".seek-slider");

const musicCover = document.querySelector("#music-cover");
const musicTitle = document.querySelector("#music-title");
const musicArtist = document.querySelector("#music-artist");
const songWrapper = document.querySelectorAll(".song-wrapper");

const SIDE_MENU_CLOSED = "side-menu-closed";
const SIDE_MENU_OPEND = "side-menu-opended";

const LIST_VIEW_COMPACT = "list-compact-view";
const GRID_VIEW = "grid-view";

const SECTION_CLOSE = "section-close";
const LYRICS_WRAPPER_OPEN = "lyrics-wrapper-open";

const SIDE_MENU_OPENER_CLOED = "side-menu-opener-closed";
const LYRIC_BTN_ACTIVE = "lyric-btn-active";
const DISPLAY_NONE = "display-none";
const MUTE_BTN_IMG = "../../assets/images/controls/mute.svg";
const VOLUME_BTN_IMG = "../../assets/images/controls/volume.svg";
const MOBILE_INFO_ANIMATION = "mobile-info-animation";
const LIKE_HOVE_IMG = "../../assets/images/like-hovered.svg";
const LIKE_IMG = "../../assets/images/like.svg";
const LIKED_IMG = "../../assets/images/liked.svg";

/*
// Handle open/close side menu
*/
sideMenuOpener.addEventListener("click", () => {
  sideMenu.classList.toggle(SIDE_MENU_CLOSED);
  songList.classList.toggle(SIDE_MENU_OPEND);
});

/*
// Handle change song list modes (list-view , list-view-compact- grid)
*/
layoutBtns.forEach((layout) => {
  layout.addEventListener("change", (event) => {
    switch (event.target.id) {
      case LIST_VIEW_COMPACT:
        songList.classList.remove(GRID_VIEW);
        songList.classList.add(LIST_VIEW_COMPACT);
        break;

      case GRID_VIEW:
        songList.classList.remove(LIST_VIEW_COMPACT);
        songList.classList.add(GRID_VIEW);
        break;

      default:
        songList.classList.remove(GRID_VIEW);
        songList.classList.remove(LIST_VIEW_COMPACT);
        break;
    }
  });
});

/*
// Handle open/close lyrics-view
*/

const toggleLyricsLayout = (btn) => {
  mainSection.classList.toggle(SECTION_CLOSE);
  lyricsWrapper.classList.toggle(LYRICS_WRAPPER_OPEN);
  sideMenuOpener.classList.toggle(SIDE_MENU_OPENER_CLOED);
  btn.classList.toggle(LYRIC_BTN_ACTIVE);

  lyricsBtnReturn.classList.toggle(DISPLAY_NONE);
};

lyricsBtn.addEventListener("click", () => {
  toggleLyricsLayout(lyricsBtn);
});

lyricsBtnMobile.addEventListener("click", () => {
  toggleLyricsLayout(lyricsBtnMobile);
});

lyricsBtnReturn.addEventListener("click", () => {
  toggleLyricsLayout(lyricsBtnMobile);
  lyricsBtn.classList.toggle(LYRIC_BTN_ACTIVE);
});

/*
// Handle long song title and artis name with moving text animation
*/
const hiddenTextMovingAnimation = (parentDiv, currentWidht) => {
  let totalWidth = 0;
  const children = [...parentDiv.children];


  children.forEach((elem) => {
    totalWidth += elem.getBoundingClientRect().width;
  });

  let animationWidth = currentWidht - totalWidth;
  if (animationWidth > 0) {
    return;
  }
  animationWidth = Math.abs(animationWidth);

  document.documentElement.style.setProperty("--animation-width", animationWidth + "px");

  mobileInfo[0].classList.remove(MOBILE_INFO_ANIMATION);
  mobileInfo[0].classList.remove(MOBILE_INFO_ANIMATION);
  mobileInfo[0].classList.add(MOBILE_INFO_ANIMATION);
  mobileInfo[1].classList.add(MOBILE_INFO_ANIMATION);
  mobileInfo[1].style.justifyContent = "flex-start";
  mobileInfo[1].style.justifyContent = "flex-start";
};

window.addEventListener("resize", () => {
  if (window.innerWidth < 750) {
    layoutFixer();
    hiddenTextMovingAnimation(mobileInfo[0], (window.innerWidth / 100) * 40);
    hiddenTextMovingAnimation(mobileInfo[1], (window.innerWidth / 100) * 40);
  }
});

/*
// Delete song-list compact-list mode in mobile size
*/
const layoutFixer = () => {
  if (songList.classList.contains(LIST_VIEW_COMPACT)) {
    songList.classList.remove(LIST_VIEW_COMPACT);
    listViewLayout.checked = true;
  }
};

/*
// Handle like btn hover and click
*/
favIcon.forEach((elem) => {
  elem.addEventListener("mouseover", () => {
    if (elem.classList.contains("liked")) {
      elem.src = LIKED_IMG;
      elem.style.transform = "scale(1.2)";
    } else {
      elem.src = LIKE_HOVE_IMG;
    }
  });

  elem.addEventListener("mouseout", () => {
    if (elem.classList.contains("liked")) {
      elem.src = LIKED_IMG;
      elem.style.transform = "scale(1)";
    } else {
      elem.src = LIKE_IMG;
    }
  });

  elem.addEventListener("click", () => {
    elem.classList.toggle("liked");
    elem.src = LIKED_IMG;
    elem.style.transform = "scale(1)";
  });
});

hiddenTextMovingAnimation(mobileInfo[0], (window.innerWidth / 100) * 40);
hiddenTextMovingAnimation(mobileInfo[1], (window.innerWidth / 100) * 40);
allSongsTabNavigation.focus();

addPlayListBtn.addEventListener("click", () => {
  bgGlass2.classList.remove("display-none");
  addPlayListWrapper.classList.remove("display-none");
});

const makePlayList = document.querySelector("#make-playlist");
const cancleMakingPlayList = document.querySelector("#cancle-making-playlist");
const makeNewPlaylistInput = document.querySelector("#make-new-playlist-input");

makePlayList.addEventListener("click", () => {
  const title = makeNewPlaylistInput.value;
  if (title == "") {
    return false;
  }

  newPlayList[title] = [];
  addNewPlaylist(title);

  bgGlass2.classList.add("display-none");
  addPlayListWrapper.classList.add("display-none");
  optionFiller();
  makeNewPlaylistInput.value = "";
});

cancleMakingPlayList.addEventListener("click", () => {
  bgGlass2.classList.add("display-none");
  addPlayListWrapper.classList.add("display-none");
});

userEmail.innerText = localStorage.getItem("email");

pofileWrapper.addEventListener("click", () => {
  logoutUser();
});

const darkGlassMobilePreview = document.querySelector(".dark-glass3");
const mobileSongPreview = document.querySelector(".mobile-song-preview");
const mobileSongPreviewBackBtn = document.querySelector(".mobile-song-preview-return");

mobileInfo[0].addEventListener("click", () => {
  darkGlassMobilePreview.classList.remove("display-none");
  mobileSongPreview.classList.remove("display-none");
});

mobileSongPreviewBackBtn.addEventListener("click", () => {
  darkGlassMobilePreview.classList.add("display-none");
  mobileSongPreview.classList.add("display-none");
});
