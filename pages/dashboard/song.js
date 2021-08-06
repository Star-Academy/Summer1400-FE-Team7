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
const ALL_PLAYlISTS = "پلی لیست ها";
const SEARCH_SONGS = "جست و جو";
const mobileMusicName = document.querySelectorAll(".mobile-music-name");
const mobileArtistName = document.querySelectorAll(".mobile-artist-name");
const mobilePreviewCover = document.querySelector(".mobile-preview-song-cover");
const mobileFavBtn = document.querySelector(".mobile-preview-like");

let currentMusicIndex = 0;
let playList = { allSongs: [], favSongsIndex: [],favSongsItems:[], searchSongs: [] };
let newPlayList = {};
let currentPlaylist = playList.allSongs;

newPlayList[ALL_PLAYlISTS] = [];

let pageIndex = 1;

let currentPlaylistID = 0;
let favPlaylistID = 0;
let currentHeader = ALL_SONGS;

const userToken = localStorage.getItem("token");

const musicGrapper = async () => {
  let response = await fetchInterceptor(
    SONG_PAGE_URI,
    METHOD_POST,
    JSON.stringify({
      size: 50,
      current: pageIndex,
      sorter: "name",
      desc: false,
    })
  );

  let data = await response.json();

  playList.allSongs = data.songs;
  // audio.src = playList.allSongs[currentMusicIndex].file;
  songListFiller(playList.allSongs, ALL_SONGS, true);
  placeholderOmmiter();
  optionFiller();
};

const songListFiller = (list, header, remove) => {
  songListHeader.innerText = header;
  currentHeader = header;
  currentPlaylist=list;

  if (remove) {
    document.querySelectorAll(".song-wrapper").forEach((i) => {
      i.remove();
    });

    document.querySelectorAll(".playlist-wrapper").forEach((i) => {
      i.remove();
    });
  }

  const template = document.querySelector("#song-wrapper-template");
  if ("content" in document.createElement("template")) {
    list.forEach((song, index) => {
      const clone = template.content.cloneNode(true);
      const options = clone.querySelector(".options");
      const songCoverImage = clone.querySelector(".song-cover-img");
      const songName = clone.querySelector("#song-name");
      const artistName = clone.querySelector("#artist-name");
      const duration = clone.querySelector("#duration");
      const favIcon = clone.querySelector(".fav-icon");
      const songWrapper = clone.querySelector(".song-wrapper");
      songWrapper.setAttribute("song-id", song.id);
      songWrapper.setAttribute("song-index", index);
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
      if (playList.favSongsIndex.includes(song.id)) {
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
        if (!playList.favSongsIndex.includes(song.id)) {
          playList.favSongsIndex = [...playList.favSongsIndex, song.id];
          addToPlayListServer(favPlaylistID, song.id);
        } else {
          playList.favSongsIndex = playList.favSongsIndex.filter(function (item) {
            return item !== song.id;
          });

          removeFromPlayListServer(song.id, favPlaylistID);
        }
      });

      songWrapper.addEventListener("click", (e) => {
        if (!e.path[0].classList.contains(FAV_ICON)) {
          const enabledBtn = [
            ...document.getElementsByClassName(SONG_WRAPPER_SELECTED),
          ];
          const authorNameSelected = [
            ...document.getElementsByClassName(AUTHOR_NAME_SELECTED),
          ];
          if (enabledBtn.length != 0) {
            enabledBtn[0].classList.remove(SONG_WRAPPER_SELECTED);
            authorNameSelected[0].classList.remove(AUTHOR_NAME_SELECTED);
          }
          songWrapper.classList.add(SONG_WRAPPER_SELECTED);
          artistName.classList.add(AUTHOR_NAME_SELECTED);
        }
      });
      doubleClickHandler(songWrapper, song.id);
    });
  }
};

mobileFavBtn.addEventListener("click", () => {
  const favIcon = mobileFavBtn.children[0];
  const currentMusicFavIconInMainMenu = document.querySelector(
    `[song-id = "${currentMusicIndex + 1}"]`
  ).children[2].children[1];
  favIcon.classList.toggle(LIKED_CLASS);
  currentMusicFavIconInMainMenu.classList.toggle(LIKED_CLASS);
  const song = playList.allSongs[currentMusicIndex];

  if (favIcon.classList.contains(LIKED_CLASS)) {
    favIcon.src = LIKED;
    favIcon.style.transform = "scale(1)";
    currentMusicFavIconInMainMenu.src = LIKED;
  } else {
    favIcon.src = LIKE;
    currentMusicFavIconInMainMenu.src = LIKE;
  }

  if (!playList.favSongsIndex.includes(song)) {
    playList.favSongsIndex = [...playList.favSongsIndex, song];
  } else {
    playList.favSongsIndex = playList.favSongsIndex.filter(function (item) {
      return item !== song;
    });
  }
});

