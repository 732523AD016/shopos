// ============================================================
//  tables.js — Orders, Products, Customers tables
//  Depends on: data.js, ui.js (openPanel)
// ============================================================

// ══ ORDERS TABLE ══════════════════════════════════════════════
let ordFiltered = [...ordersData];
let ordPage     = 1;
let ordSearch   = '';
let ordStat     = '';
let ordPay      = '';
let ordSortDir  = 1;
let ordSortCol  = -1;
const ORDERS_PER_PAGE = 8;

function renderOrders() {
  // Filter
  const data = ordFiltered.filter(r =>
    (!ordStat   || r.status === ordStat) &&
    (!ordPay    || r.pay    === ordPay)  &&
    (!ordSearch ||
      r.id.toLowerCase().includes(ordSearch)       ||
      r.customer.toLowerCase().includes(ordSearch) ||
      r.product.toLowerCase().includes(ordSearch))
  );

  const total = data.length;
  const pages = Math.max(1, Math.ceil(total / ORDERS_PER_PAGE));
  ordPage = Math.min(ordPage, pages);
  const slice = data.slice((ordPage - 1) * ORDERS_PER_PAGE, ordPage * ORDERS_PER_PAGE);

  // Rows
  document.getElementById('ordTbody').innerHTML = slice.map((r, i) => `
    <tr style="animation:rIn .3s ease ${i * .04}s both">
      <td class="td-id">${r.id}</td>
      <td class="td-main">${r.customer}</td>
      <td>${r.product}</td>
      <td>${(payIcon[r.pay] || '')} ${r.pay}</td>
      <td class="td-amt">₹${r.amount.toLocaleString()}</td>
      <td style="font-family:'Space Mono',monospace;font-size:.65rem;color:var(--txt3)">${r.date}</td>
      <td><span class="badge ${statusClass[r.status]}">${statusIcon[r.status]} ${r.status}</span></td>
      <td>
        <button class="btn btn-outline"
                style="padding:3px 8px;font-size:.63rem"
                onclick="viewOrder('${r.id}')">View</button>
      </td>
    </tr>`).join('');

  // Pagination info
  document.getElementById('pagInfo').textContent =
    `Showing ${(ordPage - 1) * ORDERS_PER_PAGE + 1}–${Math.min(ordPage * ORDERS_PER_PAGE, total)} of ${total}`;

  // Pagination buttons
  let phtml = `<div class="pag-btn" onclick="goOrdPage(${Math.max(1, ordPage - 1)})">‹</div>`;
  for (let i = 1; i <= pages; i++) {
    phtml += `<div class="pag-btn ${i === ordPage ? 'on' : ''}" onclick="goOrdPage(${i})">${i}</div>`;
  }
  phtml += `<div class="pag-btn" onclick="goOrdPage(${Math.min(pages, ordPage + 1)})">›</div>`;
  document.getElementById('pagBtns').innerHTML = phtml;
}

// View single order detail panel
function viewOrder(id) {
  const r = ordersData.find(o => o.id === id);
  if (!r) return;
  openPanel('Order ' + r.id, `
    <div class="dp-stat-row">
      <div class="dp-stat">
        <div class="dp-num">₹${r.amount.toLocaleString()}</div>
        <div class="dp-lbl">AMOUNT</div>
      </div>
      <div class="dp-stat">
        <div class="dp-num">
          <span class="badge ${statusClass[r.status]}">${statusIcon[r.status]} ${r.status}</span>
        </div>
        <div class="dp-lbl">STATUS</div>
      </div>
    </div>
    ${[['Customer', r.customer], ['Product', r.product], ['Payment', r.pay], ['Date', r.date]]
      .map(([k, v]) => `
        <div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border)">
          <span style="font-family:'Space Mono',monospace;font-size:.6rem;color:var(--txt3)">${k}</span>
          <span style="font-size:.78rem;color:var(--txt);font-weight:600">${v}</span>
        </div>`).join('')}
  `);
}

// Sort
function sortOrd(col) {
  if (ordSortCol === col) ordSortDir *= -1;
  else { ordSortDir = 1; ordSortCol = col; }

  const keys = ['id', 'customer', 'product', 'pay', 'amount', 'date'];
  ordFiltered.sort((a, b) => {
    const av = a[keys[col]], bv = b[keys[col]];
    return typeof av === 'number'
      ? (av - bv) * ordSortDir
      : String(av).localeCompare(String(bv)) * ordSortDir;
  });
  renderOrders();
}

