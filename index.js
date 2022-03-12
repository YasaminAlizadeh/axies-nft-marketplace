// Give the header a Background Color on scroll
const headerWrapper = [
  ...document.getElementsByClassName("header__wrapper"),
][0];

window.addEventListener("scroll", () => {
  headerWrapper.classList.add("header__wrapper--scrolled");

  let scrollTop = window.pageYOffset;

  if (scrollTop === 0) {
    headerWrapper.classList.remove("header__wrapper--scrolled");
  }
});

// --------- Open/Close Menu

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const menuBackBtn = document.getElementById("menu-back-btn");
const menuItems = [...document.getElementsByClassName("menu__item")];

menuBtn.addEventListener("click", () => {
  menu.classList.add("header__menu--open");
  menu.style.transition = "all 0.3s ease-in-out";
});

menuBackBtn.addEventListener("click", () => {
  menu.classList.remove("header__menu--open");
});

window.addEventListener("resize", () => {
  menu.style.transition = "none";
});

// --------- Close Menu if Clicked Outside of it

window.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.remove("header__menu--open");
  }
});

// --------- Close Menu and submenus if window resized

window.addEventListener("resize", () => {
  const expandedMenuItems = [
    ...document.getElementsByClassName("menu__item--expanded"),
  ];

  menu.classList.remove("header__menu--open");
  expandedMenuItems.forEach((item) => {
    item.classList.remove("menu__item--expanded");
  });
});

// --------- Expand/Collapse submenus

menuItems.forEach((item) =>
  item.addEventListener("click", (e) => {
    const mediaQuery = window.matchMedia("(max-width: 1312px)");
    if (mediaQuery.matches) {
      e.preventDefault();
      e.stopPropagation();

      // If the clicked element is a submenu item, first close other submenus
      if ([...item.classList].includes("submenu__item")) {
        menuItems
          .filter((element) => [...element.classList].includes("submenu__item"))
          .filter((element) => element !== item)
          .forEach((element) =>
            element.classList.remove("menu__item--expanded")
          );
      }
      // Else if the clicked item is a menu item, first close other menu items
      else {
        menuItems
          .filter((element) => element !== item)
          .forEach((element) =>
            element.classList.remove("menu__item--expanded")
          );
      }

      // Then open the clicked item
      item.classList.toggle("menu__item--expanded");
    }
  })
);

// --------- Change Theme to Dark/Light on Button Click

const themeBtns = [...document.getElementsByClassName("theme__btn")];
const lightThemeBtn = document.getElementById("light-theme-btn");
const darkThemeBtn = document.getElementById("dark-theme-btn");

lightThemeBtn.addEventListener("click", () => {
  themeBtns.forEach((btn) => btn.classList.remove("theme__btn--active"));
  lightThemeBtn.classList.add("theme__btn--active");
  document.querySelector("body").classList.remove("theme--dark");
  document.getElementById("background").style.transform = "scaleY(1)";
  document.getElementById("background").style.transformOrigin = "top";
});

darkThemeBtn.addEventListener("click", () => {
  themeBtns.forEach((btn) => btn.classList.remove("theme__btn--active"));
  darkThemeBtn.classList.add("theme__btn--active");
  document.querySelector("body").classList.add("theme--dark");
  document.getElementById("background").style.transform = "scaleY(0)";
  document.getElementById("background").style.transformOrigin = "bottom";
});

// --------- Expand search input on click

const search = document.getElementById("header-search");

window.addEventListener("click", (e) => {
  const mediaQuery = window.matchMedia("(min-width: 1312px)");
  if (mediaQuery.matches) {
    if (search.contains(e.target)) {
      search.classList.add("header__search--expanded");
    } else {
      search.classList.remove("header__search--expanded");
      document.getElementById("search").value = "";
    }
  }
});

// --------- Animate the H1 character

const title = document.getElementById("title");
const characterFace = [...document.getElementsByClassName("face__wrapper")][0];
const characterEyelids = [...document.getElementsByClassName("eyelid")];
const characterEyePupils = [...document.getElementsByClassName("pupil")];
const characterHands = [...document.getElementsByClassName("hand")];