const mobilePreviewStartHandler = () => {
  const favIcon = mobileFavBtn.children[0];
  const song = playList.allSongs[currentMusicIndex];

  if (playList.favSongsIndex.includes(song)) {
    favIcon.classList.add(LIKED_CLASS);
    favIcon.src = LIKED_IMG;
  } else {
    favIcon.classList.remove(LIKED_CLASS);
    favIcon.src = LIKE;
  }
};

const convertHMS = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  if (hours > 0) return hours + ":" + minutes + ":" + seconds;
  // Return is HH : MM : SS
  else return minutes + ":" + seconds; // Return is  MM : SS
};

const musicChangeHandler = () => {
  
  musicCover.src="../../assets/images/default-song-cover.svg"
  const imgSrc = currentPlaylist[currentMusicIndex].cover;
  const elemTitle = currentPlaylist[currentMusicIndex].name;
  const elemArtist = currentPlaylist[currentMusicIndex].artist;
  const elemLyric = currentPlaylist[currentMusicIndex].lyrics;

  bgCover.style.background = `url(${imgSrc}) center no-repeat`;
  bgCover.style.backgroundSize = "cover";
  musicCover.src = imgSrc;
  musicArtist.innerText = elemArtist;
  musicTitle.innerText = elemTitle;

  const songWrapper = document.querySelectorAll(".song-wrapper");

  lyricMusicCover.src = imgSrc;
  lyricMusicName.innerText = elemTitle;
  lyricMusicArtist.innerText = elemArtist;
  lyricText.innerText = elemLyric;

  const currentlyPlaying = document.querySelector(".is-playing");
  if (currentlyPlaying != null) {
    currentlyPlaying.classList.remove("is-playing");
  }
  songWrapper[currentMusicIndex].classList.add("is-playing");

  mobileMusicName[0].innerText = elemTitle;
  mobileArtistName[0].innerText = elemArtist;
  mobileMusicName[1].innerText = elemTitle;
  mobileArtistName[1].innerText = elemArtist;

  mobilePreviewCover.src = imgSrc;

  mobilePreviewStartHandler();

  movingTextAnimation(mobileInfo[0], (window.innerWidth / 100) * 40);
  movingTextAnimation(mobileInfo[1], (window.innerWidth / 100) * 40);
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
      if (list != ALL_PLAYlISTS && list != FAV_SONGS) {
        const li = document.createElement("li");
        li.innerText = list;
        ul.appendChild(li);
        li.addEventListener("click", () => {
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          addToPlayList(li.innerText, option.getAttribute("data-id"));
        });
      }
      option.appendChild(p);
      option.appendChild(ul);
    }
  });
};

const removeFromPlaylist = (playlistName) => {
  const allOptions = document.querySelectorAll(".options");

  allOptions.forEach((option, index) => {
    option.classList.add("remove-options");
    const dltBtn = document.createElement("button");
    dltBtn.innerText = "حذف کردن از پلی لیست";
    dltBtn.className = "dlt-btn-playlist";

    const removeImg = document.createElement("img");
    removeImg.className = "remove-img";
    removeImg.src = "../../assets/images/trash.svg";

    deleteChildrenNodes(option);
    option.appendChild(dltBtn);
    option.appendChild(removeImg);
    const songId = option.getAttribute("data-id");

    dltBtn.addEventListener("click", () => {
      // deleteFromPlaylist(playlistName, songId);
      removeFromPlayListServer(songId, currentPlaylistID);
      document.querySelector(`[song-id = "${songId}"]`).remove();
      // songListFiller(newPlayList[playlistName], playlistName, true);
    });
  });
};

const deleteChildrenNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const addToPlayList = (playListName, id) => {
  // let newID = 0;

  // playList.allSongs.forEach((song, index) => {
  //   if (song.id == id) {
  //     newID = index;
  //     return;
  //   }
  // });

  addToPlayListServer(newPlayList[playListName].id, id);

  // newPlayList[playListName].songs = [...newPlayList[playListName].songs, playList.allSongs[newID]];

  // if (!newPlayList[playListName].includes(playList.allSongs[newID])) {
  //   newPlayList[playListName] = [...newPlayList[playListName], playList.allSongs[newID]];
  // } else {
  //   deleteFromPlaylist(playListName, id);
  // }
  // if (!newPlayList[playListName].includes(playList.allSongs[newID])) {
  //   newPlayList[playListName] = [...newPlayList[playListName], playList.allSongs[newID]];
  // } else {
  //   deleteFromPlaylist(playListName, id);
  // }
};

const addToPlayListServer = (playlistId, songId) => {
  const body = JSON.stringify({
    token: userToken,
    playlistId,
    songId,
  });

  fetchInterceptor(ADD_SONG_PLAYLIST_URI, METHOD_POST, body);
};

const removeFromPlayListServer = async (songId, playlistId) => {
  const body = JSON.stringify({
    token: userToken,
    playlistId: playlistId,
    songId,
  });

  if (currentHeader != ALL_SONGS) {
    document.querySelector(`[song-id = "${songId}"]`).remove();
  }

  fetchInterceptor(REMOVE_SONG_PLAYLIST_URI, METHOD_POST, body);
};

