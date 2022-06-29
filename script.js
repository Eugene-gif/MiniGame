const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeElement = document.querySelector("#time");
const board = document.querySelector("#board");
const buttonUp = document.querySelector(".button-up");
const restart = document.querySelector('.restart');
const colors = [
  "#d4531d",
  "#e1c133",
  "#49dc1e",
  "#19e4d4",
  "#14a3e8",
  "#1719e9",
  "#7b1be8",
  "#e31fc2",
  "#e41414",
  "#8446f7",
  "#30c7ec",
  "#c4e316",
];

let time = 0;
let score = 0;
startBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  screens[0].classList.remove("back");
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("time-btn")) {
    time = parseInt(evt.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("circle")) {
    score++;
    evt.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeElement.innerHTML = `00:${value}`;
}

function getRandColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.right = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.background = getRandColor();
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function finishGame() {
  timeElement.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Натыкано: <span class="primary">${score}</span></h1>`;
  displayBlock();
}

buttonUp.addEventListener("click", (evt) => {
  evt.preventDefault();
  
  screens[0].classList.remove("up");
  screens[0].classList.add("back");
});

restart.addEventListener('click', (evt) => {
  evt.preventDefault();
  window.location.reload();
})
/* <a class="restart" href="#" onclick="parent.location.reload(); return false;">
	Заново
</a> */
function displayBlock () {
  return restart.style.display = 'block';
}
