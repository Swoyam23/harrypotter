const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const message = document.getElementById('message');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

let playerPosition = 160;
let heartsCaught = 0;
let gameActive = true;
let gameInterval;

// Move player with touch controls
leftBtn.addEventListener('click', () => movePlayer('left'));
rightBtn.addEventListener('click', () => movePlayer('right'));

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') movePlayer('left');
    if (event.key === 'ArrowRight') movePlayer('right');
});

function movePlayer(direction) {
    if (!gameActive) return;
    
    if (direction === 'left' && playerPosition > 0) {
        playerPosition -= 20;
    } else if (direction === 'right' && playerPosition < 320) {
        playerPosition += 20;
    }
    player.style.left = playerPosition + 'px';
}

// Function to create falling Snitches
function createHeart() {
    if (!gameActive) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 350 + 'px';
    heart.style.top = '0px';
    gameContainer.appendChild(heart);

    let fallInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(fallInterval);
            return;
        }

        let heartTop = parseInt(heart.style.top);
        if (heartTop < 480) {
            heart.style.top = (heartTop + 5) + 'px';
        } else {
            clearInterval(fallInterval);
            gameContainer.removeChild(heart);
        }

        // Collision detection
        let heartLeft = parseInt(heart.style.left);
        let playerLeft = parseInt(player.style.left);
        if (heartTop > 440 && Math.abs(heartLeft - playerLeft) < 60) { 
            heartsCaught++;
            gameContainer.removeChild(heart);
            clearInterval(fallInterval);
            updateMessage();
        }
    }, 50);
}

// Update message and stop the game
function updateMessage() {
    if (heartsCaught >= 10) {
        gameActive = false;
        clearInterval(gameInterval);

        document.querySelectorAll('.heart').forEach(heart => heart.remove());

        message.innerHTML = "You've caught all the Snitches! I hope you can forgive me ❤";
        message.style.display = 'block';
    }
}

// Start game when page loads
window.onload = () => {
    gameInterval = setInterval(createHeart, 1000);
};
