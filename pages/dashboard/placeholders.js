const placeholdersWrapper = document.querySelector(".placeholders-wrapper");

let placeholderRotatorID = 0;

let isLoading = false;

const placeholderCreator = (parent) => {
  document.querySelectorAll(".song-wrapper").forEach((i) => {
    i.remove();
  });

  const count = 13;

  for (let i = 0; i < count; i++) {
    const newDiv = document.createElement("div");
    newDiv.className = "place-holders";

    newDiv.innerHTML = `
        <div class="img-placeholder"></div>
        <div class="right-info-placeholder">
          <div class="title-placeholder" style="width: ${Math.random() * 17 + 3}rem"></div>
          <div class="artist-placeholder" style="width: ${Math.random() * 12 + 3}rem"></div>
        </div>
        <div class="left-info-placeholder">
          <div class="duration-placeholder"></div>
          <div class="like-btn-placeholder"></div>
        </div>
    `;

    parent.appendChild(newDiv);
  }
};

const placeholderOmmiter = () => {
  const placeholders = document.querySelectorAll(".place-holders");
  placeholders.forEach((placeholder) => {
    placeholder.classList.add("display-none");
  });
  clearInterval(placeholderRotatorID);
};

const placeHolderRotator = () => {
  let currentValue = -45;
  document.documentElement.style.setProperty("--placeholder-rotation", "-45deg");

  placeholderRotatorID = setInterval(() => {
    currentValue += 5;
    document.documentElement.style.setProperty("--placeholder-rotation", currentValue + "deg");
  }, 40);
};

placeHolderRotator();
placeholderCreator(placeholdersWrapper);
