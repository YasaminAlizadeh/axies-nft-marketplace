const themeBtns = [...document.querySelectorAll(".theme__btn")];
const lightThemeBtn = document.querySelector("#light-theme-btn");
const darkThemeBtn = document.querySelector("#dark-theme-btn");

const background = document.querySelector("#background");

// --------- On Page Load, Get the Selected Theme from LocalStorage

window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme") || "dark";

  if (theme === "light") {
    lightThemeBtn && lightThemeBtn.classList.add("theme__btn--active");
  } else if (theme === "dark") {
    darkThemeBtn && darkThemeBtn.classList.add("theme__btn--active");
  }

  changeTheme(theme);
});

// --------- Change Theme by Adding/Removing Classes

const changeTheme = (theme) => {
  switch (theme) {
    case "light":
      localStorage.setItem("theme", "light");
      document.body.classList.remove("theme--dark");
      document.body.classList.add("theme--light");

      if (background) {
        background.style.transform = "scaleY(1)";
        background.style.transformOrigin = "top";
      }
      break;

    case "dark":
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("theme--light");
      document.body.classList.add("theme--dark");

      if (background) {
        background.style.transform = "scaleY(0)";
        background.style.transformOrigin = "bottom";
      }
      break;

    default:
      break;
  }
};

// --------- Change Theme to Dark/Light on Button Click

lightThemeBtn &&
  lightThemeBtn.addEventListener("click", () => {
    themeBtns.forEach((btn) => btn.classList.remove("theme__btn--active"));
    lightThemeBtn.classList.add("theme__btn--active");
    changeTheme("light");
  });

darkThemeBtn &&
  darkThemeBtn.addEventListener("click", () => {
    themeBtns.forEach((btn) => btn.classList.remove("theme__btn--active"));
    darkThemeBtn.classList.add("theme__btn--active");
    changeTheme("dark");
  });
