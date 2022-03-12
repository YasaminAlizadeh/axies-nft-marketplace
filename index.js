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
  container.appendChild(card);
};

const generateNFTCard = (type, data) => {
  return (element = `
  <div class="card__img-container">
  <img
    src="${type === "nft" ? data.NFT_img : data.pick_img}"
    alt="NFT"
    class="card__img"
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
<h3 class="card__title">${data.title}</h3>
  <div class="card__creator">
    <img
      src="${data.creator_img}"
      alt="nft creator"
      class="creator__img"
    />
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
              />
              <img
                src="${data.images.img2}"
                alt="popular collection"
                class="collection__img collection__img--second"
              />
              <img
                src="${data.images.img3}"
                alt="popular collection"
                class="collection__img collection__img--third"
              />
              <img
                src="${data.images.img4}"
                alt="popular collection"
                class="collection__img collection__img--forth"
              />
              <img
                src="${data.images.img5}"
                alt="popular collection"
                class="collection__img collection__img--fifth"
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
  />
  <i class="fa-solid fa-check"></i>
</div>
<div class="seller__info">
  <h3 class="seller__name">${data.name}</h3>
  <p class="seller__assets">${data.assets} ETH</p>
</div>
</a>`);
};

// Add Cards To Page

collectionsData.forEach((collection) => generateCard("collection", collection));
sellersData.forEach((seller) => generateCard("seller", seller));

// --------- Pagination

let currentPage = 1;
const cardsPerPage = 4;
const pagesCount = Math.floor(NFTdata.length / cardsPerPage) + 1;

const paginationContainer = document.getElementById("pagination-pages");

// Add Pages buttons to Pagination Bar

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
        if (currentPage > Number(element.id)) {
          [...document.getElementsByClassName("auctions__page")].forEach(
            (page) => {
              page.classList.add("auctions__page--slide-right");
              page.addEventListener("webkitAnimationEnd", () => {
                page.classList.remove("auctions__page--slide-right");
              });
            }
          );
        } else {
          [...document.getElementsByClassName("auctions__page")].forEach(
            (page) => {
              page.classList.add("auctions__page--slide-left");
              page.addEventListener("webkitAnimationEnd", () => {
                page.classList.remove("auctions__page--slide-left");
              });
            }
          );
        }

        currentPage = Number(element.id);

        if (mediaQuery.matches) {
          document.getElementById("auctions").scrollIntoView();
        }
        updateAuctions();
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
    [...document.getElementsByClassName("auctions__page")].forEach((page) => {
      page.classList.add("auctions__page--slide-right");
      page.addEventListener("webkitAnimationEnd", () => {
        page.classList.remove("auctions__page--slide-right");
      });
    });
    updateAuctions();

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
    [...document.getElementsByClassName("auctions__page")].forEach((page) => {
      page.classList.add("auctions__page--slide-left");
      page.addEventListener("webkitAnimationEnd", () => {
        page.classList.remove("auctions__page--slide-left");
      });
    });
    updateAuctions();

    if (mediaQuery.matches) {
      document.getElementById("auctions").scrollIntoView();
    }
  } else {
    currentPage = pagesCount;
  }
});

// --------- Like Card when Clicked on the Heart Button

const cardLikeFunction = () => {
  const heartBtns = [...document.getElementsByClassName("article__likes")];

  heartBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const clikedCard = [...document.getElementsByClassName("article")].filter(
        (element) => element.contains(e.target)
      )[0];

      const cardData = [...NFTdata, ...collectionsData, ...picksData].find(
        (card) => card.id === clikedCard.id
      );

      if (!cardData.is_liked) {
        cardData.likes_count += 1;
        cardData.is_liked = true;

        clikedCard.classList.add("article--liked");
      } else {
        cardData.likes_count -= 1;
        cardData.is_liked = false;

        clikedCard.classList.remove("article--liked");
      }

      [
        ...clikedCard.getElementsByClassName("article__likes-count"),
      ][0].innerHTML = cardData.likes_count;
    })
  );
};
