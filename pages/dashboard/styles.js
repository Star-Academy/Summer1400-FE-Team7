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
const mobileInfo = document.querySelector(".mobile-info");
const listViewLayout = document.querySelector("#list-view");
const allSongsTabNavigation = document.querySelector("#all-songs-tab-navigation-mobile");

const songList = document.querySelector(".song-list");
const bgCover = document.querySelector(".bg-cover");
const bgGlass2 = document.querySelector(".dark-glass2");
const addPlayListBtn = document.querySelector(".add-btn");
const addPlayListWrapper = document.querySelector(".add-playlist-wrapper");

const seekSlider = document.getElementById("seek-slider");

const musicCover = document.querySelector("#music-cover");
const musicTitle = document.querySelector("#music-title");
const musicArtist = document.querySelector("#music-artist");
const songWrapper = document.querySelectorAll(".song-wrapper");
const playlistContainer = document.querySelector(".playlist-container");

const MENU_SELECTED = "menu-selected";

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
//Handle side-menu items selection.
*/
const HandlemenuButtonsSelect = () => {
  for (let m of menuButtons) {
    m.addEventListener("click", () => {
      document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
      m.classList.add(MENU_SELECTED);
    });
  }
  playlistContainer.addEventListener("click", () => {
    document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
    playlistContainer.classList.add(MENU_SELECTED);
  });
};

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
// Handle mute volume btn
*/
let volumeIsMuted = false;
let volumeValue = volumeSlider.value;

volumeBtn.addEventListener("click", () => {
  volumeIsMuted = !volumeIsMuted;
  if (volumeIsMuted) {
    volumeValue = volumeSlider.value;
    volumeBtnImg.src = MUTE_BTN_IMG;
    volumeText.innerHTML = "0";
    volumeSlider.value = 0;
    volumeBtn.setAttribute("data-tooltip", "بی صدا");
  } else {
    volumeBtnImg.src = VOLUME_BTN_IMG;
    volumeText.innerHTML = volumeValue;
    volumeSlider.value = volumeValue;
    volumeBtn.setAttribute("data-tooltip", "صدا");
  }
});
/*
// Update volume text value
*/
volumeText.innerHTML = volumeSlider.value;
const updateVolumeValue = (val) => {
  volumeText.innerHTML = val;
};

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

  mobileInfo.classList.remove(MOBILE_INFO_ANIMATION);

  mobileInfo.classList.add(MOBILE_INFO_ANIMATION);
  mobileInfo.style.justifyContent = "flex-start";
};

window.addEventListener("resize", () => {
  if (window.innerWidth < 750) {
    layoutFixer();
    hiddenTextMovingAnimation(mobileInfo, (window.innerWidth / 100) * 40);
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

HandlemenuButtonsSelect();
hiddenTextMovingAnimation(mobileInfo, (window.innerWidth / 100) * 40);
allSongsTabNavigation.focus();

addPlayListBtn.addEventListener("click", () => {
  console.log("hiiiiiii");
  console.log(bgGlass2);
  bgGlass2.classList.remove("display-none");
  addPlayListWrapper.classList.remove("display-none");
});

const makePlayList = document.querySelector("#make-playlist");
const cancleMakingPlayList = document.querySelector("#cancle-making-playlist");

makePlayList.addEventListener("click", () => {
  // code
  bgGlass2.classList.add("display-none");
  addPlayListWrapper.classList.add("display-none");
});

cancleMakingPlayList.addEventListener("click", () => {
  bgGlass2.classList.add("display-none");
  addPlayListWrapper.classList.add("display-none");
});
