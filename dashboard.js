/* ===== Reset & Base ===== */
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f5f7fa;
  color: #1a1a2e;
  line-height: 1.6;
}

/* ===== Navbar ===== */
.navbar {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
}
.nav-brand {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}
.nav-links {
  display: flex;
  list-style: none;
  gap: 8px;
}
.nav-links a {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 0.2s;
}
.nav-links a:hover, .nav-links a.active {
  color: #fff;
  background: rgba(255,255,255,0.1);
}

/* ===== Dashboard ===== */
.dashboard { max-width: 960px; margin: 0 auto; padding: 16px; }

/* ===== Header ===== */
.header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
.header h1 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.total-asset { font-size: 42px; font-weight: 800; letter-spacing: -1px; }
.total-asset span { font-size: 18px; font-weight: 600; margin-left: 4px; }
.change { color: #4ade80; font-size: 14px; margin-top: 4px; }
.change.negative { color: #f87171; }
.change.neutral { color: #94a3b8; }
.date { font-size: 11px; opacity: 0.7; margin-top: 4px; }

/* ===== Hub Links ===== */
.hub-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}
.hub-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: all 0.2s;
  border-top: 4px solid transparent;
}
.hub-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
.hub-card.blog { border-top-color: #10b981; }
.hub-card.youtube { border-top-color: #ef4444; }
.hub-card.x { border-top-color: #0ea5e9; }
.hub-icon { font-size: 28px; margin-bottom: 6px; }
.hub-title { font-size: 13px; font-weight: 700; color: #475569; }

/* ===== Grid & Cards ===== */
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 16px; }
.card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: transform 0.2s;
}
.card:hover { transform: translateY(-2px); }
.card-title { font-size: 14px; font-weight: 700; color: #64748b; margin-bottom: 14px; display: flex; align-items: center; gap: 6px; }

/* ===== Account Rows ===== */
.account-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}
.account-row:last-child { border-bottom: none; }
.account-name { display: flex; align-items: center; gap: 8px; font-weight: 600; }
.account-value { font-weight: 700; font-family: 'SF Mono', monospace; font-size: 14px; }
.account-pct { font-size: 11px; color: #94a3b8; margin-left: 4px; }
.badge { display: inline-block; width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.private { color: #94a3b8; font-size: 13px; }

/* ===== Progress Bar ===== */
.progress-bar { height: 6px; background: #e2e8f0; border-radius: 3px; margin-top: 10px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }

/* ===== Chart ===== */
.chart-container { position: relative; height: 220px; display: flex; justify-content: center; align-items: center; }
.legend { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; justify-content: center; }
.legend-item { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #64748b; }

/* ===== Crypto ===== */
.crypto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.crypto-item { background: #f8fafc; border-radius: 12px; padding: 14px; text-align: center; }
.crypto-icon { font-size: 24px; margin-bottom: 6px; }
.crypto-name { font-size: 12px; color: #64748b; font-weight: 600; }
.crypto-value { font-size: 16px; font-weight: 700; margin-top: 4px; }
.crypto-date { font-size: 10px; color: #94a3b8; margin-top: 2px; }
.crypto-total { margin-top: 12px; text-align: center; font-size: 13px; font-weight: 700; color: #1a1a2e; }

/* ===== Side Income ===== */
.side-income { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.income-box { background: #f8fafc; border-radius: 12px; padding: 14px; text-align: center; border-top: 3px solid #e2e8f0; }
.income-label { font-size: 11px; color: #64748b; font-weight: 600; }
.income-value { font-size: 18px; font-weight: 700; margin-top: 6px; }
.side-total { margin-top: 14px; padding-top: 12px; border-top: 1px solid #f1f5f9; text-align: center; }
.side-total-label { font-size: 12px; color: #64748b; }
.side-total-value { font-size: 22px; font-weight: 800; color: #1a1a2e; }

/* ===== Points ===== */
.points-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
.points-row:last-child { border-bottom: none; }
.points-total { margin-top: 12px; text-align: center; font-size: 13px; color: #64748b; }

/* ===== Footer ===== */
.full-width { grid-column: 1 / -1; text-align: center; padding: 16px; }
.footer-note { font-size: 12px; color: #94a3b8; }

/* ===== Loading ===== */
.loading { text-align: center; color: #94a3b8; font-size: 13px; padding: 20px; }

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .hub-links { grid-template-columns: 1fr; }
  .nav-links { gap: 4px; }
  .nav-links a { padding: 6px 10px; font-size: 12px; }
  .total-asset { font-size: 32px; }
  .grid { grid-template-columns: 1fr; }
  .crypto-grid { grid-template-columns: 1fr; }
  .side-income { grid-template-columns: 1fr; }
}
