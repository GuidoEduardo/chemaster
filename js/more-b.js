// Grimório: lições novas, parte B: gases, misturas e coligativas; energia e equilíbrio;
// eletroquímica; química ambiental. Usa os ajudantes de more-a.js (mSub, mChips, mBindChips, mPick, mCh, mFix).

/* ======================= GASES, MISTURAS, COLIGATIVAS ======================= */
FV['g-gas'] = {
  html: U => `<canvas id="mgC" width="440" height="220" class="mg-canvas"></canvas>
    <div class="al-ctl"><label>🌡️ ${U.t}</label><input type="range" min="100" max="600" step="10" value="300" id="mgT"><b id="mgTv"></b></div>
    <div class="al-ctl"><label>📦 ${U.v}</label><input type="range" min="35" max="100" value="100" id="mgV"><b id="mgVv"></b></div>
    <div class="al-ctl"><label>🔵 ${U.n}</label><input type="range" min="5" max="60" value="20" id="mgN"><b id="mgNv"></b></div>
    <div class="fl-meter"><span>${U.p}</span><div><i id="mgP"></i></div><b id="mgPv"></b></div><div class="fl-msg" id="mgMsg"></div>`,
  init(U, q) {
    const cv = q('#mgC'), cx = cv.getContext('2d'), H = 220, R = 5;
    let ps = [], hits = [], base = null;
    const sync = () => { const n = +q('#mgN').value; while (ps.length < n) { const a = Math.random() * 6.283; ps.push({ x: 20 + Math.random() * 100, y: 20 + Math.random() * 180, a, s: 0.7 + Math.random() * 0.6 }); } ps.length = n; };
    const info = () => {
      const T = +q('#mgT').value, V = +q('#mgV').value, n = +q('#mgN').value, P = n * T / V;
      if (base === null) base = P;
      q('#mgTv').textContent = T + ' K'; q('#mgVv').textContent = V + '%'; q('#mgNv').textContent = n;
      q('#mgP').style.width = Math.min(100, P / 360 * 100) + '%'; q('#mgPv').textContent = flNum(P / base, 2) + '×';
    };
    const msg = k => { q('#mgMsg').className = 'fl-msg ok'; q('#mgMsg').innerHTML = U.m[k]; };
    q('#mgT').oninput = () => { info(); msg('t'); }; q('#mgV').oninput = () => { info(); msg('v'); }; q('#mgN').oninput = () => { sync(); info(); msg('n'); };
    sync(); info();
    flLoop((dt, now) => {
      const T = +q('#mgT').value, W = 440 * +q('#mgV').value / 100, sp = 9 * Math.sqrt(T);
      for (const p of ps) {
        p.x += Math.cos(p.a) * p.s * sp * dt; p.y += Math.sin(p.a) * p.s * sp * dt;
        if (p.x < R) { p.x = R; p.a = Math.PI - p.a; }
        if (p.x > W - R) { p.x = W - R; p.a = Math.PI - p.a; hits.push([now, p.y]); }
        if (p.y < R || p.y > H - R) { p.y = flClamp(p.y, R, H - R); p.a = -p.a; }
      }
      hits = hits.filter(h => now - h[0] < 250);
      cx.clearRect(0, 0, 440, H);
      cx.fillStyle = '#eef4ff'; cx.fillRect(0, 0, W, H);
      cx.fillStyle = '#9aa3ad'; cx.fillRect(W, 0, 440 - W, H);
      cx.fillStyle = '#111'; cx.fillRect(W - 4, 0, 8, H);
      for (const h of hits) { cx.fillStyle = `rgba(255,180,0,${1 - (now - h[0]) / 250})`; cx.beginPath(); cx.arc(W - 4, h[1], 7, 0, 6.283); cx.fill(); }
      for (const p of ps) { cx.beginPath(); cx.arc(p.x, p.y, R, 0, 6.283); cx.fillStyle = '#4f8dff'; cx.fill(); cx.strokeStyle = '#111'; cx.lineWidth = 1.5; cx.stroke(); }
    });
  },
};

const MG_MIX = [['sand', ['filt'], 'het'], ['oil', ['dec'], 'het'], ['saltK', ['evap'], 'hom'], ['saltW', ['dist'], 'hom'], ['alc', ['frac'], 'hom'], ['iron', ['mag'], 'het'], ['oilP', ['frac'], 'hom']];
FV['g-mix'] = {
  html: U => `<p class="fl-cap">${U.s1}</p>${mChips('mgxM', MG_MIX.map(([k]) => [k, U.mix[k][0]]), 'sand')}
    <p class="fl-cap">${U.s2}</p><div class="al-chips" id="mgxT">${Object.entries(U.met).map(([k, v]) => `<button data-k="${k}">${v[0]}</button>`).join('')}</div>
    <div class="mi-card" id="mgxOut"></div>`,
  init(U, q) {
    let m = 'sand';
    const head = () => { const [, , kind] = MG_MIX.find(x => x[0] === m); q('#mgxOut').innerHTML = `<b>${U.mix[m][0]}</b> · <span class="al-st">${U.kind[kind]}</span><p>${U.pick}</p>`; q('#mgxT').querySelectorAll('button').forEach(b => b.className = ''); };
    mBindChips(q, 'mgxM', k => { m = k; head(); });
    q('#mgxT').querySelectorAll('button').forEach(b => b.onclick = () => {
      const [, ok, kind] = MG_MIX.find(x => x[0] === m), k = b.dataset.k, good = ok.includes(k);
      q('#mgxT').querySelectorAll('button').forEach(x => x.className = x === b ? (good ? 'right' : 'wrong') : '');
      q('#mgxOut').innerHTML = `<b>${U.mix[m][0]}</b> · <span class="al-st">${U.kind[kind]}</span><div class="fl-msg ${good ? 'ok' : 'bad'}">${good ? '✅ ' + U.mix[m][1] : '❌ ' + U.met[k][1]}</div><p class="al-muted">${U.met[k][2]}</p>`;
    });
    head();
  },
};

const MG_SOLUTES = [['sug', 1], ['salt', 2], ['cacl2', 3]];
FV['g-coll'] = {
  html: U => `${mChips('mgcS', MG_SOLUTES.map(([k]) => [k, U.s[k]]), 'salt')}
    <div class="al-ctl"><label>${U.m}</label><input type="range" min="0" max="3" step="0.1" value="1" id="mgcM"><b id="mgcMv"></b></div>
    <div class="fl-two"><svg viewBox="0 0 220 180" class="fl-svg sq" id="mgcSvg"></svg><div class="fl-info" id="mgcInfo"></div></div>`,
  init(U, q) {
    let s = 'salt';
    const W = Array.from({ length: 90 }, () => [Math.random(), Math.random()]);
    const draw = () => {
      const i = MG_SOLUTES.find(x => x[0] === s)[1], m = +q('#mgcM').value, part = i * m, eb = 0.52 * part, fr = 1.86 * part;
      q('#mgcMv').textContent = flNum(m, 1) + ' mol/kg';
      const nS = Math.round(part * 9);
      let g = `<rect x="10" y="40" width="200" height="130" rx="8" class="ms-water" style="opacity:.35"/>`;
      W.forEach(([x, y], k) => { const isS = k < nS; g += `<circle cx="${18 + x * 184}" cy="${48 + y * 115}" r="${isS ? 5 : 3.5}" class="${isS ? 'mg-sol' : 'mg-w'}"/>`; });
      const esc = Math.max(1, Math.round(6 * (1 - part / 12)));
      for (let k = 0; k < esc; k++) g += `<circle cx="${30 + k * 30}" cy="${22 - (k % 2) * 8}" r="3.5" class="mg-w"/><line x1="${30 + k * 30}" y1="30" x2="${30 + k * 30}" y2="38" class="fl-dash"/>`;
      q('#mgcSvg').innerHTML = g;
      q('#mgcInfo').innerHTML = `<p>${U.part}: <b>${flNum(part, 1)}</b> mol/kg (${U.i}: ${i})</p><p>♨️ ${U.boil}: <b>${flNum(100 + eb, 2)} °C</b></p><p>🧊 ${U.freeze}: <b>${fr ? "−" : ""}${flNum(fr, 2)} °C</b></p>`;
    };
    mBindChips(q, 'mgcS', k => { s = k; draw(); }); q('#mgcM').oninput = draw; draw();
  },
};

/* ======================= ENERGIA E EQUILÍBRIO ======================= */
FV['t-hess'] = {
  html: U => `<div class="al-chips" id="mthP"><button data-k="1" class="on">${U.direct}</button><button data-k="2">${U.two}</button></div>
    <svg viewBox="0 0 440 260" class="fl-svg" id="mthSvg"></svg><div class="fl-msg ok" id="mthMsg"></div>`,
  init(U, q) {
    let path = 1, t0 = performance.now();
    const Y = e => 40 + (-e) / 394 * 190;
    q('#mthP').querySelectorAll('button').forEach(b => b.onclick = () => { path = +b.dataset.k; t0 = performance.now(); q('#mthP').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); msg(); });
    const msg = () => { q('#mthMsg').innerHTML = path === 1 ? U.m1 : U.m2; };
    flLoop((dt, now) => {
      const p = Math.min(1, (now - t0) / 1400);
      let s = `<line x1="40" y1="${Y(0)}" x2="160" y2="${Y(0)}" class="mt-lv"/><text x="100" y="${Y(0) - 8}" class="fl-small">C + O₂ (0)</text>
        <line x1="290" y1="${Y(-394)}" x2="410" y2="${Y(-394)}" class="mt-lv"/><text x="350" y="${Y(-394) + 18}" class="fl-small">CO₂ (−394 kJ)</text>
        <line x1="165" y1="${Y(-111)}" x2="285" y2="${Y(-111)}" class="mt-lv ${path === 2 ? '' : 'dim'}"/><text x="225" y="${Y(-111) - 8}" class="fl-small">CO + ½ O₂ (−111 kJ)</text>`;
      const arrow = (x1, y1, x2, y2, f, lbl, cls) => { const x = x1 + (x2 - x1) * f, y = y1 + (y2 - y1) * f; return `<line x1="${x1}" y1="${y1}" x2="${x}" y2="${y}" class="mt-ar ${cls}"/>${f > 0.95 ? `<text x="${(x1 + x2) / 2 + 8}" y="${(y1 + y2) / 2}" class="mt-t l">${lbl}</text>` : ''}`; };
      if (path === 1) s += arrow(160, Y(0), 290, Y(-394), p, '−394 kJ', 'a');
      else { s += arrow(160, Y(0), 165, Y(-111), Math.min(1, p * 2), '−111 kJ', 'b'); if (p > 0.5) s += arrow(285, Y(-111), 290, Y(-394), (p - 0.5) * 2, '−283 kJ', 'c'); }
      q('#mthSvg').innerHTML = s;
    });
    msg();
  },
};

const MT_FUEL = [['h2', 'H₂', 2, -286, 0, 'H₂ + ½ O₂ → H₂O'], ['ch4', 'CH₄', 16, -890, 1, 'CH₄ + 2 O₂ → CO₂ + 2 H₂O'], ['oct', 'C₈H₁₈', 114, -5470, 8, 'C₈H₁₈ + 12½ O₂ → 8 CO₂ + 9 H₂O'], ['eth', 'C₂H₅OH', 46, -1367, 2, 'C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O'], ['c', 'C', 12, -394, 1, 'C + O₂ → CO₂']];
const MT_HF = { h2: '−286 − 0', ch4: '(−394) + 2(−286) − (−75)', oct: '8(−394) + 9(−286) − (−250)', eth: '2(−394) + 3(−286) − (−278)', c: '−394 − 0' };
FV['t-fuel'] = {
  html: U => `${mChips('mtfF', MT_FUEL.map(([k]) => [k, U.f[k]]), 'ch4')}<div class="mi-card" id="mtfOut"></div><div class="mt-bars" id="mtfBars"></div>`,
  init(U, q) {
    const show = k => {
      const [, f, M, H, nC, eq] = MT_FUEL.find(x => x[0] === k);
      q('#mtfOut').innerHTML = `<div class="mi-eq">${eq}</div><p>ΔH = Σ ΔH<sub>f</sub>(${U.prod}) − Σ ΔH<sub>f</sub>(${U.reag}) = ${MT_HF[k]} ≈ <b>−${flNum(-H)} kJ/mol</b></p><p>${U.perg}: <b>${flNum(-H / M, 1)} kJ/g</b> · CO₂: <b>${flNum(nC * 44 / -H * 1000, 0)} g ${U.per}</b></p>`;
      const mxE = 143, mxC = 112;
      q('#mtfBars').innerHTML = `<div class="mt-h"><span></span><b>⚡ ${U.eg}</b><b>🏭 ${U.co2}</b></div>` + MT_FUEL.map(([kk, ff, MM, HH, nn]) => { const e = -HH / MM, c = nn * 44 / -HH * 1000; return `<div class="${kk === k ? 'on' : ''}"><span>${U.f[kk]}</span><div class="fl-meter"><div><i style="width:${e / mxE * 100}%"></i></div></div><div class="fl-meter bad"><div><i style="width:${c / mxC * 100}%"></i></div></div></div>`; }).join('');
    };
    mBindChips(q, 'mtfF', show); show('ch4');
  },
};

