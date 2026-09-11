const { generateWAMessageFromContent } = require('../../lib/index.js');
const crypto = require('crypto');

/**
 * Creates an interactive Sample Webpage (HTML, CSS, JS) payload
 * rendered via the WhatsApp GenAI Unified Response HTML primitive.
 *
 * @param {string} [userName='Commander'] - Display name of the user
 * @returns {object} WhatsApp message payload
 */
function createSamplePage(userName = 'Commander') {
    const htmlPayload = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-user-select: none; }
:root {
  --primary: #06b6d4;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  --bg-dark: #070a13;
  --card-bg: rgba(15, 23, 42, 0.75);
  --border-glow: rgba(6, 182, 212, 0.4);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: var(--bg-dark);
  color: var(--text-main);
  padding: 10px;
  overflow-x: hidden;
  min-height: 100vh;
}
.dashboard {
  background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0b0f19 50%, #030712 100%);
  border: 2px solid var(--border-glow);
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 0 35px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.15);
  position: relative;
  overflow: hidden;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}
.dashboard::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 60%);
  pointer-events: none;
  animation: rotateGlow 12s linear infinite;
}
@keyframes rotateGlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-icon {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 18px;
  box-shadow: 0 0 14px var(--primary);
  animation: pulseIcon 2s ease-in-out infinite alternate;
}
@keyframes pulseIcon { 0% { transform: scale(1); } 100% { transform: scale(1.08); filter: brightness(1.2); } }
.brand-title {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #fff, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.status-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: #34d399;
}
.status-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
  animation: blink 1.2s infinite;
}
@keyframes blink { 50% { opacity: 0.3; } }

/* Profile Card */
.profile-card {
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 12px 14px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}
.user-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  display: grid;
  place-items: center;
  font-size: 20px;
  border: 2px solid #fff;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.5);
}
.user-name {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}
.user-role {
  font-size: 11px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}
.clock {
  font-family: monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  background: rgba(6, 182, 212, 0.1);
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid rgba(6, 182, 212, 0.3);
}

/* Navigation Tabs */
.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  background: rgba(15, 23, 42, 0.6);
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 14px;
  position: relative;
  z-index: 1;
}
.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
  padding: 8px 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.tab-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
}

/* Tab Content */
.tab-content { display: none; position: relative; z-index: 1; }
.tab-content.active { display: block; animation: fadeIn 0.3s ease forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

/* Grid Cards */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}
.metric-card {
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 12px;
  position: relative;
  overflow: hidden;
}
.metric-card::after {
  content: '';
  position: absolute;
  top: 0; right: 0; width: 40px; height: 40px;
  background: radial-gradient(circle at top right, var(--primary), transparent 70%);
  opacity: 0.2;
}
.metric-label { font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }
.metric-value { font-size: 20px; font-weight: 800; color: #fff; margin-top: 4px; }
.metric-sub { font-size: 10px; color: #34d399; margin-top: 2px; font-weight: 600; }

/* Canvas Visualizer */
.canvas-box {
  background: #060913;
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 14px;
  padding: 10px;
  margin-bottom: 14px;
  position: relative;
}
.canvas-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
}
#waveCanvas {
  width: 100%;
  height: 80px;
  display: block;
  border-radius: 8px;
}

/* Control Hub */
.controls-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.control-row {
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.control-info h4 { font-size: 13px; font-weight: 700; color: #fff; }
.control-info p { font-size: 10px; color: var(--text-muted); }

/* Custom Switch */
.switch { position: relative; display: inline-block; width: 44px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; inset: 0;
  background: #334155;
  border-radius: 24px;
  transition: 0.3s;
}
.slider::before {
  position: absolute; content: "";
  height: 18px; width: 18px; left: 3px; bottom: 3px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}
input:checked + .slider { background: linear-gradient(135deg, var(--primary), var(--secondary)); box-shadow: 0 0 10px var(--primary); }
input:checked + .slider::before { transform: translateX(20px); }

/* Buttons */
.action-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 12px; }
.btn {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2));
  border: 1px solid rgba(6, 182, 212, 0.4);
  color: #fff;
  font-weight: 700;
  font-size: 12px;
  padding: 11px 12px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
}
.btn:active { transform: scale(0.96); filter: brightness(1.2); }
.btn.primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  box-shadow: 0 0 14px rgba(6, 182, 212, 0.4);
}

