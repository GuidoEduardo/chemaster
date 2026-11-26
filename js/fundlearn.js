// Estudar → "Fundamentos: o porquê de tudo". Trilha de lições em ordem, cada uma com uma parte
// interativa, um "Por isso…" ligando à próxima e um desafio de raciocínio. Progresso salvo.
// Textos em fundtext.js (FL e FL_LESSONS).

const FUND_STATE = { timers: [], ticks: [], raf: 0, off: [] };
function fundLearnStop() {
  FUND_STATE.timers.forEach(t => { clearInterval(t); clearTimeout(t); });
  cancelAnimationFrame(FUND_STATE.raf);
  FUND_STATE.off.forEach(f => { try { f(); } catch (e) {} });
  FUND_STATE.timers = []; FUND_STATE.ticks = []; FUND_STATE.raf = 0; FUND_STATE.off = [];
}
function flLoop(fn) {
  FUND_STATE.ticks.push(fn);
  if (FUND_STATE.raf) return;
  let last = performance.now();
  const run = now => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    FUND_STATE.ticks.forEach(f => f(dt, now));
    FUND_STATE.raf = requestAnimationFrame(run);
  };
  FUND_STATE.raf = requestAnimationFrame(run);
}
const flLater = (fn, ms) => FUND_STATE.timers.push(setTimeout(fn, ms));

