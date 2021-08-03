const playBtn = document.querySelectorAll(".play-music-btn");
const pauseBtnImg = "../../assets/images/controls/pause.svg";
const playBtnImg = "../../assets/images/controls/play-button.svg";

const audio = document.querySelector("#audio");
const nextBtn = document.querySelector("#next-btn");
const previousBtn = document.querySelector("#previous-btn");
const currentTimeLabel = document.querySelector("#current-time");
const endTimeLabel = document.querySelector("#end-time");

const statusTypes = {
  PLAYING: "playing",
  PASUED: "paused",
  STOPED: "stoped",
  MUTED: "muted",
};
let status = statusTypes.STOPED;

const loadMusic = () => {
  audio.src = songs[currentMusicIndex].file;
  const songname = `name :${songs[currentMusicIndex].name}`;
  console.log("🚀loadMusic", songname);
};

const nextMusic = () => {
  currentMusicIndex++;
  if (currentMusicIndex > songs.length - 1) {
    currentMusicIndex = 0;
  }
  musicChangeHandler();
  loadMusic();
  play();
};

const previousMusic = () => {
  currentMusicIndex--;
  if (currentMusicIndex < 0) {
    currentMusicIndex = songs.length - 1;
  }
  musicChangeHandler();
  loadMusic();
  play();
};

playBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (status == statusTypes.PLAYING) {
      pause();
    } else if (status == statusTypes.PASUED || status == statusTypes.STOPED) {
      resume();
    }
  });
});

const play = () => {
  console.log("🚀  play");
  loadMusic();

  //TODO replace this with circular loading
  playBtn.forEach((btn) => {
    btn.children[0].src = "../../assets/images/controls/cancel.svg";
    btn.setAttribute("data-tooltip", "توقف");
  });

  audio.addEventListener("canplaythrough", (event) => {
    status = statusTypes.PLAYING;
    audio.play();
    playBtn.forEach((btn) => {
      btn.children[0].src = pauseBtnImg;
      btn.setAttribute("data-tooltip", "توقف");
    });
    seekSlider.max = audio.duration;
    console.log(audio.duration);
    endTimeLabel.innerHTML = convertHMS(audio.duration);
  });
};

const resume = () => {
  audio.play();
  playBtn.forEach((btn) => {
    btn.children[0].src = pauseBtnImg;
    btn.setAttribute("data-tooltip", "توقف");
  });
  status = statusTypes.PLAYING;
};

const playBtnState = () => {};

const pause = () => {
  console.log("🚀 pause");
  audio.pause();
  status = statusTypes.PASUED;
  playBtn.forEach((btn) => {
    btn.children[0].src = playBtnImg;
    btn.setAttribute("data-tooltip", "پخش");
  });
};

const updateMusicBarValue = (value) => {
  audio.currentTime = value;
  resume();
};
audio.addEventListener("timeupdate", (event) => {
  seekSlider.value = audio.currentTime;
  currentTimeLabel.innerHTML = convertHMS(seekSlider.value);
});

audio.addEventListener("ended", (event) => {
  nextMusic();
});

nextBtn.addEventListener("click", (event) => {
  nextMusic();
});
previousBtn.addEventListener("click", (event) => {
  previousMusic();
});

const doubleClickHandler = (elem, id) => {
  elem.addEventListener("dblclick", () => {
    currentMusicIndex = id - 1;
    musicChangeHandler();
    play();
  });
};

//press space button
document.body.onkeyup = (e) => {
  if (e.keyCode == 32) {
    switch (status) {
      case statusTypes.STOPED:
        play();
        break;
      case statusTypes.PLAYING:
        pause();
        break;
      case statusTypes.PASUED:
        resume();
        break;

      default:
        break;
    }
  }
};

/*
// Handle mute volume btn
*/
let volumeIsMuted = false;
let volumeValue = volumeSlider.value;
audio.volume = volumeValue / 100;
volumeBtn.addEventListener("click", () => {
  volumeIsMuted = !volumeIsMuted;
  if (volumeIsMuted) {
    volumeValue = volumeSlider.value;
    volumeBtnImg.src = MUTE_BTN_IMG;
    volumeText.innerHTML = "0";
    volumeSlider.value = 0;
    volumeBtn.setAttribute("data-tooltip", "بی صدا");
    audio.volume = 0;
  } else {
    volumeBtnImg.src = VOLUME_BTN_IMG;
    volumeText.innerHTML = volumeValue;
    volumeSlider.value = volumeValue;
    volumeBtn.setAttribute("data-tooltip", "صدا");
    audio.volume = volumeValue / 100;
  }
});
/*
// Update volume text value
*/
volumeText.innerHTML = volumeSlider.value;
const updateVolumeValue = (val) => {
  volumeText.innerHTML = val;
  audio.volume = val / 100;
};
