// ============================================================
//  main.js — App bootstrap, cursor, particles, scroll reveal
//  Load ORDER: data.js → charts.js → tables.js → ui.js → main.js
// ============================================================

// ══ CUSTOM CURSOR ═════════════════════════════════════════════
const cursorEl  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorEl.style.left  = mx + 'px';
  cursorEl.style.top   = my + 'px';
});

// Smooth lagging ring
(function ringLoop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(ringLoop);
})();

// Hover effect on interactive elements
function bindCursorHover() {
  document.querySelectorAll(
    'a, button, .card, .sb-item, .tb-btn, .period-tab, .filter-chip, .pag-btn, .fsel, .theme-btn, .date-picker, .sb-user, .sb-ava, .ins-item, tbody tr'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
  });
}

// ══ PARTICLE CANVAS ═══════════════════════════════════════════
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx    = bgCanvas ? bgCanvas.getContext('2d') : null;
let W, H, pts = [];

function resizeCanvas() {
  if (!bgCanvas) return;
  W = bgCanvas.width  = window.innerWidth;
  H = bgCanvas.height = window.innerHeight;
  generateParticles();
}

function generateParticles() {
  pts = [];
  const n = Math.floor(W * H / 18000);
  for (let i = 0; i < n; i++) {
    pts.push({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r:  Math.random() * 1.0 + 0.3,
      o:  Math.random() * 0.25 + 0.04,
    });
  }
}

function drawParticles() {
  if (!bgCtx) return;
  bgCtx.clearRect(0, 0, W, H);

  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const col = isDark ? '0,212,255' : '0,120,200';

  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(${col},${p.o})`;
    bgCtx.fill();

    pts.forEach(q => {
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 90) {
        bgCtx.beginPath();
        bgCtx.moveTo(p.x, p.y);
        bgCtx.lineTo(q.x, q.y);
        bgCtx.strokeStyle = `rgba(${col},${(1 - d / 90) * 0.045})`;
        bgCtx.lineWidth   = 0.5;
        bgCtx.stroke();
      }
    });
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);

// ══ 3D MAGNETIC CARD TILT ═════════════════════════════════════
function initMagnetic() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-3px) scale(1.008)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ══ SCROLL / INTERSECTION REVEAL ══════════════════════════════
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ══ LIVE INSIGHT UPDATES ══════════════════════════════════════
let liveEventIndex = 0;

function startLiveUpdates() {
  setInterval(() => {
    injectLiveInsight();
  }, 5000);
}

function injectLiveInsight() {
  const insEl = document.getElementById('insightsList');
  if (!insEl) return;

  const ins = insightsData[liveEventIndex % insightsData.length];
  liveEventIndex++;

  const div = document.createElement('div');
  div.className = 'ins-item';
  div.style.animationDelay = '0s';
  div.innerHTML = `
    <div class="ins-dot" style="background:${ins.dot}"></div>
    <div class="ins-txt">${ins.txt}</div>
    <div class="ins-val" style="color:${ins.dot}">${ins.val}</div>`;

  insEl.insertBefore(div, insEl.firstChild);
  while (insEl.children.length > 5) insEl.removeChild(insEl.lastChild);
}

// ══ BOOT ══════════════════════════════════════════════════════
window.addEventListener('load', () => {

  resizeCanvas();
  drawParticles();

  buildKPIs();

  buildRevenueChart();
  buildCategoryDonut();
  buildChannelBar();
  buildRegionChart();
  buildCustSegChart();
  buildFunnel();
  buildHeatmap();

  renderOrders();
  renderProducts();
  renderCustomers();
  buildInsights();

  initMagnetic();
  bindCursorHover();
  initScrollReveal();

  startLiveUpdates();

  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 55);
    });
  }, 100);
});