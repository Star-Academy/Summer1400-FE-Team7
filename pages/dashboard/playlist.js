//TODO: This darkGlass2
const deleteChildrenNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  
const addToPlaylistMenuItemGenetor = () => {
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
        removeFromPlayListServer(songId, currentPlaylistID);
      });
    });
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
  
//   const deleteFromPlaylist = (playListName, id) => {
//     newPlayList[playListName] = newPlayList[playListName].filter(function (item) {
//       return item !== playList.allSongs[id - 1];
//     });
//   };

//TODO make it one function
const addToPlayList = (playListName, id) => {

    addToPlayListServer(newPlayList[playListName].id, id);
  
  
  };
  
  const addToPlayListServer =async (playlistId, songId) => {
    const body = JSON.stringify({
      token: userToken,
      playlistId,
      songId,
    });
  
    const response = await fetchInterceptor(ADD_SONG_PLAYLIST_URI, METHOD_POST, body);
    const  responseBody=  response.json();
    if (response.ok) {
        showNotification("به پلی لیست اضافه شد",notificationType.SUCCESS)

    }else{

        showNotification(responseBody.message)
    }
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
  
        songListLayout.append(clone);
      });
    }
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
  
    addToPlaylistMenuItemGenetor();
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