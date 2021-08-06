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

  if (response.ok) {
    playList.allSongs = data.songs;
    songListFiller(playList.allSongs, ALL_SONGS, true);
    placeholderOmmiter();
    addToPlaylistMenuItemGenetor();
  }else{
    showNotification("اشکال در بارگیری آهنگ‌ها")
  }

};




/**
 * update all song info for current playing song, like song cover and name of music and artist in control section,
 * and update lyric page
 */
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

  mobileFullScreenViewStartHandler();

  movingTextAnimation(mobileInfo[0], (window.innerWidth / 100) * 40);
  movingTextAnimation(mobileInfo[1], (window.innerWidth / 100) * 40);
};

/*
* Handel load more music on scroll to end of current music list
*/
songListLayout.addEventListener("scroll", () => {
  if (
    songListLayout.scrollTop >= songListLayout.scrollHeight - songListLayout.offsetHeight &&
    currentHeader == ALL_SONGS
  ) {
    songListLayout.scrollTop = songListLayout.scrollHeight;
    loadMoreSongOnScroll();
  }
});
const loadMoreSongOnScroll = async () => {
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
  addToPlaylistMenuItemGenetor();
};




playListInitializer();
musicGrapper();
