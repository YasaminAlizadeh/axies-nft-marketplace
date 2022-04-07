const generateSellerCard = (data) => {
  const card = document.createElement("article");
  card.id = data.id;

  let container;

  container = document.querySelector("#seller-cards");
  card.className = `article seller__card`;

  let element = `<a href="#">
    <div class="seller__img-container">
    <img
      src="${AssetsDirectory}${data.img}"
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
  </a>`;

  container = document.querySelector("#seller-cards");
  card.className = `article seller__card`;

  card.innerHTML = element;

  // Add Card to Page
  container.appendChild(card);
};

sellersData.forEach((seller) => generateSellerCard(seller));
