const cardsArray = [
  {
    name: "1",
    img: "img/1.jpg",
  },
  {
    name: "2",
    img: "img/2.jpg",
  },
  {
    name: "3",
    img: "img/3.jpg",
  },
  {
    name: "4",
    img: "img/4.png",
  },
  {
    name: "5",
    img: "img/5.png",
  },
  {
    name: "6",
    img: "img/6.jpg",
  },
  {
    name: "7",
    img: "img/7.jpg",
  },
  {
    name: "8",
    img: "img/8.png",
  },
];

/* MAIN JS HERE */
// hàm random array
// Array.sort(() => 0.5 - Math.random());
let count = 0;
let prevCard;
let firstGuess = "";
let secondGuess = "";
const delay = 600;
const closeIcon = document.querySelector(".close-icon");
const modal = document.querySelector(".modal");
const resetBtn = document.querySelector(".reset");
const grid = document.querySelector(".grid");
// gộp 2 mảng lại: sữ dụng concat
function generateCards() {
  grid.innerHTML = "";
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
}
generateCards();

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
  const matchedAll = document.querySelectorAll(".matched");
  const cardLength = document.querySelectorAll(".card").length;
  [...selectedCard].forEach((item) => item.classList.remove("selected"));
  // khi done game sẽ generate lại từ đầu
  if (matchedAll.length === cardLength) {
    modal.classList.add("show");
    resetBtn.addEventListener("click", resetGame);
    function resetGame() {
      setTimeout(
        matchedAll.forEach((el) => el.classList.remove("matched")),
        delay
      );
      setTimeout(generateCards, delay);
      modal.classList.remove("show");
    }
  }
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

closeIcon.addEventListener("click", function () {
  modal.classList.add("hide");
});