FV['e-eq'] = {
  html: U => `<div class="fl-two"><svg viewBox="0 0 220 200" class="fl-svg sq" id="meqBox"></svg><svg viewBox="0 0 240 200" class="fl-svg" id="meqPlot"></svg></div>
    <div class="al-center me-btns"><button class="btn-w fl-sm" data-a="add">${U.add}</button><button class="btn-w fl-sm" data-a="hot">${U.hot}</button><button class="btn-w fl-sm" data-a="cold">${U.cold}</button><button class="btn-w fl-sm" data-a="press">${U.press}</button><button class="btn-w fl-sm" data-a="exp">${U.exp}</button><button class="btn-w fl-sm" data-a="reset">↺</button></div>
    <div class="fl-msg" id="meqMsg"></div>`,
  init(U, q) {
    let A, B, T, V, hist, tt;
    const kf0 = [0.08, 0.5, 2.5], kr = 0.5;
    const reset = () => { A = 30; B = 0; T = 1; V = 1; hist = []; tt = 0; q('#meqMsg').className = 'fl-msg'; q('#meqMsg').innerHTML = U.start; };
    const P = Array.from({ length: 80 }, () => [Math.random(), Math.random(), Math.random() * 6.28]);
    q('.me-btns').querySelectorAll('button').forEach(b => b.onclick = () => {
      const a = b.dataset.a;
      if (a === 'reset') return reset();
      if (a === 'add') A += 15; if (a === 'hot') T = Math.min(2, T + 1); if (a === 'cold') T = Math.max(0, T - 1); if (a === 'press') V = 0.5; if (a === 'exp') V = 1;
      q('#meqMsg').className = 'fl-msg ok'; q('#meqMsg').innerHTML = U.m[a];
    });
    reset();
    flLoop((dt, now) => {
      for (let i = 0; i < 4; i++) { const r1 = kf0[T] * A, r2 = kr * B * B / (V * 30), d = (r1 - r2) * dt / 4; A = Math.max(0, A - d); B = Math.max(0, B + 2 * d); }
      tt += dt; if (!hist.length || tt - hist[hist.length - 1][0] > 0.1) { hist.push([tt, A, B]); if (hist.length > 200) hist.shift(); }
      const w = 200 * V, x0 = 10 + (200 - w) / 2, conc = B / (V * 60);
      let s = `<rect x="${x0}" y="10" width="${w}" height="180" rx="8" fill="rgb(${Math.round(255 - 60 * Math.min(1, conc))},${Math.round(250 - 130 * Math.min(1, conc))},${Math.round(240 - 200 * Math.min(1, conc))})" stroke="#111" stroke-width="2.5"/>`;
      const nA = Math.min(40, Math.round(A)), nB = Math.min(80, Math.round(B));
      for (let i = 0; i < nA; i++) { const [x, y, a] = P[i], X = x0 + 12 + x * (w - 24) + Math.sin(now / 400 + a) * 3, Y = 22 + y * 156; s += `<circle cx="${X - 4}" cy="${Y}" r="5" class="me-a"/><circle cx="${X + 4}" cy="${Y}" r="5" class="me-a"/>`; }
      for (let i = 0; i < nB; i++) { const [x, y, a] = P[(i + 40) % 80], X = x0 + 10 + ((x + i * 0.37) % 1) * (w - 20) + Math.cos(now / 300 + a) * 4, Y = 20 + ((y + i * 0.21) % 1) * 160; s += `<circle cx="${X}" cy="${Y}" r="5" class="me-b"/>`; }
      q('#meqBox').innerHTML = s;
      const t1 = hist[0][0], t2 = Math.max(t1 + 10, tt), X = t => 30 + (t - t1) / (t2 - t1) * 200, Yv = v => 180 - Math.min(160, v * 2.2);
      const line = k => hist.map((h, i) => `${i ? 'L' : 'M'}${X(h[0]).toFixed(1)} ${Yv(h[k]).toFixed(1)}`).join('');
      q('#meqPlot').innerHTML = `<line x1="30" y1="180" x2="232" y2="180" class="fl-axis"/><line x1="30" y1="15" x2="30" y2="180" class="fl-axis"/><path d="${line(1)}" class="me-la"/><path d="${line(2)}" class="me-lb"/>
        <text x="40" y="14" class="fl-small l">— N₂O₄ ${U.cl}</text><text x="140" y="14" class="fl-small l me-tb">— NO₂ ${U.br}</text><text x="130" y="196" class="fl-small">${U.time}</text>`;
    });
  },
};

FV['e-buffer'] = {
  html: U => `<div class="al-ctl"><label>${U.drops}</label><input type="range" min="-40" max="40" value="0" id="mebD"><b id="mebDv"></b></div>
    <div class="me-two" id="mebOut"></div><div class="fl-msg" id="mebMsg"></div>`,
  init(U, q) {
    const col = ph => `hsl(${flClamp((ph - 1) / 13 * 260, 0, 260)},80%,60%)`;
    const draw = () => {
      const d = +q('#mebD').value, x = d * 0.001;
      const pw = d === 0 ? 7 : d > 0 ? -Math.log10(x) : 14 + Math.log10(-x);
      const pb = 4.76 + Math.log10((0.1 - x) / (0.1 + x));
      q('#mebDv').textContent = d === 0 ? '0' : d > 0 ? `${d} ${U.acid}` : `${-d} ${U.base}`;
      const beak = (t, ph) => `<div class="me-beak"><b>${t}</b><div class="me-liq" style="background:${col(ph)}"><span>pH ${flNum(ph, 2)}</span></div></div>`;
      q('#mebOut').innerHTML = beak(U.water, pw) + beak(U.buf, pb);
      q('#mebMsg').className = 'fl-msg ' + (d ? 'ok' : ''); q('#mebMsg').innerHTML = d ? U.msg.replace('{a}', flNum(Math.abs(pw - 7), 1)).replace('{b}', flNum(Math.abs(pb - 4.76), 2)) : U.start;
    };
    q('#mebD').oninput = draw; draw();
  },
};

/* ======================= ELETROQUÍMICA ======================= */
const ME_NOX = [['H₂O', [['H', 2, 1], ['O', 1, -2]], 0], ['CO₂', [['C', 1, 4], ['O', 2, -2]], 0], ['CH₄', [['C', 1, -4], ['H', 4, 1]], 0], ['NH₃', [['N', 1, -3], ['H', 3, 1]], 0],
  ['H₂SO₄', [['H', 2, 1], ['S', 1, 6], ['O', 4, -2]], 0], ['NaCl', [['Na', 1, 1], ['Cl', 1, -1]], 0], ['KMnO₄', [['K', 1, 1], ['Mn', 1, 7], ['O', 4, -2]], 0], ['O₂', [['O', 2, 0]], 0],
  ['H₂O₂', [['H', 2, 1], ['O', 2, -1]], 0], ['Fe₂O₃', [['Fe', 2, 3], ['O', 3, -2]], 0], ['NO₃⁻', [['N', 1, 5], ['O', 3, -2]], -1]];
FV['ec-nox'] = {
  html: U => `<div class="al-chips" id="menC">${ME_NOX.map((m, i) => `<button data-i="${i}" class="${i ? '' : 'on'}">${m[0]}</button>`).join('')}</div><div class="me-nox" id="menOut"></div><div class="fl-msg ok" id="menMsg"></div>`,
  init(U, q) {
    const sg = n => n > 0 ? '+' + n : n < 0 ? '−' + -n : '0';
    const show = i => {
      const [f, at, chg] = ME_NOX[i];
      q('#menOut').innerHTML = at.map(([s, c, n]) => `<div class="me-at ${n > 0 ? 'p' : n < 0 ? 'n' : ''}"><em>${sg(n)}</em><b>${s}</b>${c > 1 ? `<small>× ${c}</small>` : ''}</div>`).join('');
      const sum = at.map(([s, c, n]) => `${c > 1 ? c + '×' : ''}(${sg(n)})`).join(' + ');
      q('#menMsg').innerHTML = `${U.sum}: ${sum} = <b>${sg(chg)}</b> ${chg ? U.ion : U.neutral}<br><small>${U.why[i] || ''}</small>`;
    };
    q('#menC').querySelectorAll('button').forEach(b => b.onclick = () => { q('#menC').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); show(+b.dataset.i); });
    show(0);
  },
};

const ME_E = [['Mg', -2.37], ['Al', -1.66], ['Zn', -0.76], ['Fe', -0.44], ['Pb', -0.13], ['Cu', 0.34], ['Ag', 0.80], ['Au', 1.50]];
FV['ec-cell'] = {
  html: U => `<div class="fl-2ctl"><div class="al-ctl"><label>${U.l}</label><span class="al-chips" id="mecA">${ME_E.map(([s], i) => `<button data-i="${i}" class="${i === 2 ? 'on' : ''}">${s}</button>`).join('')}</span></div>
    <div class="al-ctl"><label>${U.r}</label><span class="al-chips" id="mecB">${ME_E.map(([s], i) => `<button data-i="${i}" class="${i === 5 ? 'on' : ''}">${s}</button>`).join('')}</span></div></div>
    <svg viewBox="0 0 440 230" class="fl-svg" id="mecSvg"></svg><div class="fl-msg ok" id="mecMsg"></div>`,
  init(U, q) {
    let a = 2, b = 5;
    const pick = (id, set) => q('#' + id).querySelectorAll('button').forEach(x => x.onclick = () => { set(+x.dataset.i); q('#' + id).querySelectorAll('button').forEach(y => y.classList.toggle('on', y === x)); msg(); });
    pick('mecA', i => a = i); pick('mecB', i => b = i);
    const msg = () => {
      const [sa, ea] = ME_E[a], [sb, eb] = ME_E[b];
      if (a === b) { q('#mecMsg').innerHTML = U.same; return; }
      const an = ea < eb ? sa : sb, ca = ea < eb ? sb : sa, v = Math.abs(eb - ea);
      q('#mecMsg').innerHTML = U.msg.replace('{v}', flNum(v, 2)).replace(/\{an\}/g, an).replace(/\{ca\}/g, ca);
    };
    flLoop((dt, now) => {
      const [sa, ea] = ME_E[a], [sb, eb] = ME_E[b], v = a === b ? 0 : Math.abs(eb - ea), dir = ea < eb ? 1 : -1;
      let s = `<path d="M30 110 V210 H170 V110" class="ms-glass"/><path d="M270 110 V210 H410 V110" class="ms-glass"/><rect x="32" y="130" width="136" height="78" class="ms-water" style="opacity:.4"/><rect x="272" y="130" width="136" height="78" class="ms-water" style="opacity:.4"/>
        <path d="M150 140 V95 Q220 70 290 95 V140" class="ec-bridge"/><text x="220" y="92" class="fl-small">${U.bridge}</text>
        <rect x="88" y="70" width="24" height="120" class="ec-el ${ea < eb ? 'an' : 'ca'}"/><rect x="328" y="70" width="24" height="120" class="ec-el ${ea < eb ? 'ca' : 'an'}"/>
        <text x="100" y="225" class="fz-lbl">${sa}</text><text x="340" y="225" class="fz-lbl">${sb}</text>
        <path d="M100 70 V30 H340 V70" class="ec-wire"/><rect x="185" y="12" width="70" height="36" rx="8" class="ec-vm"/><text x="220" y="36" class="ec-vt">${flNum(v, 2)} V</text>`;
      if (v > 0) for (let i = 0; i < 6; i++) { let f = ((now / 1000 * (0.3 + v * 0.25)) + i / 6) % 1; if (dir < 0) f = 1 - f; const L = 40 + 240 + 40, d = f * L; const [x, y] = d < 40 ? [100, 70 - d] : d < 280 ? [100 + (d - 40), 30] : [340, 30 + (d - 280)]; s += `<circle cx="${x}" cy="${y}" r="5" class="fl-neg"/>`; }
      q('#mecSvg').innerHTML = s;
    });
    msg();
  },
};