const flT = () => FL[LANG] || FL.pt;
const flL = l => l[LANG] || l.pt;
const flGet = () => { const f = store.get().fund || {}; f.done = f.done || {}; return f; };
const flSave = f => { const d = store.get(); d.fund = f; store.set(d); };
const flNum = (x, d = 0) => x.toLocaleString(LANG === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const FL_SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
const flSup = n => String(n).split('').map(c => FL_SUP[c] || c).join('');
const flSci = x => { if (x <= 0) return '0'; const e = Math.floor(Math.log10(x)), m = x / Math.pow(10, e); return e < 4 && e >= 0 ? flNum(x, x < 10 ? 2 : 0) : `${flNum(m, 2)} × 10${flSup(e)}`; };
const flClamp = (v, a, b) => Math.max(a, Math.min(b, v));
const flSym = z => ELEMENTS[z - 1].sym, flName = z => ELEMENTS[z - 1].name;

// comprimento de onda (nm) → cor
function flWaveRGB(w) {
  let r = 0, g = 0, b = 0;
  if (w >= 380 && w < 440) { r = -(w - 440) / 60; b = 1; }
  else if (w < 490) { g = (w - 440) / 50; b = 1; }
  else if (w < 510) { g = 1; b = -(w - 510) / 20; }
  else if (w < 580) { r = (w - 510) / 70; g = 1; }
  else if (w < 645) { r = 1; g = -(w - 645) / 65; }
  else if (w <= 780) { r = 1; }
  const k = w < 420 ? 0.3 + 0.7 * (w - 380) / 40 : w > 700 ? 0.3 + 0.7 * (780 - w) / 80 : 1;
  const c = v => Math.round(255 * Math.pow(v * k, 0.8));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

/* ====================== partes interativas ====================== */
const FV = {};

/* 1. opostos se atraem */
FV.attract = {
  html: U => `<svg viewBox="0 0 440 150" class="fl-svg" id="faSvg"></svg>
    <p class="fl-cap">${U.tap}</p>
    <div class="al-ctl"><label>${U.dist}</label><input type="range" min="1" max="10" step="0.1" value="6" id="faD"><b id="faDv"></b></div>
    <div class="fl-read" id="faOut"></div>`,
  init(U, q) {
    const vals = [1, 2, -1, -2];
    let ia = 0, ib = 2;
    const draw = () => {
      const d = +q('#faD').value, qa = vals[ia], qb = vals[ib];
      const half = 30 + d * 17, xa = 220 - half, xb = 220 + half;
      const F = Math.abs(qa * qb) / (d * d), att = qa * qb < 0;
      const L = flClamp(8 + 70 * Math.sqrt(F / 4), 8, att ? half - 30 : 90);
      const ch = v => `${Math.abs(v) > 1 ? Math.abs(v) : ''}${v > 0 ? '+' : '−'}`;
      const ball = (x, v, k) => `<g class="fa-c" data-k="${k}" style="cursor:var(--cur-hand)"><circle cx="${x}" cy="75" r="${22 + Math.abs(v) * 4}" class="${v > 0 ? 'fl-pos' : 'fl-neg'}"/><text x="${x}" y="82" class="fl-ct">${ch(v)}</text></g>`;
      const arr = (x, dir) => { const x0 = x + dir * (28 + (att ? 0 : 0)); const x1 = att ? x0 + dir * L : x0 - dir * 0; return att ? `<line x1="${x0}" y1="75" x2="${x1}" y2="75" class="fl-arr" marker-end="url(#faHead)"/>` : `<line x1="${x - dir * 30}" y1="75" x2="${x - dir * (30 + L)}" y2="75" class="fl-arr rep" marker-end="url(#faHead2)"/>`; };
      q('#faSvg').innerHTML = `<defs><marker id="faHead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2e9e4f"/></marker><marker id="faHead2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e53935"/></marker></defs>
        <line x1="${xa}" y1="128" x2="${xb}" y2="128" class="fl-dim"/>
        ${arr(xa, 1)}${arr(xb, -1)}${ball(xa, qa, 'a')}${ball(xb, qb, 'b')}`;
      q('#faDv').textContent = flNum(d, 1);
      const rel = Math.abs(qa * qb) * 100 / (d * d);
      q('#faOut').innerHTML = `<b class="${att ? 'g' : 'r'}">${att ? U.att : U.rep}</b> · ${U.force}: <b>${flNum(rel, rel < 10 ? 1 : 0)}×</b> <small>${U.times}</small>`;
      q('#faSvg').querySelectorAll('.fa-c').forEach(g => g.onclick = () => { if (g.dataset.k === 'a') ia = (ia + 1) % 4; else ib = (ib + 1) % 4; draw(); });
    };
    q('#faD').oninput = draw; draw();
  },
};

/* 2. por que o elétron não cai */
FV.nofall = {
  html: U => `<div class="fl-two"><svg viewBox="0 0 200 200" class="fl-svg sq" id="fnCloud"></svg>
    <svg viewBox="0 0 330 210" class="fl-svg" id="fnPlot"></svg></div>
    <div class="al-ctl"><label>${U.size}</label><input type="range" min="0.3" max="3.2" step="0.01" value="2.6" id="fnR"><button class="btn-y fl-sm" id="fnAuto">${U.auto}</button></div>
    <div class="fl-msg" id="fnMsg"></div>`,
  init(U, q) {
    const X = r => 40 + (r - 0.25) / 3.1 * 280, Y = E => flClamp(78 - E * 80, 24, 200);
    const path = f => { let s = ''; for (let r = 0.25; r <= 3.35; r += 0.02) s += `${s ? 'L' : 'M'}${X(r).toFixed(1)} ${Y(f(r)).toFixed(1)}`; return s; };
    const att = r => -1 / r, sq = r => 1 / (2 * r * r), tot = r => att(r) + sq(r);
    const base = `<line x1="40" y1="78" x2="322" y2="78" class="fl-axis"/><line x1="40" y1="20" x2="40" y2="204" class="fl-axis"/>
      <text x="36" y="14" class="fl-small l">${U.e} ↑</text><text x="322" y="207" class="fl-small r">${U.r} →</text>
      <path d="${path(att)}" class="fl-c att"/><path d="${path(sq)}" class="fl-c sq"/><path d="${path(tot)}" class="fl-c tot"/>
      <g class="fl-leg"><rect x="108" y="22" width="12" height="4" class="att"/><text x="124" y="27">${U.att}</text><rect x="108" y="37" width="12" height="4" class="sq"/><text x="124" y="42">${U.sq}</text><rect x="108" y="52" width="12" height="4" class="tot"/><text x="124" y="57">${U.tot}</text></g>`;
    const dots = Array.from({ length: 26 }, () => ({ a: Math.random() * 6.28, f: Math.random(), w: (Math.random() - 0.5) * 2 }));
    let r = 2.6, anim = null;
    const show = () => {
      q('#fnPlot').innerHTML = `${base}<line x1="${X(r)}" y1="20" x2="${X(r)}" y2="204" class="fl-dash"/><circle cx="${X(r)}" cy="${Y(tot(r))}" r="7" class="fl-mark"/>`;
      const m = r < 0.72 ? U.near : r > 1.4 ? U.far : U.ok;
      q('#fnMsg').innerHTML = m; q('#fnMsg').className = 'fl-msg ' + (m === U.ok ? 'ok' : '');
    };
    const cloud = q('#fnCloud');
    flLoop(dt => {
      if (anim) { r += (1 - r) * Math.min(1, dt * 3); q('#fnR').value = r; if (Math.abs(r - 1) < 0.005) { r = 1; anim = null; } show(); }
      const R = 14 + r * 26, sp = 1.2 / (r * r);
      dots.forEach(d => { d.a += d.w * sp * dt * 3; d.f = flClamp(d.f + (Math.random() - 0.5) * sp * dt * 1.5, 0.05, 1); });
      cloud.innerHTML = `<defs><radialGradient id="fnG"><stop offset="0" stop-color="#4f8dff" stop-opacity=".55"/><stop offset="1" stop-color="#4f8dff" stop-opacity="0"/></radialGradient></defs>
        <circle cx="100" cy="100" r="${R * 1.15}" fill="url(#fnG)"/>
        ${dots.map(d => `<circle cx="${(100 + Math.cos(d.a) * d.f * R).toFixed(1)}" cy="${(100 + Math.sin(d.a) * d.f * R).toFixed(1)}" r="2.2" class="fl-edot"/>`).join('')}
        <circle cx="100" cy="100" r="6" class="fl-pos"/>`;
    });
    q('#fnR').oninput = e => { anim = null; r = +e.target.value; show(); };
    q('#fnAuto').onclick = () => { anim = true; };
    show();
  },
};

/* 3. degraus e cores */
FV.levels = {
  html: U => `<p class="fl-cap">${U.help}</p>
    <svg viewBox="0 0 440 290" class="fl-svg" id="flvSvg"></svg>
    <div class="fl-spec"><div class="fl-specbar" id="flvSpec"></div><div class="fl-speclbl"><span>380 nm</span><span>${U.h}</span><span>750 nm</span></div></div>
    <div class="fl-msg" id="flvMsg"></div>
    <h3 class="al-h3">${U.flames}</h3>
    <div class="fl-flames">${U.fl.map(([s, c, n]) => `<div><i style="--f:${c}"></i><b>${s}</b><small>${n}</small></div>`).join('')}</div>
    <p class="al-note">🔭 ${U.stars}</p>`,
  init(U, q) {
    const E = n => -13.6 / (n * n), Yn = n => 270 - 240 * Math.pow((13.6 + E(n)) / 13.6, 2.5);
    const L = ['K', 'L', 'M', 'N', 'O'];
    let cur = 1, ey = Yn(1), ty = ey, photon = null, found = new Set();
    const svg = q('#flvSvg');
    const levels = [1, 2, 3, 4, 5].map(n => `<g class="flv-l" data-n="${n}"><rect x="70" y="${Yn(n) - 9}" width="250" height="18" fill="transparent"/><line x1="90" y1="${Yn(n)}" x2="310" y2="${Yn(n)}" class="flv-line"/><text x="84" y="${Yn(n) + 4}" class="fl-small r">n=${n} · ${L[n - 1]}</text></g>`).join('');
    svg.innerHTML = `<line x1="40" y1="20" x2="40" y2="280" class="fl-axis"/><text x="34" y="14" class="fl-small l">E ↑</text>${levels}<polyline id="flvPh" class="flv-ph" points=""/><circle id="flvE" cx="200" cy="${ey}" r="8" class="fl-edot big"/>`;
    const phEl = svg.querySelector('#flvPh'), eEl = svg.querySelector('#flvE');
    const frame = () => {
      eEl.setAttribute('cy', ey.toFixed(1));
      if (!photon) { phEl.setAttribute('points', ''); return; }
      const k = photon.t, x0 = 200, x1 = 200 + k * 230, pts = [];
      for (let x = x0; x <= x1; x += 2) pts.push(`${x},${(photon.y + Math.sin((x - x0) / 5) * 6).toFixed(1)}`);
      phEl.setAttribute('points', pts.join(' ')); phEl.style.stroke = photon.c;
    };
    svg.onpointerdown = e => { const g = e.target.closest('.flv-l'); if (g) pick(+g.dataset.n); };
    const spec = () => q('#flvSpec').innerHTML = [...found].map(w => `<i style="left:${(w - 380) / 370 * 100}%;background:${flWaveRGB(w)}"></i>`).join('');
    const pick = n => {
      if (n === cur) return;
      if (n > cur) { cur = n; ty = Yn(n); q('#flvMsg').innerHTML = U.up; return; }
      const w = 91.13 / (1 / (n * n) - 1 / (cur * cur));
      const vis = w >= 380 && w <= 750;
      const c = vis ? flWaveRGB(w) : w < 380 ? '#9b59ff' : '#c0392b';
      photon = { t: 0, y: ey, c };
      q('#flvMsg').innerHTML = `n=${cur} → n=${n}: <b>λ = ${flNum(w, 0)} ${U.nm}</b> · <span class="flv-sw" style="background:${c}"></span> ${vis ? U.vis : w < 380 ? U.uv : U.ir}`;
      if (vis) { found.add(Math.round(w)); spec(); }
      cur = n; ty = Yn(n);
    };
    flLoop(dt => {
      ey += (ty - ey) * Math.min(1, dt * 8);
      if (photon) { photon.t += dt * 1.4; if (photon.t >= 1) photon = null; }
      frame();
    });
  },
};

/* 4. a última camada */
FV.shells = {
  html: U => `<div class="al-ctl"><label>${U.el}</label><button data-d="-1">−</button><input type="range" min="1" max="20" value="11" id="fsZ"><button data-d="1">+</button></div>
    <div class="fl-two"><svg viewBox="0 0 220 220" class="fl-svg sq" id="fsSvg"></svg><div class="fl-info" id="fsInfo"></div></div>`,
  init(U, q) {
    const show = () => {
      const z = +q('#fsZ').value, sh = shellsOf(z), last = sh.length - 1, v = sh[last];
      let s = `<circle cx="110" cy="110" r="12" class="fl-pos"/><text x="110" y="114" class="fl-ct sm">${z}+</text>`;
      sh.forEach((cnt, i) => {
        const R = 30 + i * 24, isL = i === last;
        s += `<circle cx="110" cy="110" r="${R}" class="fs-ring ${isL ? 'last' : ''}"/><g class="fs-spin" style="animation-duration:${8 + i * 5}s">`;
        for (let k = 0; k < cnt; k++) { const a = k / cnt * 6.283 + i; s += `<circle cx="${110 + Math.cos(a) * R}" cy="${110 + Math.sin(a) * R}" r="${isL ? 6 : 5}" class="${isL ? 'fs-val' : 'fl-edot'}"/>`; }
        s += '</g>';
      });
      q('#fsSvg').innerHTML = s;
      const g = z === 1 ? 1 : z === 2 ? 18 : v <= 2 ? v : v + 10;
      const vv = z === 2 ? 2 : v;
      let tip;
      if (z === 1) tip = U.hyd; else if (z === 2 || v === 8) tip = U.full; else if (v <= 3) tip = U.lose.replace('{n}', v); else if (v >= 5) tip = U.gain.replace('{n}', 8 - v); else tip = U.mid;
      const same = []; for (let k = 1; k <= 20; k++) { const s2 = shellsOf(k), gg = k === 1 ? 1 : k === 2 ? 18 : s2[s2.length - 1] <= 2 ? s2[s2.length - 1] : s2[s2.length - 1] + 10; if (gg === g && (k > 2 || k === z)) same.push(k); }
      q('#fsInfo').innerHTML = `${alTile(z)}
        <p>${sh.map((c, i) => `<span class="fs-chip ${i === last ? 'on' : ''}">${'KLMN'[i]} ${c}</span>`).join(' ')}</p>
        <p><b class="fl-big">${vv}</b> ${U.val} · ${U.g} <b>${g}</b></p>
        <p class="fs-same">${same.map(k => `<b class="${k === z ? 'on' : ''}">${flSym(k)}</b>`).join('')}</p>
        <p class="fl-msg ok">${tip}</p>`;
    };
    q('#fsZ').oninput = show;
    q('#fsZ').closest('.al-ctl').querySelectorAll('button').forEach(b => b.onclick = () => { const r = q('#fsZ'); r.value = flClamp(+r.value + +b.dataset.d, 1, 20); show(); });
    show();
  },
};

/* 5. a puxada do núcleo */
const FL_MAIN = [[1, 0, 0, 0, 0, 0, 0, 2], [3, 4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17, 18], [19, 20, 31, 32, 33, 34, 35, 36], [37, 38, 49, 50, 51, 52, 53, 54], [55, 56, 81, 82, 83, 84, 85, 86]];
const FL_EN = { 1: 2.2, 3: .98, 4: 1.57, 5: 2.04, 6: 2.55, 7: 3.04, 8: 3.44, 9: 3.98, 11: .93, 12: 1.31, 13: 1.61, 14: 1.9, 15: 2.19, 16: 2.58, 17: 3.16, 19: .82, 20: 1, 31: 1.81, 32: 2.01, 33: 2.18, 34: 2.55, 35: 2.96, 36: 3, 37: .82, 38: .95, 49: 1.78, 50: 1.96, 51: 2.05, 52: 2.1, 53: 2.66, 54: 2.6, 55: .79, 56: .89, 81: 1.62, 82: 1.87, 83: 2.02, 84: 2, 85: 2.2 };
const FL_IE = { 1: 13.6, 2: 24.59, 3: 5.39, 4: 9.32, 5: 8.3, 6: 11.26, 7: 14.53, 8: 13.62, 9: 17.42, 10: 21.56, 11: 5.14, 12: 7.65, 13: 5.99, 14: 8.15, 15: 10.49, 16: 10.36, 17: 12.97, 18: 15.76, 19: 4.34, 20: 6.11, 31: 6, 32: 7.9, 33: 9.79, 34: 9.75, 35: 11.81, 36: 14, 37: 4.18, 38: 5.69, 49: 5.79, 50: 7.34, 51: 8.61, 52: 9.01, 53: 10.45, 54: 12.13, 55: 3.89, 56: 5.21, 81: 6.11, 82: 7.42, 83: 7.29, 84: 8.41, 85: 9.32, 86: 10.75 };
const FL_RAD = { 1: 31, 2: 28, 3: 128, 4: 96, 5: 84, 6: 76, 7: 71, 8: 66, 9: 57, 10: 58, 11: 166, 12: 141, 13: 121, 14: 111, 15: 107, 16: 105, 17: 102, 18: 106, 19: 203, 20: 176, 31: 122, 32: 120, 33: 119, 34: 120, 35: 120, 36: 116, 37: 220, 38: 195, 49: 142, 50: 139, 51: 139, 52: 138, 53: 139, 54: 140, 55: 244, 56: 215, 81: 145, 82: 146, 83: 148, 84: 140, 85: 150, 86: 150 };
FV.pull = {
  html: U => `<div class="fl-two"><svg viewBox="0 0 300 130" class="fl-svg" id="fpSvg"></svg>
    <div class="fl-col"><div class="al-ctl"><label>${U.z}</label><input type="range" min="1" max="8" value="1" id="fpZ"><b id="fpZv"></b></div>
    <div class="al-ctl"><label>${U.n}</label><input type="range" min="1" max="6" value="3" id="fpN"><b id="fpNv"></b></div>
    <div class="fl-meter"><span>${U.pull}</span><div><i id="fpBar"></i></div></div></div></div>
    <div class="al-chips" id="fpMode">${U.modes.map(([k, n], i) => `<button data-m="${k}" class="${i ? '' : 'on'}">${n}</button>`).join('')}</div>
    <div class="fp-grid" id="fpGrid"></div>
    <p class="fl-cap">${U.hint}</p>`,
  init(U, q) {
    const showA = () => {
      const z = +q('#fpZ').value, n = +q('#fpN').value, p = z / (n * n);
      q('#fpZv').textContent = '+' + z; q('#fpNv').textContent = 'KLMNOP'[n - 1];
      const R = 18 + n * 18, w = flClamp(1 + p * 1.6, 1, 9);
      let s = `<circle cx="40" cy="65" r="20" class="fl-pos"/><text x="40" y="71" class="fl-ct sm">+${z}</text>`;
      for (let i = 1; i <= n; i++) s += `<path d="M${40 + (18 + i * 18) * Math.cos(-.6)} ${65 + (18 + i * 18) * Math.sin(-.6)} A${18 + i * 18} ${18 + i * 18} 0 0 1 ${40 + (18 + i * 18) * Math.cos(.6)} ${65 + (18 + i * 18) * Math.sin(.6)}" class="fs-ring ${i === n ? 'last' : ''}"/>`;
      s += `<line x1="${40 + R - 12}" y1="65" x2="64" y2="65" class="fl-arr" style="stroke-width:${w}" marker-end="url(#fpH)"/><circle cx="${40 + R}" cy="65" r="8" class="fs-val"/>`;
      q('#fpSvg').innerHTML = `<defs><marker id="fpH" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2e9e4f"/></marker></defs>${s}`;
      q('#fpBar').style.width = Math.min(100, Math.sqrt(p / 8) * 100) + '%';
    };
    let mode = 'pull';
    const val = z => {
      const row = FL_MAIN.findIndex(r => r.includes(z)), col = FL_MAIN[row].indexOf(z);
      if (mode === 'pull') { const zf = z === 1 ? 1 : z === 2 ? 2 : col < 2 ? col + 1 : col + 1; return { v: zf / ((row + 1) * (row + 1)), t: flNum(zf / ((row + 1) * (row + 1)), 2), max: 2 }; }
      if (mode === 'en') return FL_EN[z] ? { v: FL_EN[z], t: flNum(FL_EN[z], 2), max: 4 } : { v: null, t: '—' };
      if (mode === 'ie') return { v: FL_IE[z], t: flNum(FL_IE[z], 1), max: 25 };
      return { v: FL_RAD[z], t: FL_RAD[z], max: 250 };
    };
    const hue = { pull: 140, en: 200, ie: 40, r: 280 };
    const grid = () => {
      q('#fpGrid').innerHTML = `<span></span>${['1', '2', '13', '14', '15', '16', '17', '18'].map(g => `<span class="fp-h">${g}</span>`).join('')}` + FL_MAIN.map((r, i) => `<span class="fp-h">${i + 1}</span>` + r.map(z => {
        if (!z) return '<span></span>';
        const o = val(z), f = o.v == null ? 0 : Math.min(1, o.v / o.max);
        const bg = o.v == null ? '#f2f2ee' : `hsl(${hue[mode]},80%,${96 - 52 * Math.pow(f, mode === 'pull' ? 0.5 : 1)}%)`;
        return `<div class="fp-c" style="background:${bg}"><b>${flSym(z)}</b><small>${o.t}</small></div>`;
      }).join('')).join('');
    };
    q('#fpZ').oninput = showA; q('#fpN').oninput = showA;
    q('#fpMode').querySelectorAll('button').forEach(b => b.onclick = () => { mode = b.dataset.m; q('#fpMode').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); grid(); });
    showA(); grid();
  },
};

/* 6. por que se ligam (curva H–H) */
FV.bond = {
  html: U => `<svg viewBox="0 0 440 120" class="fl-svg" id="fbAt"></svg>
    <svg viewBox="0 0 440 200" class="fl-svg" id="fbPlot"></svg>
    <div class="al-ctl"><label>${U.d}</label><input type="range" min="30" max="300" value="250" id="fbD"><b id="fbDv"></b><button class="btn-y fl-sm" id="fbDrop">${U.drop}</button></div>
    <div class="fl-msg" id="fbMsg"></div>`,
  init(U, q) {
    const De = 436, a = 0.0194, re = 74, E = d => De * (Math.pow(1 - Math.exp(-a * (d - re)), 2) - 1);
    const X = d => 30 + (d - 30) / 270 * 400, Y = e => flClamp(40 + (e + 450) / 900 * -1 * -160, 4, 196);
    const Ye = e => flClamp(170 - (e + 450) / 850 * 160, 4, 196);
    let curve = ''; for (let d = 30; d <= 300; d += 2) curve += `${curve ? 'L' : 'M'}${X(d).toFixed(1)} ${Ye(E(d)).toFixed(1)}`;
    let d = 250, anim = null, t = 0;
    const plot = () => {
      const e = E(d);
      q('#fbPlot').innerHTML = `<line x1="30" y1="${Ye(0)}" x2="430" y2="${Ye(0)}" class="fl-axis"/><text x="428" y="${Ye(0) - 5}" class="fl-small r">${U.zero}</text>
        <text x="34" y="14" class="fl-small l">${U.e}</text><path d="${curve}" class="fl-c tot"/>
        <line x1="${X(74)}" y1="${Ye(0)}" x2="${X(74)}" y2="${Ye(-436)}" class="fl-dash"/><text x="${X(74) + 6}" y="${Ye(-436) + 16}" class="fl-small l">74 ${U.pm} · −436 ${U.kj}</text>
        <circle cx="${X(d)}" cy="${Ye(e)}" r="8" class="fl-mark"/>`;
      q('#fbDv').textContent = `${Math.round(d)} ${U.pm} · ${Math.round(e)} ${U.kj}`;
      const m = d < 58 ? U.near : d <= 95 ? U.ok : d < 190 ? U.mid : U.far;
      q('#fbMsg').innerHTML = m; q('#fbMsg').className = 'fl-msg ' + (m === U.ok ? 'ok' : m === U.near ? 'bad' : '');
    };
    flLoop((dt, now) => {
      if (anim) { t += dt; d = 74 + (anim - 74) * Math.exp(-2.2 * t) * Math.cos(7 * t); q('#fbD').value = d; plot(); if (t > 2.5) { anim = null; d = 74; plot(); } }
      const sep = d * 0.9, xa = 220 - sep / 2, xb = 220 + sep / 2, sh = flClamp((170 - d) / 90, 0, 1), ph = now / 400;
      const e1 = [xa + Math.cos(ph) * 26, 60 + Math.sin(ph) * 26], e2 = [xb + Math.cos(-ph + 2) * 26, 60 + Math.sin(-ph + 2) * 26];
      const m1 = [220 + Math.cos(ph * 1.3) * (sep / 2) * 0.4, 60 + Math.sin(ph * 1.3) * 16], m2 = [220 - Math.cos(ph * 1.3) * (sep / 2) * 0.4, 60 - Math.sin(ph * 1.3) * 16];
      const mix = (p, r) => [p[0] + (r[0] - p[0]) * sh, p[1] + (r[1] - p[1]) * sh];
      const a1 = mix(e1, m1), a2 = mix(e2, m2);
      q('#fbAt').innerHTML = `<defs><radialGradient id="fbG"><stop offset="0" stop-color="#4f8dff" stop-opacity=".4"/><stop offset="1" stop-color="#4f8dff" stop-opacity="0"/></radialGradient></defs>
        <circle cx="${xa}" cy="60" r="44" fill="url(#fbG)"/><circle cx="${xb}" cy="60" r="44" fill="url(#fbG)"/>
        <ellipse cx="220" cy="60" rx="${sep / 2 + 30}" ry="34" fill="url(#fbG)" opacity="${sh}"/>
        <circle cx="${xa}" cy="60" r="9" class="fl-pos"/><circle cx="${xb}" cy="60" r="9" class="fl-pos"/>
        <circle cx="${a1[0]}" cy="${a1[1]}" r="5" class="fl-edot"/><circle cx="${a2[0]}" cy="${a2[1]}" r="5" class="fl-edot"/>
        ${d < 58 ? `<text x="220" y="112" class="fl-small" fill="#e53935">+ ↔ +</text>` : ''}`;
    });
    q('#fbD').oninput = e => { anim = null; d = +e.target.value; plot(); };
    q('#fbDrop').onclick = () => { anim = d; t = 0; };
    plot();
  },
};

/* 7. escala de ligação */
FV.spectrum = {
  html: U => `<div class="al-chips" id="fsPre"></div>
    <svg viewBox="0 0 440 170" class="fl-svg" id="fsxSvg"></svg>
    <div class="fl-2ctl"><div class="al-ctl"><label>${U.a}</label><input type="range" min="0.7" max="4" step="0.01" value="2.2" id="fsxA"><b id="fsxAv"></b></div>
    <div class="al-ctl"><label>${U.b}</label><input type="range" min="0.7" max="4" step="0.01" value="3.16" id="fsxB"><b id="fsxBv"></b></div></div>
    <div class="fl-scale"><div class="fl-sbar"><i id="fsxMk"></i><span style="left:${0.4 / 3.3 * 100}%"></span><span style="left:${1.7 / 3.3 * 100}%"></span></div><div class="fl-slbl"><em>${U.scale[0]}</em><em>${U.scale[1]}</em><em>${U.scale[2]}</em></div></div>
    <div class="fl-msg ok" id="fsxMsg"></div>`,
  init(U, q) {
    const PRE = [['H', 'H', 2.2, 2.2], ['H', 'Cl', 2.2, 3.16], ['H', 'O', 2.2, 3.44], ['C', 'H', 2.55, 2.2], ['Na', 'Cl', .93, 3.16], ['K', 'F', .82, 3.98], ['Na', 'Na', .93, .93]];
    let la = 'H', lb = 'Cl', sea = Array.from({ length: 14 }, () => ({ x: Math.random(), y: Math.random(), vx: Math.random() - .5, vy: Math.random() - .5 }));
    q('#fsPre').innerHTML = PRE.map((p, i) => `<button data-i="${i}" class="${i === 1 ? 'on' : ''}">${p[0]}–${p[1]}</button>`).join('');
    q('#fsPre').querySelectorAll('button').forEach(b => b.onclick = () => {
      const p = PRE[+b.dataset.i]; la = p[0]; lb = p[1]; q('#fsxA').value = p[2]; q('#fsxB').value = p[3];
      q('#fsPre').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); info();
    });
    const kind = () => { const a = +q('#fsxA').value, b = +q('#fsxB').value, d = Math.abs(a - b); return Math.max(a, b) <= 1.9 ? 'metal' : d < 0.4 ? 'apolar' : d < 1.7 ? 'polar' : 'ionic'; };
    const info = () => {
      const a = +q('#fsxA').value, b = +q('#fsxB').value, d = Math.abs(a - b);
      q('#fsxAv').textContent = flNum(a, 2); q('#fsxBv').textContent = flNum(b, 2);
      q('#fsxMk').style.left = Math.min(100, d / 3.3 * 100) + '%';
      q('#fsxMsg').innerHTML = `${U.diff}: <b>${flNum(d, 2)}</b> → <b>${U.types[kind()]}</b>`;
    };
    const manual = () => { la = 'A'; lb = 'B'; q('#fsPre').querySelectorAll('button').forEach(x => x.classList.remove('on')); info(); };
    q('#fsxA').oninput = manual; q('#fsxB').oninput = manual;
    let px = 220;
    flLoop((dt, now) => {
      const a = +q('#fsxA').value, b = +q('#fsxB').value, k = kind();
      const target = k === 'ionic' ? (b > a ? 320 : 120) : 220 + flClamp((b - a) / 1.7, -1, 1) * 70;
      px += (target - px) * Math.min(1, dt * 5);
      let s = '';
      const atom = (x, l, en, sign) => `<circle cx="${x}" cy="80" r="34" class="fsx-at"/><text x="${x}" y="87" class="fl-ct sm">${l}</text>${sign ? `<text x="${x}" y="36" class="fsx-q ${sign.includes('+') ? 'p' : 'n'}">${sign}</text>` : ''}`;
      if (k === 'metal') {
        sea.forEach(e => { e.x += e.vx * dt * 0.4; e.y += e.vy * dt * 0.4; if (e.x < 0 || e.x > 1) e.vx *= -1; if (e.y < 0 || e.y > 1) e.vy *= -1; });
        s = `<rect x="40" y="25" width="360" height="110" rx="20" class="fsx-sea"/>${atom(120, la, a, '+')}${atom(320, lb, b, '+')}${sea.map(e => `<circle cx="${50 + e.x * 340}" cy="${32 + e.y * 96}" r="4" class="fl-edot"/>`).join('')}<text x="220" y="160" class="fl-small">${U.sea}</text>`;
      } else {
        const sa = k === 'ionic' ? (b > a ? '+' : '−') : k === 'polar' ? (b > a ? 'δ+' : 'δ−') : '';
        const sb = k === 'ionic' ? (b > a ? '−' : '+') : k === 'polar' ? (b > a ? 'δ−' : 'δ+') : '';
        const jig = Math.sin(now / 300) * 3;
        s = `${atom(120, la, a, sa)}${atom(320, lb, b, sb)}<ellipse cx="${px}" cy="80" rx="${k === 'ionic' ? 34 : 40}" ry="26" class="fsx-pair"/>
          <circle cx="${px - 7}" cy="${80 + jig}" r="5" class="fl-edot"/><circle cx="${px + 7}" cy="${80 - jig}" r="5" class="fl-edot"/><text x="${px}" y="160" class="fl-small">${U.pair}</text>`;
      }
      q('#fsxSvg').innerHTML = s;
    });
    info();
  },
};

