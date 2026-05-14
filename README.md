# 📦 SalesIQ — E-Commerce Sales Dashboard

An interactive analytics dashboard built with **React + Recharts**, visualizing 3,500 e-commerce orders across 2022–2024.

![Dashboard Preview](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react) ![Recharts](https://img.shields.io/badge/Recharts-2.x-22b5bf?style=flat) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)

---

## 🚀 Features

- **KPI Cards** — Revenue, Profit, Orders, Avg Order Value, Margin
- **4 Dashboard Tabs** — Overview, Products, Regions, Trends
- **Year Filter** — Slice data by 2022 / 2023 / 2024 or view All
- **Charts** — Line, Bar, Donut, Grouped Bar, Year-over-Year overlay
- **Product Leaderboard** — Ranked table with margin and quantity
- **Dark theme** with custom typography (Syne + Space Mono)

---

## 📊 Dataset

| Field        | Description                    |
|--------------|--------------------------------|
| Order Date   | Date of purchase (2022–2024)   |
| Product Name | 10 products (Camera, Laptop…)  |
| Category     | Electronics, Accessories, Office |
| Region       | North, East, South, West       |
| Quantity     | Units ordered                  |
| Sales        | Revenue in USD                 |
| Profit       | Net profit in USD              |

**3,500 total orders · $10.67M total revenue · 17.3% profit margin**

---

## 🛠 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ecommerce-sales-dashboard.git

# 2. Navigate into the project
cd ecommerce-sales-dashboard

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
# Output goes to /dist — ready to deploy on Vercel, Netlify, or GitHub Pages
```

---

## 📁 Project Structure

```
ecommerce-sales-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        ← Main dashboard component (all charts & data)
│   └── main.jsx       ← React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🌐 Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```

Or drag the `/dist` folder to [Netlify Drop](https://app.netlify.com/drop).

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Recharts | Chart library |
| Vite | Build tool & dev server |
| Google Fonts | Syne + Space Mono + DM Sans |

---

## 📄 License

MIT — free to use and modify.
