// ============================================================
//  ui.js — Theme, Sidebar, Panel, Toast, Export, Filters
//  Depends on: data.js
// ============================================================

// ══ THEME ═════════════════════════════════════════════════════
let isDark = true;

function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('themeLabel').textContent = isDark ? 'Dark' : 'Light';
  document.getElementById('themePip').style.background = isDark ? 'var(--gold)' : '#3b82f6';
  setTimeout(rebuildCharts, 100);
}

// ══ SIDEBAR ═══════════════════════════════════════════════════
function toggleSb() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sbOverlay').classList.toggle('open');
}
function closeSb() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sbOverlay').classList.remove('open');
}
function setPage(page, el) {
  document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  const titles = {
    dashboard: 'Sales Dashboard', analytics: 'Analytics',
    orders:    'Orders',          products:  'Products',
    customers: 'Customers',       reports:   'Reports',
    geo:       'Geo Map',
  };
  document.getElementById('tbTitle').textContent = titles[page] || page;
  closeSb();
}

// ══ DATE RANGE ════════════════════════════════════════════════
function setDateRange(val) {
  const subs = {
    today:   'Overview · Today',
    week:    'Overview · This Week',
    month:   'Overview · This Month',
    quarter: 'Overview · Q1 2026',
    year:    'Overview · 2026',
  };
  document.getElementById('tbSub').textContent = subs[val] || 'Overview';
}

// ══ FILTER CHIPS ══════════════════════════════════════════════
function toggleChip(el) {
  const parent = el.parentElement;
  const allChips = [...parent.children].filter(c => c.classList.contains('filter-chip'));

  if (el.textContent.trim() === 'All') {
    allChips.forEach(c => c.classList.remove('on'));
    el.classList.add('on');
  } else {
    if (el.classList.contains('on')) {
      el.classList.remove('on');
    } else {
      el.classList.add('on');
      allChips.find(c => c.textContent.trim() === 'All')?.classList.remove('on');
    }
  }
}

// ══ DETAIL PANEL ══════════════════════════════════════════════
function openPanel(title, html) {
  document.getElementById('dpTitle').textContent = title;
  document.getElementById('dpBody').innerHTML    = html;
  document.getElementById('detailPanel').classList.add('open');
  document.getElementById('panelOverlay').classList.add('show');
}
function closePanel() {
  document.getElementById('detailPanel').classList.remove('open');
  document.getElementById('panelOverlay').classList.remove('show');
}