/* 8. forma das moléculas (3D girando) */
FV.shape = {
  html: U => `<div class="fl-2ctl"><div class="al-ctl"><label>${U.pairs}</label><span class="al-chips" id="fgP"><button data-v="2">2</button><button data-v="3">3</button><button data-v="4" class="on">4</button></span></div>
    <div class="al-ctl"><label>${U.lone}</label><span class="al-chips" id="fgL"></span></div></div>
    <div class="fl-two"><svg viewBox="-122 -112 244 224" class="fl-svg sq grab" id="fgSvg"></svg><div class="fl-info" id="fgInfo"></div></div>
    <p class="fl-cap">${U.drag}</p>`,
  init(U, q) {
    const s3 = 1 / Math.sqrt(3);
    const DIR = { 2: [[1, 0, 0], [-1, 0, 0]], 3: [[0, 1, 0], [.866, -.5, 0], [-.866, -.5, 0]], 4: [[0, 1, 0], [.943, -.333, 0], [-.471, -.333, .816], [-.471, -.333, -.816]] };
    const EX = { '2-0': ['C', 'O', 'CO₂', 180], '3-0': ['B', 'F', 'BF₃', 120], '3-1': ['S', 'O', 'SO₂', 119], '4-0': ['C', 'H', 'CH₄', 109.5], '4-1': ['N', 'H', 'NH₃', 107], '4-2': ['O', 'H', 'H₂O', 104.5] };
    let P = 4, Lp = 0, th = 0.4, tilt = 0.35, auto = true, drag = null;
    const chipsL = () => { q('#fgL').innerHTML = Array.from({ length: P - 1 }, (_, i) => `<button data-v="${i}" class="${i === Lp ? 'on' : ''}">${i}</button>`).join(''); q('#fgL').querySelectorAll('button').forEach(b => b.onclick = () => { Lp = +b.dataset.v; chipsL(); info(); }); };
    q('#fgP').querySelectorAll('button').forEach(b => b.onclick = () => { P = +b.dataset.v; Lp = 0; q('#fgP').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); chipsL(); info(); });
    const info = () => { const k = `${P}-${Lp}`, e = EX[k]; q('#fgInfo').innerHTML = `<p class="fl-big">${U.names[k]}</p><p>${U.angle}: <b>${flNum(e[3], e[3] % 1 ? 1 : 0)}°</b></p><p>${U.ex}: <b class="fl-big">${e[2]}</b></p>`; };
    const svg = q('#fgSvg');
    svg.onpointerdown = e => { drag = { x: e.clientX, y: e.clientY, th, tilt }; auto = false; svg.setPointerCapture(e.pointerId); };
    svg.onpointermove = e => { if (!drag) return; th = drag.th + (e.clientX - drag.x) / 80; tilt = flClamp(drag.tilt + (e.clientY - drag.y) / 80, -1.3, 1.3); };
    svg.onpointerup = () => { drag = null; flLater(() => { if (!drag) auto = true; }, 2500); };
    flLoop(dt => {
      if (auto) th += dt * 0.6;
      const e = EX[`${P}-${Lp}`], rot = v => { const x = v[0] * Math.cos(th) + v[2] * Math.sin(th), z0 = -v[0] * Math.sin(th) + v[2] * Math.cos(th); const y = v[1] * Math.cos(tilt) - z0 * Math.sin(tilt), z = v[1] * Math.sin(tilt) + z0 * Math.cos(tilt); return [x, y, z]; };
      const items = [];
      DIR[P].forEach((d, i) => {
        const lone = i < Lp, p = rot(d), R = lone ? 58 : 92;
        if (lone) items.push({ z: p[2], s: `<ellipse cx="${p[0] * R}" cy="${-p[1] * R}" rx="${26 + p[2] * 4}" ry="${20 + p[2] * 3}" class="fg-lone" transform="rotate(${Math.atan2(-p[1], p[0]) * 57.3} ${p[0] * R} ${-p[1] * R})"/><circle cx="${p[0] * R - 5}" cy="${-p[1] * R}" r="3.5" class="fl-edot"/><circle cx="${p[0] * R + 5}" cy="${-p[1] * R}" r="3.5" class="fl-edot"/>` });
        else items.push({ z: p[2], s: `<line x1="0" y1="0" x2="${p[0] * R}" y2="${-p[1] * R}" class="fg-bond"/><circle cx="${p[0] * R}" cy="${-p[1] * R}" r="${20 + p[2] * 4}" class="fg-at o"/><text x="${p[0] * R}" y="${-p[1] * R + 5}" class="fl-ct sm">${e[1]}</text>` });
      });
      items.push({ z: 0.01, s: `<circle cx="0" cy="0" r="26" class="fg-at c"/><text x="0" y="6" class="fl-ct">${e[0]}</text>` });
      items.sort((a, b) => a.z - b.z);
      svg.innerHTML = items.map(i => i.s).join('');
    });
    chipsL(); info();
  },
};

