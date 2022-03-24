// --------- Show a random remaining time on NFT Cards

const RandomTimeGenerator = () => {
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
};
RandomTimeGenerator();

const timeToString = (day, hour, minute, second) => {
  const generatedString = `${day} : ${hour < 10 ? "0" + hour : hour} : ${
    minute < 10 ? "0" + minute : minute
  } : ${second < 10 ? "0" + second : second}`;

  return generatedString;
};

const cardTimeGenerator = (timeContainer) => {
  const index = NFTdata.findIndex(
    (element) =>
      element.id === timeContainer.parentNode.parentNode.parentNode.id
  );

  let remainingTime = NFTdata[index].remaining_time;
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

page.innerHTML = "";
for (let j = 0; j < NFTdata.length; j++) {
  generateCard("nft", NFTdata[j]);
}
