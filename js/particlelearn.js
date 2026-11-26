// Partes interativas das lições de particletext.js (o átomo quântico e a trilha de partículas).
// Usa o framework de fundlearn.js (FV, flLoop, flNum…).

const FP_COL = { r: '#ff4d4d', g: '#2fbf71', b: '#4f8dff' };
const FP_LCOL = ['#e0533b', '#e09a00', '#2f6fd6', '#8e44ad'];
const fpGauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2832 * v); };

/* o átomo quântico: nuvens de cada subnível */
FV.qatom = {
  html: U => `<div class="al-ctl"><label>${U.el}</label><button data-d="-1">−</button><select id="fqaZ">${alElOpts(Array.from({ length: 54 }, (_, i) => i + 1), 10)}</select><button data-d="1">+</button></div>
    <div class="fcl-wrap"><canvas id="fqaC" width="520" height="520"></canvas></div>
    <p class="fl-cap">${U.tap}</p><div class="al-chips fqa-chips" id="fqaS"></div><div class="fl-msg ok" id="fqaMsg"></div><p class="fl-cap">${U.sizes}</p>`,
  init(U, q) {
    const cv = q('#fqaC'), cx = cv.getContext('2d'), W = 520, C = W / 2;
    let subs = [], sel = -1, nmax = 1;
    const rad = (n, l) => nmax === 1 ? 95 : 42 + (n - 1 - 0.35 * l) * (190 / (nmax - 0.5));
    const conf = () => subs.map(([n, l, c]) => `${n}${FL_L[l]}${flSup(c)}`).join(' ');
    const msg = () => {
      if (sel < 0) { q('#fqaMsg').innerHTML = `${U.conf}: <b>${conf()}</b>`; return; }
      const [n, l, c] = subs[sel];
      q('#fqaMsg').innerHTML = U.info.replace('{s}', n + FL_L[l]).replace('{c}', c).replace('{o}', Math.min(2 * l + 1, c)).replace('{l}', FL_L[l]);
    };
    const chips = () => {
      q('#fqaS').innerHTML = `<button data-i="-1" class="${sel < 0 ? 'on' : ''}">${U.all}</button>` + subs.map(([n, l, c], i) => `<button data-i="${i}" class="${sel === i ? 'on' : ''}" style="--lc:${FP_LCOL[l]}">${n}${FL_L[l]}<sup>${c}</sup></button>`).join('');
      q('#fqaS').querySelectorAll('button').forEach(b => b.onclick = () => { sel = +b.dataset.i; chips(); msg(); cx.clearRect(0, 0, W, W); });
    };
    const load = () => { subs = flFill(+q('#fqaZ').value); nmax = Math.max(...subs.map(s => s[0])); sel = -1; cx.clearRect(0, 0, W, W); chips(); msg(); };
    q('#fqaZ').onchange = load;
    q('#fqaZ').closest('.al-ctl').querySelectorAll('button').forEach(b => b.onclick = () => { const s = q('#fqaZ'); s.value = flClamp(+s.value + +b.dataset.d, 1, 54); load(); });
    flLoop(() => {
      cx.globalAlpha = 1; cx.fillStyle = 'rgba(255,255,255,0.07)'; cx.fillRect(0, 0, W, W);
      subs.forEach(([n, l, c], i) => {
        const R = rad(n, l), sg = 4 + 2.2 * n, dim = sel >= 0 && sel !== i;
        cx.fillStyle = FP_LCOL[l]; cx.globalAlpha = dim ? 0.1 : 0.8;
        const k = Math.ceil(c * 5) + 8;
        for (let j = 0; j < k; j++) {
          const r = Math.abs(R + fpGauss() * sg), a = Math.random() * 6.2832;
          cx.fillRect(C + Math.cos(a) * r - 1.5, C + Math.sin(a) * r - 1.5, 3, 3);
        }
      });
      cx.globalAlpha = 1; cx.fillStyle = '#e53935'; cx.beginPath(); cx.arc(C, C, 5, 0, 6.2832); cx.fill();
    });
    load();
  },
};