/* 9. polar ou apolar */
FV.polar = {
  html: U => `<div class="al-chips" id="fpoPre"></div><svg viewBox="0 0 440 230" class="fl-svg" id="fpoSvg"></svg>
    <div class="al-center"><button class="btn-y" id="fpoSum">${U.sum}</button></div><div class="fl-msg" id="fpoMsg"></div>`,
  init(U, q) {
    const EN = { C: 2.55, O: 3.44, H: 2.2, N: 3.04, Cl: 3.16 };
    const M = {
      'CO₂': [['C', 0, 0], ['O', -1.3, 0], ['O', 1.3, 0]], 'H₂O': [['O', 0, -.3], ['H', -1, .45], ['H', 1, .45]],
      'NH₃': [['N', 0, -.35], ['H', -1.1, .35], ['H', 1.1, .35], ['H', 0, .85]], 'CH₄': [['C', 0, 0], ['H', -1.2, 0], ['H', 1.2, 0], ['H', 0, -1.05], ['H', 0, 1.05]],
      'CCl₄': [['C', 0, 0], ['Cl', -1.25, 0], ['Cl', 1.25, 0], ['Cl', 0, -1.1], ['Cl', 0, 1.1]], 'HCl': [['H', -.7, 0], ['Cl', .7, 0]], 'O₂': [['O', -.6, 0], ['O', .6, 0]],
    };
    let cur = 'H₂O', summed = false;
    q('#fpoPre').innerHTML = Object.keys(M).map(k => `<button data-k="${k}" class="${k === cur ? 'on' : ''}">${k}</button>`).join('');
    q('#fpoPre').querySelectorAll('button').forEach(b => b.onclick = () => { cur = b.dataset.k; summed = false; q('#fpoPre').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    const S = 80, cx = 220, cy = 105;
    const draw = () => {
      const at = M[cur], c = at[0], bonds = at.length === 2 ? [[0, 1]] : at.slice(1).map((_, i) => [0, i + 1]);
      let s = '<defs><marker id="fpoH" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#f08c00"/></marker><marker id="fpoH2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d6336c"/></marker></defs>';
      let sx = 0, sy = 0;
      const P = a => [cx + a[1] * S, cy + a[2] * S];
      bonds.forEach(([i, j]) => { const A = P(at[i]), B = P(at[j]); s += `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" class="fg-bond"/>`; });
      bonds.forEach(([i, j]) => {
        const ea = EN[at[i][0]], eb = EN[at[j][0]], d = eb - ea; if (Math.abs(d) < 0.01) return;
        let [A, B] = [P(at[i]), P(at[j])]; if (d < 0) [A, B] = [B, A];
        const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), nx = -dy / L * 16, ny = dx / L * 16;
        sx += dx / L * Math.abs(d); sy += dy / L * Math.abs(d);
        s += `<line x1="${A[0] + dx * .3 + nx}" y1="${A[1] + dy * .3 + ny}" x2="${A[0] + dx * .7 + nx}" y2="${A[1] + dy * .7 + ny}" class="fpo-arr ${summed ? 'dim' : ''}" marker-end="url(#fpoH)"/>`;
      });
      at.forEach(a => { const p = P(a); s += `<circle cx="${p[0]}" cy="${p[1]}" r="${a[0] === 'H' ? 17 : 23}" class="fg-at ${a === c && at.length > 2 ? 'c' : 'o'}"/><text x="${p[0]}" y="${p[1] + 5}" class="fl-ct sm">${a[0]}</text>`; });
      const mag = Math.hypot(sx, sy), none = !bonds.some(([i, j]) => Math.abs(EN[at[i][0]] - EN[at[j][0]]) > 0.01);
      if (summed) {
        if (mag > 0.05) { const k = 60 / Math.max(mag, 0.6); s += `<line x1="${cx - sx * k / 2 + 150}" y1="${cy - sy * k / 2}" x2="${cx + sx * k / 2 + 150}" y2="${cy + sy * k / 2}" class="fpo-sum" marker-end="url(#fpoH2)"/><text x="${cx + 150}" y="${cy + 60}" class="fl-small">Σ</text>`; }
        else s += `<text x="${cx + 160}" y="${cy + 8}" class="fpo-zero">Σ = 0</text>`;
        q('#fpoMsg').innerHTML = none ? U.none : mag > 0.05 ? U.polar : U.apolar;
        q('#fpoMsg').className = 'fl-msg ' + (mag > 0.05 ? 'ok' : '');
      } else q('#fpoMsg').innerHTML = '';
      q('#fpoSvg').innerHTML = s;
    };
    q('#fpoSum').onclick = () => { summed = true; draw(); };
    draw();
  },
};

/* 10. ponto de ebulição */
FV.boil = {
  html: U => `<div class="al-ctl"><label>🌡️ ${U.t}</label><input type="range" min="-200" max="120" value="25" id="fboT"><b id="fboTv"></b></div>
    <div class="fbo-grid" id="fboGrid"></div>`,
  init(U, q) {
    const S = [['O2', 'O₂', -218, -183, 'a'], ['CH4', 'CH₄', -182, -161, 'a'], ['H2S', 'H₂S', -86, -60, 'p'], ['NH3', 'NH₃', -78, -33, 'h'], ['EtOH', 'C₂H₅OH', -114, 78, 'h'], ['H2O', 'H₂O', 0, 100, 'h']];
    const POS = {
      solid: [[30, 55], [50, 55], [70, 55], [30, 75], [50, 75], [70, 75], [30, 35], [50, 35], [70, 35]],
      liquid: [[22, 80], [40, 82], [58, 80], [76, 82], [30, 64], [50, 66], [68, 64], [40, 50], [60, 52]],
      gas: [[15, 15], [70, 22], [40, 40], [85, 55], [20, 60], [55, 75], [80, 85], [30, 88], [60, 30]],
    };
    q('#fboGrid').innerHTML = S.map(([k, f, , b, g]) => `<div class="fbo-c" data-k="${k}"><div class="fbo-box">${'<i></i>'.repeat(9)}</div><b class="fl-big">${f}</b><small>${U.subs[k]}</small><span class="fbo-st"></span><small>${U.boils} <b>${b} °C</b></small><em class="fbo-g ${g}">${U.grip[g]}</em></div>`).join('');
    const show = () => {
      const T = +q('#fboT').value; q('#fboTv').textContent = T + ' °C';
      S.forEach(([k, , m, b]) => {
        const st = T < m ? 'solid' : T < b ? 'liquid' : 'gas', c = q(`.fbo-c[data-k="${k}"]`);
        c.className = 'fbo-c ' + st; c.querySelector('.fbo-st').textContent = U[st];
        c.querySelectorAll('.fbo-box i').forEach((d, i) => { d.style.left = POS[st][i][0] + '%'; d.style.top = POS[st][i][1] + '%'; d.style.animationDelay = (-i * 0.37) + 's'; });
      });
    };
    q('#fboT').oninput = show; show();
  },
};

/* 11. ácidos e bases */
FV.acid = {
  html: U => `<div class="al-chips" id="facPre">${Object.entries(U.subs).map(([k, n], i) => `<button data-k="${k}" class="${i ? '' : 'on'}">${n}</button>`).join('')}</div>
    <svg viewBox="0 0 440 130" class="fl-svg" id="facSvg"></svg>
    <div class="fl-msg" id="facMsg"></div>
    <p class="fl-cap">${U.of100}</p><div class="fac-dots" id="facDots">${'<i></i>'.repeat(100)}</div>
    <div class="fac-ph"><div class="fac-bar"><i id="facMk"></i></div><div class="fac-nums">${Array.from({ length: 15 }, (_, i) => `<span>${i}</span>`).join('')}</div>
    <div class="fac-ex">${U.scale.map(([p, n]) => `<small><b>${flNum(p, p % 1 ? 1 : 0)}</b> ${n}</small>`).join('')}</div></div>`,
  init(U, q) {
    const D = {
      HCl: ['HCl', 'Cl⁻', 'H₂O', 'H₃O⁺', 100, 1, 'acid', 'strong'], HAc: ['CH₃COOH', 'CH₃COO⁻', 'H₂O', 'H₃O⁺', 1.3, 2.9, 'acid', 'weak'],
      H2O: ['H₂O', 'OH⁻', 'H₂O', 'H₃O⁺', 0, 7, 'neutral', ''], NH3: ['H₂O', 'OH⁻', 'NH₃', 'NH₄⁺', 1.3, 11.1, 'base', 'weak'], NaOH: ['H₂O', 'OH⁻ + Na⁺', 'OH⁻', 'H₂O', 100, 13, 'base', 'strong'],
    };
    let cur = 'HCl', t = 0;
    const set = k => {
      cur = k; t = 0; const d = D[k];
      q('#facMk').style.left = d[5] / 14 * 100 + '%';
      const role = d[6] === 'acid' ? `<b>${U.subs[k]}</b> ${U.give} → ${U.acid} ${U[d[7]]}` : d[6] === 'base' ? `<b>${U.subs[k]}</b> ${U.take} → ${U.base} ${U[d[7]]}` : `<b>${U.subs[k]}</b> → ${U.neutral}`;
      q('#facMsg').innerHTML = `${role} · <b>${U.ph} ${flNum(d[5], d[5] % 1 ? 1 : 0)}</b>`;
      const n = d[4] > 0 ? Math.max(1, Math.round(d[4])) : 0;
      q('#facDots').querySelectorAll('i').forEach((x, i) => { x.className = ''; flLater(() => x.classList.toggle('on', i < n), 300 + i * 6); });
    };
    q('#facPre').querySelectorAll('button').forEach(b => b.onclick = () => { q('#facPre').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); set(b.dataset.k); });
    flLoop(dt => {
      t += dt; const d = D[cur], k = flClamp((t % 4 - 0.6) / 1.2, 0, 1), done = k >= 1, e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const x = 120 + (320 - 120) * e, y = 48 - Math.sin(e * Math.PI) * 34, hide = d[4] === 0 && t % 4 > 2.5;
      q('#facSvg').innerHTML = `<circle cx="120" cy="70" r="42" class="fac-m d"/><text x="120" y="76" class="fl-ct sm">${done ? d[1] : d[0]}</text>
        <circle cx="320" cy="70" r="42" class="fac-m a"/><text x="320" y="76" class="fl-ct sm">${done ? d[3] : d[2]}</text>
        <path d="M150 32 Q220 -6 290 32" class="fl-dash"/>
        ${hide ? '' : `<circle cx="${x}" cy="${y}" r="13" class="fac-h"/><text x="${x}" y="${y + 5}" class="fl-ct sm w">H⁺</text>`}`;
    });
    set('HCl');
  },
};

