// ============================================================
//  data.js — All static data
//  Replace these arrays with real API fetch() calls later
// ============================================================
// ── Orders ───────────────────────────────────────────────────
const ordersData = [
  { id:'#4821', customer:'Priya S.',   product:'Wireless Earbuds Pro', pay:'UPI',         amount:3840, date:'2026-03-21', status:'Pending'   },
  { id:'#4820', customer:'Rohan M.',   product:'Running Shoes X9',     pay:'Card',        amount:2199, date:'2026-03-21', status:'Delivered'  },
  { id:'#4819', customer:'Kavya R.',   product:'Laptop Stand Deluxe',  pay:'Net Banking', amount:1499, date:'2026-03-20', status:'Shipped'    },
  { id:'#4818', customer:'Sana A.',    product:'Glow Serum Kit',       pay:'UPI',         amount:899,  date:'2026-03-20', status:'Delivered'  },
  { id:'#4817', customer:'Dev P.',     product:'Phone Case Ultra',     pay:'COD',         amount:499,  date:'2026-03-19', status:'Delivered'  },
  { id:'#4816', customer:'Meera J.',   product:'Yoga Mat Pro',         pay:'Card',        amount:1299, date:'2026-03-19', status:'Cancelled'  },
  { id:'#4815', customer:'Vikram S.',  product:'Air Purifier X3',      pay:'Net Banking', amount:4999, date:'2026-03-18', status:'Shipped'    },
  { id:'#4814', customer:'Arjun K.',   product:'Sunscreen SPF50',      pay:'UPI',         amount:349,  date:'2026-03-18', status:'Delivered'  },
  { id:'#4813', customer:'Nisha P.',   product:'Smart Watch Elite',    pay:'Card',        amount:7499, date:'2026-03-17', status:'Delivered'  },
  { id:'#4812', customer:'Raj S.',     product:'Denim Jacket',         pay:'UPI',         amount:1899, date:'2026-03-17', status:'Shipped'    },
  { id:'#4811', customer:'Ananya D.',  product:'Face Cream Pro',       pay:'COD',         amount:699,  date:'2026-03-16', status:'Delivered'  },
  { id:'#4810', customer:'Suresh N.',  product:'Gym Gloves X',         pay:'Card',        amount:449,  date:'2026-03-16', status:'Pending'    },
];
// ── Products ─────────────────────────────────────────────────
const prodsData = [
  { name:'Wireless Earbuds Pro', cat:'Electronics', units:458, rev:1831920, margin:42, stock:12  },
  { name:'Running Shoes X9',     cat:'Fashion',     units:312, rev:685488,  margin:38, stock:86  },
  { name:'Laptop Stand Deluxe',  cat:'Home',        units:241, rev:361259,  margin:55, stock:45  },
  { name:'Phone Case Ultra',     cat:'Electronics', units:890, rev:444110,  margin:68, stock:220 },
  { name:'Glow Serum Kit',       cat:'Beauty',      units:176, rev:158224,  margin:62, stock:64  },
  { name:'Smart Watch Elite',    cat:'Electronics', units:98,  rev:734902,  margin:35, stock:18  },
  { name:'Yoga Mat Pro',         cat:'Sports',      units:134, rev:173966,  margin:48, stock:55  },
  { name:'USB-C Hub 7-in-1',     cat:'Electronics', units:76,  rev:144324,  margin:44, stock:8   },
];
// ── Customers ────────────────────────────────────────────────
const custsData = [
  { name:'Priya Sharma',  email:'priya@email.com',  orders:24, spend:482000, last:'2026-03-21', seg:'VIP'       },
  { name:'Rohan Mehta',   email:'rohan@email.com',  orders:18, spend:321000, last:'2026-03-21', seg:'VIP'       },
  { name:'Kavya Reddy',   email:'kavya@email.com',  orders:12, spend:184000, last:'2026-03-20', seg:'Returning' },
  { name:'Dev Patel',     email:'dev@email.com',    orders:8,  spend:128000, last:'2026-03-19', seg:'Returning' },
  { name:'Sana Ansari',   email:'sana@email.com',   orders:2,  spend:18000,  last:'2026-03-20', seg:'New'       },
  { name:'Meera Joshi',   email:'meera@email.com',  orders:21, spend:389000, last:'2026-03-19', seg:'VIP'       },
  { name:'Vikram Singh',  email:'vikram@email.com', orders:9,  spend:141000, last:'2026-03-18', seg:'Returning' },
  { name:'Nisha Pillai',  email:'nisha@email.com',  orders:15, spend:265000, last:'2026-03-17', seg:'VIP'       },
];
// ── KPI Definitions ──────────────────────────────────────────
const kpiDefs = [
  { icon:'💰', cls:'gold',   label:'Total Revenue',      val:'₹52.4L',     sub:'vs ₹44.3L last period',  trend:'+18.3%', up:true,  spark:[42,48,44,55,58,62,52,65,70,68,75,82]  },
  { icon:'📈', cls:'em',     label:'Net Profit',         val:'₹18.2L',     sub:'34.7% margin',            trend:'+12.1%', up:true,  spark:[14,16,15,18,19,21,18,22,24,23,26,28]  },
  { icon:'📦', cls:'sky',    label:'Total Orders',       val:'3,842',      sub:'284 today · 18 pending',  trend:'+11.7%', up:true,  spark:[280,310,290,340,360,380,340,390,410,400,430,450] },
  { icon:'🎯', cls:'amber',  label:'Avg Order Value',    val:'₹1,840',     sub:'Revenue ÷ Orders',        trend:'+5.6%',  up:true,  spark:[1600,1680,1720,1700,1780,1810,1760,1820,1840,1830,1860,1840] },
  { icon:'👥', cls:'rose',   label:'New Customers',      val:'1,293',      sub:'63% returning buyers',    trend:'+24.1%', up:true,  spark:[80,95,88,105,112,120,108,125,132,128,138,145] },
  { icon:'🏆', cls:'violet', label:'Top Product',        val:'Earbuds Pro', sub:'458 units · ₹18.3L rev', trend:'#1',     up:true,  spark:[30,38,35,42,48,52,45,55,60,58,65,70] },
  { icon:'🔄', cls:'teal',   label:'Conversion Rate',   val:'3.8%',       sub:'14,820 visitors / week',  trend:'-0.8%',  up:false, spark:[4.1,3.9,4.0,3.8,4.2,4.0,3.9,4.1,3.7,3.8,3.9,3.8] },
  { icon:'🛒', cls:'gold',   label:'Top Category',       val:'Electronics', sub:'₹28.4L · 38% share',    trend:'+22%',   up:true,  spark:[18,22,20,25,28,32,28,34,36,34,38,42] },
];
// ── Chart Data ────────────────────────────────────────────────
const revData = {
  daily:   { labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], rev:[128,192,156,234,198,312,278],  profit:[44,68,53,82,69,110,97]  },
  weekly:  { labels:['W1','W2','W3','W4','W5','W6','W7','W8'],  rev:[820,940,1100,880,1340,1200,1480,1320], profit:[286,329,385,308,469,420,518,462] },
  monthly: { labels:['Sep','Oct','Nov','Dec','Jan','Feb','Mar'],rev:[3200,3800,4100,4800,5000,5100,5248], profit:[1120,1330,1435,1680,1750,1785,1837] },
};
const chanData = {
  weekly:  { labels:['W1','W2','W3','W4','W5','W6','W7','W8'],        online:[480,560,640,520,780,700,860,780], offline:[340,380,460,360,560,500,620,540] },
  monthly: { labels:['Sep','Oct','Nov','Dec','Jan','Feb','Mar'], online:[1900,2200,2400,2800,2900,3000,3100], offline:[1300,1600,1700,2000,2100,2100,2148] },
};
// ── Funnel Steps ──────────────────────────────────────────────
const funnelSteps = [
  { label:'Visitors',     val:14820, pct:100,  color:'#f5c518' },
  { label:'Product Views',val:8930,  pct:60,   color:'#ffb020' },
  { label:'Add to Cart',  val:3940,  pct:27,   color:'#00e5a0' },
  { label:'Checkout',     val:2210,  pct:15,   color:'#22d3ee' },
  { label:'Orders',       val:1640,  pct:11,   color:'#c084fc' },
  { label:'Payments',     val:1580,  pct:10.7, color:'#ff3f6c' },
];
// ── Insights ──────────────────────────────────────────────────
const insightsData = [
  { dot:'#f5c518', txt:'<strong>Top selling product</strong> this week: Wireless Earbuds Pro with 458 units',     val:'₹18.3L', time:'Today'    },
  { dot:'#00e5a0', txt:'<strong>Revenue up 18.3%</strong> compared to last period — best month of 2026',          val:'+₹8.1L', time:'Mar 2026'  },
  { dot:'#22d3ee', txt:'<strong>Avg order value</strong> increased to ₹1,840 — up ₹98 vs last week',              val:'↑ ₹98',  time:'This week' },
  { dot:'#c084fc', txt:'<strong>Electronics category</strong> dominates with 38% revenue share this month',       val:'38%',    time:'Mar 2026'  },
  { dot:'#ffb020', txt:'<strong>Conversion rate</strong> peaked at 4.2% on Friday — best day of the week',       val:'4.2%',   time:'Fri'       },
];
const alertsData = [
  { cls:'al-r', ico:'⚠️', txt:'<strong>Low stock:</strong> Wireless Earbuds Pro — only 12 units left',   time:'Now'       },
  { cls:'al-r', ico:'⚠️', txt:'<strong>Low stock:</strong> USB-C Hub 7-in-1 — only 8 units left',         time:'Now'       },
  { cls:'al-g', ico:'🎉', txt:'<strong>Milestone:</strong> Monthly revenue crossed ₹50L!',                 time:'2h ago'    },
  { cls:'al-s', ico:'🚚', txt:'<strong>3 shipments</strong> delayed — delivery pushed by 1 day',           time:'4h ago'    },
  { cls:'al-e', ico:'✓',  txt:'<strong>Payment gateway</strong> upgraded successfully — 0 downtime',      time:'Yesterday' },
];
// ── Live feed event pool ──────────────────────────────────────
const liveEvents = [
  { ico:'📦', bg:'rgba(245,197,24,.1)',  txt:'<strong>New order</strong> placed — Smart Watch Elite · ₹7,499'    },
  { ico:'💳', bg:'rgba(0,229,160,.1)',   txt:'Payment received from <strong>Nisha P.</strong> · ₹7,499'           },
  { ico:'⭐', bg:'rgba(192,132,252,.1)', txt:'<strong>5★ review</strong> on Laptop Stand Deluxe by Kavya R.'      },
  { ico:'🚚', bg:'rgba(34,211,238,.1)',  txt:'Order <strong>#4822</strong> out for delivery — Bangalore'           },
  { ico:'👥', bg:'rgba(34,211,238,.1)',  txt:'<strong>New customer</strong> Arun V. registered'                    },
  { ico:'↩️', bg:'rgba(255,63,108,.1)',  txt:'Return <strong>#R202</strong> approved — Gym Gloves X'               },
  { ico:'💰', bg:'rgba(245,197,24,.1)',  txt:'Flash sale started — <strong>Electronics 15% off</strong>'           },
];
// ── Style lookup maps ─────────────────────────────────────────
const statusClass = { Delivered:'b-ok', Pending:'b-pd', Shipped:'b-sh', Cancelled:'b-cn' };
const statusIcon  = { Delivered:'✓', Pending:'⧖', Shipped:'🚚', Cancelled:'✕' };
const payIcon     = { UPI:'📱', Card:'💳', COD:'💵', 'Net Banking':'🏦' };
const segBadge    = { VIP:'b-vip', New:'b-new', Returning:'b-ret' };