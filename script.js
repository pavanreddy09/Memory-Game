const cards = [
  {
    name: "circle",
    img: "img/circle.jpg",
  },
  {
    name: "triangle",
    img: "img/triangle.jpg",
  },
  {
    name: "circle",
    img: "img/circle.jpg",
  },
  {
    name: "square",
    img: "img/square.jpg",
  },
  {
    name: "triangle",
    img: "img/triangle.jpg",
  },
  {
    name: "star",
    img: "img/star.jpg",
  },
  {
    name: "square",
    img: "img/square.jpg",
  },
  {
    name: "polygon",
    img: "img/polygon.jpg",
  },
  {
    name: "star",
    img: "img/star.jpg",
  },
  {
    name: "irregularpentagon",
    img: "img/irregular_pentagon.jpg",
  },
  {
    name: "polygon",
    img: "img/polygon.jpg",
  },
  {
    name: "irregularpentagon",
    img: "img/irregular_pentagon.jpg",
  },
];

cards.sort(() => 0.5 - Math.random());

const box = document.querySelector(".box");
const h2 = document.querySelector("h2");
let matchnum = document.querySelector(".matchnum");
let attemptnum = document.querySelector(".attemptnum");
const form = document.querySelector("form");
const input = document.querySelector("input");
const startdiv = document.querySelector(".start");
const bgtrans = document.querySelector(".bgtrans");
const finalresshow = document.querySelector(".final");
const finalresult = document.querySelector(".finalresult");

let cardSelected = [];
let cardSelectedId = [];
let matchedAll = [];

let matchedcards = 0;
let selectedAttempt = 0;
let attemptLeft = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value < 6 || input.value > 20) {
    alert("Enter Number Between 6 and 20");
  } else {
    attemptLeft = input.value;
    selectedAttempt = input.value;
    attemptnum.textContent = attemptLeft;
    startdiv.classList.add("hide");
    bgtrans.classList.add("hide");
  }
  input.value = "";
});

function createCards() {
  for (let i = 0; i < cards.length; i++) {
    const imgEle = document.createElement("img");
    imgEle.setAttribute("src", "img/all.jpg");
    imgEle.setAttribute("id", i);
    imgEle.addEventListener("click", rotateImg);
    box.appendChild(imgEle);
  }
}
createCards();

function rotateImg() {
  const imgid = this.id;
  this.setAttribute("src", `${cards[imgid].img}`);
  cardSelected.push(cards[imgid].name);
  cardSelectedId.push(imgid);
  if (cardSelected.length === 2) {
    setTimeout(findMatch, 500);
  }
}

function findMatch() {
  const allImg = document.querySelectorAll("img");
  const cardOne = cardSelectedId[0];
  const cardTwo = cardSelectedId[1];

  if (cardOne == cardTwo) {
    alert("Not Allowed To click on the same card");
    allImg[cardOne].setAttribute("src", "img/all.jpg");
    allImg[cardTwo].setAttribute("src", "img/all.jpg");
  } else if (cardSelected[0] == cardSelected[1]) {
    allImg[cardOne].setAttribute("src", "img/matched.jpg");
    allImg[cardTwo].setAttribute("src", "img/matched.jpg");
    matchedcards++;
    matchnum.textContent = matchedcards;
    attemptLeft--;
    allImg[cardOne].removeEventListener("click", rotateImg);
    allImg[cardTwo].removeEventListener("click", rotateImg);
    matchedAll.push(cardSelected);
  } else {
    allImg[cardOne].setAttribute("src", "img/all.jpg");
    allImg[cardTwo].setAttribute("src", "img/all.jpg");
    attemptLeft--;
  }
  cardSelected = [];
  cardSelectedId = [];

  attemptnum.textContent = attemptLeft;
  if (matchedAll.length === cards.length / 2) {
    finalresshow.classList.remove("hide");
    finalresult.innerHTML = `&#127882; Congrats! You matched All cards in ${
      selectedAttempt - attemptLeft
    } Attempts &#127881;`;
  }
  if (attemptLeft === 0) {
    finalresshow.classList.remove("hide");
    if (matchedcards === 0) {
      finalresult.innerHTML = `Oops! You have not matched any cards &#128529;`;
    } else {
      finalresult.innerHTML = `&#127881; Wow! Great You have matched ${matchedcards} card in ${
        selectedAttempt - attemptLeft
      } Attempts`;
    }
  }
}

function restart() {
  location.reload();
}
