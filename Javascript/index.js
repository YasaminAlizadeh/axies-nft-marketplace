// --------- First Load

setTimeout(() => {
  document.body.classList.add("body--loaded");
}, 0);

// --------- Generate Cards from Data Arrays

const generateCard = (type, data) => {
  const card = document.createElement("article");
  if (data.is_liked) {
    card.className += " article--liked";
  }
  card.id = data.id;

  let container;
  let element;

  switch (type) {
    case "nft":
      container = document.getElementById("auctions-page");
      card.className = `article auctions__card ${
        data.is_liked ? "article--liked" : ""
      }`;
      element = generateNFTCard("nft", data);
      break;

    case "collection":
      container = document.getElementById("collections-page");
      card.className = `article collection__card ${
        data.is_liked ? "article--liked" : ""
      }`;
      element = generateCollectionCard(data);

      break;

    case "seller":
      container = document.getElementById("seller-cards");
      card.className = `article seller__card`;
      element = generateSellerCard(data);
      break;

    case "pick":
      container = document.getElementById("picks-cards");
      card.className = `article picks__card ${
        data.is_liked ? "article--liked" : ""
      }`;
      element = generateNFTCard("pick", data);
      break;

    default:
      break;
  }

  card.innerHTML = element;

  // Add Random Countdowns to NFT Cards
  [...card.getElementsByClassName("card__time--text")][0] &&
    cardTimeGenerator([...card.getElementsByClassName("card__time--text")][0]);

  // Add Like functionality to Heart Buttons in Auctions', Collections' and Picks' Cards
  [...card.getElementsByClassName("article__likes")][0] &&
    [...card.getElementsByClassName("article__likes")][0].addEventListener(
      "click",
      (e) => likeFunction(e)
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

const generateNFTCard = (type, data) => {
  return (element = `
  <div class="card__img-container">
  <img
    src="${type === "nft" ? data.NFT_img : data.pick_img}"
    alt="NFT"
    class="card__img"
    loading="lazy"
  />
${
  type === "nft"
    ? `  <div class="card__bid-btn"><i class="fa-solid fa-bag-shopping"></i>Place Bid</div>
<div class="card__time">
<i class="fa-solid fa-fire-flame-curved card__time--icon"></i>
<p class="card__time--text">${data.remaining_time}</p>
</div>`
    : `<div class="article__likes pick__likes">
<div class="like__btn"></div>
<p class="article__likes-count pick__likes-count">${data.likes_count}</p>
</div>`
}
  </div>

<div class="card__info">
<h3 class="card__title"><a href="#">${data.title}</a></h3>
  <div class="card__creator">
    <a href="#">
    <img
      src="${data.creator_img}"
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
  ${
    type === "nft"
      ? `<div class="article__likes card__likes">
  <div class="like__btn"></div>
  <p class="article__likes-count card__likes-count">${data.likes_count}</p>
</div>`
      : `<div class="card__bid-history"><i class="fa-solid fa-rotate"></i> View History</div>`
  }
</div>`);
};

const generateCollectionCard = (data) => {
  return (element = `
  <div class="collection__img-container">
              <img
                src="${data.images.img1}"
                alt="popular collection"
                class="collection__img collection__img--first"
                loading="lazy"
              />
              <img
                src="${data.images.img2}"
                alt="popular collection"
                class="collection__img collection__img--second"
                loading="lazy"
              />
              <img
                src="${data.images.img3}"
                alt="popular collection"
                class="collection__img collection__img--third"
                loading="lazy"
              />
              <img
                src="${data.images.img4}"
                alt="popular collection"
                class="collection__img collection__img--forth"
                loading="lazy"
              />
              <img
                src="${data.images.img5}"
                alt="popular collection"
                class="collection__img collection__img--fifth"
                loading="lazy"
              />
            </div>
            <div class="collection__creator-info">
            <a href="#" class="collection__creator-link">
            <div class="collection__creator-img">
                <img
                  src="${data.creator_img}"
                  alt="collection creator"
                />
                <i class="fa-solid fa-check"></i>
              </div>
              </a>
              <div class="collection__info">
                <h3 class="collection__name"><a href="#" class="collection__link">${
                  data.name
                }</a></h3>
                <p class="collection__creator">
                  Created by <a href="#" class="collection__creator-link">${
                    data.creator_name
                  }</a>
                </p>
              </div>
              <div class="article__likes collection__likes">
                <div class="like__btn"></div>
                <p class="article__likes-count collection__likes-count">${Math.floor(
                  data.likes_count
                )}</p>
              </div>
            </div>`);
};

const generateSellerCard = (data) => {
  return (element = `<a href="#">
  <div class="seller__img-container">
  <img
    src="${data.img}"
    alt="top seller"
    class="seller__img"
    loading="lazy"
  />
  <i class="fa-solid fa-check"></i>
</div>
<div class="seller__info">
  <h3 class="seller__name">${data.name}</h3>
  <p class="seller__assets">${data.assets} ETH</p>
</div>
</a>`);
};

// --------- Add Cards To Page

collectionsData.forEach((collection) => generateCard("collection", collection));
sellersData.forEach((seller) => generateCard("seller", seller));

// --------- Like Card when Clicked on the Heart Button

const likeFunction = (e) => {
  const clickedCard = [...document.getElementsByClassName("article")].filter(
    (element) => element.contains(e.target)
  )[0];

  const cardData = [...NFTdata, ...collectionsData, ...picksData].find(
    (card) => card.id === clickedCard.id
  );

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

// --------- Add Functionality to Scroll Up Button

const scrollBtn = document.getElementById("scroll-up-btn");

scrollBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("scroll", () => {
  scrollBtn.classList.add("scroll__btn--active");

  let scrollTop = window.pageYOffset;

  if (scrollTop === 0) {
    scrollBtn.classList.remove("scroll__btn--active");
  }
});

// --------- Pagination

const page = document.getElementById("auctions-page");

const calculateColumnsCount = () => {
  let columns;

  const mediaQueryXs = window.matchMedia("(min-width: 576px)");
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

//--------- Update Cards per Page based on Window Size

const updateCardsPerPage = (columns) => {
  page.style.gridTemplateColumns = `repeat(${NFTdata.length}, minmax(0, 1fr))`;
  page.style.width = `${(NFTdata.length / columns) * 100}%`;
};

let columnsCount = calculateColumnsCount();
updateCardsPerPage(columnsCount);

window.addEventListener("resize", () => {
  columnsCount = calculateColumnsCount();
  updateCardsPerPage(columnsCount);
});

// --------- Slide Animation based on Current Page

const slidePages = (page) => {
  page.style.setProperty(
    "--transformX",
    `calc(-${(100 / pagesCount) * (currentPage - 1)}% - min(0.1%, 3rem) * ${
      (currentPage - 1) * columnsCount
    })`
  );
};

// --------- Pagination Data

let currentPage = 1;
const cardsPerPage = columnsCount;
const pagesCount = Math.floor(NFTdata.length / cardsPerPage) + 1;

const paginationContainer = document.getElementById("pagination-pages");

// --------- Add Pages buttons to Pagination Bar

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
      const mediaQuery = window.matchMedia("(max-width: 992px)");

      if (currentPage !== Number(element.id)) {
        currentPage = Number(element.id);

        slidePages(page);
        paginationBar();
      }

      if (mediaQuery.matches) {
        document.getElementById("auctions").scrollIntoView();
      }
    });

    paginationContainer.appendChild(element);
  }
};

// --------- Add Functionality to Pagination Buttons

const paginationPrevButton = document.getElementById("pagination-prev-btn");
const pageCards = [...document.getElementsByClassName("auctions__card")];

paginationPrevButton.addEventListener("click", () => {
  const mediaQuery = window.matchMedia("(max-width: 992px)");

  if (currentPage > 1) {
    currentPage -= 1;
    slidePages(page);
    paginationBar();

    if (mediaQuery.matches) {
      document.getElementById("auctions").scrollIntoView();
    }
  } else {
    currentPage = 1;
  }
});

const paginationNextButton = document.getElementById("pagination-next-btn");

paginationNextButton.addEventListener("click", () => {
  const mediaQuery = window.matchMedia("(max-width: 992px)");

  if (currentPage < pagesCount) {
    currentPage += 1;
    slidePages(page);
    paginationBar();

    if (mediaQuery.matches) {
      document.getElementById("auctions").scrollIntoView();
    }
  } else {
    currentPage = pagesCount;
  }
});

paginationBar();
