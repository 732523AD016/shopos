// ============================================================
//  charts.js — All ApexCharts build functions
//  Depends on: data.js
// ============================================================

let revChart, catChart, channelChart, regionChart, custSegChart;
let curRevPeriod  = 'weekly';
let curChanPeriod = 'weekly';

function clr() {
  const d = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    text:   d ? '#6b6f88' : '#5a5e78',
    grid:   d ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.05)',
    gold:   '#f5c518', em: '#00e5a0', rose: '#ff3f6c',
    sky:    '#22d3ee', violet: '#c084fc', amber: '#ffb020', teal: '#14b8a6',
    bg:     d ? '#0d0f16' : '#ffffff',
    bg3:    d ? '#13151f' : '#f5f7ff',
  };
}

function baseApex() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    chart: {
      background: 'transparent',
      toolbar:    { show: false },
      animations: { enabled: true, easing: 'easeinout', speed: 600 },
      fontFamily: 'Plus Jakarta Sans',
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    grid:  { borderColor: clr().grid, strokeDashArray: 3 },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      style: { fontFamily: 'Plus Jakarta Sans' },
    },
    dataLabels: { enabled: false },
    legend: {
      labels:    { colors: clr().text },
      fontFamily:'Plus Jakarta Sans',
      fontSize:  '12px',
    },
  };
}

function buildSparklines() {
  kpiDefs.forEach((k, i) => {
    const el = document.getElementById('spark-' + i);
    if (!el) return;
    const color = {
      em: '#00e5a0', rose: '#ff3f6c', sky: '#22d3ee',
      violet: '#c084fc', amber: '#ffb020', teal: '#14b8a6',
    }[k.cls] || '#f5c518';

    new ApexCharts(el, {
      ...baseApex(),
      chart: { ...baseApex().chart, type: 'area', height: 36, sparkline: { enabled: true } },
      series:  [{ data: k.spark }],
      colors:  [color],
      fill:    { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: .5, opacityTo: 0 } },
      stroke:  { curve: 'smooth', width: 2 },
      tooltip: { enabled: false },
    }).render();
  });
}

function buildRevenueChart(period = 'weekly') {
  curRevPeriod = period;
  const d = revData[period];
  const c = clr();
  if (revChart) revChart.destroy();

  revChart = new ApexCharts(document.getElementById('revenueChart'), {
    ...baseApex(),
    chart: {
      ...baseApex().chart,
      type: 'area', height: 240,
      zoom:    { enabled: true },
      toolbar: {
        show: true,
        tools: { zoom: true, zoomin: true, zoomout: true, pan: true, reset: true },
      },
    },
    series: [
      { name: 'Revenue (₹K)',  data: d.rev    },
      { name: 'Profit (₹K)',   data: d.profit },
    ],
    colors: [c.gold, c.em],
    xaxis: {
      categories: d.labels,
      labels:     { style: { colors: c.text, fontFamily: 'Space Mono', fontSize: '10px' } },
    },
    yaxis: {
      labels: {
        style:     { colors: c.text, fontFamily: 'Space Mono', fontSize: '9px' },
        formatter: v => '₹' + v + 'K',
      },
    },
    stroke:  { curve: 'smooth', width: [2.5, 2], dashArray: [0, 4] },
    fill: {
      type:     'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: [.35, .2], opacityTo: [0, 0], type: 'vertical' },
    },
    tooltip: { y: { formatter: v => '₹' + v + 'K' } },
    markers: { size: [4, 3] },
  });
  revChart.render();
}