/* zoom: da molécula ao quark */
FV.zoom = {
  html: U => `<div class="al-chips fz-lv" id="fzLv">${U.lv.map((l, i) => `<button data-i="${i}" class="${i ? '' : 'on'}">${l[0]}</button>`).join('')}</div>
    <svg viewBox="-150 -120 300 240" class="fl-svg" id="fzSvg"></svg>
    <div class="al-center"><button class="btn-w fl-sm" id="fzMinus">${U.minus}</button><button class="btn-y fl-sm" id="fzPlus">${U.plus}</button></div>
    <div class="fz-card" id="fzCard"></div>`,
  init(U, q) {
    let lv = 0, t0 = performance.now(), dir = 1;
    const defs = `<defs><radialGradient id="fzO"><stop offset="0" stop-color="#ff8a80"/><stop offset=".7" stop-color="#ff5252" stop-opacity=".55"/><stop offset="1" stop-color="#ff5252" stop-opacity="0"/></radialGradient>
      <radialGradient id="fzH"><stop offset="0" stop-color="#e3e3e3"/><stop offset=".7" stop-color="#bdbdbd" stop-opacity=".6"/><stop offset="1" stop-color="#bdbdbd" stop-opacity="0"/></radialGradient>
      <radialGradient id="fzE"><stop offset="0" stop-color="#4f8dff" stop-opacity=".55"/><stop offset=".6" stop-color="#4f8dff" stop-opacity=".25"/><stop offset="1" stop-color="#4f8dff" stop-opacity="0"/></radialGradient>
      <radialGradient id="fzP"><stop offset="0" stop-color="#ffd6e0"/><stop offset="1" stop-color="#ffb3c6" stop-opacity=".35"/></radialGradient></defs>`;
    const nuc = []; for (let i = 0; i < 16; i++) { const r = 17 * Math.sqrt(i + 0.3), a = i * 2.39996; nuc.push([Math.cos(a) * r, Math.sin(a) * r, [0, 3, 5, 6, 9, 10, 12, 15].includes(i)]); }
    const wav = (x1, y1, x2, y2, ph) => { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L; let d = ''; for (let i = 0; i <= 30; i++) { const s = i / 30, w = Math.sin(s * 6.2832 * 3 + ph) * 5; d += `${i ? 'L' : 'M'}${(x1 + dx * s + nx * w).toFixed(1)} ${(y1 + dy * s + ny * w).toFixed(1)}`; } return d; };
    const scene = (k, now) => {
      if (k === 0) return `<circle cx="0" cy="18" r="72" fill="url(#fzO)"/><circle cx="-66" cy="-34" r="44" fill="url(#fzH)"/><circle cx="66" cy="-34" r="44" fill="url(#fzH)"/>
        <text x="0" y="26" class="fz-big">O</text><text x="-66" y="-26" class="fz-big">H</text><text x="66" y="-26" class="fz-big">H</text>`;
      if (k === 1) return `<circle r="112" fill="url(#fzE)"/><circle r="1.6" fill="#e53935"/><line x1="4" y1="4" x2="52" y2="52" class="fl-dash"/><text x="56" y="66" class="fl-small l">${U.nuc}</text>`;
      if (k === 2) return nuc.map(([x, y, p]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" class="${p ? 'fl-pos' : 'fz-n'}"/>`).join('');
      if (k === 3) {
        const P = [[0, -48], [-44, 30], [44, 30]].map(([x, y], i) => [x + Math.sin(now / 300 + i * 2) * 6, y + Math.cos(now / 350 + i) * 6]);
        const g = [[0, 1], [1, 2], [2, 0]].map(([a, b]) => `<path d="${wav(P[a][0], P[a][1], P[b][0], P[b][1], now / 120)}" class="fz-glu"/>`).join('');
        return `<circle r="105" fill="url(#fzP)" class="fz-pb"/>${g}${P.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="15" fill="${['#ff4d4d', '#2fbf71', '#4f8dff'][i]}" stroke="#111" stroke-width="2.5"/><text x="${x}" y="${y + 5}" class="fz-q">${'uud'[i]}</text>`).join('')}`;
      }
      return `<circle cx="-72" r="56" class="fl-dash"/><circle cx="72" r="56" class="fl-dash"/><circle cx="-72" r="4" fill="#ff4d4d"/><circle cx="72" r="4" fill="#4f8dff"/><text x="-72" y="-14" class="fz-lbl">quark</text><text x="72" y="-14" class="fz-lbl">${LANG === 'pt' ? 'elétron' : 'electron'}</text><text x="0" y="88" class="fl-small">${U.pt}</text>`;
    };
    const set = k => {
      if (k < 0 || k > 4 || k === lv) return;
      dir = k > lv ? 1 : -1; lv = k; t0 = performance.now();
      q('#fzLv').querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.i === lv));
      const l = U.lv[lv];
      q('#fzCard').innerHTML = `<b>${l[0]}</b><span>${U.size}: <b>${l[1]}</b></span><p>${l[2]}</p>`;
      q('#fzMinus').disabled = lv === 0; q('#fzPlus').disabled = lv === 4;
    };
    q('#fzLv').querySelectorAll('button').forEach(b => b.onclick = () => set(+b.dataset.i));
    q('#fzMinus').onclick = () => set(lv - 1); q('#fzPlus').onclick = () => set(lv + 1);
    flLoop((dt, now) => {
      const p = Math.min(1, (now - t0) / 600), e = 1 - Math.pow(1 - p, 3), s = dir > 0 ? 0.15 + 0.85 * e : 3 - 2 * e;
      q('#fzSvg').innerHTML = `${defs}<g transform="scale(${s.toFixed(3)})" opacity="${Math.min(1, p * 1.6).toFixed(2)}">${scene(lv, now)}</g>`;
    });
    lv = -1; set(0); lv = 0;
  },
};

/* quarks: monte uma partícula */
const FP_Q = { u: [2, 2.2, 1], d: [-1, 4.7, 1], c: [2, 1270, 2], s: [-1, 95, 2], t: [2, 172700, 3], b: [-1, 4180, 3] };
const FP_BAR = { uud: ['p⁺', 938.3], udd: ['n⁰', 939.6], uuu: ['Δ⁺⁺', 1232], ddd: ['Δ⁻', 1232], uus: ['Σ⁺', 1189], uds: ['Λ⁰', 1116], dds: ['Σ⁻', 1197], uss: ['Ξ⁰', 1315], dss: ['Ξ⁻', 1322], sss: ['Ω⁻', 1672], udc: ['Λc⁺', 2286], uuc: ['Σc⁺⁺', 2454], ddc: ['Σc⁰', 2454], udb: ['Λb⁰', 5620] };
const fpFrac = t => t === 2 ? '+⅔' : '−⅓';
const fpMeV = m => m >= 1000 ? `${flNum(m / 1000, m >= 100000 ? 1 : 2)} GeV` : `${flNum(m, m < 10 ? 1 : 0)} MeV`;
FV.quarks = {
  html: U => `<div class="fqk-row"><span>${U.mine}:</span><div class="fqk-slots" id="fqkS"></div><button class="btn-w fl-sm" id="fqkC">${U.clear}</button></div>
    <div class="fqk-fl" id="fqkF"></div><div class="fl-msg" id="fqkMsg"></div>`,
  init(U, q) {
    let s = ['u', 'u', ''];
    const order = 'udscbt';
    q('#fqkF').innerHTML = Object.entries(FP_Q).map(([k, [c, m, g]]) => `<button data-k="${k}" class="fqk-b g${g}"><b>${k}</b><span>${fpFrac(c)}</span><small>${fpMeV(m)}</small><em>${LANG === 'pt' ? g + 'ª ' + U.gen : U.gen + ' ' + g}</em><i>${U.w[k]}</i></button>`).join('');
    const draw = () => {
      q('#fqkS').innerHTML = s.map((k, i) => `<button data-i="${i}" class="fqk-slot ${k ? 'g' + FP_Q[k][2] : ''}">${k || '?'}</button>`).join('');
      q('#fqkS').querySelectorAll('button').forEach(b => b.onclick = () => { s[+b.dataset.i] = ''; draw(); });
      const m = q('#fqkMsg');
      if (s.some(k => !k)) { m.className = 'fl-msg'; m.innerHTML = U.pick; return; }
      const sum = s.reduce((a, k) => a + FP_Q[k][0], 0), ch = sum % 3 ? `${sum > 0 ? '+' : '−'}${Math.abs(sum)}/3` : (sum > 0 ? '+' : sum < 0 ? '−' : '') + Math.abs(sum / 3);
      let out = `${U.charge}: ${s.map(k => fpFrac(FP_Q[k][0])).join(' ')} = <b>${ch}</b><br>`;
      const key = [...s].sort((a, b) => order.indexOf(a) - order.indexOf(b)).join(''), bar = FP_BAR[key];
      if (s.includes('t')) { m.className = 'fl-msg bad'; m.innerHTML = out + U.top; return; }
      m.className = 'fl-msg ok';
      if (bar) {
        const nm = key === 'uud' ? ` (${U.p})` : key === 'udd' ? ` (${U.n})` : '';
        const mq = s.reduce((a, k) => a + FP_Q[k][1], 0);
        out += `${U.known} <b>${bar[0]}${nm}</b> · ${key === 'uud' ? U.stable : key === 'udd' ? U.nfree : U.unstable}<br>${U.massq}: ${fpMeV(mq)} · ${U.massp}: ${fpMeV(bar[1])}`;
        if (mq / bar[1] < 0.5) out += `<br>${U.pct.replace('{x}', flNum(mq / bar[1] * 100, mq / bar[1] < 0.1 ? 1 : 0))}`;
      } else out += U.exotic;
      m.innerHTML = out;
    };
    q('#fqkF').querySelectorAll('button').forEach(b => b.onclick = () => { const i = s.indexOf(''); s[i < 0 ? 2 : i] = b.dataset.k; draw(); });
    q('#fqkC').onclick = () => { s = ['', '', '']; draw(); };
    draw();
  },
};

/* cor e confinamento */
FV.color = {
  html: U => `<p class="fco-h">${U.a}</p><svg viewBox="-130 -100 260 190" class="fl-svg fco-a" id="fcoA"></svg><div class="fl-msg" id="fcoMsg"></div>
    <p class="fco-h">${U.b}</p><svg viewBox="0 0 400 120" class="fl-svg" id="fcoB"></svg>
    <div class="al-ctl"><label>${U.pull}</label><input type="range" min="0" max="100" value="0" id="fcoD"></div>
    <div class="fl-meter"><span>${U.energy}</span><div><i id="fcoE"></i></div></div><div class="fl-msg" id="fcoMsg2"></div>`,
  init(U, q) {
    const K = ['r', 'g', 'b'], col = [0, 0, 2], pos = [[0, -62], [-56, 34], [56, 34]];
    const white = () => new Set(col).size === 3;
    const mix = () => { if (white()) return '#ffffff'; const rgb = [0, 0, 0]; col.forEach(c => { const h = FP_COL[K[c]]; [1, 3, 5].forEach((o, j) => rgb[j] += parseInt(h.substr(o, 2), 16) / 3); }); return `rgb(${rgb.map(Math.round).join(',')})`; };
    const msgA = () => { const w = white(); q('#fcoMsg').className = 'fl-msg ' + (w ? 'ok' : 'bad'); q('#fcoMsg').innerHTML = w ? U.white : U.notw; };
    q('#fcoA').onpointerdown = e => { const g = e.target.closest('[data-i]'); if (g) { col[+g.dataset.i] = (col[+g.dataset.i] + 1) % 3; msgA(); } };
    const msgB = () => { const d = +q('#fcoD').value; q('#fcoE').style.width = (d >= 85 ? 12 : d) + '%'; const m = q('#fcoMsg2'); m.className = 'fl-msg ' + (d >= 85 ? 'ok' : ''); m.innerHTML = d >= 85 ? U.snap : d > 8 ? U.stretch : U.rest; };
    q('#fcoD').oninput = msgB;
    const tube = (x1, x2, ph, y = 60) => { let d = ''; for (let i = 0; i <= 40; i++) { const x = x1 + (x2 - x1) * i / 40; d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${(y + Math.sin(i / 40 * (x2 - x1) / 9 + ph) * 4).toFixed(1)}`; } return `<path d="${d}" class="fco-tube"/>`; };
    const qk = (x, c, anti) => `<circle cx="${x}" cy="60" r="14" fill="${FP_COL[c]}" stroke="#111" stroke-width="2.5"/>${anti ? `<circle cx="${x}" cy="60" r="7" fill="#fff" stroke="#111" stroke-width="1.5"/>` : ''}<text x="${x}" y="${anti ? 88 : 88}" class="fl-small">${anti ? 'q̄' : 'q'}</text>`;
    flLoop((dt, now) => {
      const ph = now / 110, w = white();
      let a = `<circle r="24" fill="${mix()}" stroke="#111" stroke-width="2.5" class="${w ? 'fco-glow' : ''}"/>`;
      pos.forEach(([x, y], i) => { const dx = -x, dy = -y, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L; let d = ''; for (let j = 0; j <= 24; j++) { const s = j / 24 * 0.62, ww = Math.sin(j / 24 * 18 + ph) * 4; d += `${j ? 'L' : 'M'}${(x + dx * s + nx * ww).toFixed(1)} ${(y + dy * s + ny * ww).toFixed(1)}`; } a += `<path d="${d}" class="fz-glu"/>`; });
      pos.forEach(([x, y], i) => { a += `<g data-i="${i}" class="fco-q"><circle cx="${x}" cy="${y}" r="22" fill="${FP_COL[K[col[i]]]}" stroke="#111" stroke-width="2.5"/><text x="${x}" y="${y + 5}" class="fz-q">${'uud'[i]}</text></g>`; });
      q('#fcoA').innerHTML = a;
      const d = +q('#fcoD').value;
      if (d < 85) { const x1 = 170 - d * 1.3, x2 = 230 + d * 1.3; q('#fcoB').innerHTML = tube(x1, x2, ph) + qk(x1, 'r') + qk(x2, 'r', 1); }
      else { const sp = Math.sin(now / 90) * 2; q('#fcoB').innerHTML = tube(50, 110, ph) + tube(290, 350, ph) + qk(50, 'r') + qk(110, 'b', 1) + qk(290, 'b') + qk(350, 'r', 1) + `<text x="200" y="${66 + sp}" class="fco-boom">💥</text>`; }
    });
    msgA(); msgB();
  },
};