/* 12. oxirredução */
FV.redox = {
  html: U => `<div class="fl-2ctl"><div class="al-ctl"><label>${U.plate}</label><span class="al-chips" id="frP"></span></div>
    <div class="al-ctl"><label>${U.sol}</label><span class="al-chips" id="frS"></span></div></div>
    <svg viewBox="0 0 440 220" class="fl-svg" id="frSvg"></svg>
    <div class="al-center"><button class="btn-y" id="frGo">${U.go}</button></div>
    <div class="fl-msg" id="frMsg"></div>
    <div class="fr-row"><small>${U.row}</small><div id="frRow"></div></div>`,
  init(U, q) {
    const ROW = ['K', 'Na', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'Cu', 'Ag', 'Au'];
    const Z = { K: 19, Na: 11, Mg: 12, Al: 13, Zn: 30, Fe: 26, Pb: 82, Cu: 29, Ag: 47, Au: 79 };
    const COL = { Mg: '#c9ccd1', Zn: '#9aa3ad', Fe: '#6b6f75', Cu: '#d9773a', Ag: '#d8dde3', Au: '#f2c230' };
    const ION = { Mg: 'Mg²⁺', Zn: 'Zn²⁺', Fe: 'Fe²⁺', Cu: 'Cu²⁺', Ag: 'Ag⁺' };
    const SOLC = { Cu: '#7fb8ff', Fe: '#cfe8b8' };
    let plate = 'Zn', sol = 'Cu', st = null;
    const chips = (id, list, get, setv) => { q(id).innerHTML = list.map(m => `<button data-m="${m}" class="${m === get() ? 'on' : ''}">${id === '#frS' ? ION[m] : m}</button>`).join(''); q(id).querySelectorAll('button').forEach(b => b.onclick = () => { setv(b.dataset.m); st = null; q(id).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); q('#frMsg').innerHTML = ''; row(); }); };
    chips('#frP', ['Mg', 'Zn', 'Fe', 'Cu', 'Ag', 'Au'], () => plate, v => plate = v);
    chips('#frS', ['Mg', 'Zn', 'Fe', 'Cu', 'Ag'], () => sol, v => sol = v);
    const row = () => q('#frRow').innerHTML = ROW.map(m => `<b class="${m === plate ? 'p' : ''} ${m === sol ? 's' : ''}">${m}</b>`).join('<span>›</span>');
    const ions = Array.from({ length: 12 }, (_, i) => ({ x: 70 + (i % 6) * 55 + (i % 2) * 10, y: 135 + Math.floor(i / 6) * 40, ph: Math.random() * 6 }));
    q('#frGo').onclick = () => {
      const react = ROW.indexOf(plate) < ROW.indexOf(sol);
      st = { t: 0, react, same: plate === sol };
      const lc = x => LANG === 'pt' ? x.toLowerCase() : x, a = lc(flName(Z[plate])), b = lc(flName(Z[sol]));
      flLater(() => { if (!st) return; q('#frMsg').innerHTML = st.same ? U.same : (react ? U.yes : U.no).replace('{a}', a).replace('{b}', b); q('#frMsg').className = 'fl-msg ' + (react && !st.same ? 'ok' : ''); }, react ? 2600 : 1200);
    };
    flLoop((dt, now) => {
      if (st) st.t += dt;
      const t = st ? st.t : 0, down = st ? Math.min(1, t / 0.8) : 0, py = 20 + down * 60, go = st && st.react && !st.same;
      const k = go ? flClamp((t - 0.9) / 2.2, 0, 1) : 0;
      const sc = SOLC[sol] || '#e6f2ff';
      let s = `<rect x="40" y="90" width="360" height="120" rx="14" fill="${sc}" opacity="${go ? 1 - k * 0.6 : 1}"/><path d="M40 70 L40 196 Q40 210 54 210 L386 210 Q400 210 400 196 L400 70" class="fr-beak"/>`;
      s += `<rect x="200" y="${py}" width="40" height="110" rx="4" fill="${COL[plate]}" stroke="#111" stroke-width="2.5"/>`;
      if (k > 0) s += `<rect x="198" y="${py + 30}" width="44" height="80" rx="4" fill="${COL[sol]}" opacity="${k * 0.9}" stroke="#111" stroke-width="1.5"/>`;
      ions.forEach((o, i) => {
        const my = flClamp(k * 12 - i * 0.9, 0, 1);
        const x = o.x + (220 + (o.x < 220 ? -26 : 26) - o.x) * my + Math.sin(now / 500 + o.ph) * 3, y = o.y + ((py + 50 + (i % 6) * 9) - o.y) * my;
        if (my >= 1) return;
        const ec = flClamp(k * 12 - i * 0.9 + 0.6, 0, 1);
        if (go && ec > 0 && ec < 1) s += `<circle cx="${220 + (x - 220) * ec}" cy="${py + 60 + (y - py - 60) * ec}" r="4" class="fl-edot"/>`;
        s += `<circle cx="${x}" cy="${y}" r="10" fill="${my > 0 ? COL[sol] : '#fff'}" stroke="#111" stroke-width="1.5"/><text x="${x}" y="${y + 3.5}" class="fr-ion">${my > 0 ? '' : '+'}</text>`;
      });
      q('#frSvg').innerHTML = s;
    });
    row();
  },
};

