// --------- First Load

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("body--loaded");
});

// --------- Add Functionality to Scroll Up Button

const scrollBtn = document.querySelector("#scroll-up-btn");

scrollBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("scroll", () => {
  scrollBtn.classList.add("scroll__btn--active");

  let scrollTop = window.pageYOffset;

  if (scrollTop === 0) {
    scrollBtn.classList.remove("scroll__btn--active");
  }
});
