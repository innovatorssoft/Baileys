const { generateWAMessageFromContent } = require('../../lib/index.js');
const crypto = require('crypto');

/**
 * Creates an interactive Live Page / Web App payload for TikDown
 * rendered via the WhatsApp GenAI Unified Response HTML primitive.
 *
 * @param {string} [targetUrl='https://tikdown.innovatorssoft.org/'] - Public URL
 * @param {string} [title='TikDown'] - Display title
 * @returns {object} WhatsApp message payload
 */
function createLivePage(targetUrl = 'https://tikdown.innovatorssoft.org/', title = 'TikDown — TikTok Downloader') {
    const htmlPayload = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>${title}</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent; }
:root {
  --primary: #06b6d4;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  --bg-dark: #070a13;
  --card-bg: rgba(15, 23, 42, 0.85);
  --border-glow: rgba(6, 182, 212, 0.35);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}
html, body {
  width: 100%;
  margin: 0;
  padding: 0;
  background: var(--bg-dark);
  color: var(--text-main);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
}
body {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}
.app-container {
  width: 100%;
  max-width: 420px;
  background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0b0f19 55%, #030712 100%);
  border: 2px solid var(--border-glow);
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 0 35px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.15);
  position: relative;
  overflow: hidden;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  z-index: 2;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand-icon {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #00f2fe, #4facfe);
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 20px;
  box-shadow: 0 0 16px rgba(0, 242, 254, 0.5);
}
.brand-info h1 {
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #fff, #38bdf8, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.brand-info p {
  font-size: 10px;
  color: var(--text-muted);
}
.live-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 800;
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  padding: 4px 10px;
  border-radius: 999px;
}
.live-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10b981;
  animation: pulse 1.4s infinite;
}
@keyframes pulse { 50% { opacity: 0.3; } }

