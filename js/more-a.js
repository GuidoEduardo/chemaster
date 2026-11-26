// Grimório: lições novas, parte A: funções inorgânicas, estequiometria e soluções, química orgânica.
// Cada lição traz o texto (pt/en) e a parte interativa (FV) juntos.

const mSub = s => String(s).replace(/\d/g, c => '₀₁₂₃₄₅₆₇₈₉'[c]);
const mFix = (x, d = 1) => flNum(x, d);
const mChips = (id, list, cur) => `<div class="al-chips" id="${id}">${list.map(([k, n]) => `<button data-k="${k}" class="${k === cur ? 'on' : ''}">${n}</button>`).join('')}</div>`;
const mBindChips = (q, id, fn) => q('#' + id).querySelectorAll('button').forEach(b => b.onclick = () => { q('#' + id).querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); fn(b.dataset.k); });
const mPick = l => l[LANG] || l.pt;

/* ======================= FUNÇÕES INORGÂNICAS ======================= */
const MI_ACIDS = [['HCl', 1, 'Cl', ['cloreto', 'chloride'], ['clorídrico', 'hydrochloric']], ['HNO3', 1, 'NO3', ['nitrato', 'nitrate'], ['nítrico', 'nitric']], ['HNO2', 1, 'NO2', ['nitrito', 'nitrite'], ['nitroso', 'nitrous']],
  ['H2SO4', 2, 'SO4', ['sulfato', 'sulfate'], ['sulfúrico', 'sulfuric']], ['H2CO3', 2, 'CO3', ['carbonato', 'carbonate'], ['carbônico', 'carbonic']], ['H2S', 2, 'S', ['sulfeto', 'sulfide'], ['sulfídrico', 'hydrosulfuric']], ['H3PO4', 3, 'PO4', ['fosfato', 'phosphate'], ['fosfórico', 'phosphoric']]];
const MI_BASES = [['NaOH', 'Na', 1, ['sódio', 'sodium']], ['KOH', 'K', 1, ['potássio', 'potassium']], ['NH4OH', 'NH4', 1, ['amônio', 'ammonium']], ['Ca(OH)2', 'Ca', 2, ['cálcio', 'calcium']], ['Mg(OH)2', 'Mg', 2, ['magnésio', 'magnesium']], ['Al(OH)3', 'Al', 3, ['alumínio', 'aluminium']]];
const miPoly = ion => /\d/.test(ion) || (ion.match(/[A-Z]/g) || []).length > 1;
const miGrp = (ion, n) => n === 1 ? ion : miPoly(ion) ? `(${ion})${n}` : ion + n;
const miSup = n => n === 1 ? '' : flSup(n);
const mGcd = (a, b) => b ? mGcd(b, a % b) : a;