const deleteFromPlaylist = (playListName, id) => {
  newPlayList[playListName] = newPlayList[playListName].filter(function (item) {
    return item !== playList.allSongs[id - 1];
  });
};

const allPlaylistFiller = (list, header) => {
  songListHeader.innerText = header;

  document.querySelectorAll(".song-wrapper").forEach((i) => {
    i.remove();
  });

  document.querySelectorAll(".playlist-wrapper").forEach((i) => {
    i.remove();
  });

  if ("content" in document.createElement("template")) {
    list.forEach((playlist) => {
      const template = document.querySelector("#all-playlist-list");
      const clone = template.content.cloneNode(true);
      const playListWrapper = clone.querySelector(".playlist-wrapper");
      const playListCover = clone.querySelector(".platlist-cover-img");
      const playListName = clone.querySelector("#playlist-name");
      const deleteBtn = clone.querySelector(".playlist-options");

      playListName.innerText = playlist.name;
      if (playlist.songs.length != 0) {
        playListCover.src = playlist.songs[0].rest.cover;
      } else {
        playListCover.src = DEFUALT_SONG_COVER;
      }

      playListWrapper.setAttribute("alldata-playlist-id", playlist.id);

      playListWrapper.addEventListener("click", () => {
        if (document.querySelector(".song-wrapper-selected") != undefined) {
          document
            .querySelector(".song-wrapper-selected")
            .classList.remove("song-wrapper-selected");
        }

        playListWrapper.classList.add("song-wrapper-selected");
        console.log(newPlayList[playlist.name]);
        let array = [];
        for (item in newPlayList[playlist.name].songs) {
          array = [...array, newPlayList[playlist.name].songs[item].rest];
        }

        songListFiller(array, playlist.name, true);
        allowOnlyGridModeLayout();
      });

      deleteBtn.addEventListener("click", async () => {
        const body = {
          token: userToken,
          id: playlist.id,
        };

        await fetchInterceptor(
          REMOVE_PLAYLIST_URI,
          METHOD_POST,
          JSON.stringify(body)
        );
        playListWrapper.remove();

        document
          .querySelector(`[data-playlist-id = "${playlist.id}"]`)
          .remove();

        delete newPlayList[playlist.name];
      });

      songList.append(clone);
    });
  }
};

songList.addEventListener("scroll", () => {
  if (
    songList.scrollTop >= songList.scrollHeight - songList.offsetHeight &&
    currentHeader == ALL_SONGS
  ) {
    songList.scrollTop = songList.scrollHeight;
    fillListOnScroll();
  }
});

const fillListOnScroll = async () => {
  pageIndex++;

  let response = await fetchInterceptor(
    SONG_PAGE_URI,
    METHOD_POST,
    JSON.stringify({
      size: 50,
      current: pageIndex,
      sorter: "name",
      desc: false,
    })
  );

  let data = await response.json();

  data.songs.forEach((song) => {
    playList.allSongs = [...playList.allSongs, song];
  });

  songListFiller(data.songs, ALL_SONGS, false);
  placeholderOmmiter();
  optionFiller();
};

const playListInitializer = async () => {
  document.querySelectorAll(".playlist-container").forEach((l) => {
    if (!l.classList.contains("defualt-menu")) {
      l.remove();
    }
  });

  const body = JSON.stringify({ token: userToken });
  const response = await fetchInterceptor(
    RETRIEVE_PLAYLIST_URI,
    METHOD_POST,
    body
  );

  const listArray = await response.json();

  listArray.forEach((list) => {
    if (list.name == FAV_SONGS) {
      playList.favSongsItems=list;
      favPlaylistID = list.id;
      newPlayList[list.name] = list;
      for (index in newPlayList[list.name].songs) {
        playList.favSongsIndex = [
          ...playList.favSongsIndex,
          newPlayList[list.name].songs[index].rest.id,
        ];
      }
      return;
    }

    newPlayList[list.name] = list;

    addNewPlaylist(list.name);
  });

  optionFiller();
};

const createPlayListServer = async (name) => {
  let alreadyExists = false;
  const body = {
    token: userToken,
    name,
  };

  for (listName in newPlayList) {
    if (name == listName) {
      alreadyExists = true;
      return;
    }
  }

  if (!alreadyExists) {
    let response = await fetchInterceptor(
      CREATE_PLAYLIST_URI,
      METHOD_POST,
      JSON.stringify(body)
    );
  }
};

const removePlayListServer = async (id) => {
  const body = {
    token: userToken,
    id: id,
  };

  await fetchInterceptor(
    REMOVE_PLAYLIST_URI,
    METHOD_POST,
    JSON.stringify(body)
  );
  playListInitializer();
};

playListInitializer();
musicGrapper();
