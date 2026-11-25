'use strict';
// CheMaster Lab · Criar Átomo: simulação em tela cheia.
// Puxe prótons, nêutrons e elétrons das caixinhas, agarre e arremesse partículas,
// pause para montar com calma. Núcleos impossíveis explodem; radioativos decaem sozinhos.
// Usa ELEMENTS / CATS (data.js) e nucInfo, nucleusLayout, shellsOf, isoName... (nuclear.js).
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const store = {
    get() { try { return JSON.parse(localStorage.getItem('chemaster')) || {}; } catch (e) { return {}; } },
    set(d) { try { localStorage.setItem('chemaster', JSON.stringify(d)); } catch (e) {} },
  };
  let LANG = store.get().lang || 'en';

  /* ---------- textos ---------- */
  const TX = {
    pt: {
      doc: 'CheMaster Lab · Criar Átomo', title: 'Criar Átomo',
      bins: { p: ['Prótons', 'carga +'], n: ['Nêutrons', 'sem carga'], e: ['Elétrons', 'carga −'] },
      hint: 'Puxe das caixinhas e solte no átomo · agarre e arremesse qualquer partícula · solte numa caixinha para jogar fora',
      pause: 'Pausar (espaço)', play: 'Continuar (espaço)', reset: 'Recomeçar (R)', paused: '⏸ Simulação pausada: monte com calma',
      empty: 'Puxe um <b>próton</b> para o meio da tela para começar um átomo.',
      onlyN: 'Só nêutrons não formam átomo: sem prótons, não existe elemento.',
      stats: ['Z', 'N', 'A', 'carga'],
      kinds: { stable: '✅ estável', radio: '☢️ radioativo', unbound: '💥 instável demais' },
      neutral: 'neutro', cation: 'cátion', anion: 'ânion',
      boomIn: 'vai explodir…',
      stable: n => `✅ <b>${n}</b> é estável!`,
      radio: (n, h, d) => `☢️ <b>${n}</b> é radioativo (${h}). Na vida real demora; aqui o tempo está acelerado: espere ele decair por ${d}.`,
      halfOf: h => `meia-vida de ${h}`, halfShort: 'meia-vida curta',
      boom: { few: n => `💥 <b>${n}</b> não existe: nêutrons de menos para segurar os prótons se repelindo!`, many: n => `💥 <b>${n}</b> não existe: nêutrons demais, eles escapam na hora!`, split: n => `💥 <b>${n}</b> se partiu em dois hélios-4!` },
      decayed: { 'b-': 'β⁻: um nêutron virou próton e um elétron saiu disparado do núcleo.', 'b+': 'β⁺: um próton virou nêutron e saiu um pósitron.', a: 'α: saiu um pacote de 2 prótons + 2 nêutrons.' },
      nowIs: n => ` Agora é <b>${n}</b>!`,
      dl: { a: 'alfa (α)', 'b-': 'beta menos (β⁻)', 'b+': 'beta mais (β⁺)' },
      limit: 'O simulador vai até 20 prótons, 30 nêutrons e 24 elétrons.',
      tip: '💡 Dica: pause (espaço) para montar sem o núcleo explodir no meio do caminho.',
      missions: '🎯 Missões', done: (a, b) => `${a}/${b}`, mDone: m => `🎉 Missão cumprida: <b>${m}</b>`,
    },
    en: {
      doc: 'CheMaster Lab · Build an Atom', title: 'Build an Atom',
      bins: { p: ['Protons', 'charge +'], n: ['Neutrons', 'no charge'], e: ['Electrons', 'charge −'] },
      hint: 'Pull from the boxes and drop on the atom · grab and throw any particle · drop on a box to throw it away',
      pause: 'Pause (space)', play: 'Resume (space)', reset: 'Start over (R)', paused: '⏸ Simulation paused: build calmly',
      empty: 'Drag a <b>proton</b> to the middle of the screen to start an atom.',
      onlyN: 'Neutrons alone do not make an atom: no protons, no element.',
      stats: ['Z', 'N', 'A', 'charge'],
      kinds: { stable: '✅ stable', radio: '☢️ radioactive', unbound: '💥 too unstable' },
      neutral: 'neutral', cation: 'cation', anion: 'anion',
      boomIn: 'about to blow…',
      stable: n => `✅ <b>${n}</b> is stable!`,
      radio: (n, h, d) => `☢️ <b>${n}</b> is radioactive (${h}). In real life it takes a while; here time is sped up: wait for it to decay by ${d}.`,
      halfOf: h => `half-life of ${h}`, halfShort: 'short half-life',
      boom: { few: n => `💥 <b>${n}</b> can't exist: too few neutrons to hold the repelling protons!`, many: n => `💥 <b>${n}</b> can't exist: too many neutrons, they escape instantly!`, split: n => `💥 <b>${n}</b> split into two helium-4 nuclei!` },
      decayed: { 'b-': 'β⁻: a neutron turned into a proton and an electron shot out of the nucleus.', 'b+': 'β⁺: a proton turned into a neutron and a positron came out.', a: 'α: a packet of 2 protons + 2 neutrons left.' },
      nowIs: n => ` Now it is <b>${n}</b>!`,
      dl: { a: 'alpha (α)', 'b-': 'beta minus (β⁻)', 'b+': 'beta plus (β⁺)' },
      limit: 'The simulator goes up to 20 protons, 30 neutrons and 24 electrons.',
      tip: '💡 Tip: pause (space) to build without the nucleus blowing up halfway.',
      missions: '🎯 Missions', done: (a, b) => `${a}/${b}`, mDone: m => `🎉 Mission complete: <b>${m}</b>`,
    },
  };
  const tx = (k, ...a) => { const v = TX[LANG][k]; return typeof v === 'function' ? v(...a) : v; };

  const MISSIONS = [
    { id: 'h', pt: 'Monte um hidrogênio comum (neutro)', en: 'Build an ordinary hydrogen atom (neutral)', ok: c => c.p === 1 && c.n === 0 && c.e === 1 && c.kind === 'stable' },
    { id: 'd', pt: 'Monte o deutério (hidrogênio pesado)', en: 'Build deuterium (heavy hydrogen)', ok: c => c.p === 1 && c.n === 1 && c.e === 1 && c.kind === 'stable' },
    { id: 'he', pt: 'Monte um hélio-4 neutro', en: 'Build a neutral helium-4', ok: c => c.p === 2 && c.n === 2 && c.e === 2 && c.kind === 'stable' },
    { id: 'c12', pt: 'Monte um carbono-12 neutro', en: 'Build a neutral carbon-12', ok: c => c.p === 6 && c.n === 6 && c.e === 6 && c.kind === 'stable' },
    { id: 'na', pt: 'Monte um íon Na⁺ estável', en: 'Build a stable Na⁺ ion', ok: c => c.p === 11 && c.e === 10 && c.kind === 'stable' },
    { id: 'cl', pt: 'Monte um íon Cl⁻ estável', en: 'Build a stable Cl⁻ ion', ok: c => c.p === 17 && c.e === 18 && c.kind === 'stable' },
    { id: 'o', pt: 'Monte um íon O²⁻ estável', en: 'Build a stable O²⁻ ion', ok: c => c.p === 8 && c.e === 10 && c.kind === 'stable' },
    { id: 'c14', pt: 'Veja um carbono-14 decair', en: 'Watch a carbon-14 decay', ok: (c, ev) => ev && ev.type === 'decay' && ev.z === 6 && ev.a === 14 },
    { id: 'c7', pt: 'Tente montar o carbono-7 💥', en: 'Try to build carbon-7 💥', ok: (c, ev) => ev && ev.type === 'boom' && ev.z === 6 && ev.a === 7 },
    { id: 'chain', pt: 'Veja um átomo decair 2 vezes seguidas', en: 'Watch an atom decay 2 times in a row', ok: (c, ev) => ev && ev.type === 'decay' && ev.chain >= 2 },
  ];
  const MAX = { p: 20, n: 30, e: 24 };
  const COL = { p: '#ff6b6b', n: '#d9d4c7', e: '#4f8dff', pos: '#ffb238' };
  const INK = '#111';

  /* ---------- estado ---------- */
  const cv = $('#sim'), ctx = cv.getContext('2d');
  let W = 0, H = 0, DPR = 1, CX = 0, CY = 0, U = 1;
  let parts = [];             // { t, x, y, vx, vy, st: free|nuc|orb|held|emit, life, flash }
  let paused = false, simT = 0, last = performance.now();
  let held = null, ptr = { x: 0, y: 0, hist: [] };
  const N = { key: '', kind: 'empty', since: 0, decayIn: 0, chain: 0, shake: 0, decay: null };
  const fx = [];              // efeitos: anéis de explosão etc.

  const rN = () => 13 * U, rE = () => 7.5 * U;
  const radiusOf = p => p.t === 'e' || p.t === 'pos' ? rE() : rN();
  const count = () => {
    const c = { p: 0, n: 0, e: 0 };
    for (const q of parts) { if (q.st === 'nuc') c[q.t]++; else if (q.st === 'orb') c.e++; }
    return c;
  };
  const nucRadius = c => rN() * (0.92 * Math.sqrt(Math.max(1, c.p + c.n)) + 0.6);
  const shellR = (c, i) => nucRadius(c) + (42 + i * 34) * U;

  /* ---------- tela ---------- */
  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    // área livre: entre a barra de cima, a doca de baixo e o painel
    const dock = $('#dock').getBoundingClientRect(), panel = $('#panel').getBoundingClientRect();
    const mobile = W <= 760;
    const top = 64, bottom = (mobile ? Math.min(dock.top, panel.top || dock.top) : dock.top) - 10;
    const left = 12, right = mobile ? W - 12 : panel.left - 12;
    CX = (left + right) / 2; CY = (top + bottom) / 2;
    U = Math.max(0.55, Math.min(1.25, Math.min(right - left, bottom - top) / 560));
  }

  /* ---------- partículas ---------- */
  function add(t, x, y, st = 'free') {
    const c = count();
    if (st === 'nuc' && c[t] >= MAX[t]) { log(tx('limit')); return null; }
    if (st === 'orb' && c.e >= MAX.e) { log(tx('limit')); return null; }
    const q = { t, x, y, vx: 0, vy: 0, st, life: 1, flash: 0, ang: Math.random() * 6.28 };
    parts.push(q);
    return q;
  }
  // decide onde a partícula solta vai parar
  function settle(q, throwV) {
    const c = count(), d = Math.hypot(q.x - CX, q.y - CY);
    const nucZone = Math.max(nucRadius(c), 26 * U) + 26 * U;
    if (q.t !== 'e') {
      if (d < nucZone && c[q.t] < MAX[q.t]) { q.st = 'nuc'; q.vx = q.vy = 0; return; }
    } else {
      const outer = shellR(c, Math.max(0, shellsOf(c.e + 1).length - 1)) + 30 * U;
      if (c.p + c.n > 0 && d < outer && c.e < MAX.e) { q.st = 'orb'; return; }
    }
    if (q.t !== 'e' && d < nucZone) log(tx('limit'));
    q.st = 'free'; q.vx = throwV.x; q.vy = throwV.y;
  }

  /* ---------- registro de mensagens ---------- */
  function log(html, cls = '') {
    const box = $('#log');
    const el = document.createElement('div');
    el.className = `sim-msg ${cls}`; el.innerHTML = html;
    box.prepend(el);
    while (box.children.length > 3) box.lastChild.remove();
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 500); }, 7000);
  }

  /* ---------- missões ---------- */
  const missionsDone = () => store.get().labMissions || [];
  function checkMissions(c, ev) {
    const done = missionsDone(); let changed = false;
    for (const m of MISSIONS) if (!done.includes(m.id) && m.ok(c, ev)) { done.push(m.id); changed = true; log(tx('mDone', m[LANG] || m.pt), 'mission'); }
    if (changed) { const d = store.get(); d.labMissions = done; store.set(d); renderMissions(); }
  }
  function renderMissions() {
    const done = missionsDone(), el = $('#missions');
    const open = el.open;
    el.innerHTML = `<summary>${tx('missions')} <small>${tx('done', done.length, MISSIONS.length)}</small></summary>
      <ul>${MISSIONS.map(m => `<li class="${done.includes(m.id) ? 'ok' : ''}">${done.includes(m.id) ? '✅' : '⬜'} ${m[LANG] || m.pt}</li>`).join('')}</ul>`;
    el.open = open;
  }

  /* ---------- núcleo: estabilidade, explosão e decaimento ---------- */
  function evaluate() {
    const c = count(), key = `${c.p}-${c.n}-${c.e}`;
    if (key === N.key) return;
    const nucChanged = N.key.split('-').slice(0, 2).join('-') !== `${c.p}-${c.n}`;
    N.key = key;
    const info = c.p ? nucInfo(c.p, c.p + c.n) : { kind: c.n ? 'neutron' : 'empty' };
    if (nucChanged) {
      N.kind = info.kind; N.since = 0; N.decay = info.decay || null;
      N.decayIn = info.kind === 'radio' ? 2.5 + -Math.log(1 - Math.random()) * 5 : 0;
      const name = c.p ? isoName(c.p, c.p + c.n, LANG) : '';
      // pausado: monta em silêncio; ao continuar, mostra só o resultado final
      if (paused) { /* nada */ }
      else if (info.kind === 'stable') log(tx('stable', name), 'stable');
      else if (info.kind === 'radio') {
        const h = info.half ? tx('halfOf', info.half[LANG === 'pt' ? 0 : 1]) : tx('halfShort');
        log(tx('radio', name, h, tx('dl')[info.decay]), 'radio');
      }
    }
    panel();
    checkMissions({ ...c, kind: info.kind }, null);
  }

  function explode(c) {
    const name = isoName(c.p, c.p + c.n, LANG), why = nucInfo(c.p, c.p + c.n).why || 'few';
    for (const q of parts) {
      if (q.st !== 'nuc' && q.st !== 'orb') continue;
      const a = Math.atan2(q.y - CY, q.x - CX) + (Math.random() - 0.5) * 0.6;
      const v = (q.st === 'nuc' ? 520 : 360) * U * (0.7 + Math.random() * 0.6);
      q.st = 'free'; q.vx = Math.cos(a) * v; q.vy = Math.sin(a) * v;
    }
    fx.push({ kind: 'boom', x: CX, y: CY, t: 0 });
    log(tx('boom')[why](name), 'boom');
    checkMissions(c, { type: 'boom', z: c.p, a: c.p + c.n });
    N.chain = 0;
    evaluate();
  }

  function decay() {
    const c = count(), mode = N.decay, from = { z: c.p, a: c.p + c.n };
    const nucs = parts.filter(q => q.st === 'nuc');
    const pick = t => nucs.filter(q => q.t === t).sort((a, b) => Math.hypot(b.x - CX, b.y - CY) - Math.hypot(a.x - CX, a.y - CY))[0];
    const ang = Math.random() * Math.PI * 2, out = (v) => ({ vx: Math.cos(ang) * v * U, vy: Math.sin(ang) * v * U });
    if (mode === 'b-' || mode === 'b+') {
      const q = pick(mode === 'b-' ? 'n' : 'p');
      if (!q) return;
      q.t = mode === 'b-' ? 'p' : 'n'; q.flash = 1;
      const em = add(mode === 'b-' ? 'e' : 'pos', CX, CY, 'emit');
      Object.assign(em, out(620), { life: 1 });
    } else if (mode === 'a') {
      const four = [pick('p'), pick('n')];
      const rest = nucs.filter(q => !four.includes(q));
      four.push(rest.find(q => q.t === 'p'), rest.find(q => q.t === 'n' && q !== four[1]));
      four.filter(Boolean).forEach((q, i) => Object.assign(q, { st: 'emit', life: 1, x: CX + (i % 2) * 10 * U, y: CY + (i > 1) * 10 * U }, out(480)));
    }
    fx.push({ kind: 'flash', x: CX, y: CY, t: 0 });
    N.chain++;
    const to = decayTo(from.z, from.a, mode);
    log(tx('decayed')[mode] + (to.z >= 1 ? tx('nowIs', isoName(to.z, to.a, LANG)) : ''), 'radio');
    N.key = ''; // força reavaliar
    const chain = N.chain;
    evaluate();
    N.chain = chain;
    checkMissions(count(), { type: 'decay', z: from.z, a: from.a, chain: N.chain });
  }

  /* ---------- painel ---------- */
  function panel() {
    const c = count(), q = c.p - c.e;
    let h;
    if (!c.p) h = `<div class="sp-empty">${c.n ? tx('onlyN') : tx('empty')}</div>`;
    else {
      const el = ELEMENTS[c.p - 1], A = c.p + c.n, info = nucInfo(c.p, A);
      const ion = q === 0 ? tx('neutral') : q > 0 ? tx('cation') : tx('anion');
      h = `<div class="sp-head"><div class="sp-tile" style="--c:${CATS[el.cat].color}"><span class="a">${A}</span><span class="z">${c.p}</span>${el.sym}${q ? `<span class="q">${chargeTxt(q)}</span>` : ''}</div>
        <div><div class="sp-name">${isoName(c.p, A, LANG)}</div><div class="sp-chips">
          <span class="sp-chip ${info.kind}">${tx('kinds')[info.kind] || ''}</span>
          <span class="sp-chip ${q > 0 ? 'pos' : q < 0 ? 'neg' : ''}">${ion}${q ? ` ${el.sym}${chargeTxt(q)}` : ''}</span></div></div></div>
        ${info.kind === 'unbound' && !paused ? `<div class="sp-bar"><i id="boomBar" style="width:0"></i></div>` : ''}`;
    }
    const stats = [c.p, c.n, c.p + c.n, q > 0 ? '+' + q : q];
    $('#panel').innerHTML = h + `<div class="sp-stats">${stats.map((v, i) => `<div><b>${v}</b><small>${tx('stats')[i]}</small></div>`).join('')}</div>`;
  }

  /* ---------- simulação ---------- */
  const BOOM_AFTER = 2.4;
  function step(dt) {
    const c = count();
    if (!paused) simT += dt;
    // posições-alvo do núcleo (girassol) e das camadas
    const slots = nucleusLayout(c.p, c.n, rN());
    const byType = { p: slots.filter(s => s.t === 'p'), n: slots.filter(s => s.t === 'n') };
    const idx = { p: 0, n: 0 };
    const shake = N.kind === 'unbound' ? (paused ? 1.5 : 2 + 10 * Math.min(1, N.since / BOOM_AFTER)) : N.kind === 'radio' ? 1.2 : 0.4;
    const shells = shellsOf(c.e);
    let ei = 0;
    const eSorted = parts.filter(q => q.st === 'orb');
    for (const q of parts) {
      if (q.st === 'nuc') {
        const s = byType[q.t][idx[q.t]++] || { x: 0, y: 0 };
        const j = paused ? 0 : shake * U;
        const tx_ = CX + s.x + (Math.random() - 0.5) * j, ty = CY + s.y + (Math.random() - 0.5) * j;
        q.x += (tx_ - q.x) * Math.min(1, dt * 12); q.y += (ty - q.y) * Math.min(1, dt * 12);
      } else if (q.st === 'free' || q.st === 'emit') {
        if (!paused || q.st === 'emit') {
          q.x += q.vx * dt; q.y += q.vy * dt;
          const damp = q.st === 'emit' ? 1 : Math.pow(0.35, dt);
          q.vx *= damp; q.vy *= damp;
          if (q.st === 'free') {
            q.vx += (Math.random() - 0.5) * 12 * dt * U; q.vy += (Math.random() - 0.5) * 12 * dt * U;
            const r = radiusOf(q);
            if (q.x < r) { q.x = r; q.vx = Math.abs(q.vx); } if (q.x > W - r) { q.x = W - r; q.vx = -Math.abs(q.vx); }
            if (q.y < r) { q.y = r; q.vy = Math.abs(q.vy); } if (q.y > H - r) { q.y = H - r; q.vy = -Math.abs(q.vy); }
          } else q.life -= dt * 0.8;
        }
      }
      if (q.flash > 0) q.flash -= dt * 1.5;
    }
    // elétrons nas camadas
    let k = 0;
    shells.forEach((cnt, si) => {
      const R = shellR(c, si), speed = (0.9 - si * 0.18) * (paused ? 0 : 1);
      for (let j = 0; j < cnt; j++, k++) {
        const q = eSorted[k]; if (!q) continue;
        const a = (j / cnt) * Math.PI * 2 + si * 0.7 + simT * speed;
        const tx_ = CX + R * Math.cos(a), ty = CY + R * Math.sin(a);
        q.x += (tx_ - q.x) * Math.min(1, dt * 8); q.y += (ty - q.y) * Math.min(1, dt * 8);
      }
    });
    parts = parts.filter(q => q.st !== 'emit' || q.life > 0);
    // partícula solta que encosta no núcleo é capturada
    if (!paused && c.p + c.n > 0) {
      for (const q of parts) {
        if (q.st !== 'free' || q.t === 'pos') continue;
        const d = Math.hypot(q.x - CX, q.y - CY), sp = Math.hypot(q.vx, q.vy);
        if (q.t !== 'e' && d < nucRadius(c) + 4 * U && sp < 260 * U && c[q.t] < MAX[q.t]) q.st = 'nuc';
        if (q.t === 'e' && d < shellR(c, shells.length) + 6 * U && d > nucRadius(c) && sp < 220 * U && c.e < MAX.e) q.st = 'orb';
      }
    }
    evaluate();
    // relógios do núcleo
    if (!paused && c.p) {
      if (N.kind === 'unbound') {
        N.since += dt;
        const bar = $('#boomBar'); if (bar) bar.style.width = Math.min(100, 100 * N.since / BOOM_AFTER) + '%';
        if (N.since >= BOOM_AFTER) explode(count());
      } else if (N.kind === 'radio') {
        N.decayIn -= dt;
        if (N.decayIn <= 0) decay();
      }
    }
    for (const f of fx) f.t += dt;
    for (let i = fx.length - 1; i >= 0; i--) if (fx[i].t > 1) fx.splice(i, 1);
  }

  /* ---------- desenho ---------- */
  function circle(x, y, r, fill, stroke = INK, lw = 2) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.stroke();
  }
  function drawParticle(q, alpha = 1) {
    const r = radiusOf(q);
    ctx.globalAlpha = alpha;
    if (q.flash > 0) circle(q.x, q.y, r + 8 * U * q.flash, 'rgba(255,240,120,.8)', 'transparent', 0);
    circle(q.x, q.y, r, COL[q.t], INK, Math.max(1.5, 2 * U));
    const sign = q.t === 'p' ? '+' : q.t === 'e' ? '−' : q.t === 'pos' ? '+' : '';
    if (sign) {
      ctx.fillStyle = '#fff'; ctx.font = `900 ${Math.round((q.t === 'p' ? 15 : 11) * U)}px Montserrat, sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(sign, q.x, q.y + 0.5);
    }
    ctx.globalAlpha = 1;
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const c = count(), shells = shellsOf(c.e);
    // camadas
    ctx.setLineDash([5 * U, 6 * U]); ctx.lineWidth = 1.5;
    const nShow = c.p + c.n > 0 ? Math.min(4, shells.length + 1) : 0;
    for (let i = 0; i < nShow; i++) {
      ctx.beginPath(); ctx.arc(CX, CY, shellR(c, i), 0, Math.PI * 2);
      ctx.strokeStyle = i < shells.length ? '#9aa6c2' : '#dcd8cb'; ctx.stroke();
    }
    ctx.setLineDash([]);
    // alvo de onde soltar (quando segurando algo)
    const nr = Math.max(nucRadius(c), 26 * U);
    if (!c.p && !c.n || (held && held.t !== 'e')) {
      ctx.setLineDash([6, 5]); ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(CX, CY, nr + (held ? 26 * U : 0), 0, Math.PI * 2);
      ctx.strokeStyle = held ? '#86d81c' : '#b9b4a6'; ctx.stroke(); ctx.setLineDash([]);
    }
    if (held && held.t === 'e' && c.p + c.n > 0) {
      ctx.lineWidth = 10 * U; ctx.strokeStyle = 'rgba(79,141,255,.18)';
      ctx.beginPath(); ctx.arc(CX, CY, shellR(c, Math.max(0, shellsOf(c.e + 1).length - 1)), 0, Math.PI * 2); ctx.stroke();
    }
    // brilho de radioativo / perigo
    if (c.p && N.kind === 'radio') {
      const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, nr * 2.2);
      const pulse = 0.35 + 0.15 * Math.sin(simT * 5);
      g.addColorStop(0, `rgba(255,216,77,${pulse})`); g.addColorStop(1, 'rgba(255,216,77,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, nr * 2.2, 0, Math.PI * 2); ctx.fill();
    } else if (c.p && N.kind === 'unbound') {
      const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, nr * 2.2);
      g.addColorStop(0, `rgba(255,91,91,${0.25 + 0.35 * Math.min(1, N.since / BOOM_AFTER)})`); g.addColorStop(1, 'rgba(255,91,91,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, nr * 2.2, 0, Math.PI * 2); ctx.fill();
    }
    if (!c.p && !c.n) {
      ctx.fillStyle = '#a19c8e'; ctx.font = `800 ${Math.round(12 * U)}px Montserrat, sans-serif`; ctx.textAlign = 'center';
      ctx.fillText(LANG === 'pt' ? 'núcleo' : 'nucleus', CX, CY + 4);
    }
    // partículas: núcleo de fora para dentro, depois o resto
    const nuc = parts.filter(q => q.st === 'nuc').sort((a, b) => Math.hypot(b.x - CX, b.y - CY) - Math.hypot(a.x - CX, a.y - CY));
    for (const q of nuc) drawParticle(q);
    for (const q of parts) if (q.st === 'orb' || q.st === 'free') drawParticle(q);
    for (const q of parts) if (q.st === 'emit') drawParticle(q, Math.max(0, q.life));
    // efeitos
    for (const f of fx) {
      const k = f.t;
      if (f.kind === 'boom') {
        ctx.lineWidth = 6 * (1 - k); ctx.strokeStyle = `rgba(255,91,91,${1 - k})`;
        ctx.beginPath(); ctx.arc(f.x, f.y, 30 + k * 260 * U, 0, Math.PI * 2); ctx.stroke();
        ctx.font = `${Math.round(90 * U * (0.6 + k))}px sans-serif`; ctx.globalAlpha = Math.max(0, 1 - k * 1.2);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('💥', f.x, f.y); ctx.globalAlpha = 1;
      } else {
        ctx.lineWidth = 4 * (1 - k); ctx.strokeStyle = `rgba(255,216,77,${1 - k})`;
        ctx.beginPath(); ctx.arc(f.x, f.y, 20 + k * 160 * U, 0, Math.PI * 2); ctx.stroke();
      }
    }
    if (held) {
      ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 6;
      drawParticle(held); ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    }
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    step(dt); draw();
    requestAnimationFrame(frame);
  }

  /* ---------- mouse / dedo ---------- */
  function pickAt(x, y) {
    let best = null, bd = Infinity;
    for (const q of parts) {
      if (q.st === 'emit') continue;
      const d = Math.hypot(q.x - x, q.y - y), r = radiusOf(q) + 6;
      // elétrons ganham na disputa (ficam por cima e são menores)
      const score = d - (q.st === 'orb' || q.t === 'e' ? 4 : 0);
      if (d < r && score < bd) { best = q; bd = score; }
    }
    return best;
  }
  function overBin(x, y) {
    for (const b of $$('.sim-bin')) { const r = b.getBoundingClientRect(); if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return b; }
    return null;
  }
  function grab(q, e) {
    held = q; q.st = 'held'; q.vx = q.vy = 0; N.chain = 0;
    ptr = { x: e.clientX, y: e.clientY, hist: [{ x: e.clientX, y: e.clientY, t: performance.now() }], sx: e.clientX, sy: e.clientY };
    cv.className = 'grabbing';
    evaluate();
  }
  function moveHeld(e) {
    ptr.x = e.clientX; ptr.y = e.clientY;
    ptr.hist.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    while (ptr.hist.length > 6) ptr.hist.shift();
    if (held) { held.x = e.clientX; held.y = e.clientY; }
    const b = overBin(e.clientX, e.clientY);
    $$('.sim-bin').forEach(x => x.classList.toggle('trash', !!held && x === b));
  }
  function release(e) {
    if (!held) return;
    const q = held; held = null; cv.className = '';
    $$('.sim-bin').forEach(x => x.classList.remove('trash'));
    // velocidade do arremesso
    const h = ptr.hist, a = h[0], z = h[h.length - 1], dt = Math.max(0.016, (z.t - a.t) / 1000);
    const v = { x: (z.x - a.x) / dt, y: (z.y - a.y) / dt };
    const sp = Math.hypot(v.x, v.y), cap = 1400;
    if (sp > cap) { v.x *= cap / sp; v.y *= cap / sp; }
    if (performance.now() - z.t > 80) { v.x = 0; v.y = 0; }
    // toque rápido numa caixinha: vai direto para o átomo (vem antes do "lixo", que também é a caixinha)
    if (q.fromBin && Math.hypot(e.clientX - ptr.sx, e.clientY - ptr.sy) < 6) {
      q.x = CX + (Math.random() - 0.5) * 8; q.y = CY + (Math.random() - 0.5) * 8;
      if (q.t === 'e') { const c = count(); if (c.p + c.n) { q.st = 'orb'; q.x = CX + shellR(c, 0); } else { q.st = 'free'; q.x = CX + 120 * U; } }
      else q.st = 'nuc';
      const c = count();
      if (q.st === 'nuc' && c[q.t] > MAX[q.t]) { parts = parts.filter(x => x !== q); log(tx('limit')); }
      if (q.st === 'orb' && c.e > MAX.e) { parts = parts.filter(x => x !== q); log(tx('limit')); }
      evaluate(); return;
    }
    if (overBin(e.clientX, e.clientY)) { parts = parts.filter(x => x !== q); evaluate(); return; }
    settle(q, sp > 80 ? v : { x: 0, y: 0 });
    evaluate();
  }
  cv.addEventListener('pointerdown', e => {
    const q = pickAt(e.clientX, e.clientY);
    if (!q) return;
    cv.setPointerCapture(e.pointerId);
    grab(q, e);
  });
  cv.addEventListener('pointermove', e => {
    if (held) return moveHeld(e);
    cv.className = pickAt(e.clientX, e.clientY) ? 'grab' : '';
  });
  cv.addEventListener('pointerup', release);
  cv.addEventListener('pointercancel', release);
  // puxar das caixinhas
  $$('.sim-bin').forEach(b => b.addEventListener('pointerdown', e => {
    e.preventDefault();
    const q = add(b.dataset.k, e.clientX, e.clientY, 'held');
    if (!q) return;
    q.fromBin = true;
    grab(q, e);
    const mv = ev => moveHeld(ev), up = ev => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); release(ev); };
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
  }));

  /* ---------- botões ---------- */
  function setPaused(v) {
    paused = v;
    $('#play').textContent = paused ? '▶' : '⏸';
    $('#play').title = paused ? tx('play') : tx('pause');
    $('#play').classList.toggle('on', paused);
    $('#pausedTag').textContent = tx('paused');
    $('#pausedTag').classList.toggle('on', paused);
    if (!paused) { N.since = 0; N.key = 'x'; evaluate(); } // ao voltar: o núcleo instável ganha um tempinho e aparece o resultado
    panel();
  }
  $('#play').onclick = e => { setPaused(!paused); e.currentTarget.blur(); };
  $('#reset').onclick = () => { parts = []; fx.length = 0; N.key = 'x'; N.chain = 0; held = null; evaluate(); };
  document.addEventListener('keydown', e => {
    if (e.key === ' ') { e.preventDefault(); setPaused(!paused); }
    if (e.key === 'r' || e.key === 'R') $('#reset').click();
  });
  $('#langBtn').onclick = () => {
    LANG = LANG === 'pt' ? 'en' : 'pt';
    const d = store.get(); d.lang = LANG; store.set(d);
    applyTexts();
  };

  function applyTexts() {
    applyDataLang(LANG);
    document.documentElement.lang = LANG === 'pt' ? 'pt-BR' : 'en';
    document.title = tx('doc');
    $('#title').textContent = tx('title');
    $('#langCode').textContent = LANG.toUpperCase();
    $('#hint').textContent = tx('hint');
    $('#reset').title = tx('reset');
    $$('.sim-bin').forEach(b => { const [n, s] = tx('bins')[b.dataset.k]; b.querySelector('b').textContent = n; b.querySelector('small').textContent = s; });
    setPaused(paused);
    renderMissions();
    N.key = 'x'; evaluate();
  }

  window.addEventListener('resize', resize);
  applyTexts();
  resize();
  $('#missions').open = W > 760;
  renderMissions();
  log(tx('tip'));
  requestAnimationFrame(frame);
})();
