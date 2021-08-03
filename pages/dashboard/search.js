const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("search", () => onPressHandler());
searchBox.addEventListener("keyup", () => onPressHandler());

const debouncer = (func, timeout = 600) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const search = () => {
  if (!isLoading) {
    placeholderCreator(placeholdersWrapper);
    placeHolderRotator();
    isLoading = true;
  }

  if (searchBox.value != "") {
    // const searchResult

    songListFiller(
      playList["همه آهنگ ها"].filter((song) => song.name.includes(searchBox.value )),
      "جست و جو"
    );
    isLoading = false;
    placeholderOmmiter();
    optionFiller();
  }

  if (searchBox.value == "") {
    musicGrapper();
    isLoading = false;
  }
};

const onPressHandler = debouncer(() => search());