/* Terminal Log */
.terminal {
  background: #040711;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px;
  font-family: monospace;
  font-size: 11px;
  color: #38bdf8;
  height: 95px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.log-line { display: flex; gap: 6px; }
.log-time { color: var(--text-muted); }
.log-msg { color: #e2e8f0; }

/* Mini Game */
.game-arena {
  background: #040711;
  border: 2px dashed rgba(6, 182, 212, 0.4);
  border-radius: 16px;
  height: 200px;
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
}
.target-node {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff, var(--accent) 60%, transparent 100%);
  box-shadow: 0 0 20px var(--accent);
  display: grid;
  place-items: center;
  font-size: 22px;
  cursor: pointer;
  animation: popNode 0.2s ease-out;
}
@keyframes popNode { 0% { transform: scale(0); } 100% { transform: scale(1); } }
.game-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 800;
  color: var(--primary);
}

/* Footer */
.footer {
  text-align: center;
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 14px;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}
</style>
</head>
<body>

<div class="dashboard" id="dashboard">
  <!-- Header -->
  <div class="header">
    <div class="brand">
      <div class="brand-icon">⚡</div>
      <div class="brand-title">CYBERPULSE</div>
    </div>
    <div class="status-pill">
      <span class="status-dot"></span>
      <span>ONLINE</span>
    </div>
  </div>

  <!-- Profile Section -->
  <div class="profile-card">
    <div class="user-meta">
      <div class="avatar">🚀</div>
      <div>
        <div class="user-name">${userName}</div>
        <div class="user-role">⭐ Core Level 42 · Quantum Tier</div>
      </div>
    </div>
    <div class="clock" id="liveClock">00:00:00</div>
  </div>

  <!-- Tab Buttons -->
  <div class="tabs">
    <button class="tab-btn active" onclick="switchTab('system')">📊 Metrics</button>
    <button class="tab-btn" onclick="switchTab('controls')">⚡ Controls</button>
    <button class="tab-btn" onclick="switchTab('game')">🎮 Tap Rush</button>
  </div>

  <!-- Tab 1: System Metrics -->
  <div class="tab-content active" id="tab-system">
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Compute Core</div>
        <div class="metric-value" id="cpuLoad">3.8 GHz</div>
        <div class="metric-sub">⚡ 99.4% Efficiency</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Neural Sync</div>
        <div class="metric-value" id="syncPing">14 ms</div>
        <div class="metric-sub">🌐 Ultra-Low Jitter</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Quantum Power</div>
        <div class="metric-value" id="powerLevel">8,450 GW</div>
        <div class="metric-sub">🔥 Surge Active</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Firewall Status</div>
        <div class="metric-value" style="color: #34d399;">LOCKED</div>
        <div class="metric-sub">🛡️ Zero Intrusions</div>
      </div>
    </div>

    <div class="canvas-box">
      <div class="canvas-title">
        <span>Real-Time Wave Stream</span>
        <span id="fpsCount">60 FPS</span>
      </div>
      <canvas id="waveCanvas"></canvas>
    </div>
  </div>

  <!-- Tab 2: Controls Hub -->
  <div class="tab-content" id="tab-controls">
    <div class="controls-list">
      <div class="control-row">
        <div class="control-info">
          <h4>Turbo Overclock</h4>
          <p>Boost messaging pipeline throughput</p>
        </div>
        <label class="switch">
          <input type="checkbox" id="turboSwitch" checked onchange="toggleControl('Turbo Overclock', this.checked)">
          <span class="slider"></span>
        </label>
      </div>
      <div class="control-row">
        <div class="control-info">
          <h4>Stealth Shield</h4>
          <p>Mask presence telemetry & signature</p>
        </div>
        <label class="switch">
          <input type="checkbox" id="stealthSwitch" onchange="toggleControl('Stealth Shield', this.checked)">
          <span class="slider"></span>
        </label>
      </div>
      <div class="control-row">
        <div class="control-info">
          <h4>Auto Diagnostics</h4>
          <p>Continuous health telemetry</p>
        </div>
        <label class="switch">
          <input type="checkbox" id="diagSwitch" checked onchange="toggleControl('Auto Diagnostics', this.checked)">
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div class="action-grid">
      <button class="btn primary" onclick="boostPower()">🔥 Overcharge</button>
      <button class="btn" onclick="switchTheme()">🎨 Theme Cycle</button>
      <button class="btn" onclick="runDiagnostics()">🔍 Diagnostics</button>
      <button class="btn" onclick="clearLog()">🧹 Clear Logs</button>
    </div>

    <div class="terminal" id="terminalLog">
      <div class="log-line"><span class="log-time">[SYSTEM]</span><span class="log-msg">Neural Core initialized successfully.</span></div>
    </div>
  </div>

  <!-- Tab 3: Tap Rush Game -->
  <div class="tab-content" id="tab-game">
    <div class="game-arena" id="gameArena" onclick="missClick()">
      <div id="gameTarget" class="target-node" style="display: none;" onclick="hitNode(event)">💎</div>
      <div id="startPrompt" style="text-align: center;">
        <h3 style="color: #fff; margin-bottom: 8px;">Tap Rush Challenge</h3>
        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">Hit glowing quantum nodes before they expire!</p>
        <button class="btn primary" onclick="startGame(event)">▶️ Start Game</button>
      </div>
    </div>
    <div class="game-stats">
      <span>Score: <b id="gameScore" style="color: #fff;">0</b></span>
      <span>Combo: <b id="gameCombo" style="color: var(--accent);">0x</b></span>
      <span>High: <b id="gameHigh" style="color: #34d399;">0</b></span>
    </div>
  </div>

  <div class="footer">
    ⚡ INNOVATORS BAILEYS · GENAI UNIFIED WEB PRIMITIVE
  </div>
