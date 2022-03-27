// --------- On Page Load, Get the Selected Theme from LocalStorage

window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  changeTheme(theme);
});

// --------- Change Theme by Adding/Removing Classes

const changeTheme = (theme) => {
  switch (theme) {
    case "light":
      localStorage.setItem("theme", "light");
      document.body.classList.remove("theme--dark");

      document.body.classList.remove("theme--dark");
      document.getElementById("background").style.transform = "scaleY(1)";
      document.getElementById("background").style.transformOrigin = "top";
      break;

    case "dark":
      localStorage.setItem("theme", "dark");

      document.body.classList.add("theme--dark");
      document.getElementById("background").style.transform = "scaleY(0)";
      document.getElementById("background").style.transformOrigin = "bottom";
      break;

    default:
      break;
  }
};

// --------- Change Theme to Dark/Light on Button Click

const themeBtns = [...document.getElementsByClassName("theme__btn")];
const lightThemeBtn = document.getElementById("light-theme-btn");
const darkThemeBtn = document.getElementById("dark-theme-btn");

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
