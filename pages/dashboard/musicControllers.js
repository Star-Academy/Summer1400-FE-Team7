const playBtn = document.querySelectorAll(".play-music-btn");
const pauseBtnImg = "../../assets/images/controls/pause.svg";
const playBtnImg = "../../assets/images/controls/play-button.svg";
const LoadingBtnImg = "../../assets/images/controls/loading.svg ";

const audio = document.querySelector("#audio");
const nextBtn = document.querySelectorAll(".next-btn");
const previousBtn = document.querySelectorAll(".previous-btn");
const shuffleBtn = document.querySelectorAll(".shuffle-btn");
const repeatBtn = document.querySelectorAll(".repeat-btn");
const currentTimeLabel = document.querySelectorAll(".current-time");
const endTimeLabel = document.querySelectorAll(".end-time");

const statusTypes = {
  PLAYING: "playing",
  PASUED: "paused",
  STOPED: "stoped",
  MUTED: "muted",
};

const repeatTypes = {
  NO_REPEAT: "no-repeat",
  ONE_REPEAT: "one-repeat",
  ALL_REPEAT: "all-repeat",
};

let status = statusTypes.STOPED;
let repeatMode = repeatTypes.NO_REPEAT;
let shuffleMode = false;
let shuffleArray = [];
let shuffleIndex = 0;

audio.addEventListener("error",()=>{
  showNotification("مشکلی در بارگیری آهنگ وجود دارد")
  stop();
},true);

const loadMusic = () => {
  audio.src = currentPlaylist[currentMusicIndex].file;
};

const nextMusic = () => {
  if (shuffleMode) {
    shuffleIndex++;
    if (shuffleIndex >= currentPlaylist.length ) {
      shuffleIndex = 0;
    }
    currentMusicIndex = shuffleArray[shuffleIndex];
  } else {
    currentMusicIndex++;
  }

  if (currentMusicIndex >=currentPlaylist.length ) {
    currentMusicIndex = 0;
    if (repeatMode == repeatTypes.NO_REPEAT && !shuffleMode) {
      pause();
      
    }
  }
  musicChangeHandler();
  loadMusic();
  play();
};

const previousMusic = () => {
  if (shuffleMode) {
    shuffleIndex--;
    if (shuffleIndex < 0) {
      shuffleIndex = currentPlaylist.length - 1;
    }
    currentMusicIndex = shuffleArray[shuffleIndex];
  } else {
    currentMusicIndex--;
  }

  if (currentMusicIndex < 0) {
    currentMusicIndex = currentPlaylist.length - 1;
  }
  musicChangeHandler();
  loadMusic();
  play();
};

// play button ********************
const handlePlayButton = () => {
  playBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (status == statusTypes.PLAYING) {
        pause();
      } else if (status == statusTypes.PASUED) {
        resume();
      } else if (status == statusTypes.STOPED) {
        play();
      }
    });
  });
};
handlePlayButton();

const play = () => {
  musicChangeHandler();
  loadMusic();

  playBtn.forEach((btn) => {
    btn.children[0].src = LoadingBtnImg;
    btn.setAttribute("data-tooltip", "توقف");
  });

  audio.addEventListener("canplaythrough", (event) => {
    status = statusTypes.PLAYING;
    audio.play();
    playBtn.forEach((btn) => {
      btn.children[0].src = pauseBtnImg;
      btn.setAttribute("data-tooltip", "توقف");
    });
    seekSlider.forEach((slider) => {
      slider.max = audio.duration;
    });

    endTimeLabel.forEach((label) => {
      label.innerHTML = convertHMS(audio.duration);
    });
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
  audio.pause();
  status = statusTypes.PASUED;
  playBtn.forEach((btn) => {
    btn.children[0].src = playBtnImg;
    btn.setAttribute("data-tooltip", "پخش");
  });
};
const stop = () => {
  audio.pause();
  status = statusTypes.STOPED;
  playBtn.forEach((btn) => {
    btn.children[0].src = playBtnImg;
    btn.setAttribute("data-tooltip", "پخش");
  });
};

const updateMusicBarValue = (value) => {
  audio.currentTime = value;
  resume();
};
const updateMobileMusicBarValue = (value) => {
  audio.currentTime = value;
  resume();
};

audio.addEventListener("timeupdate", (event) => {
  let seekbarValue = 0;
  seekSlider.forEach((slider) => {
    slider.value = audio.currentTime;
    seekbarValue = slider.value;
  });
  currentTimeLabel.forEach((label) => {
    label.innerHTML = convertHMS(seekbarValue);
  });
});

audio.addEventListener("ended", (event) => {
  switch (repeatMode) {
    case repeatTypes.NO_REPEAT:
    case repeatTypes.ALL_REPEAT:
      nextMusic();
      break;

    case repeatTypes.ONE_REPEAT:
      resume();
      break;
  }
});

nextBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    nextMusic();
  });
});

previousBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    previousMusic();
  });
});

const doubleClickHandler = (elem, id) => {
  elem.addEventListener("dblclick", () => {
     currentMusicIndex = elem.getAttribute("song-index");
    play();
  });
};

function KeyPress(e) {
  var evtobj = window.event ? event : e;

  if (evtobj.key == "ArrowRight" && evtobj.ctrlKey) {
    nextMusic();
  } else if (evtobj.key == "ArrowLeft" && evtobj.ctrlKey) {
    previousMusic();
  } else if (evtobj.key == "ArrowDown" && evtobj.ctrlKey) {
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
    }
  }
}

document.onkeydown = KeyPress;

repeatBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    switch (repeatMode) {
      case repeatTypes.NO_REPEAT:
        repeatMode = repeatTypes.ONE_REPEAT;
        btn.classList.add("active-btn");
        btn.children[0].src = "../../assets/images/controls/repeat1.svg"

        break;

      case repeatTypes.ONE_REPEAT:
        repeatMode = repeatTypes.ALL_REPEAT;
        btn.classList.add("active-btn");
        btn.children[0].src = "../../assets/images/controls/repeat.svg"

        break;

      case repeatTypes.ALL_REPEAT:
        repeatMode = repeatTypes.NO_REPEAT;
        btn.classList.remove("active-btn");
        btn.children[0].src = "../../assets/images/controls/repeat.svg"


        break;
    }
  });
});

shuffleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    shuffleMode = !shuffleMode;
    if (shuffleMode) {
      btn.classList.add("active-btn");
      generateShuffleList();
    }else{
      btn.classList.remove("active-btn");
    }
  });
});
const shuffle = (array) => {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
};

const generateShuffleList = () => {
  for (i = 0; i < currentPlaylist.length; i++) shuffleArray[i] = i;
  shuffleArray = shuffle(shuffleArray);
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