/* 13. o mol */
FV.mole = {
  html: U => `<div class="al-chips" id="fmS">${U.subs.map((s, i) => `<button data-i="${i}" class="${i ? '' : 'on'}">${s[1]}</button>`).join('')}</div>
    <div class="al-ctl"><label>⚖️ ${U.g}</label><input type="range" min="1" max="500" value="12" id="fmG"><b id="fmGv"></b></div>
    <div class="fm-out" id="fmOut"></div>`,
  init(U, q) {
    let si = 0;
    const show = () => {
      const [, n, M, unit] = U.subs[si], g = +q('#fmG').value, mol = g / M, N = mol * 6.022e23, yrs = N / 3.156e7;
      q('#fmGv').textContent = g + ' g';
      q('#fmOut').innerHTML = `<div class="fm-scale"><div class="fm-pile" style="--s:${0.4 + Math.cbrt(g / 500) * 0.9}"></div><div class="fm-plate"></div><b>${g} g</b></div>
        <div class="fm-nums"><div><b>${flNum(mol, mol < 10 ? 3 : 1)}</b><small>${U.mol}</small></div><div><b>${flSci(N)}</b><small>${unit}</small></div>
        <p>${U.count} <b>${flSci(yrs)}</b> ${U.years}<br><small>≈ ${flSci(yrs / 13.8e9)} ${U.universe}</small></p></div>`;
    };
    q('#fmS').querySelectorAll('button').forEach(b => b.onclick = () => { si = +b.dataset.i; q('#fmG').value = Math.round(U.subs[si][2]); q('#fmS').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); show(); });
    q('#fmG').oninput = show; show();
  },
};

/* 14. números quânticos: o endereço */
const FL_L = 'spdf';
function flFill(z) {
  const out = []; let left = z;
  for (const [n, l] of MADELUNG) { if (left <= 0) break; const c = Math.min(left, 2 * (2 * l + 1)); out.push([n, l, c]); left -= c; }
  return out;
}
FV.address = {
  html: U => `<div class="al-ctl"><label>${U.el}</label><button data-d="-1">−</button><select id="faqZ">${alElOpts(Array.from({ length: 118 }, (_, i) => i + 1), 26)}</select><button data-d="1">+</button></div>
    <p class="fl-cap">${U.tap}</p><div class="faq-subs" id="faqSubs"></div>
    <div class="faq-card" id="faqCard"></div>
    <div class="faq-conf" id="faqConf"></div>
    <p class="fl-cap">${U.exc}</p>`,
  init(U, q) {
    let sel = null;
    const show = () => {
      const z = +q('#faqZ').value, f = flFill(z);
      q('#faqSubs').innerHTML = f.map(([n, l, c]) => {
        const no = 2 * l + 1;
        const box = Array.from({ length: no }, (_, i) => {
          const up = i < c, dn = i + no < c, m = i - l;
          return `<span class="faq-o">${up ? `<button data-a="${n},${l},${m},1" class="faq-e">↑</button>` : '<i></i>'}${dn ? `<button data-a="${n},${l},${m},-1" class="faq-e">↓</button>` : '<i></i>'}</span>`;
        }).join('');
        return `<div class="faq-sub l${l}"><b>${n}${FL_L[l]}<sup>${c}</sup></b><div>${box}</div></div>`;
      }).join('');
      const last = f[f.length - 1], no = 2 * last[1] + 1, c = last[2];
      const k = c - 1, def = k < no ? [last[0], last[1], k - last[1], 1] : [last[0], last[1], k - no - last[1], -1];
      sel = def.join(',');
      q('#faqSubs').querySelectorAll('.faq-e').forEach(b => b.onclick = () => { sel = b.dataset.a; card(); });
      const sh = []; f.forEach(([n, , c2]) => sh[n - 1] = (sh[n - 1] || 0) + c2);
      q('#faqConf').innerHTML = `<p><b>${U.conf}:</b> ${f.map(([n, l, c2]) => `${n}${FL_L[l]}${flSup(c2)}`).join(' ')}</p><p><b>${U.shells}:</b> ${sh.map((c2, i) => `<span class="fs-chip ${i === sh.length - 1 ? 'on' : ''}">${'KLMNOPQ'[i]} ${c2}</span>`).join(' ')}</p>`;
      card();
    };
    const card = () => {
      const [n, l, m, s] = sel.split(',').map(Number);
      q('#faqSubs').querySelectorAll('.faq-e').forEach(b => b.classList.toggle('on', b.dataset.a === sel));
      q('#faqCard').innerHTML = `<b>${U.addr}:</b><div><span>n = <b>${n}</b><small>🏢 ${U.floor} ${n} (${'KLMNOPQ'[n - 1]})</small></span><span>l = <b>${l}</b><small>🚪 ${U.type} ${FL_L[l]}</small></span><span>m = <b>${m > 0 ? '+' + m : m}</b><small>🔢 ${U.apt}</small></span><span>s = <b>${s > 0 ? '+½' : '−½'}</b><small>🛏️ ${U.bed} ${s > 0 ? U.up : U.down}</small></span></div>`;
    };
    q('#faqZ').onchange = show;
    q('#faqZ').closest('.al-ctl').querySelectorAll('button').forEach(b => b.onclick = () => { const s = q('#faqZ'); s.value = flClamp(+s.value + +b.dataset.d, 1, 118); show(); });
    show();
  },
};

