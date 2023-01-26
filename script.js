const cardsArray = [
  {
    name: "fire",
    img: "img/fire.png",
  },
  {
    name: "crab",
    img: "img/crab.png",
  },
  {
    name: "creeper",
    img: "img/creeper.png",
  },
  {
    name: "fin",
    img: "img/fin.png",
  },
  {
    name: "youtube",
    img: "img/youtube.png",
  },
  {
    name: "ufo",
    img: "img/ufo.png",
  },
  {
    name: "plant",
    img: "img/plant.png",
  },
  {
    name: "burger",
    img: "img/burger.png",
  },
];

/* MAIN JS HERE */
// hàm random array
// Array.sort(() => 0.5 - Math.random());
const grid = document.querySelector(".grid");
let count = 0;
let prevCard;
let firstGuess = "";
let secondGuess = "";
const delay = 1000;
// gộp 2 mảng lại: sữ dụng concat
const cardsArrayMerge = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

cardsArrayMerge.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = item.name;

  const front = document.createElement("div");
  front.classList.add("front");
  const back = document.createElement("div");
  back.classList.add("back");

  back.style.backgroundImage = `url(${item.img})`;
  /* hiện item ra bên ngoài */
  card.appendChild(front);
  card.appendChild(back);
  grid.appendChild(card);
});

function matchCards() {
  const selectedCard = document.querySelectorAll(".selected");
  [...selectedCard].forEach((item) => item.classList.add("matched"));
}

function resetCards() {
  count = 0;
  firstGuess = "";
  secondGuess = "";
  prevCard = null;
  const selectedCard = document.querySelectorAll(".selected");
  [...selectedCard].forEach((item) => item.classList.remove("selected"));
}

grid.addEventListener("click", function (e) {
  const clicked = e.target;
  if (
    clicked.nodeName === "SECTION" ||
    prevCard === clicked ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("matched")
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count == 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(matchCards, delay);
      }
      setTimeout(resetCards, delay);
    }
    prevCard = clicked;
  }
});