title.addEventListener("mouseover", () => {
  characterFace.classList.add("face__wrapper--animated");
  characterEyelids[0].classList.add("eyelid--left--animated");
  characterEyelids[1].classList.add("eyelid--right--animated");
  characterEyePupils.forEach((pupil) => pupil.classList.add("pupil--animated"));
  characterHands.forEach((hand) => hand.classList.add("hand--animated"));
});

characterFace.addEventListener("webkitAnimationEnd", () => {
  characterFace.classList.remove("face__wrapper--animated");
});

characterEyelids[0].addEventListener("webkitAnimationEnd", () => {
  characterEyelids[0].classList.remove("eyelid--left--animated");
});

characterHands[1].addEventListener("webkitAnimationEnd", () => {
  characterEyelids[1].classList.remove("eyelid--right--animated");
});

characterEyePupils[0].addEventListener("webkitAnimationEnd", () => {
  characterEyePupils.forEach((pupil) =>
    pupil.classList.remove("pupil--animated")
  );
});

characterHands[0].addEventListener("webkitAnimationEnd", () => {
  characterHands.forEach((hand) => hand.classList.remove("hand--animated"));
});

const blobs = [...document.getElementsByClassName("hero__blob")];
const blobsCount = blobs.length;

blobs.forEach((blob, index) =>
  blob.addEventListener("webkitAnimationEnd", () => {
    blob.classList.remove("hero__blob--animated");
    blobs[index < blobsCount - 1 ? index + 1 : 0].classList.add(
      "hero__blob--animated"
    );
  })
);

// --------- NFTs

