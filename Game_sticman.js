let playerHP = 100;
let enemyHP = 100;
const playerHealthBar = document.getElementById('player-health');
const enemyHealthBar = document.getElementById('enemy-health');
const resultText = document.getElementById('result');

function updateBars() {
  playerHealthBar.style.width = playerHP + '%';
  playerHealthBar.style.background = playerHP > 30 ? 'green' : 'red';

  enemyHealthBar.style.width = enemyHP + '%';
  enemyHealthBar.style.background = enemyHP > 30 ? 'green' : 'red';
}

function attackEnemy() {
  if (playerHP <= 0 || enemyHP <= 0) return;

  const playerDamage = Math.floor(Math.random() * 20) + 5;
  const enemyDamage = Math.floor(Math.random() * 15) + 5;

  enemyHP -= playerDamage;
  if (enemyHP < 0) enemyHP = 0;

  updateBars();

  if (enemyHP === 0) {
    resultText.textContent = "🎉 Kamu Menang!";
    return;
  }

  // Musuh membalas
  setTimeout(() => {
    playerHP -= enemyDamage;
    if (playerHP < 0) playerHP = 0;
    updateBars();

    if (playerHP === 0) {
      resultText.textContent = "💀 Kamu Kalah!";
    }
  }, 500);
}

// Inisialisasi
updateBars();