const { generateWAMessageFromContent } = require('../../lib/index.js');
const crypto = require('crypto');

/**
 * Creates an interactive Snake Game (HTML, CSS, JS) payload
 * rendered via the WhatsApp GenAI Unified Response HTML primitive.
 *
 * @param {string} [userName='Player'] - Display name of the user
 * @returns {object} WhatsApp message payload
 */

function createSnakePage(userName = 'Player') {
  const htmlPayload = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent; }
:root {
  --neon-green: #10b981;
  --neon-cyan: #06b6d4;
  --neon-pink: #ec4899;
  --neon-yellow: #fbbf24;
  --bg-dark: #070a12;
  --card-bg: rgba(15, 23, 42, 0.85);
  --border-glow: rgba(16, 185, 129, 0.4);
}
html, body {
  width: 100%;
  margin: 0;
  padding: 0;
  background: var(--bg-dark);
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
}
body {
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}
.game-container {
  width: 100%;
  max-width: 400px;
  background: radial-gradient(circle at 50% 0%, #064e3b 0%, #0b1522 55%, #030712 100%);
  border: 2px solid var(--border-glow);
  border-radius: 20px;
  padding: 12px;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.25), inset 0 0 15px rgba(6, 182, 212, 0.15);
  position: relative;
  overflow: hidden;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
  border-radius: 9px;
  display: grid;
  place-items: center;
  font-size: 17px;
  box-shadow: 0 0 12px var(--neon-green);
}
.brand-title {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #fff, var(--neon-green), var(--neon-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.player-pill {
  font-size: 11px;
  font-weight: 700;
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 3px 9px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.player-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10b981;
  animation: blink 1.2s infinite;
}
@keyframes blink { 50% { opacity: 0.3; } }

/* Stats Bar */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
}
.stat-box {
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 5px 3px;
  text-align: center;
}
.stat-label {
  font-size: 9px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
}
.stat-val {
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  margin-top: 1px;
}
.stat-box.highlight .stat-val { color: var(--neon-yellow); text-shadow: 0 0 6px var(--neon-yellow); }

/* Canvas Arena */
.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 280px;
  background: #030712;
  border: 2px solid rgba(16, 185, 129, 0.35);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.9), 0 0 15px rgba(16, 185, 129, 0.15);
  margin-bottom: 10px;
}
#snakeCanvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Overlays */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  z-index: 10;
}
.overlay.hidden { display: none !important; }
.overlay-title {
  font-size: 22px;
  font-weight: 900;
  color: #fff;
  margin-bottom: 4px;
  text-shadow: 0 0 12px var(--neon-green);
}
.overlay-title.gameover {
  color: #ef4444;
  text-shadow: 0 0 12px #ef4444;
}
.overlay-subtitle {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 12px;
}
.overlay-stats {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 8px 14px;
  margin-bottom: 14px;
  font-size: 12px;
  width: 85%;
  display: flex;
  justify-content: space-between;
}
.btn-play {
  background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
  color: #030712;
  border: none;
  font-weight: 900;
  font-size: 13px;
  padding: 10px 24px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.5);
  touch-action: manipulation;
}
.btn-play:active {
  transform: scale(0.95);
  filter: brightness(1.2);
}

/* Speed / Difficulty Selector */
.difficulty-selector {
  display: flex;
  gap: 5px;
  margin-bottom: 12px;
}
.diff-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.diff-btn.active {
  background: rgba(16, 185, 129, 0.25);
  border-color: var(--neon-green);
  color: #fff;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
}

/* On-Screen D-Pad Controls */
.controls-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
}
.dpad {
  display: grid;
  grid-template-columns: repeat(3, 44px);
  grid-template-rows: repeat(3, 44px);
  gap: 5px;
  justify-content: center;
  align-items: center;
}
.dpad-btn {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.95));
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #f8fafc;
  font-size: 17px;
  font-weight: 900;
  border-radius: 10px;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
  width: 44px;
  height: 44px;
  touch-action: manipulation;
}
.dpad-btn:active {
  transform: scale(0.92);
  background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
  color: #030712;
  box-shadow: 0 0 12px var(--neon-green);
}
.dpad-up    { grid-column: 2; grid-row: 1; }
.dpad-left  { grid-column: 1; grid-row: 2; }
.dpad-pause { grid-column: 2; grid-row: 2; font-size: 12px; border-radius: 50%; width: 38px; height: 38px; margin: auto; }
.dpad-right { grid-column: 3; grid-row: 2; }
.dpad-down  { grid-column: 2; grid-row: 3; }