</div>

<script>
// Live Clock
function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const clockEl = document.getElementById('liveClock');
  if (clockEl) {
    clockEl.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
  }
}
setInterval(updateClock, 1000);
updateClock();

// Tab Switcher
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
  const target = document.getElementById('tab-' + tabId);
  if (target) target.classList.add('active');
  logMsg('Navigated to ' + tabId.toUpperCase() + ' tab.');
}

// Log Terminal
function logMsg(text) {
  const term = document.getElementById('terminalLog');
  if (!term) return;
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const timeStr = '[' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()) + ']';
  const row = document.createElement('div');
  row.className = 'log-line';
  row.innerHTML = '<span class="log-time">' + timeStr + '</span><span class="log-msg">' + text + '</span>';
  term.appendChild(row);
  term.scrollTop = term.scrollHeight;
}
function clearLog() {
  const term = document.getElementById('terminalLog');
  if (term) term.innerHTML = '<div class="log-line"><span class="log-time">[LOGS]</span><span class="log-msg">Terminal buffer cleared.</span></div>';
}

function toggleControl(name, state) {
  logMsg(name + ' switched ' + (state ? 'ON' : 'OFF'));
}

// Power Boost
let power = 8450;
function boostPower() {
  power += Math.floor(Math.random() * 850) + 150;
  document.getElementById('powerLevel').textContent = power.toLocaleString() + ' GW';
  logMsg('🔥 Overcharge pulse injected! Output: ' + power.toLocaleString() + ' GW');
}