const ME_EL = [['water', 1.8, ['H₂', 2], ['O₂', 1]], ['nacl', 4, ['Na', 1], ['Cl₂', 1]], ['al', 4.2, ['Al', 1], ['O₂ → CO₂', 1]], ['cu', 0.4, ['Cu', 1], ['Cu²⁺', 1]]];
FV['ec-elec'] = {
  html: U => `${mChips('meeK', ME_EL.map(([k]) => [k, U.k[k][0]]), 'water')}
    <div class="al-ctl"><label>🔋 ${U.v}</label><input type="range" min="0" max="6" step="0.1" value="3" id="meeV"><b id="meeVv"></b></div>
    <svg viewBox="0 0 440 220" class="fl-svg" id="meeSvg"></svg><div class="fl-msg" id="meeMsg"></div>`,
  init(U, q) {
    let k = 'water', acc = [0, 0], bub = [];
    const msg = () => { const [, vmin] = ME_EL.find(x => x[0] === k), V = +q('#meeV').value; q('#meeVv').textContent = flNum(V, 1) + ' V'; const on = V > vmin; q('#meeMsg').className = 'fl-msg ' + (on ? 'ok' : 'bad'); q('#meeMsg').innerHTML = (on ? U.on : U.off.replace('{v}', flNum(vmin, 1))) + '<br>' + U.k[k][1]; };
    mBindChips(q, 'meeK', x => { k = x; acc = [0, 0]; bub = []; msg(); });
    q('#meeV').oninput = msg;
    flLoop((dt, now) => {
      const [, vmin, [pc, rc], [pa, ra]] = ME_EL.find(x => x[0] === k), V = +q('#meeV').value, I = Math.max(0, V - vmin);
      if (I > 0) { acc[0] += I * rc * dt * 4; acc[1] += I * ra * dt * 4; if (Math.random() < I * dt * 6) { bub.push([120 + Math.random() * 10 - 5, 190, rc]); bub.push([320 + Math.random() * 10 - 5, 190, ra]); } }
      bub.forEach(b => b[1] -= 50 * dt); bub = bub.filter(b => b[1] > 70);
      const gas = s => /₂/.test(s) && s !== 'Cu²⁺';
      let s = `<path d="M60 70 V210 H380 V70" class="ms-glass"/><rect x="62" y="90" width="316" height="118" class="ms-water" style="opacity:${k === 'cu' ? 0.7 : 0.35};${k === 'cu' ? 'fill:#5aa9ff' : ''}"/>
        <rect x="110" y="60" width="20" height="140" class="ec-el ca"/><rect x="310" y="60" width="20" height="140" class="ec-el an"/>
        <path d="M120 60 V25 H200 M240 25 H320 V60" class="ec-wire"/><rect x="200" y="12" width="40" height="26" rx="4" class="ec-bat"/><text x="220" y="30" class="ec-vt s">${flNum(V, 1)}V</text>
        <text x="120" y="218" class="fl-small">${U.cat} (−)</text><text x="320" y="218" class="fl-small">${U.an} (+)</text>`;
      if (k !== 'water') s += `<rect x="104" y="${200 - Math.min(120, acc[0] * 0.8)}" width="32" height="${Math.min(120, acc[0] * 0.8)}" class="ec-dep ${k}" opacity="${gas(pc) ? 0 : 0.9}"/>`;
      bub.forEach(([x, y, r]) => { const isC = x < 220; if ((isC && gas(pc)) || (!isC && gas(pa))) s += `<circle cx="${x + Math.sin(y / 9) * 4}" cy="${y}" r="${3 + r}" class="ec-bub"/>`; });
      s += `<text x="120" y="52" class="fz-lbl">${pc}: ${flNum(acc[0], 0)}</text><text x="320" y="52" class="fz-lbl">${pa}: ${flNum(acc[1], 0)}</text>`;
      q('#meeSvg').innerHTML = s;
    });
    msg();
  },
};

/* ======================= QUÍMICA AMBIENTAL ======================= */
FV['env-green'] = {
  html: U => `<svg viewBox="0 0 440 240" class="fl-svg" id="mgrSvg"></svg>
    <div class="al-ctl"><label>CO₂ (ppm)</label><input type="range" min="180" max="1120" step="10" value="420" id="mgrP"><b id="mgrPv"></b></div><div class="fl-msg" id="mgrMsg"></div>`,
  init(U, q) {
    let ph = [], acc = 0;
    const mol = Array.from({ length: 60 }, () => [20 + Math.random() * 400, 40 + Math.random() * 130]);
    const msg = () => { const p = +q('#mgrP').value, dT = 3 * Math.log2(p / 280); q('#mgrPv').textContent = p; q('#mgrMsg').className = 'fl-msg ' + (dT > 1.5 ? 'bad' : 'ok'); q('#mgrMsg').innerHTML = `${U.t}: <b>${dT >= 0 ? '+' : '−'}${flNum(Math.abs(dT), 1)} °C</b> ${U.vs} · ${U.ref.find(r => p <= r[0])[1]}`; };
    q('#mgrP').oninput = msg; msg();
    flLoop(dt => {
      const p = +q('#mgrP').value, nm = Math.round(p / 1120 * 60), pAbs = p / 1120 * 0.03;
      acc += dt * 5; while (acc > 1) { acc--; ph.push({ x: 30 + Math.random() * 380, y: 0, vy: 140, vx: 0, ir: 0 }); }
      ph.forEach(o => { o.x += o.vx * dt; o.y += o.vy * dt;
        if (!o.ir && o.y >= 205) { o.ir = 1; o.vy = -110; o.vx = (Math.random() - 0.5) * 60; }
        if (o.ir && o.y < 180 && o.y > 40 && Math.random() < pAbs) { const a = Math.random() * 6.283; o.vx = Math.cos(a) * 110; o.vy = Math.sin(a) * 110; }
        if (o.ir && o.y >= 205) { o.vy = -Math.abs(o.vy); } });
      ph = ph.filter(o => o.y > -5 && o.x > -5 && o.x < 445 && ph.length < 400);
      let s = `<rect x="0" y="0" width="440" height="205" class="mgr-sky"/><rect x="0" y="205" width="440" height="35" class="mgr-ground"/><text x="12" y="16" class="fl-small l">☀️</text>`;
      mol.slice(0, nm).forEach(([x, y]) => s += `<g class="mgr-co2"><circle cx="${x - 6}" cy="${y}" r="3"/><circle cx="${x}" cy="${y}" r="3.6"/><circle cx="${x + 6}" cy="${y}" r="3"/></g>`);
      ph.forEach(o => s += `<circle cx="${o.x}" cy="${o.y}" r="3" class="${o.ir ? 'mgr-ir' : 'mgr-vis'}"/>`);
      s += `<text x="428" y="16" class="fl-small r">🟡 ${U.vis} · 🔴 ${U.ir}</text>`;
      q('#mgrSvg').innerHTML = s;
    });
  },
};

FV['env-acid'] = {
  html: U => `<div class="fl-two"><svg viewBox="0 0 220 200" class="fl-svg sq" id="macSvg"></svg><div class="fl-info" id="macInfo"></div></div>
    <div class="al-ctl"><label>🏭 ${U.e}</label><input type="range" min="0" max="100" value="0" id="macE"><b id="macEv"></b></div>
    <div class="al-center"><button class="btn-w fl-sm" id="macR">${U.reset}</button></div>`,
  init(U, q) {
    let worn = 0;
    const drops = Array.from({ length: 30 }, () => [Math.random() * 200 + 10, Math.random() * 200]);
    q('#macR').onclick = () => { worn = 0; };
    flLoop(dt => {
      const e = +q('#macE').value, ph = 5.6 - 1.6 * e / 100, H = Math.pow(10, -ph);
      q('#macEv').textContent = e + '%';
      worn = Math.min(60, worn + Math.max(0, H / 1e-5 - 0.25) * dt * 0.6);
      drops.forEach(d => { d[1] += 120 * dt; if (d[1] > 200) { d[1] = 0; d[0] = Math.random() * 200 + 10; } });
      const col = `hsl(${flClamp((ph - 3.5) / 3 * 200, 0, 200)},70%,55%)`;
      let s = `<rect width="220" height="200" class="mgr-sky"/>${drops.map(([x, y]) => `<line x1="${x}" y1="${y}" x2="${x - 2}" y2="${y + 8}" stroke="${col}" stroke-width="2"/>`).join('')}
        <rect x="70" y="${120 + worn * 0.4}" width="80" height="${60 - worn * 0.4}" rx="${4 + worn / 3}" class="mac-st"/><circle cx="110" cy="${100 + worn * 0.6}" r="${Math.max(4, 22 - worn * 0.3)}" class="mac-st"/><rect x="50" y="180" width="120" height="20" class="mgr-ground"/>`;
      q('#macSvg').innerHTML = s;
      q('#macInfo').innerHTML = `<p>${U.ph}: <b>${flNum(ph, 1)}</b></p><p>${U.h}: <b>${flNum(H / Math.pow(10, -5.6), 0)}×</b> ${U.normal}</p><p>🗿 ${U.st}: <b>${flNum(worn / 60 * 100, 0)}%</b> ${U.gone}</p>`;
    });
  },
};

FV['env-ozone'] = {
  html: U => `<svg viewBox="0 0 440 230" class="fl-svg" id="mozSvg"></svg>
    <div class="al-center"><button class="btn-y fl-sm" id="mozCl">${U.cl}</button><button class="btn-w fl-sm" id="mozR">↺</button></div><div class="fl-msg" id="mozMsg"></div>`,
  init(U, q) {
    let o3, cls, killed;
    const reset = () => { o3 = Array.from({ length: 70 }, () => [15 + Math.random() * 410, 55 + Math.random() * 40, 1]); cls = []; killed = 0; };
    reset();
    q('#mozCl').onclick = () => cls.push({ x: 20 + Math.random() * 400, y: 225, t: null });
    q('#mozR').onclick = reset;
    flLoop((dt, now) => {
      cls.forEach(c => {
        if (c.y > 75) { c.y -= 120 * dt; return; }
        if (!c.t) { const live = o3.filter(o => o[2]); if (!live.length) return; c.t = live.reduce((b, o) => Math.hypot(o[0] - c.x, o[1] - c.y) < Math.hypot(b[0] - c.x, b[1] - c.y) ? o : b); }
        const dx = c.t[0] - c.x, dy = c.t[1] - c.y, d = Math.hypot(dx, dy);
        if (d < 4) { if (c.t[2]) { c.t[2] = 0; killed++; } c.t = null; } else { c.x += dx / d * 160 * dt; c.y += dy / d * 160 * dt; }
      });
      const live = o3.filter(o => o[2]).length, f = live / 70, uv = Math.round((1 - f) * 10) + 1;
      let s = `<rect width="440" height="230" class="mgr-sky"/><rect x="0" y="45" width="440" height="60" class="moz-layer" style="opacity:${0.15 + f * 0.5}"/><text x="430" y="40" class="fl-small r">${U.layer}</text>`;
      o3.forEach(([x, y, a]) => { if (a) s += `<g class="moz-o3"><circle cx="${x - 5}" cy="${y + 3}" r="3"/><circle cx="${x}" cy="${y - 3}" r="3"/><circle cx="${x + 5}" cy="${y + 3}" r="3"/></g>`; });
      for (let i = 0; i < 12; i++) { const x = 20 + i * 36, pass = i < uv; s += `<line x1="${x}" y1="0" x2="${x}" y2="${pass ? 200 : 50}" class="moz-uv"/>`; }
      cls.forEach(c => s += `<circle cx="${c.x}" cy="${c.y}" r="6" class="moz-cl"/><text x="${c.x}" y="${c.y + 4}" class="moz-clt">Cl</text>`);
      s += `<rect x="0" y="200" width="440" height="30" class="mgr-ground"/>`;
      q('#mozSvg').innerHTML = s;
      q('#mozMsg').className = 'fl-msg ' + (killed ? 'bad' : '');
      q('#mozMsg').innerHTML = cls.length ? U.m.replace('{c}', cls.length).replace('{k}', killed) : U.start;
    });
  },
};

