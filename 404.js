const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 200;

let score = 0;
let gameOver = false;
let dino = {
    x: 50,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speedY: 0,
    gravity: 1.2,
    jumpHeight: -20,
    grounded: true
};

let obstacles = [];
let gameSpeed = 2;

document.addEventListener('keydown', jump);

function jump(e) {
    if (e.code === "Space" && !gameOver) {
        if (dino.grounded) {
            dino.speedY = dino.jumpHeight;
            dino.grounded = false;
        }
    }
}

function createObstacle() {
    const height = Math.random() * 30 + 20;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height,
        width: 20,
        height: height
    });
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= gameSpeed;
        
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
        }
    }
}

function updateDino() {
    if (!dino.grounded) {
        dino.speedY += dino.gravity;
    }
    dino.y += dino.speedY;

    if (dino.y >= canvas.height - dino.height) {
        dino.y = canvas.height - dino.height;
        dino.speedY = 0;
        dino.grounded = true;
    }
}

function drawDino() {
    ctx.fillStyle = "#333";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    ctx.fillStyle = "#000";
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    }
}

function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        if (
            dino.x + dino.width > obstacles[i].x &&
            dino.x < obstacles[i].x + obstacles[i].width &&
            dino.y + dino.height > obstacles[i].y
        ) {
            gameOver = true;
        }
    }
}

function drawScore() {
    document.getElementById("score").innerText = score;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        updateDino();
        updateObstacles();
        drawDino();
        drawObstacles();
        checkCollisions();
        drawScore();

        if (Math.random() < 0.02) {
            createObstacle();
        }

        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over! Score: " + score, canvas.width / 2 - 150, canvas.height / 2);
    }
}

gameLoop();
