const DEFUALT_SONG_COVER = "../../assets/images/default-song-cover.svg";
const FAV_ICON = "fav-icon";
const SONG_WRAPPER_SELECTED = "song-wrapper-selected";
const AUTHOR_NAME_SELECTED = "author-name-selected";
const LIKED_CLASS = "liked";
const LIKED = "../../assets/images/liked.svg";
const LIKE = "../../assets/images/like.svg";
const LIKE_HOVERD = "../../assets/images/like-hovered.svg";
const songListHeader = document.querySelector(".song-list-header");
const lyricText = document.querySelector(".lyric-text");

const lyricMusicCover = document.querySelector("#lyric-music-cover");
const lyricMusicName = document.querySelector("#lyric-music-name");
const lyricMusicArtist = document.querySelector("#lyric-music-artist");

let currentMusicIndex = 0;

let playList = {
  "همه آهنگ ها": [],
  "مورد علاقه": [],
};

let newPlayList = {};

const musicGrapper = async () => {
  await fetch("./songs.json")
    .then((response) => response.json())
    .then((data) => {
      playList["همه آهنگ ها"] = data.songs;
      playList["همه آهنگ ها"] = playList["همه آهنگ ها"];
      audio.src = playList["همه آهنگ ها"][currentMusicIndex].file;
      songListFiller(playList["همه آهنگ ها"], "همه آهنگ ها");
      placeholderOmmiter();
      optionFiller();
    })
    .catch((error) => console.log(error));
};

const songListFiller = (list, header) => {
  songListHeader.innerText = header;
  document.querySelectorAll(".song-wrapper").forEach((i) => {
    i.remove();
  });

  list.forEach((song, index) => {
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
    const moreOptions = document.createElement("button");
    moreOptions.className = "more-options";

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    likeImg.className = FAV_ICON;

    if (song.cover !== undefined) {
      song.cover += `?img${index}`;
      songCoverImg.src = song.cover;
    } else {
      songCoverImg.src = "../../assets/images/default-song-cover.svg";
    }

    songName.innerText = song.name;
    authorName.innerText = song.artist;

    lyricText.innerText = song.lyrics;

    // songDuration.innerText = convertHMS(song.duration);
    songDuration.innerText = convertHMS(Math.random() * (400 - 180) + 180);
    likeImg.src = LIKE;

    songCoverDiv.appendChild(songCoverImg);

    songInfoDiv.appendChild(songName);
    songInfoDiv.appendChild(authorName);

    songPropDiv.appendChild(songDuration);
    songPropDiv.appendChild(likeImg);

    //TODO ADD LAZY
    songWrapperDiv.appendChild(songCoverDiv);
    songWrapperDiv.appendChild(songInfoDiv);
    songWrapperDiv.appendChild(songPropDiv);
    songWrapperDiv.appendChild(moreOptions);
    songWrapperDiv.appendChild(optionsDiv);

    songList.appendChild(songWrapperDiv);

    if (playList["مورد علاقه"].includes(song)) {
      likeImg.classList.add(LIKED_CLASS);
      likeImg.src = LIKED_IMG;
    }

    likeImg.addEventListener("mouseover", () => {
      if (likeImg.classList.contains(LIKED_CLASS)) {
        likeImg.src = LIKED;
        likeImg.style.transform = "scale(1.2)";
      } else {
        likeImg.src = LIKE_HOVERD;
      }
    });

    likeImg.addEventListener("mouseout", () => {
      if (likeImg.classList.contains(LIKED_CLASS)) {
        likeImg.src = LIKED;
        likeImg.style.transform = "scale(1)";
      } else {
        likeImg.src = LIKE;
      }
    });

    likeImg.addEventListener("click", () => {
      likeImg.classList.toggle(LIKED_CLASS);
      likeImg.src = LIKED;
      likeImg.style.transform = "scale(1)";

      if (!playList["مورد علاقه"].includes(song)) {
        playList["مورد علاقه"] = [...playList["مورد علاقه"], song];
      } else {
        playList["مورد علاقه"] = playList["مورد علاقه"].filter(function (item) {
          return item !== song;
        });
      }
    });

    songWrapperDiv.addEventListener("click", (e) => {
      if (!e.path[0].classList.contains(FAV_ICON)) {
        const enabledBtn = [...document.getElementsByClassName(SONG_WRAPPER_SELECTED)];

        const authorNameSelected = [...document.getElementsByClassName(AUTHOR_NAME_SELECTED)];

        if (enabledBtn.length != 0) {
          enabledBtn[0].classList.remove(SONG_WRAPPER_SELECTED);
          authorNameSelected[0].classList.remove(AUTHOR_NAME_SELECTED);
        }

        songWrapperDiv.classList.add(SONG_WRAPPER_SELECTED);
        authorName.classList.add(AUTHOR_NAME_SELECTED);
      }
    });
    doubleClickHandler(songWrapperDiv, song.id);
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
    return minutes + ":" + seconds; // Return is  MM : SS
  }
};

musicGrapper();

const musicChangeHandler = () => {
  const imgSrc = playList["همه آهنگ ها"][currentMusicIndex].cover;
  const elemTitle = playList["همه آهنگ ها"][currentMusicIndex].name;
  const elemArtist = playList["همه آهنگ ها"][currentMusicIndex].artist;
  bgCover.style.background = `url(${imgSrc}) center no-repeat`;
  bgCover.style.backgroundSize = "cover";

  musicCover.src = imgSrc;
  musicArtist.innerText = elemArtist;
  musicTitle.innerText = elemTitle;
  const songWrapper = document.querySelectorAll(".song-wrapper");

  lyricMusicCover.src = imgSrc;
  lyricMusicName.innerText = elemTitle;
  lyricMusicArtist.innerText = elemArtist;

  lyricText.innerText = playList["همه آهنگ ها"][currentMusicIndex].lyrics;

  const currentlyPlaying = document.querySelector(".is-playing");
  if (currentlyPlaying != null) {
    currentlyPlaying.classList.remove("is-playing");
  }
  songWrapper[currentMusicIndex].classList.add("is-playing");
};

const optionFiller = () => {
  console.log("asdads");
  const allOptions = document.querySelectorAll(".options");

  allOptions.forEach((option, index) => {
    const ul = document.createElement("ul");
    ul.className = "option-list";

    deleteChildrenNodes(option);

    for (let list in newPlayList) {
      const li = document.createElement("li");
      li.innerText = list;
      ul.appendChild(li);
    }

    option.appendChild(ul);
  });
  console.log(allOptions);

  document.querySelectorAll(".test").forEach((i) => console.log(i));
};

const deleteChildrenNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
