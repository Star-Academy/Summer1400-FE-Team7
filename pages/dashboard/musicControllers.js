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
  seekSlider.max = audio.duration;
  console.log(audio.duration)
  endTimeLabel.innerHTML=convertHMS( audio.duration)

};

const nextMusic = () => {
  currentMusicIndex++;
  if (currentMusicIndex > songs.length - 1) {
    currentMusicIndex = 0;
  }
  loadMusic();
  play();
};
const previousMusic = () => {
  currentMusicIndex--;
  if (currentMusicIndex < 0) {
    currentMusicIndex = songs.length - 1;
  }
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
  audio.play();
  playBtn.forEach((btn) => {
    btn.children[0].src = pauseBtnImg;
    btn.setAttribute("data-tooltip", "توقف");
  });
  status = statusTypes.PLAYING;

};

const playBtnState=()=>{

}

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
  currentTimeLabel.innerHTML=convertHMS( seekSlider.value )
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
    const imgSrc = songs[id - 1].cover;
    const elemTitle = songs[id - 1].name;
    const elemArtist = songs[id - 1].artist;
    bgCover.style.background = `url(${imgSrc}) center no-repeat`;
    bgCover.style.backgroundSize = "cover";

    musicCover.src = imgSrc;
    musicArtist.innerText = elemArtist;
    musicTitle.innerText = elemTitle;
    currentMusicIndex = id - 1;

    play();
  });
};
