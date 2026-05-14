import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

// ── DATA ───────────────────────────────────────────────────────────────────────
const KPIs = {
  totalSales: 10667881,
  totalProfit: 1844665.21,
  totalOrders: 3500,
  avgOrder: 3047.97,
  profitMargin: 17.3,
};

const categoryData = [
  { name: "Electronics", sales: 5326074, profit: 923185.59, orders: 1742 },
  { name: "Accessories", sales: 4247591, profit: 736084.74, orders: 1401 },
  { name: "Office",      sales: 1094216, profit: 185394.88, orders: 357  },
];

const regionData = [
  { name: "West",  sales: 2844450, profit: 495358.73 },
  { name: "East",  sales: 2675110, profit: 464888.46 },
  { name: "South", sales: 2659548, profit: 458103.27 },
  { name: "North", sales: 2488773, profit: 426314.75 },
];

const productData = [
  { name: "Camera",      sales: 1177381, profit: 207630.99, qty: 1795 },
  { name: "Monitor",     sales: 1160048, profit: 202028.17, qty: 1876 },
  { name: "Printer",     sales: 1094216, profit: 185394.88, qty: 1734 },
  { name: "Mouse",       sales: 1074398, profit: 185763.69, qty: 1753 },
  { name: "Smartphone",  sales: 1069681, profit: 183296.97, qty: 1617 },
  { name: "Smartwatch",  sales: 1049211, profit: 178995.81, qty: 1807 },
  { name: "Keyboard",    sales: 1024507, profit: 175814.68, qty: 1684 },
  { name: "Tablet",      sales: 1023928, profit: 167505.01, qty: 1733 },
  { name: "Laptop",      sales: 1005873, profit: 185756.81, qty: 1658 },
  { name: "Headphones",  sales: 988638,  profit: 172478.20, qty: 1604 },
];

const monthlyRaw = [
  {year:2022,month:"Jan",sales:341544,profit:63827},{year:2022,month:"Feb",sales:208775,profit:34085},{year:2022,month:"Mar",sales:294660,profit:51932},{year:2022,month:"Apr",sales:230624,profit:44260},{year:2022,month:"May",sales:314295,profit:53505},{year:2022,month:"Jun",sales:273851,profit:48491},{year:2022,month:"Jul",sales:214627,profit:40010},{year:2022,month:"Aug",sales:296242,profit:47552},{year:2022,month:"Sep",sales:240211,profit:41403},{year:2022,month:"Oct",sales:324989,profit:52927},{year:2022,month:"Nov",sales:257111,profit:50121},{year:2022,month:"Dec",sales:259041,profit:44744},
  {year:2023,month:"Jan",sales:343256,profit:63709},{year:2023,month:"Feb",sales:313931,profit:53645},{year:2023,month:"Mar",sales:303391,profit:53443},{year:2023,month:"Apr",sales:280808,profit:49179},{year:2023,month:"May",sales:346481,profit:59088},{year:2023,month:"Jun",sales:251686,profit:43446},{year:2023,month:"Jul",sales:320798,profit:55207},{year:2023,month:"Aug",sales:388428,profit:65591},{year:2023,month:"Sep",sales:303409,profit:51010},{year:2023,month:"Oct",sales:253145,profit:44506},{year:2023,month:"Nov",sales:306195,profit:52537},{year:2023,month:"Dec",sales:375064,profit:75506},
  {year:2024,month:"Jan",sales:282814,profit:49744},{year:2024,month:"Feb",sales:179708,profit:31228},{year:2024,month:"Mar",sales:341563,profit:56762},{year:2024,month:"Apr",sales:310444,profit:52182},{year:2024,month:"May",sales:373911,profit:60700},{year:2024,month:"Jun",sales:314268,profit:51262},{year:2024,month:"Jul",sales:309515,profit:54026},{year:2024,month:"Aug",sales:240269,profit:39817},{year:2024,month:"Sep",sales:341926,profit:57852},{year:2024,month:"Oct",sales:314135,profit:55595},{year:2024,month:"Nov",sales:291769,profit:42180},{year:2024,month:"Dec",sales:324997,profit:53593},
];

const COLORS = ["#00d4aa", "#4f8ef7", "#ff6b6b", "#ffd166", "#a855f7", "#fb923c"];