// Filter / search helpers (called from HTML oninput / onchange)
function searchOrders(v)    { ordSearch = v.toLowerCase(); ordPage = 1; renderOrders(); }
function filterOrdStat(v)   { ordStat   = v;               ordPage = 1; renderOrders(); }
function filterOrdPay(v)    { ordPay    = v;               ordPage = 1; renderOrders(); }
function goOrdPage(p)       { ordPage   = p;                             renderOrders(); }

// ══ PRODUCTS TABLE ════════════════════════════════════════════
let prodSearch = '';

function renderProducts() {
  const data = prodsData.filter(p =>
    !prodSearch || p.name.toLowerCase().includes(prodSearch)
  );

  document.getElementById('prodTbody').innerHTML = data.map((p, i) => {
    const isLow = p.stock < 20;
    return `
      <tr style="animation:rIn .3s ease ${i * .04}s both">
        <td>
          <div class="td-main">${p.name}</div>
          <div style="font-size:.65rem;color:var(--txt3)">${p.cat}</div>
        </td>
        <td style="font-family:'Bebas Neue',sans-serif;font-size:.95rem;color:var(--sky)">
          ${p.units.toLocaleString()}
        </td>
        <td class="td-amt">₹${(p.rev / 100000).toFixed(1)}L</td>
        <td>
          <div style="display:flex;align-items:center;gap:6px">
            <div class="prog-wrap">
              <div class="prog-bar" style="width:${p.margin}%"></div>
            </div>
            <span style="font-size:.7rem;color:var(--txt2)">${p.margin}%</span>
          </div>
        </td>
        <td>
          <span class="badge ${isLow ? 'b-cn' : 'b-ok'}">
            ${isLow ? '⚠ ' + p.stock : '✓ ' + p.stock}
          </span>
        </td>
      </tr>`;
  }).join('');
}

function searchProds(v) { prodSearch = v.toLowerCase(); renderProducts(); }

// ══ CUSTOMERS TABLE ════════════════════════════════════════════
let custSearch = '';
let custSeg    = '';

function renderCustomers() {
  const data = custsData.filter(c =>
    (!custSeg    || c.seg === custSeg) &&
    (!custSearch ||
      c.name.toLowerCase().includes(custSearch)  ||
      c.email.toLowerCase().includes(custSearch))
  );

  document.getElementById('custTbody').innerHTML = data.map((c, i) => `
    <tr style="animation:rIn .3s ease ${i * .04}s both">
      <td>
        <div class="td-main">${c.name}</div>
        <div style="font-size:.65rem;color:var(--txt3)">${c.email}</div>
      </td>
      <td style="font-family:'Bebas Neue',sans-serif;font-size:.95rem;color:var(--sky)">${c.orders}</td>
      <td class="td-amt">₹${(c.spend / 1000).toFixed(1)}K</td>
      <td style="font-family:'Space Mono',monospace;font-size:.65rem;color:var(--txt3)">${c.last}</td>
      <td><span class="badge ${segBadge[c.seg] || 'b-new'}">${c.seg}</span></td>
    </tr>`).join('');
}

function searchCusts(v)    { custSearch = v.toLowerCase(); renderCustomers(); }
function filterCustSeg(v)  { custSeg    = v;               renderCustomers(); }

// ══ INSIGHTS & ALERTS ═════════════════════════════════════════
function buildInsights() {
  document.getElementById('insightsList').innerHTML = insightsData.map((ins, i) => `
    <div class="ins-item" style="animation-delay:${i * .08}s">
      <div class="ins-dot" style="background:${ins.dot}"></div>
      <div class="ins-txt">${ins.txt}</div>
      <div class="ins-val" style="color:${ins.dot}">${ins.val}</div>
    </div>`).join('');

  document.getElementById('alertsList').innerHTML = alertsData.map((al, i) => `
    <div class="alert-item ${al.cls}" style="animation-delay:${i * .08}s">
      <span>${al.ico}</span>
      <span class="al-txt">${al.txt}</span>
      <span style="font-family:'Space Mono',monospace;font-size:.58rem;color:var(--txt3);flex-shrink:0">${al.time}</span>
      <button class="al-x" onclick="
        this.closest('.alert-item').style.opacity=0;
        this.closest('.alert-item').style.transform='translateX(12px)';
        setTimeout(()=>this.closest('.alert-item').remove(),300)">✕</button>
    </div>`).join('');
}