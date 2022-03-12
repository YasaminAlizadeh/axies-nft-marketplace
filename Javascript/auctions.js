// --------- Show a random remaining time on NFT Cards

const cardTimeGenerator = (currentPage) => {
  NFTdata.map((element) => {
    if (element.remaining_time === null) {
      element.remaining_time = {
        days: Math.floor(Math.random() * 10),
        hours: Math.floor(Math.random() * 23),
        minutes: Math.floor(Math.random() * 59),
        seconds: Math.floor(Math.random() * 59),
      };
    }
  });

  const timeContainers = [
    ...document.getElementsByClassName("card__time--text"),
  ];

  const timeToString = (day, hour, minute, second) => {
    const generatedString = `${day} : ${hour < 10 ? "0" + hour : hour} : ${
      minute < 10 ? "0" + minute : minute
    } : ${second < 10 ? "0" + second : second}`;

    return generatedString;
  };

  timeContainers.forEach((element, index) => {
    let remainingTime = NFTdata[index * currentPage].remaining_time;
    let isTimeOver = false;

    let generatedTime = timeToString(
      remainingTime.days,
      remainingTime.hours,
      remainingTime.minutes,
      remainingTime.seconds
    );

    element.innerHTML = generatedTime;

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

      element.innerHTML = generatedTime;
    }, 1000);
  });
};

// --------- Add NFTs per Page

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

// --------- Update Auctions Section Contect

const updateAuctions = (currentPage) => {
  paginationBar();
  updateCardsPerPage();
  cardTimeGenerator(currentPage);
};

updateAuctions(1);
