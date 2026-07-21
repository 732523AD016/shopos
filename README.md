# ShopOS Dashboard

E-Commerce Sales Dashboard — Multi-page SPA with animations.

---
Certainly! Here's a sample README file for your sales dashboard project that you can upload to GitHub:

---

# Sales Dashboard Project

A comprehensive sales dashboard built to visualize key sales metrics such as revenue, orders, customer data, and trends in an intuitive and interactive manner.

## Features

- Real-time sales insights
- Visualizations of revenue, orders, customers, and conversion rates
- Revenue trend graphs (Daily, Weekly, Monthly)
- Order status pie chart (Delivered, Pending, Shipped, Canceled)
- Percentage growth indicators
- Interactive filters for detailed analysis

## Technologies Used

- Frontend: [React.js / Angular / Vue.js] (choose as per your project)
- Visualization Libraries: [Chart.js / D3.js / Recharts / Plotly] (choose as per your project)
- Backend: [Node.js / Python / PHP / Others]
- Data Source: [APIs / Databases] (specify your data source)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/732523AD016/shopos.git
   ```
2. Navigate to project directory:
   ```bash
   cd your-732523AD016/shopos
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm start
   ```


## Usage

- Access the dashboard through `http://localhost:3000` (or your specified port).
- Use filters to drill down into specific data segments.
- Hover over graphs for detailed information.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.



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