/* Footer */
.footer {
  text-align: center;
  font-size: 9px;
  color: #64748b;
  margin-top: 8px;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
}
</style>
</head>
<body>

<div class="game-container">
  <!-- Header -->
  <div class="header">
    <div class="brand">
      <div class="brand-icon">🐍</div>
      <div class="brand-title">CYBERSNAKE</div>
    </div>
    <div class="player-pill">
      <span class="player-dot"></span>
      <span>${userName}</span>
    </div>
  </div>

  <!-- Stats -->
  <div class="stats-bar">
    <div class="stat-box highlight">
      <div class="stat-label">Score</div>
      <div class="stat-val" id="scoreVal">0</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">High</div>
      <div class="stat-val" id="highVal">0</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Length</div>
      <div class="stat-val" id="lenVal">3</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Speed</div>
      <div class="stat-val" id="speedVal">1x</div>
    </div>
  </div>

  <!-- Arena -->
  <div class="canvas-wrapper">
    <canvas id="snakeCanvas"></canvas>

    <!-- Start Overlay -->
    <div class="overlay" id="startOverlay">
      <div class="overlay-title">🐍 CYBERSNAKE</div>
      <div class="overlay-subtitle">Collect energy nodes and beat the high score!</div>
      <div class="difficulty-selector">
        <button class="diff-btn" id="diffChill">Chill</button>
        <button class="diff-btn active" id="diffNormal">Normal</button>
        <button class="diff-btn" id="diffHyper">Hyper</button>
      </div>
      <button class="btn-play" id="btnStart">PLAY NOW</button>
    </div>

    <!-- Game Over Overlay -->
    <div class="overlay hidden" id="gameOverOverlay">
      <div class="overlay-title gameover">GAME OVER</div>
      <div class="overlay-subtitle" id="gameOverReason">Collision detected!</div>
      <div class="overlay-stats">
        <span>Final Score: <b id="finalScore" style="color: var(--neon-yellow);">0</b></span>
        <span>High Score: <b id="finalHigh" style="color: #34d399;">0</b></span>
      </div>
      <button class="btn-play" id="btnRetry">RETRY</button>
    </div>

    <!-- Pause Overlay -->
    <div class="overlay hidden" id="pauseOverlay">
      <div class="overlay-title">⏸️ PAUSED</div>
      <div class="overlay-subtitle">Game is paused</div>
      <button class="btn-play" id="btnResume">RESUME</button>
    </div>
  </div>

  <!-- D-Pad Controls -->
  <div class="controls-container">
    <div class="dpad">
      <button class="dpad-btn dpad-up" id="btnUp">▲</button>
      <button class="dpad-btn dpad-left" id="btnLeft">◀</button>
      <button class="dpad-btn dpad-pause" id="btnPause">⏸️</button>
      <button class="dpad-btn dpad-right" id="btnRight">▶</button>
      <button class="dpad-btn dpad-down" id="btnDown">▼</button>
    </div>
  </div>

  <div class="footer">
    ⚡ INNOVATORS BAILEYS · HTML5 CANVAS SNAKE
  </div>
</div>

