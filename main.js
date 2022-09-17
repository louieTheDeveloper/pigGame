'use strict';

// selecting element
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlyer, playing;

const init = function () {
  //new game
  scores = [0, 0];
  currentScore = 0;
  activePlyer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  //switch
  document.getElementById(`current--${activePlyer}`).textContent = 0;
  currentScore = 0;
  activePlyer = activePlyer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // it will hide/remove couz the player 0 has the player--active
  player1El.classList.toggle('player--active'); // then it will be add to this player1El couz this class have not player--active
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate randome dice
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;

    // display randomdicenumber
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDiceNumber}.png`;

    // check if 1 then switch to player
    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber;
      document.getElementById(`current--${activePlyer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlyer] += currentScore;
    document.getElementById(`score--${activePlyer}`).textContent =
      scores[activePlyer];

    if (scores[activePlyer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlyer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlyer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
      diceEl.classList.add('hidden');
    }
  }
});

btnNew.addEventListener('click', init);
