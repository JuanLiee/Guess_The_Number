let secretNumber;
let lives;
let score;
let bestScore = Number(localStorage.getItem("bestScore")) || 0;

const livesEl = document.getElementById("lives");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");
const messageEl = document.getElementById("message");
const hintEl = document.getElementById("hint");

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  lives = 5;
  score = 0;

  livesEl.textContent = lives;
  scoreEl.textContent = score;
  bestScoreEl.textContent = bestScore;
  messageEl.textContent = "Game started. try guess the number!!";
  hintEl.textContent = "Hint: None Hint";
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
}

function endGame(text) {
  messageEl.textContent = text;
  guessInput.disabled = true;
  guessBtn.disabled = true;
}

function updateBestScore() {
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    bestScoreEl.textContent = bestScore;
  }
}

function checkGuess() {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    messageEl.textContent = "Enter the valid number from 1 to 100";
    return;
  }

  if (guess === secretNumber) {
    score += lives * 20;
    scoreEl.textContent = score;
    updateBestScore();
    endGame(`🎉 Correct! The number is ${secretNumber}`);
    hintEl.textContent = "Hint: GG bro";
    return;
  }

  lives--;
  livesEl.textContent = lives;

  if (guess < secretNumber) {
    messageEl.textContent = "Too Small!";
  } else {
    messageEl.textContent = "Too Big!";
  }

  const distance = Math.abs(secretNumber - guess);

  if (distance <= 5) {
    hintEl.textContent = "Hint: Very Hot 🔥";
  } else if (distance <= 15) {
    hintEl.textContent = "Hint: Close Enough 👀";
  } else {
    hintEl.textContent = "Hint: Still Cold 😵";
  }

  if (lives === 0) {
    endGame(`💀 Game over! The number is ${secretNumber}`);
  }

  guessInput.value = "";
  guessInput.focus();
}

guessBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

restartBtn.addEventListener("click", startGame);

startGame();