/* 15. diagrama de Pauling */
FV.pauling = {
  html: U => `<div class="fl-two"><svg viewBox="0 0 330 300" class="fl-svg" id="fplSvg"></svg><div class="fl-info" id="fplInfo"></div></div>
    <div class="al-ctl"><label>${U.z}</label><input type="range" min="0" max="118" value="0" id="fplZ"><b id="fplZv"></b></div>
    <div class="al-center"><button class="btn-y" id="fplStep">${U.fill}</button><button class="btn-w" id="fplAll">${U.all}</button><button class="btn-w" id="fplReset">${U.reset}</button></div>
    <div class="fpl-order" id="fplOrder"></div>`,
  init(U, q) {
    const X = l => 40 + l * 72, Y = n => 22 + (n - 1) * 38;
    const MAXL = [0, 0, 1, 2, 3, 3, 2, 1];
    let z = 0, anim = null;
    const draw = () => {
      const f = flFill(z), filled = {}; f.forEach(([n, l, c]) => filled[n + '' + l] = c);
      let s = '';
      const diag = {}; MADELUNG.forEach(([n, l]) => { const k = n + l; (diag[k] = diag[k] || []).push([n, l]); });
      for (let n = 1; n <= 7; n++) for (let l = 0; l <= MAXL[n]; l++) {
        const cap = 2 * (2 * l + 1), c = filled[n + '' + l] || 0;
        s += `<g><rect x="${X(l) - 24}" y="${Y(n) - 13}" width="48" height="26" rx="8" class="fpl-c"/><rect x="${X(l) - 24}" y="${Y(n) - 13}" width="${48 * c / cap}" height="26" rx="8" class="fpl-f l${l}"/><text x="${X(l)}" y="${Y(n) + 5}" class="fl-ct sm">${n}${FL_L[l]}${c ? flSup(c) : ''}</text></g>`;
      }
      s += '<defs><marker id="fplH" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e53935"/></marker></defs>';
      Object.values(diag).forEach(list => { const a = list[0], b = list[list.length - 1]; s += `<line x1="${X(a[1]) + 30}" y1="${Y(a[0]) - 16}" x2="${X(b[1]) - 24}" y2="${Y(b[0]) + 14}" class="fpl-diag" marker-end="url(#fplH)"/>`; });
      q('#fplSvg').innerHTML = s;
      q('#fplZ').value = z; q('#fplZv').textContent = z;
      q('#fplInfo').innerHTML = z ? `<p>${U.nowEl}</p>${alTile(z)}` : `<p class="fl-cap">2 · 8 · 18 · 32</p>`;
      q('#fplOrder').innerHTML = `<b>${U.order}</b> ` + MADELUNG.map(([n, l], i) => `<span class="${i < f.length ? 'on l' + l : ''}">${n}${FL_L[l]}</span>`).join(' → ');
    };
    const steps = () => { let t = 0, out = [0]; MADELUNG.forEach(([, l]) => { t += 2 * (2 * l + 1); out.push(Math.min(118, t)); }); return out; };
    q('#fplZ').oninput = e => { anim = null; z = +e.target.value; draw(); };
    q('#fplStep').onclick = () => { anim = null; z = steps().find(v => v > z) || 118; draw(); };
    q('#fplReset').onclick = () => { anim = null; z = 0; draw(); };
    q('#fplAll').onclick = () => { anim = true; };
    let acc = 0;
    flLoop(dt => { if (!anim) return; acc += dt; if (acc > 0.05) { acc = 0; z = Math.min(118, z + 1); draw(); if (z >= 118) anim = null; } });
    draw();
  },
};

/* 16. onda no anel */
FV.ring = {
  html: U => `<div class="fl-two"><svg viewBox="-150 -150 300 300" class="fl-svg sq" id="frgSvg"></svg><div class="fl-info"><div class="fl-meter v"><span>${U.energy}</span><div><i id="frgE"></i></div></div></div></div>
    <div class="al-ctl"><label>${U.k}</label><input type="range" min="0.6" max="6" step="0.01" value="2.6" id="frgK"><b id="frgKv"></b><button class="btn-y fl-sm" id="frgSnap">${U.snap}</button></div>
    <div class="fl-msg" id="frgMsg"></div>`,
  init(U, q) {
    let k = 2.6, snap = null;
    const ok = () => Math.abs(k - Math.round(k)) < 0.03;
    const msg = () => { q('#frgKv').textContent = flNum(k, 2); const g = ok(); q('#frgMsg').innerHTML = g ? U.ok.replace('{n}', Math.round(k)) : U.bad; q('#frgMsg').className = 'fl-msg ' + (g ? 'ok' : 'bad'); q('#frgE').style.height = (g ? Math.round(k) ** 2 / 36 * 100 : 0) + '%'; };
    q('#frgK').oninput = e => { snap = null; k = +e.target.value; msg(); };
    q('#frgSnap').onclick = () => { snap = Math.max(1, Math.round(k)); };
    flLoop((dt, now) => {
      if (snap) { k += (snap - k) * Math.min(1, dt * 6); if (Math.abs(k - snap) < 0.004) { k = snap; snap = null; } q('#frgK').value = k; msg(); }
      const R = 100, A = 22, good = ok(), laps = good ? 1 : 4, osc = Math.cos(now / 260);
      let s = `<circle r="${R}" class="fl-dash"/><circle r="9" class="fl-pos"/>`;
      for (let lap = laps - 1; lap >= 0; lap--) {
        let d = '';
        for (let i = 0; i <= 240; i++) { const th = (lap + i / 240) * 6.2832, r = R + A * Math.cos(k * th) * (good ? osc : 1); d += `${i ? 'L' : 'M'}${(Math.cos(th) * r).toFixed(1)} ${(-Math.sin(th) * r).toFixed(1)}`; }
        s += `<path d="${d}" class="frg-w ${good ? 'ok' : 'bad'}" style="opacity:${good ? 1 : 1 - lap * 0.22}"/>`;
      }
      q('#frgSvg').innerHTML = s;
    });
    msg();
  },
};

/* 17. nuvem de probabilidade */
FV.cloud = {
  html: U => `<div class="al-chips" id="fclO"></div>
    <div class="fcl-wrap"><canvas id="fclC" width="520" height="520"></canvas><span class="fcl-n" id="fclN"></span></div>
    <div class="al-center"><button class="btn-w" id="fclAgain">${U.again}</button><button class="btn-y" id="fclFast">${U.fast}</button></div>`,
  init(U, q) {
    const O = {
      '1s': [4, (x, z, r) => Math.exp(-2 * r), '#e0533b', []],
      '2s': [11, (x, z, r) => (2 - r) ** 2 * Math.exp(-r), '#e0533b', [['c', 2]]],
      '2p': [14, (x, z, r) => z * z * Math.exp(-r), '#e09a00', [['h']]],
      '3p': [32, (x, z, r) => z * z * (6 - r) ** 2 * Math.exp(-2 * r / 3), '#e09a00', [['h'], ['c', 6]]],
      '3d': [30, (x, z, r) => (x * z) ** 2 * Math.exp(-2 * r / 3), '#2f6fd6', [['h'], ['v']]],
      '3d (z²)': [30, (x, z, r) => (3 * z * z - r * r) ** 2 * Math.exp(-2 * r / 3), '#2f6fd6', []],
    };
    let cur = '1s', n = 0, fast = false, fmax = 1;
    const cv = q('#fclC'), cx = cv.getContext('2d'), W = 520;
    q('#fclO').innerHTML = Object.keys(O).map(k => `<button data-k="${k}" class="${k === cur ? 'on' : ''}">${k}</button>`).join('');
    const reset = () => {
      n = 0; const [L, f] = O[cur]; fmax = 0;
      for (let i = 0; i <= 160; i++) for (let j = 0; j <= 160; j++) { const x = -L + 2 * L * i / 160, z = -L + 2 * L * j / 160; fmax = Math.max(fmax, f(x, z, Math.hypot(x, z))); }
      cx.clearRect(0, 0, W, W);
    };
    const nodes = () => {
      const L = O[cur][0];
      cx.globalAlpha = 1; cx.strokeStyle = 'rgba(0,0,0,.55)'; cx.setLineDash([6, 6]); cx.lineWidth = 2;
      O[cur][3].forEach(([t, r]) => {
        cx.beginPath();
        if (t === 'c') cx.arc(W / 2, W / 2, r / L * W / 2, 0, 6.283);
        if (t === 'h') { cx.moveTo(0, W / 2); cx.lineTo(W, W / 2); }
        if (t === 'v') { cx.moveTo(W / 2, 0); cx.lineTo(W / 2, W); }
        cx.stroke();
      });
      cx.setLineDash([]);
      if (O[cur][3].length) { cx.fillStyle = 'rgba(255,255,255,.9)'; cx.fillRect(6, W - 34, W * 0.75, 26); cx.fillStyle = 'rgba(0,0,0,.6)'; cx.font = '700 15px Montserrat'; cx.fillText('- - ' + U.node, 12, W - 16); }
    };
    q('#fclO').querySelectorAll('button').forEach(b => b.onclick = () => { cur = b.dataset.k; q('#fclO').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); reset(); });
    q('#fclAgain').onclick = () => { fast = false; reset(); };
    q('#fclFast').onclick = () => { fast = true; };
    flLoop(() => {
      if (n >= 9000) return;
      const [L, f, col] = O[cur]; let add = fast ? 260 : 30, tries = 0;
      cx.fillStyle = col; cx.globalAlpha = 0.55;
      while (add > 0 && tries < 20000) {
        tries++;
        const x = (Math.random() * 2 - 1) * L, z = (Math.random() * 2 - 1) * L;
        if (Math.random() < Math.pow(f(x, z, Math.hypot(x, z)) / fmax, 0.55)) { cx.fillRect(W / 2 + x / L * W / 2 - 1.2, W / 2 - z / L * W / 2 - 1.2, 2.4, 2.4); add--; n++; }
      }
      nodes(); cx.fillStyle = '#111'; cx.beginPath(); cx.arc(W / 2, W / 2, 4, 0, 6.283); cx.fill();
      q('#fclN').textContent = `${flNum(n)} ${U.measure}`;
    });
    reset();
  },
};