function buildCategoryDonut() {
  const c = clr();
  if (catChart) catChart.destroy();

  catChart = new ApexCharts(document.getElementById('categoryDonut'), {
    ...baseApex(),
    chart: {
      ...baseApex().chart,
      type: 'donut', height: 240,
      events: {
        dataPointSelection: (e, ctx, cfg) => {
          const labels = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Other'];
          const vals   = [38, 22, 16, 13, 8, 3];
          const lbl    = labels[cfg.dataPointIndex];
          const pct    = vals[cfg.dataPointIndex];
          openPanel(lbl + ' — Category Details', `
            <div class="dp-stat-row">
              <div class="dp-stat"><div class="dp-num">${pct}%</div><div class="dp-lbl">SHARE</div></div>
              <div class="dp-stat"><div class="dp-num">₹${(pct * 1.38).toFixed(1)}L</div><div class="dp-lbl">REVENUE</div></div>
            </div>
            <div style="font-family:'Space Mono',monospace;font-size:.6rem;color:var(--txt3);margin:10px 0 8px;letter-spacing:.08em">TOP PRODUCTS IN ${lbl.toUpperCase()}</div>
            ${['Product A', 'Product B', 'Product C'].map((p, i) => `
              <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="font-family:'Space Mono',monospace;font-size:.6rem;color:var(--gold);width:18px">${i + 1}</span>
                <span style="flex:1;font-size:.76rem;color:var(--txt)">${p}</span>
                <span style="font-family:'Bebas Neue',sans-serif;font-size:.9rem;color:var(--gold)">₹${(4 - i) * 1.2}L</span>
              </div>`).join('')}
          `);
        },
      },
    },
    series: [38, 22, 16, 13, 8, 3],
    labels: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Other'],
    colors: [c.gold, c.em, c.sky, c.violet, c.rose, c.text],
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show:  true,
            total: { show: true, label: 'Total', color: c.text, formatter: () => '₹52.4L' },
          },
        },
      },
    },
    legend: { position: 'bottom', fontSize: '11px' },
  });
  catChart.render();
}

function buildChannelBar(period = 'weekly') {
  curChanPeriod = period;
  const d = chanData[period];
  const c = clr();
  if (channelChart) channelChart.destroy();

  channelChart = new ApexCharts(document.getElementById('channelBar'), {
    ...baseApex(),
    chart: { ...baseApex().chart, type: 'bar', height: 200, stacked: true },
    series: [
      { name: 'Online',  data: d.online  },
      { name: 'Offline', data: d.offline },
    ],
    colors: [c.gold, c.sky],
    xaxis: {
      categories: d.labels,
      labels: { style: { colors: c.text, fontFamily: 'Space Mono', fontSize: '9px' } },
    },
    yaxis: {
      labels: {
        style:     { colors: c.text, fontFamily: 'Space Mono', fontSize: '9px' },
        formatter: v => '₹' + v + 'K',
      },
    },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
    tooltip: { y: { formatter: v => '₹' + v + 'K' } },
  });
  channelChart.render();
}

function buildRegionChart() {
  const c = clr();
  if (regionChart) regionChart.destroy();

  regionChart = new ApexCharts(document.getElementById('regionChart'), {
    ...baseApex(),
    chart: { ...baseApex().chart, type: 'bar', height: 220 },
    series: [{ name: 'Revenue (₹L)', data: [8.4, 5.2, 4.8, 4.1, 2.9, 2.6, 2.3, 2.1] }],
    colors: [c.gold],
    xaxis: {
      categories: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'W.Bengal', 'Gujarat', 'UP', 'Telangana'],
      labels: { style: { colors: c.text, fontFamily: 'Space Mono', fontSize: '8px' } },
    },
    yaxis: {
      labels: {
        style:     { colors: c.text, fontFamily: 'Space Mono', fontSize: '9px' },
        formatter: v => '₹' + v + 'L',
      },
    },
    plotOptions: { bar: { borderRadius: 5, columnWidth: '55%' } },
    fill: { type: 'gradient', gradient: { shadeIntensity: .5, opacityFrom: 1, opacityTo: .7 } },
    tooltip: { y: { formatter: v => '₹' + v + 'L' } },
  });
  regionChart.render();
}

