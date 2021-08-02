const playBtn = document.querySelectorAll(".play-music-btn");
const pauseBtnImg = "../../assets/images/controls/pause.svg";
const playBtnImg = "../../assets/images/controls/play-button.svg";

const music = new Audio();

const statusTypes = {
  PLAYING: "playing",
  PASUED: "paused",
  STOPED: "stoped",
  MUTED: "muted",
};
let status = statusTypes.STOPED;

playBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (status == statusTypes.PLAYING) {
      pause();
    } else if (status == statusTypes.PASUED || status == statusTypes.STOPED) {
      play();
    }
  });
});

const play = () => {
  music.src = songs[currentMusicID].file;

  playBtn.forEach((btn) => {
    btn.children[0].src = pauseBtnImg;
  });

  music.addEventListener("canplaythrough", (event) => {
    status = statusTypes.PLAYING;
    music.play();
  });
};

const resume = () => {
  // music.r;
};

const pause = () => {
  music.pause();
  status = statusTypes.PASUED;
  playBtn.forEach((btn) => {
    btn.children[0].src = playBtnImg;
  });
};
