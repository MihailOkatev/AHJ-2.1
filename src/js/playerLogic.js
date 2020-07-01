import { cells, startGame, stop } from './gameLogic';

const dead = document.querySelector('.dead');
const miss = document.querySelector('.miss');
const congrat = document.querySelector('.congratulations');
const defeat = document.querySelector('.defeat');
const clearCount = document.querySelector('.clear-score-button');
const endgame = document.querySelector('.end-game-button');
const nextTry = document.querySelectorAll('.newgame');

let deadCount = 0;
let missCount = 0;

function pointsDisplay() {
  dead.textContent = deadCount;
  miss.textContent = missCount;
}

function clearCounter() {
  deadCount = 0;
  missCount = 0;
  pointsDisplay();
}

function endGameFunc() {
  defeat.classList.remove('hided');
  stop();
}

function checkState() {
  if (deadCount === 10) {
    congrat.classList.remove('hided');
  }
  if (missCount === 5) {
    endGameFunc();
  }
}

cells.forEach((item) => {
  item.addEventListener('click', ((ev) => {
    if (ev.target.classList.contains('devil')) {
      // eslint-disable-next-line no-plusplus
      deadCount++;
    } else {
      // eslint-disable-next-line no-plusplus
      missCount++;
    }
    pointsDisplay();
    checkState();
  }));
});

clearCount.addEventListener('click', (ev) => {
  clearCounter();
});

endgame.addEventListener('click', (ev) => {
  endGameFunc();
});

nextTry.forEach((item) => item.addEventListener('click', (ev) => {
  defeat.classList.add('hided');
  clearCounter();
  startGame();
}));
