const generatePicksCard = (data) => {
  const card = document.createElement("article");
  if (data.is_liked) {
    card.className += " article--liked";
  }
  card.id = data.id;

  let container;
  let element;

  container = document.getElementById("picks-cards");
  card.className = `article picks__card ${
    data.is_liked ? "article--liked" : ""
  }`;

  element = `
  <div class="card__img-container">
  <img
    src="${AssetsDirectory}${data.NFT_img}"
    alt="NFT"
    class="card__img"
    loading="lazy"
  />
 <div class="article__likes pick__likes">
<div class="like__btn"></div>
<p class="article__likes-count pick__likes-count">${data.likes_count}</p>
</div>
  </div>

<div class="card__info">
<h3 class="card__title"><a href="./Pages/item.html?${data.id}">${
    data.title
  }</a></h3>
  <div class="card__creator">
    <a href="#">
    <img
      src="${AssetsDirectory}${data.creator_img}"
      alt="nft creator"
      class="creator__img"
    />
    </a>
  <div class="creator__info">
    <p class="creatot__label">Creator</p>
    <a href="#" class="creator__name">${data.creator}</a>
    </p>
  </div>
  ${data.is_BSC ? `<div class="creator__bsc">BSC</div>` : ``}
  </div>
  </div>

  <div class="card__current-bid">
  <div class="card__bid-info">
  <p class="card__bid-label">Current Bid</p>
  <p class="card__bid-number"><span>${data.current_bid} ETH</span>
   = $${Math.floor(data.current_bid * 2604.42).toLocaleString()}</p>
  </div>
 <div class="card__bid-history"><i class="fa-solid fa-rotate"></i> View History</div>
</div>`;

  card.innerHTML = element;

  // Add Like functionality to Heart Buttons in Cards
  [...card.getElementsByClassName("article__likes")][0] &&
    [...card.getElementsByClassName("article__likes")][0].addEventListener(
      "click",
      (e) => likeFunction(e, [...itemsData])
    );

  // Add Rotate functionality to History Buttons in picks Cards
  const historyBtn = [...card.getElementsByClassName("card__bid-history")][0];

  historyBtn &&
    historyBtn.addEventListener("click", () => {
      historyBtn.classList.toggle("card__bid-history--active");
    });

  // Add Card to Page
  container.appendChild(card);
};

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
      itemsData
        .sort((pick1, pick2) => pick1.date_added - pick2.date_added)
        .forEach((pick, index) => {
          index < picksPerPage && generatePicksCard(pick);
        });
      break;

    case "date-down":
      btnIcon = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
      btnText = "Date: Oldest";
      itemsData
        .sort((pick1, pick2) => pick2.date_added - pick1.date_added)
        .forEach((pick, index) => {
          index < picksPerPage && generatePicksCard(pick);
        });
      break;

    case "name-up":
      btnIcon = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
      btnText = "Name: A-Z";
      itemsData
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
          index < picksPerPage && generatePicksCard(pick);
        });
      break;

    case "name-down":
      btnIcon = `<i class="fa-solid fa-arrow-down-wide-short"></i>`;
      btnText = "Name: Z-A";
      itemsData
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
          index < picksPerPage && generatePicksCard(pick);
        });
      break;

    case "price-up":
      btnIcon = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
      btnText = "Price: Low To High";
      itemsData
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
          index < picksPerPage && generatePicksCard(pick);
        });
      break;

    case "price-down":
      btnIcon = `<i class="fa-solid fa-arrow-down-wide-short"></i>`;
      btnText = "Price: High to Low";
      itemsData
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
          index < picksPerPage && generatePicksCard(pick);
        });
      break;

    case "likes-down":
      btnIcon = `<i class="fa-solid fa-arrow-down-wide-short"></i>`;
      btnText = "Most Popular";
      itemsData
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
          index < picksPerPage && generatePicksCard(pick);
        });
      break;

    default:
      break;
  }

  sortBtn.innerHTML = `${btnIcon} Sort By: ${btnText}`;
});

// --------- Load More of "Today's Picks" Cards on Button Click

let picksPerPage = 8;

itemsData.forEach((pick, index) => {
  index < picksPerPage && generatePicksCard(pick);
});

const loadMoreBtn = document.getElementById("picks-load");

loadMoreBtn.addEventListener("click", () => {
  const container = document.getElementById("picks-cards");
  container.innerHTML = "";

  picksPerPage += 8;

  itemsData.forEach((pick, index) => {
    index < picksPerPage && generatePicksCard(pick);
  });
});

// --------- Change Filter Button Styles on Click in Picks Section

const filterBtns = [...document.getElementsByClassName("picks__filter-btn")];

filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    btn.classList.toggle("picks__filter-btn--active");
  })
);
