// //VARIABLES DECLARATIONS
const menuButtons = document.querySelectorAll(".btn-wrapper");
const favIcon = document.querySelectorAll(".fav-icon");
const munuOpenerCloser = document.querySelector("#side-menu-opener-closer-btn");
const sideMenu = document.querySelector(".side-menu");
const layoutBtns = document.querySelectorAll(".radio-btn");
const lyricsBtn = document.querySelector("#lyrics-btn");
const lyricsBtnReturn = document.querySelector("#return");
const lyricsWrapper = document.querySelector(".lyric-wrapper");
const mainSection = document.querySelector(".section-1");
const sideMenuOpener = document.querySelector(".side-menu-opener-closer");
const volumeBtn = document.querySelector("#volume-btn");
const volumeBtnImg = volumeBtn.childNodes[1];
const volumeText = document.getElementById("volume-text");
const volumeSlider = document.getElementById("volume-slider");
const mobileInfo = document.querySelector(".mobile-info");

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

lyricsBtnReturn.addEventListener("click", () => {
  mainSection.classList.toggle("section-close");
  lyricsWrapper.classList.toggle("lyrics-wrapper-open");
  sideMenuOpener.classList.toggle("side-menu-opener-closed");
  lyricsBtn.classList.toggle("lyric-btn-active");
});

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
  console.log(volumeValue);
});

volumeText.innerHTML = volumeSlider.value;
const updateVolumeValue = (val) => {
  volumeText.innerHTML = val;
};

const hiddneTextMovingAnimation = (parentDiv, currentWidht) => {
  let totalWidth = 0;
  const children = [...parentDiv.children];

  children.forEach((elem) => {
    totalWidth += elem.getBoundingClientRect().width;
  });

  console.log("current", currentWidht);
  console.log("total", totalWidth);

  let animationWidth = currentWidht - totalWidth;
  if (animationWidth > 0) {
    return;
  }
  animationWidth = Math.abs(animationWidth);
  animationWidth += (animationWidth * 20) / 100;

  document.documentElement.style.setProperty("--animation-width", animationWidth + "px");
  console.log(animationWidth);
  mobileInfo.classList.toggle("mobile-info-animation");
  mobileInfo.style.justifyContent = "flex-start";
};

hiddneTextMovingAnimation(mobileInfo, (window.innerWidth / 100) * 40);