function buildCustSegChart() {
  const c = clr();
  if (custSegChart) custSegChart.destroy();

  custSegChart = new ApexCharts(document.getElementById('customerSegChart'), {
    ...baseApex(),
    chart:  { ...baseApex().chart, type: 'pie', height: 220 },
    series: [37, 63],
    labels: ['New Customers', 'Returning Customers'],
    colors: [c.sky, c.em],
    legend: { position: 'bottom', fontSize: '11px' },
    plotOptions: { pie: { dataLabels: { offset: -10 } } },
    tooltip: { y: { formatter: v => v + '%' } },
  });
  custSegChart.render();
}

function buildFunnel() {
  const wrap = document.getElementById('funnelWrap');
  wrap.innerHTML = '';

  funnelSteps.forEach((s, i) => {
    if (i > 0) {
      const prev = funnelSteps[i - 1];
      const drop = ((prev.val - s.val) / prev.val * 100).toFixed(1);
      const arrow = document.createElement('div');
      arrow.className = 'funnel-arrow';
      arrow.innerHTML = `<span class="funnel-drop">−${drop}% drop</span> ↓`;
      wrap.appendChild(arrow);
    }
    const row = document.createElement('div');
    row.className = 'funnel-step';
    row.innerHTML = `
      <div class="funnel-bar-outer">
        <div class="funnel-bar-inner"
             data-w="${s.pct}"
             style="background:linear-gradient(90deg,${s.color}cc,${s.color}88);width:0">
          <span class="funnel-label">${s.label}</span>
        </div>
      </div>
      <div class="funnel-val-col">
        <div class="funnel-num">${s.val.toLocaleString()}</div>
        <div class="funnel-pct">${s.pct}%</div>
      </div>`;
    wrap.appendChild(row);
  });

  setTimeout(() => {
    document.querySelectorAll('.funnel-bar-inner').forEach(b => {
      b.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
      b.style.width = b.dataset.w + '%';
    });
  }, 200);
}

function buildHeatmap() {
  const days  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['6a', '9a', '12p', '3p', '6p', '9p', '12a'];
  const data  = days.map(() => hours.map(() => Math.floor(Math.random() * 100)));
  const wrap  = document.getElementById('heatmapWrap');

  let html = `<div class="hm-col-labels">
    ${hours.map(h => `<div class="hm-col-lbl">${h}</div>`).join('')}
  </div>`;

  data.forEach((row, i) => {
    html += `<div class="heatmap-row"><span class="hm-label">${days[i]}</span><div class="hm-cells">`;
    row.forEach(val => {
      const alpha = 0.08 + val / 100 * 0.85;
      const color = val > 70
        ? `rgba(255,63,108,${alpha})`
        : val > 40
          ? `rgba(245,197,24,${alpha})`
          : `rgba(34,211,238,${alpha})`;
      html += `<div class="hm-cell" style="background:${color}" title="${val} orders"></div>`;
    });
    html += `</div></div>`;
  });

  html += `<div class="hm-legend-row">
    <span class="hm-leg-label">Low</span>
    <div class="hm-leg-cells">
      ${[.15, .3, .5, .7, .9].map(a =>
        `<div class="hm-leg-cell" style="background:rgba(245,197,24,${a})"></div>`
      ).join('')}
    </div>
    <span class="hm-leg-label">High</span>
  </div>`;

  wrap.innerHTML = html;
}

function setRevPeriod(btn, period) {
  btn.closest('.period-tabs').querySelectorAll('.period-tab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  buildRevenueChart(period);
}
function setBarPeriod(btn, period) {
  btn.closest('.period-tabs').querySelectorAll('.period-tab').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  buildChannelBar(period);
}

function rebuildCharts() {
  buildRevenueChart(curRevPeriod);
  buildCategoryDonut();
  buildChannelBar(curChanPeriod);
  buildRegionChart();
  buildCustSegChart();
}