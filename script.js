const snitch = document.getElementById('snitch');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

// Function to move the snitch randomly
function moveSnitch() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  snitch.style.left = `${x}px`;
  snitch.style.top = `${y}px`;
}

// Function to start the game
function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = `Snitches Caught: ${score}`;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  // Clear previous intervals
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  // Start moving the snitch
  gameInterval = setInterval(moveSnitch, 1000);

  // Start the timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      alert(`Game Over! You caught ${score} Golden Snitches.`);
    }
  }, 1000);
}

// Event listener for catching the snitch
snitch.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = `Snitches Caught: ${score}`;
  moveSnitch();
});

// Event listener for the start button
startBtn.addEventListener('click', startGame);
