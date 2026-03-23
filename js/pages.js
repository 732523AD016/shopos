// ============================================================
//  pages.js — Render functions for each page
//  Depends on: data.js
// ============================================================

// ── Dashboard Page ───────────────────────────────────────────
function buildDashboard() {
  renderTopProducts();
  renderGeo();
  renderRings();
  renderFeed();
}

function renderTopProducts() {
  document.getElementById('prodList').innerHTML = topProds.map((p, i) => `
    <div class="prod-item">
      <div class="prod-rank ${i < 3 ? 'top' : ''}">${i + 1}</div>
      <div class="prod-ico">${p.ico}</div>
      <div class="prod-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-cat">${p.cat}</div>
      </div>
      <div class="pb-wrap"><div class="pb" data-w="${p.pct}"></div></div>
      <div class="prod-rev">
        <div class="prod-amt">${p.rev}</div>
        <div class="prod-units">${p.units} units</div>
      </div>
    </div>`).join('');

  // Animate bars after render
  setTimeout(() => {
    document.querySelectorAll('.pb').forEach(b => b.style.width = b.dataset.w + '%');
  }, 400);
}

function renderGeo() {
  document.getElementById('geoList').innerHTML = geos.map(g => `
    <div class="geo-row">
      <span style="font-size:.9rem">${g.flag}</span>
      <span style="font-size:.73rem;color:var(--txt2);width:75px;flex-shrink:0">${g.name}</span>
      <div class="geo-bw">
        <div class="geo-bf" data-w="${g.pct}" style="background:${g.color}"></div>
      </div>
      <span class="geo-pct">${g.pct}%</span>
    </div>`).join('');

  setTimeout(() => {
    document.querySelectorAll('.geo-bf').forEach(b => b.style.width = b.dataset.w + '%');
  }, 500);
}

function renderRings() {
  const C = 2 * Math.PI * 24; // circumference for r=24

  document.getElementById('ringRow').innerHTML = rings.map(r => `
    <div class="ring-item">
      <div class="ring-wrap">
        <svg width="58" height="58" viewBox="0 0 58 58">
          <circle class="rbg" cx="29" cy="29" r="24"/>
          <circle class="rfg" cx="29" cy="29" r="24"
            stroke="${r.color}"
            stroke-dasharray="${C}"
            stroke-dashoffset="${C}"
            data-off="${C * (1 - r.pct / 100)}"
            style="filter:drop-shadow(0 0 4px ${r.color}88)"/>
        </svg>
        <div class="rpct" style="color:${r.color}">${r.pct}</div>
      </div>
      <div class="rlbl">${r.lbl}</div>
    </div>`).join('');

  setTimeout(() => {
    document.querySelectorAll('.rfg').forEach(el => {
      el.style.strokeDashoffset = el.dataset.off;
    });
  }, 500);
}

function renderFeed() {
  document.getElementById('feedList').innerHTML = feedItems.map(f => `
    <div class="fi">
      <div class="fi-ico" style="background:${f.bg}">${f.ico}</div>
      <div class="fi-body">
        <div class="fi-txt">${f.txt}</div>
        <div class="fi-time">${f.time}</div>
      </div>
    </div>`).join('');
}

// ── Notifications ────────────────────────────────────────────
function buildNotifs() {
  document.getElementById('nList').innerHTML = notifs.map(n => `
    <div class="notif-item ${n.unread ? 'notif-unread' : ''}"
         onmouseover="this.style.background='rgba(245,197,24,.06)'"
         onmouseout="this.style.background='${n.unread ? 'rgba(245,197,24,.04)' : 'transparent'}'">
      <div class="notif-ico" style="background:${n.bg}">${n.ico}</div>
      <div class="notif-body">
        <div class="notif-txt">${n.txt}</div>
        <div class="notif-time">${n.t}</div>
      </div>
      ${n.unread ? '<div class="notif-dot"></div>' : ''}
    </div>`).join('');
}