<script>
(function() {
  var canvas = document.getElementById('snakeCanvas');
  var ctx = canvas.getContext('2d');

  var COLS = 20;
  var ROWS = 18;
  var cellW = 15;
  var cellH = 15;

  var snake = [];
  var direction = 'RIGHT';
  var nextDirection = 'RIGHT';
  var food = { x: 10, y: 9, type: 'normal' };
  var bonusFood = null;
  var bonusTimer = null;
  var particles = [];
  var popups = [];
  var score = 0;
  var high = 0;

  try {
    high = parseInt(localStorage.getItem('cybersnake_high') || '0', 10) || 0;
  } catch (e) {
    high = 0;
  }
  document.getElementById('highVal').textContent = high;

  var gameSpeed = 110; // ms per tick
  var isRunning = false;
  var isPaused = false;
  var lastTick = 0;
  var animFrameId = null;

  // Safe Draw Rounded Rect helper
  function drawRoundedRect(ctx, x, y, w, h, r) {
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
    }
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || canvas.parentElement.clientWidth || 340;
    var h = rect.height || canvas.parentElement.clientHeight || 280;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cellW = w / COLS;
    cellH = h / ROWS;

    draw(w, h);
  }

  window.addEventListener('resize', resize);
  setTimeout(resize, 30);

  function setDifficulty(level, speed) {
    document.querySelectorAll('.diff-btn').forEach(function(b) { b.classList.remove('active'); });
    var btn = document.getElementById('diff' + level.charAt(0).toUpperCase() + level.slice(1));
    if (btn) btn.classList.add('active');
    gameSpeed = speed;
    var speedLabels = { 'chill': '0.8x', 'normal': '1.0x', 'hyper': '1.4x' };
    document.getElementById('speedVal').textContent = speedLabels[level] || '1.0x';
  }

  document.getElementById('diffChill').onclick = function() { setDifficulty('chill', 145); };
  document.getElementById('diffNormal').onclick = function() { setDifficulty('normal', 110); };
  document.getElementById('diffHyper').onclick = function() { setDifficulty('hyper', 75); };

  function startGame() {
    document.getElementById('startOverlay').classList.add('hidden');
    document.getElementById('gameOverOverlay').classList.add('hidden');
    document.getElementById('pauseOverlay').classList.add('hidden');

    snake = [
      { x: 5, y: 9 },
      { x: 4, y: 9 },
      { x: 3, y: 9 }
    ];
    direction = 'RIGHT';
    nextDirection = 'RIGHT';
    score = 0;
    particles = [];
    popups = [];
    bonusFood = null;
    clearTimeout(bonusTimer);

    updateStats();
    spawnFood();
    scheduleBonus();

    isRunning = true;
    isPaused = false;
    lastTick = performance.now();

    if (animFrameId) cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(gameLoop);
  }

  function togglePause() {
    if (!isRunning) return;
    isPaused = !isPaused;
    var pauseEl = document.getElementById('pauseOverlay');
    if (isPaused) {
      pauseEl.classList.remove('hidden');
    } else {
      pauseEl.classList.add('hidden');
      lastTick = performance.now();
      animFrameId = requestAnimationFrame(gameLoop);
    }
  }

  function gameOver(reason) {
    isRunning = false;
    clearTimeout(bonusTimer);

    if (score > high) {
      high = score;
      try {
        localStorage.setItem('cybersnake_high', high);
      } catch (e) {}
    }

    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalHigh').textContent = high;
    document.getElementById('gameOverReason').textContent = reason || 'Collision detected!';
    document.getElementById('gameOverOverlay').classList.remove('hidden');
  }

  function spawnFood() {
    var valid = false;
    var attempts = 0;
    while (!valid && attempts < 100) {
      attempts++;
      food = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
      };
      valid = !snake.some(function(seg) { return seg.x === food.x && seg.y === food.y; });
    }
  }

  function scheduleBonus() {
    clearTimeout(bonusTimer);
    bonusTimer = setTimeout(function() {
      if (!isRunning || isPaused) return;
      var valid = false;
      var pos = { x: 0, y: 0 };
      var attempts = 0;
      while (!valid && attempts < 100) {
        attempts++;
        pos = {
          x: Math.floor(Math.random() * COLS),
          y: Math.floor(Math.random() * ROWS)
        };
        valid = !snake.some(function(seg) { return seg.x === pos.x && seg.y === pos.y; }) &&
                (pos.x !== food.x || pos.y !== food.y);
      }
      bonusFood = { x: pos.x, y: pos.y, expires: performance.now() + 7000 };

      setTimeout(function() {
        bonusFood = null;
        scheduleBonus();
      }, 7000);
    }, Math.floor(Math.random() * 8000) + 6000);
  }

  function addParticles(x, y, color) {
    var px = (x + 0.5) * cellW;
    var py = (y + 0.5) * cellH;
    for (var i = 0; i < 12; i++) {
      particles.push({
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        size: Math.random() * 3 + 2,
        life: 1,
        color: color
      });
    }
  }

  function addPopup(x, y, text, color) {
    popups.push({
      x: (x + 0.5) * cellW,
      y: (y + 0.5) * cellH,
      text: text,
      color: color,
      life: 1
    });
  }

  function gameLoop(now) {
    if (!isRunning || isPaused) return;

    if (now - lastTick >= gameSpeed) {
      lastTick = now;
      tick();
    }

    var rect = canvas.getBoundingClientRect();
    var w = rect.width || 340;
    var h = rect.height || 280;
    draw(w, h);

    if (isRunning && !isPaused) {
      animFrameId = requestAnimationFrame(gameLoop);
    }
  }

  function tick() {
    direction = nextDirection;
    var head = { x: snake[0].x, y: snake[0].y };

    if (direction === 'UP') head.y--;
    else if (direction === 'DOWN') head.y++;
    else if (direction === 'LEFT') head.x--;
    else if (direction === 'RIGHT') head.x++;

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      gameOver('Crashed into the grid barrier!');
      return;
    }

    // Self collision
    if (snake.some(function(seg) { return seg.x === head.x && seg.y === head.y; })) {
      gameOver('Collided with your own tail!');
      return;
    }

    snake.unshift(head);

    // Eat Normal Food
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      addParticles(food.x, food.y, '#10b981');
      addPopup(food.x, food.y, '+10', '#10b981');
      spawnFood();
      updateStats();
    }
    // Eat Bonus Star
    else if (bonusFood && head.x === bonusFood.x && head.y === bonusFood.y) {
      score += 50;
      addParticles(bonusFood.x, bonusFood.y, '#fbbf24');
      addPopup(bonusFood.x, bonusFood.y, '⭐ +50', '#fbbf24');
      bonusFood = null;
      scheduleBonus();
      updateStats();
    }
    else {
      snake.pop();
    }
  }

  function updateStats() {
    document.getElementById('scoreVal').textContent = score;
    document.getElementById('lenVal').textContent = snake.length;
    if (score > high) {
      high = score;
      document.getElementById('highVal').textContent = high;
    }
  }

  function handleDirection(dir) {
    if (!isRunning) {
      startGame();
      return;
    }
    if (isPaused) {
      togglePause();
    }
    if (dir === 'UP' && direction !== 'DOWN') nextDirection = 'UP';
    else if (dir === 'DOWN' && direction !== 'UP') nextDirection = 'DOWN';
    else if (dir === 'LEFT' && direction !== 'RIGHT') nextDirection = 'LEFT';
    else if (dir === 'RIGHT' && direction !== 'LEFT') nextDirection = 'RIGHT';
  }

  // Bind Buttons
  document.getElementById('btnStart').onclick = startGame;
  document.getElementById('btnRetry').onclick = startGame;
  document.getElementById('btnResume').onclick = togglePause;
  document.getElementById('btnPause').onclick = togglePause;

  function bindDir(id, dir) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('pointerdown', function(e) {
      e.preventDefault();
      handleDirection(dir);
    });
  }
  bindDir('btnUp', 'UP');
  bindDir('btnDown', 'DOWN');
  bindDir('btnLeft', 'LEFT');
  bindDir('btnRight', 'RIGHT');

  // Keyboard controls
  window.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowUp' || e.code === 'KeyW') handleDirection('UP');
    else if (e.code === 'ArrowDown' || e.code === 'KeyS') handleDirection('DOWN');
    else if (e.code === 'ArrowLeft' || e.code === 'KeyA') handleDirection('LEFT');
    else if (e.code === 'ArrowRight' || e.code === 'KeyD') handleDirection('RIGHT');
    else if (e.code === 'Space' || e.code === 'KeyP') togglePause();
  });

  // Touch Swipe on Canvas
  var touchStartX = 0, touchStartY = 0;
  canvas.addEventListener('touchstart', function(e) {
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', function(e) {
    if (e.changedTouches && e.changedTouches[0]) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 20) handleDirection('RIGHT');
        else if (dx < -20) handleDirection('LEFT');
      } else {
        if (dy > 20) handleDirection('DOWN');
        else if (dy < -20) handleDirection('UP');
      }
    }
  }, { passive: true });

  function draw(w, h) {
    ctx.clearRect(0, 0, w, h);

    // Subtle Grid
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.07)';
    ctx.lineWidth = 1;
    for (var c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellW, 0);
      ctx.lineTo(c * cellW, h);
      ctx.stroke();
    }
    for (var r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellH);
      ctx.lineTo(w, r * cellH);
      ctx.stroke();
    }

    // Normal Food
    if (food) {
      var fx = food.x * cellW + cellW / 2;
      var fy = food.y * cellH + cellH / 2;
      var rad = Math.min(cellW, cellH) * 0.38;

      ctx.save();
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(fx, fy, rad, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(fx - rad * 0.3, fy - rad * 0.3, rad * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Bonus Star Food
    if (bonusFood) {
      var bx = (bonusFood.x + 0.5) * cellW;
      var by = (bonusFood.y + 0.5) * cellH;
      ctx.save();
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 14;
      ctx.font = Math.floor(Math.min(cellW, cellH) * 0.95) + 'px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⭐', bx, by);
      ctx.restore();
    }

    // Snake
    snake.forEach(function(seg, idx) {
      var sx = seg.x * cellW;
      var sy = seg.y * cellH;
      var pad = 1.2;
      var sw = cellW - pad * 2;
      var sh = cellH - pad * 2;

      ctx.save();
      if (idx === 0) {
        // Head
        ctx.fillStyle = '#34d399';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 12;
        drawRoundedRect(ctx, sx + pad, sy + pad, sw, sh, 5);

        // Eyes
        ctx.fillStyle = '#030712';
        var eyeSize = Math.max(1.5, Math.min(cellW, cellH) * 0.16);
        if (direction === 'RIGHT' || direction === 'LEFT') {
          var ex = direction === 'RIGHT' ? sx + cellW * 0.68 : sx + cellW * 0.25;
          ctx.beginPath();
          ctx.arc(ex, sy + cellH * 0.3, eyeSize, 0, Math.PI * 2);
          ctx.arc(ex, sy + cellH * 0.7, eyeSize, 0, Math.PI * 2);
          ctx.fill();
        } else {
          var ey = direction === 'DOWN' ? sy + cellH * 0.68 : sy + cellH * 0.25;
          ctx.beginPath();
          ctx.arc(sx + cellW * 0.3, ey, eyeSize, 0, Math.PI * 2);
          ctx.arc(sx + cellW * 0.7, ey, eyeSize, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Body
        var frac = 1 - (idx / snake.length) * 0.5;
        ctx.fillStyle = 'rgba(6, 182, 212, ' + Math.max(0.35, frac) + ')';
        drawRoundedRect(ctx, sx + pad, sy + pad, sw, sh, 3.5);
      }
      ctx.restore();
    });

    // Particles
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.04;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Popups
    for (var j = popups.length - 1; j >= 0; j--) {
      var pop = popups[j];
      pop.y -= 0.8;
      pop.life -= 0.025;
      if (pop.life <= 0) {
        popups.splice(j, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, pop.life);
      ctx.fillStyle = pop.color;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = pop.color;
      ctx.shadowBlur = 6;
      ctx.fillText(pop.text, pop.x, pop.y);
      ctx.restore();
    }
  }

  // Draw initial preview
  snake = [
    { x: 5, y: 9 },
    { x: 4, y: 9 },
    { x: 3, y: 9 }
  ];
})();
</script>
</body>
</html>`;

  return {
    botForwardedMessage: {
      message: {
        richResponseMessage: {
          messageType: 1,
          unifiedResponse: {
            data: Buffer.from(JSON.stringify({
              __typename: "GenAIUnifiedResponse",
              response_id: crypto.randomUUID(),
              sections: [{
                __typename: "GenAIUnifiedResponseSection",
                view_model: {
                  __typename: "GenAISingleLayoutViewModel",
                  primitive: {
                    __typename: "FOAHtmlPrimitiveDemoDONOTUSE",
                    trusted_sources: [],
                    payload: htmlPayload
                  }
                }
              }]
            })).toString('base64')
          },
          contextInfo: {
            isForwarded: true,
            forwardOrigin: 4
          }
        }
      }
    }
  };
}

module.exports = { createSnakePage };
