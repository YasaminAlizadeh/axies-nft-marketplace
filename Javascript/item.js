const tabsContent = document.querySelector("#tabs-content");
const tabsLabelsContainer = document.querySelector("#tabs-labels");
const tabsLabels = document.querySelectorAll(".tabs__label");
let selectedItem;

// Get the selected item Id from the URL
const urlParameter = (url) => {
  const itemId = (url + "?").split("?")[1];
  selectedItem = itemsData.find((item) => item.id === itemId);

  displayItem(selectedItem);
};

const tabsContentDisplay = (id) => {
  tabsContent.innerText = "";

  // Switch tabs
  switch (id) {
    case "tab-1":
      selectedItem.bid_history.forEach((item) => {
        historyItemDisplay(tabsContent, item);
      });
      break;

    case "tab-2":
      historyItemDisplay(tabsContent, selectedItem.bid_history[0]);
      break;

    case "tab-3":
      const provenance = document.createElement("p");
      provenance.className = "tabs__provenance";

      provenance.innerText = selectedItem.provenance;

      tabsContent.appendChild(provenance);
      break;

    default:
      break;
  }

  // Highlight the selected label
  const selectedLabelIndex = [...tabsLabels].findIndex(
    (label) => label.id === id
  );

  tabsLabelsContainer.style.setProperty("--active-index", selectedLabelIndex);
};

[...tabsLabels].forEach((label) =>
  label.addEventListener("click", (e) => {
    tabsContentDisplay(e.target.id);
  })
);

// Add history items to Container
const historyItemDisplay = (container, data) => {
  const item = document.createElement("article");

  item.className = "bid-history__item";

  const element = `
      <a href="#" class="bid-maker__img">
        <img src=${AssetsDirectory}${data.bid_maker_img} alt="bid maker" />
        <i class="fa-solid fa-check"></i>
      </a>
      <div class="bid__info">
        <div class="bid__info--left">
          <strong id="bid-maker-name" class="bid-maker__name">
            <a href="#">${data.bid_maker}</a>
          </strong>
          <span id="bid-status" class="bid__status">${data.bid_status}</span>
          <p id="bid-time" class="bid__time">${data.bid_date}</p>
        </div>

        <p class="bid__number">${data.bid} ETH
        </br>
        <span>= $${Math.floor(data.bid * 2604.42).toLocaleString()}
        </span>
        </p>
      </div>
`;

  item.innerHTML += element;
  container.appendChild(item);
};

// Display item data in page
const displayItem = (selectedItem) => {
  const {
    id,
    NFT_img,
    title,
    views,
    likes_count,
    owner,
    owner_img,
    creator,
    creator_img,
    current_bid,
    remaining_time,
  } = selectedItem;

  document.title = `Item: ${title}`;

  const itemContainer = document.querySelector("#item-details");
  const itemImg = document.querySelector("#item-img");
  const itemTitle = document.querySelector("#item-title");
  const itemViews = document.querySelector("#item-views");
  const itemLikeBtn = document.querySelector("#item-like-btn");
  const itemLikes = document.querySelector("#item-likes");
  const itemOwner = document.querySelector("#item-owner");
  const itemOwnerImg = document.querySelector("#item-owner-img");
  const itemCreator = document.querySelector("#item-creator");
  const itemCreatorImg = document.querySelector("#item-creator-img");
  const itemCurrentBid = document.querySelector("#item-current-bid");
  const itemCurrentBidDollars = document.querySelector(
    "#item-current-bid-dollars"
  );
  const itemCountdown = document.querySelector("#item-countdown");

  itemContainer.id = id;
  itemImg.src = `${AssetsDirectory}${NFT_img}`;
  itemTitle.innerText = title;
  itemViews.innerText = views;
  itemLikeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    likeFunction(e, itemsData);
  });
  itemLikes.innerText = likes_count;
  itemOwner.innerText = owner;
  itemOwnerImg.src = `${AssetsDirectory}${owner_img}`;
  itemCreator.innerText = creator;
  itemCreatorImg.src = `${AssetsDirectory}${creator_img}`;
  itemCurrentBid.innerText = `${current_bid} ETH`;
  itemCurrentBidDollars.innerText = `$${Math.floor(
    current_bid * 2604.42
  ).toLocaleString()}`;
  setInterval(() => {
    itemCountdown.innerText = timeToString(
      remaining_time.days,
      remaining_time.hours,
      remaining_time.minutes,
      remaining_time.seconds
    );
  }, 1000);
  tabsContentDisplay("tab-1");
};

urlParameter(window.location.href);