/* múons de raios cósmicos */
FV.leptons = {
  html: U => `<div class="al-chips" id="flpM"><button data-r="0">${U.no}</button><button data-r="1" class="on">${U.yes}</button></div>
    <svg viewBox="0 0 400 270" class="fl-svg flp-svg" id="flpSvg"></svg>
    <div class="flp-cnt" id="flpCnt"></div><div class="fl-msg" id="flpMsg"></div>`,
  init(U, q) {
    let rel = 1, mu = [], puff = [], arr = 0, dec = 0, acc = 0;
    const H = 215, Y0 = 30;
    const mode = r => { rel = r; mu = []; puff = []; arr = 0; dec = 0; q('#flpM').querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.r === r)); q('#flpMsg').className = 'fl-msg ' + (r ? 'ok' : 'bad'); q('#flpMsg').innerHTML = r ? U.yesMsg : U.noMsg; };
    q('#flpM').querySelectorAll('button').forEach(b => b.onclick = () => mode(+b.dataset.r));
    flLoop(dt => {
      acc += dt * 7;
      while (acc > 1) { acc--; const mean = (rel ? 10.4 : 0.66) / 15 * H; mu.push({ x: 25 + Math.random() * 350, y: Y0, life: -Math.log(1 - Math.random()) * mean, v: 75 + Math.random() * 10 }); }
      mu.forEach(m => { m.y += m.v * dt; });
      mu = mu.filter(m => {
        if (m.y - Y0 >= m.life) { dec++; puff.push({ x: m.x, y: m.y, t: 0, a: Math.random() * 6.28 }); return false; }
        if (m.y >= Y0 + H) { arr++; puff.push({ x: m.x, y: Y0 + H, t: 0, hit: 1 }); return false; }
        return true;
      });
      puff.forEach(p => p.t += dt); puff = puff.filter(p => p.t < 0.6);
      let s = `<rect x="0" y="0" width="400" height="${Y0}" class="flp-sky"/><text x="200" y="19" class="fl-small">${U.top}</text>
        <rect x="0" y="${Y0 + H}" width="400" height="${270 - Y0 - H}" class="flp-ground"/><text x="200" y="${Y0 + H + 17}" class="fl-small">${U.ground}</text>`;
      s += mu.map(m => `<line x1="${m.x}" y1="${m.y - 10}" x2="${m.x}" y2="${m.y}" class="flp-trail"/><circle cx="${m.x}" cy="${m.y}" r="4" class="flp-mu"/>`).join('');
      s += puff.map(p => p.hit ? `<circle cx="${p.x}" cy="${p.y}" r="${4 + p.t * 18}" class="flp-hit" opacity="${1 - p.t / 0.6}"/>` : `<circle cx="${p.x + Math.cos(p.a) * p.t * 40}" cy="${p.y + Math.sin(p.a) * p.t * 40}" r="2.5" class="fl-neg" opacity="${1 - p.t / 0.6}"/><circle cx="${p.x}" cy="${p.y}" r="${3 + p.t * 10}" class="flp-puff" opacity="${1 - p.t / 0.6}"/>`).join('');
      q('#flpSvg').innerHTML = s;
      const tot = arr + dec;
      q('#flpCnt').innerHTML = `<span>✅ <b>${flNum(arr)}</b> ${U.arr}</span><span>💨 <b>${flNum(dec)}</b> ${U.dec}</span><span><b>${tot ? flNum(arr / tot * 100, 1) : 0}%</b></span>`;
    });
    mode(1);
  },
};