function toggleN() {
  const panel = document.getElementById('nPanel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', e => {
  if (!e.target.closest('#nBtn')) {
    document.getElementById('nPanel').style.display = 'none';
  }
});

// ── Orders Page ──────────────────────────────────────────────
let ordData  = [...orders];
let ordSortDir = 1, ordSortCol = -1;
let ordSearch  = '', ordFilterStatus = '', ordFilterCat = '';
let ordPage    = 1;
const ORDERS_PER_PAGE = 6;

function renderOrders() {
  // Filter
  const filtered = ordData.filter(r =>
    (!ordFilterStatus || r.status === ordFilterStatus) &&
    (!ordFilterCat    || r.cat    === ordFilterCat)    &&
    (!ordSearch       ||
      r.id.toLowerCase().includes(ordSearch)       ||
      r.product.toLowerCase().includes(ordSearch)  ||
      r.customer.toLowerCase().includes(ordSearch))
  );

  const totalPages = Math.ceil(filtered.length / ORDERS_PER_PAGE);
  const slice = filtered.slice((ordPage - 1) * ORDERS_PER_PAGE, ordPage * ORDERS_PER_PAGE);

  // Rows
  document.getElementById('ordBody').innerHTML = slice.map((r, i) => {
    const cs = (catColors[r.cat] || '').split(';');
    return `<tr style="animation:rIn .3s ease ${i * .05}s both">
      <td class="td-id">ORD${r.id}</td>
      <td class="td-main">${r.product}</td>
      <td>${r.customer}</td>
      <td>
        <span class="cat-chip" style="background:${cs[0] || ''};${cs[1] || ''}">
          ${r.cat}
        </span>
      </td>
      <td class="td-amt">₹${r.amount.toLocaleString()}</td>
      <td style="font-family:'Space Mono',monospace;font-size:.66rem;color:var(--txt3)">${r.date}</td>
      <td>
        <span class="badge ${statusClass[r.status]}">
          ${statusIcon[r.status]} ${r.status}
        </span>
      </td>
      <td>
        <button class="btn-sm btn-outline" style="padding:4px 8px;font-size:.65rem">View</button>
      </td>
    </tr>`;
  }).join('');

  // Pagination
  let pagHtml = `<div class="pg-btn" onclick="setOrdPage(${Math.max(1, ordPage - 1)})">‹</div>`;
  for (let i = 1; i <= totalPages; i++) {
    pagHtml += `<div class="pg-btn ${i === ordPage ? 'on' : ''}" onclick="setOrdPage(${i})">${i}</div>`;
  }
  pagHtml += `<div class="pg-btn" onclick="setOrdPage(${Math.min(totalPages, ordPage + 1)})">›</div>`;
  document.getElementById('ordPag').innerHTML = pagHtml;
}

function setOrdPage(p)       { ordPage = p; renderOrders(); }
function filterOrders(v)     { ordSearch = v.toLowerCase(); ordPage = 1; renderOrders(); }
function filterOrdStatus(v)  { ordFilterStatus = v; ordPage = 1; renderOrders(); }
function filterOrdCat(v)     { ordFilterCat = v; ordPage = 1; renderOrders(); }

function sortOrd(col) {
  if (ordSortCol === col) ordSortDir *= -1;
  else { ordSortDir = 1; ordSortCol = col; }

  const keys = ['id', 'product', 'customer', 'cat', 'amount', 'date'];
  ordData.sort((a, b) => {
    const av = a[keys[col]], bv = b[keys[col]];
    return typeof av === 'number'
      ? (av - bv) * ordSortDir
      : String(av).localeCompare(String(bv)) * ordSortDir;
  });
  renderOrders();
}

// ── Products Page ────────────────────────────────────────────
let prodSearch = '', prodCatFilter = '';

function renderProds() {
  const data = allProds.filter(p =>
    (!prodCatFilter || p.cat === prodCatFilter) &&
    (!prodSearch    || p.name.toLowerCase().includes(prodSearch))
  );

  document.getElementById('prodGrid').innerHTML = data.map((p, i) => {
    const isLow    = p.stock < 20;
    const stockPct = Math.min(100, Math.round(p.stock / 250 * 100));

    return `<div class="pg-card" style="animation:rIn .35s ease ${i * .04}s both">
      <div class="pg-ico">${p.ico}</div>
      <div class="pg-name">${p.name}</div>
      <div class="pg-cat">${p.cat}</div>
      <div class="pg-price">₹${p.price.toLocaleString()}</div>
      <div class="pg-stock" style="color:${isLow ? 'var(--rose)' : 'var(--txt3)'}">
        ${isLow ? '⚠ ' : ''} ${p.stock} in stock
      </div>
      <div class="pg-bar-w">
        <div class="pg-bar-f"
             data-w="${stockPct}"
             style="background:${isLow ? 'var(--rose)' : 'var(--gold)'}">
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
        <span style="font-size:.65rem;color:var(--txt3);font-family:'Space Mono',monospace">
          ⭐ ${p.rating} · ${p.sold} sold
        </span>
        <span class="badge ${isLow ? 'b-cn' : 'b-act'}" style="font-size:.6rem">
          ${isLow ? 'Low Stock' : 'In Stock'}
        </span>
      </div>
      <div class="pg-actions">
        <button class="btn-sm btn-outline" style="flex:1;padding:5px 8px;font-size:.68rem">Edit</button>
        <button class="btn-sm btn-gold"    style="flex:1;padding:5px 8px;font-size:.68rem">View</button>
      </div>
    </div>`;
  }).join('');

  setTimeout(() => {
    document.querySelectorAll('.pg-bar-f').forEach(b => b.style.width = b.dataset.w + '%');
  }, 300);

  initMagnetic();
}

function filterProds(v)   { prodSearch = v.toLowerCase(); renderProds(); }
function filterProdCat(v) { prodCatFilter = v; renderProds(); }

// ── Customers Page ───────────────────────────────────────────
let custSearch = '', custTypeFilter = '';

function renderCusts() {
  const data = custs.filter(c =>
    (!custTypeFilter || c.type === custTypeFilter) &&
    (!custSearch     ||
      c.name.toLowerCase().includes(custSearch)  ||
      c.email.toLowerCase().includes(custSearch))
  );

  document.getElementById('custGrid').innerHTML = data.map((c, i) => `
    <div class="cust-card" style="animation:rIn .35s ease ${i * .04}s both">
      <div class="cust-ava" style="background:${avaBgs[i % avaBgs.length]}">
        ${c.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div class="cust-name">${c.name}</div>
      <div class="cust-email">${c.email}</div>
      <div style="margin-bottom:8px">
        <span class="badge ${typeBadge[c.type] || 'b-new'}">${c.type}</span>
      </div>
      <div class="cust-meta">
        <div class="cust-m">ORDERS<strong>${c.orders}</strong></div>
        <div class="cust-m">SPENT<strong>${c.spent}</strong></div>
        <div class="cust-m">CITY<strong>${c.loc}</strong></div>
      </div>
    </div>`).join('');

  initMagnetic();
}

function filterCusts(v)     { custSearch = v.toLowerCase(); renderCusts(); }
function filterCustType(v)  { custTypeFilter = v; renderCusts(); }

// ── Mini Stat Counter Animation ──────────────────────────────
function animateMiniStats() {
  document.querySelectorAll('.mini-stat-num[data-mini]').forEach(el => {
    const target = +el.dataset.mini;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    animNum(el, target, 1200, v => prefix + Math.floor(v).toLocaleString() + suffix);
  });
}

// ── Alert Close ──────────────────────────────────────────────
function closeAl(btn) {
  const alert = btn.closest('.al');
  alert.style.opacity = '0';
  alert.style.transform = 'translateX(-12px)';
  setTimeout(() => alert.remove(), 300);
}
