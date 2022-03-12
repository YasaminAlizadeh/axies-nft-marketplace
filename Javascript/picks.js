// --------- Add Functionality to the Sort Button in Picks Section

const sortBtn = document.getElementById("picks-sort-btn");
const sortBy = [
  "date-up",
  "date-down",
  "name-up",
  "name-down",
  "price-up",
  "price-down",
  "likes-down",
];
let currentSortByIndex = 0;

sortBtn.addEventListener("click", () => {
  let btnIcon = "";
  let btnText = "";
  const container = document.getElementById("picks-cards");
  container.innerHTML = "";

  currentSortByIndex =
    currentSortByIndex === sortBy.length - 1 ? 0 : currentSortByIndex + 1;

  switch (sortBy[currentSortByIndex]) {
    case "date-up":
      btnIcon = `<i class="fa-solid fa-arrow-down-wide-short"></i>`;
      btnText = "Date: Latest";
      picksData
        .sort((pick1, pick2) => pick1.date_added - pick2.date_added)
        .forEach((pick, index) => {
          index < picksPerPage && generateCard("pick", pick);
        });
      break;

    case "date-down":
      btnIcon = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
      btnText = "Date: Oldest";
      picksData
        .sort((pick1, pick2) => pick2.date_added - pick1.date_added)
        .forEach((pick, index) => {
          index < picksPerPage && generateCard("pick", pick);
        });
      break;

    case "name-up":
      btnIcon = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
      btnText = "Name: A-Z";
      picksData
        .sort((pick1, pick2) => {
          if (pick1.title.toLowerCase() < pick2.title.toLowerCase()) {
            return -1;
          } else if (pick1.title.toLowerCase() > pick2.title.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        })
        .forEach((pick, index) => {
          index < picksPerPage && generateCard("pick", pick);
        });
      break;

    case "name-down":
      btnIcon = `<i class="fa-solid fa-arrow-down-wide-short"></i>`;
      btnText = "Name: Z-A";
      picksData
        .sort((pick1, pick2) => {
          if (pick1.title.toLowerCase() > pick2.title.toLowerCase()) {
            return -1;
          } else if (pick1.title.toLowerCase() < pick2.title.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        })
        .forEach((pick, index) => {
          index < picksPerPage && generateCard("pick", pick);
        });
      break;

    case "price-up":
      btnIcon = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
      btnText = "Price: Low To High";
      picksData
        .sort((pick1, pick2) => {
          if (pick1.current_bid < pick2.current_bid) {
            return -1;
          } else if (pick1.current_bid > pick2.current_bid) {
            return 1;
          } else {
            return 0;
          }
        })
        .forEach((pick, index) => {
          index < picksPerPage && generateCard("pick", pick);
        });
      break;

    case "price-down":
      btnIcon = `<i class="fa-solid fa-arrow-down-wide-short"></i>`;
      btnText = "Price: High to Low";
      picksData
        .sort((pick1, pick2) => {
          if (pick1.current_bid > pick2.current_bid) {
            return -1;
          } else if (pick1.current_bid < pick2.current_bid) {
            return 1;
          } else {
            return 0;
          }
        })
        .forEach((pick, index) => {
          index < picksPerPage && generateCard("pick", pick);
        });
      break;

    case "likes-down":
      btnIcon = `<i class="fa-solid fa-arrow-down-wide-short"></i>`;
      btnText = "Most Popular";
      picksData
        .sort((pick1, pick2) => {
          if (pick1.likes_count > pick2.likes_count) {
            return -1;
          } else if (pick1.likes_count < pick2.likes_count) {
            return 1;
          } else {
            return 0;
          }
        })
        .forEach((pick, index) => {
          index < picksPerPage && generateCard("pick", pick);
        });
      break;

    default:
      break;
  }

  sortBtn.innerHTML = `${btnIcon} Sort By: ${btnText}`;
  rotateBtn();
  cardLikeFunction();
});

// --------- Load More of "Today's Picks" Cards on Button Click

let picksPerPage = 8;

picksData.forEach((pick, index) => {
  index < picksPerPage && generateCard("pick", pick);
});
cardLikeFunction();

const loadMoreBtn = document.getElementById("picks-load");

loadMoreBtn.addEventListener("click", () => {
  const container = document.getElementById("picks-cards");
  container.innerHTML = "";

  picksPerPage += 8;

  picksData.forEach((pick, index) => {
    index < picksPerPage && generateCard("pick", pick);
  });

  rotateBtn();
  cardLikeFunction();
});

// --------- Change Filter Button Styles on Click in Picks Section

const filterBtns = [...document.getElementsByClassName("picks__filter-btn")];

filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    btn.classList.toggle("picks__filter-btn--active");
  })
);

// --------- Rotate View History Buttons on Click in Picks Section

const rotateBtn = () => {
  const historyBtns = [...document.getElementsByClassName("card__bid-history")];

  historyBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      btn.classList.toggle("card__bid-history--active");
    })
  );
};
rotateBtn();