// ══ TOAST ═════════════════════════════════════════════════════
function showToast(ico, txt, sub) {
  document.getElementById('toastIco').textContent = ico;
  document.getElementById('toastTxt').textContent = txt;
  document.getElementById('toastSub').textContent = sub;
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ══ KPI CARDS ═════════════════════════════════════════════════
function buildKPIs() {
  const cardClsMap = {gold:'card-cyan',em:'card-em',rose:'card-rose',sky:'card-cyan',violet:'card-violet',amber:'card-amber',teal:'card-em'};
  document.getElementById('kpiGrid').innerHTML = kpiDefs.map((k, i) => {
    const cc = cardClsMap[k.cls] || 'card-cyan';
    return `
    <div class="card ${cc} kpi-card reveal" style="transition-delay:${i*0.06}s">
      <div class="kpi-top">
        <div class="kpi-icon ic-${k.cls}">${k.icon}</div>
        <div class="kpi-trend ${k.up ? 'up' : 'dn'}">
          ${k.up ? '↑' : '↓'} ${k.trend.replace(/[↑↓+\-#]/g, '')}
        </div>
      </div>
      <div class="kpi-val kv-${k.cls}" id="kv${i}">—</div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-sub">${k.sub}</div>
      <div class="kpi-mini-chart" id="spark-${i}"></div>
    </div>`;
  }).join('');

  setTimeout(() => {
    kpiDefs.forEach((k, i) => {
      const el = document.getElementById('kv' + i);
      el.textContent  = k.val;
      el.style.animation = 'pop .3s ease';
    });
    buildSparklines();
  }, 200);
}

// ══ EXPORT CSV ════════════════════════════════════════════════
function exportCSV() {
  const headers = ['Order ID', 'Customer', 'Product', 'Payment', 'Amount (₹)', 'Date', 'Status'];
  const rows    = [headers];

  ordersData.forEach(r => rows.push([
    r.id, r.customer, r.product, r.pay, '₹' + r.amount, r.date, r.status,
  ]));

  const csv = rows.map(r => r.map(v => '"' + v + '"').join(',')).join('\n');
  const a   = Object.assign(document.createElement('a'), {
    href:     'data:text/csv;charset=utf-8,' + encodeURIComponent(csv),
    download: 'shopos_report_' + new Date().toISOString().slice(0, 10) + '.csv',
  });
  a.click();
  showToast('✅', 'CSV Downloaded!', 'shopos_report.csv saved successfully');
}

// ══ EXPORT PDF ════════════════════════════════════════════════
function exportPDF() {
  showToast('📄', 'Preparing PDF...', 'Opening print dialog');
  setTimeout(() => {
    const w = window.open('', '_blank', 'width=960,height=720');
    w.document.write(`<!DOCTYPE html><html><head>
      <title>ShopOS — Sales Report</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:Arial,sans-serif;padding:28px;font-size:12px;color:#111}
        .hdr{display:flex;justify-content:space-between;align-items:flex-start;
             margin-bottom:24px;padding-bottom:14px;border-bottom:2px solid #f5c518}
        .brand{font-size:26px;font-weight:900;letter-spacing:3px}
        .brand span{color:#f5c518}
        .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}
        .kpi{background:#f9f9f9;border:1px solid #eee;border-radius:8px;padding:12px;text-align:center}
        .kn{font-size:20px;font-weight:900;color:#f5c518}
        .kl{font-size:10px;color:#888;margin-top:2px;text-transform:uppercase}
        h3{font-size:13px;font-weight:700;border-left:3px solid #f5c518;padding-left:8px;margin-bottom:10px}
        table{width:100%;border-collapse:collapse;font-size:11px;margin-bottom:20px}
        thead{background:#f5c518}
        th{padding:7px 10px;text-align:left;font-weight:700;font-size:10px}
        tbody tr:nth-child(even){background:#fafafa}
        td{padding:6px 10px;border-bottom:1px solid #f0f0f0}
        .ft{border-top:1px solid #eee;padding-top:10px;font-size:10px;color:#999;
            display:flex;justify-content:space-between}
        @media print{body{padding:14px}}
      </style></head><body>
      <div class="hdr">
        <div>
          <div class="brand">Shop<span>OS</span></div>
          <div style="font-size:10px;color:#999;margin-top:2px">Enterprise Sales Platform</div>
        </div>
        <div style="text-align:right;font-size:11px;color:#555">
          <strong>Monthly Sales Report</strong><br>March 2026<br>
          ${new Date().toLocaleDateString('en-IN')}
        </div>
      </div>
      <div class="kpis">
        <div class="kpi"><div class="kn">₹52.4L</div><div class="kl">Revenue</div></div>
        <div class="kpi"><div class="kn">₹18.2L</div><div class="kl">Net Profit</div></div>
        <div class="kpi"><div class="kn">3,842</div><div class="kl">Orders</div></div>
        <div class="kpi"><div class="kn">1,293</div><div class="kl">New Customers</div></div>
      </div>
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th><th>Customer</th><th>Product</th>
            <th>Payment</th><th>Amount</th><th>Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${ordersData.slice(0, 10).map(r => `
            <tr>
              <td>${r.id}</td><td>${r.customer}</td><td>${r.product}</td>
              <td>${r.pay}</td><td>₹${r.amount.toLocaleString()}</td>
              <td>${r.date}</td><td>${r.status}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      <h3>Top Products</h3>
      <table>
        <thead>
          <tr><th>Product</th><th>Category</th><th>Units Sold</th><th>Revenue</th><th>Margin</th></tr>
        </thead>
        <tbody>
          ${prodsData.map(p => `
            <tr>
              <td>${p.name}</td><td>${p.cat}</td><td>${p.units}</td>
              <td>₹${(p.rev / 100000).toFixed(1)}L</td><td>${p.margin}%</td>
            </tr>`).join('')}
        </tbody>
      </table>
      <div class="ft">
        <span>© 2026 ShopOS Inc. — Confidential</span>
        <span>Page 1 of 1</span>
      </div>
      <script>window.onload = () => window.print();<\/script>
    </body></html>`);
    w.document.close();
  }, 300);
}