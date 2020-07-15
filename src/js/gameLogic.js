import { GameField } from './GameField';

let tmp;
let interval = null;
const dead = document.querySelector('.dead');
const miss = document.querySelector('.miss');
const congrat = document.querySelector('.congratulations');
const defeat = document.querySelector('.defeat');
const clearCount = document.querySelector('.clear-score-button');
const endgame = document.querySelector('.end-game-button');
const nextTry = document.querySelectorAll('.newgame');
const field = new GameField();
let deadCount = 0;
let missCount = 0;

export function stop() {
  clearInterval(interval);
}

function randomNum() {
  return Math.floor(Math.random() * field.fielCells.length);
}

function pointsDisplay() {
  dead.textContent = deadCount;
  miss.textContent = missCount;
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

let num = randomNum();
export function deleteDevil() {
  field.fielCells[num].classList.remove('devil');
  if (tmp === deadCount) {
    console.log('промах');
  } else console.log('попадание');
  missCount += 1;
  pointsDisplay();
  checkState();
}

export function devilRise() {
  tmp = deadCount;
  const newnum = randomNum();
  if (newnum === num) {
    devilRise();
  } else {
    num = newnum;
  }
  field.fielCells[num].classList.add('devil');
  const del = () => setTimeout(deleteDevil, 1000);
  del();
}

export function startGame() {
  interval = setInterval(devilRise, 2000);
}

function clearCounter() {
  deadCount = 0;
  missCount = 0;
  pointsDisplay();
}


field.fielCells.forEach((item) => {
  item.addEventListener('click', ((ev) => {
    if (ev.target.classList.contains('devil')) {
      // eslint-disable-next-line no-plusplus
      deadCount++;
      deleteDevil();
    } else {
      // eslint-disable-next-line no-plusplus
      missCount++;
    }
    pointsDisplay();
    checkState();
  }));
});

// eslint-disable-next-line no-unused-vars
clearCount.addEventListener('click', (ev) => {
  clearCounter();
});

// eslint-disable-next-line no-unused-vars
endgame.addEventListener('click', (ev) => {
  endGameFunc();
});

// eslint-disable-next-line no-unused-vars
nextTry.forEach((item) => item.addEventListener('click', (ev) => {
  defeat.classList.add('hided');
  congrat.classList.add('hided');
  clearCounter();
  startGame();
}));

startGame();
