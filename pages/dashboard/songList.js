const songListFiller = (list, header, remove) => {
  songListHeader.innerText = header;
  currentHeader = header;
  currentPlaylist = list;

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
      songListLayout.appendChild(clone);
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
          addToPlayListServer(favPlaylistID, song.id, true);
        } else {
          playList.favSongsIndex = playList.favSongsIndex.filter(function (item) {
            return item !== song.id;
          });

          removeFromPlayListServer(song.id, favPlaylistID);
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
    });
  }
};
