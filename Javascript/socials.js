const socailsContainer = document.querySelector("#socials");

socailsContainer.addEventListener("click", () => {
  socailsContainer.classList.toggle("socials__menu--open");
  socailsContainer.classList.toggle("socials__menu--close");
});

window.addEventListener("click", (e) => {
  if (
    [...socailsContainer.classList].includes("socials__menu--open") &&
    !socailsContainer.contains(e.target)
  ) {
    socailsContainer.classList.remove("socials__menu--open");
    socailsContainer.classList.add("socials__menu--close");
  }
});
