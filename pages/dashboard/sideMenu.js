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
        allPlaylistFiller(newPlayList[sectionHeader], sectionHeader);
        // optionFiller();
      }

      document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
      menu.classList.add(MENU_SELECTED);
    });
  } else {
    menu.addEventListener("click", () => {
      if (!menu.classList.contains(MENU_SELECTED)) {
        let sectionHeader = menu.children[1].innerText;
        let sectionHeader2 = menu.children[1].innerText;

        if (sectionHeader == ALL_SONGS) {
          sectionHeader = "allSongs";
        } else if (sectionHeader == FAV_SONGS) {
          sectionHeader = "favSongs";
        }

        songListFiller(playList[sectionHeader], sectionHeader2);
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
  console.log("here");
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

  bWrapper.addEventListener("click", () => {
    if (!bWrapper.classList.contains(MENU_SELECTED)) {
      const sectionHeader = bWrapper.children[1].innerText;
      songListFiller(newPlayList[sectionHeader], sectionHeader);
      removeFromPlaylist(sectionHeader);
    }

    document.querySelector(`.${MENU_SELECTED}`).classList.remove(MENU_SELECTED);
    bWrapper.classList.add(MENU_SELECTED);
  });

  deleteBtn.addEventListener("click", () => {
    removePlaylist(title);
  });

  sideMenu.insertBefore(div, playlistContainer);

  newPlayList[ALL_PLAYlISTS] = [...newPlayList[ALL_PLAYlISTS], title];
  console.log(newPlayList);
};

const removePlaylist = (title) => {
  delete newPlayList[title];
  const playlistContainer2 = document.querySelectorAll(".playlist-container");

  playlistContainer2.forEach((item) => {
    if (item.children[0].children[1].innerText == title) {
      item.remove();
      return;
    }
  });
};