/* Hero Banner */
.hero {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(168, 85, 247, 0.15));
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 16px;
  padding: 14px;
  text-align: center;
  margin-bottom: 16px;
}
.hero h2 {
  font-size: 15px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 4px;
}
.hero p {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Input Box */
.input-card {
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 14px;
}
.input-label {
  font-size: 11px;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.url-input {
  width: 100%;
  background: #030712;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 10px;
  padding: 11px 12px;
  font-size: 12px;
  color: #fff;
  outline: none;
  transition: border-color 0.2s ease;
  user-select: auto;
  -webkit-user-select: auto;
}
.url-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
}
.btn-fetch {
  width: 100%;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  color: #fff;
  border: none;
  font-size: 13px;
  font-weight: 800;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(6, 182, 212, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: transform 0.15s ease;
  touch-action: manipulation;
}
.btn-fetch:active { transform: scale(0.97); }

/* Quick Action Chips */
.chips-row {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
  overflow-x: auto;
}
.chip {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  touch-action: manipulation;
}
.chip:active {
  background: rgba(6, 182, 212, 0.2);
  color: #fff;
}

/* Result Card */
.result-card {
  display: none;
  background: var(--card-bg);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 14px;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.result-header {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}
.result-thumb {
  width: 55px;
  height: 55px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1e1b4b, #3b82f6);
  display: grid;
  place-items: center;
  font-size: 22px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.result-meta h4 {
  font-size: 13px;
  color: #fff;
  font-weight: 700;
  margin-bottom: 4px;
}
.result-meta p {
  font-size: 11px;
  color: var(--text-muted);
}
.download-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dl-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 11px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  touch-action: manipulation;
}
.dl-btn:active {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3));
  border-color: var(--primary);
}
.dl-tag {
  font-size: 10px;
  background: rgba(6, 182, 212, 0.2);
  color: #38bdf8;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}
.feature-box {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
}
.feature-icon { font-size: 18px; margin-bottom: 4px; }
.feature-title { font-size: 11px; font-weight: 700; color: #fff; }
.feature-desc { font-size: 9px; color: var(--text-muted); margin-top: 2px; }

/* Direct Link CTA */
.cta-box {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  border: 1px dashed rgba(56, 189, 248, 0.4);
  border-radius: 16px;
  padding: 14px;
  text-align: center;
  margin-bottom: 12px;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #fff;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 0 16px rgba(37, 99, 235, 0.4);
  margin-top: 8px;
  border: none;
  cursor: pointer;
  touch-action: manipulation;
  transition: transform 0.15s ease, filter 0.15s ease;
}
.cta-btn:active {
  transform: scale(0.97);
  filter: brightness(1.2);
}
.copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #38bdf8;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  margin-top: 8px;
  cursor: pointer;
  touch-action: manipulation;
}
.copy-btn:active {
  background: rgba(56, 189, 248, 0.2);
}

/* Footer */
.footer {
  text-align: center;
  font-size: 9px;
  color: #64748b;
  letter-spacing: 0.5px;
}
</style>
</head>
<body>

<div class="app-container">
  <!-- Header -->
  <div class="header">
    <div class="brand">
      <div class="brand-icon">🎬</div>
      <div class="brand-info">
        <h1>TIKDOWN</h1>
        <p>TikTok Video Downloader</p>
      </div>
    </div>
    <div class="live-badge">
      <span class="live-dot"></span>
      <span>ONLINE</span>
    </div>
  </div>

  <!-- Hero -->
  <div class="hero">
    <h2>Download TikTok Without Watermark</h2>
    <p>Fast, high-definition MP4 & MP3 audio extractor powered by TikDown Cloud.</p>
  </div>

  <!-- Input Form -->
  <div class="input-card">
    <div class="input-label">
      <span>TikTok Video Link</span>
      <span style="color: #a855f7; cursor: pointer;" id="btnPasteDemo">📋 Paste Demo</span>
    </div>
    <div class="input-group">
      <input type="text" id="videoUrl" class="url-input" placeholder="https://www.tiktok.com/@user/video/..." value="">
      <button class="btn-fetch" id="btnExtract">
        <span>⚡ Extract Video</span>
      </button>
    </div>
  </div>

  <!-- Quick Chips -->
  <div class="chips-row">
    <div class="chip" id="chipTrending">🔥 Trending Post</div>
    <div class="chip" id="chipMusic">🎵 Viral Sound</div>
    <div class="chip" id="chipHd">✨ 1080p HD Clip</div>
  </div>

  <!-- Result Preview Card -->
  <div class="result-card" id="resultCard">
    <div class="result-header">
      <div class="result-thumb">🎥</div>
      <div class="result-meta">
        <h4 id="videoTitle">TikTok Viral Video</h4>
        <p id="videoAuthor">@creator · 1080p HD Ready</p>
      </div>
    </div>
    <div class="download-options">
      <button class="dl-btn" id="dlNoWatermark">
        <span>📥 Download HD (No Watermark)</span>
        <span class="dl-tag">FAST MP4</span>
      </button>
      <button class="dl-btn" id="dlAudio">
        <span>🎵 Extract Audio Track</span>
        <span class="dl-tag">320K MP3</span>
      </button>
    </div>
  </div>

  <!-- Features Grid -->
  <div class="features-grid">
    <div class="feature-box">
      <div class="feature-icon">🚫</div>
      <div class="feature-title">No Watermark</div>
      <div class="feature-desc">Clean, original quality</div>
    </div>
    <div class="feature-box">
      <div class="feature-icon">⚡</div>
      <div class="feature-title">Ultra Fast</div>
      <div class="feature-desc">Direct high-speed stream</div>
    </div>
    <div class="feature-box">
      <div class="feature-icon">🎧</div>
      <div class="feature-title">Audio MP3</div>
      <div class="feature-desc">Extract sounds & music</div>
    </div>
    <div class="feature-box">
      <div class="feature-icon">🔒</div>
      <div class="feature-title">100% Free</div>
      <div class="feature-desc">No login or limit</div>
    </div>
  </div>

  <!-- Direct Web App Launcher -->
  <div class="cta-box">
    <div style="font-size: 13px; font-weight: 800; color: #fff;">Open Official Web Application</div>
    <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Launch directly in your device browser:</div>
    <button class="cta-btn" id="btnLaunchApp">
      <span>🌐 Open TikDown (${targetUrl})</span>
    </button>
    <button class="copy-btn" id="btnCopyUrl">
      <span>📋 Copy URL to Clipboard</span>
    </button>
  </div>

  <div class="footer">
    ⚡ INNOVATORS BAILEYS · TIKDOWN LIVE GENAI WEB INTERFACE
  </div>
</div>

<script>
(function() {
  var target = "${targetUrl}";

  function launchUrl(url) {
    var dest = url || target;
    // 1. Direct location change (Triggers WebView external browser intent in WhatsApp)
    try {
      window.location.href = dest;
    } catch (e) {}

    // 2. Window.open fallbacks
    try { window.open(dest, '_top'); } catch (e) {}
    try { window.open(dest, '_system'); } catch (e) {}
    try { window.open(dest, '_blank'); } catch (e) {}

    // 3. Dynamic top-level anchor click
    try {
      var a = document.createElement('a');
      a.href = dest;
      a.target = '_top';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(function() { document.body.removeChild(a); }, 100);
    } catch (e) {}
  }

  function copyUrl(url) {
    var dest = url || target;
    var btn = document.getElementById('btnCopyUrl');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(dest).then(function() {
        if (btn) btn.innerHTML = '<span>✅ Copied to Clipboard!</span>';
        setTimeout(function() {
          if (btn) btn.innerHTML = '<span>📋 Copy URL to Clipboard</span>';
        }, 2000);
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = dest;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (btn) btn.innerHTML = '<span>✅ Copied to Clipboard!</span>';
      setTimeout(function() {
        if (btn) btn.innerHTML = '<span>📋 Copy URL to Clipboard</span>';
      }, 2000);
    }
  }

  function pasteDemo() {
    document.getElementById('videoUrl').value = 'https://www.tiktok.com/@tiktok/video/7106594312292453678';
    extractVideo();
  }

  function setDemo(type) {
    if (type === 'trending') {
      document.getElementById('videoUrl').value = 'https://www.tiktok.com/@trending/video/7201948192839129381';
    } else if (type === 'music') {
      document.getElementById('videoUrl').value = 'https://www.tiktok.com/@music_hits/video/7192839128391283910';
    } else {
      document.getElementById('videoUrl').value = 'https://www.tiktok.com/@creative_hd/video/7281920391829102931';
    }
    extractVideo();
  }

  function extractVideo() {
    var input = document.getElementById('videoUrl').value.trim();
    var btn = document.getElementById('btnExtract');
    var resultCard = document.getElementById('resultCard');

    if (!input) {
      alert('Please enter or paste a valid TikTok link');
      return;
    }

    btn.innerHTML = '<span>⏳ Extracting Media...</span>';
    btn.style.opacity = '0.75';

    setTimeout(function() {
      btn.innerHTML = '<span>⚡ Extract Video</span>';
      btn.style.opacity = '1';
      resultCard.style.display = 'block';

      var match = input.match(/@([^/]+)/);
      var author = match ? '@' + match[1] : '@tiktok_creator';
      document.getElementById('videoAuthor').textContent = author + ' · 1080p HD Ready';
      document.getElementById('videoTitle').textContent = 'Extracted TikTok Clip #' + Math.floor(Math.random() * 8999 + 1000);
    }, 700);
  }

  // Event bindings
  var btnLaunch = document.getElementById('btnLaunchApp');
  if (btnLaunch) {
    btnLaunch.addEventListener('click', function(e) { e.preventDefault(); launchUrl(target); });
    btnLaunch.addEventListener('pointerdown', function(e) { e.preventDefault(); launchUrl(target); });
  }

  var btnCopy = document.getElementById('btnCopyUrl');
  if (btnCopy) {
    btnCopy.addEventListener('click', function(e) { e.preventDefault(); copyUrl(target); });
  }

  var btnExtractEl = document.getElementById('btnExtract');
  if (btnExtractEl) {
    btnExtractEl.addEventListener('click', extractVideo);
  }

  var btnPasteDemoEl = document.getElementById('btnPasteDemo');
  if (btnPasteDemoEl) {
    btnPasteDemoEl.addEventListener('click', pasteDemo);
  }

  var chipTrending = document.getElementById('chipTrending');
  if (chipTrending) {
    chipTrending.addEventListener('click', function() { setDemo('trending'); });
  }
  var chipMusic = document.getElementById('chipMusic');
  if (chipMusic) {
    chipMusic.addEventListener('click', function() { setDemo('music'); });
  }
  var chipHd = document.getElementById('chipHd');
  if (chipHd) {
    chipHd.addEventListener('click', function() { setDemo('hd'); });
  }

  var dlNoWatermark = document.getElementById('dlNoWatermark');
  if (dlNoWatermark) {
    dlNoWatermark.addEventListener('click', function() { launchUrl(target); });
  }
  var dlAudio = document.getElementById('dlAudio');
  if (dlAudio) {
    dlAudio.addEventListener('click', function() { launchUrl(target); });
  }
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
                                        trusted_sources: [
                                            targetUrl,
                                            'https://tikdown.innovatorssoft.org/',
                                            'https://tikdown.innovatorssoft.org'
                                        ],
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

module.exports = { createLivePage };
