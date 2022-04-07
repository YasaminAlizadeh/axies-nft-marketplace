// ---------------- Add Sliders and their data

const sliderData = [
  "../Assets/Images/07_login/img_item1.png",
  "../Assets/Images/07_login/img_item2.png",
  "../Assets/Images/07_login/img_item3.png",
  "../Assets/Images/07_login/img_item4.png",
  "../Assets/Images/07_login/image-box-32.jpg",
  "../Assets/Images/07_login/image-box-33.jpg",
  "../Assets/Images/07_login/image-box-53.jpg",
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const addSlider = () => {
  const sliders = document.querySelector("#sliders");
  sliders.innerText = "";

  for (let i = 0; i < 3; i++) {
    const slider = document.createElement("div");
    slider.className = "slider__wrapper";
    slider.style.setProperty("--index", i);

    let data = [...sliderData, ...sliderData];
    shuffleArray(data);

    data.forEach((item) => {
      const img = document.createElement("img");
      img.className = "slider__img";
      img.src = item;
      slider.appendChild(img);
    });

    sliders.appendChild(slider);
  }
};

addSlider();

// ---------------- Disable dragging of Images

[...document.querySelectorAll(".slider__img")].forEach(
  (item) =>
    (item.ondragstart = () => {
      return false;
    })
);
