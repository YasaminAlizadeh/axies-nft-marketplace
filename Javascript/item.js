const tabsContent = document.getElementById("tabs-content");
const tabsLabelsContainer = document.getElementById("tabs-labels");
const tabsLabels = document.getElementsByClassName("tabs__label");
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
  document.title = `Item: ${selectedItem.title}`;

  const itemContainer = document.getElementById("item-details");
  const itemImg = document.getElementById("item-img");
  const itemTitle = document.getElementById("item-title");
  const itemViews = document.getElementById("item-views");
  const itemLikeBtn = document.getElementById("item-like-btn");
  const itemLikes = document.getElementById("item-likes");
  const itemOwner = document.getElementById("item-owner");
  const itemOwnerImg = document.getElementById("item-owner-img");
  const itemCreator = document.getElementById("item-creator");
  const itemCreatorImg = document.getElementById("item-creator-img");
  const itemCurrentBid = document.getElementById("item-current-bid");
  const itemCurrentBidDollars = document.getElementById(
    "item-current-bid-dollars"
  );
  const itemCountdown = document.getElementById("item-countdown");

  itemContainer.id = selectedItem.id;
  itemImg.src = `${AssetsDirectory}${selectedItem.NFT_img}`;
  itemTitle.innerText = selectedItem.title;
  itemViews.innerText = selectedItem.views;
  itemLikeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    likeFunction(e, itemsData);
  });
  itemLikes.innerText = selectedItem.likes_count;
  itemOwner.innerText = selectedItem.owner;
  itemOwnerImg.src = `${AssetsDirectory}${selectedItem.owner_img}`;
  itemCreator.innerText = selectedItem.creator;
  itemCreatorImg.src = `${AssetsDirectory}${selectedItem.creator_img}`;
  itemCurrentBid.innerText = `${selectedItem.current_bid} ETH`;
  itemCurrentBidDollars.innerText = `$${Math.floor(
    selectedItem.current_bid * 2604.42
  ).toLocaleString()}`;
  setInterval(() => {
    itemCountdown.innerText = timeToString(
      selectedItem.remaining_time.days,
      selectedItem.remaining_time.hours,
      selectedItem.remaining_time.minutes,
      selectedItem.remaining_time.seconds
    );
  }, 1000);
  tabsContentDisplay("tab-1");
};

urlParameter(window.location.href);