/* decaimento beta e o neutrino */
FV.neutrino = {
  html: U => `<svg viewBox="-200 -100 400 200" class="fl-svg" id="fnuSvg"></svg>
    <div class="al-center"><button class="btn-y fl-sm" id="fnu1">${U.one}</button><button class="btn-w fl-sm" id="fnuM">${U.many}</button><button class="btn-w fl-sm" id="fnuR">${U.reset}</button></div>
    <div class="fl-msg" id="fnuMsg"></div><p class="fl-cap">${U.hist} (keV) · <span id="fnuN"></span></p><svg viewBox="0 0 400 140" class="fl-svg" id="fnuH"></svg>`,
  init(U, q) {
    const Q = 782, me = 511, NB = 26, f = T => Math.sqrt(T * T + 2 * T * me) * (Q - T) ** 2 * (T + me);
    let fmax = 0; for (let T = 0; T <= Q; T += 2) fmax = Math.max(fmax, f(T));
    const samp = () => { for (;;) { const T = Math.random() * Q; if (Math.random() * fmax < f(T)) return T; } };
    let bins = new Array(NB).fill(0), N = 0, t = -1, Te = 0, ae = 0, an = 0;
    const add = T => { bins[Math.min(NB - 1, Math.floor(T / Q * NB))]++; N++; };
    const hist = () => {
      const mx = Math.max(1, ...bins), bw = 360 / NB;
      q('#fnuH').innerHTML = bins.map((b, i) => `<rect x="${30 + i * bw + 1}" y="${115 - b / mx * 100}" width="${bw - 2}" height="${b / mx * 100}" class="fnu-bar"/>`).join('') +
        `<line x1="30" y1="115" x2="390" y2="115" class="fl-axis"/><text x="30" y="132" class="fl-small">0</text><text x="210" y="132" class="fl-small">391</text><text x="390" y="132" class="fl-small">782</text>`;
      q('#fnuN').textContent = `${flNum(N)} ${U.count}`;
    };
    const go = () => { Te = samp(); ae = (-45 + Math.random() * 30) * Math.PI / 180; an = (10 + Math.random() * 25) * Math.PI / 180; t = 0; add(Te); hist(); q('#fnuMsg').className = 'fl-msg ok'; q('#fnuMsg').innerHTML = `${U.e} <b>${flNum(Te)} keV</b> · ${U.nu} <b>${flNum(Q - Te)} keV</b> · ${U.tot}`; };
    q('#fnu1').onclick = go;
    q('#fnuM').onclick = () => { for (let i = 0; i < 199; i++) add(samp()); go(); };
    q('#fnuR').onclick = () => { bins.fill(0); N = 0; t = -1; hist(); q('#fnuMsg').className = 'fl-msg'; q('#fnuMsg').innerHTML = U.start; };
    const QP = [[0, -22], [-20, 13], [20, 13]], cxN = -110;
    flLoop((dt, now) => {
      if (t >= 0) t += dt;
      const changed = t >= 0.7, k = t < 0 ? 0 : t;
      const glow = t >= 0.35 && t < 0.7;
      let s = `<circle cx="${cxN}" r="48" class="${changed ? 'fnu-p' : 'fnu-n'}"/>`;
      QP.forEach(([x, y], i) => {
        const isD = i === 2, flav = isD && changed ? 'u' : ['u', 'd', 'd'][i];
        s += `<circle cx="${cxN + x}" cy="${y}" r="13" fill="${flav === 'u' ? '#ff8a65' : '#64b5f6'}" stroke="#111" stroke-width="2" class="${isD && glow ? 'fnu-glow' : ''}"/><text x="${cxN + x}" y="${y + 5}" class="fz-q">${flav}</text>`;
      });
      s += `<text x="${cxN}" y="72" class="fz-lbl">${changed ? U.p + ' (uud)' : U.n + ' (udd)'}</text>`;
      if (t >= 0.5 && t < 1.2) {
        const p = Math.min(1, (t - 0.5) / 0.5), x1 = cxN + 20, x2 = x1 + 110 * p;
        let d = ''; for (let i = 0; i <= 30; i++) { const x = x1 + (x2 - x1) * i / 30; d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${(13 + Math.sin(i * 1.1 + now / 60) * 5).toFixed(1)}`; }
        s += `<path d="${d}" class="fnu-w"/><text x="${x2 + 6}" y="0" class="fz-lbl l">W⁻</text>`;
      }
      if (t >= 1.0) {
        const p = Math.min(1, (t - 1.0) / 1.2), ox = cxN + 130, oy = 13;
        const de = (25 + 110 * Te / Q) * p, dn = (25 + 110 * (Q - Te) / Q) * p;
        const ex = ox + Math.cos(ae) * de, ey = oy + Math.sin(ae) * de, nx = ox + Math.cos(an) * dn, ny = oy + Math.sin(an) * dn;
        s += `<line x1="${ox}" y1="${oy}" x2="${ex}" y2="${ey}" class="fnu-te"/><line x1="${ox}" y1="${oy}" x2="${nx}" y2="${ny}" class="fnu-tn"/>
          <circle cx="${ex}" cy="${ey}" r="8" class="fl-neg"/><text x="${ex + 12}" y="${ey + 4}" class="fz-lbl l">e⁻</text>
          <circle cx="${nx}" cy="${ny}" r="7" class="fnu-nu"/><text x="${nx + 12}" y="${ny + 4}" class="fz-lbl l">ν̄ₑ</text>`;
      }
      q('#fnuSvg').innerHTML = s;
    });
    hist(); q('#fnuMsg').innerHTML = U.start;
  },
};

/* o Modelo Padrão */
const FP_SM = [
  ['u', 'u', 'q', 1, 1, '+⅔', 2.2], ['c', 'c', 'q', 1, 2, '+⅔', 1270], ['t', 't', 'q', 1, 3, '+⅔', 172700],
  ['d', 'd', 'q', 2, 1, '−⅓', 4.7], ['s', 's', 'q', 2, 2, '−⅓', 95], ['b', 'b', 'q', 2, 3, '−⅓', 4180],
  ['e', 'e⁻', 'l', 3, 1, '−1', 0.511], ['mu', 'μ⁻', 'l', 3, 2, '−1', 105.7], ['tau', 'τ⁻', 'l', 3, 3, '−1', 1777],
  ['ve', 'νₑ', 'n', 4, 1, '0', -1], ['vm', 'ν<sub>μ</sub>', 'n', 4, 2, '0', -1], ['vt', 'ν<sub>τ</sub>', 'n', 4, 3, '0', -1],
  ['g', 'g', 'f', 1, 4, '0', 0], ['ga', 'γ', 'f', 2, 4, '0', 0], ['Z', 'Z⁰', 'f', 3, 4, '0', 91188], ['W', 'W<sup>±</sup>', 'f', 4, 4, '±1', 80377], ['H', 'H', 'h', 1, 5, '0', 125100],
];
const FP_FORCE = {
  em: ['u', 'c', 't', 'd', 's', 'b', 'e', 'mu', 'tau', 'W'],
  strong: ['u', 'c', 't', 'd', 's', 'b', 'g'],
  weak: ['u', 'c', 't', 'd', 's', 'b', 'e', 'mu', 'tau', 've', 'vm', 'vt', 'W', 'Z', 'H'],
  higgs: ['u', 'c', 't', 'd', 's', 'b', 'e', 'mu', 'tau', 'W', 'Z', 'H'],
};
FV.model = {
  html: U => `<div class="al-chips" id="fsmF">${Object.entries(U.f).map(([k, v]) => `<button data-f="${k}" class="${k === 'all' ? 'on' : ''}">${v}</button>`).join('')}</div>
    <div class="fsm-grid" id="fsmG"></div><div class="fsm-info" id="fsmI"></div>`,
  init(U, q) {
    let force = 'all', cur = 'e';
    const ms = m => m < 0 ? '< 1 eV' : m === 0 ? '0' : fpMeV(m);
    const grid = () => {
      const hl = force === 'all' ? null : FP_FORCE[force];
      q('#fsmG').innerHTML = U.cols.map((c, i) => `<span class="fsm-col" style="grid-column:${i + 1};grid-row:1">${c}</span>`).join('') +
        FP_SM.map(([k, sym, ty, r, c, ch, m]) => `<button data-k="${k}" class="fsm-c ${ty} ${hl && !hl.includes(k) ? 'off' : ''} ${k === cur ? 'on' : ''}" style="grid-row:${r + 1};grid-column:${c}"><small>${ch}</small><b>${sym}</b><span>${U.nm[k].replace(/^(quark|bóson)( de)? /, '').replace(/ (quark|boson)$/, '')}</span></button>`).join('');
      q('#fsmG').querySelectorAll('.fsm-c').forEach(b => b.onclick = () => { cur = b.dataset.k; grid(); info(); });
    };
    const info = () => {
      const [k, sym, ty, , c, ch, m] = FP_SM.find(p => p[0] === cur);
      const feels = ['em', 'strong', 'weak'].filter(f => FP_FORCE[f].includes(k)).map(f => U.fs[f]);
      q('#fsmI').innerHTML = `<div class="fsm-c big ${ty}"><small>${ch}</small><b>${sym}</b></div><div><h4>${U.nm[k]}</h4>
        <p>${U.charge}: <b>${ch}</b> · ${U.mass}: <b>${ms(m)}</b> · ${c <= 3 ? U.gens[c - 1] : k === 'H' ? U.hig : U.force}</p>
        <p>${U.feels}: ${feels.length ? feels.join(', ') : U.none}</p><p><b>${U.where}:</b> ${U.w[k]}</p></div>`;
    };
    q('#fsmF').querySelectorAll('button').forEach(b => b.onclick = () => { force = b.dataset.f; q('#fsmF').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); grid(); });
    grid(); info();
  },
};
