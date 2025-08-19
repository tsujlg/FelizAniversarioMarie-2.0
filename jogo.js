const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const gameOver = document.getElementById("gameOver");
const winScreen = document.getElementById("winScreen");
const scoreDisplay = document.getElementById("score");
const coinsDisplay = document.getElementById("coins");
const finalScore = document.getElementById("finalScore");
const finalScoreWin = document.getElementById("finalScoreWin");
const game = document.getElementById("game");

let score = 0;
let coins = 0;
let isJumping = false;
let gameInterval;
let scoreInterval;
let coinInterval;

// 🟢 Pulando com tempo de bloqueio reduzido
function jump() {
    if (!isJumping) {
        isJumping = true;
        character.classList.add("jump");
        setTimeout(() => {
            character.classList.remove("jump");
            isJumping = false;
        }, 400); // 🔥 Diminuiu de 500 para 400ms (mais rápido)
    }
}

// Teclado e toque para pular
document.addEventListener("keydown", e => {
    if (e.code === "Space" || e.code === "ArrowUp") jump();
});
game.addEventListener("touchstart", () => jump());
game.addEventListener("click", () => jump());

// 🪙 Gerar moedas em posição mais baixa e fácil de pegar
function spawnCoin() {
    const coin = document.createElement("div");
    coin.classList.add("coin");
    coin.innerText = "🪙";
    coin.style.left = "100%";
    coin.style.top = "100px"; // 🔥 Sempre na mesma altura, ao alcance do pulo
    game.appendChild(coin);

    const move = setInterval(() => {
        const coinLeft = parseInt(window.getComputedStyle(coin).getPropertyValue("left"));
        const coinTop = parseInt(window.getComputedStyle(coin).getPropertyValue("top"));
        const charTop = 220 - parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
        const charLeft = 50;

        if (
            coinLeft < charLeft + 30 &&
            coinLeft > charLeft - 20 &&
            Math.abs(coinTop - charTop) < 40
        ) {
            coin.remove();
            coins++;
            coinsDisplay.innerText = "Moedas: " + coins;

            if (coins >= 5) {
                clearInterval(gameInterval);
                clearInterval(scoreInterval);
                clearInterval(coinInterval);
                obstacle.style.animation = "none";
                winScreen.style.display = "block";
                finalScoreWin.innerText = `Pontuação: ${score}`;
            }
        }

        if (coinLeft < -20) {
            coin.remove();
            clearInterval(move);
        }
    }, 50);
}

function startGame() {
    score = 0;
    coins = 0;
    coinsDisplay.innerText = "Moedas: 0";
    scoreDisplay.innerText = "Pontos: 0";
    obstacle.style.animation = "obstacleMove 2s linear infinite";

    scoreInterval = setInterval(() => {
        score++;
        scoreDisplay.innerText = "Pontos: " + score;
    }, 100);

    gameInterval = setInterval(() => {
        const characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

        if (obstacleLeft < 70 && obstacleLeft > 50 && characterBottom < 40) {
            gameOver.style.display = "block";
            finalScore.innerText = `Sua pontuação: ${score}`;
            obstacle.style.animation = "none";
            obstacle.style.left = obstacleLeft + "px";
            clearInterval(gameInterval);
            clearInterval(scoreInterval);
            clearInterval(coinInterval);
        }
    }, 10);

    coinInterval = setInterval(spawnCoin, 1500);
}

function restart() {
    document.querySelectorAll(".coin").forEach(c => c.remove());
    gameOver.style.display = "none";
    winScreen.style.display = "none";
    obstacle.style.left = "100%";
    obstacle.style.animation = "obstacleMove 2s linear infinite";
    startGame();
}

window.onload = () => startGame();