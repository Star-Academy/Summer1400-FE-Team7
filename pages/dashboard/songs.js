const songList = document.querySelector(".song-list");
const bgCover = document.querySelector(".bg-cover");

const seekSlider = document.getElementById("seek-slider");

const musicCover = document.querySelector("#music-cover");
const musicTitle = document.querySelector("#music-title");
const musicArtist = document.querySelector("#music-artist");

fetch("./songs.json")
  .then((response) => response.json())
  .then((data) => {
    songListFiller(data);
  })
  .catch((error) => console.log(error));

//TODO add alt into images
const songListFiller = ({ songs }) => {
  songs.forEach((song, index) => {
    const songWrapperDiv = document.createElement("div");
    songWrapperDiv.className = "song-wrapper";

    const songCoverDiv = document.createElement("div");
    songCoverDiv.className = "song-cover";

    const songCoverImg = document.createElement("img");

    const songInfoDiv = document.createElement("div");
    songInfoDiv.className = "song-info";

    const songName = document.createElement("p");

    const authorName = document.createElement("p");

    const songPropDiv = document.createElement("div");
    songPropDiv.className = "song-prop";

    const songDuration = document.createElement("p");

    const likeImg = document.createElement("img");
    likeImg.className = "fav-icon";

    if (song.cover !== undefined) {
      song.cover += `?img${index}`;
      songCoverImg.src = song.cover;
    } else {
      songCoverImg.src = "../../assets/images/default-song-cover.svg";
    }

    songName.innerText = song.title;
    authorName.innerText = song.artist;

    songDuration.innerText = convertHMS(song.duration);
    likeImg.src = "../../assets/images/like.svg";

    songCoverDiv.appendChild(songCoverImg);

    songInfoDiv.appendChild(songName);
    songInfoDiv.appendChild(authorName);

    songPropDiv.appendChild(songDuration);
    songPropDiv.appendChild(likeImg);

    songWrapperDiv.appendChild(songCoverDiv);
    songWrapperDiv.appendChild(songInfoDiv);
    songWrapperDiv.appendChild(songPropDiv);

    songList.appendChild(songWrapperDiv);

    likeImg.addEventListener("mouseover", () => {
      if (likeImg.classList.contains("liked")) {
        likeImg.src = "../../assets/images/liked.svg";
        likeImg.style.transform = "scale(1.2)";
      } else {
        likeImg.src = "../../assets/images/like-hovered.svg";
      }
    });

    likeImg.addEventListener("mouseout", () => {
      if (likeImg.classList.contains("liked")) {
        likeImg.src = "../../assets/images/liked.svg";
        likeImg.style.transform = "scale(1)";
      } else {
        likeImg.src = "../../assets/images/like.svg";
      }
    });

    likeImg.addEventListener("click", () => {
      likeImg.classList.toggle("liked");
      likeImg.src = "../../assets/images/liked.svg";
      likeImg.style.transform = "scale(1)";
    });

    songWrapperDiv.addEventListener("click", (e) => {
      if (!e.path[0].classList.contains("fav-icon")) {
        const enabledBtn = [...document.getElementsByClassName("song-wrapper-selected")];

        const authorNameSelected = [...document.getElementsByClassName("author-name-selected")];

        if (enabledBtn.length != 0) {
          enabledBtn[0].classList.remove("song-wrapper-selected");
          authorNameSelected[0].classList.remove("author-name-selected");
        }

        songWrapperDiv.classList.add("song-wrapper-selected");
        authorName.classList.add("author-name-selected");
      }
    });

    dblClickHandler(songWrapperDiv);
  });
};

const convertHMS = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (hours > 0) {
    return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
  } else {
    return minutes + ":" + seconds; // Return is HH : MM : SS
  }
};

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

const updateVolumeValue = (val) => {
  document.getElementById("volume-text").innerHTML = val;
};

const updateMusicBarValue = (val) => {
  document.getElementById("current-time").textContent = val;
};


