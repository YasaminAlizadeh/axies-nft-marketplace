const socailsContainer = document.getElementById("socials");

socailsContainer.addEventListener("click", () => {
  socailsContainer.classList.toggle("socials__menu--open");
});

window.addEventListener("click", (e) => {
  if (
    [...socailsContainer.classList].includes("socials__menu--open") &&
    !socailsContainer.contains(e.target)
  ) {
    socailsContainer.classList.remove("socials__menu--open");
  }
});
