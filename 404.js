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
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") jump();
  });
});