/* 18. partícula na caixa */
FV.box = {
  html: U => `<div class="al-ctl"><label>${U.n}</label><span class="al-chips" id="fbxN">${[1, 2, 3, 4].map(n => `<button data-n="${n}" class="${n === 1 ? 'on' : ''}">${n}</button>`).join('')}</span></div>
    <svg viewBox="0 0 440 230" class="fl-svg" id="fbxSvg"></svg>
    <div class="al-ctl"><label>${U.w}</label><input type="range" min="40" max="100" value="100" id="fbxW"></div>
    <div class="fl-msg ok" id="fbxMsg"></div>`,
  init(U, q) {
    let n = 1;
    q('#fbxN').querySelectorAll('button').forEach(b => b.onclick = () => { n = +b.dataset.n; q('#fbxN').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); msg(); });
    const msg = () => { const w = +q('#fbxW').value / 100, E = n * n / (w * w); q('#fbxMsg').innerHTML = `${U.e}: <b>${flNum(E, E < 10 ? 2 : 1)}</b> <small>${U.rel}</small> · ${n - 1} ${U.nodes}`; };
    q('#fbxW').oninput = msg;
    flLoop((dt, now) => {
      const w = +q('#fbxW').value / 100, W = 360 * w, x0 = 220 - W / 2, E = n * n / (w * w), osc = Math.cos(now / 1000 * (1.2 + E * 0.5));
      let wave = '', prob = `M${x0} 205`;
      for (let i = 0; i <= 120; i++) { const x = x0 + W * i / 120, p = Math.sin(n * Math.PI * i / 120); wave += `${i ? 'L' : 'M'}${x.toFixed(1)} ${(75 - p * 45 * osc).toFixed(1)}`; prob += `L${x.toFixed(1)} ${(205 - p * p * 55).toFixed(1)}`; }
      prob += `L${x0 + W} 205Z`;
      let nodes = ''; for (let j = 1; j < n; j++) nodes += `<circle cx="${x0 + W * j / n}" cy="75" r="5" class="fbx-node"/>`;
      q('#fbxSvg').innerHTML = `<rect x="${x0 - 10}" y="12" width="10" height="200" class="fbx-wall"/><rect x="${x0 + W}" y="12" width="10" height="200" class="fbx-wall"/>
        <line x1="${x0}" y1="75" x2="${x0 + W}" y2="75" class="fl-dash"/><path d="${wave}" class="fl-c tot"/>${nodes}
        <line x1="${x0}" y1="205" x2="${x0 + W}" y2="205" class="fl-axis"/><path d="${prob}" class="fbx-prob"/>
        <text x="${x0 + 6}" y="26" class="fl-small l">${U.wave}</text><text x="${x0 + 6}" y="140" class="fl-small l">${U.prob}</text>`;
    });
    msg();
  },
};

/* ====================== páginas ====================== */
function flDoneCount() { const f = flGet(); return FL_LESSONS.filter(l => f.done[l.id]).length; }

function fundLearnHtml(id) {
  const T = flT(), f = flGet(), N = FL_LESSONS.length, done = flDoneCount();
  const bar = `<div class="fl-prog"><span>${T.progress}</span><div><i style="width:${done / N * 100}%"></i></div><b>${done}/${N}</b></div>`;
  const idx = FL_LESSONS.findIndex(l => l.id === id);
  if (idx < 0) {
    const next = FL_LESSONS.find(l => !f.done[l.id]) || FL_LESSONS[0];
    const tracks = Object.keys(T.tracks).filter(tr => FL_LESSONS.some(l => l.track === tr)).map(tr => {
      const list = FL_LESSONS.map((l, i) => [l, i]).filter(([l]) => l.track === tr);
      return `<section class="fl-track"><h2>${T.tracks[tr]}</h2><p class="al-muted">${T.trackLead[tr]}</p><div class="fl-cards">${list.map(([l, i]) => {
        const L = flL(l);
        return `<a class="fl-card ${f.done[l.id] ? 'done' : ''}" href="#/learn/fund/${l.id}"><span class="fl-ic">${l.icon}</span><span class="fl-cn">${i + 1}</span><b>${L.t}</b><small>${L.lead}</small>${f.done[l.id] ? `<em>${T.doneTag}</em>` : ''}</a>`;
      }).join('')}</div></section>`;
    }).join('');
    return `<h1 class="page-title">${T.title}</h1><p class="lead">${T.lead}</p>
      <div class="fl-masters"><b>${T.mastersT}</b><div>${T.masters.map(([i, n, d], k) => `<div><span>${i}</span><b>${k + 1}. ${n}</b><p>${d}</p></div>`).join('')}</div></div>
      ${T.qm ? `<a class="fl-qm" href="#/learn/fund/qatom"><span>⚛️</span><div><b>${T.qm.t}</b><p>${T.qm.d}</p></div><em>${T.qm.a}</em></a>` : ''}
      ${bar}<div class="al-center"><a class="btn-y" href="#/learn/fund/${next.id}">${done ? T.cont : T.start}</a></div>${tracks}`;
  }
  const l = FL_LESSONS[idx], L = flL(l), U = L.ui, prev = FL_LESSONS[idx - 1], nxt = FL_LESSONS[idx + 1];
  const inTrack = FL_LESSONS.filter(x => x.track === l.track);
  const dots = `<div class="fl-dots">${inTrack.map(x => `<a href="#/learn/fund/${x.id}" class="${x.id === l.id ? 'on' : ''} ${f.done[x.id] ? 'done' : ''}" title="${flL(x).t}">${x.icon}</a>`).join('')}</div>`;
  const nav = `<div class="fl-nav">${prev ? `<a class="btn-w" href="#/learn/fund/${prev.id}">${T.prev}</a>` : '<span></span>'}${nxt ? `<a class="btn-y" href="#/learn/fund/${nxt.id}">${T.next}</a>` : `<a class="btn-y" href="#/learn/fund">${T.back}</a>`}</div>${nxt ? '' : `<p class="al-center al-muted">${T.finish}</p>`}`;
  if (l.ext) return `<div class="fl-top"><a href="#/learn/fund" class="fl-back">${T.back}</a><span class="al-muted">${T.tracks[l.track]} · ${T.lesson} ${idx + 1} ${T.of} ${N}</span></div>${dots}
    <article class="fl-lesson fl-ext"><h1 class="fl-h1"><span>${l.icon}</span>${L.t}</h1><p class="lead">${L.lead} <span class="fl-mref">${T.mastersRef[l.m]}</span></p>
      <div class="fl-extbody">${l.ext === 'atom' ? atomLearnHtml() : reactLearnHtml()}</div>
      ${typeof flDeep === 'function' ? flDeep(l) : ''}
      ${L.so ? `<div class="fl-so"><b class="fl-sol">${T.so}</b> ${L.so}</div>` : ''}${nav}</article>`;
  const order = L.ch[1].map((o, i) => i).sort(() => Math.random() - 0.5);
  return `<div class="fl-top"><a href="#/learn/fund" class="fl-back">${T.back}</a><span class="al-muted">${T.tracks[l.track]} · ${T.lesson} ${idx + 1} ${T.of} ${N}</span></div>${dots}
    <article class="fl-lesson">
      <h1 class="fl-h1"><span>${l.icon}</span>${L.t}</h1><p class="lead">${L.lead} <span class="fl-mref">${T.mastersRef[l.m]}</span></p>
      ${L.p.map(p => p.startsWith('<div') || p.startsWith('<ul') ? p : `<p>${p}</p>`).join('')}
      <div class="al-play fl-play"><span class="fl-playtag">${T.play}</span>${L.how ? `<p class="fl-how"><b>${T.how}</b> ${L.how}</p>` : ''}${FV[l.id].html(U)}</div>
      ${L.after.map(p => p.startsWith('<div') || p.startsWith('<ul') ? p : `<p>${p}</p>`).join('')}
      ${typeof flDeep === 'function' ? flDeep(l) : ''}
      <div class="fl-so"><b class="fl-sol">${T.so}</b> ${L.so}</div>
      <div class="al-quiz fl-ch" id="flCh"><b>${T.ch}</b><p>${L.ch[0]}</p><div class="al-qopts">${order.map(i => `<button data-i="${i}">${L.ch[1][i]}</button>`).join('')}</div><div class="al-qfb"></div></div>
      <div class="fl-nav">${prev ? `<a class="btn-w" href="#/learn/fund/${prev.id}">${T.prev}</a>` : '<span></span>'}${nxt ? `<a class="btn-y" href="#/learn/fund/${nxt.id}">${T.next}</a>` : `<a class="btn-y" href="#/learn/fund">${T.back}</a>`}</div>
      ${nxt ? '' : `<p class="al-center al-muted">${T.finish}</p>`}
    </article>`;
}

function fundLearnInit(id) {
  fundLearnStop();
  const l = FL_LESSONS.find(x => x.id === id);
  if (!l) return;
  const T = flT(), L = flL(l), root = document.querySelector('.fl-lesson');
  const markDone = () => { const f = flGet(); f.done[l.id] = true; flSave(f); const dot = document.querySelector('.fl-dots a.on'); if (dot) dot.classList.add('done'); };
  if (l.ext) {
    const sec = document.getElementById((l.ext === 'atom' ? 'al-' : 'rl-') + l.sec);
    if (sec) sec.classList.add('fl-show');
    if (l.sec === 'history') { const c = root.querySelector('.al-cta'); if (c) c.classList.add('fl-show'); }
    try { if (l.ext === 'atom') atomLearnInit(); else reactLearnInit(); } catch (e) { console.error(e); }
    const qz = sec && sec.querySelector('.al-quiz');
    if (!qz) { markDone(); return; }
    const S = l.ext === 'atom' ? alT() : rlT(), qq = S[qz.dataset.q];
    qz.querySelectorAll('.al-qopts button').forEach(b => b.onclick = () => {
      if (+b.dataset.i !== qq[2]) { b.classList.add('wrong'); b.disabled = true; qz.querySelector('.al-qfb').innerHTML = T.wrong; return; }
      qz.querySelectorAll('.al-qopts button').forEach(x => { x.disabled = true; if (+x.dataset.i === qq[2]) x.classList.add('right'); });
      qz.querySelector('.al-qfb').innerHTML = T.right + qq[3]; markDone();
    });
    return;
  }
  const q = s => root.querySelector(s);
  const box = q('#flCh');
  box.querySelectorAll('.al-qopts button').forEach(b => b.onclick = () => {
    const ok = +b.dataset.i === L.ch[2];
    if (!ok) { b.classList.add('wrong'); b.disabled = true; box.querySelector('.al-qfb').innerHTML = T.wrong; return; }
    box.querySelectorAll('.al-qopts button').forEach(x => { x.disabled = true; if (+x.dataset.i === L.ch[2]) x.classList.add('right'); });
    box.querySelector('.al-qfb').innerHTML = T.right + L.ch[3];
    const f = flGet(); f.done[l.id] = true; flSave(f);
    const dot = document.querySelector(`.fl-dots a.on`); if (dot) dot.classList.add('done');
  });
  try { FV[l.id].init(L.ui, q); } catch (e) { console.error(e); }
}