FV['i-func'] = {
  html: U => `<div class="fl-2ctl"><div class="al-ctl"><label>${U.acid}</label><span class="al-chips" id="mifA">${MI_ACIDS.map((a, i) => `<button data-i="${i}" class="${i === 3 ? 'on' : ''}">${mSub(a[0])}</button>`).join('')}</span></div>
    <div class="al-ctl"><label>${U.base}</label><span class="al-chips" id="mifB">${MI_BASES.map((b, i) => `<button data-i="${i}" class="${i === 0 ? 'on' : ''}">${mSub(b[0])}</button>`).join('')}</span></div></div>
    <div class="mi-out" id="mifOut"></div>`,
  init(U, q) {
    let ai = 3, bi = 0;
    const draw = () => {
      const [af, aq, an, aname] = MI_ACIDS[ai], [bf, cat, cq, cname] = MI_BASES[bi];
      const L = aq * cq / mGcd(aq, cq), p = L / cq, n = L / aq;
      const salt = miGrp(cat, p) + miGrp(an, n), en = LANG === 'en';
      const nm = en ? `${cname[1]} ${aname[1]}` : `${aname[0]} de ${cname[0]}`;
      const co = k => k > 1 ? k + ' ' : '';
      const ions = `${Array.from({ length: p }, () => `<span class="mi-ion c">${mSub(cat)}${miSup(cq)}⁺</span>`).join('')}${Array.from({ length: n }, () => `<span class="mi-ion a">${mSub(an)}${miSup(aq)}⁻</span>`).join('')}`;
      q('#mifOut').innerHTML = `<div class="mi-eq">${co(n)}${mSub(af)} + ${co(p)}${mSub(bf)} → <b>${mSub(salt)}</b> + ${co(L)}H₂O</div>
        <div class="mi-row"><span class="mi-lbl">${U.salt}</span><b class="mi-name">${nm}</b></div>
        <div class="mi-row"><span class="mi-lbl">${U.ions}</span><span>${ions}</span></div>
        <p class="fl-msg ok">${U.why.replace('{p}', p).replace('{cq}', '+' + cq).replace('{n}', n).replace('{aq}', '−' + aq)} ${U.water.replace('{L}', L)}</p>`;
    };
    q('#mifA').querySelectorAll('button').forEach(b => b.onclick = () => { ai = +b.dataset.i; q('#mifA').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    q('#mifB').querySelectorAll('button').forEach(b => b.onclick = () => { bi = +b.dataset.i; q('#mifB').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    draw();
  },
};

const MI_NAMES = [
  ['HCl', 'a', ['ácido clorídrico', 'hydrochloric acid'], ['Ácido <b>sem oxigênio</b>: ácido + nome do elemento + <b>ídrico</b>.', 'Acid <b>without oxygen</b>: hydro- + element + <b>-ic</b> acid.']],
  ['H2SO4', 'a', ['ácido sulfúrico', 'sulfuric acid'], ['Ácido com oxigênio: a versão com <b>mais</b> oxigênio termina em <b>-ico</b> (H₂SO₄, sulfúrico); a com <b>menos</b>, em <b>-oso</b> (H₂SO₃, sulfuroso).', 'Acid with oxygen: the version with <b>more</b> oxygen ends in <b>-ic</b> (H₂SO₄, sulfuric); the one with <b>less</b> ends in <b>-ous</b> (H₂SO₃, sulfurous).']],
  ['HNO2', 'a', ['ácido nitroso', 'nitrous acid'], ['Tem <b>menos</b> oxigênio que o HNO₃ (ácido nítrico), então termina em <b>-oso</b>.', 'It has <b>less</b> oxygen than HNO₃ (nitric acid), so it ends in <b>-ous</b>.']],
  ['NaOH', 'b', ['hidróxido de sódio', 'sodium hydroxide'], ['Base: <b>hidróxido de</b> + nome do metal. É a soda cáustica.', 'Base: metal name + <b>hydroxide</b>. It is caustic soda.']],
  ['Ca(OH)2', 'b', ['hidróxido de cálcio', 'calcium hydroxide'], ['O cálcio é 2+, então precisa de <b>2 OH⁻</b>. É a cal hidratada, usada em obras.', 'Calcium is 2+, so it needs <b>2 OH⁻</b>. It is slaked lime, used in construction.']],
  ['NaCl', 's', ['cloreto de sódio', 'sodium chloride'], ['Sal: nome do ânion + <b>de</b> + metal. O ânion vem do ácido: clor<b>ídrico</b> → clor<b>eto</b>.', 'Salt: metal + anion name. The anion comes from the acid: hydrochlor<b>ic</b> → chlor<b>ide</b>.']],
  ['CaCO3', 's', ['carbonato de cálcio', 'calcium carbonate'], ['Do ácido carbôn<b>ico</b> → carbon<b>ato</b>. É o calcário, o mármore e a casca do ovo.', 'From carbon<b>ic</b> acid → carbon<b>ate</b>. It is limestone, marble and eggshell.']],
  ['NaClO', 's', ['hipoclorito de sódio', 'sodium hypochlorite'], ['Do ácido hipoclor<b>oso</b> → hipoclor<b>ito</b>. É a água sanitária.', 'From hypochlor<b>ous</b> acid → hypochlor<b>ite</b>. It is household bleach.']],
  ['CO2', 'o', ['dióxido de carbono', 'carbon dioxide'], ['Óxido de dois não metais: prefixo com o número de O (<b>mono, di, tri</b>) + óxido de + elemento.', 'Oxide of two nonmetals: prefix with the number of O (<b>mono, di, tri</b>) + oxide.']],
  ['SO2', 'o', ['dióxido de enxofre', 'sulfur dioxide'], ['Óxido <b>ácido</b>: com água vira ácido (SO₂ + H₂O → H₂SO₃). É um dos culpados da chuva ácida.', '<b>Acidic</b> oxide: with water it becomes an acid (SO₂ + H₂O → H₂SO₃). One of the causes of acid rain.']],
  ['CaO', 'o', ['óxido de cálcio', 'calcium oxide'], ['Óxido <b>básico</b> (de metal): com água vira base (CaO + H₂O → Ca(OH)₂). É a cal virgem.', '<b>Basic</b> oxide (of a metal): with water it becomes a base (CaO + H₂O → Ca(OH)₂). It is quicklime.']],
  ['Fe2O3', 'o', ['óxido de ferro(III)', 'iron(III) oxide'], ['O ferro pode ser 2+ ou 3+, então o número romano diz qual: aqui é Fe³⁺. É a ferrugem.', 'Iron can be 2+ or 3+, so the Roman numeral says which: here it is Fe³⁺. It is rust.']],
];
FV['i-name'] = {
  html: U => `<div class="al-chips" id="minC">${MI_NAMES.map((m, i) => `<button data-i="${i}" class="${i ? '' : 'on'}">${mSub(m[0])}</button>`).join('')}</div><div class="mi-card" id="minOut"></div>`,
  init(U, q) {
    const show = i => {
      const [f, k, nm, rule] = MI_NAMES[i];
      let shown = mSub(f);
      if (k === 'a') shown = shown.replace(/^H(₂|₃)?/, m => `<em class="mi-h">${m}</em>`);
      if (k === 'b') shown = shown.replace(/OH/, '<em class="mi-oh">OH</em>');
      if (k === 'o') shown = shown.replace(/O(₂|₃)?$/, m => `<em class="mi-o">${m}</em>`);
      q('#minOut').innerHTML = `<div class="mi-big">${shown}</div><div class="mi-func ${k}">${U.f[k]}</div><p class="mi-why">${U.how[k]}</p><div class="mi-name"><span class="mi-lbl">${U.name}</span> <b>${mPick({ pt: nm[0], en: nm[1] })}</b></div><p>${mPick({ pt: rule[0], en: rule[1] })}</p>`;
    };
    q('#minC').querySelectorAll('button').forEach(b => b.onclick = () => { q('#minC').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); show(+b.dataset.i); });
    show(0);
  },
};

/* ======================= ESTEQUIOMETRIA E SOLUÇÕES ======================= */
const MS_RX = {
  h2o: [['H₂', 2, 2], ['O₂', 1, 32], ['H₂O', 2, 18]],
  nh3: [['N₂', 1, 28], ['H₂', 3, 2], ['NH₃', 2, 17]],
  fe: [['Fe', 4, 56], ['O₂', 3, 32], ['Fe₂O₃', 2, 160]],
};
FV['s-ratio'] = {
  html: U => `${mChips('msrR', [['h2o', '2 H₂ + O₂ → 2 H₂O'], ['nh3', 'N₂ + 3 H₂ → 2 NH₃'], ['fe', '4 Fe + 3 O₂ → 2 Fe₂O₃']], 'h2o')}
    <div class="fl-2ctl"><div class="al-ctl"><label id="msrLA"></label><input type="range" min="0" max="12" value="6" id="msrA"><b id="msrAv"></b></div>
    <div class="al-ctl"><label id="msrLB"></label><input type="range" min="0" max="12" value="5" id="msrB"><b id="msrBv"></b></div></div>
    <div class="ms-box"><div><span class="mi-lbl">${U.before}</span><div id="msrPre" class="ms-tok"></div></div><div class="ms-arrow">→</div><div><span class="mi-lbl">${U.after}</span><div id="msrPost" class="ms-tok"></div></div></div>
    <div class="fl-msg ok" id="msrMsg"></div>`,
  init(U, q) {
    let rx = 'h2o';
    const tok = (n, f, cls) => Array.from({ length: n }, () => `<i class="${cls}">${f}</i>`).join('');
    const draw = () => {
      const [[fa, a, ma], [fb, b, mb], [fp, c, mp]] = MS_RX[rx], nA = +q('#msrA').value, nB = +q('#msrB').value;
      q('#msrLA').textContent = `${U.mol} ${fa}`; q('#msrLB').textContent = `${U.mol} ${fb}`; q('#msrAv').textContent = nA; q('#msrBv').textContent = nB;
      const x = Math.min(Math.floor(nA / a), Math.floor(nB / b)), P = c * x, rA = nA - a * x, rB = nB - b * x;
      q('#msrPre').innerHTML = tok(nA, fa, 'ta') + tok(nB, fb, 'tb');
      q('#msrPost').innerHTML = tok(P, fp, 'tp') + tok(rA, fa, 'ta left') + tok(rB, fb, 'tb left');
      const lim = nA / a < nB / b ? fa : nB / b < nA / a ? fb : null;
      const m0 = nA * ma + nB * mb, m1 = P * mp + rA * ma + rB * mb;
      q('#msrMsg').innerHTML = `${U.made.replace('{n}', P).replace('{f}', fp)} ${lim ? U.lim.replace('{f}', lim).replace('{x}', lim === fa ? fb : fa) : U.exact}<br><small>${U.mass}: ${m0} g → ${m1} g ✔</small>`;
    };
    mBindChips(q, 'msrR', k => { rx = k; draw(); });
    q('#msrA').oninput = draw; q('#msrB').oninput = draw; draw();
  },
};

FV['s-yield'] = {
  html: U => `<div class="al-ctl"><label>${U.m}</label><input type="range" min="10" max="500" step="10" value="200" id="msyM"><b id="msyMv"></b></div>
    <div class="al-ctl"><label>${U.pur}</label><input type="range" min="10" max="100" value="80" id="msyP"><b id="msyPv"></b></div>
    <div class="al-ctl"><label>${U.yld}</label><input type="range" min="10" max="100" value="90" id="msyY"><b id="msyYv"></b></div>
    <div class="ms-steps" id="msyOut"></div>`,
  init(U, q) {
    const draw = () => {
      const m = +q('#msyM').value, p = +q('#msyP').value / 100, y = +q('#msyY').value / 100;
      q('#msyMv').textContent = m + ' g'; q('#msyPv').textContent = Math.round(p * 100) + '%'; q('#msyYv').textContent = Math.round(y * 100) + '%';
      const pure = m * p, mol = pure / 100, th = mol * 56, real = th * y;
      const row = (t, v, w) => `<div><span>${t}</span><div class="fl-meter"><div><i style="width:${w}%"></i></div></div><b>${v}</b></div>`;
      q('#msyOut').innerHTML = row(U.s1, `${mFix(m, 0)} g`, m / 5) + row(U.s2, `${mFix(pure, 0)} g`, pure / 5) + row(U.s3, `${mFix(mol, 2)} mol`, mol * 20) + row(U.s4, `${mFix(th, 0)} g`, th / 5) + row(U.s5, `${mFix(real, 0)} g`, real / 5);
    };
    ['#msyM', '#msyP', '#msyY'].forEach(s => q(s).oninput = draw); draw();
  },
};

const MS_SOL = [['nacl', 58.5], ['sug', 342], ['naoh', 40]];
FV['s-conc'] = {
  html: U => `${mChips('mscS', MS_SOL.map(([k]) => [k, U.subs[k]]), 'nacl')}
    <div class="fl-two"><svg viewBox="0 0 200 200" class="fl-svg sq" id="mscSvg"></svg><div class="fl-info" id="mscInfo"></div></div>
    <div class="al-ctl"><label>${U.g}</label><input type="range" min="0" max="100" value="9" id="mscG"><b id="mscGv"></b></div>
    <div class="al-ctl"><label>${U.v}</label><input type="range" min="0.1" max="2" step="0.1" value="1" id="mscV"><b id="mscVv"></b></div>`,
  init(U, q) {
    let s = 'nacl';
    const dots = Array.from({ length: 120 }, () => [Math.random(), Math.random()]);
    const draw = () => {
      const g = +q('#mscG').value, V = +q('#mscV').value, M = MS_SOL.find(x => x[0] === s)[1], cg = g / V, cm = g / M / V;
      q('#mscGv').textContent = g + ' g'; q('#mscVv').textContent = mFix(V) + ' L';
      const h = 30 + V / 2 * 140, top = 185 - h, n = Math.min(120, Math.round(g * 1.2));
      q('#mscSvg').innerHTML = `<path d="M30 15 V185 H170 V15" class="ms-glass"/><rect x="32" y="${top}" width="136" height="${h - 2}" class="ms-water" style="opacity:${0.25 + Math.min(0.6, cg / 200)}"/>` +
        dots.slice(0, n).map(([x, y]) => `<circle cx="${38 + x * 124}" cy="${top + 6 + y * (h - 14)}" r="2.6" class="ms-dot ${s}"/>`).join('') + `<text x="100" y="${top - 6}" class="fl-small">${mFix(V)} L</text>`;
      const near = U.ref.reduce((b, r) => Math.abs(r[0] - cg) < Math.abs(b[0] - cg) ? r : b);
      q('#mscInfo').innerHTML = `<p>${U.cg}: <b>${mFix(cg, 1)} g/L</b></p><p>${U.cm}: <b>${mFix(cm, 2)} mol/L</b></p><p class="al-muted">${U.near} ${near[1]} (${near[0]} g/L)</p>`;
    };
    mBindChips(q, 'mscS', k => { s = k; draw(); });
    q('#mscG').oninput = draw; q('#mscV').oninput = draw; draw();
  },
};

FV['s-dilute'] = {
  html: U => `<div class="fl-two"><svg viewBox="0 0 200 200" class="fl-svg sq" id="msdSvg"></svg><div class="fl-info" id="msdInfo"></div></div>
    <div class="al-ctl"><label>${U.add}</label><input type="range" min="0" max="1.75" step="0.05" value="0" id="msdW"><b id="msdWv"></b></div>`,
  init(U, q) {
    const dots = Array.from({ length: 40 }, () => [Math.random(), Math.random()]);
    const draw = () => {
      const w = +q('#msdW').value, V = 0.25 + w, C = 40 * 0.25 / V;
      q('#msdWv').textContent = mFix(w, 2) + ' L';
      const h = 20 + V / 2 * 160, top = 185 - h;
      q('#msdSvg').innerHTML = `<path d="M30 15 V185 H170 V15" class="ms-glass"/><rect x="32" y="${top}" width="136" height="${h - 2}" class="ms-juice" style="opacity:${0.15 + C / 40 * 0.8}"/>` +
        dots.map(([x, y]) => `<circle cx="${38 + x * 124}" cy="${top + 5 + y * (h - 10)}" r="3" class="ms-dot sug"/>`).join('');
      q('#msdInfo').innerHTML = `<p>${U.vol}: <b>${mFix(V, 2)} L</b></p><p>${U.c}: <b>${mFix(C, 1)} g/L</b></p><p>${U.m}: <b>10 g</b> ${U.same}</p><p class="al-muted">C₁·V₁ = 40 × ${flNum(0.25, 2)} = ${mFix(C, 1)} × ${mFix(V, 2)} = 10</p>`;
    };
    q('#msdW').oninput = draw; draw();
  },
};

/* ======================= QUÍMICA ORGÂNICA ======================= */
const MO_PRE_PT = ['met', 'et', 'prop', 'but', 'pent', 'hex', 'hept', 'oct', 'non', 'dec'], MO_PRE_EN = ['meth', 'eth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct', 'non', 'dec'];
const moPre = n => (LANG === 'en' ? MO_PRE_EN : MO_PRE_PT)[n - 1];
FV['o-carbon'] = {
  html: U => `<div class="al-ctl"><label>${U.n}</label><input type="range" min="1" max="10" value="3" id="mocN"><b id="mocNv"></b></div>
    <div class="al-ctl"><label>${U.bond}</label><span class="al-chips" id="mocB"><button data-k="0" class="on">${U.b[0]}</button><button data-k="1">${U.b[1]}</button><button data-k="2">${U.b[2]}</button></span></div>
    <div class="al-ctl" id="mocPW"><label>${U.pos}</label><input type="range" min="1" max="5" value="1" id="mocP"><b id="mocPv"></b></div>
    <svg viewBox="0 0 460 150" class="fl-svg" id="mocSvg"></svg><div class="mo-name" id="mocName"></div><div class="fl-msg ok" id="mocMsg"></div>`,
  init(U, q) {
    let k = 0;
    const draw = () => {
      const n = +q('#mocN').value; if (n === 1) k = 0;
      q('#mocB').querySelectorAll('button').forEach(b => { b.classList.toggle('on', +b.dataset.k === k); b.disabled = n === 1 && b.dataset.k !== '0'; });
      const pmax = Math.max(1, Math.floor(n / 2)); q('#mocP').max = pmax; let p = Math.min(+q('#mocP').value, pmax); q('#mocP').value = p;
      q('#mocPW').style.display = k && n >= 4 ? '' : 'none'; q('#mocNv').textContent = n; q('#mocPv').textContent = p;
      if (!k || n < 4) p = 1;
      const dx = n > 1 ? Math.min(46, 400 / (n - 1)) : 0, x0 = 230 - dx * (n - 1) / 2, P = i => [x0 + i * dx, i % 2 ? 95 : 60];
      let s = '';
      for (let i = 0; i < n - 1; i++) {
        const [a, b] = [P(i), P(i + 1)], ord = k && i === p - 1 ? k + 1 : 1, ang = Math.atan2(b[1] - a[1], b[0] - a[0]), ox = -Math.sin(ang) * 4, oy = Math.cos(ang) * 4;
        for (let j = 0; j < ord; j++) { const o = j - (ord - 1) / 2; s += `<line x1="${a[0] + ox * o}" y1="${a[1] + oy * o}" x2="${b[0] + ox * o}" y2="${b[1] + oy * o}" class="mo-bond"/>`; }
      }
      for (let i = 0; i < n; i++) {
        const nb = (i > 0 ? (k && i - 1 === p - 1 ? k + 1 : 1) : 0) + (i < n - 1 ? (k && i === p - 1 ? k + 1 : 1) : 0), h = 4 - nb, [x, y] = P(i);
        s += `<circle cx="${x}" cy="${y}" r="13" class="mo-c"/><text x="${x}" y="${y + 5}" class="mo-ct">C</text>${h ? `<text x="${x}" y="${i % 2 ? y + 32 : y - 20}" class="mo-h">H${h > 1 ? mSub(h) : ''}</text>` : ''}`;
      }
      q('#mocSvg').innerHTML = s;
      const H = 2 * n + 2 - 2 * k, en = LANG === 'en';
      const suf = en ? ['ane', 'ene', 'yne'][k] : ['ano', 'eno', 'ino'][k];
      const name = moPre(n) + (k && n >= 4 ? `-${p}-` : '') + (en && n >= 4 && k ? suf : suf);
      q('#mocName').innerHTML = `<b>${name.replace(/^(.)/, c => c.toUpperCase())}</b> · C${mSub(n)}H${mSub(H)}`;
      q('#mocMsg').innerHTML = `${U.state[n <= 4 ? 0 : 1]}${U.uses[name] ? ' · ' + U.uses[name] : ''}`;
    };
    q('#mocB').querySelectorAll('button').forEach(b => b.onclick = () => { k = +b.dataset.k; draw(); });
    q('#mocN').oninput = draw; q('#mocP').oninput = draw; draw();
  },
};

const MO_FUNC = [
  ['hc', ['CH₃–CH₃', '', ''], ['etano', 'ethane']],
  ['alc', ['CH₃–CH₂–', 'OH', ''], ['etanol', 'ethanol']],
  ['ald', ['CH₃–', 'CHO', ''], ['etanal', 'ethanal']],
  ['ket', ['CH₃–', 'CO', '–CH₃'], ['propanona (acetona)', 'propanone (acetone)']],
  ['acid', ['CH₃–', 'COOH', ''], ['ácido etanoico (acético)', 'ethanoic (acetic) acid']],
  ['est', ['CH₃–', 'COO', '–CH₂–CH₃'], ['etanoato de etila', 'ethyl ethanoate']],
  ['eth', ['CH₃–CH₂–', 'O', '–CH₂–CH₃'], ['etoxietano (éter comum)', 'ethoxyethane (ether)']],
  ['amn', ['CH₃–', 'NH₂', ''], ['metilamina', 'methylamine']],
  ['amd', ['CH₃–', 'CONH₂', ''], ['etanamida', 'ethanamide']],
  ['hal', ['CH₃–CH₂–', 'Cl', ''], ['cloroetano', 'chloroethane']],
  ['phe', ['C₆H₅–', 'OH', ''], ['fenol', 'phenol']],
];
FV['o-groups'] = {
  html: U => `${mChips('mogC', MO_FUNC.map(([k]) => [k, U.f[k][0]]), 'alc')}<div class="mi-card" id="mogOut"></div>`,
  init(U, q) {
    const show = k => {
      const [, [a, g, b], nm] = MO_FUNC.find(x => x[0] === k), [title, grp, suf, where] = U.f[k];
      q('#mogOut').innerHTML = `<div class="mi-big mo-f">${a}${g ? `<em class="mo-g">${g}</em>` : ''}${b}</div><div class="mi-func o">${title}</div>
        <div class="mi-name"><span class="mi-lbl">${U.ex}</span> <b>${mPick({ pt: nm[0], en: nm[1] })}</b></div>
        <p><b>${U.grp}:</b> ${grp} · <b>${U.suf}:</b> ${suf}</p><p>${where}</p>`;
    };
    mBindChips(q, 'mogC', show); show('alc');
  },
};

const MO_ALC = [[65, 'inf'], [78, 'inf'], [97, 'inf'], [118, 7.7], [138, 2.2], [157, 0.59], [176, 0.17], [195, 0.05]];
FV['o-props'] = {
  html: U => `<div class="al-ctl"><label>${U.n}</label><input type="range" min="1" max="8" value="2" id="mopN"><b id="mopNv"></b></div>
    <svg viewBox="0 0 460 90" class="fl-svg" id="mopSvg"></svg><div class="ms-steps" id="mopOut"></div><div class="fl-msg ok" id="mopMsg"></div>`,
  init(U, q) {
    const draw = () => {
      const n = +q('#mopN').value, [bp, sol] = MO_ALC[n - 1];
      q('#mopNv').textContent = n;
      let s = '', x = 40;
      for (let i = 0; i < n; i++) { const y = i % 2 ? 55 : 35; if (i) s += `<line x1="${x - 40}" y1="${i % 2 ? 35 : 55}" x2="${x}" y2="${y}" class="mo-bond"/>`; s += `<circle cx="${x}" cy="${y}" r="13" class="mo-c"/><text x="${x}" y="${y + 5}" class="mo-ct">C</text>`; x += 40; }
      const ly = n % 2 ? 55 : 35;
      s += `<line x1="${x - 40}" y1="${(n - 1) % 2 ? 55 : 35}" x2="${x}" y2="${ly}" class="mo-bond"/><circle cx="${x}" cy="${ly}" r="16" class="mo-oh"/><text x="${x}" y="${ly + 5}" class="mo-ct w">OH</text>`;
      s += `<text x="${40 + (n - 1) * 20}" y="85" class="fl-small">${U.tail}</text><text x="${x}" y="${ly > 40 ? 85 : 12}" class="fl-small">${U.head}</text>`;
      q('#mopSvg').innerHTML = s;
      const nm = moPre(n) + 'anol';
      const row = (t, v, w) => `<div><span>${t}</span><div class="fl-meter"><div><i style="width:${w}%"></i></div></div><b>${v}</b></div>`;
      q('#mopOut').innerHTML = `<p class="mo-name"><b>${nm[0].toUpperCase() + nm.slice(1)}</b> · C${mSub(n)}H${mSub(2 * n + 1)}OH</p>` + row(U.bp, `${bp} °C`, bp / 2) + row(U.sol, sol === 'inf' ? U.inf : `${flNum(sol, sol < 1 ? 2 : 1)} g / 100 mL`, sol === 'inf' ? 100 : Math.max(2, sol * 8));
      q('#mopMsg').innerHTML = n <= 3 ? U.m1 : n <= 5 ? U.m2 : U.m3;
    };
    q('#mopN').oninput = draw; draw();
  },
};

const MO_ISO = [
  ['chain', ['CH₃–CH₂–CH₂–CH₃', ['butano', 'butane'], '−0,5 °C'], ['CH₃–CH(CH₃)–CH₃', ['metilpropano', 'methylpropane'], '−12 °C'], 'C₄H₁₀'],
  ['func', ['CH₃–CH₂–OH', ['etanol', 'ethanol'], '78 °C'], ['CH₃–O–CH₃', ['metoximetano', 'methoxymethane'], '−24 °C'], 'C₂H₆O'],
  ['func2', ['CH₃–CH₂–CHO', ['propanal', 'propanal'], '48 °C'], ['CH₃–CO–CH₃', ['propanona', 'propanone'], '56 °C'], 'C₃H₆O'],
  ['pos', ['CH₂=CH–CH₂–CH₃', ['but-1-eno', 'but-1-ene'], '−6 °C'], ['CH₃–CH=CH–CH₃', ['but-2-eno', 'but-2-ene'], '1–4 °C'], 'C₄H₈'],
  ['geo', ['cis', ['cis-but-2-eno', 'cis-but-2-ene'], '4 °C'], ['trans', ['trans-but-2-eno', 'trans-but-2-ene'], '1 °C'], 'C₄H₈'],
  ['opt', ['R', ['(R)-carvona', '(R)-carvone'], '🌿'], ['S', ['(S)-carvona', '(S)-carvone'], '🌾'], 'C₁₀H₁₄O'],
];
FV['o-isomer'] = {
  html: U => `${mChips('moiC', MO_ISO.map(([k]) => [k, U.t[k][0]]), 'chain')}<div class="mo-pair" id="moiOut"></div><div class="fl-msg ok" id="moiMsg"></div>`,
  init(U, q) {
    const geo = cis => `<svg viewBox="0 0 160 110" class="mo-geo"><line x1="60" y1="55" x2="100" y2="55" class="mo-bond"/><line x1="60" y1="60" x2="100" y2="60" class="mo-bond"/>
      <circle cx="60" cy="57" r="11" class="mo-c"/><circle cx="100" cy="57" r="11" class="mo-c"/>
      <line x1="60" y1="57" x2="30" y2="22" class="mo-bond"/><line x1="60" y1="57" x2="30" y2="92" class="mo-bond"/><line x1="100" y1="57" x2="130" y2="22" class="mo-bond"/><line x1="100" y1="57" x2="130" y2="92" class="mo-bond"/>
      <text x="26" y="20" class="mo-ct">CH₃</text><text x="26" y="102" class="mo-ct">H</text><text x="134" y="${cis ? 20 : 102}" class="mo-ct">CH₃</text><text x="134" y="${cis ? 102 : 20}" class="mo-ct">H</text></svg>`;
    const chir = mir => { const s = mir ? -1 : 1, C = ['#ff4d4d', '#2fbf71', '#4f8dff', '#f5b53f'], P = [[0, -38], [-34 * s, 22], [34 * s, 22], [10 * s, 4]]; return `<svg viewBox="-60 -55 120 100" class="mo-geo">${P.map(([x, y]) => `<line x1="0" y1="0" x2="${x}" y2="${y}" class="mo-bond"/>`).join('')}<circle r="10" class="mo-c"/>${P.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 3 ? 8 : 11}" fill="${C[i]}" stroke="#111" stroke-width="2"/>`).join('')}</svg>`; };
    const show = k => {
      const [, A, B, f] = MO_ISO.find(x => x[0] === k);
      const card = (X, mir) => `<div class="mo-iso"><div class="mo-st">${k === 'geo' ? geo(X[0] === 'cis') : k === 'opt' ? chir(mir) : X[0]}</div><b>${mPick({ pt: X[1][0], en: X[1][1] })}</b><small>${k === 'opt' ? U.smell[mir ? 1 : 0] : U.bp + ': ' + X[2]}</small></div>`;
      q('#moiOut').innerHTML = card(A, 0) + `<div class="mo-mid">${f}${k === 'opt' ? `<span class="mo-mirror">🪞</span>` : ''}</div>` + card(B, 1);
      q('#moiMsg').innerHTML = `<b>${U.t[k][0]}:</b> ${U.t[k][1]}`;
    };
    mBindChips(q, 'moiC', show); show('chain');
  },
};

FV['o-react'] = {
  html: U => `<div class="al-ctl"><label>${U.n}</label><input type="range" min="1" max="8" value="1" id="morN"><b id="morNv"></b></div>
    <div class="al-chips" id="morO"><button data-k="1" class="on">${U.full}</button><button data-k="0">${U.part}</button></div>
    <div class="mi-eq" id="morEq"></div><div class="fl-msg" id="morMsg"></div>`,
  init(U, q) {
    let full = 1;
    const draw = () => {
      const n = +q('#morN').value, H = 2 * n + 2, nm = moPre(n) + (LANG === 'en' ? 'ane' : 'ano');
      q('#morNv').textContent = `${n} · ${nm}`;
      let o2 = full ? 3 * n + 1 : 2 * n + 1, m = 1; if (o2 % 2) m = 2; o2 = o2 * m / 2;
      const co = x => x > 1 ? x + ' ' : '';
      q('#morEq').innerHTML = `${co(m)}C${mSub(n)}H${mSub(H)} + ${co(o2)}O₂ → ${co(n * m)}<b>${full ? 'CO₂' : 'CO'}</b> + ${co((n + 1) * m)}H₂O`;
      const E = 658 * n + 232;
      q('#morMsg').className = 'fl-msg ' + (full ? 'ok' : 'bad');
      q('#morMsg').innerHTML = full ? U.okMsg.replace('{e}', flNum(E)) : U.badMsg;
    };
    q('#morO').querySelectorAll('button').forEach(b => b.onclick = () => { full = +b.dataset.k; q('#morO').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    q('#morN').oninput = draw; draw();
  },
};

const MO_POLY = [['pe', 'CH₂=CH₂', '–CH₂–CH₂–', 28], ['pvc', 'CH₂=CHCl', '–CH₂–CHCl–', 62.5], ['pp', 'CH₂=CH–CH₃', '–CH₂–CH(CH₃)–', 42], ['ps', 'CH₂=CH–C₆H₅', '–CH₂–CH(C₆H₅)–', 104]];
FV['o-poly'] = {
  html: U => `${mChips('mopC', MO_POLY.map(([k]) => [k, U.p[k][0]]), 'pe')}
    <div class="mo-mono" id="mopMono"></div><div class="mo-chain" id="mopChain"></div>
    <div class="al-center"><button class="btn-y fl-sm" id="mopAdd">${U.add}</button><button class="btn-w fl-sm" id="mopMany">${U.many}</button><button class="btn-w fl-sm" id="mopReset">↺</button></div>
    <div class="fl-msg ok" id="mopMsg2"></div>`,
  init(U, q) {
    let k = 'pe', n = 0;
    const draw = () => {
      const [, mono, unit, M] = MO_POLY.find(x => x[0] === k);
      q('#mopMono').innerHTML = `${U.mono}: <b>${mono}</b> <small>(${U.p[k][1]})</small>`;
      const shown = Math.min(n, 6);
      q('#mopChain').innerHTML = n ? `${n > 6 ? '…' : ''}${Array.from({ length: shown }, (_, i) => `<span class="${i === shown - 1 ? 'new' : ''}">${unit}</span>`).join('')}${n > 6 ? '…' : ''}` : `<i>${U.empty}</i>`;
      q('#mopMsg2').innerHTML = `${U.n}: <b>${flNum(n)}</b> · ${U.mass}: <b>${flNum(n * M)} g/mol</b>${n >= 1000 ? ' · ' + U.big : ''}<br><small>${U.p[k][2]}</small>`;
    };
    mBindChips(q, 'mopC', x => { k = x; n = 0; draw(); });
    q('#mopAdd').onclick = () => { n++; draw(); };
    q('#mopMany').onclick = () => { n += 1000; draw(); };
    q('#mopReset').onclick = () => { n = 0; draw(); };
    draw();
  },
};

/* ======================= TEXTOS ======================= */
const mCh = (q, opts, why) => [q, opts, 0, why];
FL_LESSONS.push(
  { id: 'i-func', track: 'inorg', icon: '🧂', m: 0,
    pt: {
      t: 'Ácido, base, sal e óxido: as 4 famílias',
      lead: 'Toda substância inorgânica cai numa dessas 4 caixas, e dá para reconhecer pela fórmula.',
      p: ['Você já viu que <b>ácido entrega H⁺</b> e <b>base pega H⁺</b>. Isso dá um jeito rápido de reconhecer pela fórmula:',
        '<ul class="fl-list"><li>🍋 <b>Ácido</b>: começa com <b>H</b> (HCl, H₂SO₄). Na água, esse H sai como H⁺.</li><li>🧼 <b>Base</b>: tem <b>OH</b> ligado a um metal (NaOH, Ca(OH)₂). Na água, solta OH⁻, que "come" H⁺.</li><li>🧂 <b>Sal</b>: um metal (ou NH₄⁺) junto com o "resto" de um ácido (NaCl, CaCO₃). Sem H⁺ nem OH⁻ sobrando.</li><li>🔥 <b>Óxido</b>: só <b>dois elementos</b>, e um deles é o <b>oxigênio</b> (CO₂, Fe₂O₃).</li></ul>',
        'E de onde vem o sal? Quando um ácido encontra uma base, o H⁺ e o OH⁻ viram <b>água</b>, e os íons que sobram formam o <b>sal</b>. É a <b>neutralização</b>. Escolha um ácido e uma base:'],
      after: ['Repare na regra que manda em tudo: o sal precisa ter <b>carga total zero</b>. O Al³⁺ com o SO₄²⁻ só fecha zero com 2 alumínios (+6) e 3 sulfatos (−6): Al₂(SO₄)₃. Você não precisa decorar fórmula de sal: é só igualar as cargas.',
        'É por isso que o bicarbonato ou o leite de magnésia (bases fracas) aliviam a azia: neutralizam o excesso de ácido do estômago.'],
      so: 'você sabe montar a fórmula. Falta saber dar <b>nome</b>: e o nome também segue uma lógica.',
      ch: mCh('Por que o sal de cálcio com cloreto é CaCl₂ e não CaCl?', ['O Ca²⁺ precisa de 2 Cl⁻ para a carga total dar zero', 'O cloro é maior que o cálcio', 'Todo sal tem 2 de alguma coisa', 'O cálcio tem 2 nêutrons'], '+2 do cálcio e −1 de cada cloreto: só com 2 cloretos a soma dá zero.'),
      how: 'Toque num ácido e numa base. Veja a reação balanceada, o sal que se forma, o nome dele e a conta das cargas.',
      ui: { acid: 'Ácido', base: 'Base', salt: 'Sal formado', ions: 'Íons do sal', why: 'Carga total zero: {p} × ({cq}) + {n} × ({aq}) = 0.', water: 'E cada H⁺ + OH⁻ vira uma água: {L} H₂O.' },
    },
    en: {
      t: 'Acid, base, salt and oxide: the 4 families',
      lead: 'Every inorganic substance fits one of these 4 boxes, and you can spot it from the formula.',
      p: ['You already saw that an <b>acid gives H⁺</b> and a <b>base takes H⁺</b>. That gives a quick way to spot them from the formula:',
        '<ul class="fl-list"><li>🍋 <b>Acid</b>: starts with <b>H</b> (HCl, H₂SO₄). In water, that H leaves as H⁺.</li><li>🧼 <b>Base</b>: has <b>OH</b> bound to a metal (NaOH, Ca(OH)₂). In water it releases OH⁻, which "eats" H⁺.</li><li>🧂 <b>Salt</b>: a metal (or NH₄⁺) with the "rest" of an acid (NaCl, CaCO₃). No H⁺ or OH⁻ left over.</li><li>🔥 <b>Oxide</b>: only <b>two elements</b>, one of them <b>oxygen</b> (CO₂, Fe₂O₃).</li></ul>',
        'Where do salts come from? When an acid meets a base, H⁺ and OH⁻ become <b>water</b>, and the leftover ions form the <b>salt</b>. That is <b>neutralization</b>. Pick an acid and a base:'],
      after: ['Notice the rule behind it all: a salt must have <b>zero total charge</b>. Al³⁺ with SO₄²⁻ only adds to zero with 2 aluminiums (+6) and 3 sulfates (−6): Al₂(SO₄)₃. You do not need to memorize salt formulas: just balance the charges.',
        'That is why baking soda or milk of magnesia (weak bases) relieve heartburn: they neutralize extra stomach acid.'],
      so: 'you can build the formula. Now you need the <b>name</b>: and names follow a logic too.',
      ch: mCh('Why is calcium chloride CaCl₂ and not CaCl?', ['Ca²⁺ needs 2 Cl⁻ for the total charge to be zero', 'Chlorine is bigger than calcium', 'Every salt has 2 of something', 'Calcium has 2 neutrons'], '+2 from calcium and −1 from each chloride: only with 2 chlorides does it add to zero.'),
      how: 'Tap an acid and a base. See the balanced reaction, the salt formed, its name and the charge math.',
      ui: { acid: 'Acid', base: 'Base', salt: 'Salt formed', ions: 'Ions in the salt', why: 'Zero total charge: {p} × ({cq}) + {n} × ({aq}) = 0.', water: 'And each H⁺ + OH⁻ becomes a water: {L} H₂O.' },
    } },

  { id: 'i-name', track: 'inorg', icon: '🏷️', m: 0,
    pt: {
      t: 'Dando nome às substâncias inorgânicas',
      lead: 'Os nomes não são aleatórios: o fim de cada nome conta uma história.',
      p: ['Os nomes seguem poucas regras. A mais importante liga o <b>ácido</b> ao <b>sal</b> que vem dele, trocando só o final:',
        '<div class="mi-table"><div><b>Ácido</b><b>Ânion / sal</b><b>Exemplo</b></div><div><span>-ídrico</span><span>-eto</span><span>clorídrico → cloreto</span></div><div><span>-ico</span><span>-ato</span><span>sulfúrico → sulfato</span></div><div><span>-oso</span><span>-ito</span><span>sulfuroso → sulfito</span></div></div>',
        '🦆 Para lembrar: "o <b>pato</b> tem <b>bico</b>" (-ico → -ato), "o <b>mosquito</b> é <b>teimoso</b>" (-oso → -ito) e "o ídrico vira <b>eto</b>". Toque nas fórmulas:'],
      after: ['Resumo das regras:',
        '<ul class="fl-list"><li><b>Ácido</b>: sem oxigênio → <b>-ídrico</b>; com oxigênio → <b>-ico</b> (mais O) ou <b>-oso</b> (menos O).</li><li><b>Base</b>: <b>hidróxido de</b> + metal.</li><li><b>Sal</b>: nome do ânion + <b>de</b> + metal.</li><li><b>Óxido</b>: de metal → óxido de + metal; de não metal → prefixo (mono, di, tri) + óxido de + elemento.</li><li>Metal com mais de uma carga possível (ferro, cobre): a carga vai em <b>número romano</b>: ferro(II), ferro(III).</li></ul>',
        '🎮 Quer treinar? Tem um jogo só disso: <a class="btn-y fl-sm" href="#/game/inorg">🧂 Jogar Funções inorgânicas</a>'],
      so: 'agora você reconhece e dá nome às substâncias. Hora de entender <b>por que</b> elas reagem.',
      ch: mCh('O ácido do H₂CO₃ é o carbônico. Como se chama o sal Na₂CO₃?', ['Carbonato de sódio', 'Carbonito de sódio', 'Carbeto de sódio', 'Carbônico de sódio'], '-ico vira -ato: carbônico → carbonato.'),
      how: 'Toque numa fórmula. A parte que denuncia a família fica colorida, e aparece o nome com a regra que o formou.',
      ui: { name: 'Nome', f: { a: '🍋 Ácido', b: '🧼 Base', s: '🧂 Sal', o: '🔥 Óxido' }, how: { a: 'Começa com H, que sai como H⁺ na água.', b: 'Tem OH (hidroxila) ligado a um metal.', s: 'Metal + o resto de um ácido, sem H⁺ nem OH⁻.', o: 'Só dois elementos, e um é o oxigênio.' } },
    },
    en: {
      t: 'Naming inorganic substances',
      lead: 'Names are not random: the ending of each name tells a story.',
      p: ['Names follow a few rules. The most important one links an <b>acid</b> to the <b>salt</b> it gives, changing only the ending:',
        '<div class="mi-table"><div><b>Acid</b><b>Anion / salt</b><b>Example</b></div><div><span>hydro-…-ic</span><span>-ide</span><span>hydrochloric → chloride</span></div><div><span>-ic</span><span>-ate</span><span>sulfuric → sulfate</span></div><div><span>-ous</span><span>-ite</span><span>sulfurous → sulfite</span></div></div>',
        '🧠 To remember: "I <b>ate</b> something <b>ic</b>ky" (-ic → -ate) and "-<b>ous</b> becomes -<b>ite</b>". Tap the formulas:'],
      after: ['Summary of the rules:',
        '<ul class="fl-list"><li><b>Acid</b>: without oxygen → <b>hydro-…-ic</b>; with oxygen → <b>-ic</b> (more O) or <b>-ous</b> (less O).</li><li><b>Base</b>: metal + <b>hydroxide</b>.</li><li><b>Salt</b>: metal + anion name.</li><li><b>Oxide</b>: of a metal → metal + oxide; of a nonmetal → prefix (mono, di, tri) + oxide.</li><li>Metals with more than one possible charge (iron, copper): the charge goes in <b>Roman numerals</b>: iron(II), iron(III).</li></ul>',
        '🎮 Want practice? There is a game just for this: <a class="btn-y fl-sm" href="#/game/inorg">🧂 Play Inorganic functions</a>'],
      so: 'now you can recognize and name substances. Time to understand <b>why</b> they react.',
      ch: mCh('The acid H₂CO₃ is carbonic acid. What is the salt Na₂CO₃ called?', ['Sodium carbonate', 'Sodium carbonite', 'Sodium carbide', 'Sodium carbonic'], '-ic becomes -ate: carbonic → carbonate.'),
      how: 'Tap a formula. The part that gives away its family is colored, and you get the name with the rule that built it.',
      ui: { name: 'Name', f: { a: '🍋 Acid', b: '🧼 Base', s: '🧂 Salt', o: '🔥 Oxide' }, how: { a: 'Starts with H, which leaves as H⁺ in water.', b: 'Has OH (hydroxide) bound to a metal.', s: 'Metal + the rest of an acid, no H⁺ or OH⁻.', o: 'Only two elements, and one is oxygen.' } },
    } },

  { id: 's-ratio', track: 'calc', icon: '🍳', m: 1,
    pt: {
      t: 'Estequiometria: a receita da reação',
      lead: 'Os números na frente da equação são uma receita, contada em mols.',
      p: ['A equação <b>2 H₂ + O₂ → 2 H₂O</b> é uma receita: <b>2</b> moléculas de H₂ para <b>1</b> de O₂ dão <b>2</b> de água. Como o mol é só um "pacote" de moléculas, vale também em mols: 2 mol + 1 mol → 2 mol.',
        'Na vida real quase nunca você tem as quantidades certinhas. Aí um dos ingredientes acaba primeiro e <b>para a reação</b>: é o <b>reagente limitante</b>. O outro sobra (está em <b>excesso</b>). Teste:'],
      after: ['É igual a fazer sanduíche: com 10 pães e 3 fatias de queijo (2 pães + 1 queijo cada), você faz 3 sanduíches. O queijo é o limitante e sobram 4 pães.',
        'Repare também que a <b>massa total não muda</b> (Lavoisier): os átomos só trocam de parceiro, nenhum some e nenhum aparece. Para passar de mol para gramas, é só usar a massa molar (lição "O mol").'],
      so: 'no laboratório e na indústria, os reagentes não são puros e a reação não rende 100%. Como fica a conta?',
      ch: mCh('Na reação 2 H₂ + O₂ → 2 H₂O, você tem 4 mol de H₂ e 5 mol de O₂. Quem é o limitante?', ['O H₂: 4 mol só gastam 2 mol de O₂', 'O O₂, porque tem mais', 'Nenhum, sobra tudo', 'A água'], '4 mol de H₂ precisam de só 2 mol de O₂. O H₂ acaba primeiro e sobram 3 mol de O₂.'),
      how: 'Escolha uma reação e mexa nas quantidades dos dois reagentes. Veja o que se forma, o que sobra (apagadinho) e quem acabou primeiro.',
      ui: { before: 'Antes', after: 'Depois', mol: 'mol de', made: 'Formou <b>{n} mol de {f}</b>.', lim: 'O <b>{f}</b> acabou primeiro (limitante); sobrou {x}.', exact: 'Proporção exata: nada sobrou!', mass: 'Massa total' },
    },
    en: {
      t: 'Stoichiometry: the reaction recipe',
      lead: 'The numbers in front of an equation are a recipe, counted in moles.',
      p: ['The equation <b>2 H₂ + O₂ → 2 H₂O</b> is a recipe: <b>2</b> molecules of H₂ with <b>1</b> of O₂ give <b>2</b> of water. Since a mole is just a "pack" of molecules, it works in moles too: 2 mol + 1 mol → 2 mol.',
        'In real life you almost never have the exact amounts. Then one ingredient runs out first and <b>stops the reaction</b>: the <b>limiting reagent</b>. The other is left over (in <b>excess</b>). Try it:'],
      after: ['It is like making sandwiches: with 10 slices of bread and 3 slices of cheese (2 bread + 1 cheese each), you make 3 sandwiches. Cheese is limiting and 4 bread slices are left.',
        'Notice also that the <b>total mass does not change</b> (Lavoisier): atoms only swap partners, none disappear and none appear. To go from moles to grams, use the molar mass (lesson "The mole").'],
      so: 'in labs and industry, reagents are not pure and reactions do not give 100%. How does the math work then?',
      ch: mCh('In 2 H₂ + O₂ → 2 H₂O you have 4 mol of H₂ and 5 mol of O₂. Which is limiting?', ['H₂: 4 mol only use 2 mol of O₂', 'O₂, because there is more', 'Neither, everything is left', 'Water'], '4 mol of H₂ need only 2 mol of O₂. H₂ runs out first and 3 mol of O₂ are left.'),
      how: 'Pick a reaction and change the amounts of both reactants. See what forms, what is left (faded) and which ran out first.',
      ui: { before: 'Before', after: 'After', mol: 'mol of', made: 'Formed <b>{n} mol of {f}</b>.', lim: '<b>{f}</b> ran out first (limiting); {x} is left over.', exact: 'Exact proportion: nothing is left!', mass: 'Total mass' },
    } },

  { id: 's-yield', track: 'calc', icon: '🏭', m: 1,
    pt: {
      t: 'Pureza e rendimento: a conta do mundo real',
      lead: 'Nem a matéria-prima é pura, nem a reação dá tudo o que poderia.',
      p: ['A cal virgem (CaO), usada em obras, é feita esquentando calcário: <b>CaCO₃ → CaO + CO₂</b>. 1 mol de CaCO₃ (100 g) dá 1 mol de CaO (56 g).',
        'Mas o calcário vem com terra e outras pedras (<b>pureza</b> menor que 100%), e parte do material não reage ou se perde (<b>rendimento</b> menor que 100%). Siga a conta passo a passo:'],
      after: ['A ordem da conta é sempre a mesma: <b>tire a impureza</b> (só a parte pura reage) → <b>passe para mol</b> → <b>use a proporção</b> da equação → <b>volte para gramas</b> → <b>aplique o rendimento</b>.',
        'Pureza é sobre o que <b>entra</b>; rendimento é sobre o que <b>sai</b>. Confundir os dois é o erro mais comum.'],
      so: 'muitas reações acontecem dissolvidas em água. Então precisamos medir quanto de cada coisa tem num líquido: a <b>concentração</b>.',
      ch: mCh('200 g de calcário com 50% de pureza. Quanto CaCO₃ realmente reage?', ['100 g', '200 g', '50 g', '56 g'], 'Só a parte pura reage: 50% de 200 g = 100 g.'),
      how: 'Mexa na massa de calcário, na pureza e no rendimento. Cada barra é um passo da conta, até a cal (CaO) que sai no final.',
      ui: { m: 'Calcário', pur: 'Pureza', yld: 'Rendimento', s1: '1. Calcário (com impurezas)', s2: '2. CaCO₃ puro', s3: '3. Mols de CaCO₃ (÷ 100)', s4: '4. CaO possível (× 56)', s5: '5. CaO de verdade (× rendimento)' },
    },
    en: {
      t: 'Purity and yield: real-world math',
      lead: 'Raw materials are not pure, and reactions do not give everything they could.',
      p: ['Quicklime (CaO), used in construction, is made by heating limestone: <b>CaCO₃ → CaO + CO₂</b>. 1 mol of CaCO₃ (100 g) gives 1 mol of CaO (56 g).',
        'But limestone comes with dirt and other rocks (<b>purity</b> below 100%), and part of the material does not react or gets lost (<b>yield</b> below 100%). Follow the math step by step:'],
      after: ['The order is always the same: <b>remove the impurity</b> (only the pure part reacts) → <b>convert to moles</b> → <b>use the equation ratio</b> → <b>back to grams</b> → <b>apply the yield</b>.',
        'Purity is about what goes <b>in</b>; yield is about what comes <b>out</b>. Mixing them up is the most common mistake.'],
      so: 'many reactions happen dissolved in water. So we need to measure how much of each thing is in a liquid: <b>concentration</b>.',
      ch: mCh('200 g of limestone with 50% purity. How much CaCO₃ actually reacts?', ['100 g', '200 g', '50 g', '56 g'], 'Only the pure part reacts: 50% of 200 g = 100 g.'),
      how: 'Change the limestone mass, the purity and the yield. Each bar is one step of the math, ending with the lime (CaO) you get.',
      ui: { m: 'Limestone', pur: 'Purity', yld: 'Yield', s1: '1. Limestone (with impurities)', s2: '2. Pure CaCO₃', s3: '3. Moles of CaCO₃ (÷ 100)', s4: '4. Possible CaO (× 56)', s5: '5. Real CaO (× yield)' },
    } },

  { id: 's-conc', track: 'calc', icon: '🧃', m: 1,
    pt: {
      t: 'Concentração: quanto tem em cada litro',
      lead: 'Não importa só quanto você dissolveu, mas em quanto líquido.',
      p: ['Uma colher de sal num copo deixa a água bem salgada. A mesma colher numa piscina, você nem sente. O que importa é a <b>concentração</b>: quanto soluto tem em cada litro.',
        '<ul class="fl-list"><li><b>g/L</b>: gramas de soluto ÷ litros de solução.</li><li><b>mol/L</b> (molaridade): mols de soluto ÷ litros. Conta <b>partículas</b>, não peso: é o que importa para a reação.</li></ul>',
        'Mexa na massa e no volume:'],
      after: ['Repare: 9 g de sal ou 9 g de açúcar no mesmo litro dão o mesmo g/L, mas o mol/L do açúcar é bem menor: cada molécula de açúcar pesa quase 6 vezes mais que um NaCl, então 9 g têm muito menos partículas.',
        'O <b>soro fisiológico</b> tem 9 g/L de NaCl, a mesma concentração de sal do nosso sangue. Água pura na veia faria as células incharem (lição de propriedades coligativas).'],
      so: 'e se você colocar mais água numa solução? O soluto não muda, mas a concentração cai. Isso é a <b>diluição</b>.',
      ch: mCh('Você dissolve 20 g de sal em 0,5 L. Qual a concentração?', ['40 g/L', '10 g/L', '20 g/L', '0,5 g/L'], '20 g ÷ 0,5 L = 40 g/L.'),
      how: 'Escolha o soluto e mexa nas barras de massa e de volume. Veja a concentração em g/L e em mol/L e com o que ela se parece.',
      ui: { subs: { nacl: 'Sal (NaCl)', sug: 'Açúcar', naoh: 'Soda (NaOH)' }, g: 'Soluto', v: 'Volume', cg: 'Concentração', cm: 'Molaridade', near: 'Parecido com:', ref: [[9, 'soro fisiológico'], [35, 'água do mar'], [100, 'refrigerante (açúcar)'], [1, 'quase água pura'], [300, 'calda bem doce']] },
    },
    en: {
      t: 'Concentration: how much per liter',
      lead: 'It is not just how much you dissolved, but in how much liquid.',
      p: ['A spoon of salt in a glass makes the water very salty. The same spoon in a pool, you cannot even taste it. What matters is <b>concentration</b>: how much solute per liter.',
        '<ul class="fl-list"><li><b>g/L</b>: grams of solute ÷ liters of solution.</li><li><b>mol/L</b> (molarity): moles of solute ÷ liters. It counts <b>particles</b>, not weight: that is what matters for reactions.</li></ul>',
        'Change the mass and the volume:'],
      after: ['Notice: 9 g of salt or 9 g of sugar in the same liter give the same g/L, but the sugar mol/L is much lower: each sugar molecule weighs almost 6 times an NaCl, so 9 g hold far fewer particles.',
        '<b>Saline</b> has 9 g/L of NaCl, the same salt concentration as our blood. Pure water in a vein would make cells swell (see the colligative properties lesson).'],
      so: 'what if you add more water to a solution? The solute does not change, but the concentration drops. That is <b>dilution</b>.',
      ch: mCh('You dissolve 20 g of salt in 0.5 L. What is the concentration?', ['40 g/L', '10 g/L', '20 g/L', '0.5 g/L'], '20 g ÷ 0.5 L = 40 g/L.'),
      how: 'Pick the solute and move the mass and volume bars. See the concentration in g/L and mol/L and what it resembles.',
      ui: { subs: { nacl: 'Salt (NaCl)', sug: 'Sugar', naoh: 'Lye (NaOH)' }, g: 'Solute', v: 'Volume', cg: 'Concentration', cm: 'Molarity', near: 'Similar to:', ref: [[9, 'saline'], [35, 'seawater'], [100, 'soda (sugar)'], [1, 'almost pure water'], [300, 'very sweet syrup']] },
    } },

  { id: 's-dilute', track: 'calc', icon: '💧', m: 1,
    pt: {
      t: 'Diluição: mais água, mesmo soluto',
      lead: 'Por que o suco concentrado vira suco "normal" com água.',
      p: ['Diluir é só <b>acrescentar solvente</b>. O soluto que estava lá continua lá, só que espalhado num volume maior. Então:',
        '<p class="al-formula"><b>C₁ · V₁ = C₂ · V₂</b> (a quantidade de soluto antes = depois)</p>',
        'Comece com 250 mL de um suco concentrado de 40 g/L de açúcar e vá colocando água:'],
      after: ['Os pontinhos (as moléculas de açúcar) são <b>sempre os mesmos 40</b>: só ficam mais espalhados. Dobrou o volume, a concentração caiu pela metade.',
        'É assim que se prepara uma solução no laboratório: parte de uma solução "estoque" concentrada e dilui até a concentração desejada. Na casa, é a água sanitária diluída para limpar.'],
      so: 'até aqui, líquidos. E os <b>gases</b>? Eles enchem qualquer recipiente e empurram as paredes. Por quê?',
      ch: mCh('Você tem 1 L de solução a 20 g/L e completa até 4 L com água. Qual a nova concentração?', ['5 g/L', '80 g/L', '20 g/L', '16 g/L'], 'C₁V₁ = C₂V₂: 20 × 1 = C₂ × 4, então C₂ = 5 g/L.'),
      how: 'Arraste a barra para colocar água no copo. Veja a cor clarear, a concentração cair e a massa de açúcar continuar a mesma.',
      ui: { add: 'Água adicionada', vol: 'Volume total', c: 'Concentração', m: 'Açúcar', same: '(sempre o mesmo!)' },
    },
    en: {
      t: 'Dilution: more water, same solute',
      lead: 'Why juice concentrate becomes "normal" juice with water.',
      p: ['Diluting is just <b>adding solvent</b>. The solute that was there stays there, just spread over a bigger volume. So:',
        '<p class="al-formula"><b>C₁ · V₁ = C₂ · V₂</b> (amount of solute before = after)</p>',
        'Start with 250 mL of juice concentrate at 40 g/L of sugar and add water:'],
      after: ['The dots (the sugar molecules) are <b>always the same 40</b>: they just spread out. Double the volume and the concentration halves.',
        'That is how lab solutions are made: start from a concentrated "stock" solution and dilute to the concentration you want. At home, it is bleach diluted for cleaning.'],
      so: 'so far, liquids. What about <b>gases</b>? They fill any container and push on the walls. Why?',
      ch: mCh('You have 1 L of solution at 20 g/L and top it up to 4 L with water. New concentration?', ['5 g/L', '80 g/L', '20 g/L', '16 g/L'], 'C₁V₁ = C₂V₂: 20 × 1 = C₂ × 4, so C₂ = 5 g/L.'),
      how: 'Drag the bar to add water to the glass. Watch the color fade, the concentration drop and the sugar mass stay the same.',
      ui: { add: 'Water added', vol: 'Total volume', c: 'Concentration', m: 'Sugar', same: '(always the same!)' },
    } },

  { id: 'o-carbon', track: 'org', icon: '⛓️', m: 0,
    pt: {
      t: 'Por que o carbono forma milhões de moléculas?',
      lead: 'Um átomo no meio do caminho, que prefere dividir a dar ou roubar.',
      p: ['O carbono tem <b>4 elétrons</b> na última camada: exatamente no meio do caminho até 8. Perder 4 ou ganhar 4 custaria energia demais, então ele <b>divide</b>: faz <b>4 ligações covalentes</b>. E a ligação C–C é forte, então o carbono consegue formar <b>cadeias longas</b>, ramificadas e em anel, coisa que quase nenhum outro elemento faz.',
        'A química orgânica é a química dessas cadeias. As mais simples só têm C e H (<b>hidrocarbonetos</b>), e o nome conta a estrutura: o <b>começo</b> diz quantos carbonos (met = 1, et = 2, prop = 3, but = 4, pent = 5…), o <b>meio</b> diz o tipo de ligação (<b>an</b> = só simples, <b>en</b> = uma dupla, <b>in</b> = uma tripla) e o <b>o</b> final diz que é hidrocarboneto. Monte:'],
      after: ['Repare que cada carbono tem <b>sempre 4 ligações</b>: as que faltam são completadas com H. Quando entra uma dupla, sobram menos H (por isso C₂H₄ e não C₂H₆).',
        'Cadeias pequenas (1 a 4 C) são <b>gases</b> (gás de cozinha = propano + butano), médias são <b>líquidas</b> (gasolina ≈ 8 C) e longas são <b>sólidas</b> (parafina de vela, 20+ C). Quanto maior a molécula, mais ela gruda nas vizinhas.'],
      so: 'cadeias de C e H são apolares e "sem graça". O que dá personalidade a uma molécula orgânica é um <b>grupo funcional</b> pendurado nela.',
      ch: mCh('Por que o carbono faz 4 ligações?', ['Tem 4 elétrons na última camada e divide os 4 para chegar a 8', 'Porque tem 4 prótons', 'Porque é um metal', 'Porque está na 4ª linha da tabela'], 'Com 4 elétrons de fora, dividir 4 pares completa o octeto. Ganhar ou perder 4 seria caro demais.'),
      how: 'Mude o número de carbonos e o tipo de ligação. Com 4 ou mais carbonos, escolha também a posição da dupla ou tripla. O nome e a fórmula se montam sozinhos.',
      ui: { n: 'Carbonos', bond: 'Ligação', b: ['só simples (-ano)', 'uma dupla (-eno)', 'uma tripla (-ino)'], pos: 'Posição', state: ['💨 Gás a 25 °C.', '💧 Líquido a 25 °C.'], uses: { metano: 'gás natural e biogás', etano: 'gás natural', propano: 'gás de cozinha (GLP)', butano: 'gás de cozinha e isqueiro', octano: 'principal parte da gasolina', eteno: 'amadurece frutas e vira plástico (polietileno)', etino: 'acetileno, do maçarico de solda', propeno: 'vira plástico (polipropileno)' } },
    },
    en: {
      t: 'Why does carbon make millions of molecules?',
      lead: 'An atom halfway there, which prefers sharing to giving or stealing.',
      p: ['Carbon has <b>4 electrons</b> in its outer shell: exactly halfway to 8. Losing or gaining 4 would cost too much energy, so it <b>shares</b>: it makes <b>4 covalent bonds</b>. And the C–C bond is strong, so carbon can form <b>long chains</b>, branched and in rings, something almost no other element does.',
        'Organic chemistry is the chemistry of these chains. The simplest have only C and H (<b>hydrocarbons</b>), and the name tells the structure: the <b>start</b> says how many carbons (meth = 1, eth = 2, prop = 3, but = 4, pent = 5…) and the <b>ending</b> says the bond type (<b>-ane</b> = only single, <b>-ene</b> = one double, <b>-yne</b> = one triple). Build one:'],
      after: ['Notice each carbon <b>always has 4 bonds</b>: the missing ones are filled with H. With a double bond there are fewer H (that is why C₂H₄ and not C₂H₆).',
        'Small chains (1 to 4 C) are <b>gases</b> (cooking gas = propane + butane), medium ones are <b>liquids</b> (gasoline ≈ 8 C) and long ones are <b>solids</b> (candle wax, 20+ C). The bigger the molecule, the more it sticks to its neighbors.'],
      so: 'C and H chains are nonpolar and "plain". What gives an organic molecule personality is a <b>functional group</b> attached to it.',
      ch: mCh('Why does carbon make 4 bonds?', ['It has 4 outer electrons and shares all 4 to reach 8', 'Because it has 4 protons', 'Because it is a metal', 'Because it is in row 4 of the table'], 'With 4 outer electrons, sharing 4 pairs completes the octet. Gaining or losing 4 would cost too much.'),
      how: 'Change the number of carbons and the bond type. With 4 or more carbons, also pick the position of the double or triple bond. The name and formula build themselves.',
      ui: { n: 'Carbons', bond: 'Bond', b: ['single only (-ane)', 'one double (-ene)', 'one triple (-yne)'], pos: 'Position', state: ['💨 Gas at 25 °C.', '💧 Liquid at 25 °C.'], uses: { methane: 'natural gas and biogas', ethane: 'natural gas', propane: 'cooking gas (LPG)', butane: 'cooking gas and lighters', octane: 'main part of gasoline', ethene: 'ripens fruit and becomes plastic (polyethylene)', ethyne: 'acetylene, for welding torches', propene: 'becomes plastic (polypropylene)' } },
    } },

  { id: 'o-groups', track: 'org', icon: '🧷', m: 2,
    pt: {
      t: 'Funções orgânicas: o grupo dá a personalidade',
      lead: 'Troque um H por um grupo e a molécula vira outra coisa.',
      p: ['A cadeia de carbono é o "corpo". O <b>grupo funcional</b> é a parte com átomos diferentes (O, N, Cl…) que decide como a molécula reage e se comporta. Moléculas com o mesmo grupo formam uma <b>função</b>, e o grupo também decide o <b>final do nome</b>. Toque em cada função:'],
      after: ['Por que o grupo manda tanto? Porque O, N e Cl <b>puxam elétrons</b> mais que C e H (lição "A puxada do núcleo"). Eles criam lados + e − numa molécula que era apolar, e alguns (OH, NH, COOH) ainda fazem <b>ligação de hidrogênio</b>. É isso que muda o ponto de ebulição, a solubilidade e as reações.',
        'Dica para reconhecer: procure o grupo, não decore a molécula inteira. <b>OH</b> numa cadeia = álcool; <b>C=O no meio</b> = cetona; <b>C=O na ponta</b> = aldeído; <b>COOH</b> = ácido; <b>COO no meio</b> = éster; <b>O no meio</b> = éter; <b>N</b> = amina (ou amida, se tiver C=O junto).'],
      so: 'o grupo cria uma "cabeça" polar presa numa "cauda" apolar. Quem ganha a briga depende do tamanho de cada um.',
      ch: mCh('O que diferencia uma cetona de um aldeído?', ['Na cetona o C=O fica no meio da cadeia; no aldeído, na ponta', 'A cetona tem nitrogênio', 'O aldeído não tem oxigênio', 'Não há diferença'], 'Os dois têm C=O (carbonila). A posição muda tudo: na ponta (com um H) é aldeído; entre dois carbonos é cetona.'),
      how: 'Toque numa função. O grupo funcional aparece colorido na fórmula, com o final do nome e onde você encontra essa molécula.',
      ui: { ex: 'Exemplo', grp: 'Grupo', suf: 'Nome termina em', f: {
        hc: ['Hidrocarboneto', 'só C e H', '-ano, -eno, -ino', 'Combustíveis: gás, gasolina, diesel. Apolares: não se misturam com água.'],
        alc: ['Álcool', '–OH ligado a carbono de ligações simples', '-ol', 'Etanol: combustível, bebidas, álcool em gel. O OH faz ligação de hidrogênio: o etanol se mistura com água.'],
        ald: ['Aldeído', '–CHO (C=O na ponta)', '-al', 'Metanal (formol): conserva peças de anatomia. Etanal: causa parte da ressaca.'],
        ket: ['Cetona', 'C=O entre dois carbonos', '-ona', 'Propanona (acetona): removedor de esmalte.'],
        acid: ['Ácido carboxílico', '–COOH', 'ácido …-oico', 'Ácido acético: o do vinagre. Entrega H⁺ fácil porque os dois O puxam muito.'],
        est: ['Éster', '–COO– entre duas cadeias', '…-ato de …-ila', 'Cheiro de frutas: aromas artificiais de banana, abacaxi, morango. Também são as gorduras e o biodiesel.'],
        eth: ['Éter', '–O– entre duas cadeias', 'nome com "oxi"', 'Etoxietano: já foi usado como anestésico. Volátil e inflamável.'],
        amn: ['Amina', '–NH₂ (N ligado a carbono)', '-amina', 'Cheiro de peixe estragado. Base orgânica: pega H⁺ como a amônia.'],
        amd: ['Amida', '–CONH₂ (C=O junto do N)', '-amida', 'A ureia é uma amida. A ligação entre aminoácidos nas proteínas também!'],
        hal: ['Haleto orgânico', 'halogênio (F, Cl, Br, I) no carbono', 'cloro-, bromo-…', 'CFCs (gases de geladeiras antigas) destruíam a camada de ozônio.'],
        phe: ['Fenol', '–OH preso direto num anel benzênico', 'fenol', 'Desinfetantes antigos. Mais ácido que um álcool, por causa do anel.'] } },
    },
    en: {
      t: 'Organic functions: the group gives the personality',
      lead: 'Swap an H for a group and the molecule becomes something else.',
      p: ['The carbon chain is the "body". The <b>functional group</b> is the part with different atoms (O, N, Cl…) that decides how the molecule reacts and behaves. Molecules with the same group form a <b>function</b>, and the group also decides the <b>ending of the name</b>. Tap each function:'],
      after: ['Why does the group matter so much? Because O, N and Cl <b>pull electrons</b> harder than C and H ("The nucleus pull" lesson). They create + and − sides on a molecule that was nonpolar, and some (OH, NH, COOH) also make <b>hydrogen bonds</b>. That changes boiling point, solubility and reactions.',
        'Tip: look for the group, do not memorize the whole molecule. <b>OH</b> on a chain = alcohol; <b>C=O in the middle</b> = ketone; <b>C=O at the end</b> = aldehyde; <b>COOH</b> = acid; <b>COO in the middle</b> = ester; <b>O in the middle</b> = ether; <b>N</b> = amine (or amide, if there is a C=O next to it).'],
      so: 'the group makes a polar "head" stuck to a nonpolar "tail". Who wins depends on the size of each.',
      ch: mCh('What makes a ketone different from an aldehyde?', ['In a ketone the C=O is in the middle of the chain; in an aldehyde, at the end', 'Ketones have nitrogen', 'Aldehydes have no oxygen', 'No difference'], 'Both have C=O (carbonyl). Position changes everything: at the end (with an H) it is an aldehyde; between two carbons it is a ketone.'),
      how: 'Tap a function. The functional group is colored in the formula, with the name ending and where you find that molecule.',
      ui: { ex: 'Example', grp: 'Group', suf: 'Name ends in', f: {
        hc: ['Hydrocarbon', 'only C and H', '-ane, -ene, -yne', 'Fuels: gas, gasoline, diesel. Nonpolar: they do not mix with water.'],
        alc: ['Alcohol', '–OH on a carbon with single bonds', '-ol', 'Ethanol: fuel, drinks, hand sanitizer. The OH makes hydrogen bonds: ethanol mixes with water.'],
        ald: ['Aldehyde', '–CHO (C=O at the end)', '-al', 'Methanal (formaldehyde): preserves anatomy specimens. Ethanal: part of what causes hangovers.'],
        ket: ['Ketone', 'C=O between two carbons', '-one', 'Propanone (acetone): nail polish remover.'],
        acid: ['Carboxylic acid', '–COOH', '…-oic acid', 'Acetic acid: the one in vinegar. Gives H⁺ easily because the two O pull hard.'],
        est: ['Ester', '–COO– between two chains', '…-yl …-oate', 'Fruit smells: artificial banana, pineapple, strawberry aromas. Fats and biodiesel are esters too.'],
        eth: ['Ether', '–O– between two chains', 'name with "oxy"', 'Ethoxyethane: once used as an anesthetic. Volatile and flammable.'],
        amn: ['Amine', '–NH₂ (N bonded to carbon)', '-amine', 'Smell of rotten fish. An organic base: takes H⁺ like ammonia.'],
        amd: ['Amide', '–CONH₂ (C=O next to N)', '-amide', 'Urea is an amide. So is the link between amino acids in proteins!'],
        hal: ['Organic halide', 'halogen (F, Cl, Br, I) on carbon', 'chloro-, bromo-…', 'CFCs (old fridge gases) destroyed the ozone layer.'],
        phe: ['Phenol', '–OH directly on a benzene ring', 'phenol', 'Old disinfectants. More acidic than an alcohol, because of the ring.'] } },
    } },

  { id: 'o-props', track: 'org', icon: '🥊', m: 0,
    pt: {
      t: 'Cabeça polar contra cauda apolar',
      lead: 'Por que o álcool se mistura com água, mas o óleo não.',
      p: ['Um álcool tem duas partes brigando: a <b>cabeça OH</b>, polar, que faz ligação de hidrogênio com a água, e a <b>cauda de carbonos</b>, apolar, que "foge" da água (como o óleo). Quem vence depende do tamanho de cada uma. Aumente a cauda:'],
      after: ['Com 1 a 3 carbonos, a cabeça vence: o álcool se mistura com água em qualquer proporção. A partir de 4, a cauda começa a ganhar e a solubilidade despenca. É a mesma ideia do <b>sabão</b>: cabeça que gosta de água, cauda que gosta de gordura.',
        'Já o ponto de ebulição só <b>sobe</b>: a molécula fica maior e mais "grudenta" (mais superfície para as atrações entre moléculas). Compare com um hidrocarboneto do mesmo tamanho: o propano ferve a −42 °C, o propanol a 97 °C. A diferença é toda da cabeça OH.'],
      so: 'moléculas com os mesmos átomos podem ser montadas de jeitos diferentes, e viram substâncias diferentes. É a <b>isomeria</b>.',
      ch: mCh('Por que o octanol quase não se dissolve em água, se tem OH?', ['A cauda apolar de 8 carbonos é grande demais e vence a cabeça OH', 'O octanol não tem oxigênio', 'Ele é sólido', 'A água não faz ligação de hidrogênio'], 'O OH ainda está lá, mas é uma cabeça pequena presa a uma cauda enorme que foge da água.'),
      how: 'Arraste a barra para aumentar a cauda de carbonos do álcool. Compare o ponto de ebulição e quanto dele se dissolve em água.',
      ui: { n: 'Carbonos na cauda', tail: 'cauda apolar (foge da água)', head: 'cabeça polar', bp: 'Ferve a', sol: 'Dissolve em água', inf: 'mistura em qualquer proporção', m1: '💧 A cabeça OH vence: mistura com água em qualquer proporção.', m2: '⚖️ Empate apertado: dissolve só um pouco.', m3: '🛢️ A cauda vence: quase não dissolve, fica parecido com óleo.' },
    },
    en: {
      t: 'Polar head versus nonpolar tail',
      lead: 'Why alcohol mixes with water, but oil does not.',
      p: ['An alcohol has two parts fighting: the polar <b>OH head</b>, which makes hydrogen bonds with water, and the nonpolar <b>carbon tail</b>, which "runs away" from water (like oil). Who wins depends on the size of each. Grow the tail:'],
      after: ['With 1 to 3 carbons, the head wins: the alcohol mixes with water in any proportion. From 4 on, the tail starts winning and solubility plummets. It is the same idea as <b>soap</b>: a head that likes water, a tail that likes grease.',
        'The boiling point only goes <b>up</b>: the molecule gets bigger and "stickier" (more surface for attractions between molecules). Compare with a hydrocarbon of the same size: propane boils at −42 °C, propanol at 97 °C. The difference is all from the OH head.'],
      so: 'molecules with the same atoms can be put together in different ways, and become different substances. That is <b>isomerism</b>.',
      ch: mCh('Why does octanol barely dissolve in water, if it has OH?', ['Its 8-carbon nonpolar tail is too big and beats the OH head', 'Octanol has no oxygen', 'It is a solid', 'Water does not make hydrogen bonds'], 'The OH is still there, but it is a small head on a huge tail that avoids water.'),
      how: 'Drag the bar to grow the alcohol carbon tail. Compare the boiling point and how much dissolves in water.',
      ui: { n: 'Carbons in the tail', tail: 'nonpolar tail (avoids water)', head: 'polar head', bp: 'Boils at', sol: 'Dissolves in water', inf: 'mixes in any proportion', m1: '💧 The OH head wins: mixes with water in any proportion.', m2: '⚖️ Close fight: dissolves only a little.', m3: '🛢️ The tail wins: barely dissolves, behaves like oil.' },
    } },

  { id: 'o-isomer', track: 'org', icon: '🪞', m: 0,
    pt: {
      t: 'Isomeria: mesma fórmula, outra molécula',
      lead: 'Com as mesmas peças de LEGO dá para montar coisas diferentes.',
      p: ['<b>Isômeros</b> têm a <b>mesma fórmula molecular</b> (mesmos átomos, mesma quantidade), mas estão ligados de jeitos diferentes. E jeito diferente = substância diferente, com outro ponto de ebulição, outro cheiro, outra reação. Veja os tipos:'],
      after: ['<ul class="fl-list"><li>⛓️ <b>De cadeia</b>: a cadeia muda (reta ou ramificada).</li><li>🧷 <b>De função</b>: muda até a função! Etanol (álcool) e metoximetano (éter) têm a mesma fórmula C₂H₆O.</li><li>📍 <b>De posição</b>: o grupo ou a dupla muda de lugar.</li><li>↔️ <b>Geométrica (cis-trans)</b>: a ligação dupla não gira, então os grupos ficam "do mesmo lado" (cis) ou "de lados opostos" (trans).</li><li>🪞 <b>Óptica</b>: um carbono com 4 grupos diferentes forma duas moléculas que são <b>imagem no espelho</b> uma da outra, como sua mão direita e a esquerda. Não dá para sobrepor.</li></ul>',
        'A isomeria óptica parece detalhe, mas não é: nosso nariz e nosso corpo são "canhotos" ou "destros" também. A (R)-carvona tem cheiro de hortelã e a (S)-carvona, de alcaravia (parecida com cominho). Em remédios, uma das versões pode curar e a outra fazer mal.'],
      so: 'agora você reconhece as moléculas orgânicas. Mas o que elas <b>fazem</b>? A reação mais importante delas você vê todo dia: a queima.',
      ch: mCh('Etanol (CH₃–CH₂–OH) e metoximetano (CH₃–O–CH₃) são isômeros de quê?', ['De função: mesma fórmula, funções diferentes', 'De cadeia', 'Ópticos', 'Não são isômeros'], 'Os dois são C₂H₆O, mas um é álcool e o outro é éter.'),
      how: 'Toque em cada tipo de isomeria. Os dois isômeros aparecem lado a lado com a fórmula em comum e a diferença nas propriedades.',
      ui: { bp: 'ferve a', smell: ['cheiro de hortelã', 'cheiro de alcaravia (parecido com cominho)'], t: { chain: ['De cadeia', 'mesma fórmula C₄H₁₀, mas uma cadeia é reta e a outra ramificada. A ramificada é mais "redonda", gruda menos e ferve mais frio.'], func: ['De função', 'mesma fórmula C₂H₆O: um é álcool (faz ligação de hidrogênio, ferve a 78 °C), o outro é éter (não faz, ferve a −24 °C).'], func2: ['Aldeído × cetona', 'mesma fórmula C₃H₆O: o C=O na ponta faz um aldeído; no meio, uma cetona.'], pos: ['De posição', 'a ligação dupla muda de lugar na cadeia.'], geo: ['Cis-trans', 'a dupla não gira: os CH₃ ficam do mesmo lado (cis) ou em lados opostos (trans).'], opt: ['Óptica', 'imagens no espelho, como mão direita e esquerda. Mesmo ponto de ebulição, mas cheiros diferentes!'] } },
    },
    en: {
      t: 'Isomerism: same formula, another molecule',
      lead: 'With the same LEGO pieces you can build different things.',
      p: ['<b>Isomers</b> have the <b>same molecular formula</b> (same atoms, same amounts) but are connected in different ways. And a different arrangement = a different substance, with another boiling point, smell and reactions. See the kinds:'],
      after: ['<ul class="fl-list"><li>⛓️ <b>Chain</b>: the chain changes (straight or branched).</li><li>🧷 <b>Functional</b>: even the function changes! Ethanol (alcohol) and methoxymethane (ether) share the formula C₂H₆O.</li><li>📍 <b>Positional</b>: the group or double bond moves.</li><li>↔️ <b>Geometric (cis-trans)</b>: a double bond cannot rotate, so groups are "on the same side" (cis) or "on opposite sides" (trans).</li><li>🪞 <b>Optical</b>: a carbon with 4 different groups forms two molecules that are <b>mirror images</b>, like your right and left hands. They cannot be overlapped.</li></ul>',
        'Optical isomerism seems minor, but it is not: our nose and body are "left-" or "right-handed" too. (R)-carvone smells like spearmint and (S)-carvone like caraway. In medicines, one version may heal and the other may harm.'],
      so: 'now you can recognize organic molecules. But what do they <b>do</b>? Their most important reaction you see every day: burning.',
      ch: mCh('Ethanol (CH₃–CH₂–OH) and methoxymethane (CH₃–O–CH₃) are what kind of isomers?', ['Functional: same formula, different functions', 'Chain', 'Optical', 'They are not isomers'], 'Both are C₂H₆O, but one is an alcohol and the other an ether.'),
      how: 'Tap each kind of isomerism. Both isomers appear side by side with the shared formula and how their properties differ.',
      ui: { bp: 'boils at', smell: ['smells like spearmint', 'smells like caraway'], t: { chain: ['Chain', 'same formula C₄H₁₀, but one chain is straight and the other branched. The branched one is "rounder", sticks less and boils colder.'], func: ['Functional', 'same formula C₂H₆O: one is an alcohol (makes hydrogen bonds, boils at 78 °C), the other an ether (does not, boils at −24 °C).'], func2: ['Aldehyde × ketone', 'same formula C₃H₆O: C=O at the end makes an aldehyde; in the middle, a ketone.'], pos: ['Positional', 'the double bond moves along the chain.'], geo: ['Cis-trans', 'the double bond cannot rotate: the CH₃ groups are on the same side (cis) or opposite sides (trans).'], opt: ['Optical', 'mirror images, like right and left hands. Same boiling point, but different smells!'] } },
    } },

  { id: 'o-react', track: 'org', icon: '🔥', m: 1,
    pt: {
      t: 'Reações orgânicas: a queima e outras',
      lead: 'Combustão completa, incompleta, e como se faz um cheiro de fruta.',
      p: ['A reação orgânica mais comum é a <b>combustão</b>: o combustível reage com O₂ e vira <b>CO₂ + H₂O</b>, soltando muita energia. É ela que move carros, cozinha a comida e (dentro das células, devagarinho) mantém você vivo.',
        'Mas se falta oxigênio, a queima fica <b>incompleta</b> e sai <b>CO</b> (monóxido de carbono) e fuligem. Balanceie a combustão para cadeias de vários tamanhos:'],
      after: ['O <b>CO</b> é perigoso porque gruda na hemoglobina do sangue cerca de 200 vezes mais forte que o O₂, e não tem cheiro. Por isso aquecedor a gás em banheiro fechado mata. Chama azul = queima completa; chama amarela com fuligem = falta oxigênio.',
        'Outras reações importantes:',
        '<ul class="fl-list"><li>🍌 <b>Esterificação</b>: ácido + álcool → éster + água. É assim que se fazem aromas de fruta (e o biodiesel).</li><li>➕ <b>Adição</b>: a ligação dupla "abre" e recebe átomos. Com H₂, o óleo vegetal vira margarina (hidrogenação).</li><li>🔁 <b>Substituição</b>: um H da cadeia é trocado por outro átomo (como Cl).</li></ul>'],
      so: 'e se a dupla, em vez de receber átomos pequenos, se abrir para se ligar a <b>outras moléculas iguais</b>, milhares de vezes? Nasce um plástico.',
      ch: mCh('Por que um aquecedor a gás num banheiro fechado é perigoso?', ['Com pouco oxigênio a queima fica incompleta e solta CO, que é tóxico e sem cheiro', 'O gás explode sozinho', 'O vapor de água é tóxico', 'O CO₂ tem cheiro forte'], 'Sem O₂ suficiente, sai CO no lugar de CO₂. Ele toma o lugar do oxigênio no sangue.'),
      how: 'Arraste a barra para mudar o tamanho do hidrocarboneto e troque entre muito e pouco oxigênio. A equação já aparece balanceada.',
      ui: { n: 'Carbonos', full: '🔵 Muito oxigênio (completa)', part: '🟡 Pouco oxigênio (incompleta)', okMsg: '🔥 Combustão completa: libera cerca de <b>{e} kJ</b> por mol de combustível.', badMsg: '☠️ Combustão incompleta: sai <b>CO</b> (tóxico) e fuligem, e libera bem menos energia.' },
    },
    en: {
      t: 'Organic reactions: burning and more',
      lead: 'Complete and incomplete combustion, and how a fruit smell is made.',
      p: ['The most common organic reaction is <b>combustion</b>: the fuel reacts with O₂ and becomes <b>CO₂ + H₂O</b>, releasing lots of energy. It moves cars, cooks food and (slowly, inside your cells) keeps you alive.',
        'But if oxygen is short, burning becomes <b>incomplete</b> and gives <b>CO</b> (carbon monoxide) and soot. Balance the combustion for chains of several sizes:'],
      after: ['<b>CO</b> is dangerous because it sticks to blood hemoglobin about 200 times more strongly than O₂, and has no smell. That is why gas heaters in closed bathrooms kill. Blue flame = complete burning; yellow sooty flame = not enough oxygen.',
        'Other important reactions:',
        '<ul class="fl-list"><li>🍌 <b>Esterification</b>: acid + alcohol → ester + water. That is how fruit aromas (and biodiesel) are made.</li><li>➕ <b>Addition</b>: the double bond "opens" and takes in atoms. With H₂, vegetable oil becomes margarine (hydrogenation).</li><li>🔁 <b>Substitution</b>: an H on the chain is swapped for another atom (like Cl).</li></ul>'],
      so: 'what if the double bond, instead of taking small atoms, opens to bond to <b>other identical molecules</b>, thousands of times? A plastic is born.',
      ch: mCh('Why is a gas heater in a closed bathroom dangerous?', ['With little oxygen the burning is incomplete and gives CO, which is toxic and odorless', 'The gas explodes by itself', 'Water vapor is toxic', 'CO₂ smells strong'], 'Without enough O₂, CO comes out instead of CO₂. It takes oxygen\'s place in the blood.'),
      how: 'Drag the bar to change the hydrocarbon size and switch between plenty and little oxygen. The equation appears already balanced.',
      ui: { n: 'Carbons', full: '🔵 Plenty of oxygen (complete)', part: '🟡 Little oxygen (incomplete)', okMsg: '🔥 Complete combustion: releases about <b>{e} kJ</b> per mole of fuel.', badMsg: '☠️ Incomplete combustion: gives <b>CO</b> (toxic) and soot, and releases much less energy.' },
    } },

  { id: 'o-poly', track: 'org', icon: '🧵', m: 1,
    pt: {
      t: 'Polímeros: o plástico é uma corrente gigante',
      lead: 'Milhares de moléculas pequenas de mãos dadas.',
      p: ['Um <b>polímero</b> é uma molécula enorme feita de uma pecinha (o <b>monômero</b>) repetida milhares de vezes. No eteno, a ligação dupla se abre e cada ponta se liga a outro eteno, e assim por diante: nasce o <b>polietileno</b>, o plástico da sacolinha. Monte o seu:'],
      after: ['Com poucas unidades é só um gás ou um líquido. Com <b>milhares</b>, as correntes se enroscam umas nas outras como macarrão, e o material vira um sólido flexível e resistente. Trocar um H do monômero por outro grupo muda o plástico inteiro: Cl dá o PVC (canos), CH₃ dá o polipropileno (potes), um anel dá o isopor.',
        'Esses são <b>polímeros de adição</b> (a dupla se abre). Outros, como o <b>PET</b> das garrafas e o náilon, são de <b>condensação</b>: cada ligação nova solta uma molécula pequena, geralmente água. E a natureza também faz polímeros: amido e celulose (de glicose), proteínas (de aminoácidos) e o DNA.',
        'O problema: as ligações C–C são fortes e quase nenhum ser vivo "come" plástico. Por isso ele dura séculos no ambiente.'],
      so: 'o carbono está no plástico, no combustível e no CO₂ que sai da queima. Para onde vai tudo isso? É a química do <b>ambiente</b>.',
      ch: mCh('O que acontece com a ligação dupla do eteno quando ele vira polietileno?', ['Ela se abre e cada ponta se liga a outro monômero', 'Ela vira tripla', 'Ela some junto com o hidrogênio', 'Nada, ela continua dupla'], 'É a polimerização por adição: a dupla abre e "dá as mãos" para os vizinhos.'),
      how: 'Escolha o plástico e toque em "Juntar mais um" para crescer a corrente (ou "+1000" para ir rápido). Veja a massa da molécula crescer.',
      ui: { mono: 'Monômero', add: '🔗 Juntar mais um', many: '⏩ +1000', n: 'Unidades', mass: 'Massa da molécula', big: 'agora é plástico de verdade!', empty: 'nenhuma unidade ainda', p: { pe: ['Polietileno', 'eteno', 'Sacolas, garrafas de shampoo, filmes plásticos.'], pvc: ['PVC', 'cloroeteno', 'Canos, fios elétricos, toalhas de mesa.'], pp: ['Polipropileno', 'propeno', 'Potes, tampas, para-choques.'], ps: ['Poliestireno', 'estireno', 'Isopor, copinhos descartáveis.'] } },
    },
    en: {
      t: 'Polymers: plastic is a giant chain',
      lead: 'Thousands of small molecules holding hands.',
      p: ['A <b>polymer</b> is a huge molecule made of a small piece (the <b>monomer</b>) repeated thousands of times. In ethene, the double bond opens and each end bonds to another ethene, and so on: <b>polyethylene</b> is born, the plastic in shopping bags. Build yours:'],
      after: ['With few units it is just a gas or a liquid. With <b>thousands</b>, the chains tangle like spaghetti, and the material becomes a flexible, tough solid. Swapping one H of the monomer for another group changes the whole plastic: Cl gives PVC (pipes), CH₃ gives polypropylene (containers), a ring gives styrofoam.',
        'These are <b>addition polymers</b> (the double bond opens). Others, like bottle <b>PET</b> and nylon, are <b>condensation</b> polymers: each new bond releases a small molecule, usually water. Nature makes polymers too: starch and cellulose (from glucose), proteins (from amino acids) and DNA.',
        'The problem: C–C bonds are strong and almost no living thing "eats" plastic. That is why it lasts centuries in the environment.'],
      so: 'carbon is in plastic, in fuel and in the CO₂ from burning. Where does it all go? That is <b>environmental</b> chemistry.',
      ch: mCh('What happens to ethene\'s double bond when it becomes polyethylene?', ['It opens and each end bonds to another monomer', 'It becomes triple', 'It disappears with the hydrogen', 'Nothing, it stays double'], 'That is addition polymerization: the double bond opens and "holds hands" with its neighbors.'),
      how: 'Pick the plastic and tap "Add one more" to grow the chain (or "+1000" to go fast). Watch the molecule mass grow.',
      ui: { mono: 'Monomer', add: '🔗 Add one more', many: '⏩ +1000', n: 'Units', mass: 'Molecule mass', big: 'now it is real plastic!', empty: 'no units yet', p: { pe: ['Polyethylene', 'ethene', 'Bags, shampoo bottles, plastic film.'], pvc: ['PVC', 'chloroethene', 'Pipes, electric wires, tablecloths.'], pp: ['Polypropylene', 'propene', 'Containers, lids, bumpers.'], ps: ['Polystyrene', 'styrene', 'Styrofoam, disposable cups.'] } },
    } },
);
