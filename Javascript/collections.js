const generateCollectionCard = (data) => {
  const card = document.createElement("article");
  if (data.is_liked) {
    card.className += " article--liked";
  }
  card.id = data.id;

  let container;
  let element = `
    <div class="collection__img-container">
                <img
                  src="${AssetsDirectory}${data.images.img1}"
                  alt="popular collection"
                  class="collection__img collection__img--first"
                  loading="lazy"
                />
                <img
                  src="${AssetsDirectory}${data.images.img2}"
                  alt="popular collection"
                  class="collection__img collection__img--second"
                  loading="lazy"
                />
                <img
                  src="${AssetsDirectory}${data.images.img3}"
                  alt="popular collection"
                  class="collection__img collection__img--third"
                  loading="lazy"
                />
                <img
                  src="${AssetsDirectory}${data.images.img4}"
                  alt="popular collection"
                  class="collection__img collection__img--forth"
                  loading="lazy"
                />
                <img
                  src="${AssetsDirectory}${data.images.img5}"
                  alt="popular collection"
                  class="collection__img collection__img--fifth"
                  loading="lazy"
                />
              </div>
              <div class="collection__creator-info">
              <a href="#" class="collection__creator-link">
              <div class="collection__creator-img">
                  <img
                    src="${AssetsDirectory}${data.creator_img}"
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
              </div>`;

  container = document.querySelector("#collections-page");
  card.className = `article collection__card ${
    data.is_liked ? "article--liked" : ""
  }`;

  card.innerHTML = element;

  // Add Like functionality to Heart Buttons in Cards
  [...card.querySelectorAll(".article__likes")][0] &&
    [...card.querySelectorAll(".article__likes")][0].addEventListener(
      "click",
      (e) => likeFunction(e, [...collectionsData])
    );

  // Add Card to Page
  container.appendChild(card);
};

collectionsData.forEach((collection) => generateCollectionCard(collection));
