document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  // Définir les dimensions du canvas en fonction de sa taille CSS
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let dino = { x: 50, y: canvas.height - 60, width: 40, height: 40, dy: 0, jumping: false };
  let obstacles = [];
  let frame = 0;
  let gameRunning = true;

  // Fonction pour dessiner le dino
  function drawDino() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
  }

  // Fonction pour dessiner les obstacles
  function drawObstacles() {
    ctx.fillStyle = "#ff6347";
    obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
  }

  // Fonction pour mettre à jour la position du dino
  function updateDino() {
    if (dino.jumping) {
      dino.dy += 1.5; // Gravité
      dino.y += dino.dy;

      if (dino.y >= canvas.height - dino.height) {
        dino.y = canvas.height - dino.height;
        dino.jumping = false;
        dino.dy = 0;
      }
    }
  }

  // Fonction pour créer de nouveaux obstacles
  function createObstacle() {
    obstacles.push({
      x: canvas.width,
      y: canvas.height - 40,
      width: 20,
      height: 40
    });
  }

  // Fonction pour mettre à jour les obstacles
  function updateObstacles() {
    obstacles.forEach(obstacle => obstacle.x -= 5);
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
  }

  // Détecter les collisions
  function checkCollision() {
    obstacles.forEach(obstacle => {
      if (
        dino.x < obstacle.x + obstacle.width &&
        dino.x + dino.width > obstacle.x &&
        dino.y < obstacle.y + obstacle.height &&
        dino.y + dino.height > obstacle.y
      ) {
        gameRunning = false;
        alert("Game Over!");
      }
    });
  }

  // Boucle de jeu
  function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawDino();
    drawObstacles();
    updateDino();
    updateObstacles();
    checkCollision();

    frame++;
    if (frame % 100 === 0) createObstacle();

    requestAnimationFrame(gameLoop);
  }

  // Démarrer le saut
  function jump() {
    if (!dino.jumping) {
      dino.jumping = true;
      dino.dy = -20;
    }
  }

  // Lancer le jeu
  gameLoop();

  // Événements pour le saut (tactile et bouton)
  document.getElementById("jump-button").addEventListener("click", jump);
  canvas.addEventListener("touchstart", jump);
});
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let dino = { x: 50, y: canvas.height - 60, width: 40, height: 40, dy: 0, jumping: false };
let obstacles = [];
let frame = 0;
let gameRunning = true;

// Fonction pour dessiner le dino
function drawDino() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

// Fonction pour dessiner les obstacles
function drawObstacles() {
  ctx.fillStyle = "#ff6347";
  obstacles.forEach(obstacle => ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height));
}

// Fonction pour mettre à jour la position du dino
function updateDino() {
  if (dino.jumping) {
    dino.dy += 1.5; // Gravité
    dino.y += dino.dy;
    
    if (dino.y >= canvas.height - dino.height) {
      dino.y = canvas.height - dino.height;
      dino.jumping = false;
      dino.dy = 0;
    }
  }
}

// Fonction pour créer de nouveaux obstacles
function createObstacle() {
  obstacles.push({
    x: canvas.width,
    y: canvas.height - 40,
    width: 20,
    height: 40
  });
}

// Fonction pour mettre à jour les obstacles
function updateObstacles() {
  obstacles.forEach(obstacle => obstacle.x -= 5);
  obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

// Détecter les collisions
function checkCollision() {
  obstacles.forEach(obstacle => {
    if (
      dino.x < obstacle.x + obstacle.width &&
      dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height &&
      dino.y + dino.height > obstacle.y
    ) {
      gameRunning = false;
      alert("Game Over!");
    }
  });
}

// Boucle de jeu
function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawDino();
  drawObstacles();
  updateDino();
  updateObstacles();
  checkCollision();

  frame++;
  if (frame % 100 === 0) createObstacle();

  requestAnimationFrame(gameLoop);
}

// Démarrer le saut
function jump() {
  if (!dino.jumping) {
    dino.jumping = true;
    dino.dy = -20;
  }
}

// Lancer le jeu
gameLoop();

// Événements pour le saut (tactile et bouton)
document.getElementById("jump-button").addEventListener("click", jump);
canvas.addEventListener("touchstart", jump);
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
