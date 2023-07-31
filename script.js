"use strict";

//Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); //1 cách gọi khác (dùng cho ID)
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden"); //ẩn hình xúc sắc
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const switchPlayer = function () {
  currentScore = 0; //trả giá trị điểm xúc sắc về 0
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating a random dice roll (tạo 1 viên xúc sắc ngẫu nhiên)
    const dice = Math.trunc(Math.random() * 6) + 1; //tạo ngẫu nhiên xúc sắc (1-6)

    //2. Display dice (hiển thị xúc sắc)
    diceEl.classList.remove("hidden"); //bỏ lệnh ẩn hình xúc sắc
    diceEl.src = `dice-${dice}.png`; //cho ra hình ảnh xúc sắc theo random(1-6)

    //3. Check for rolled 1 (kiểm tra giá trị bằng 1)
    if (dice !== 1) {
      //Add dice to current score (thêm điểm tung được vào điểm hiện tại)
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player (chuyển sang người chơi tiếp theo)
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active player's score (cộng điểm hiện tại và điểm người chơi đang hoạt động)
    scores[activePlayer] += currentScore; //scores[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100 (kiểm tra số điểm thấp nhất là 100)
    // Finish the gam (kết thúc trò chơi)
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // Switch to the next player (đổi lượt chơi cho người tiếp theo)
      switchPlayer();
    }
  }
});

//New game
/* btnNew.addEventListener("click", function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add("hidden");
  });
*/

btnNew.addEventListener("click", init);
