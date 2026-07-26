<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>お弁当管理システム</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Noto Sans JP', sans-serif; }
  body { background: #eef2f7; }
  .app { display: flex; min-height: 100vh; }

  .sidebar { width: 200px; background: #1e3a5f; color: white; display: flex; flex-direction: column; padding: 16px 0; flex-shrink: 0; position: fixed; height: 100vh; z-index: 100; }
  .sidebar-logo { text-align: center; padding: 0 12px 16px; }
  .sidebar-logo .bento-img { width: 48px; height: 48px; border-radius: 12px; margin-bottom: 6px; object-fit: cover; }
  .sidebar-logo h3 { font-size: 14px; font-weight: 700; }
  .sidebar-logo p { font-size: 9px; opacity: 0.6; margin-top: 2px; letter-spacing: 1px; }
  .nav-menu { flex: 1; padding: 8px 10px; list-style: none; }
  .nav-menu li { padding: 9px 12px; border-radius: 8px; margin-bottom: 2px; font-size: 12px; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.7); }
  .nav-menu li:hover, .nav-menu li.active { background: rgba(255,255,255,0.12); color: white; }
  .nav-menu li.active { background: #2563eb; font-weight: 600; }
  .nav-icon { width: 18px; text-align: center; font-size: 14px; }
  .sidebar-footer { padding: 12px; text-align: center; }
  .sidebar-footer .mascot-img { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; margin-bottom: 8px; }
  .sidebar-footer .speech { background: white; color: #1e3a5f; padding: 8px 10px; border-radius: 10px; font-size: 11px; font-weight: 600; position: relative; line-height: 1.5; }
  .sidebar-footer .speech::after { content: ''; position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); border-width: 6px 6px 0; border-style: solid; border-color: white transparent transparent; }

  .main { flex: 1; margin-left: 200px; padding: 16px 24px; min-height: 100vh; }

  .week-nav { display: flex; align-items: center; justify-content: space-between; background: white; border-radius: 12px; padding: 10px 20px; box-shadow: 0 1px 6px rgba(0,0,0,0.04); border: 1px solid #e8ecf1; margin-bottom: 16px; }
  .week-nav .title-area { display: flex; align-items: center; gap: 10px; }
  .week-nav .title-area h2 { font-size: 15px; font-weight: 700; color: #1e3a5f; }
  .week-nav .title-area .sub { font-size: 11px; color: #6b7b8f; }
  .week-nav .arrow-btn { background: #f0f2f5; border: none; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 14px; color: #4a5568; display: flex; align-items: center; justify-content: center; }
  .week-nav .arrow-btn:hover { background: #e2e8f0; }
  .week-nav .date-range { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #1e3a5f; background: #f8fafc; padding: 6px 14px; border-radius: 8px; border: 1px solid #e8ecf1; }
  .week-nav .admin-area { display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 4px 12px; border-radius: 20px; border: 1px solid #e8ecf1; }
  .week-nav .admin-area img { width: 28px; height: 28px; border-radius: 50%; }
  .week-nav .admin-area .info { font-size: 10px; }
  .week-nav .admin-area .info .role { color: #6b7b8f; }
  .week-nav .admin-area .info .name { font-weight: 600; color: #1e3a5f; }

  .stats-row { display: flex; gap: 14px; margin-bottom: 16px; }
  .stat-card { flex: 1; background: white; border-radius: 14px; padding: 16px; display: flex; align-items: center; gap: 12px; box-shadow: 0 1px 8px rgba(0,0,0,0.04); border: 1px solid #e8ecf1; }
  .stat-icon-wrap { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .stat-icon-wrap.blue { background: #dbeafe; } .stat-icon-wrap.green { background: #dcfce7; } .stat-icon-wrap.purple { background: #f3e8ff; } .stat-icon-wrap.orange { background: #ffedd5; }
  .stat-info h4 { font-size: 11px; color: #6b7b8f; font-weight: 500; margin-bottom: 2px; }
  .stat-info .num { font-size: 22px; font-weight: 700; color: #1e3a5f; }
  .stat-info .num .unit { font-size: 12px; font-weight: 500; }
  .stat-info .sub { font-size: 10px; color: #8b9aaf; margin-top: 2px; }

  .content-grid { display: grid; grid-template-columns: 1fr 320px; gap: 16px; }
  @media (max-width: 1100px) { .content-grid { grid-template-columns: 1fr; } }

  .card { background: white; border-radius: 14px; box-shadow: 0 1px 8px rgba(0,0,0,0.04); border: 1px solid #e8ecf1; overflow: hidden; }
  .card-header { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid #f0f2f5; }
  .card-header h3 { font-size: 14px; font-weight: 700; color: #1e3a5f; display: flex; align-items: center; gap: 6px; }
  .card-header .badge { background: #fce7f3; color: #be185d; padding: 3px 10px; border-radius: 10px; font-size: 11px; font-weight: 600; }
  .card-body { padding: 14px 16px; }

  .menu-grid-wrap { overflow-x: auto; }
  .menu-grid { display: grid; grid-template-columns: 50px repeat(7, 1fr); gap: 8px; min-width: 700px; }
  .grid-header { text-align: center; font-size: 11px; font-weight: 600; color: #1e3a5f; padding: 8px 4px; background: #f8fafc; border-radius: 8px; }
  .grid-header .day { font-size: 10px; color: #8b9aaf; font-weight: 400; }
  .grid-label { display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; border-radius: 8px; }
  .grid-label.a { background: #fee2e2; color: #991b1b; } .grid-label.b { background: #dbeafe; color: #1e3a8a; } .grid-label.c { background: #fef9c3; color: #713f12; }
  .menu-cell { background: #fafbfc; border-radius: 10px; padding: 8px; text-align: center; border: 1px solid #f0f2f5; transition: all 0.2s; }
  .menu-cell:hover { border-color: #c5cbd3; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
  .menu-cell img { width: 100%; height: 64px; object-fit: cover; border-radius: 8px; margin-bottom: 6px; background: #e8ecf1; }
  .menu-cell .name { font-size: 11px; font-weight: 600; color: #1e3a5f; line-height: 1.3; }
  .menu-cell .desc { font-size: 9px; color: #8b9aaf; margin-top: 2px; line-height: 1.3; }

  .swap-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .swap-header-row h3 { font-size: 13px; font-weight: 700; color: #1e3a5f; display: flex; align-items: center; gap: 6px; }
  .new-btn { background: #fce7f3; color: #be185d; border: none; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; cursor: pointer; }
  .swap-list { max-height: 220px; overflow-y: auto; }
  .swap-item { padding: 10px 0; border-bottom: 1px solid #f5f7fa; }
  .swap-item:last-child { border-bottom: none; }
  .swap-item .time { font-size: 10px; color: #8b9aaf; margin-bottom: 4px; }
  .swap-item .content { font-size: 12px; font-weight: 600; color: #1e3a5f; margin-bottom: 2px; }
  .swap-item .reason { font-size: 10px; color: #8b9aaf; }
  .swap-item .footer { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; }
  .status-pill { font-size: 10px; padding: 2px 8px; border-radius: 10px; font-weight: 600; }
  .status-pill.pending { background: #fef3c7; color: #92400e; } .status-pill.done { background: #dcfce7; color: #166534; }
  .arrow-link { font-size: 11px; color: #1a73e8; text-decoration: none; font-weight: 600; }
  .arrow-link:hover { text-decoration: underline; }

  .cleaner-list-compact { display: flex; flex-direction: column; gap: 8px; }
  .cleaner-item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; background: #f8fafc; border-radius: 10px; border: 1px solid #eef2f7; }
  .cleaner-item img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
  .cleaner-item .info { flex: 1; } .cleaner-item .info .name { font-size: 12px; font-weight: 600; color: #1e3a5f; } .cleaner-item .info .group { font-size: 10px; color: #8b9aaf; }
  .cleaner-item .day-tag { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: white; }
  .day-mon { background: #f59e0b; } .day-tue { background: #10b981; } .day-wed { background: #3b82f6; } .day-thu { background: #8b5cf6; } .day-fri { background: #ef4444; } .day-sat { background: #ec4899; } .day-sun { background: #06b6d4; }

  .bottom-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 14px; margin-top: 16px; }
  @media (max-width: 900px) { .bottom-grid { grid-template-columns: 1fr 1fr; } }
  .bottom-card { background: white; border-radius: 14px; padding: 14px; box-shadow: 0 1px 8px rgba(0,0,0,0.04); border: 1px solid #e8ecf1; display: flex; align-items: center; gap: 12px; }
  .bottom-card .icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .bottom-card .icon.green { background: #dcfce7; } .bottom-card .icon.yellow { background: #fef9c3; } .bottom-card .icon.blue { background: #dbeafe; } .bottom-card .icon.pink { background: #fce7f3; }
  .bottom-card .text h4 { font-size: 11px; color: #6b7b8f; font-weight: 500; }
  .bottom-card .text .val { font-size: 18px; font-weight: 700; color: #1e3a5f; margin-top: 2px; }
  .bottom-card .text .val .sub { font-size: 10px; color: #8b9aaf; font-weight: 400; }

  .notice-bar { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .notice-bar .icon { font-size: 16px; flex-shrink: 0; } .notice-bar .text { font-size: 12px; color: #1e40af; line-height: 1.5; } .notice-bar .text strong { font-weight: 600; }

  .form-row { display: flex; gap: 6px; margin-bottom: 6px; flex-wrap: wrap; }
  .form-row input, .form-row select { flex: 1; min-width: 80px; padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 12px; outline: none; }
  .btn-primary { background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; }
  .btn-primary:hover { background: #1d4ed8; }
  .btn-sm { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 3px 8px; border-radius: 5px; font-size: 10px; cursor: pointer; }
  .btn-danger-sm { background: #fee2e2; color: #991b1b; border: none; padding: 3px 8px; border-radius: 5px; font-size: 10px; cursor: pointer; }

  .member-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; }
  .member-item { display: flex; align-items: center; gap: 6px; padding: 8px 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #eef2f7; font-size: 12px; }
  .member-item .av { width: 24px; height: 24px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #475569; }
  .member-item .nm { font-weight: 600; color: #1e3a5f; } .member-item .tg { font-size: 9px; padding: 1px 5px; border-radius: 6px; margin-left: auto; }
  .group-a { background: #fee2e2; color: #991b1b; } .group-b { background: #dbeafe; color: #1e3a8a; } .group-c { background: #fef9c3; color: #713f12; }

  .tabs { display: flex; gap: 4px; margin-bottom: 12px; }
  .tab { padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; background: #f1f5f9; color: #64748b; border: none; }
  .tab.active { background: #2563eb; color: white; }

  .hidden { display: none !important; }
  .page-anim { animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th { text-align: left; padding: 10px 12px; font-size: 11px; font-weight: 600; color: #64748b; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
  .data-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 12px; }
  .data-table tr:hover td { background: #fafbfc; }
</style>
<base target="_blank">
</head>
<body>
<div class="app" id="app">
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img class="bento-img" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop" alt="logo">
      <h3>お弁当管理システム</h3>
      <p>BENTO MANAGEMENT SYSTEM</p>
    </div>
    <ul class="nav-menu">
      <li class="active" onclick="navigate('dashboard')" data-page="dashboard"><span class="nav-icon">🏠</span> <span>ダッシュボード</span></li>
      <li onclick="navigate('menu')" data-page="menu"><span class="nav-icon">📅</span> <span>今週のメニュー</span></li>
      <li onclick="navigate('groups')" data-page="groups"><span class="nav-icon">👥</span> <span>グループ管理</span></li>
      <li onclick="navigate('menu_mgmt')" data-page="menu_mgmt"><span class="nav-icon">🍱</span> <span>メニュー管理</span></li>
      <li onclick="navigate('swaps')" data-page="swaps"><span class="nav-icon">🔄</span> <span>お弁当交換メモ</span></li>
      <li onclick="navigate('cleaning')" data-page="cleaning"><span class="nav-icon">🧹</span> <span>清掃当番</span></li>
      <li onclick="navigate('history')" data-page="history"><span class="nav-icon">🕐</span> <span>履歴・アーカイブ</span></li>
      <li onclick="navigate('settings')" data-page="settings"><span class="nav-icon">⚙️</span> <span>設定</span></li>
    </ul>
    <div class="sidebar-footer">
      <img class="mascot-img" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop" alt="mascot">
      <div class="speech">今日も<br>おいしいお弁当で<br>元気に過ごそう！</div>
    </div>
  </aside>
  <main class="main" id="main"></main>
</div>

<script>
  const STORAGE_KEY = 'bento_app_v3';
  let currentWeekOffset = 0;

  function loadData() { try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw); } catch(e) {} return getDefaultData(); }
  function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

  function getMonday(d) { const date = new Date(d); const day = date.getDay(); const diff = date.getDate() - day + (day === 0 ? -6 : 1); return new Date(date.setDate(diff)); }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function fmtMD(d) { return (d.getMonth()+1) + '/' + d.getDate(); }
  function fmtDateFull(d) { const days = ['日','月','火','水','木','金','土']; return d.getFullYear() + '年' + (d.getMonth()+1) + '月' + d.getDate() + '日(' + days[d.getDay()] + ')'; }

  const MENU_POOL = [
    { name: '唐揚げ弁当', desc: 'ごはん、サラダ、味噌汁', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=150&fit=crop' },
    { name: 'ハンバーグ弁当', desc: 'デミグラス、卵焼き', img: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=200&h=150&fit=crop' },
    { name: '焼き鮭弁当', desc: '鯖、ひじき、ブロッコリー', img: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=200&h=150&fit=crop' },
    { name: 'カレー弁当', desc: 'チキンカレー、サラダ', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=150&fit=crop' },
    { name: '豚生姜焼き弁当', desc: '野菜炒め、漬物', img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=150&fit=crop' },
    { name: '天ぷら弁当', desc: '海老、野菜、そば', img: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=200&h=150&fit=crop' },
    { name: '親子丼弁当', desc: '鶏肉、玉子、汁物', img: 'https://images.unsplash.com/photo-1607301406259-dfb3159b8c7e?w=200&h=150&fit=crop' },
    { name: '牛丼弁当', desc: '牛肉、玉ねぎ、紅生姜', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=150&fit=crop' },
    { name: 'サラダチキン弁当', desc: '低温調理、野菜たっぷり', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=150&fit=crop' },
    { name: 'お好み焼き弁当', desc: '豚玉、ソース、青のり', img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=200&h=150&fit=crop' },
  ];

  function generateWeeklyMenu(offset) {
    const base = getMonday(addDays(new Date('2026-07-26'), offset * 7));
    const weekNum = Math.floor(offset + 30);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(base, i);
      const dayNames = ['月','火','水','木','金','土','日'];
      const poolIdx = (weekNum * 7 + i) % MENU_POOL.length;
      const aIdx = poolIdx % MENU_POOL.length;
      const bIdx = (poolIdx + 1) % MENU_POOL.length;
      const cIdx = (poolIdx + 2) % MENU_POOL.length;
      days.push({ date: fmtMD(d), fullDate: d.toISOString().split('T')[0], day: dayNames[i], dayIdx: i, A: MENU_POOL[aIdx], B: MENU_POOL[bIdx], C: MENU_POOL[cIdx] });
    }
    return { base, weekNum, days };
  }

  function getDefaultData() {
    const names = ['サンポ','ミカ','タケシ','ユウキ','ナオ','ケン','リョウ','アイ','ヒロ','サクラ','タケヤ','シン','ユイ','コウ','マイ','レン','ソラ','ハル','アキ','ナツ','フユ','サチ','トモ','ユウ','カナ','リク','ミウ','ココ','セナ','レイ','アスカ','ミナト','イツキ','ノア','カイト','ヒナ','ユウト','モモ','リン','ソウ'];
    const members = names.map((name, i) => ({ id: 'm'+i, name, group: ['A','B','C','none'][i<12?(i%3):3], active: i<22 }));
    return { members, swaps: [
      { id:'s1', date:'7/22', day:'火', time:'10:30', from:'ナオ', to:'ケン', fromGroup:'B', toGroup:'C', reason:'用事のため', status:'pending' },
      { id:'s2', date:'7/24', day:'木', time:'09:15', from:'サクラ', to:'ミカ', fromGroup:'A', toGroup:'B', reason:'外出予定のため', status:'pending' },
      { id:'s3', date:'7/18', day:'金', time:'16:40', from:'ユウキ', to:'タケヤ', fromGroup:'A', toGroup:'C', reason:'所用のため', status:'done' },
    ], cleaners: [
      { id:'c1', name:'リョウ', group:'Aグループ', day:'月', dayClass:'day-mon', avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=ryo' },
      { id:'c2', name:'アイ', group:'Bグループ', day:'木', dayClass:'day-thu', avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=ai' },
      { id:'c3', name:'ヒロ', group:'Cグループ', day:'土', dayClass:'day-sat', avatar:'https://api.dicebear.com/7.x/avataaars/svg?seed=hiro' },
    ], notices: ['お弁当の持ち帰り忘れにご注意ください。','食材アレルギーがある方は事前にお知らせください。'] };
  }

  let data = loadData();
  let currentPage = 'dashboard';

  function getActiveCount() { return data.members.filter(m => m.active && m.group !== 'none').length; }
  function getGroupCount(g) { return data.members.filter(m => m.active && m.group === g).length; }
  function getPendingSwaps() { return data.swaps.filter(s => s.status === 'pending').length; }

  function navigate(page) { currentPage = page; document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active')); const li = document.querySelector('.nav-menu li[data-page="'+page+'"]'); if (li) li.classList.add('active'); render(); }
  function render() { const main = document.getElementById('main'); main.innerHTML = (window['render_'+currentPage] ? window['render_'+currentPage]() : ''); }
  function changeWeek(delta) { currentWeekOffset += delta; render(); }

  window.render_dashboard = function() {
    const ac = getActiveCount(), a = getGroupCount('A'), b = getGroupCount('B'), c = getGroupCount('C');
    const ps = getPendingSwaps();
    const week = generateWeeklyMenu(currentWeekOffset);
    const base = week.base, sun = addDays(base, 6);
    const rangeText = fmtDateFull(base) + ' 〜 ' + fmtMD(sun) + '(日)';

    let headers = week.days.map(d => '<div class="grid-header">'+d.date+'<div class="day">'+d.day+'</div></div>').join('');
    let aRow = week.days.map(d => '<div class="menu-cell"><img src="'+d.A.img+'" alt=""><div class="name">'+d.A.name+'</div><div class="desc">'+d.A.desc+'</div></div>').join('');
    let bRow = week.days.map(d => '<div class="menu-cell"><img src="'+d.B.img+'" alt=""><div class="name">'+d.B.name+'</div><div class="desc">'+d.B.desc+'</div></div>').join('');
    let cRow = week.days.map(d => '<div class="menu-cell"><img src="'+d.C.img+'" alt=""><div class="name">'+d.C.name+'</div><div class="desc">'+d.C.desc+'</div></div>').join('');

    let swapItems = data.swaps.slice(0,3).map(s => {
      const st = s.status === 'done' ? 'done' : 'pending';
      const stText = s.status === 'done' ? '完了' : '確認待ち';
      return '<div class="swap-item"><div class="time">'+s.date+'('+s.day+') '+s.time+'</div><div class="content">'+s.from+'（'+s.fromGroup+'）↔ '+s.to+'（'+s.toGroup+'）</div><div class="reason">理由：'+s.reason+'</div><div class="footer"><span class="status-pill '+st+'">'+stText+'</span><span style="font-size:10px;color:#8b9aaf;">></span></div></div>';
    }).join('');

    let cleanerItems = data.cleaners.map(c => '<div class="cleaner-item"><img src="'+c.avatar+'" alt="'+c.name+'"><div class="info"><div class="name">'+c.name+'</div><div class="group">'+c.group+'</div></div><div class="day-tag '+c.dayClass+'">'+c.day+'</div></div>').join('');

    return '<div class="page-anim"><div class="week-nav"><div class="title-area"><h2>📋 ダッシュボード</h2><div class="sub">今週のお弁当メニューと状況を確認できます</div></div><div style="display:flex;align-items:center;gap:10px;"><button class="arrow-btn" onclick="changeWeek(-1)">◀</button><div class="date-range">📅 '+rangeText+'</div><button class="arrow-btn" onclick="changeWeek(1)">▶</button></div><div class="admin-area"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="admin"><div class="info"><div class="role">管理者</div><div class="name">サンポ</div></div></div></div><div class="stats-row"><div class="stat-card"><div class="stat-icon-wrap blue">👥</div><div class="stat-info"><h4>今週の人数</h4><div class="num">'+ac+'<span class="unit">人</span></div><div class="sub">A:'+a+' / B:'+b+' / C:'+c+'</div></div></div><div class="stat-card"><div class="stat-icon-wrap green">🍱</div><div class="stat-info"><h4>メニュー種類</h4><div class="num">3<span class="unit">種類</span></div><div class="sub">A / B / C</div></div></div><div class="stat-card"><div class="stat-icon-wrap purple">🔄</div><div class="stat-info"><h4>交換申請</h4><div class="num">'+ps+'<span class="unit">件</span></div><div class="sub">確認待ち</div></div></div><div class="stat-card"><div class="stat-icon-wrap orange">🧹</div><div class="stat-info"><h4>清掃当番</h4><div class="num">'+data.cleaners.length+'<span class="unit">名</span></div><div class="sub">今週の担当</div></div></div></div><div class="notice-bar"><div class="icon">ℹ️</div><div class="text"><strong>お知らせ</strong>　'+data.notices[0]+'　・　'+data.notices[1]+'</div></div><div class="content-grid"><div><div class="card"><div class="card-header"><h3>🍱 今週のお弁当メニュー</h3></div><div class="card-body"><div class="menu-grid-wrap"><div class="menu-grid"><div></div>'+headers+'<div class="grid-label a">A弁当</div>'+aRow+'<div class="grid-label b">B弁当</div>'+bRow+'<div class="grid-label c">C弁当</div>'+cRow+'</div></div></div></div></div><div><div class="card" style="margin-bottom:14px;"><div class="card-header"><h3>🔄 お弁当交換メモ</h3><button class="new-btn" onclick="navigate('swaps')">+ 新しいメモ</button></div><div class="card-body"><div class="swap-list">'+swapItems+'</div></div><div style="padding:0 16px 12px;"><a href="#" class="arrow-link" onclick="navigate('swaps');return false;">すべての交換メモを見る →</a></div></div><div class="card"><div class="card-header"><h3>🧹 清掃当番（今週）</h3><a href="#" class="arrow-link" onclick="navigate('cleaning');return false;">清掃当番表を見る →</a></div><div class="card-body"><div class="cleaner-list-compact">'+cleanerItems+'</div></div></div></div></div><div class="bottom-grid"><div class="bottom-card"><div class="icon green">✅</div><div class="text"><h4>弁当準備率</h4><div class="val">100<span class="sub">%</span></div><div style="font-size:10px;color:#8b9aaf;">(本日完了)</div></div></div><div class="bottom-card"><div class="icon yellow">😊</div><div class="text"><h4>メニュー満足度（平均）</h4><div class="val">4.6<span class="sub">/ 5.0　★★★★☆</span></div></div></div><div class="bottom-card"><div class="icon blue">📝</div><div class="text"><h4>今週のメモ件数</h4><div class="val">'+data.swaps.length+'<span class="sub">件</span></div></div></div><div class="bottom-card"><div class="icon pink">📅</div><div class="text"><h4>次週メニュー公開</h4><div class="val" style="font-size:14px;">'+fmtMD(addDays(base,7))+' (日)<span class="sub"> 予定</span></div></div></div></div></div>';
  };

  window.render_menu = function() {
    const week = generateWeeklyMenu(currentWeekOffset);
    let rows = week.days.map(d => '<tr><td style="font-weight:600;">'+d.date+'('+d.day+')</td><td><div style="display:flex;align-items:center;gap:8px;"><img src="'+d.A.img+'" style="width:40px;height:32px;object-fit:cover;border-radius:6px;"><div><div style="font-weight:600;font-size:12px;">'+d.A.name+'</div><div style="font-size:10px;color:#8b9aaf;">'+d.A.desc+'</div></div></div></td><td><div style="display:flex;align-items:center;gap:8px;"><img src="'+d.B.img+'" style="width:40px;height:32px;object-fit:cover;border-radius:6px;"><div><div style="font-weight:600;font-size:12px;">'+d.B.name+'</div><div style="font-size:10px;color:#8b9aaf;">'+d.B.desc+'</div></div></div></td><td><div style="display:flex;align-items:center;gap:8px;"><img src="'+d.C.img+'" style="width:40px;height:32px;object-fit:cover;border-radius:6px;"><div><div style="font-weight:600;font-size:12px;">'+d.C.name+'</div><div style="font-size:10px;color:#8b9aaf;">'+d.C.desc+'</div></div></div></td></tr>').join('');
    return '<div class="page-anim"><div class="week-nav" style="margin-bottom:16px;"><div class="title-area"><h2>📅 今週のメニュー</h2></div></div><div class="card"><div class="card-body"><table class="data-table"><thead><tr><th>日付</th><th>A弁当</th><th>B弁当</th><th>C弁当</th></tr></thead><tbody>'+rows+'</tbody></table></div></div></div>';
  };

  window.render_groups = function() {
    const groups = { A: data.members.filter(m => m.group === 'A'), B: data.members.filter(m => m.group === 'B'), C: data.members.filter(m => m.group === 'C'), none: data.members.filter(m => m.group === 'none') };
    const tab = window.groupTab || 'all';
    let list = '';
    const renderList = (arr, label, cls) => arr.map(m => '<div class="member-item"><div class="av">'+m.name.charAt(0)+'</div><span class="nm">'+m.name+'</span><span class="tg '+cls+'">'+label+'</span><button class="btn-sm" onclick="toggleMember(''+m.id+'')">'+(m.active?'休':'復')+'</button><button class="btn-sm" onclick="changeGroup(''+m.id+'')">変更</button><button class="btn-danger-sm" onclick="deleteMember(''+m.id+'')">削除</button></div>').join('');
    if (tab === 'all') list = renderList(groups.A, 'A', 'group-a') + renderList(groups.B, 'B', 'group-b') + renderList(groups.C, 'C', 'group-c') + renderList(groups.none, '—', '');
    else if (tab === 'A') list = renderList(groups.A, 'A', 'group-a');
    else if (tab === 'B') list = renderList(groups.B, 'B', 'group-b');
    else if (tab === 'C') list = renderList(groups.C, 'C', 'group-c');
    return '<div class="page-anim"><div class="week-nav" style="margin-bottom:16px;"><div class="title-area"><h2>👥 グループ管理</h2></div></div><div class="card"><div class="card-body"><div class="form-row"><input type="text" id="newMemberName" placeholder="新しい担当者名"><select id="newMemberGroup"><option value="A">Aグループ</option><option value="B">Bグループ</option><option value="C">Cグループ</option><option value="none">未所属</option></select><button class="btn-primary" onclick="addMember()">追加</button></div><div class="tabs" style="margin-top:10px;"><button class="tab '+(tab==='all'?'active':'')+'" onclick="window.groupTab='all';render();">全員 ('+data.members.length+')</button><button class="tab '+(tab==='A'?'active':'')+'" onclick="window.groupTab='A';render();">A ('+groups.A.length+')</button><button class="tab '+(tab==='B'?'active':'')+'" onclick="window.groupTab='B';render();">B ('+groups.B.length+')</button><button class="tab '+(tab==='C'?'active':'')+'" onclick="window.groupTab='C';render();">C ('+groups.C.length+')</button></div><div class="member-grid" style="margin-top:10px;">'+list+'</div></div></div></div>';
  };

  window.render_menu_mgmt = function() {
    const items = MENU_POOL.map((m, i) => '<tr><td><img src="'+m.img+'" style="width:48px;height:36px;object-fit:cover;border-radius:6px;"></td><td style="font-weight:600;">'+m.name+'</td><td style="color:#64748b;font-size:11px;">'+m.desc+'</td><td><button class="btn-sm" onclick="editMenuName('+i+')">編集</button></td></tr>').join('');
    return '<div class="page-anim"><div class="week-nav" style="margin-bottom:16px;"><div class="title-area"><h2>🍱 メニュー管理</h2></div></div><div class="card"><div class="card-body"><p style="font-size:12px;color:#64748b;margin-bottom:12px;">メニュープール（自動ローテーション用）</p><table class="data-table"><thead><tr><th>画像</th><th>メニュー名</th><th>説明</th><th>操作</th></tr></thead><tbody>'+items+'</tbody></table></div></div></div>';
  };
  window.editMenuName = function(idx) { const n = prompt('メニュー名:', MENU_POOL[idx].name); if (n) { MENU_POOL[idx].name = n; render(); } };

  window.render_swaps = function() {
    const items = data.swaps.map(s => { const st = s.status === 'done' ? 'done' : 'pending'; const stText = s.status === 'done' ? '完了' : '確認待ち'; return '<tr><td>'+s.date+'('+s.day+') '+s.time+'</td><td><span class="status-pill '+st+'">'+stText+'</span></td><td>'+s.from+'（'+s.fromGroup+'）↔ '+s.to+'（'+s.toGroup+'）</td><td style="font-size:11px;color:#64748b;">'+s.reason+'</td><td>'+(s.status !== 'done' ? '<button class="btn-sm" onclick="doneSwap(''+s.id+'')">完了</button>' : '')+'<button class="btn-danger-sm" onclick="deleteSwap(''+s.id+'')">削除</button></td></tr>'; }).join('');
    return '<div class="page-anim"><div class="week-nav" style="margin-bottom:16px;"><div class="title-area"><h2>🔄 お弁当交換メモ</h2></div></div><div class="card"><div class="card-body"><div class="form-row"><input type="text" id="swapFrom" placeholder="交換元" style="max-width:90px;"><select id="swapFromG"><option value="A">A</option><option value="B">B</option><option value="C">C</option></select><span style="align-self:center;font-size:12px;">→</span><input type="text" id="swapTo" placeholder="交換先" style="max-width:90px;"><select id="swapToG"><option value="A">A</option><option value="B">B</option><option value="C">C</option></select><input type="text" id="swapDate" placeholder="日付" style="max-width:70px;"><select id="swapDay"><option value="月">月</option><option value="火">火</option><option value="水">水</option><option value="木">木</option><option value="金">金</option><option value="土">土</option><option value="日">日</option></select><input type="text" id="swapReason" placeholder="理由" style="max-width:100px;"><button class="btn-primary" onclick="addSwap()">追加</button></div><table class="data-table" style="margin-top:12px;"><thead><tr><th>日付</th><th>状態</th><th>交換</th><th>理由</th><th>操作</th></tr></thead><tbody>'+items+'</tbody></table></div></div></div>';
  };

  window.render_cleaning = function() {
    const items = data.cleaners.map(c => '<tr><td><img src="'+c.avatar+'" style="width:32px;height:32px;border-radius:50%;"></td><td style="font-weight:600;">'+c.name+'</td><td>'+c.group+'</td><td><span class="status-pill pending" style="background:#dbeafe;color:#1e40af;">'+c.day+'</span></td><td><button class="btn-danger-sm" onclick="deleteCleaner(''+c.id+'')">削除</button></td></tr>').join('');
    return '<div class="page-anim"><div class="week-nav" style="margin-bottom:16px;"><div class="title-area"><h2>🧹 清掃当番</h2></div></div><div class="card"><div class="card-body"><div class="form-row"><input type="text" id="cleanerName" placeholder="名前"><input type="text" id="cleanerGroup" placeholder="グループ (例: Aグループ)"><input type="text" id="cleanerDay" placeholder="担当日 (例: 月)" style="max-width:80px;"><button class="btn-primary" onclick="addCleaner()">追加</button></div><table class="data-table" style="margin-top:12px;"><thead><tr><th></th><th>名前</th><th>グループ</th><th>担当日</th><th>操作</th></tr></thead><tbody>'+items+'</tbody></table></div></div></div>';
  };

  window.render_history = function() {
    const done = data.swaps.filter(s => s.status === 'done');
    const items = done.map(s => '<tr><td>'+s.date+'('+s.day+')</td><td>'+s.from+'（'+s.fromGroup+'）→ '+s.to+'（'+s.toGroup+'）</td><td>'+s.reason+'</td></tr>').join('');
    return '<div class="page-anim"><div class="week-nav" style="margin-bottom:16px;"><div class="title-area"><h2>🕐 履歴・アーカイブ</h2></div></div><div class="card"><div class="card-body"><p style="font-size:12px;color:#64748b;margin-bottom:10px;">完了済みの交換メモ</p><table class="data-table"><thead><tr><th>日付</th><th>交換内容</th><th>理由</th></tr></thead><tbody>'+(items || '<tr><td colspan="3" style="text-align:center;color:#94a3b8;">履歴がありません</td></tr>')+'</tbody></table></div></div></div>';
  };

  window.render_settings = function() {
    return '<div class="page-anim"><div class="week-nav" style="margin-bottom:16px;"><div class="title-area"><h2>⚙️ 設定</h2></div></div><div class="card"><div class="card-body"><h3 style="font-size:13px;margin-bottom:10px;color:#1e3a5f;">データ管理</h3><div class="form-row"><button class="btn-primary" onclick="exportData()">📥 JSONエクスポート</button><button class="btn-sm" onclick="document.getElementById('importFile').click()">📤 JSONインポート</button><input type="file" id="importFile" style="display:none" accept=".json" onchange="importData(this)"></div><div class="form-row" style="margin-top:10px;"><button class="btn-danger-sm" style="background:#fee2e2;padding:6px 14px;font-size:12px;" onclick="resetData()">🗑️ 全データリセット</button></div><hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;"><p style="font-size:12px;color:#4a5568;line-height:2;">総人数: '+data.members.length+'名 / 最大40名<br>有効: '+data.members.filter(m=>m.active).length+'名<br>メニュー: 毎日3種×7日 / 自動ローテーション<br>保存: localStorage</p></div></div></div>';
  };

  window.addMember = function() { const name = document.getElementById('newMemberName').value.trim(); const group = document.getElementById('newMemberGroup').value; if (!name) return alert('名前を入力してください'); if (data.members.length >= 40) return alert('最大40名です'); data.members.push({ id: 'm'+Date.now(), name, group, active: true }); saveData(); render(); };
  window.deleteMember = function(id) { if (!confirm('削除しますか？')) return; data.members = data.members.filter(m => m.id !== id); saveData(); render(); };
  window.toggleMember = function(id) { const m = data.members.find(x => x.id === id); if (m) { m.active = !m.active; saveData(); render(); } };
  window.changeGroup = function(id) { const m = data.members.find(x => x.id === id); if (!m) return; const g = prompt('グループ (A/B/C/none):', m.group); if (g && ['A','B','C','none'].includes(g)) { m.group = g; saveData(); render(); } };

  window.addSwap = function() { const from = document.getElementById('swapFrom').value.trim(); const to = document.getElementById('swapTo').value.trim(); const fromG = document.getElementById('swapFromG').value; const toG = document.getElementById('swapToG').value; const date = document.getElementById('swapDate').value.trim(); const day = document.getElementById('swapDay').value; const reason = document.getElementById('swapReason').value.trim() || '—'; if (!from || !to || !date) return alert('必須項目を入力してください'); data.swaps.unshift({ id: 's'+Date.now(), date, day, time: '今', from, to, fromGroup: fromG, toGroup: toG, reason, status: 'pending' }); saveData(); render(); };
  window.deleteSwap = function(id) { if (!confirm('削除しますか？')) return; data.swaps = data.swaps.filter(s => s.id !== id); saveData(); render(); };
  window.doneSwap = function(id) { const s = data.swaps.find(x => x.id === id); if (s) { s.status = 'done'; saveData(); render(); } };

  window.addCleaner = function() { const name = document.getElementById('cleanerName').value.trim(); const group = document.getElementById('cleanerGroup').value.trim() || '—'; const day = document.getElementById('cleanerDay').value.trim() || '月'; if (!name) return alert('名前を入力してください'); const dayClass = 'day-' + {月:'mon',火:'tue',水:'wed',木:'thu',金:'fri',土:'sat',日:'sun'}[day] || 'day-mon'; data.cleaners.push({ id: 'c'+Date.now(), name, group, day, dayClass, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed='+encodeURIComponent(name) }); saveData(); render(); };
  window.deleteCleaner = function(id) { if (!confirm('削除しますか？')) return; data.cleaners = data.cleaners.filter(c => c.id !== id); saveData(); render(); };

  window.exportData = function() { const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'bento_data_' + new Date().toISOString().split('T')[0] + '.json'; a.click(); URL.revokeObjectURL(url); };
  window.importData = function(input) { const file = input.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = function(e) { try { const imported = JSON.parse(e.target.result); if (imported.members && imported.swaps) { data = imported; saveData(); render(); alert('インポート完了'); } else { alert('無効なデータ'); } } catch(err) { alert('失敗'); } }; reader.readAsText(file); input.value = ''; };
  window.resetData = function() { if (!confirm('全データを削除しますか？')) return; localStorage.removeItem(STORAGE_KEY); data = getDefaultData(); saveData(); render(); };

  render();
</script>
</body>
</html>
