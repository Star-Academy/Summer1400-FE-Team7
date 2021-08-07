const notificationType={
    ERROR:"error",
    SUCCESS:"success",
}

const notificationMessages={
  MSG_ERROR_LOAD_SONG:"مشکلی در بارگیری آهنگ وجود دارد",
  MSG_ADDED_TO_PLAYLIST:"به پلی لیست اضافه شد",
  MSG_SONG_ALREADY_EXISTS_IN_PLAYLIST:"آهنگ مورد نظر از قبل اضافه شده است",
  MSG_NEW_PLALIST_CREATED:"پلی لیست جدید ساخته شد",
  MSG_PLAYLIST_NAME_ALREADY_EXISTS:"پلی لیست با این نام وجود دارد",
  MSG_ERROR_LOADING_SONGS:"اشکال در بارگیری آهنگ‌ها",
}


const convertHMS = (value) => {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  if (hours > 0) return hours + ":" + minutes + ":" + seconds;
  // Return is HH : MM : SS
  else return minutes + ":" + seconds; // Return is  MM : SS
};

const showNotification = (message,type) => {
  const alert = document.querySelector(".alert");
  const closeBtn = document.querySelector(".close-btn");
  const alertMeesag = alert.children[0];
  alertMeesag.innerText = message;
  
  switch (type) {
      case notificationType.SUCCESS:
        alert.classList.add("success")
          break;
  
      default:
        alert.classList.remove("success")
          break;
  }




  alert.classList.add("show");
  alert.classList.remove("hide");
  alert.classList.add("showAlert");
  setTimeout(() => {
    alert.classList.remove("show");
    alert.classList.add("hide");
  }, 3000);
  closeBtn.addEventListener("click", () => {
    alert.classList.remove("show");
    alert.classList.add("hide");
  });
};