const NFTdata = [
  {
    id: "nft_1",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/card-item8.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-5.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_2",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-10.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-2.jpg",
    is_BSC: false,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_3",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_4",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-21.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-4.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
  },
  {
    id: "nft_5",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/card-item8.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-5.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_6",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-10.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-2.jpg",
    is_BSC: false,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_7",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_8",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_9",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_10",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "nft_11",
    title: "Hamlet Contemplates Yorick's",
    NFT_img: "./Assets/Images/03_Live Auctions/image-box-21.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-4.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    remaining_time: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
];

// --------- Collections

const collectionsData = [
  {
    id: "collection_1",
    name: "Creative Art Collection",
    creator_name: "Ralph Garraway",
    creator_img: "./Assets/Images/04_Top Seller/avt-1.jpg",
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
    images: {
      img1: "./Assets/Images/06_Popular Collection/box1/collection-item-2.jpg",
      img2: "./Assets/Images/06_Popular Collection/box1/collection-item-bottom-4.jpg",
      img3: "./Assets/Images/06_Popular Collection/box1/collection-item-top-1.jpg",
      img4: "./Assets/Images/06_Popular Collection/box1/collection-item-top-2.jpg",
      img5: "./Assets/Images/06_Popular Collection/box2/img-collection24.jpg",
    },
  },
  {
    id: "collection_2",
    name: "Colorful Abstract",
    creator_name: "Ralph Garraway",
    creator_img: "./Assets/Images/04_Top Seller/avt-7.jpg",
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
    images: {
      img1: "./Assets/Images/06_Popular Collection/box2/img-collection10.jpg",
      img2: "./Assets/Images/06_Popular Collection/box2/img-collection11.jpg",
      img3: "./Assets/Images/06_Popular Collection/box2/img-collection23.jpg",
      img4: "./Assets/Images/06_Popular Collection/box3/img-collection12.jpg",
      img5: "./Assets/Images/06_Popular Collection/box2/img-collection24.jpg",
    },
  },
  {
    id: "collection_3",
    name: "Modern Art Collection",
    creator_name: "Ralph Garraway",
    creator_img: "./Assets/Images/04_Top Seller/avt-8.jpg",
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
    images: {
      img1: "./Assets/Images/06_Popular Collection/box3/img-collection12.jpg",
      img2: "./Assets/Images/06_Popular Collection/box3/img-collection17.jpg",
      img3: "./Assets/Images/06_Popular Collection/box3/img-collection18.jpg",
      img4: "./Assets/Images/06_Popular Collection/box3/img-collection25.jpg",
      img5: "./Assets/Images/06_Popular Collection/box1/collection-item-top-1.jpg",
    },
  },
];

// --------- Sellers

const sellersData = [
  {
    id: "seller_1",
    name: "Crispen Berry",
    img: "./Assets/Images/04_Top Seller/avt-1.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_2",
    name: "Windsor Lane",
    img: "./Assets/Images/04_Top Seller/avt-2.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_3",
    name: "Blake Banks",
    img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_4",
    name: "Matt Ramos",
    img: "./Assets/Images/04_Top Seller/avt-4.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_5",
    name: "Crispen Berry",
    img: "./Assets/Images/04_Top Seller/avt-5.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_6",
    name: "Tommy Alvarez",
    img: "./Assets/Images/04_Top Seller/avt-6.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_7",
    name: "Andy Hurlbutt",
    img: "./Assets/Images/04_Top Seller/avt-7.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_8",
    name: "Monica Lucas",
    img: "./Assets/Images/04_Top Seller/avt-8.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_9",
    name: "Harper Wilcher",
    img: "./Assets/Images/04_Top Seller/avt-9.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
  {
    id: "seller_10",
    name: "Crispen Berry",
    img: "./Assets/Images/04_Top Seller/avt-1.jpg",
    assets: Math.floor((Math.random() * 250 + 2) * 100) / 100,
  },
];

// --------- Picks

const picksData = [
  {
    id: "pick_1",
    title: "Hamlet Contemplates Yorick's",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-3.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-1.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_2",
    title: "Crypto Egg Stamp #5",
    pick_img: "./Assets/Images/05_Today's Picks/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_3",
    title: "CyberPrimal 042 LAN",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-2.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-4.jpg",
    is_BSC: false,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_4",
    title: "Crypto Egg Stamp #5",
    pick_img: "./Assets/Images/05_Today's Picks/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_5",
    title: "Hamlet Contemplates Yorick's",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-9.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-6.jpg",
    is_BSC: false,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_6",
    title: "Hamlet Contemplates Yorick's",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-9.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-6.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_7",
    title: "CyberPrimal 042 LAN",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-4.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-4.jpg",
    is_BSC: false,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_8",
    title: "Crypto Egg Stamp #5",
    pick_img: "./Assets/Images/05_Today's Picks/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_9",
    title: "Hamlet Contemplates Yorick's",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-3.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-1.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_10",
    title: "Crypto Egg Stamp #5",
    pick_img: "./Assets/Images/05_Today's Picks/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_11",
    title: "CyberPrimal 042 LAN",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-2.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-4.jpg",
    is_BSC: false,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_12",
    title: "Crypto Egg Stamp #5",
    pick_img: "./Assets/Images/05_Today's Picks/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_13",
    title: "Hamlet Contemplates Yorick's",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-9.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-6.jpg",
    is_BSC: false,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_14",
    title: "Hamlet Contemplates Yorick's",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-9.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-6.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_15",
    title: "CyberPrimal 042 LAN",
    pick_img: "./Assets/Images/05_Today's Picks/card-item-4.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-4.jpg",
    is_BSC: false,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
  {
    id: "pick_16",
    title: "Crypto Egg Stamp #5",
    pick_img: "./Assets/Images/05_Today's Picks/image-box-11.jpg",
    creator: "SalvadorDali",
    creator_img: "./Assets/Images/04_Top Seller/avt-3.jpg",
    is_BSC: true,
    current_bid: Math.floor((Math.random() * 4 + 3) * 100) / 100,
    likes_count: Math.floor(Math.random() * 1000),
    is_liked: false,
  },
];

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
              <div class="collection__creator-img">
                <img
                  src="${data.creator_img}"
                  alt="collection creator"
                />
                <i class="fa-solid fa-check"></i>
              </div>
              <div class="collection__info">
                <h3 class="collection__name">${data.name}</h3>
                <p class="collection__creator">
                  Created by <a href="#">${data.creator_name}</a>
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

// Load More of "Today's Picks" Cards on Button Click

let picksPerPage = 8;

picksData.forEach((pick, index) => {
  index < picksPerPage && generateCard("pick", pick);
});

const loadMoreBtn = document.getElementById("picks-load");

loadMoreBtn.addEventListener("click", () => {
  const container = document.getElementById("picks-cards");
  container.innerHTML = "";

  picksPerPage += 8;

  picksData.forEach((pick, index) => {
    index < picksPerPage && generateCard("pick", pick);
  });

  cardLikeFunction();
});

// --------- Show a random remaining time on NFT Cards

const cardTimeGenerator = () => {
  const timeContainers = [
    ...document.getElementsByClassName("card__time--text"),
  ];

  const timeToString = (day, hour, minute, second) => {
    const generatedString = `${day} : ${hour < 10 ? "0" + hour : hour} : ${
      minute < 10 ? "0" + minute : minute
    } : ${second < 10 ? "0" + second : second}`;

    return generatedString;
  };

  timeContainers.forEach((element) => {
    const randomTime = {
      days: Math.floor(Math.random() * 10),
      hours: Math.floor(Math.random() * 23),
      minutes: Math.floor(Math.random() * 59),
      seconds: Math.floor(Math.random() * 59),
    };
    let isTimeOver = false;

    let generatedTime = timeToString(
      randomTime.days,
      randomTime.hours,
      randomTime.minutes,
      randomTime.seconds
    );

    element.innerHTML = generatedTime;

    setInterval(() => {
      if (randomTime.seconds > 0) {
        randomTime.seconds -= 1;
      } else {
        randomTime.seconds = 59;
        if (randomTime.minutes > 0) {
          randomTime.minutes -= 1;
        } else {
          randomTime.minutes = 59;
          if (randomTime.hours > 0) {
            randomTime.hours -= 1;
          } else {
            randomTime.hours = 23;
            if (randomTime.days > 0) {
              randomTime.days -= 1;
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
          randomTime.days,
          randomTime.hours,
          randomTime.minutes,
          randomTime.seconds
        );
      }

      element.innerHTML = generatedTime;
    }, 1000);
  });
};

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

      // btn.firstElementChild.transitio

      if (!cardData.is_liked) {
        cardData.likes_count += 1;
        cardData.is_liked = true;

        [
          ...clikedCard.getElementsByClassName("article__likes-count"),
        ][0].innerHTML = cardData.likes_count;

        clikedCard.classList.add("article--liked");
      } else {
        cardData.likes_count -= 1;
        cardData.is_liked = false;

        [
          ...clikedCard.getElementsByClassName("article__likes-count"),
        ][0].innerHTML = cardData.likes_count;

        clikedCard.classList.remove("article--liked");
      }
    })
  );
};

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

// Add NFTs per Page

const updateCardsPerPage = () => {
  const page = document.getElementById("auctions-page");
  page.innerHTML = "";

  for (
    let j = (currentPage - 1) * cardsPerPage;
    j < currentPage * cardsPerPage;
    j++
  ) {
    if (j < NFTdata.length) {
      generateCard("nft", NFTdata[j]);
    }
  }
};

// Update Auctions Section Contect

const updateAuctions = () => {
  paginationBar();
  updateCardsPerPage();
  cardTimeGenerator();
  cardLikeFunction();
};

updateAuctions();

// Add Functionality to Pagination Buttons

const paginationPrevButton = document.getElementById("pagination-prev-btn");

paginationPrevButton.addEventListener("click", () => {
  const mediaQuery = window.matchMedia("(max-width: 992px)");

  if (currentPage > 1) {
    currentPage -= 1;
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
    updateAuctions();

    if (mediaQuery.matches) {
      document.getElementById("auctions").scrollIntoView();
    }
  } else {
    currentPage = pagesCount;
  }
});
