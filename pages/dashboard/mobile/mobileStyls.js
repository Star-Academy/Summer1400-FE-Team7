
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
  