const fmt = (n) => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(1)}K` : `$${n}`;
const fmtFull = (n) => `$${n.toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2})}`;

// ── COMPONENTS ─────────────────────────────────────────────────────────────────
function KPICard({ label, value, sub, color, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid rgba(255,255,255,0.08)`,
      borderRadius: 16,
      padding: "24px 28px",
      borderTop: `3px solid ${color}`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ color: "#888", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>{label}</div>
      <div style={{ color, fontSize: 28, fontWeight: 700, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: "#666", fontSize: 12, marginTop: 6, fontFamily: "'Space Mono', monospace" }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, marginTop: 36 }}>
      <div style={{ width: 4, height: 20, background: "linear-gradient(180deg,#00d4aa,#4f8ef7)", borderRadius: 2 }} />
      <h2 style={{ margin: 0, fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#e0e0e0", letterSpacing: "0.04em", textTransform: "uppercase" }}>{children}</h2>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 10, padding: "10px 16px", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>
      <div style={{ color: "#888", marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || "#00d4aa" }}>
          {p.name}: {typeof p.value === "number" ? fmtFull(p.value) : p.value}
        </div>
      ))}
    </div>
  );
};

// ── MAIN APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedYear, setSelectedYear] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");
  const [metric, setMetric] = useState("sales");

  const monthlyFiltered = selectedYear === "All"
    ? (() => {
        const byMonth = {};
        monthlyRaw.forEach(r => {
          if (!byMonth[r.month]) byMonth[r.month] = { month: r.month, sales: 0, profit: 0 };
          byMonth[r.month].sales += r.sales;
          byMonth[r.month].profit += r.profit;
        });
        const order = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return order.map(m => byMonth[m]);
      })()
    : monthlyRaw.filter(r => r.year === +selectedYear);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "products", label: "Products" },
    { id: "regions",  label: "Regions" },
    { id: "trends",   label: "Trends" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d1a",
      color: "#e0e0e0",
      fontFamily: "'DM Sans', sans-serif",
      padding: "0 0 60px",
    }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#0d0d1a 0%,#12122a 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "28px 40px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(20px)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#00d4aa,#4f8ef7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📦</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: "0.02em" }}>SalesIQ</span>
            <span style={{ background: "rgba(0,212,170,0.12)", color: "#00d4aa", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "'Space Mono', monospace", border: "1px solid rgba(0,212,170,0.2)" }}>LIVE</span>
          </div>
          <div style={{ color: "#555", fontSize: 11, marginTop: 3, fontFamily: "'Space Mono', monospace" }}>E-Commerce Analytics · 2022–2024 · 3,500 Orders</div>
        </div>
        {/* Year filter */}
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "2022", "2023", "2024"].map(y => (
            <button key={y} onClick={() => setSelectedYear(y)} style={{
              background: selectedYear === y ? "linear-gradient(135deg,#00d4aa,#4f8ef7)" : "rgba(255,255,255,0.04)",
              color: selectedYear === y ? "#0d0d1a" : "#666",
              border: "1px solid " + (selectedYear === y ? "transparent" : "rgba(255,255,255,0.08)"),
              borderRadius: 8, padding: "6px 14px", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
              transition: "all 0.2s",
            }}>{y}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 40px 0" }}>

        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
          <KPICard label="Total Revenue"  value={fmt(KPIs.totalSales)}   sub="Across all regions"       color="#00d4aa" delay={0} />
          <KPICard label="Total Profit"   value={fmt(KPIs.totalProfit)}  sub="Net after cost"           color="#4f8ef7" delay={80} />
          <KPICard label="Total Orders"   value="3,500"                  sub="Jan 2022 – Dec 2024"      color="#ffd166" delay={160} />
          <KPICard label="Avg Order Value" value={fmtFull(KPIs.avgOrder)} sub="Per transaction"         color="#a855f7" delay={240} />
          <KPICard label="Profit Margin"  value={`${KPIs.profitMargin}%`} sub="Revenue efficiency"      color="#fb923c" delay={320} />
        </div>

        {/* Nav Tabs */}
        <div style={{ display: "flex", gap: 4, marginTop: 36, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: activeTab === t.id ? "#00d4aa" : "#555",
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
              padding: "10px 20px",
              borderBottom: activeTab === t.id ? "2px solid #00d4aa" : "2px solid transparent",
              marginBottom: -1, transition: "all 0.2s",
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div>
            <SectionTitle>Monthly Sales vs Profit</SectionTitle>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "24px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyFiltered}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#555", fontSize: 11, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontFamily: "Space Mono", fontSize: 11, color: "#888" }} />
                  <Line type="monotone" dataKey="sales"  stroke="#00d4aa" strokeWidth={2.5} dot={false} name="Sales" />
                  <Line type="monotone" dataKey="profit" stroke="#4f8ef7" strokeWidth={2.5} dot={false} name="Profit" strokeDasharray="5 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
              {/* Category Breakdown */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <SectionTitle>Category Breakdown</SectionTitle>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="sales" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3}>
                      {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => fmtFull(v)} contentStyle={{ background: "#1a1a2e", border: "1px solid #333", fontFamily: "Space Mono", fontSize: 11 }} />
                    <Legend wrapperStyle={{ fontFamily: "Space Mono", fontSize: 11, color: "#888" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                  {categoryData.map((c, i) => (
                    <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                        <span style={{ fontSize: 12, color: "#aaa", fontFamily: "Space Mono" }}>{c.name}</span>
                      </div>
                      <span style={{ fontSize: 12, color: "#e0e0e0", fontFamily: "Space Mono", fontWeight: 700 }}>{fmt(c.sales)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Region Sales */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <SectionTitle>Sales by Region</SectionTitle>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={regionData} layout="vertical" margin={{ left: 10, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#555", fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#aaa", fontSize: 11, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} width={50} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="sales" name="Sales" radius={[0, 6, 6, 0]}>
                      {regionData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                  {regionData.map((r, i) => (
                    <div key={r.name} style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                        <span style={{ fontSize: 12, color: "#aaa", fontFamily: "Space Mono" }}>{r.name}</span>
                      </div>
                      <span style={{ fontSize: 12, color: "#e0e0e0", fontFamily: "Space Mono", fontWeight: 700 }}>{fmt(r.sales)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUCTS TAB ── */}
        {activeTab === "products" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginTop: 28, marginBottom: 20 }}>
              {["sales", "profit", "qty"].map(m => (
                <button key={m} onClick={() => setMetric(m)} style={{
                  background: metric === m ? "rgba(0,212,170,0.15)" : "rgba(255,255,255,0.04)",
                  color: metric === m ? "#00d4aa" : "#555",
                  border: "1px solid " + (metric === m ? "rgba(0,212,170,0.3)" : "rgba(255,255,255,0.08)"),
                  borderRadius: 8, padding: "6px 18px", cursor: "pointer",
                  fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
                  transition: "all 0.2s", textTransform: "capitalize",
                }}>{m === "qty" ? "Quantity" : m.charAt(0).toUpperCase() + m.slice(1)}</button>
              ))}
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "24px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={[...productData].sort((a,b) => b[metric]-a[metric])} margin={{ top: 10, right: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" />
                  <YAxis tick={{ fill: "#555", fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} tickFormatter={v => metric === "qty" ? v : `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey={metric} name={metric === "qty" ? "Quantity" : metric.charAt(0).toUpperCase() + metric.slice(1)} radius={[6, 6, 0, 0]}>
                    {productData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Product table */}
            <div style={{ marginTop: 24, background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Rank", "Product", "Sales", "Profit", "Margin %", "Qty Sold"].map(h => (
                      <th key={h} style={{ padding: "14px 20px", textAlign: h === "Rank" ? "center" : "left", color: "#555", fontSize: 10, fontFamily: "Space Mono", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...productData].sort((a,b) => b.sales - a.sales).map((p, i) => (
                    <tr key={p.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "12px 20px", textAlign: "center" }}>
                        <span style={{ background: i < 3 ? `rgba(${i===0?"0,212,170":i===1?"79,142,247":"255,209,102"},0.15)` : "rgba(255,255,255,0.05)", color: i < 3 ? COLORS[i] : "#555", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "Space Mono", fontWeight: 700 }}>#{i+1}</span>
                      </td>
                      <td style={{ padding: "12px 20px", fontWeight: 500, fontSize: 13 }}>{p.name}</td>
                      <td style={{ padding: "12px 20px", fontFamily: "Space Mono", fontSize: 12, color: "#00d4aa" }}>{fmtFull(p.sales)}</td>
                      <td style={{ padding: "12px 20px", fontFamily: "Space Mono", fontSize: 12, color: "#4f8ef7" }}>{fmtFull(p.profit)}</td>
                      <td style={{ padding: "12px 20px", fontFamily: "Space Mono", fontSize: 12, color: "#ffd166" }}>{((p.profit/p.sales)*100).toFixed(1)}%</td>
                      <td style={{ padding: "12px 20px", fontFamily: "Space Mono", fontSize: 12, color: "#aaa" }}>{p.qty.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── REGIONS TAB ── */}
        {activeTab === "regions" && (
          <div>
            <SectionTitle>Regional Performance</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {regionData.map((r, i) => (
                <div key={r.name} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", borderTop: `3px solid ${COLORS[i]}` }}>
                  <div style={{ color: COLORS[i], fontSize: 12, fontFamily: "Space Mono", fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>● {r.name}</div>
                  <div style={{ fontSize: 26, fontFamily: "Syne", fontWeight: 800, color: "#e0e0e0", marginBottom: 4 }}>{fmt(r.sales)}</div>
                  <div style={{ fontSize: 11, color: "#555", fontFamily: "Space Mono" }}>Sales Revenue</div>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontSize: 16, fontFamily: "Syne", fontWeight: 700, color: "#4f8ef7" }}>{fmt(r.profit)}</div>
                    <div style={{ fontSize: 11, color: "#555", fontFamily: "Space Mono", marginTop: 2 }}>Profit · {((r.profit/r.sales)*100).toFixed(1)}% margin</div>
                  </div>
                  <div style={{ marginTop: 16, background: "rgba(255,255,255,0.04)", borderRadius: 8, height: 6 }}>
                    <div style={{ width: `${(r.sales / 2844450 * 100).toFixed(0)}%`, height: "100%", borderRadius: 8, background: `linear-gradient(90deg,${COLORS[i]},${COLORS[(i+1)%COLORS.length]})` }} />
                  </div>
                  <div style={{ fontSize: 10, color: "#444", fontFamily: "Space Mono", marginTop: 6, textAlign: "right" }}>{(r.sales / 2844450 * 100).toFixed(0)}% of top region</div>
                </div>
              ))}
            </div>

            <SectionTitle>Region Sales vs Profit Comparison</SectionTitle>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "24px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData} margin={{ right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 11, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#555", fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontFamily: "Space Mono", fontSize: 11, color: "#888" }} />
                  <Bar dataKey="sales"  name="Sales"  fill="#00d4aa" radius={[4,4,0,0]} />
                  <Bar dataKey="profit" name="Profit" fill="#4f8ef7" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── TRENDS TAB ── */}
        {activeTab === "trends" && (
          <div>
            <SectionTitle>Year-over-Year Monthly Sales</SectionTitle>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: "24px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart margin={{ right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" type="category" allowDuplicatedCategory={false} data={monthlyRaw.filter(r=>r.year===2022)} tick={{ fill:"#555", fontSize:10, fontFamily:"Space Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill:"#555", fontSize:10, fontFamily:"Space Mono" }} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontFamily:"Space Mono", fontSize:11, color:"#888" }} />
                  {[2022, 2023, 2024].map((yr, i) => (
                    <Line key={yr} data={monthlyRaw.filter(r=>r.year===yr)} type="monotone" dataKey="sales" name={`${yr}`} stroke={COLORS[i]} strokeWidth={2} dot={{ r:3, fill:COLORS[i] }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Annual summary */}
            <SectionTitle>Annual Summary</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[2022, 2023, 2024].map((yr, i) => {
                const rows = monthlyRaw.filter(r=>r.year===yr);
                const totalS = rows.reduce((a,r)=>a+r.sales,0);
                const totalP = rows.reduce((a,r)=>a+r.profit,0);
                const peakM = rows.reduce((a,r)=>r.sales>a.sales?r:a,rows[0]);
                return (
                  <div key={yr} style={{ background:"rgba(255,255,255,0.03)", borderRadius:16, padding:24, border:"1px solid rgba(255,255,255,0.06)", borderTop:`3px solid ${COLORS[i]}` }}>
                    <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:28, color:COLORS[i] }}>{yr}</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:16 }}>
                      <div>
                        <div style={{ color:"#555", fontSize:10, fontFamily:"Space Mono", textTransform:"uppercase", letterSpacing:"0.1em" }}>Total Sales</div>
                        <div style={{ fontSize:20, fontFamily:"Syne", fontWeight:700, color:"#e0e0e0", marginTop:2 }}>{fmt(totalS)}</div>
                      </div>
                      <div>
                        <div style={{ color:"#555", fontSize:10, fontFamily:"Space Mono", textTransform:"uppercase", letterSpacing:"0.1em" }}>Total Profit</div>
                        <div style={{ fontSize:16, fontFamily:"Syne", fontWeight:700, color:"#4f8ef7", marginTop:2 }}>{fmt(totalP)}</div>
                      </div>
                      <div>
                        <div style={{ color:"#555", fontSize:10, fontFamily:"Space Mono", textTransform:"uppercase", letterSpacing:"0.1em" }}>Peak Month</div>
                        <div style={{ fontSize:14, fontFamily:"Space Mono", color:COLORS[i], marginTop:2 }}>{peakM.month} · {fmt(peakM.sales)}</div>
                      </div>
                      <div>
                        <div style={{ color:"#555", fontSize:10, fontFamily:"Space Mono", textTransform:"uppercase", letterSpacing:"0.1em" }}>Profit Margin</div>
                        <div style={{ fontSize:14, fontFamily:"Space Mono", color:"#ffd166", marginTop:2 }}>{((totalP/totalS)*100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