/* ======================= TEXTOS ======================= */
FL_LESSONS.push(
  { id: 'g-gas', track: 'phys', icon: '🎈', m: 1,
    pt: {
      t: 'Gases: bilhões de bolinhas batendo nas paredes',
      lead: 'Pressão, volume e temperatura numa ideia só.',
      p: ['Num gás, as moléculas estão <b>longe umas das outras</b> e voando em todas as direções. A <b>pressão</b> é o efeito das batidas delas nas paredes, e a <b>temperatura</b> é a medida de quão rápido elas voam. Com isso dá para deduzir as leis dos gases sem decorar nada:'],
      after: ['<ul class="fl-list"><li>🌡️ <b>Mais quente</b> → elas voam mais rápido → batem mais e mais forte → <b>pressão sobe</b>. (Por isso não se joga lata de spray no fogo.)</li><li>📦 <b>Menos espaço</b> → batem nas paredes com mais frequência → <b>pressão sobe</b> (lei de Boyle: P × V = constante).</li><li>🔵 <b>Mais moléculas</b> → mais batidas → <b>pressão sobe</b> (por isso o pneu enche).</li></ul>',
        'Tudo junto: <b>P · V = n · R · T</b>. A temperatura tem que estar em <b>kelvin</b> (K = °C + 273), porque o zero kelvin é onde as moléculas param: não existe "metade de parado".',
        'Curiosidade: num gás, <b>o tipo da molécula quase não importa</b>. 1 mol de qualquer gás ocupa uns 24,5 L a 25 °C. Por isso a pressão do pneu depende do número de moléculas, não de qual gás é.'],
      so: 'gases se misturam com tudo. Mas as misturas do dia a dia (areia, sal, óleo, álcool na água) precisam ser <b>separadas</b>, e cada método usa uma propriedade diferente.',
      ch: mCh('Por que uma lata de spray pode explodir no fogo?', ['O calor acelera as moléculas do gás, que batem com mais força e a pressão sobe', 'O fogo entra na lata', 'O metal da lata vira gás', 'O gás vira líquido'], 'Volume fixo + temperatura subindo = pressão subindo, até a lata não aguentar.'),
      how: 'Mexa na temperatura, no volume (o pistão da direita) e no número de moléculas. Cada flash amarelo é uma batida na parede; a barra mostra a pressão.',
      ui: { t: 'Temperatura', v: 'Volume', n: 'Moléculas', p: 'Pressão', m: { t: '🌡️ Temperatura mudou: as moléculas mudaram de velocidade, e as batidas também.', v: '📦 Volume mudou: menos espaço = mais batidas por segundo na parede.', n: '🔵 Número de moléculas mudou: mais moléculas = mais batidas.' } },
    },
    en: {
      t: 'Gases: billions of balls hitting the walls',
      lead: 'Pressure, volume and temperature in one idea.',
      p: ['In a gas, molecules are <b>far apart</b> and flying in every direction. <b>Pressure</b> is the effect of their hits on the walls, and <b>temperature</b> measures how fast they fly. From that you can work out the gas laws without memorizing:'],
      after: ['<ul class="fl-list"><li>🌡️ <b>Hotter</b> → they fly faster → more and harder hits → <b>pressure rises</b>. (That is why you never throw a spray can in a fire.)</li><li>📦 <b>Less space</b> → they hit the walls more often → <b>pressure rises</b> (Boyle\'s law: P × V = constant).</li><li>🔵 <b>More molecules</b> → more hits → <b>pressure rises</b> (that is how a tire inflates).</li></ul>',
        'All together: <b>P · V = n · R · T</b>. Temperature must be in <b>kelvin</b> (K = °C + 273), because zero kelvin is where molecules stop: there is no "half stopped".',
        'Fun fact: in a gas, <b>the kind of molecule barely matters</b>. 1 mol of any gas takes about 24.5 L at 25 °C. So tire pressure depends on how many molecules, not which gas.'],
      so: 'gases mix with everything. But everyday mixtures (sand, salt, oil, alcohol in water) need to be <b>separated</b>, and each method uses a different property.',
      ch: mCh('Why can a spray can explode in a fire?', ['Heat speeds up the gas molecules, which hit harder, so pressure rises', 'Fire gets into the can', 'The metal turns into gas', 'The gas turns liquid'], 'Fixed volume + rising temperature = rising pressure, until the can gives way.'),
      how: 'Change the temperature, the volume (the piston on the right) and the number of molecules. Each yellow flash is a hit on the wall; the bar shows the pressure.',
      ui: { t: 'Temperature', v: 'Volume', n: 'Molecules', p: 'Pressure', m: { t: '🌡️ Temperature changed: molecules changed speed, and so did the hits.', v: '📦 Volume changed: less space = more hits per second on the wall.', n: '🔵 Number of molecules changed: more molecules = more hits.' } },
    } },

  { id: 'g-mix', track: 'phys', icon: '🧪', m: 0,
    pt: {
      t: 'Misturas: como separar cada uma',
      lead: 'Todo método de separação usa uma diferença entre os componentes.',
      p: ['Uma mistura pode ser <b>heterogênea</b> (dá para ver as partes: areia na água) ou <b>homogênea</b> (parece uma coisa só: sal dissolvido). Para separar, você precisa de uma propriedade em que os componentes são <b>diferentes</b>: tamanho, densidade, ponto de ebulição, magnetismo…',
        'Escolha uma mistura e teste os métodos:'],
      after: ['<ul class="fl-list"><li>🧻 <b>Filtração</b>: diferença de <b>tamanho</b> (sólido não dissolvido fica no papel).</li><li>⏳ <b>Decantação / funil de separação</b>: diferença de <b>densidade</b> entre coisas que não se misturam.</li><li>☀️ <b>Evaporação</b>: o líquido vai embora e o sólido dissolvido fica (salinas).</li><li>♨️ <b>Destilação simples</b>: ferve o líquido, o vapor esfria e vira líquido puro em outro frasco. Boa quando os pontos de ebulição são <b>muito diferentes</b>.</li><li>🗼 <b>Destilação fracionada</b>: para pontos de ebulição <b>próximos</b>; uma coluna separa aos pouquinhos (refino do petróleo, álcool).</li><li>🧲 <b>Separação magnética</b>: só um componente é atraído pelo ímã.</li></ul>'],
      so: 'separar sal da água é fácil fervendo. Mas o sal dissolvido muda a água: ela passa a ferver mais quente e congelar mais frio. Por quê?',
      ch: mCh('Para separar água e álcool (que fervem a 100 °C e 78 °C), o melhor método é:', ['Destilação fracionada', 'Filtração', 'Decantação', 'Separação magnética'], 'Os dois são líquidos que se misturam e os pontos de ebulição são próximos: precisa da coluna de fracionamento.'),
      how: 'Toque numa mistura e depois num método. O site explica se aquele método funciona e qual propriedade ele usa.',
      ui: { s1: '1. Escolha a mistura', s2: '2. Escolha o método', pick: 'Agora escolha um método de separação.', kind: { het: 'heterogênea', hom: 'homogênea' },
        mix: { sand: ['Areia + água', 'Funciona! A areia não dissolve e é grande demais para passar pelo papel de filtro.'], oil: ['Água + óleo', 'Funciona! Não se misturam e o óleo é menos denso: fica em cima, e o funil deixa sair só a água de baixo.'], saltK: ['Sal + água (quero o sal)', 'Funciona! A água evapora e o sal, que não evapora, fica. É assim nas salinas.'], saltW: ['Sal + água (quero a água)', 'Funciona! A água ferve a 100 °C e o sal só a 1.413 °C: o vapor sai puro e é condensado em outro frasco.'], alc: ['Água + álcool', 'Funciona! Os pontos de ebulição são próximos (78 e 100 °C), então a coluna separa aos poucos.'], iron: ['Limalha de ferro + areia', 'Funciona! Só o ferro é atraído pelo ímã.'], oilP: ['Petróleo', 'Funciona! Cada fração (gás, gasolina, querosene, diesel…) sai numa altura da coluna, conforme o ponto de ebulição.'] },
        met: { filt: ['🧻 Filtração', 'Aqui não funciona: o que você quer separar passa pelo filtro (está dissolvido ou é líquido).', 'Usa diferença de tamanho: só segura sólidos que não dissolveram.'], dec: ['⏳ Decantação', 'Aqui não funciona: os componentes não se separam em camadas sozinhos.', 'Usa diferença de densidade entre coisas que não se misturam.'], evap: ['☀️ Evaporação', 'Aqui não é o ideal: você perderia o líquido, ou os dois evaporariam.', 'O líquido vai embora para o ar e só o sólido dissolvido fica.'], dist: ['♨️ Destilação simples', 'Aqui não é o ideal: com pontos de ebulição próximos (ou sem nada para ferver), ela não separa bem.', 'Ferve, condensa o vapor e recolhe o líquido puro. Boa para pontos de ebulição muito diferentes.'], frac: ['🗼 Destilação fracionada', 'Aqui é exagero ou não funciona: não precisa (ou não dá) separar por ponto de ebulição.', 'Uma coluna com vários "andares" separa líquidos com pontos de ebulição próximos.'], mag: ['🧲 Separação magnética', 'Aqui não funciona: nenhum componente é atraído pelo ímã.', 'Só serve quando um dos componentes é magnético (ferro, níquel, cobalto).'] } },
    },
    en: {
      t: 'Mixtures: how to separate each one',
      lead: 'Every separation method uses a difference between the components.',
      p: ['A mixture can be <b>heterogeneous</b> (you can see the parts: sand in water) or <b>homogeneous</b> (looks like one thing: dissolved salt). To separate, you need a property where the components are <b>different</b>: size, density, boiling point, magnetism…',
        'Pick a mixture and try the methods:'],
      after: ['<ul class="fl-list"><li>🧻 <b>Filtration</b>: difference in <b>size</b> (undissolved solid stays on the paper).</li><li>⏳ <b>Decanting / separating funnel</b>: difference in <b>density</b> between things that do not mix.</li><li>☀️ <b>Evaporation</b>: the liquid leaves and the dissolved solid stays (salt pans).</li><li>♨️ <b>Simple distillation</b>: boil the liquid, the vapor cools into pure liquid in another flask. Good when boiling points are <b>very different</b>.</li><li>🗼 <b>Fractional distillation</b>: for <b>close</b> boiling points; a column separates bit by bit (oil refining, alcohol).</li><li>🧲 <b>Magnetic separation</b>: only one component is pulled by the magnet.</li></ul>'],
      so: 'separating salt from water is easy by boiling. But dissolved salt changes water: it boils hotter and freezes colder. Why?',
      ch: mCh('To separate water and alcohol (boiling at 100 °C and 78 °C), the best method is:', ['Fractional distillation', 'Filtration', 'Decanting', 'Magnetic separation'], 'Both are liquids that mix and their boiling points are close: you need the fractionating column.'),
      how: 'Tap a mixture, then a method. The site explains whether that method works and which property it uses.',
      ui: { s1: '1. Pick the mixture', s2: '2. Pick the method', pick: 'Now pick a separation method.', kind: { het: 'heterogeneous', hom: 'homogeneous' },
        mix: { sand: ['Sand + water', 'It works! Sand does not dissolve and is too big to pass the filter paper.'], oil: ['Water + oil', 'It works! They do not mix and oil is less dense: it floats, and the funnel lets out only the water below.'], saltK: ['Salt + water (I want the salt)', 'It works! Water evaporates and salt, which does not, stays behind. That is how salt pans work.'], saltW: ['Salt + water (I want the water)', 'It works! Water boils at 100 °C and salt only at 1,413 °C: the vapor leaves pure and is condensed in another flask.'], alc: ['Water + alcohol', 'It works! The boiling points are close (78 and 100 °C), so the column separates them bit by bit.'], iron: ['Iron filings + sand', 'It works! Only iron is pulled by the magnet.'], oilP: ['Crude oil', 'It works! Each fraction (gas, gasoline, kerosene, diesel…) leaves at a height of the column, by boiling point.'] },
        met: { filt: ['🧻 Filtration', 'Not here: what you want to separate passes through the filter (it is dissolved or liquid).', 'Uses size: it only holds back undissolved solids.'], dec: ['⏳ Decanting', 'Not here: the components do not form layers by themselves.', 'Uses density between things that do not mix.'], evap: ['☀️ Evaporation', 'Not ideal here: you would lose the liquid, or both would evaporate.', 'The liquid goes into the air and only the dissolved solid stays.'], dist: ['♨️ Simple distillation', 'Not ideal here: with close boiling points (or nothing to boil), it does not separate well.', 'Boils, condenses the vapor and collects pure liquid. Good for very different boiling points.'], frac: ['🗼 Fractional distillation', 'Overkill or useless here: no need (or no way) to separate by boiling point.', 'A column with many "floors" separates liquids with close boiling points.'], mag: ['🧲 Magnetic separation', 'Not here: no component is pulled by the magnet.', 'Only works when one component is magnetic (iron, nickel, cobalt).'] } },
    } },

  { id: 'g-coll', track: 'phys', icon: '🧊', m: 1,
    pt: {
      t: 'Propriedades coligativas: o soluto atrapalha',
      lead: 'Por que o sal derrete o gelo da estrada.',
      p: ['Quando você dissolve algo na água, as partículas do soluto ficam <b>no meio do caminho</b>. Elas atrapalham as moléculas de água de escaparem como vapor (então precisa esquentar mais para ferver) e de se organizarem em gelo (então precisa esfriar mais para congelar).',
        'O que importa é <b>quantas partículas</b> estão dissolvidas, não qual é o soluto. Por isso o sal (que se separa em Na⁺ + Cl⁻, 2 partículas) atrapalha o dobro do açúcar (que fica inteiro, 1 partícula). Teste:'],
      after: ['<ul class="fl-list"><li>🛣️ <b>Sal na estrada</b>: a água salgada só congela abaixo de 0 °C, então o gelo derrete.</li><li>🍦 <b>Gelo + sal no sorvete caseiro</b>: a mistura fica bem abaixo de 0 °C e congela o creme mais rápido.</li><li>🍝 <b>Sal no macarrão</b>: aumenta a temperatura de ebulição, mas só uns décimos de grau. É pelo sabor, não pela temperatura!</li><li>🥗 <b>Osmose</b>: a água atravessa membranas indo para o lado mais concentrado. Salada temperada murcha; água pura na veia faria as células incharem (por isso o soro tem 9 g/L de sal).</li></ul>'],
      so: 'mudar de estado e dissolver envolvem energia. Toda reação também. Será que dá para calcular essa energia sem medir cada reação?',
      ch: mCh('Por que 1 mol de NaCl abaixa o ponto de congelamento o dobro de 1 mol de açúcar?', ['O NaCl se separa em 2 partículas (Na⁺ e Cl⁻); o açúcar fica em 1', 'O sal é mais pesado', 'O açúcar não dissolve', 'O sal é mais frio'], 'O efeito depende do número de partículas dissolvidas, não do tipo.'),
      how: 'Escolha o soluto e arraste a barra de quantidade. Veja quantas partículas ficam no caminho e o novo ponto de ebulição e de congelamento.',
      ui: { s: { sug: 'Açúcar (1 partícula)', salt: 'Sal NaCl (2)', cacl2: 'CaCl₂ (3)' }, m: 'Quantidade', part: 'Partículas dissolvidas', i: 'partículas por fórmula', boil: 'Ferve a', freeze: 'Congela a' },
    },
    en: {
      t: 'Colligative properties: the solute gets in the way',
      lead: 'Why salt melts ice on roads.',
      p: ['When you dissolve something in water, the solute particles are <b>in the way</b>. They hinder water molecules from escaping as vapor (so you must heat more to boil) and from organizing into ice (so you must cool more to freeze).',
        'What matters is <b>how many particles</b> are dissolved, not which solute. That is why salt (which splits into Na⁺ + Cl⁻, 2 particles) hinders twice as much as sugar (which stays whole, 1 particle). Try it:'],
      after: ['<ul class="fl-list"><li>🛣️ <b>Salt on roads</b>: salty water only freezes below 0 °C, so the ice melts.</li><li>🍦 <b>Ice + salt for homemade ice cream</b>: the mix gets well below 0 °C and freezes the cream faster.</li><li>🍝 <b>Salt in pasta water</b>: raises the boiling point, but only a few tenths of a degree. It is for flavor, not temperature!</li><li>🥗 <b>Osmosis</b>: water crosses membranes toward the more concentrated side. Dressed salad wilts; pure water in a vein would make cells swell (that is why saline has 9 g/L of salt).</li></ul>'],
      so: 'changing state and dissolving involve energy. So does every reaction. Can we calculate that energy without measuring each reaction?',
      ch: mCh('Why does 1 mol of NaCl lower the freezing point twice as much as 1 mol of sugar?', ['NaCl splits into 2 particles (Na⁺ and Cl⁻); sugar stays as 1', 'Salt is heavier', 'Sugar does not dissolve', 'Salt is colder'], 'The effect depends on the number of dissolved particles, not their type.'),
      how: 'Pick the solute and drag the amount bar. See how many particles get in the way and the new boiling and freezing points.',
      ui: { s: { sug: 'Sugar (1 particle)', salt: 'Salt NaCl (2)', cacl2: 'CaCl₂ (3)' }, m: 'Amount', part: 'Dissolved particles', i: 'particles per formula', boil: 'Boils at', freeze: 'Freezes at' },
    } },

  { id: 't-hess', track: 'eq', icon: '🧗', m: 1,
    pt: {
      t: 'Lei de Hess: o caminho não importa',
      lead: 'A energia de uma reação só depende do começo e do fim.',
      p: ['A <b>entalpia (ΔH)</b> é o calor que uma reação troca: negativa quando <b>libera</b> (exotérmica), positiva quando <b>absorve</b>. E ela funciona como a altura numa montanha: não importa se você desceu direto ou em zigue-zague, a diferença de altura entre o topo e o pé é a mesma.',
        'Queimar carvão até CO₂ pode ser feito direto ou em duas etapas (primeiro vira CO, depois CO₂). Compare:'],
      after: ['−111 + (−283) = −394 kJ: <b>exatamente</b> o mesmo do caminho direto. Isso é a <b>lei de Hess</b>, e ela é muito útil: dá para calcular o ΔH de uma reação difícil de medir somando reações fáceis.',
        'Regras para somar equações: se <b>inverter</b> uma equação, troque o sinal do ΔH; se <b>multiplicar</b> a equação, multiplique o ΔH junto.'],
      so: 'se o ΔH só depende do começo e do fim, dá para montar uma "tabela de alturas" de cada substância e calcular qualquer reação. É assim que se compara combustíveis.',
      ch: mCh('A → B libera 50 kJ e B → C libera 30 kJ. Quanto libera A → C direto?', ['80 kJ', '20 kJ', '50 kJ', 'Depende do caminho'], 'Hess: o ΔH total é a soma das etapas, qualquer que seja o caminho.'),
      how: 'Troque entre o caminho direto e o de duas etapas e veja as setas descerem no diagrama de energia. Compare o total.',
      ui: { direct: '➡️ Caminho direto', two: '↘️↘️ Duas etapas', m1: 'C + O₂ → CO₂ direto: <b>ΔH = −394 kJ</b>.', m2: 'C + ½ O₂ → CO (−111 kJ), depois CO + ½ O₂ → CO₂ (−283 kJ). Total: <b>−394 kJ</b>, igualzinho!' },
    },
    en: {
      t: 'Hess\'s law: the path does not matter',
      lead: 'The energy of a reaction only depends on the start and the end.',
      p: ['<b>Enthalpy (ΔH)</b> is the heat a reaction exchanges: negative when it <b>releases</b> (exothermic), positive when it <b>absorbs</b>. It works like height on a mountain: whether you went down straight or zigzagging, the height difference between the top and the bottom is the same.',
        'Burning coal to CO₂ can be done directly or in two steps (first CO, then CO₂). Compare:'],
      after: ['−111 + (−283) = −394 kJ: <b>exactly</b> the same as the direct path. That is <b>Hess\'s law</b>, and it is very useful: you can compute the ΔH of a reaction that is hard to measure by adding easy ones.',
        'Rules for adding equations: if you <b>reverse</b> an equation, flip the sign of ΔH; if you <b>multiply</b> the equation, multiply ΔH too.'],
      so: 'if ΔH only depends on the start and end, you can build a "height table" for each substance and compute any reaction. That is how fuels are compared.',
      ch: mCh('A → B releases 50 kJ and B → C releases 30 kJ. How much does A → C release directly?', ['80 kJ', '20 kJ', '50 kJ', 'It depends on the path'], 'Hess: the total ΔH is the sum of the steps, whatever the path.'),
      how: 'Switch between the direct path and the two-step path and watch the arrows go down the energy diagram. Compare the total.',
      ui: { direct: '➡️ Direct path', two: '↘️↘️ Two steps', m1: 'C + O₂ → CO₂ directly: <b>ΔH = −394 kJ</b>.', m2: 'C + ½ O₂ → CO (−111 kJ), then CO + ½ O₂ → CO₂ (−283 kJ). Total: <b>−394 kJ</b>, exactly the same!' },
    } },

  { id: 't-fuel', track: 'eq', icon: '⛽', m: 1,
    pt: {
      t: 'Qual combustível é melhor?',
      lead: 'Calculando a energia com a tabela de entalpias de formação.',
      p: ['A <b>entalpia de formação (ΔH<sub>f</sub>)</b> é a "altura" de cada substância, medida a partir dos elementos puros (que valem zero). Com ela, qualquer reação sai de uma conta só:',
        '<p class="al-formula"><b>ΔH = Σ ΔH<sub>f</sub>(produtos) − Σ ΔH<sub>f</sub>(reagentes)</b></p>',
        'Compare os combustíveis. Repare em duas coisas: quanta energia sai <b>por grama</b> (o que importa para carregar no tanque) e quanto CO₂ sai <b>para cada energia</b>:'],
      after: ['<ul class="fl-list"><li>🥇 O <b>hidrogênio</b> é o campeão de energia por grama e não solta CO₂, só água. O problema é produzir, guardar e transportar um gás tão leve.</li><li>🌿 O <b>etanol</b> solta CO₂ na queima, mas a cana "puxou" esse CO₂ do ar enquanto crescia. Por isso é chamado de renovável.</li><li>🪨 O <b>carvão</b> é o pior em CO₂ por energia: é quase só carbono, sem hidrogênio para virar água.</li></ul>',
        'Regra geral: quanto mais H e menos C um combustível tem, menos CO₂ ele solta para a mesma energia.'],
      so: 'até aqui, as reações iam só para um lado. Mas muitas reações <b>andam nos dois sentidos</b> ao mesmo tempo e param num meio-termo.',
      ch: mCh('Por que o carvão solta mais CO₂ por energia do que o metano?', ['Quase não tem hidrogênio: toda a energia vem de carbono virando CO₂', 'Porque é sólido', 'Porque queima mais devagar', 'Porque tem mais oxigênio'], 'No metano, parte da energia vem do H virando água. No carvão, tudo vem do C virando CO₂.'),
      how: 'Toque num combustível. Veja a conta do ΔH com as entalpias de formação, e compare nas barras a energia por grama e o CO₂ por energia.',
      ui: { f: { h2: 'Hidrogênio', ch4: 'Metano (gás natural)', oct: 'Octano (gasolina)', eth: 'Etanol', c: 'Carvão' }, prod: 'produtos', reag: 'reagentes', perg: 'Energia por grama', per: 'por MJ', eg: 'energia por grama', co2: 'CO₂ por energia' },
    },
    en: {
      t: 'Which fuel is better?',
      lead: 'Computing energy with the table of formation enthalpies.',
      p: ['The <b>enthalpy of formation (ΔH<sub>f</sub>)</b> is the "height" of each substance, measured from the pure elements (which count as zero). With it, any reaction is one calculation:',
        '<p class="al-formula"><b>ΔH = Σ ΔH<sub>f</sub>(products) − Σ ΔH<sub>f</sub>(reactants)</b></p>',
        'Compare the fuels. Look at two things: how much energy comes out <b>per gram</b> (what matters for carrying in a tank) and how much CO₂ comes out <b>per energy</b>:'],
      after: ['<ul class="fl-list"><li>🥇 <b>Hydrogen</b> is the champion of energy per gram and gives no CO₂, only water. The problem is making, storing and moving such a light gas.</li><li>🌿 <b>Ethanol</b> releases CO₂ when burned, but the sugarcane "pulled" that CO₂ from the air as it grew. That is why it is called renewable.</li><li>🪨 <b>Coal</b> is the worst in CO₂ per energy: it is almost all carbon, with no hydrogen to become water.</li></ul>',
        'General rule: the more H and less C a fuel has, the less CO₂ it releases for the same energy.'],
      so: 'so far, reactions went only one way. But many reactions <b>run both ways</b> at once and stop at a middle point.',
      ch: mCh('Why does coal release more CO₂ per energy than methane?', ['It has almost no hydrogen: all the energy comes from carbon becoming CO₂', 'Because it is solid', 'Because it burns slower', 'Because it has more oxygen'], 'In methane, part of the energy comes from H becoming water. In coal, it all comes from C becoming CO₂.'),
      how: 'Tap a fuel. See the ΔH math with formation enthalpies, and compare energy per gram and CO₂ per energy in the bars.',
      ui: { f: { h2: 'Hydrogen', ch4: 'Methane (natural gas)', oct: 'Octane (gasoline)', eth: 'Ethanol', c: 'Coal' }, prod: 'products', reag: 'reactants', perg: 'Energy per gram', per: 'per MJ', eg: 'energy per gram', co2: 'CO₂ per energy' },
    } },

  { id: 'e-eq', track: 'eq', icon: '⚖️', m: 1,
    pt: {
      t: 'Equilíbrio químico: a reação que vai e volta',
      lead: 'Quando ida e volta empatam, parece que parou. Mas não parou.',
      p: ['O N₂O₄ (incolor) se quebra em 2 NO₂ (marrom), e o NO₂ se junta de volta em N₂O₄: <b>N₂O₄ ⇌ 2 NO₂</b>. No começo só tem N₂O₄ e a ida é rápida. Conforme o NO₂ aparece, a volta acelera. Uma hora as duas velocidades ficam <b>iguais</b>: é o <b>equilíbrio</b>. As quantidades param de mudar, mas as moléculas continuam reagindo nos dois sentidos.',
        'Agora "empurre" o equilíbrio e veja como ele reage:'],
      after: ['O <b>princípio de Le Chatelier</b>: um equilíbrio perturbado se desloca para <b>diminuir a perturbação</b>.',
        '<ul class="fl-list"><li>➕ <b>Colocou reagente</b> → ele é consumido: o equilíbrio anda para os produtos.</li><li>🔥 <b>Aqueceu</b> → favorece o sentido que <b>absorve</b> calor (aqui, a ida: fica mais marrom).</li><li>🗜️ <b>Comprimiu</b> → favorece o lado com <b>menos moléculas de gás</b> (1 N₂O₄ ocupa menos que 2 NO₂).</li></ul>',
        'É por isso que a indústria faz amônia (N₂ + 3 H₂ ⇌ 2 NH₃) em <b>alta pressão</b>: 4 moléculas viram 2, então comprimir empurra para a amônia.'],
      so: 'o equilíbrio mais importante para a vida é o de ácidos fracos: ele é o segredo de como o sangue segura o pH quase parado.',
      ch: mCh('No N₂O₄ ⇌ 2 NO₂, o que acontece ao comprimir o recipiente?', ['O equilíbrio vai para o N₂O₄, que tem menos moléculas de gás', 'Vai para o NO₂', 'Nada muda', 'A reação para de vez'], 'Menos espaço: o sistema "alivia" indo para o lado com menos moléculas de gás.'),
      how: 'Espere o gráfico ficar reto (equilíbrio). Depois use os botões para colocar N₂O₄, aquecer, esfriar ou comprimir, e veja a cor e as curvas se ajustarem.',
      ui: { add: '➕ N₂O₄', hot: '🔥 Aquecer', cold: '❄️ Esfriar', press: '🗜️ Comprimir', exp: '↔️ Expandir', time: 'tempo', cl: '(incolor)', br: '(marrom)', start: 'Começa só com N₂O₄. Espere as curvas ficarem retas: chegou ao equilíbrio.',
        m: { add: '➕ Mais reagente: parte dele vira NO₂ até um novo equilíbrio.', hot: '🔥 A ida absorve calor, então aquecer favorece o NO₂: mais marrom.', cold: '❄️ Esfriar favorece a volta (que libera calor): mais N₂O₄, mais claro.', press: '🗜️ Comprimiu: o equilíbrio vai para o N₂O₄ (1 molécula no lugar de 2).', exp: '↔️ Mais espaço: favorece o lado com mais moléculas, o NO₂.' } },
    },
    en: {
      t: 'Chemical equilibrium: the reaction that goes back and forth',
      lead: 'When forward and backward tie, it looks stopped. It is not.',
      p: ['N₂O₄ (colorless) breaks into 2 NO₂ (brown), and NO₂ joins back into N₂O₄: <b>N₂O₄ ⇌ 2 NO₂</b>. At first there is only N₂O₄ and the forward reaction is fast. As NO₂ appears, the backward one speeds up. At some point both speeds are <b>equal</b>: <b>equilibrium</b>. Amounts stop changing, but molecules keep reacting both ways.',
        'Now "push" the equilibrium and watch it react:'],
      after: ['<b>Le Chatelier\'s principle</b>: a disturbed equilibrium shifts to <b>reduce the disturbance</b>.',
        '<ul class="fl-list"><li>➕ <b>Added reactant</b> → it gets used up: the equilibrium moves toward products.</li><li>🔥 <b>Heated</b> → favors the direction that <b>absorbs</b> heat (here, forward: browner).</li><li>🗜️ <b>Compressed</b> → favors the side with <b>fewer gas molecules</b> (1 N₂O₄ takes less space than 2 NO₂).</li></ul>',
        'That is why industry makes ammonia (N₂ + 3 H₂ ⇌ 2 NH₃) at <b>high pressure</b>: 4 molecules become 2, so compressing pushes toward ammonia.'],
      so: 'the most important equilibrium for life is the one of weak acids: it is the secret of how blood keeps its pH almost still.',
      ch: mCh('In N₂O₄ ⇌ 2 NO₂, what happens when you compress the container?', ['Equilibrium shifts to N₂O₄, which has fewer gas molecules', 'It shifts to NO₂', 'Nothing changes', 'The reaction stops for good'], 'Less space: the system "relieves" it by going to the side with fewer gas molecules.'),
      how: 'Wait for the graph to flatten (equilibrium). Then use the buttons to add N₂O₄, heat, cool or compress, and watch the color and curves adjust.',
      ui: { add: '➕ N₂O₄', hot: '🔥 Heat', cold: '❄️ Cool', press: '🗜️ Compress', exp: '↔️ Expand', time: 'time', cl: '(colorless)', br: '(brown)', start: 'Starts with only N₂O₄. Wait for the curves to flatten: equilibrium reached.',
        m: { add: '➕ More reactant: part of it becomes NO₂ until a new equilibrium.', hot: '🔥 The forward reaction absorbs heat, so heating favors NO₂: browner.', cold: '❄️ Cooling favors the backward reaction (which releases heat): more N₂O₄, lighter.', press: '🗜️ Compressed: equilibrium shifts to N₂O₄ (1 molecule instead of 2).', exp: '↔️ More space: favors the side with more molecules, NO₂.' } },
    } },

  { id: 'e-buffer', track: 'eq', icon: '🩸', m: 2,
    pt: {
      t: 'Solução tampão: o segredo do sangue',
      lead: 'Uma mistura que "engole" ácido e base sem mudar o pH.',
      p: ['Um ácido fraco, como o acético, fica em <b>equilíbrio</b>: só uma parte dele solta H⁺ (lição "Ácidos e bases"). Um <b>tampão</b> é uma mistura desse ácido fraco com o seu par que <b>pega</b> H⁺ (o acetato). Se entra H⁺, o acetato pega. Se entra OH⁻, o ácido solta H⁺ para neutralizar. O pH quase não mexe.',
        'Pingue ácido (para a direita) ou base (para a esquerda) em água pura e num tampão:'],
      after: ['Em água pura, poucas gotas de ácido derrubam o pH vários pontos. No tampão, o pH mal se move, até o tampão "esgotar".',
        'O seu <b>sangue</b> é tamponado (principalmente pelo par ácido carbônico / bicarbonato) e fica entre <b>pH 7,35 e 7,45</b>. Sair dessa faixa é uma emergência médica. Quando você prende a respiração, o CO₂ acumula, vira ácido carbônico, e é o tampão que segura.'],
      so: 'ácido-base é troca de prótons. Agora vamos olhar a fundo a outra grande troca: a de <b>elétrons</b>.',
      ch: mCh('Por que o pH de um tampão quase não muda quando entra um pouco de ácido?', ['O par do ácido fraco (a base conjugada) pega o H⁺ que entrou', 'O tampão não deixa o ácido entrar', 'O H⁺ evapora', 'O tampão é neutro e pronto'], 'O acetato "absorve" o H⁺ virando ácido acético, que é fraco e solta pouco H⁺.'),
      how: 'Arraste a barra para a direita para pingar ácido ou para a esquerda para pingar base. Compare o pH da água pura com o do tampão.',
      ui: { drops: 'Gotas', acid: 'gotas de ácido', base: 'gotas de base', water: 'Água pura', buf: 'Tampão (acético + acetato)', start: 'Comece a pingar ácido ou base.', msg: 'A água pura mudou <b>{a}</b> pontos de pH. O tampão, só <b>{b}</b>.' },
    },
    en: {
      t: 'Buffer solutions: the secret of blood',
      lead: 'A mix that "swallows" acid and base without changing pH.',
      p: ['A weak acid, like acetic acid, sits in <b>equilibrium</b>: only part of it releases H⁺ (lesson "Acids and bases"). A <b>buffer</b> mixes that weak acid with its partner that <b>takes</b> H⁺ (acetate). If H⁺ comes in, acetate takes it. If OH⁻ comes in, the acid releases H⁺ to neutralize it. The pH barely moves.',
        'Drip acid (to the right) or base (to the left) into pure water and into a buffer:'],
      after: ['In pure water, a few drops of acid drop the pH by several points. In the buffer, the pH barely moves, until the buffer "runs out".',
        'Your <b>blood</b> is buffered (mainly by the carbonic acid / bicarbonate pair) and stays between <b>pH 7.35 and 7.45</b>. Leaving that range is a medical emergency. When you hold your breath, CO₂ builds up and becomes carbonic acid, and the buffer holds the line.'],
      so: 'acid-base is a proton exchange. Now let us look deeply at the other big exchange: <b>electrons</b>.',
      ch: mCh('Why does a buffer\'s pH barely change when a little acid comes in?', ['The weak acid\'s partner (conjugate base) takes the incoming H⁺', 'The buffer does not let acid in', 'The H⁺ evaporates', 'The buffer is neutral, that is all'], 'Acetate "absorbs" the H⁺ and becomes acetic acid, which is weak and releases little H⁺.'),
      how: 'Drag the bar right to drip acid or left to drip base. Compare the pH of pure water with the buffer.',
      ui: { drops: 'Drops', acid: 'drops of acid', base: 'drops of base', water: 'Pure water', buf: 'Buffer (acetic + acetate)', start: 'Start dripping acid or base.', msg: 'Pure water moved <b>{a}</b> pH points. The buffer, only <b>{b}</b>.' },
    } },

  { id: 'ec-nox', track: 'echem', icon: '🔢', m: 2,
    pt: {
      t: 'Número de oxidação: quem ficou com os elétrons',
      lead: 'Uma contabilidade dos elétrons, feita com a puxada de cada átomo.',
      p: ['O <b>Nox</b> é a carga que cada átomo <b>teria</b> se, em cada ligação, o átomo que puxa mais (mais eletronegativo) ficasse com todos os elétrons. É uma contabilidade, não uma carga real, mas mostra quem "ganhou" e quem "perdeu".',
        'Atalhos que saem dessa ideia: substância simples (O₂, Fe) tem Nox <b>0</b>; o <b>O</b> costuma ser <b>−2</b> (puxa muito); o <b>H</b> costuma ser <b>+1</b>; e a soma dos Nox dá a <b>carga total</b> (0 numa molécula). Veja:'],
      after: ['Agora a oxirredução fica fácil de enxergar: <b>oxidou</b> = Nox <b>subiu</b> (perdeu elétrons); <b>reduziu</b> = Nox <b>desceu</b> (ganhou). No ferro enferrujando, o Fe vai de 0 para +3 (oxidou) e o O vai de 0 para −2 (reduziu).',
        'O mesmo elemento pode ter Nox bem diferentes: o carbono vai de −4 no CH₄ (cercado de H, que puxa menos) até +4 no CO₂ (cercado de O, que puxa mais). Queimar metano é, no fundo, o carbono perdendo 8 elétrons.'],
      so: 'se um átomo perde elétrons e outro ganha, dá para fazer esses elétrons passarem por um fio. É a <b>pilha</b>.',
      ch: mCh('Qual o Nox do carbono no CO₂?', ['+4', '−4', '0', '+2'], 'Cada O vale −2: 2 × (−2) = −4. Para a soma dar 0, o carbono tem que ser +4.'),
      how: 'Toque numa substância. Cada átomo mostra o seu Nox (vermelho = positivo, azul = negativo), e embaixo aparece a soma conferindo com a carga total.',
      ui: { sum: 'Soma', neutral: '(molécula neutra ✔)', ion: '(carga do íon ✔)', why: ['O puxa mais que o H: fica com os elétrons das 2 ligações.', 'Os dois O puxam os elétrons do C: o C fica bem positivo.', 'O C puxa um pouco mais que o H: fica com os elétrons e chega a −4.', 'O N puxa mais que o H.', 'O S fica no meio de 4 oxigênios: chega a +6.', 'Ligação iônica: o Cl levou o elétron de vez.', 'O manganês chega a +7: por isso o KMnO₄ é um oxidante fortíssimo.', 'Átomos iguais: ninguém puxa mais. Nox 0.', 'Na água oxigenada, os dois O dividem entre si: cada um fica com −1.', 'Ferrugem: o ferro perdeu 3 elétrons.', 'Num íon, a soma dá a carga do íon: −1.'] },
    },
    en: {
      t: 'Oxidation number: who got the electrons',
      lead: 'Electron bookkeeping, done with how hard each atom pulls.',
      p: ['The <b>oxidation number</b> is the charge each atom <b>would have</b> if, in every bond, the stronger puller (more electronegative) kept all the electrons. It is bookkeeping, not a real charge, but it shows who "won" and who "lost".',
        'Shortcuts that come from this idea: a pure element (O₂, Fe) has <b>0</b>; <b>O</b> is usually <b>−2</b> (pulls hard); <b>H</b> is usually <b>+1</b>; and the numbers add up to the <b>total charge</b> (0 for a molecule). See:'],
      after: ['Now redox is easy to see: <b>oxidized</b> = number went <b>up</b> (lost electrons); <b>reduced</b> = number went <b>down</b> (gained). When iron rusts, Fe goes from 0 to +3 (oxidized) and O from 0 to −2 (reduced).',
        'The same element can have very different numbers: carbon goes from −4 in CH₄ (surrounded by H, a weaker puller) to +4 in CO₂ (surrounded by O, a stronger puller). Burning methane is, deep down, carbon losing 8 electrons.'],
      so: 'if one atom loses electrons and another gains them, you can make those electrons run through a wire. That is a <b>battery</b>.',
      ch: mCh('What is carbon\'s oxidation number in CO₂?', ['+4', '−4', '0', '+2'], 'Each O is −2: 2 × (−2) = −4. For the sum to be 0, carbon must be +4.'),
      how: 'Tap a substance. Each atom shows its number (red = positive, blue = negative), and below, the sum checks out with the total charge.',
      ui: { sum: 'Sum', neutral: '(neutral molecule ✔)', ion: '(ion charge ✔)', why: ['O pulls harder than H: it keeps the electrons of both bonds.', 'Both O pull electrons away from C: C ends up very positive.', 'C pulls a bit harder than H: it keeps the electrons and reaches −4.', 'N pulls harder than H.', 'S sits among 4 oxygens: it reaches +6.', 'Ionic bond: Cl took the electron for good.', 'Manganese reaches +7: that is why KMnO₄ is a very strong oxidizer.', 'Identical atoms: nobody pulls harder. Number 0.', 'In hydrogen peroxide, the two O share between themselves: each is −1.', 'Rust: iron lost 3 electrons.', 'In an ion, the sum gives the ion\'s charge: −1.'] },
    } },

  { id: 'ec-cell', track: 'echem', icon: '🔋', m: 2,
    pt: {
      t: 'A pilha: elétrons descendo uma ladeira',
      lead: 'A voltagem é o tamanho da ladeira entre dois metais.',
      p: ['Cada metal tem um <b>potencial de redução (E°)</b>: uma nota de quanto os íons dele querem <b>ganhar</b> elétrons. Quanto mais negativo, mais o metal prefere <b>perder</b> elétrons (lembra da fila de quem perde mais fácil?).',
        'Numa pilha, os dois metais ficam separados e ligados por um fio. O que perde mais fácil (<b>ânodo</b>, polo −) empurra elétrons pelo fio até o outro (<b>cátodo</b>, polo +). A <b>ponte salina</b> fecha o circuito deixando íons passarem. Monte:'],
      after: ['<b>Voltagem = E°(cátodo) − E°(ânodo)</b>. A pilha de Daniell (zinco e cobre) dá 1,10 V. Quanto mais longe os dois metais estão na fila, mais "funda" é a ladeira e maior a voltagem.',
        '<ul class="fl-list"><li>➖ <b>Ânodo</b>: o metal se desfaz em íons (oxida). A placa vai ficando fina.</li><li>➕ <b>Cátodo</b>: os íons da solução ganham elétrons e viram metal (reduzem). A placa engrossa.</li><li>🛡️ <b>Proteção de navios</b>: prende-se um bloco de zinco ou magnésio no casco de ferro. O bloco vira ânodo e se sacrifica no lugar do ferro (metal de sacrifício).</li></ul>'],
      so: 'a pilha usa uma reação que acontece sozinha para gerar corrente. E se usarmos corrente para <b>forçar</b> uma reação que não aconteceria sozinha?',
      ch: mCh('Numa pilha de zinco (E° = −0,76 V) e cobre (E° = +0,34 V), quem é o ânodo?', ['O zinco: tem E° menor e perde elétrons', 'O cobre', 'Os dois', 'A ponte salina'], 'O de menor potencial de redução oxida: o zinco manda elétrons para o cobre. Voltagem: 0,34 − (−0,76) = 1,10 V.'),
      how: 'Escolha o metal da esquerda e o da direita. Veja a voltagem, para onde os elétrons (bolinhas azuis) correm no fio e quem é o ânodo e o cátodo.',
      ui: { l: 'Metal da esquerda', r: 'Metal da direita', bridge: 'ponte salina', same: 'Os dois metais são iguais: não há ladeira, 0 V.', msg: '⚡ <b>{v} V</b>. O <b>{an}</b> é o ânodo (−): perde elétrons e se desgasta. O <b>{ca}</b> é o cátodo (+): ganha elétrons e cresce.' },
    },
    en: {
      t: 'The battery: electrons rolling downhill',
      lead: 'Voltage is the size of the slope between two metals.',
      p: ['Each metal has a <b>reduction potential (E°)</b>: a score of how much its ions want to <b>gain</b> electrons. The more negative, the more the metal prefers to <b>lose</b> electrons (remember the line of who loses most easily?).',
        'In a battery, the two metals are kept apart and joined by a wire. The easier loser (<b>anode</b>, − pole) pushes electrons through the wire to the other (<b>cathode</b>, + pole). The <b>salt bridge</b> closes the circuit by letting ions through. Build one:'],
      after: ['<b>Voltage = E°(cathode) − E°(anode)</b>. The Daniell cell (zinc and copper) gives 1.10 V. The farther apart two metals are in the line, the "deeper" the slope and the higher the voltage.',
        '<ul class="fl-list"><li>➖ <b>Anode</b>: the metal dissolves into ions (oxidizes). The plate gets thinner.</li><li>➕ <b>Cathode</b>: ions in solution gain electrons and become metal (reduce). The plate thickens.</li><li>🛡️ <b>Protecting ships</b>: a zinc or magnesium block is attached to the iron hull. The block becomes the anode and sacrifices itself instead of the iron (sacrificial metal).</li></ul>'],
      so: 'a battery uses a reaction that happens by itself to make current. What if we use current to <b>force</b> a reaction that would not happen by itself?',
      ch: mCh('In a zinc (E° = −0.76 V) and copper (E° = +0.34 V) cell, which is the anode?', ['Zinc: it has the lower E° and loses electrons', 'Copper', 'Both', 'The salt bridge'], 'The one with the lower reduction potential oxidizes: zinc sends electrons to copper. Voltage: 0.34 − (−0.76) = 1.10 V.'),
      how: 'Pick the left and right metals. See the voltage, which way the electrons (blue dots) run in the wire, and which is anode and cathode.',
      ui: { l: 'Left metal', r: 'Right metal', bridge: 'salt bridge', same: 'Both metals are the same: no slope, 0 V.', msg: '⚡ <b>{v} V</b>. <b>{an}</b> is the anode (−): it loses electrons and wears away. <b>{ca}</b> is the cathode (+): it gains electrons and grows.' },
    } },

  { id: 'ec-elec', track: 'echem', icon: '⚡', m: 1,
    pt: {
      t: 'Eletrólise: empurrando os elétrons ladeira acima',
      lead: 'Com uma fonte de energia, dá para fazer a reação ao contrário.',
      p: ['Na pilha, os elétrons descem a ladeira sozinhos. Na <b>eletrólise</b>, uma bateria ou fonte <b>empurra</b> os elétrons ladeira acima e força uma reação que não aconteceria sozinha. No polo − (<b>cátodo</b>) algo ganha elétrons; no polo + (<b>ânodo</b>) algo perde.',
        'Só funciona se a voltagem for maior que a "altura da ladeira". Escolha o processo e aumente a voltagem:'],
      after: ['<ul class="fl-list"><li>💧 <b>Água</b>: sai H₂ no cátodo e O₂ no ânodo, na proporção <b>2 : 1</b> (como na fórmula H₂O). É um jeito de produzir hidrogênio "verde", se a eletricidade for renovável.</li><li>🧂 <b>Sal derretido</b>: sai sódio metálico e gás cloro. É como se produzem os dois.</li><li>🥫 <b>Alumínio</b>: a bauxita (Al₂O₃) derretida vira alumínio. Gasta tanta energia que <b>reciclar uma lata economiza cerca de 95%</b> da energia de fazer uma nova.</li><li>💍 <b>Galvanoplastia</b>: o objeto no cátodo ganha uma camada de metal (cobre, níquel, ouro). Bijuterias douradas são feitas assim.</li></ul>',
        'Regra de Faraday: a quantidade de produto é proporcional à <b>carga</b> que passou (corrente × tempo). Dobrar a corrente ou o tempo dobra o produto.'],
      so: 'já vimos o carbono como combustível e plástico. Agora, a química orgânica de verdade: por que o carbono forma milhões de moléculas?',
      ch: mCh('Na eletrólise da água, por que sai o dobro de H₂ em relação ao O₂?', ['A água tem 2 H para cada O (H₂O)', 'O hidrogênio é mais leve', 'O oxigênio fica dissolvido', 'O cátodo é maior'], 'Cada H₂O tem 2 hidrogênios e 1 oxigênio: a proporção dos gases segue a fórmula.'),
      how: 'Escolha o processo e arraste a barra de voltagem. Abaixo da voltagem mínima nada acontece; acima, veja o que se forma em cada eletrodo (e quanto).',
      ui: { v: 'Voltagem', cat: 'cátodo', an: 'ânodo', on: '⚡ Passando corrente: a reação está sendo forçada!', off: '😐 Voltagem baixa demais: precisa de pelo menos ~{v} V.',
        k: { water: ['💧 Água', 'Cátodo: H₂ · Ânodo: O₂ (2 : 1).'], nacl: ['🧂 NaCl derretido', 'Cátodo: sódio metálico · Ânodo: gás cloro.'], al: ['🥫 Alumínio', 'Cátodo: alumínio líquido · Ânodo: o O₂ reage com o carbono do eletrodo e sai como CO₂.'], cu: ['💍 Cobreação', 'Cátodo: o objeto ganha uma camada de cobre · Ânodo: uma placa de cobre se dissolve e repõe os íons.'] } },
    },
    en: {
      t: 'Electrolysis: pushing electrons uphill',
      lead: 'With a power source, you can run the reaction backwards.',
      p: ['In a battery, electrons roll downhill by themselves. In <b>electrolysis</b>, a battery or power supply <b>pushes</b> electrons uphill and forces a reaction that would not happen by itself. At the − pole (<b>cathode</b>) something gains electrons; at the + pole (<b>anode</b>) something loses them.',
        'It only works if the voltage is higher than the "height of the slope". Pick the process and raise the voltage:'],
      after: ['<ul class="fl-list"><li>💧 <b>Water</b>: H₂ at the cathode and O₂ at the anode, in a <b>2 : 1</b> ratio (like the formula H₂O). It is a way to make "green" hydrogen, if the electricity is renewable.</li><li>🧂 <b>Molten salt</b>: gives metallic sodium and chlorine gas. That is how both are made.</li><li>🥫 <b>Aluminium</b>: molten bauxite (Al₂O₃) becomes aluminium. It takes so much energy that <b>recycling a can saves about 95%</b> of the energy of making a new one.</li><li>💍 <b>Electroplating</b>: the object at the cathode gets a metal coating (copper, nickel, gold). Gold-plated jewelry is made this way.</li></ul>',
        'Faraday\'s rule: the amount of product is proportional to the <b>charge</b> that passed (current × time). Double the current or the time and you double the product.'],
      so: 'we have seen carbon as fuel and plastic. Now, real organic chemistry: why does carbon form millions of molecules?',
      ch: mCh('In water electrolysis, why is there twice as much H₂ as O₂?', ['Water has 2 H for each O (H₂O)', 'Hydrogen is lighter', 'Oxygen stays dissolved', 'The cathode is bigger'], 'Each H₂O has 2 hydrogens and 1 oxygen: the gas ratio follows the formula.'),
      how: 'Pick the process and drag the voltage bar. Below the minimum voltage nothing happens; above it, see what forms at each electrode (and how much).',
      ui: { v: 'Voltage', cat: 'cathode', an: 'anode', on: '⚡ Current flowing: the reaction is being forced!', off: '😐 Voltage too low: it needs at least ~{v} V.',
        k: { water: ['💧 Water', 'Cathode: H₂ · Anode: O₂ (2 : 1).'], nacl: ['🧂 Molten NaCl', 'Cathode: metallic sodium · Anode: chlorine gas.'], al: ['🥫 Aluminium', 'Cathode: liquid aluminium · Anode: the O₂ reacts with the carbon electrode and leaves as CO₂.'], cu: ['💍 Copper plating', 'Cathode: the object gets a copper coating · Anode: a copper plate dissolves and replaces the ions.'] } },
    } },

  { id: 'env-green', track: 'env', icon: '🌡️', m: 0,
    pt: {
      t: 'Efeito estufa: por que o CO₂ esquenta o planeta',
      lead: 'Uma molécula que vibra do jeito certo para segurar calor.',
      p: ['A luz do Sol (🟡) atravessa o ar e esquenta o chão. O chão devolve essa energia como <b>infravermelho</b> (🔴, calor). O N₂ e o O₂, que são 99% do ar, deixam o infravermelho passar. Mas o <b>CO₂</b> e o vapor de água <b>absorvem</b> e reemitem esse calor para todos os lados, inclusive de volta para baixo.',
        'Por que só eles? Para absorver infravermelho, a molécula precisa mudar a distribuição das cargas ao vibrar. O CO₂ tem ligações polares (lição "Polar ou apolar?"): quando ele entorta, aparece um lado + e um −. O N₂ e o O₂ têm átomos iguais e não conseguem. Mude o CO₂ do ar:'],
      after: ['Sem nenhum efeito estufa, a Terra teria média de uns −18 °C. Com ele, uns 15 °C: ele é necessário. O problema é o <b>excesso</b>: queimar combustíveis fósseis levou o CO₂ de ~280 ppm (antes da Revolução Industrial) para mais de 420 ppm hoje, o maior valor em centenas de milhares de anos.',
        'A temperatura mostrada é uma estimativa simplificada de equilíbrio (cerca de +3 °C para cada vez que o CO₂ dobra). O metano (CH₄) também é gás estufa, e bem mais forte por molécula.'],
      so: 'o CO₂ esquenta. Mas outras emissões das chaminés e escapamentos fazem outro estrago: deixam a <b>chuva ácida</b>.',
      ch: mCh('Por que o N₂ e o O₂ não são gases do efeito estufa?', ['São formados por átomos iguais e vibrar não cria lados + e −', 'Porque são poucos no ar', 'Porque são muito leves', 'Porque ficam no chão'], 'Para absorver infravermelho, a vibração precisa mudar a distribuição de carga. Em N≡N e O=O isso não acontece.'),
      how: 'Arraste a barra de CO₂. Os pontinhos amarelos são luz do Sol; os vermelhos, calor saindo do chão. Com mais CO₂, mais calor é jogado de volta para baixo.',
      ui: { t: 'Aquecimento de equilíbrio estimado', vs: 'em relação a antes da indústria', vis: 'luz do Sol', ir: 'calor (infravermelho)', ref: [[250, 'era do gelo'], [290, 'antes da indústria'], [430, 'hoje (≈420 ppm)'], [600, 'futuro com emissões altas'], [1200, 'cenário extremo']] },
    },
    en: {
      t: 'Greenhouse effect: why CO₂ warms the planet',
      lead: 'A molecule that vibrates just right to hold heat.',
      p: ['Sunlight (🟡) passes through the air and warms the ground. The ground gives that energy back as <b>infrared</b> (🔴, heat). N₂ and O₂, which are 99% of the air, let infrared through. But <b>CO₂</b> and water vapor <b>absorb</b> it and re-emit that heat in all directions, including back down.',
        'Why only them? To absorb infrared, a molecule has to shift its charges as it vibrates. CO₂ has polar bonds (lesson "Polar or nonpolar?"): when it bends, a + side and a − side appear. N₂ and O₂ have identical atoms and cannot. Change the CO₂ in the air:'],
      after: ['With no greenhouse effect at all, Earth would average about −18 °C. With it, about 15 °C: we need it. The problem is the <b>excess</b>: burning fossil fuels took CO₂ from ~280 ppm (before the Industrial Revolution) to over 420 ppm today, the highest in hundreds of thousands of years.',
        'The temperature shown is a simplified equilibrium estimate (about +3 °C each time CO₂ doubles). Methane (CH₄) is also a greenhouse gas, and much stronger per molecule.'],
      so: 'CO₂ warms. But other emissions from chimneys and exhausts do other damage: they make <b>acid rain</b>.',
      ch: mCh('Why are N₂ and O₂ not greenhouse gases?', ['They are made of identical atoms and vibrating creates no + and − sides', 'There is too little of them', 'They are too light', 'They stay on the ground'], 'To absorb infrared, the vibration must shift the charge distribution. In N≡N and O=O it does not.'),
      how: 'Drag the CO₂ bar. Yellow dots are sunlight; red ones are heat leaving the ground. With more CO₂, more heat is thrown back down.',
      ui: { t: 'Estimated equilibrium warming', vs: 'compared with pre-industrial', vis: 'sunlight', ir: 'heat (infrared)', ref: [[250, 'ice age'], [290, 'pre-industrial'], [430, 'today (≈420 ppm)'], [600, 'high-emission future'], [1200, 'extreme scenario']] },
    } },

  { id: 'env-acid', track: 'env', icon: '🌧️', m: 2,
    pt: {
      t: 'Chuva ácida: óxidos que viram ácidos',
      lead: 'Lembra dos óxidos ácidos? Eles caem do céu.',
      p: ['Toda chuva já é um pouco ácida (pH ≈ 5,6), porque o CO₂ do ar se dissolve e forma ácido carbônico, que é fraco. A <b>chuva ácida</b> de verdade vem de <b>óxidos de enxofre e de nitrogênio</b> (SO₂, NO₂), soltos por queima de carvão, diesel e por indústrias. Eles são <b>óxidos ácidos</b>: com água, viram ácidos fortes.',
        '<p class="al-formula">SO₂ + ½ O₂ → SO₃ &nbsp;·&nbsp; SO₃ + H₂O → H₂SO₄</p>',
        'Aumente as emissões e veja a chuva e a estátua de mármore:'],
      after: ['O mármore e o calcário são <b>CaCO₃</b>, e o ácido os dissolve: <b>CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂</b>. Estátuas e prédios históricos perdem detalhes; lagos ficam ácidos demais para os peixes; o solo perde nutrientes.',
        'A solução é tirar o enxofre do combustível e usar filtros nas chaminés (que capturam o SO₂ com cal, uma base). Por isso o diesel vendido hoje tem bem menos enxofre do que antigamente.'],
      so: 'uma última história de química no céu, desta vez com final feliz: a <b>camada de ozônio</b>.',
      ch: mCh('Por que a chuva "normal" já tem pH 5,6, e não 7?', ['O CO₂ do ar se dissolve e forma ácido carbônico, fraco', 'Por causa da poluição', 'Porque a água da chuva tem sal', 'Por causa dos raios'], 'Até no ar mais limpo tem CO₂. Ele forma H₂CO₃, que deixa a chuva levemente ácida.'),
      how: 'Arraste a barra de emissões. Veja o pH da chuva cair e a estátua de mármore se desgastar com o tempo. ↺ restaura a estátua.',
      ui: { e: 'Emissões de SO₂/NO₂', reset: '↺ Estátua nova', ph: 'pH da chuva', h: 'H⁺', normal: 'o da chuva normal', st: 'Estátua desgastada', gone: '' },
    },
    en: {
      t: 'Acid rain: oxides that become acids',
      lead: 'Remember acidic oxides? They fall from the sky.',
      p: ['All rain is already a bit acidic (pH ≈ 5.6), because CO₂ in the air dissolves into carbonic acid, which is weak. Real <b>acid rain</b> comes from <b>sulfur and nitrogen oxides</b> (SO₂, NO₂), released by burning coal and diesel and by industry. They are <b>acidic oxides</b>: with water, they become strong acids.',
        '<p class="al-formula">SO₂ + ½ O₂ → SO₃ &nbsp;·&nbsp; SO₃ + H₂O → H₂SO₄</p>',
        'Raise the emissions and watch the rain and the marble statue:'],
      after: ['Marble and limestone are <b>CaCO₃</b>, and acid dissolves them: <b>CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂</b>. Statues and historic buildings lose detail; lakes get too acidic for fish; soil loses nutrients.',
        'The fix is to remove sulfur from fuel and use chimney scrubbers (which capture SO₂ with lime, a base). That is why diesel sold today has far less sulfur than it used to.'],
      so: 'one last story of chemistry in the sky, this time with a happy ending: the <b>ozone layer</b>.',
      ch: mCh('Why does "normal" rain already have pH 5.6, not 7?', ['CO₂ in the air dissolves into weak carbonic acid', 'Because of pollution', 'Because rainwater has salt', 'Because of lightning'], 'Even the cleanest air has CO₂. It forms H₂CO₃, which makes rain slightly acidic.'),
      how: 'Drag the emissions bar. Watch the rain pH drop and the marble statue wear away over time. ↺ restores the statue.',
      ui: { e: 'SO₂/NO₂ emissions', reset: '↺ New statue', ph: 'Rain pH', h: 'H⁺', normal: 'that of normal rain', st: 'Statue worn', gone: '' },
    } },

  { id: 'env-ozone', track: 'env', icon: '🛡️', m: 1,
    pt: {
      t: 'Camada de ozônio: um átomo de cloro, mil estragos',
      lead: 'Como um catalisador no lugar errado quase deixou a Terra sem filtro solar.',
      p: ['Lá no alto (15 a 35 km), o <b>ozônio (O₃)</b> absorve a radiação <b>ultravioleta</b> do Sol, a que causa queimaduras e câncer de pele. Os <b>CFCs</b> (gases de geladeiras e sprays antigos) sobem até lá, a luz UV quebra a molécula e solta um átomo de <b>cloro</b>. E esse cloro é um <b>catalisador</b>:',
        '<p class="al-formula">Cl + O₃ → ClO + O₂ &nbsp;·&nbsp; ClO + O → Cl + O₂</p>',
        'Repare: o Cl sai inteiro no final e começa tudo de novo. Solte alguns:'],
      after: ['Um único átomo de cloro pode destruir <b>milhares</b> de moléculas de ozônio antes de sair do ciclo. Nos anos 1980 apareceu um "buraco" na camada sobre a Antártida.',
        'O final feliz: o <b>Protocolo de Montreal</b> (1987) proibiu os CFCs no mundo todo, e a camada está se recuperando. A previsão é voltar ao nível dos anos 1980 por volta de 2066 na Antártida. É o exemplo de que entender a química permite consertar o estrago.'],
      so: 'até aqui, toda a química foi troca de elétrons. Agora vamos olhar para dentro do <b>núcleo</b>, onde um elemento vira outro.',
      ch: mCh('Por que um só átomo de cloro destrói tantas moléculas de ozônio?', ['Ele é um catalisador: sai inteiro no fim do ciclo e recomeça', 'Ele é muito grande', 'Ele explode', 'Ele vira ozônio também'], 'O Cl é regenerado a cada volta do ciclo, então continua destruindo O₃ por muito tempo.'),
      how: 'Toque em "Soltar um átomo de Cl" e veja ele subir e destruir o ozônio, um atrás do outro. Repare quanto UV (linhas roxas) passa a chegar ao chão.',
      ui: { cl: '☁️ Soltar um átomo de Cl', layer: 'camada de ozônio', start: 'A camada está inteira: quase nenhum UV chega ao chão.', m: '{c} átomo(s) de Cl já destruíram <b>{k}</b> moléculas de O₃, e continuam inteiros!' },
    },
    en: {
      t: 'The ozone layer: one chlorine atom, a thousand hits',
      lead: 'How a catalyst in the wrong place almost left Earth without sunscreen.',
      p: ['High up (15 to 35 km), <b>ozone (O₃)</b> absorbs the Sun\'s <b>ultraviolet</b> light, the kind that causes sunburn and skin cancer. <b>CFCs</b> (gases from old fridges and sprays) rise up there, UV breaks them and releases a <b>chlorine</b> atom. And that chlorine is a <b>catalyst</b>:',
        '<p class="al-formula">Cl + O₃ → ClO + O₂ &nbsp;·&nbsp; ClO + O → Cl + O₂</p>',
        'Notice: Cl comes out whole at the end and starts all over. Release a few:'],
      after: ['A single chlorine atom can destroy <b>thousands</b> of ozone molecules before leaving the cycle. In the 1980s a "hole" appeared in the layer over Antarctica.',
        'The happy ending: the <b>Montreal Protocol</b> (1987) banned CFCs worldwide, and the layer is recovering. It is expected to return to 1980s levels around 2066 over Antarctica. Proof that understanding chemistry lets us fix the damage.'],
      so: 'so far, all chemistry was electrons changing hands. Now let us look inside the <b>nucleus</b>, where one element turns into another.',
      ch: mCh('Why does a single chlorine atom destroy so many ozone molecules?', ['It is a catalyst: it comes out whole at the end of the cycle and starts again', 'It is very big', 'It explodes', 'It turns into ozone too'], 'Cl is regenerated each lap of the cycle, so it keeps destroying O₃ for a long time.'),
      how: 'Tap "Release a Cl atom" and watch it rise and destroy ozone, one after another. Notice how much UV (purple lines) starts reaching the ground.',
      ui: { cl: '☁️ Release a Cl atom', layer: 'ozone layer', start: 'The layer is whole: almost no UV reaches the ground.', m: '{c} Cl atom(s) have destroyed <b>{k}</b> O₃ molecules, and they are still whole!' },
    } },
);
