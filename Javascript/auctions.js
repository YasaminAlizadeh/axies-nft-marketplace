const generateNFTCard = (data) => {
  const card = document.createElement("article");
  if (data.is_liked) {
    card.className += " article--liked";
  }
  card.id = data.id;

  let container;
  let element;

  container = document.getElementById("auctions-page");
  card.className = `article auctions__card ${
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

<div class="card__bid-btn"><i class="fa-solid fa-bag-shopping"></i>Place Bid</div>
<div class="card__time">
<i class="fa-solid fa-fire-flame-curved card__time--icon"></i>
<p class="card__time--text">${data.remaining_time}</p>
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
<div class="article__likes card__likes">
  <div class="like__btn"></div>
  <p class="article__likes-count card__likes-count">${data.likes_count}</p>
</div>
</div>`;

  card.innerHTML = element;

  // Add Random Countdowns to NFT Cards
  const timeContainer = [...card.getElementsByClassName("card__time--text")][0];
  const timeContainerCard = timeContainer.parentNode.parentNode.parentNode.id;

  timeContainer && cardTimeGenerator(timeContainer, timeContainerCard);

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

// --------- Show a random remaining time on NFT Cards

const timeToString = (day, hour, minute, second) => {
  const generatedString = `${day} : ${hour < 10 ? "0" + hour : hour} : ${
    minute < 10 ? "0" + minute : minute
  } : ${second < 10 ? "0" + second : second}`;

  return generatedString;
};

const cardTimeGenerator = (timeContainer, id) => {
  const index = itemsData.findIndex((element) => element.id === id);

  let remainingTime = itemsData[index].remaining_time;
  let isTimeOver = false;

  let generatedTime = timeToString(
    remainingTime.days,
    remainingTime.hours,
    remainingTime.minutes,
    remainingTime.seconds
  );

  timeContainer.innerHTML = generatedTime;

  setInterval(() => {
    if (remainingTime.seconds > 0) {
      remainingTime.seconds -= 1;
    } else {
      remainingTime.seconds = 59;
      if (remainingTime.minutes > 0) {
        remainingTime.minutes -= 1;
      } else {
        remainingTime.minutes = 59;
        if (remainingTime.hours > 0) {
          remainingTime.hours -= 1;
        } else {
          remainingTime.hours = 23;
          if (remainingTime.days > 0) {
            remainingTime.days -= 1;
          } else {
            isTimeOver = true;
          }
        }
      }
    }

    if (isTimeOver) {
      generatedTime = "Time Over!";
    } else {
      generatedTime = timeToString(
        remainingTime.days,
        remainingTime.hours,
        remainingTime.minutes,
        remainingTime.seconds
      );
    }

    timeContainer.innerHTML = generatedTime;
  }, 1000);
};

// --------- Update Auctions Section Contect

const page = document.getElementById("auctions-page");

page.innerHTML = "";
for (let j = 0; j < itemsData.length; j++) {
  generateNFTCard(itemsData[j]);
}

// --------- Pagination

let paginationBtns = document.getElementById("pagination-pages");

const calculateColumnsCount = () => {
  let columns;

  const mediaQueryXs = window.matchMedia("(max-width: 767px)");
  const mediaQueryS = window.matchMedia("(min-width: 768px)");
  const mediaQueryMd = window.matchMedia("(min-width: 992px)");
  const mediaQueryLg = window.matchMedia("(min-width: 1200px)");

  if (mediaQueryLg.matches) {
    columns = 4;
  } else if (mediaQueryS.matches) {
    columns = 2;
  } else if (mediaQueryXs.matches) {
    columns = 1;
  }

  return columns;
};

// --------- Pagination Data

let pagesCount;
let currentPage = Number(localStorage.getItem("currentPage")) || 1;

const paginationContainer = document.getElementById("pagination-pages");

let pageInput = document.getElementById("page-num");
pageInput.onchange = (e) => changePageInput(e);

pageInput.value = currentPage;

// --------- Slide Animation based on Current Page

const slidePages = (page) => {
  page.style.setProperty(
    "--transformX",
    `-${(100 / pagesCount) * (currentPage - 1)}%`
  );
};

// --------- Add Pages buttons to Pagination Bar

const pageNumbersIndicator = document.getElementById("pages-number");

const paginationBar = () => {
  paginationContainer.innerHTML = "";

  for (let i = 0; i < pagesCount; i++) {
    const element = document.createElement("div");
    element.id = i + 1;
    element.className = "pagination__page";
    if (Number(element.id) === currentPage) {
      element.className += " pagination__page--active";
    }

    element.addEventListener("click", () => {
      if (currentPage !== Number(element.id)) {
        currentPage = Number(element.id);

        slidePages(page);
        paginationBar();
      }
    });

    paginationContainer.appendChild(element);
  }

  pageInput.value = currentPage;
  pageNumbersIndicator.innerText = pagesCount;
};

const changePageInput = (e) => {
  const inputValue = e.target.value;

  if (inputValue < 1) {
    e.target.value = 1;
  } else if (inputValue > pagesCount) {
    e.target.value = pagesCount;
  } else {
    currentPage = Number(e.target.value);
    localStorage.setItem("currentPage", currentPage);

    slidePages(page);
    paginationBar();
  }
};

//--------- Update Cards per Page based on Window Size

const pageInputContainer = document.getElementById("page-input-container");

const updateCardsPerPage = (columns) => {
  const cardsPerPage = columnsCount;
  pagesCount =
    Math.floor(itemsData.length / cardsPerPage) * cardsPerPage + 1 >
    itemsData.length
      ? Math.floor(itemsData.length / cardsPerPage)
      : Math.floor(itemsData.length / cardsPerPage) + 1;

  page.style.setProperty(
    "--transformX",
    `-${(100 / pagesCount) * (currentPage - 1)}%`
  );

  if (pagesCount > 20) {
    pageInputContainer.style.display = "flex";
    paginationBtns.style.display = "none";
  } else {
    pageInputContainer.style.display = "none";
    paginationBtns.style.display = "flex";
  }

  page.style.gridTemplateColumns = `repeat(${itemsData.length}, minmax(0, 1fr))`;
  page.style.width = `${(itemsData.length / columns) * 100}%`;

  paginationBar();
};

let columnsCount = calculateColumnsCount();
updateCardsPerPage(columnsCount);

window.addEventListener("resize", () => {
  const prevColumnsCount = columnsCount;

  columnsCount = calculateColumnsCount();
  updateCardsPerPage(columnsCount);

  const newCurrentPage = (currentPage / columnsCount) * prevColumnsCount;

  currentPage =
    newCurrentPage > itemsData.length
      ? itemsData.length
      : newCurrentPage > 0
      ? newCurrentPage % 1 === 0
        ? newCurrentPage
        : Math.floor(newCurrentPage) + 1
      : 1;
  localStorage.setItem("currentPage", currentPage);

  slidePages(page);
  paginationBar();
});

// --------- Add Functionality to Pagination Buttons

const paginationPrevButton = document.getElementById("pagination-prev-btn");
const pageCards = [...document.getElementsByClassName("auctions__card")];

paginationPrevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    localStorage.setItem("currentPage", currentPage);

    slidePages(page);
    paginationBar();
  } else {
    currentPage = 1;
    localStorage.setItem("currentPage", currentPage);
  }
});

const paginationNextButton = document.getElementById("pagination-next-btn");

paginationNextButton.addEventListener("click", () => {
  if (currentPage < pagesCount) {
    currentPage += 1;
    localStorage.setItem("currentPage", currentPage);

    slidePages(page);
    paginationBar();
  } else {
    currentPage = pagesCount;
    localStorage.setItem("currentPage", currentPage);
  }
});

paginationBar();

// --------- Like Card when Clicked on the Heart Button

const likeFunction = (e, data) => {
  const clickedCard = [...document.getElementsByClassName("article")].filter(
    (element) => element.contains(e.currentTarget)
  )[0];

  const cardData = [...data].find((card) => card.id === clickedCard.id);

  if (!cardData.is_liked) {
    cardData.likes_count += 1;
    cardData.is_liked = true;

    clickedCard.classList.add("article--liked");
  } else {
    cardData.likes_count -= 1;
    cardData.is_liked = false;

    clickedCard.classList.remove("article--liked");
  }

  [...clickedCard.getElementsByClassName("article__likes-count")][0].innerHTML =
    cardData.likes_count;
};
