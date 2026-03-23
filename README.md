# ShopOS Dashboard

E-Commerce Sales Dashboard — Multi-page SPA with animations.

---

## Folder Structure

```
shopos/
├── index.html          ← Open this in browser
├── css/
│   └── styles.css      ← All styles & CSS variables
├── js/
│   ├── data.js         ← All static data (orders, products, customers)
│   ├── charts.js       ← Chart.js chart functions
│   ├── pages.js        ← Page render functions
│   └── main.js         ← Cursor, particles, navigation, counters
└── assets/             ← (Add images/icons here later)
```

---

## How to Run

### Option 1 — Direct open (simplest)
Double click `index.html` → opens in Chrome/Edge/Firefox

### Option 2 — VS Code Live Server (recommended)
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Opens at `http://localhost:5500`

---

## Pages

| Sidebar Icon | Page       | Features                              |
|-------------|------------|---------------------------------------|
| ⊞           | Dashboard  | Stats, Charts, Feed, Products, KPIs   |
| 📦           | Orders     | Table, Search, Filter, Pagination     |
| 🏷️           | Products   | Card grid, Stock bars, Low stock alert|
| 👥           | Customers  | Cards, VIP/Active/New badges          |

---

## JS File Load Order (important!)

In `index.html`, scripts load in this order:
```html
<script src="js/data.js"></script>    <!-- 1. Data first -->
<script src="js/charts.js"></script>  <!-- 2. Charts (needs data) -->
<script src="js/pages.js"></script>   <!-- 3. Pages (needs data) -->
<script src="js/main.js"></script>    <!-- 4. Main (needs all above) -->
```

---

## Customizing Data

All data is in `js/data.js` — edit arrays to change:
- `orders[]`     → Order table rows
- `allProds[]`   → Product cards
- `custs[]`      → Customer cards
- `topProds[]`   → Dashboard top products list
- `lineChartData` / `barChartData` → Chart numbers

---

## Next Steps

- [ ] Connect to real backend API (replace hardcoded data with `fetch()`)
- [ ] Add Login / Auth page
- [ ] Convert to React / Next.js
- [ ] Deploy on Vercel
