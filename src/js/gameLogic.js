export const cells = Array.from(document.querySelectorAll('.field-cell'));
let interval = null;
function randomNum() {
  return Math.floor(Math.random() * cells.length);
}
let num = randomNum();
function deleteDevil() {
  cells[num].classList.remove('devil');
}

export function devilRise() {
  const newnum = randomNum();
  if (newnum === num) {
    devilRise();
  } else {
    num = newnum;
  }
  cells[num].classList.add('devil');
  const del = () => setTimeout(deleteDevil, 700);
  del();
}

export function startGame() {
  interval = setInterval(devilRise, 1500);
}
export function stop() {
  clearInterval(interval);
}

startGame();
