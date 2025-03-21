const bgMusic = new Audio("music.mp3");
const catchSound = new Audio("catch.mp3");

let score = 0;
let gameActive = false;
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const gameMessage = document.getElementById("game-message");
const startButton = document.getElementById("start-btn");
const harry = document.getElementById("harry");

let harryX = 50;

// ✅ Fix Start Button Issue
document.addEventListener("DOMContentLoaded", () => {
    startButton.addEventListener("click", startGame);
});

document.addEventListener("click", () => {
    bgMusic.play().catch(err => console.log("Music error:", err));
});

// ✅ Fix Character Movement
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && harryX > 10) {
        harryX -= 5;
    } else if (e.key === "ArrowRight" && harryX < 90) {
        harryX += 5;
    }
    harry.style.left = harryX + "%";
});

// ✅ Fix Snitch Falling and Limited Area
function spawnSnitch() {
    if (!gameActive) return;

    let snitch = document.createElement("img");
    snitch.src = "snitch.png";
    snitch.classList.add("snitch");

    let startX = Math.random() * 80 + 10; // Keep Snitch in field
    let startY = 0;

    snitch.style.left = startX + "%";
    snitch.style.top = startY + "%";
    gameContainer.appendChild(snitch);

    let fallInterval = setInterval(() => {
        startY += 2;
        snitch.style.top = startY + "%";

        // Remove Snitch if it reaches the ground
        if (startY >= 90) {
            clearInterval(fallInterval);
            snitch.remove();
        }
    }, 50);

    // ✅ Catching Snitch
    snitch.addEventListener("click", function () {
        if (gameActive) {
            score++;
            scoreDisplay.innerText = "Snitches Caught: " + score;
            snitch.classList.add("caught");
            catchSound.currentTime = 0;
            catchSound.play();
            setTimeout(() => {
                clearInterval(fallInterval);
                snitch.remove();
            }, 300);
            checkGameEnd();
        }
    });

    setTimeout(spawnSnitch, 1000);
}

// ✅ Fix Game End
function checkGameEnd() {
    if (score >= 10) {
        gameActive = false;
        gameMessage.innerText = "Congratulations! You caught 10 Snitches!";
        gameMessage.style.display = "block";
        startButton.style.display = "block";
    }
}

function startGame() {
    gameActive = true;
    score = 0;
    scoreDisplay.innerText = "Snitches Caught: 0";
    gameMessage.style.display = "none";
    startButton.style.display = "none";
    spawnSnitch();
}