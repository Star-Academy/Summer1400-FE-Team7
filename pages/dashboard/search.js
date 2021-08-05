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

const search = async () => {
  if (!isLoading) {
    placeholderCreator(placeholdersWrapper);
    placeHolderRotator();
    isLoading = true;
  }

  if (searchBox.value != "") {
    const body = {
      phrase: searchBox.value,
      count: 20,
      sorter: "name",
      desc: true,
    };

    let respones = await fetchInterceptor(SEARCH_URI, METHOD_POST, JSON.stringify(body));
    const { songs } = await respones.json();
    console.log(songs);

    songListFiller(songs, "جست و جو", true);
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
