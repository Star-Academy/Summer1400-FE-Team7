//VARIABLES DECLARATIONS
const menuButtons = document.querySelectorAll(".btn-wrapper");
const favIcon = document.querySelectorAll(".fav-icon");
const munuOpenerCloser = document.querySelector("#side-menu-opener-closer-btn");
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

const seekSlider = document.getElementById("seek-slider");

const musicCover = document.querySelector("#music-cover");
const musicTitle = document.querySelector("#music-title");
const musicArtist = document.querySelector("#music-artist");
const songWrapper = document.querySelectorAll(".song-wrapper");

const MENU_SELECTED = "menu-selected";

const SIDE_MENU_CLOSED = "side-menu-closed";
const SIDE_MENU_OPEND = "side-menu-opended";

//
const SONG_WRAPPER_SELECTED = "song-wrapper-selected";
const AUTHOR_NAME_SELECTED = "author-name-selected";
//
/*
//Handle side-menu items selection.
*/
const menuClassOmmiter = () => {
  for (let m of menuButtons) {
    if (m.classList.contains(MENU_SELECTED)) {
      m.classList.remove(MENU_SELECTED);
    }
  }
};

const HandlemenuButtonsSelect = () => {
  for (let m of menuButtons) {
    m.addEventListener("click", () => {
      menuClassOmmiter();
      m.classList.add(MENU_SELECTED);
    });
  }
};

/*
// Handle open/close side menu
*/
munuOpenerCloser.addEventListener("click", () => {
  sideMenu.classList.toggle(SIDE_MENU_CLOSED);
  songList.classList.toggle(SIDE_MENU_OPEND);
});

/*
// Handle change song list modes (list-view , list-view-compact- grid)
*/
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

/*
// Handle open/close lyrics-view
*/
lyricsBtn.addEventListener("click", () => {
  mainSection.classList.toggle("section-close");
  lyricsWrapper.classList.toggle("lyrics-wrapper-open");
  sideMenuOpener.classList.toggle("side-menu-opener-closed");
  lyricsBtn.classList.toggle("lyric-btn-active");
  lyricsBtnReturn.classList.toggle("display-none");
});

lyricsBtnMobile.addEventListener("click", () => {
  mainSection.classList.toggle("section-close");
  lyricsWrapper.classList.toggle("lyrics-wrapper-open");
  sideMenuOpener.classList.toggle("side-menu-opener-closed");
  lyricsBtnMobile.classList.toggle("lyric-btn-active");
  lyricsBtnReturn.classList.toggle("display-none");
});

lyricsBtnReturn.addEventListener("click", () => {
  mainSection.classList.toggle("section-close");
  lyricsWrapper.classList.toggle("lyrics-wrapper-open");
  sideMenuOpener.classList.toggle("side-menu-opener-closed");
  lyricsBtn.classList.toggle("lyric-btn-active");
  lyricsBtnMobile.classList.toggle("lyric-btn-active");
  lyricsBtnReturn.classList.toggle("display-none");
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
    volumeBtnImg.src = "../../assets/images/controls/mute.svg";
    volumeText.innerHTML = "0";
    volumeSlider.value = 0;
    volumeBtn.setAttribute("data-tooltip", "بی صدا");
  } else {
    volumeBtnImg.src = "../../assets/images/controls/volume.svg";
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

  if (mobileInfo.classList.contains("mobile-info-animation")) {
    mobileInfo.classList.remove("mobile-info-animation");
  }

  mobileInfo.classList.add("mobile-info-animation");
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
  if (songList.classList.contains("list-compact-view")) {
    songList.classList.remove("list-compact-view");
    listViewLayout.checked = true;
  }
};

/*
// Handle like btn hover and click
*/
favIcon.forEach((elem) => {
  elem.addEventListener("mouseover", () => {
    if (elem.classList.contains("liked")) {
      elem.src = "../../assets/images/liked.svg";
      elem.style.transform = "scale(1.2)";
    } else {
      elem.src = "../../assets/images/like-hovered.svg";
    }
  });

  elem.addEventListener("mouseout", () => {
    if (elem.classList.contains("liked")) {
      elem.src = "../../assets/images/liked.svg";
      elem.style.transform = "scale(1)";
    } else {
      elem.src = "../../assets/images/like.svg";
    }
  });

  elem.addEventListener("click", () => {
    elem.classList.toggle("liked");
    elem.src = "../../assets/images/liked.svg";
    elem.style.transform = "scale(1)";
  });
});

/*
// Handle change main background when double click on each song
*/
const dblClickHandler = (elem) => {
  elem.addEventListener("dblclick", () => {
    const imgSrc = elem.firstChild.firstChild.src;
    const elemTitle = elem.childNodes[1].childNodes[0].innerText;
    const elemArtist = elem.childNodes[1].childNodes[1].innerText;

    bgCover.style.background = `url(${imgSrc}) center no-repeat`;
    bgCover.style.backgroundSize = "cover";

    musicCover.src = imgSrc;
    musicArtist.innerText = elemArtist;
    musicTitle.innerText = elemTitle;
  });
};

/*
// Handle on music click
*/
songWrapper.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    if (!e.path[0].classList.contains("fav-icon")) {
      const enabledBtn = [...document.getElementsByClassName(SONG_WRAPPER_SELECTED)];

      const authorNameSelected = [...document.getElementsByClassName("author-name-selected")];

      if (enabledBtn.length != 0) {
        enabledBtn[0].classList.remove(SONG_WRAPPER_SELECTED);
        authorNameSelected[0].classList.remove("author-name-selected");
      }

      elem.classList.add(SONG_WRAPPER_SELECTED);
      elem.children[1].children[1].classList.add(AUTHOR_NAME_SELECTED);
    }
  });

  /*
  // Update song info in the music-control section
  */
  elem.addEventListener("dblclick", () => {
    const imgSrc = elem.children[0].children[0].src;
    const elemTitle = elem.children[1].children[0].innerText;
    const elemArtist = elem.children[1].children[1].innerText;

    bgCover.style.background = `url(${imgSrc}) center no-repeat`;
    bgCover.style.backgroundSize = "cover";

    musicCover.src = imgSrc;
    musicArtist.innerText = elemArtist;
    musicTitle.innerText = elemTitle;
  });
});

HandlemenuButtonsSelect();
hiddenTextMovingAnimation(mobileInfo, (window.innerWidth / 100) * 40);
allSongsTabNavigation.focus();
