const playBtn = document.querySelectorAll(".play-music-btn");
const pauseBtnImg = "../../assets/images/controls/pause.svg";
const playBtnImg = "../../assets/images/controls/play-button.svg";
const audio = document.querySelector("#audio");

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
  console.log("🚀 ~ file: musicControllers.js ~ line 33 ~ play ~ play");
  playBtn.forEach((btn) => {
    btn.children[0].src = pauseBtnImg;
    btn.setAttribute("data-tooltip", "توقف");
  });

    audio.addEventListener("canplaythrough", (event) => {
      status = statusTypes.PLAYING;
    audio.play();
  });
};

const resume = () => {
  // music.r;
};

const pause = () => {
  console.log("🚀 ~ file: musicControllers.js ~ line 46 ~ pause ~ pause");
  audio.pause();
  status = statusTypes.PASUED;
  playBtn.forEach((btn) => {
    btn.children[0].src = playBtnImg;
    btn.setAttribute("data-tooltip", "پخش");

  });
};

const updateMusicBarValue = (value) => {
  audio.currentTime=value;
}
audio.addEventListener("timeupdate",(event) => {

  console.log(audio.currentTime)
  seekSlider.max=audio.duration
  seekSlider.value=audio.currentTime
});

audio.addEventListener("ended",(event) => {

})

