// --------- Change Header Background on Window Scroll

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
const search = document.getElementById("header-search");

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
  if (
    -1 * e.offsetX > -1 * menu.offsetWidth &&
    !menuBtn.contains(e.target) &&
    !search.contains(e.target)
  ) {
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

// --------- Expand search input on click

const searchBtn = document.getElementById("search-btn");

window.addEventListener("click", (e) => {
  const mediaQuery = window.matchMedia("(min-width: 1312px)");
  if (mediaQuery.matches) {
    if (searchBtn.contains(e.target)) {
      search.classList.toggle("header__search--expanded");
    }
    if (!search.contains(e.target)) {
      search.classList.remove("header__search--expanded");
      document.getElementById("search").value = "";
    }
  }
});
