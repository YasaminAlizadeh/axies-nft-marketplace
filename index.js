const themeBtns = [...document.getElementsByClassName("theme__btn")];
const lightThemeBtn = document.getElementById("light-theme-btn");
const darkThemeBtn = document.getElementById("dark-theme-btn");

lightThemeBtn.addEventListener("click", () => {
  themeBtns.forEach((btn) => btn.classList.remove("theme__btn--active"));
  lightThemeBtn.classList.add("theme__btn--active");
  document.querySelector("body").classList.remove("theme--dark");
  document.getElementById("background").style.transform = "scaleY(1)";
});

darkThemeBtn.addEventListener("click", () => {
  themeBtns.forEach((btn) => btn.classList.remove("theme__btn--active"));
  darkThemeBtn.classList.add("theme__btn--active");
  document.querySelector("body").classList.add("theme--dark");
  document.getElementById("background").style.transform = "scaleY(0)";
});

const searchBtn = document.getElementById("header-search");
const searchContainer = [
  ...document.getElementsByClassName("search__container"),
][0];

window.addEventListener("click", (e) => {
  if (searchBtn.contains(e.target)) {
    searchBtn.style.boxShadow = "0 0 0 0.3rem var(--primary-color)";
    setTimeout(() => {
      searchContainer.style.transform = "scale(1)";
      searchContainer.style.width = "20rem";
      searchContainer.style.opacity = "1";
      searchContainer.style.visibility = "visible";
    }, 500);
  } else {
    searchContainer.style.transform = "scale(0)";
    searchContainer.style.width = "0";
    searchContainer.style.opacity = "0";
    searchContainer.style.visibility = "hidden";
    document.getElementById("search").value = "";
    setTimeout(() => {
      searchBtn.style.boxShadow = "none";
    }, 500);
  }
});

const title = document.getElementById("title");
const characterFace = [...document.getElementsByClassName("face__wrapper")][0];
const characterEyelids = [...document.getElementsByClassName("eyelid")];
const characterEyePupils = [...document.getElementsByClassName("pupil")];
const characterHands = [...document.getElementsByClassName("hand")];

title.addEventListener("mouseover", () => {
  characterFace.classList.add("face__wrapper--animated");
  characterEyelids[0].classList.add("eyelid--left--animated");
  characterEyelids[1].classList.add("eyelid--right--animated");
  characterEyePupils.forEach((pupil) => pupil.classList.add("pupil--animated"));
  characterHands.forEach((hand) => hand.classList.add("hand--animated"));
});

characterFace.addEventListener("webkitAnimationEnd", () => {
  characterFace.classList.remove("face__wrapper--animated");
});

characterEyelids[0].addEventListener("webkitAnimationEnd", () => {
  characterEyelids[0].classList.remove("eyelid--left--animated");
});

characterHands[1].addEventListener("webkitAnimationEnd", () => {
  characterEyelids[1].classList.remove("eyelid--right--animated");
});

characterEyePupils[0].addEventListener("webkitAnimationEnd", () => {
  characterEyePupils.forEach((pupil) =>
    pupil.classList.remove("pupil--animated")
  );
});

characterHands[0].addEventListener("webkitAnimationEnd", () => {
  characterHands.forEach((hand) => hand.classList.remove("hand--animated"));
});

const blobs = [...document.getElementsByClassName("hero__blob")];
const blobsCount = blobs.length;

blobs.forEach((blob, index) =>
  blob.addEventListener("webkitAnimationEnd", () => {
    blob.classList.remove("hero__blob--animated");
    blobs[index < blobsCount - 1 ? index + 1 : 0].classList.add(
      "hero__blob--animated"
    );
  })
);
