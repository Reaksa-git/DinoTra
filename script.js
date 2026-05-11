const character = document.getElementById("character");
const block = document.getElementById("block");
const scoreBoard = document.getElementById("score-board");
const finishLine = document.getElementById("finish-line");
const message = document.getElementById("message");

let score = 0;
let gameActive = true;
const WINNING_SCORE = 100; // Reach this to see the Finish Line

block.classList.add("block-move");

function jump() {
    if (!gameActive) {
        location.reload(); // Restart on click if game over
        return;
    }
    if (!character.classList.contains("animate-jump")) {
        character.classList.add("animate-jump");
        setTimeout(() => {
            character.classList.remove("animate-jump");
        }, 500);
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
});

let checkDead = setInterval(function() {
    if (!gameActive) return;

    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    // Collision Detection
    if (blockLeft < 90 && blockLeft > 50 && characterBottom <= 40) {
        gameActive = false;
        block.style.animation = "none";
        block.style.display = "none";
        message.innerHTML = "❌ <span style='color:red'>OUCH!</span> Press Space to try again.";
    } else {
        score++;
        let displayScore = Math.floor(score / 10);
        scoreBoard.innerText = "Score: " + displayScore;

     // Inside the 'if (displayScore >= WINNING_SCORE)' block:
if (displayScore >= WINNING_SCORE) {
    gameActive = false;
    block.style.display = "none";
    finishLine.style.display = "flex";
    
    // This adds a gold glow to your image when you win!
    document.getElementById("dog-img").style.filter = "drop-shadow(0 0 10px gold)";
    
    message.innerHTML = "🎉 <span style='color:green'>YOU MADE IT!</span>";
}
    }
}, 10);