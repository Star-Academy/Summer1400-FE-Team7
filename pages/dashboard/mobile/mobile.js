const mobileFavBtn = document.querySelector(".mobile-preview-like");

allSongsMobileTabNavigation.focus();
/*
// Handle long song title and artist name with moving text animation
*/
const movingTextAnimation = (parentDiv, currentWidht) => {
    let totalWidth = 0;
    const children = [...parentDiv.children];
  
    children.forEach((elem) => {
      totalWidth += elem.getBoundingClientRect().width;
    });
  
    let animationWidth = currentWidht - totalWidth;
    if (animationWidth > 0) {
      return;
    }
    animationWidth = Math.abs(animationWidth);
  
    document.documentElement.style.setProperty(
      "--animation-width",
      animationWidth + "px"
    );
  
    mobileInfo[0].classList.remove(MOBILE_INFO_ANIMATION);
    mobileInfo[1].classList.remove(MOBILE_INFO_ANIMATION);
    mobileInfo[0].classList.add(MOBILE_INFO_ANIMATION);
    mobileInfo[1].classList.add(MOBILE_INFO_ANIMATION);
    mobileInfo[0].style.justifyContent = "flex-start";
    mobileInfo[1].style.justifyContent = "flex-start";
  };
  
  window.addEventListener("resize", () => {
    if (window.innerWidth < 750) {
      disableCompactListLayoutMode();
      movingTextAnimation(mobileInfo[0], (window.innerWidth / 100) * 40);
      movingTextAnimation(mobileInfo[1], (window.innerWidth / 100) * 40);
    } else {
      darkGlassMobilePreview.classList.add("display-none");
      mobileSongPreview.classList.add("display-none");
    }
  });
  
  // call movingTextAnimation in mobile for information in songList mode and fullScreen mode
  
  movingTextAnimation(mobileInfo[0], (window.innerWidth / 100) * 40);
  movingTextAnimation(mobileInfo[1], (window.innerWidth / 100) * 40);
  


const mobileFullScreenViewStartHandler = () => {
  const favIcon = mobileFavBtn.children[0];
  const song = currentPlaylist[currentMusicIndex];

  if (playList.favSongsIndex.includes(song.id)) {
    favIcon.classList.add(LIKED_CLASS);
    favIcon.src = LIKED_IMG;
  } else {
    favIcon.classList.remove(LIKED_CLASS);
    favIcon.src = LIKE;
  }
};
 //TODO not working...
mobileFavBtn.addEventListener("click", () => {
  const song = playList.allSongs[currentMusicIndex];
  const favIcon = mobileFavBtn.children[0];
  const currentMusicFavIconInMainMenu = document.querySelector(
    `[song-id = "${song.id}"]`
  ).children[2].children[1];

  favIcon.classList.toggle(LIKED_CLASS);
  currentMusicFavIconInMainMenu.classList.toggle(LIKED_CLASS);

  if (favIcon.classList.contains(LIKED_CLASS)) {
    favIcon.src = LIKED;
    favIcon.style.transform = "scale(1)";
    currentMusicFavIconInMainMenu.src = LIKED;
  } else {
    favIcon.src = LIKE;
    currentMusicFavIconInMainMenu.src = LIKE;
  }

  if (!playList.favSongsIndex.includes(song)) {
    playList.favSongsIndex = [...playList.favSongsIndex, song.id];
    addToPlayListServer(favPlaylistID, song.id);
  } else {
    removeFromPlayListServer(song.id, favPlaylistID);
    playList.favSongsIndex = playList.favSongsIndex.filter(function (item) {
      return item !== song.id;
    });
  }
});