// Run Diagnostics
function runDiagnostics() {
  logMsg('🔍 Running hardware integrity scan...');
  setTimeout(() => {
    const ping = Math.floor(Math.random() * 6) + 9;
    document.getElementById('syncPing').textContent = ping + ' ms';
    logMsg('✅ Scan complete: All subsystems operational (Latency: ' + ping + ' ms)');
  }, 600);
}

// Theme Switcher
const themes = [
  { primary: '#06b6d4', secondary: '#8b5cf6', glow: 'rgba(6, 182, 212, 0.4)' },
  { primary: '#10b981', secondary: '#06b6d4', glow: 'rgba(16, 185, 129, 0.4)' },
  { primary: '#ec4899', secondary: '#f59e0b', glow: 'rgba(236, 72, 153, 0.4)' },
  { primary: '#8b5cf6', secondary: '#3b82f6', glow: 'rgba(139, 92, 246, 0.4)' }
];
let themeIdx = 0;
function switchTheme() {
  themeIdx = (themeIdx + 1) % themes.length;
  const t = themes[themeIdx];
  document.documentElement.style.setProperty('--primary', t.primary);
  document.documentElement.style.setProperty('--secondary', t.secondary);
  document.documentElement.style.setProperty('--border-glow', t.glow);
  logMsg('🎨 Applied Theme Palette #' + (themeIdx + 1));
}

// Wave Canvas Animation
const canvas = document.getElementById('waveCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let step = 0;
  function resizeCanvas() {
    canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function drawWave() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Wave 1
    ctx.beginPath();
    ctx.lineWidth = 2.5 * (window.devicePixelRatio || 1);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#06b6d4';
    for (let x = 0; x < w; x += 4) {
      const y = h / 2 + Math.sin((x * 0.015) + step) * (h * 0.28) + Math.cos((x * 0.03) - step) * (h * 0.12);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Wave 2
    ctx.beginPath();
    ctx.lineWidth = 1.5 * (window.devicePixelRatio || 1);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary') || '#8b5cf6';
    for (let x = 0; x < w; x += 4) {
      const y = h / 2 + Math.sin((x * 0.02) - (step * 1.3)) * (h * 0.22);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    step += 0.045;
    requestAnimationFrame(drawWave);
  }
  drawWave();
}

// Tap Rush Mini-Game
let gameActive = false, score = 0, combo = 0, high = 0, targetTimer = null;
const emojis = ['💎', '⚡', '🔥', '⭐', '👾', '🚀'];

function startGame(e) {
  if (e) e.stopPropagation();
  gameActive = true;
  score = 0;
  combo = 0;
  updateGameUI();
  document.getElementById('startPrompt').style.display = 'none';
  document.getElementById('gameTarget').style.display = 'grid';
  spawnTarget();
  logMsg('🎮 Tap Rush Game Started!');
}

function spawnTarget() {
  if (!gameActive) return;
  const arena = document.getElementById('gameArena');
  const target = document.getElementById('gameTarget');
  if (!arena || !target) return;

  const maxX = arena.clientWidth - 55;
  const maxY = arena.clientHeight - 55;
  const randX = Math.max(10, Math.floor(Math.random() * maxX));
  const randY = Math.max(10, Math.floor(Math.random() * maxY));

  target.style.left = randX + 'px';
  target.style.top = randY + 'px';
  target.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  clearTimeout(targetTimer);
  targetTimer = setTimeout(() => {
    if (gameActive) {
      combo = 0;
      updateGameUI();
      spawnTarget();
    }
  }, Math.max(800, 1600 - (score * 20)));
}

function hitNode(e) {
  if (e) e.stopPropagation();
  if (!gameActive) return;
  combo++;
  score += 10 * combo;
  if (score > high) high = score;
  updateGameUI();
  spawnTarget();
}

function missClick() {
  if (!gameActive) return;
  combo = 0;
  updateGameUI();
}

function updateGameUI() {
  document.getElementById('gameScore').textContent = score;
  document.getElementById('gameCombo').textContent = combo + 'x';
  document.getElementById('gameHigh').textContent = high;
}
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

module.exports = { createSamplePage };
