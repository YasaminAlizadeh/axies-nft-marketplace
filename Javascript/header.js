// --------- Change Header Background on Windoe Scroll

const headerWrapper = [
  ...document.getElementsByClassName("header__wrapper"),
][0];

window.addEventListener("scroll", () => {
  headerWrapper.classList.add("header__wrapper--scrolled");

  let scrollTop = window.pageYOffset;

  if (scrollTop === 0) {
    headerWrapper.classList.remove("header__wrapper--scrolled");
  }
});

// --------- Open/Close Menu

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const menuBackBtn = document.getElementById("menu-back-btn");
const menuItems = [...document.getElementsByClassName("menu__item")];

menuBtn.addEventListener("click", () => {
  menu.classList.add("header__menu--open");
  menu.style.transition = "all 0.3s ease-in-out";
});

menuBackBtn.addEventListener("click", () => {
  menu.classList.remove("header__menu--open");
});

window.addEventListener("resize", () => {
  menu.style.transition = "none";
});

// --------- Close Menu if Clicked Outside of it

window.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.remove("header__menu--open");
  }
});

// --------- Close Menu and submenus if window resized

window.addEventListener("resize", () => {
  const expandedMenuItems = [
    ...document.getElementsByClassName("menu__item--expanded"),
  ];

  menu.classList.remove("header__menu--open");
  expandedMenuItems.forEach((item) => {
    item.classList.remove("menu__item--expanded");
  });
});

// --------- Expand/Collapse submenus

menuItems.forEach((item) =>
  item.addEventListener("click", (e) => {
    const mediaQuery = window.matchMedia("(max-width: 1312px)");
    if (mediaQuery.matches) {
      e.preventDefault();
      e.stopPropagation();

      // If the clicked element is a submenu item, first close other submenus
      if ([...item.classList].includes("submenu__item")) {
        menuItems
          .filter((element) => [...element.classList].includes("submenu__item"))
          .filter((element) => element !== item)
          .forEach((element) =>
            element.classList.remove("menu__item--expanded")
          );
      }
      // Else if the clicked item is a menu item, first close other menu items
      else {
        menuItems
          .filter((element) => element !== item)
          .forEach((element) =>
            element.classList.remove("menu__item--expanded")
          );
      }

      // Then open the clicked item
      item.classList.toggle("menu__item--expanded");
    }
  })
);

// --------- Change Theme to Dark/Light on Button Click

const themeBtns = [...document.getElementsByClassName("theme__btn")];
const lightThemeBtn = document.getElementById("light-theme-btn");
const darkThemeBtn = document.getElementById("dark-theme-btn");

lightThemeBtn.addEventListener("click", () => {
  themeBtns.forEach((btn) => btn.classList.remove("theme__btn--active"));
  lightThemeBtn.classList.add("theme__btn--active");
  document.querySelector("body").classList.remove("theme--dark");
  document.getElementById("background").style.transform = "scaleY(1)";
  document.getElementById("background").style.transformOrigin = "top";
});

darkThemeBtn.addEventListener("click", () => {
  themeBtns.forEach((btn) => btn.classList.remove("theme__btn--active"));
  darkThemeBtn.classList.add("theme__btn--active");
  document.querySelector("body").classList.add("theme--dark");
  document.getElementById("background").style.transform = "scaleY(0)";
  document.getElementById("background").style.transformOrigin = "bottom";
});

// --------- Expand search input on click

const search = document.getElementById("header-search");

window.addEventListener("click", (e) => {
  const mediaQuery = window.matchMedia("(min-width: 1312px)");
  if (mediaQuery.matches) {
    if (search.contains(e.target)) {
      search.classList.add("header__search--expanded");
    } else {
      search.classList.remove("header__search--expanded");
      document.getElementById("search").value = "";
    }
  }
});
