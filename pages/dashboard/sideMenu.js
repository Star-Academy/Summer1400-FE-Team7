const sideMenuBtns = document.querySelectorAll(".btn-wrapper");
const MENU_SELECTED = "menu-selected";
const PLAYLIST_CONTAINER = "playlist-container";
const playlistContainer = document.querySelector(".playlist-container");

sideMenuBtns.forEach((menu) => {
  if (menu.classList.contains("exception")) {
    menu.addEventListener("click", () => {
      if (!menu.classList.contains(MENU_SELECTED)) {
        let sectionHeader = menu.children[1].innerText;
        // songListFiller(newPlayList[sectionHeader], sectionHeader);
        allPlaylistFiller(newPlayList[sectionHeader], sectionHeader, true);
        // optionFiller();
      }
      playListSectionLayoutFixer();
      document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
      menu.classList.add(MENU_SELECTED);
    });
  } else {
    menu.addEventListener("click", () => {
      playListSectionLayoutReverser();
      if (!menu.classList.contains(MENU_SELECTED)) {
        let sectionHeader = menu.children[1].innerText;
        let sectionHeader2 = menu.children[1].innerText;

        let array = [];

        if (sectionHeader == ALL_SONGS) {
          sectionHeader = "allSongs";
          array = playList[sectionHeader];
        } else if (sectionHeader == FAV_SONGS) {
          sectionHeader = "favSongs";
        }

        console.log(playList[sectionHeader]);

        songListFiller(playList[sectionHeader], sectionHeader2, true);
        optionFiller();
      }

      document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
      menu.classList.add(MENU_SELECTED);
    });
  }
});

playlistContainer.addEventListener("click", () => {
  if (!playlistContainer.classList.contains(MENU_SELECTED)) {
  }
  document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
  playlistContainer.classList.add(MENU_SELECTED);
});

const addNewPlaylist = (title) => {
  const div = document.createElement("div");
  div.classList.add("playlist-container");

  const bWrapper = document.createElement("div");
  bWrapper.className = "btn-wrapper";
  bWrapper.innerHTML = `
    <img src="../../assets/images/new-playlist.svg" alt="new play list" />
    <button>${title}</button>
  `;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = `
    <img src ="../../assets/images/controls/delete.svg" alt="delete play list">
  `;

  div.appendChild(bWrapper);
  div.appendChild(deleteBtn);

  const playListID = newPlayList[title].id;

  div.setAttribute("data-playlist-id", playListID);

  bWrapper.addEventListener("click", async () => {
    currentPlaylistID = playListID;
    if (!bWrapper.classList.contains(MENU_SELECTED)) {
      const sectionHeader = bWrapper.children[1].innerText;

      let array = await fetchInterceptor(`${GET_ONE_PLAYLIST_URI}/${currentPlaylistID}`, METHOD_GET);
      array = await array.json();
      console.log("🚀 ~ file: sideMenu.js ~ line 81 ~ bWrapper.addEventListener ~ array", array);

      // for (index in newPlayList[sectionHeader].songs) {
      //   newArray = [...newArray, newPlayList[sectionHeader].songs[index].rest];
      // }

      songListFiller(array.songs, sectionHeader, true);
      removeFromPlaylist(sectionHeader);
    }

    document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
    bWrapper.classList.add(MENU_SELECTED);
  });

  deleteBtn.addEventListener("click", () => {
    removePlayListServer(playListID);
  });
  const profileBtn = document.querySelector(".profile-wrapper");

  sideMenu.insertBefore(div, profileBtn);

  // newPlayList[ALL_PLAYlISTS] = [...newPlayList[ALL_PLAYlISTS], title];

  if (songListHeader.innerText == ALL_PLAYlISTS) {
    allPlaylistFiller(newPlayList[ALL_PLAYlISTS], ALL_PLAYlISTS);
  }
};

// const removePlaylist = (title) => {
//   delete newPlayList[title];
//   const playlistContainer2 = document.querySelectorAll(".playlist-container");

//   playlistContainer2.forEach((item) => {
//     if (item.children[0].children[1].innerText == title) {
//       item.remove();
//       return;
//     }
//   });
// };

const playListCatcher = () => {
  fetchInterceptor();
};
