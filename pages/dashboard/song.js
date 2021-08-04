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

const ALL_SONGS = "همه آهنگ ها";
const FAV_SONGS = "مورد علاقه";

let currentMusicIndex = 0;

let playList = {
  "مورد علاقه": [],
  allSongs: [],
  favSongs: [],
};

let newPlayList = {};

const musicGrapper = async () => {
  await fetch("./songs.json")
    .then((response) => response.json())
    .then((data) => {
      playList.allSongs = data.songs;
      audio.src = playList.allSongs[currentMusicIndex].file;
      songListFiller(playList.allSongs, ALL_SONGS);
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

  const template = document.querySelector("#song-wrapper-template");
  list.forEach((song, index) => {
    if ("content" in document.createElement("template")) {
      const clone = template.content.cloneNode(true);
      const options = clone.querySelector(".options");
      const songCoverImage = clone.querySelector(".song-cover-img");
      const songName = clone.querySelector("#song-name");
      const artistName = clone.querySelector("#artist-name");
      const duration = clone.querySelector("#duration");
      const favIcon = clone.querySelector(".fav-icon");
      const songWrapper = clone.querySelector(".song-wrapper");

      options.setAttribute("data-id", song.id);

      if (song.cover != undefined) {
        songCoverImage.src = song.cover;
      } else {
        songCoverImage.src = DEFUALT_SONG_COVER;
      }

      songName.innerText = song.name;
      artistName.innerText = song.artist;

      duration.innerText = convertHMS(Math.random() * (400 - 180) + 180);

      favIcon.src = LIKE;
      songList.appendChild(clone);

      if (playList.favSongs.includes(song)) {
        favIcon.classList.add(LIKED_CLASS);
        favIcon.src = LIKED_IMG;
      }

      favIcon.addEventListener("mouseover", () => {
        if (favIcon.classList.contains(LIKED_CLASS)) {
          favIcon.src = LIKED;
          favIcon.style.transform = "scale(1.2)";
        } else {
          favIcon.src = LIKE_HOVERD;
        }
      });

      favIcon.addEventListener("mouseout", () => {
        if (favIcon.classList.contains(LIKED_CLASS)) {
          favIcon.src = LIKED;
          favIcon.style.transform = "scale(1)";
        } else {
          favIcon.src = LIKE;
        }
      });

      favIcon.addEventListener("click", () => {
        favIcon.classList.toggle(LIKED_CLASS);
        favIcon.src = LIKED;
        favIcon.style.transform = "scale(1)";

        if (!playList.favSongs.includes(song)) {
          playList.favSongs = [...playList.favSongs, song];
        } else {
          playList.favSongs = playList.favSongs.filter(function (item) {
            return item !== song;
          });
        }
      });

      songWrapper.addEventListener("click", (e) => {
        if (!e.path[0].classList.contains(FAV_ICON)) {
          const enabledBtn = [...document.getElementsByClassName(SONG_WRAPPER_SELECTED)];

          const authorNameSelected = [...document.getElementsByClassName(AUTHOR_NAME_SELECTED)];

          if (enabledBtn.length != 0) {
            enabledBtn[0].classList.remove(SONG_WRAPPER_SELECTED);
            authorNameSelected[0].classList.remove(AUTHOR_NAME_SELECTED);
          }

          songWrapper.classList.add(SONG_WRAPPER_SELECTED);
          artistName.classList.add(AUTHOR_NAME_SELECTED);
        }
      });

      doubleClickHandler(songWrapper, song.id);

      console.log(clone);
    }
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
  const imgSrc = playList.allSongs[currentMusicIndex].cover;
  const elemTitle = playList.allSongs[currentMusicIndex].name;
  const elemArtist = playList.allSongs[currentMusicIndex].artist;
  bgCover.style.background = `url(${imgSrc}) center no-repeat`;
  bgCover.style.backgroundSize = "cover";

  musicCover.src = imgSrc;
  musicArtist.innerText = elemArtist;
  musicTitle.innerText = elemTitle;
  const songWrapper = document.querySelectorAll(".song-wrapper");

  lyricMusicCover.src = imgSrc;
  lyricMusicName.innerText = elemTitle;
  lyricMusicArtist.innerText = elemArtist;

  lyricText.innerText = playList.allSongs[currentMusicIndex].lyrics;

  const currentlyPlaying = document.querySelector(".is-playing");
  if (currentlyPlaying != null) {
    currentlyPlaying.classList.remove("is-playing");
  }
  songWrapper[currentMusicIndex].classList.add("is-playing");
};

const optionFiller = () => {
  const allOptions = document.querySelectorAll(".options");

  allOptions.forEach((option, index) => {
    const ul = document.createElement("ul");
    ul.className = "option-list";

    const p = document.createElement("p");
    p.innerText = "افزودن به پلی‌لیست";

    deleteChildrenNodes(option);

    for (let list in newPlayList) {
      const li = document.createElement("li");
      li.innerText = list;
      ul.appendChild(li);
      li.addEventListener("click", () => {
        addToPlayList(li.innerText, option.getAttribute("data-id"));
      });
    }

    option.appendChild(p);
    option.appendChild(ul);
  });
};

const deleteChildrenNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const addToPlayList = (playListName, id) => {
  if (!newPlayList[playListName].includes(playList.allSongs[id - 1])) {
    newPlayList[playListName] = [...newPlayList[playListName], playList.allSongs[id - 1]];
  } else {
    deleteFromPlaylist(playListName, id);
  }
};

const deleteFromPlaylist = (playListName, id) => {
  newPlayList[playListName] = newPlayList[playListName].filter(function (item) {
    return item !== playList.allSongs[id - 1];
  });
};
