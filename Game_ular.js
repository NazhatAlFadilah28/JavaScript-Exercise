document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const scoreDisplay = document.getElementById('score');
  const highScoreDisplay = document.getElementById('high-score');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');

  const upBtn = document.getElementById('up-btn');
  const downBtn = document.getElementById('down-btn');
  const leftBtn = document.getElementById('left-btn');
  const rightBtn = document.getElementById('right-btn');

  const gridSize = 20;
  const tileCount = canvas.width / gridSize;
  let speed = 7;

  let snake = [];
  let food = {};
  let direction = 'right';
  let nextDirection = 'right';
  let score = 0;
  let highScore = localStorage.getItem('snakeHighScore') || 0;
  let gameRunning = false;
  let gameLoop;

  highScoreDisplay.textContent = highScore;
  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);

  document.addEventListener('keydown', changeDirection);

  upBtn.addEventListener('click', () => changeDirection({ keyCode: 38 }));
  downBtn.addEventListener('click', () => changeDirection({ keyCode: 40 }));
  leftBtn.addEventListener('click', () => changeDirection({ keyCode: 37 }));
  rightBtn.addEventListener('click', () => changeDirection({ keyCode: 39 }));
  
  function startGame() {
      if (gameRunning) return;

      snake = [];
      direction = 'right';
      nextDirection = 'right';
      score = 0;
      scoreDisplay.textContent = score;

      for (let i = 3; i >= 0; i--) {
          snake.push({ x: i, y: 0 });
      }

      createFood();
      
      gameRunning = true;
      startBtn.disabled = true;
      gameLoop = setInterval(gameStep, 1000 / speed);
  }
  
  function resetGame() {
      clearInterval(gameLoop);
      gameRunning = false;
      startBtn.disabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  function gameStep() {
      direction = nextDirection;
      const head = { x: snake[0].x, y: snake[0].y };
      
      switch (direction) {
          case 'up':
              head.y--;
              break;
          case 'down':
              head.y++;
              break;
          case 'left':
              head.x--;
              break;
          case 'right':
              head.x++;
              break;
      }

      if (
          head.x < 0 || head.x >= tileCount || 
          head.y < 0 || head.y >= tileCount ||
          collision(head, snake)
      ) {
          gameOver();
          return;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
          score++;
          scoreDisplay.textContent = score;
          
          if (score > highScore) {
              highScore = score;
              highScoreDisplay.textContent = highScore;
              localStorage.setItem('snakeHighScore', highScore);
          }
          
          createFood();
      } else {

          snake.pop();
      }

      drawGame();
  }
  
  function drawGame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#2ecc71';
      snake.forEach(segment => {
          ctx.fillRect(
              segment.x * gridSize, 
              segment.y * gridSize, 
              gridSize - 1, 
              gridSize - 1
          );

          if (segment === snake[0]) {
              ctx.fillStyle = 'white';

              let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
              
              switch (direction) {
                  case 'up':
                      leftEyeX = segment.x * gridSize + 5;
                      leftEyeY = segment.y * gridSize + 5;
                      rightEyeX = segment.x * gridSize + gridSize - 10;
                      rightEyeY = segment.y * gridSize + 5;
                      break;
                  case 'down':
                      leftEyeX = segment.x * gridSize + 5;
                      leftEyeY = segment.y * gridSize + gridSize - 10;
                      rightEyeX = segment.x * gridSize + gridSize - 10;
                      rightEyeY = segment.y * gridSize + gridSize - 10;
                      break;
                  case 'left':
                      leftEyeX = segment.x * gridSize + 5;
                      leftEyeY = segment.y * gridSize + 5;
                      rightEyeX = segment.x * gridSize + 5;
                      rightEyeY = segment.y * gridSize + gridSize - 10;
                      break;
                  case 'right':
                      leftEyeX = segment.x * gridSize + gridSize - 10;
                      leftEyeY = segment.y * gridSize + 5;
                      rightEyeX = segment.x * gridSize + gridSize - 10;
                      rightEyeY = segment.y * gridSize + gridSize - 10;
                      break;
              }
              
              ctx.fillRect(leftEyeX, leftEyeY, 5, 5);
              ctx.fillRect(rightEyeX, rightEyeY, 5, 5);
              ctx.fillStyle = '#2ecc71';
          }
      });

      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(
          food.x * gridSize + gridSize / 2, 
          food.y * gridSize + gridSize / 2, 
          gridSize / 2 - 1, 
          0, 
          Math.PI * 2
      );
      ctx.fill();
  }
  
  function createFood() {
      food = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
      };

      for (let i = 0; i < snake.length; i++) {
          if (food.x === snake[i].x && food.y === snake[i].y) {
              createFood();
              return;
          }
      }
  }
  
  function changeDirection(e) {
      if (!gameRunning) return;
      
      const key = e.keyCode;
      
      if (key === 37 && direction !== 'right') {
          nextDirection = 'left';
      } else if (key === 38 && direction !== 'down') {
          nextDirection = 'up';
      } else if (key === 39 && direction !== 'left') {
          nextDirection = 'right';
      } else if (key === 40 && direction !== 'up') {
          nextDirection = 'down';
      }
  }
  
  function collision(head, array) {
      for (let i = 0; i < array.length; i++) {
          if (head.x === array[i].x && head.y === array[i].y) {
              return true;
          }
      }
      return false;
  }
  
  function gameOver() {
      clearInterval(gameLoop);
      gameRunning = false;
      startBtn.disabled = false;

      let flashCount = 0;
      const flashInterval = setInterval(() => {
          if (flashCount % 2 === 0) {
              ctx.fillStyle = 'rgba(231, 76, 60, 0.5)';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
          } else {
              drawGame();
          }
          
          flashCount++;
          if (flashCount > 6) {
              clearInterval(flashInterval);
              drawGame();
          }
      }, 200);
  }
});