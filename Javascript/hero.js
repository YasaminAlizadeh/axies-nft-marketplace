// --------- Animate the H1 character

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

// --------- Animate Blobs

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
