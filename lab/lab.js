'use strict';
// CheMaster Lab: ideia em construção, separada do resto do site.
// Usa ELEMENTS / CATS / applyDataLang de ../js/data.js e as massas de masses.js.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = $('#lab');
  const rnd = a => a[Math.floor(Math.random() * a.length)];

  const store = {
    get() { try { return JSON.parse(localStorage.getItem('chemaster')) || {}; } catch (e) { return {}; } },
    set(d) { try { localStorage.setItem('chemaster', JSON.stringify(d)); } catch (e) {} },
  };

  /* ---------- textos (curtos de propósito) ---------- */
  const TXT = {
    pt: {
      navGames: 'Jogos', navStudy: 'Estudar', footer: 'CheMaster · feito por Guido ⚛', docTitle: 'CheMaster Lab',
      beta: '🚧 Em construção!', betaText: 'O Lab é uma ideia em teste: pode mudar, sumir ou ter algum erro. Use à vontade, mas confira com o seu material de estudo.',
      tools: { ion: 'Íons', dist: 'Elétrons', iso: 'Isótopos', mol: 'Massa molar', bal: 'Equações' },
      learn: '📖 Aprender', practice: '✏️ Praticar',
      element: 'Elemento', charge: 'Carga', massNumber: 'Massa (A)',
      protons: 'prótons', electrons: 'elétrons', neutrons: 'nêutrons', chargeL: 'carga', massL: 'massa',
      neutral: 'neutro', cation: 'cátion', anion: 'ânion',
      ionLine: (el, q) => q === 0 ? `${el.name} neutro: prótons = elétrons` : q > 0 ? `Perdeu ${q} elétron${q > 1 ? 's' : ''} → cátion` : `Ganhou ${-q} elétron${q < -1 ? 's' : ''} → ânion`,
      how: 'Como calcular?', more: 'Mais detalhes',
      commonIon: s => `Íon mais comum: <b>${s}</b>`, nobleTip: 'Gás nobre: quase nunca vira íon.', noCommon: 'Não tem um íon “padrão” simples.',
      invalid: 'Carga grande demais para esse elemento.',
      shells: 'Camadas', valence: 'Valência', last: 'Último subnível',
      pauling: 'Ver diagrama de Linus Pauling', shellOrder: 'Por camadas',
      exception: (el, real) => `⚠️ Exceção: na prática o ${el.sym} fica <b>${real}</b>. Muitas provas usam o diagrama, mas algumas cobram a exceção.`,
      excIon: (el, real) => `⚠️ O ${el.sym} é exceção: para os íons, o Lab parte da configuração real (<b>${real}</b>).`,
      coefMol: (n, f, m, tot) => `O ${n} na frente indica ${n} mols. A massa molar de ${f} é ${m} g/mol, então ${n} mols pesam ${tot} g.`,
      errIons: 'O Lab ainda não balanceia equações com íons (cargas como Fe³⁺ ou e⁻). Use só substâncias neutras.',
      ionNote: 'Em cátions, os elétrons saem primeiro da última camada.',
      isoWhat: 'O que são isótopos?', isoTip: 'Mesmo elemento (mesmo Z), quantidade de nêutrons diferente. Por isso o A muda.',
      avgMass: (m, sc) => `Massa atômica média: ${m} u. Em exercícios: ${sc}.`, radioMass: m => `Radioativo: ${m} é o isótopo mais estável.`,
      badA: 'A não pode ser menor que o número de prótons.',
      formulaHint: 'Digite uma fórmula, ex.: H2SO4', rounded: 'Arredondadas', precise: 'Precisas', massesL: 'Massas',
      convert: 'Converter gramas em mols', particles: 'partículas',
      eqHint: 'Digite uma equação, ex.: H2 + O2 -> H2O', howBal: 'Como funciona?',
      balMethod: 'O Lab conta os átomos de cada elemento nos dois lados e acha os menores números inteiros que deixam tudo igual.',
      coefNote: 'Ignorei os números na frente das fórmulas: o Lab calcula.',
      errEmpty: 'Digite algo para calcular.', errCase: 'Cada símbolo começa com maiúscula (H2O, Co, NaCl).',
      errUnknown: x => `"${x}" não é um elemento.`, errParen: 'Algum parêntese não fecha.', errChar: x => `Não entendi "${x}".`,
      errIn: (f, m) => `${f}: ${m}`, errArrow: 'Separe os lados com uma seta: ->', errSide: 'Falta um lado da equação.',
      errOneSide: x => `${x} aparece só de um lado.`, errImpossible: 'Não dá para balancear. Confira as fórmulas.',
      errMany: 'Tem mais de um jeito de balancear. Separe em duas reações.',
      radioNote: 'Tem elemento radioativo: usei o isótopo mais estável.',
      score: (c, n) => `✓ ${c} de ${n}`, check: 'Conferir', next: 'Próxima →', reveal: 'Ver resposta',
      right: 'Acertou! ✓', wrong: 'Quase! ✗', answerIs: 'Resposta',
      level: 'Nível', levels: { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' }, range: 'Elementos',
      qElectrons: s => `Quantos elétrons tem o ${s}?`, qProtons: s => `Quantos prótons tem o ${s}?`,
      qKind: s => `${s} é cátion, ânion ou neutro?`,
      qDist: el => `Distribuição eletrônica do ${el.name} (Z = ${el.z})`,
      qValence: el => `Elétrons na camada de valência do ${el.name} (Z = ${el.z})?`,
      qLast: el => `Último subnível do ${el.name} (Z = ${el.z})?`,
      qNeutrons: s => `Quantos nêutrons tem o ${s}?`,
      qMassNum: (el, N) => `${el.name} (Z = ${el.z}) com ${N} nêutrons. Qual é o A?`,
      qMolar: f => `Massa molar de ${f}?`, qBal: 'Balanceie a equação',
      distHint: 'Ex.: 1s2 2s2 2p6', lastHint: 'Ex.: 3p5', numHint: 'Número', molHint: 'Em g/mol, ex.: 58,5',
      use: 'Use', balFill: 'Preencha todos os números (use 1).', balNotMin: g => `Está certo, mas dá para simplificar: divida tudo por ${g}.`,
      balTip: '💡 Deixe H e O por último.',
    },
    en: {
      navGames: 'Games', navStudy: 'Learn', footer: 'CheMaster · made by Guido ⚛', docTitle: 'CheMaster Lab',
      beta: '🚧 Under construction!', betaText: 'The Lab is an experiment: things may change, disappear or break. Have fun, but double check with your study material.',
      tools: { ion: 'Ions', dist: 'Electrons', iso: 'Isotopes', mol: 'Molar mass', bal: 'Equations' },
      learn: '📖 Learn', practice: '✏️ Practice',
      element: 'Element', charge: 'Charge', massNumber: 'Mass (A)',
      protons: 'protons', electrons: 'electrons', neutrons: 'neutrons', chargeL: 'charge', massL: 'mass',
      neutral: 'neutral', cation: 'cation', anion: 'anion',
      ionLine: (el, q) => q === 0 ? `Neutral ${el.name}: protons = electrons` : q > 0 ? `Lost ${q} electron${q > 1 ? 's' : ''} → cation` : `Gained ${-q} electron${q < -1 ? 's' : ''} → anion`,
      how: 'How to calculate?', more: 'More details',
      commonIon: s => `Most common ion: <b>${s}</b>`, nobleTip: 'Noble gas: almost never becomes an ion.', noCommon: 'No simple “standard” ion.',
      invalid: 'Charge too big for this element.',
      shells: 'Shells', valence: 'Valence', last: 'Last sublevel',
      pauling: 'Show the Aufbau diagram', shellOrder: 'By shell',
      exception: (el, real) => `⚠️ Exception: in reality ${el.sym} is <b>${real}</b>. Many exams use the diagram, but some ask about the exception.`,
      excIon: (el, real) => `⚠️ ${el.sym} is an exception: for its ions, the Lab starts from the real configuration (<b>${real}</b>).`,
      coefMol: (n, f, m, tot) => `The ${n} in front means ${n} moles. The molar mass of ${f} is ${m} g/mol, so ${n} moles weigh ${tot} g.`,
      errIons: 'The Lab cannot balance equations with ions yet (charges like Fe³⁺ or e⁻). Use neutral substances only.',
      ionNote: 'In cations, electrons leave the outermost shell first.',
      isoWhat: 'What are isotopes?', isoTip: 'Same element (same Z), different number of neutrons. That is why A changes.',
      avgMass: (m, sc) => `Average atomic mass: ${m} u. In exercises: ${sc}.`, radioMass: m => `Radioactive: ${m} is the most stable isotope.`,
      badA: 'A cannot be smaller than the number of protons.',
      formulaHint: 'Type a formula, e.g. H2SO4', rounded: 'Rounded', precise: 'Precise', massesL: 'Masses',
      convert: 'Convert grams to moles', particles: 'particles',
      eqHint: 'Type an equation, e.g. H2 + O2 -> H2O', howBal: 'How does it work?',
      balMethod: 'The Lab counts the atoms of each element on both sides and finds the smallest whole numbers that make everything equal.',
      coefNote: 'I ignored the numbers in front of the formulas: the Lab works them out.',
      errEmpty: 'Type something to calculate.', errCase: 'Every symbol starts with a capital letter (H2O, Co, NaCl).',
      errUnknown: x => `"${x}" is not an element.`, errParen: 'A parenthesis is not closing.', errChar: x => `I did not understand "${x}".`,
      errIn: (f, m) => `${f}: ${m}`, errArrow: 'Split the sides with an arrow: ->', errSide: 'One side of the equation is missing.',
      errOneSide: x => `${x} shows up on only one side.`, errImpossible: 'It cannot be balanced. Check the formulas.',
      errMany: 'There is more than one way to balance it. Split it into two reactions.',
      radioNote: 'It has a radioactive element: I used its most stable isotope.',
      score: (c, n) => `✓ ${c} of ${n}`, check: 'Check', next: 'Next →', reveal: 'Show answer',
      right: 'Nailed it! ✓', wrong: 'Almost! ✗', answerIs: 'Answer',
      level: 'Level', levels: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }, range: 'Elements',
      qElectrons: s => `How many electrons does ${s} have?`, qProtons: s => `How many protons does ${s} have?`,
      qKind: s => `Is ${s} a cation, an anion or neutral?`,
      qDist: el => `Electron configuration of ${el.name} (Z = ${el.z})`,
      qValence: el => `Valence electrons of ${el.name} (Z = ${el.z})?`,
      qLast: el => `Last sublevel of ${el.name} (Z = ${el.z})?`,
      qNeutrons: s => `How many neutrons does ${s} have?`,
      qMassNum: (el, N) => `${el.name} (Z = ${el.z}) with ${N} neutrons. What is A?`,
      qMolar: f => `Molar mass of ${f}?`, qBal: 'Balance the equation',
      distHint: 'e.g. 1s2 2s2 2p6', lastHint: 'e.g. 3p5', numHint: 'Number', molHint: 'In g/mol, e.g. 58.5',
      use: 'Use', balFill: 'Fill in every number (use 1).', balNotMin: g => `Correct, but it can be simplified: divide everything by ${g}.`,
      balTip: '💡 Leave H and O for last.',
    },
  };
  let LANG = store.get().lang || 'en';
  const t = (k, ...a) => { const v = TXT[LANG][k]; return typeof v === 'function' ? v(...a) : v; };

  /* ---------- química ---------- */
  const byZ = z => ELEMENTS[z - 1];
  const SYM = Object.fromEntries(ELEMENTS.map(e => [e.sym, e]));
  const SUPS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '-': '⁻' };
  const SUBS = '₀₁₂₃₄₅₆₇₈₉';
  const sup = s => String(s).split('').map(c => SUPS[c] || c).join('');
  const chargeSup = q => q === 0 ? '' : sup((Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '-'));
  const ionLabel = (el, q) => el.sym + chargeSup(q);
  // explicações bem básicas das letras e símbolos (aparecem ao passar o mouse ou tocar)
  const GLOSS = {
    pt: {
      Z: 'Número atômico: quantos prótons o átomo tem. É ele que define qual é o elemento.',
      A: 'Número de massa: prótons + nêutrons, as partículas do núcleo.',
      N: 'Número de nêutrons: as partículas sem carga que ficam no núcleo.',
      'e⁻': 'Elétron: partícula com carga negativa que gira em volta do núcleo.',
      'p⁺': 'Próton: partícula com carga positiva que fica no núcleo.',
      'n⁰': 'Nêutron: partícula sem carga que fica no núcleo.',
    },
    en: {
      Z: 'Atomic number: how many protons the atom has. It is what defines the element.',
      A: 'Mass number: protons + neutrons, the particles in the nucleus.',
      N: 'Neutron number: the particles with no charge in the nucleus.',
      'e⁻': 'Electron: a particle with negative charge that moves around the nucleus.',
      'p⁺': 'Proton: a particle with positive charge in the nucleus.',
      'n⁰': 'Neutron: a particle with no charge in the nucleus.',
    },
  };
  const term = (k, label = k) => `<span class="term" tabindex="0" data-tip="${GLOSS[LANG][k]}">${label}</span>`;
  // coloca a dica em Z, A, N, e⁻, p⁺ e n⁰ soltos dentro de contas e perguntas
  // (letra seguida de número pequeno ou carga é símbolo químico, como N₂ ou N³⁻, e fica de fora)
  const terms = html => html.replace(/(e⁻|p⁺|n⁰)|(?<![\wÀ-ÿ>])([ZAN])(?![\wÀ-ÿ<₀-₉⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻])/g, (m, sym, letter) => term(sym || letter));
  const isoLabel = (el, A, q = 0) => `<sup>${A}</sup>${el.sym}${q ? `<sup>${chargeSup(q)}</sup>` : ''}`;
  const signed = q => q > 0 ? '+' + q : String(q);
  const fmtNum = (x, d = 3) => x.toLocaleString(LANG === 'pt' ? 'pt-BR' : 'en-US', { maximumFractionDigits: d });
  const fmtFormula = f => f.replace(/[*.•]/g, '·').replace(/([A-Za-z)\]])(\d+)/g, (m, a, d) => a + d.replace(/\d/g, x => SUBS[x]));
  const prettyEq = e => fmtFormula(e.replace(/->|=/, '→'));
  const normAns = s => String(s).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).toLowerCase().replace(/[^a-z0-9]/g, '');

  const ORDER = [[1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [4, 0], [3, 2], [4, 1], [5, 0], [4, 2], [5, 1], [6, 0], [4, 3], [5, 2], [6, 1], [7, 0], [5, 3], [6, 2], [7, 1]];
  const LET = 'spdf', SHELL = 'KLMNOPQ';
  const cap = l => 4 * l + 2;
  function fill(e) {
    const out = [];
    for (const [n, l] of ORDER) {
      if (e <= 0) break;
      const c = Math.min(e, cap(l));
      out.push({ n, l, c, full: c });
      e -= c;
    }
    return out;
  }
  // subníveis que mudam nas exceções reais: [n, l, elétrons]
  const EXC_FIX = {
    24: [[4, 0, 1], [3, 2, 5]], 29: [[4, 0, 1], [3, 2, 10]], 41: [[5, 0, 1], [4, 2, 4]], 42: [[5, 0, 1], [4, 2, 5]],
    44: [[5, 0, 1], [4, 2, 7]], 45: [[5, 0, 1], [4, 2, 8]], 46: [[5, 0, 0], [4, 2, 10]], 47: [[5, 0, 1], [4, 2, 10]],
    57: [[4, 3, 0], [5, 2, 1]], 58: [[4, 3, 1], [5, 2, 1]], 64: [[4, 3, 7], [5, 2, 1]], 78: [[6, 0, 1], [5, 2, 9]],
    79: [[6, 0, 1], [5, 2, 10]], 89: [[5, 3, 0], [6, 2, 1]], 90: [[5, 3, 0], [6, 2, 2]], 91: [[5, 3, 2], [6, 2, 1]],
    92: [[5, 3, 3], [6, 2, 1]], 93: [[5, 3, 4], [6, 2, 1]], 96: [[5, 3, 7], [6, 2, 1]], 103: [[6, 2, 0], [7, 1, 1]],
  };
  function realFill(z) {
    const map = new Map(fill(z).map(x => [x.n + '-' + x.l, x.c]));
    for (const [n, l, c] of EXC_FIX[z] || []) map.set(n + '-' + l, c);
    return ORDER.filter(([n, l]) => map.get(n + '-' + l) > 0).map(([n, l]) => { const c = map.get(n + '-' + l); return { n, l, c, full: c }; });
  }
  // o aviso de cátion só importa quando os elétrons não saem do último subnível do diagrama (ex.: Fe²⁺, Zn²⁺)
  function cationNoteNeeded(z) {
    const base = EXC_FIX[z] ? realFill(z) : fill(z);
    const maxN = Math.max(...base.map(x => x.n));
    return base[base.length - 1].n < maxN;
  }
  function ionConfig(z, q) {
    if (q <= 0) return fill(z - q);
    const cfg = EXC_FIX[z] ? realFill(z) : fill(z);
    for (let k = 0; k < q; k++) {
      let best = null;
      for (const x of cfg) if (x.c > 0 && (!best || x.n > best.n || (x.n === best.n && x.l > best.l))) best = x;
      if (best) best.c--;
    }
    return cfg;
  }
  const subHtml = x => `${x.n}${LET[x.l]}<sup>${x.c}</sup>`;
  const subTxt = x => `${x.n}${LET[x.l]}${sup(x.c)}`;
  const energyTxt = cfg => cfg.filter(x => x.c > 0).map(subTxt).join(' ');
  const shellTxt = cfg => cfg.filter(x => x.c > 0).sort((a, b) => a.n - b.n || a.l - b.l).map(subTxt).join(' ');
  function shells(cfg) {
    const s = [];
    for (const x of cfg) s[x.n - 1] = (s[x.n - 1] || 0) + x.c;
    const arr = Array.from(s, v => v || 0);
    while (arr.length && !arr[arr.length - 1]) arr.pop();
    return arr;
  }
  const valence = cfg => { const s = shells(cfg); return { n: s.length, e: s[s.length - 1] || 0 }; };
  const lastSub = cfg => [...cfg].reverse().find(x => x.c > 0);
  const EXC = {
    24: '[Ar] 3d⁵ 4s¹', 29: '[Ar] 3d¹⁰ 4s¹', 41: '[Kr] 4d⁴ 5s¹', 42: '[Kr] 4d⁵ 5s¹', 44: '[Kr] 4d⁷ 5s¹',
    45: '[Kr] 4d⁸ 5s¹', 46: '[Kr] 4d¹⁰', 47: '[Kr] 4d¹⁰ 5s¹', 57: '[Xe] 5d¹ 6s²', 58: '[Xe] 4f¹ 5d¹ 6s²',
    64: '[Xe] 4f⁷ 5d¹ 6s²', 78: '[Xe] 4f¹⁴ 5d⁹ 6s¹', 79: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', 89: '[Rn] 6d¹ 7s²',
    90: '[Rn] 6d² 7s²', 91: '[Rn] 5f² 6d¹ 7s²', 92: '[Rn] 5f³ 6d¹ 7s²', 93: '[Rn] 5f⁴ 6d¹ 7s²',
    96: '[Rn] 5f⁷ 6d¹ 7s²', 103: '[Rn] 5f¹⁴ 7s² 7p¹',
  };
  function commonCharge(el) {
    if (el.z === 1) return 1;
    const g = el.group;
    if (g === 1 || g === 2) return g;
    if (g === 13 && [13, 31, 49].includes(el.z)) return 3;
    if (g === 15 && [7, 15].includes(el.z)) return -3;
    if (g === 16 && [8, 16, 34].includes(el.z)) return -2;
    if (g === 17 && [9, 17, 35, 53].includes(el.z)) return -1;
    if (g === 18) return 0;
    return null;
  }
  function defaultA(z) {
    const iso = ISOTOPES[z];
    if (iso) return iso.map(i => i[0]).sort((a, b) => Math.abs(a - MASSES[z]) - Math.abs(b - MASSES[z]))[0];
    return Math.round(MASSES[z]);
  }

  // fórmulas: H2SO4, Ca(OH)2, Al2(SO4)3, CuSO4·5H2O
  function parseFormula(input) {
    const str = input.replace(/\s+/g, '').replace(/[*.•]/g, '·');
    if (!str) return { error: t('errEmpty') };
    const total = new Map();
    const add = (map, k, v) => map.set(k, (map.get(k) || 0) + v);
    for (const part of str.split('·')) {
      if (!part) return { error: t('errChar', '·') };
      let i = 0, coef = 1;
      const lead = part.match(/^\d+/);
      if (lead) { coef = +lead[0]; i = lead[0].length; }
      const stack = [new Map()];
      while (i < part.length) {
        const ch = part[i];
        if (ch === '(' || ch === '[') { stack.push(new Map()); i++; continue; }
        if (ch === ')' || ch === ']') {
          if (stack.length < 2) return { error: t('errParen') };
          i++;
          const num = part.slice(i).match(/^\d+/);
          const n = num ? +num[0] : 1;
          if (num) i += num[0].length;
          for (const [k, v] of stack.pop()) add(stack[stack.length - 1], k, v * n);
          continue;
        }
        const mm = part.slice(i).match(/^([A-Z][a-z]?)(\d*)/);
        if (!mm) return { error: /[a-z]/.test(ch) ? t('errCase') : t('errChar', ch) };
        if (!SYM[mm[1]]) return { error: t('errUnknown', mm[1]) };
        add(stack[stack.length - 1], mm[1], mm[2] ? +mm[2] : 1);
        i += mm[0].length;
      }
      if (stack.length !== 1) return { error: t('errParen') };
      for (const [k, v] of stack[0]) add(total, k, v * coef);
    }
    return { counts: total };
  }
  const massOf = (z, precise) => precise ? MASSES[z] : schoolMass(z);
  const molarMass = (counts, precise) => [...counts].reduce((s, [sym, n]) => s + n * massOf(SYM[sym].z, precise), 0);

  // balanceamento: eliminação de Gauss com frações exatas
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
  const fSub = (a, b) => fr(a.n * b.d - b.n * a.d, a.d * b.d);
  const fMul = (a, b) => fr(a.n * b.n, a.d * b.d);
  const fDiv = (a, b) => fr(a.n * b.d, a.d * b.n);
  function parseEquation(str) {
    // estados físicos (s), (l), (g), (aq) não mudam o balanceamento
    str = str.replace(/\((s|l|g|aq)\)/gi, '');
    const sides = str.split(/->|→|⟶|⇌|=/);
    if (sides.length !== 2) return { error: t('errArrow') };
    // cargas: "Fe3+", "Cl-", "e-", ⁺ ⁻ ou um "+" sem substância entre eles
    const ionic = side => /[⁺⁻^-]/.test(side) || /(^|\+)\s*e\s*(\+|$)/.test(side) || side.split('+').slice(0, -1).some(x => !x.trim()) || /\+\s*$/.test(side.trim());
    if (sides.some(ionic)) return { error: t('errIons') };
    const split = side => side.split('+').map(x => x.trim()).filter(Boolean);
    const L = split(sides[0]), R = split(sides[1]);
    if (!L.length || !R.length) return { error: t('errSide') };
    let stripped = false;
    const comps = [];
    for (const raw of [...L, ...R]) {
      const f = raw.replace(/\s+/g, '').replace(/^\d+(?=[A-Z(\[])/, () => { stripped = true; return ''; });
      const r = parseFormula(f);
      if (r.error) return { error: t('errIn', raw, r.error) };
      comps.push({ f, counts: r.counts });
    }
    return { comps, nL: L.length, stripped };
  }
  function balance(comps, nL) {
    const els = [...new Set(comps.flatMap(c => [...c.counts.keys()]))];
    for (const e of els) {
      const inL = comps.slice(0, nL).some(c => c.counts.has(e)), inR = comps.slice(nL).some(c => c.counts.has(e));
      if (inL !== inR) return { error: t('errOneSide', e) };
    }
    const n = comps.length;
    const M = els.map(e => comps.map((c, j) => fr((c.counts.get(e) || 0) * (j < nL ? 1 : -1))));
    const piv = [];
    let r = 0;
    for (let c = 0; c < n && r < M.length; c++) {
      const i = M.findIndex((row, k) => k >= r && row[c].n !== 0);
      if (i < 0) continue;
      [M[r], M[i]] = [M[i], M[r]];
      const pv = M[r][c];
      M[r] = M[r].map(x => fDiv(x, pv));
      for (let k = 0; k < M.length; k++) if (k !== r && M[k][c].n !== 0) {
        const f = M[k][c];
        M[k] = M[k].map((x, j) => fSub(x, fMul(f, M[r][j])));
      }
      piv.push(c); r++;
    }
    const free = [...Array(n).keys()].filter(c => !piv.includes(c));
    if (free.length === 0) return { error: t('errImpossible') };
    if (free.length > 1) return { error: t('errMany') };
    const f = free[0];
    const x = Array(n).fill(null);
    x[f] = fr(1);
    piv.forEach((pc, i) => { x[pc] = fr(-M[i][f].n, M[i][f].d); });
    const L = x.reduce((a, v) => a * v.d / gcd(a, v.d), 1);
    let ints = x.map(v => v.n * (L / v.d));
    if (ints.every(v => v <= 0)) ints = ints.map(v => -v);
    if (ints.some(v => v <= 0)) return { error: t('errImpossible') };
    const g = ints.reduce(gcd);
    return { coefs: ints.map(v => v / g), els };
  }
  const sideCount = (comps, a, b, coefs, e) => comps.slice(a, b).reduce((s, c, j) => s + (coefs[a + j] || 0) * (c.counts.get(e) || 0), 0);

  /* ---------- bancos de exercícios ---------- */
  const EQS = {
    easy: ['H2 + O2 -> H2O', 'N2 + H2 -> NH3', 'Na + Cl2 -> NaCl', 'Mg + O2 -> MgO', 'H2 + Cl2 -> HCl', 'Ca + O2 -> CaO',
      'SO2 + O2 -> SO3', 'Zn + HCl -> ZnCl2 + H2', 'Mg + HCl -> MgCl2 + H2', 'H2O2 -> H2O + O2', 'KClO3 -> KCl + O2',
      'N2 + O2 -> NO', 'CO + O2 -> CO2', 'Li + O2 -> Li2O', 'K + H2O -> KOH + H2', 'Na + H2O -> NaOH + H2', 'HgO -> Hg + O2',
      'Cu + O2 -> CuO', 'Ag2O -> Ag + O2', 'H2O -> H2 + O2', 'C + O2 -> CO', 'P + Cl2 -> PCl3', 'Al + Cl2 -> AlCl3',
      'Fe + Cl2 -> FeCl3', 'Na + O2 -> Na2O', 'K + Cl2 -> KCl', 'H2 + N2 -> N2H4', 'Ca + H2O -> Ca(OH)2 + H2'],
    medium: ['CH4 + O2 -> CO2 + H2O', 'Fe + O2 -> Fe2O3', 'Al + O2 -> Al2O3', 'Al + HCl -> AlCl3 + H2',
      'NaOH + H2SO4 -> Na2SO4 + H2O', 'Ca(OH)2 + HCl -> CaCl2 + H2O', 'C2H6O + O2 -> CO2 + H2O', 'Fe2O3 + CO -> Fe + CO2',
      'P4 + O2 -> P2O5', 'NH3 + O2 -> NO + H2O', 'N2O5 -> NO2 + O2', 'C3H8 + O2 -> CO2 + H2O', 'C2H4 + O2 -> CO2 + H2O',
      'Mg(OH)2 + HCl -> MgCl2 + H2O', 'KOH + H3PO4 -> K3PO4 + H2O', 'Na2CO3 + HCl -> NaCl + H2O + CO2',
      'CaCO3 + HCl -> CaCl2 + H2O + CO2', 'Fe + HCl -> FeCl2 + H2', 'Al + H2SO4 -> Al2(SO4)3 + H2', 'Fe2O3 + H2 -> Fe + H2O',
      'Cu + AgNO3 -> Cu(NO3)2 + Ag', 'BaCl2 + Na2SO4 -> BaSO4 + NaCl', 'Pb(NO3)2 + KI -> PbI2 + KNO3',
      'NaHCO3 -> Na2CO3 + H2O + CO2', 'C + Fe2O3 -> Fe + CO2', 'SiO2 + C -> Si + CO', 'Na + H3PO4 -> Na3PO4 + H2',
      'Al + CuSO4 -> Al2(SO4)3 + Cu'],
    hard: ['C6H12O6 + O2 -> CO2 + H2O', 'C4H10 + O2 -> CO2 + H2O', 'C8H18 + O2 -> CO2 + H2O', 'C2H6 + O2 -> CO2 + H2O',
      'C3H8O + O2 -> CO2 + H2O', 'Al(OH)3 + H2SO4 -> Al2(SO4)3 + H2O', 'Ca3(PO4)2 + H2SO4 -> CaSO4 + H3PO4',
      'FeS2 + O2 -> Fe2O3 + SO2', 'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O', 'Cu + HNO3 -> Cu(NO3)2 + NO + H2O',
      'Cu + HNO3 -> Cu(NO3)2 + NO2 + H2O', 'NH3 + O2 -> N2 + H2O', 'C12H22O11 + O2 -> CO2 + H2O', 'Fe3O4 + CO -> Fe + CO2',
      '(NH4)2Cr2O7 -> Cr2O3 + N2 + H2O', 'Al + Fe2O3 -> Al2O3 + Fe', 'Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O',
      'C5H12 + O2 -> CO2 + H2O', 'K2Cr2O7 + HCl -> KCl + CrCl3 + Cl2 + H2O', 'MnO2 + HCl -> MnCl2 + Cl2 + H2O',
      'Zn + HNO3 -> Zn(NO3)2 + NH4NO3 + H2O', 'Fe2(SO4)3 + KOH -> K2SO4 + Fe(OH)3', 'Na2S2O3 + I2 -> NaI + Na2S4O6',
      'H2S + O2 -> SO2 + H2O', 'C2H2 + O2 -> CO2 + H2O', 'Al4C3 + H2O -> Al(OH)3 + CH4', 'P4O10 + H2O -> H3PO4',
      'NH4NO3 -> N2O + H2O'],
  };
  const COMPOUNDS = {
    easy: ['H2O', 'CO2', 'NaCl', 'HCl', 'NH3', 'CH4', 'O2', 'N2', 'H2', 'CO', 'NaOH', 'KOH', 'KCl', 'CaO', 'MgO', 'SO2',
      'SO3', 'NO2', 'H2S', 'HF', 'LiOH', 'NaF', 'KBr', 'MgCl2', 'NaBr', 'O3', 'Cl2', 'HBr'],
    medium: ['H2SO4', 'HNO3', 'H3PO4', 'CaCO3', 'NaHCO3', 'Na2CO3', 'K2CO3', 'Na2SO4', 'KNO3', 'NaNO3', 'CaSO4', 'MgSO4',
      'CuSO4', 'Fe2O3', 'Al2O3', 'C2H6O', 'CH3COOH', 'H2O2', 'NH4Cl', 'Ca(OH)2', 'Mg(OH)2', 'Fe3O4', 'KMnO4', 'C3H8',
      'C2H6', 'Na3PO4', 'BaSO4', 'AgNO3', 'ZnSO4'],
    hard: ['C6H12O6', 'C12H22O11', 'Al2(SO4)3', 'Ca3(PO4)2', '(NH4)2SO4', 'Fe2(SO4)3', 'Ca(NO3)2', 'Mg(NO3)2', 'Pb(NO3)2',
      'Al(OH)3', 'Fe(OH)3', 'CuSO4·5H2O', 'Na2CO3·10H2O', 'MgSO4·7H2O', 'K4[Fe(CN)6]', '(NH4)3PO4', 'C8H18', 'Ba(OH)2',
      'CaCl2·2H2O', 'K2Cr2O7', 'Cu(NO3)2'],
  };
  // equações onde todos os coeficientes são 1 não servem para treinar
  const isTrivial = eq => { const e = parseEquation(eq); const b = balance(e.comps, e.nL); return !b.coefs || b.coefs.every(c => c === 1); };

  /* ---------- desenhos ---------- */
  function bohr(cfg, z) {
    const sh = shells(cfg);
    const R0 = 34, STEP = 17, size = 2 * (R0 + STEP * Math.max(sh.length - 1, 0)) + 30, c = size / 2;
    let g = '';
    sh.forEach((n, i) => {
      const r = R0 + STEP * i;
      let dots = '';
      for (let k = 0; k < n; k++) {
        const a = (2 * Math.PI * k) / n - Math.PI / 2;
        dots += `<circle cx="${(c + r * Math.cos(a)).toFixed(1)}" cy="${(c + r * Math.sin(a)).toFixed(1)}" r="3.6"/>`;
      }
      g += `<circle class="orbit" cx="${c}" cy="${c}" r="${r}"/><g class="ring" style="animation-duration:${10 + i * 4}s;transform-origin:${c}px ${c}px">${dots}</g>`;
    });
    return `<svg class="bohr" viewBox="0 0 ${size} ${size}">${g}<circle class="nucleus" cx="${c}" cy="${c}" r="20"/><text x="${c}" y="${c + 5}" text-anchor="middle">${z}+</text></svg>`;
  }
  function nucleus(Z, A) {
    const size = 200, c = size / 2;
    const rd = Math.min(10, 88 / (1.95 * Math.sqrt(A) + 1));
    let dots = '';
    for (let k = 0; k < A; k++) {
      const pr = Math.floor((k + 1) * Z / A) > Math.floor(k * Z / A);
      const r = 1.95 * rd * Math.sqrt(k + 0.5), a = k * 2.39996;
      dots += `<circle class="${pr ? 'pr' : 'nt'}" cx="${(c + r * Math.cos(a)).toFixed(1)}" cy="${(c + r * Math.sin(a)).toFixed(1)}" r="${rd.toFixed(1)}" style="animation-delay:${Math.min(k * 8, 900)}ms"/>`;
    }
    return `<svg class="nuc-svg" viewBox="0 0 ${size} ${size}">${dots}</svg>`;
  }
  function pauling(cfg) {
    let h = '<div class="pauling">';
    for (let n = 1; n <= 7; n++) {
      h += `<span class="pl-n">${SHELL[n - 1]}</span>`;
      for (let l = 0; l < 4; l++) {
        const idx = ORDER.findIndex(([a, b]) => a === n && b === l);
        if (idx < 0) { h += '<span class="pl-cell none"></span>'; continue; }
        const x = cfg.find(y => y.n === n && y.l === l), c = x ? x.c : 0;
        const st = c === cap(l) ? 'full' : c > 0 ? 'part' : '';
        h += `<span class="pl-cell ${st}"><i>${idx + 1}</i>${n}${LET[l]}${c ? `<sup>${c}</sup>` : ''}</span>`;
      }
    }
    return h + '</div>';
  }

  /* ---------- pedacinhos de interface ---------- */
  const stat = (v, label, cls = '') => `<div class="stat ${cls}"><b>${v}</b><span>${label}</span></div>`;
  const more = (title, body) => `<details class="more"><summary>${title}</summary><div class="more-in">${body}</div></details>`;
  const stepper = (id, label, val) => `<div class="field"><label>${label}</label><div class="stepper" id="${id}"><button data-d="-1" aria-label="-">−</button><span>${val}</span><button data-d="1" aria-label="+">+</button></div></div>`;
  const seg = (name, cur, opts) => `<div class="seg-mini" data-seg="${name}">${opts.map(([v, l]) => `<button class="${String(v) === String(cur) ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div>`;
  function elementField(max = 118) {
    return `<div class="field grow"><label>${t('element')}</label><div class="pick-row">
      <select id="elSel">${ELEMENTS.filter(e => e.z <= max).map(e => `<option value="${e.z}" ${e.z === S.z ? 'selected' : ''}>${e.sym} · ${e.name} (${e.z})</option>`).join('')}</select>
      <button class="icon-btn" id="rnd" title="🎲">🎲</button></div></div>`;
  }

  /* ---------- estado ---------- */
  const TOOLS = { ion: '⚛️', dist: '🌀', iso: '☢️', mol: '⚖️', bal: '⚗️' };
  const S = {
    tool: 'ion', mode: 'learn', z: 11, q: 1, A: null, formula: 'H2SO4', precise: false, grams: '10',
    eq: 'CH4 + O2 -> CO2 + H2O', range: '1-36', level: 'easy', score: 0, total: 0, pq: null, lastKey: '',
  };

  function applyLang() {
    applyDataLang(LANG);
    document.documentElement.lang = LANG === 'pt' ? 'pt-BR' : 'en';
    document.title = t('docTitle');
    $$('[data-t]').forEach(el => el.textContent = t(el.dataset.t));
    $('#langCode').textContent = LANG.toUpperCase();
  }
  $('#langBtn').onclick = () => {
    LANG = LANG === 'pt' ? 'en' : 'pt';
    const d = store.get(); d.lang = LANG; store.set(d);
    applyLang(); S.pq = null; render();
  };

  function render() {
    root.innerHTML = `
    <section class="stage lab2">
      <div class="lab-warn"><b>${t('beta')}</b> ${t('betaText')}</div>
      <div class="lab-head">
        <h1 class="title-box lab-title">Lab</h1>
        <details class="glossary">
          <summary>❓ ${LANG === 'pt' ? 'O que é Z, A, N?' : 'What are Z, A, N?'}</summary>
          <div class="gl-box">${Object.entries(GLOSS[LANG]).map(([k, v]) => `<div class="gl-row"><b>${k}</b><span>${v}</span></div>`).join('')}</div>
        </details>
      </div>
      <div class="tool-row">${Object.entries(TOOLS).map(([k, ic]) => `<button class="tool ${S.tool === k ? 'on' : ''}" data-tool="${k}"><span class="tool-ic">${ic}</span><span>${t('tools')[k]}</span></button>`).join('')}</div>
      <div class="mode-row">${seg('mode', S.mode, [['learn', t('learn')], ['practice', t('practice')]])}</div>
      <div class="card" id="card"></div>
    </section>`;
    $$('.tool').forEach(b => b.onclick = () => { S.tool = b.dataset.tool; S.pq = null; S.score = S.total = 0; render(); });
    bindSeg('mode', v => { S.mode = v; S.pq = null; S.score = S.total = 0; render(); });
    S.mode === 'learn' ? learn() : practice();
  }
  function bindSeg(name, fn) { $$(`[data-seg="${name}"] button`).forEach(b => b.onclick = () => fn(b.dataset.v)); }
  function bindStepper(id, fn) { $$(`#${id} button`).forEach(b => b.onclick = () => fn(+b.dataset.d)); }
  function bindElement(max) {
    $('#elSel').onchange = e => { S.z = +e.target.value; S.A = null; learn(); };
    $('#rnd').onclick = () => {
      S.z = 1 + Math.floor(Math.random() * max); S.A = null;
      const cc = commonCharge(byZ(S.z));
      S.q = S.tool === 'ion' && cc != null ? cc : 0;
      learn();
    };
  }

  /* ---------- aprender ---------- */
  function learn() {
    ({ ion: learnIon, dist: learnDist, iso: learnIso, mol: learnMol, bal: learnBal })[S.tool]();
  }

  function learnIon() {
    const el = byZ(S.z), q = S.q, e = el.z - q;
    const kind = q === 0 ? 'neutral' : q > 0 ? 'cation' : 'anion';
    const cc = commonCharge(el);
    const tip = cc === 0 ? t('nobleTip') : cc == null ? t('noCommon') : t('commonIon', ionLabel(el, cc));
    $('#card').innerHTML = `
      <div class="controls">${elementField(118)}${stepper('qStep', t('charge'), signed(q))}</div>
      ${e < 0 ? `<div class="alert">${t('invalid')}</div>` : `
      <div class="result">
        <div class="tile-big" style="--c:${CATS[el.cat].color}"><i class="term" tabindex="0" data-tip="Z · ${GLOSS[LANG].Z}">${el.z}</i>${el.sym}<sup>${chargeSup(q)}</sup></div>
        <div class="result-mid">
          <div class="line"><span class="kind ${kind}">${t(kind)}</span> ${t('ionLine', el, q)}</div>
          <div class="nums">${stat(el.z, t('protons'))}${stat(e, t('electrons'), 'hl')}${stat(signed(q), t('chargeL'))}</div>
        </div>
        <div class="visual">${bohr(ionConfig(el.z, q), el.z)}</div>
      </div>
      ${more(t('how'), `<div class="calc">${terms(`e⁻ = Z − (${signed(q)})`)} = ${el.z} ${q >= 0 ? '−' : '+'} ${Math.abs(q)} = <b>${e}</b></div><p>${tip}</p>`)}`}`;
    bindElement(56);
    bindStepper('qStep', d => { S.q = Math.max(-3, Math.min(3, S.q + d)); learnIon(); });
  }

  function learnDist() {
    const el = byZ(S.z), q = S.q, e = el.z - q;
    let body = '';
    if (e < 0) body = `<div class="alert">${t('invalid')}</div>`;
    else {
      const cfg = ionConfig(el.z, q), sh = shells(cfg), val = valence(cfg), last = lastSub(cfg);
      body = `
      <div class="result">
        <div class="result-mid wide">
          <div class="line"><b class="ion-tag">${ionLabel(el, q)}</b> ${e} ${t('electrons')}</div>
          <div class="chips">${cfg.map((x, i) => `<span class="chip ${x.c < x.full ? 'lost' : ''}" style="animation-delay:${i * 60}ms">${subHtml(x)}</span>`).join('')}</div>
          <div class="nums">
            <div class="stat"><b class="shells">${sh.map((n, i) => `<span>${SHELL[i]}<em>${n}</em></span>`).join('')}</b><span>${t('shells')}</span></div>
            ${stat(`${val.n ? SHELL[val.n - 1] : '-'} · ${val.e}`, t('valence'), 'hl')}
            ${stat(last ? subHtml(last) : '-', t('last'))}
          </div>
          ${q === 0 && EXC[el.z] ? `<div class="note">${t('exception', el, EXC[el.z])}</div>` : ''}
          ${q > 0 && EXC[el.z] ? `<div class="note">${t('excIon', el, EXC[el.z])}</div>` : ''}
          ${q > 0 && !EXC[el.z] && cationNoteNeeded(el.z) ? `<div class="note">💡 ${t('ionNote')}</div>` : ''}
        </div>
        <div class="visual">${bohr(cfg, el.z)}</div>
      </div>
      ${more(t('pauling'), pauling(cfg))}
      ${more(t('more'), `<p><b>${t('shellOrder')}:</b> ${shellTxt(cfg)}</p>`)}`;
    }
    $('#card').innerHTML = `<div class="controls">${elementField(118)}${stepper('qStep', t('charge'), signed(q))}</div>${body}`;
    bindElement(86);
    bindStepper('qStep', d => { S.q = Math.max(-3, Math.min(3, S.q + d)); learnDist(); });
  }

  function learnIso() {
    const el = byZ(S.z);
    if (S.A == null) S.A = defaultA(S.z);
    const A = S.A, N = A - el.z;
    const m = MASSES[el.z];
    const massTip = RADIO.has(el.z) ? t('radioMass', m) : t('avgMass', fmtNum(m), fmtNum(schoolMass(el.z), 1));
    const chips = ISOTOPES[el.z] ? `<div class="iso-chips">${ISOTOPES[el.z].map(([a, pt, en]) => `<button class="${a === A ? 'on' : ''}" data-a="${a}"><sup>${a}</sup>${el.sym}${pt ? ` · ${LANG === 'pt' ? pt : en}` : ''}</button>`).join('')}</div>` : '';
    $('#card').innerHTML = `
      <div class="controls">${elementField(118)}${stepper('aStep', terms(t('massNumber')), A)}</div>
      ${chips}
      ${N < 0 ? `<div class="alert">${t('badA')}</div>` : `
      <div class="result">
        <div class="tile-big iso" style="--c:${CATS[el.cat].color}"><i class="ia term" tabindex="0" data-tip="A · ${GLOSS[LANG].A}">${A}</i><i class="iz term" tabindex="0" data-tip="Z · ${GLOSS[LANG].Z}">${el.z}</i>${el.sym}</div>
        <div class="result-mid">
          <div class="line">${terms('N = A − Z')} = ${A} − ${el.z} = <b>${N}</b></div>
          <div class="nums">${stat(el.z, t('protons'))}${stat(N, t('neutrons'), 'hl')}${stat(el.z, t('electrons'))}</div>
        </div>
        <div class="visual">${nucleus(el.z, A)}<div class="legend"><span class="lg pr"></span>${term('p⁺')} <span class="lg nt"></span>${term('n⁰')}</div></div>
      </div>
      ${more(t('isoWhat'), `<p>${t('isoTip')}</p><p>${massTip}</p>`)}`}`;
    bindElement(56);
    bindStepper('aStep', d => { S.A = Math.max(1, Math.min(320, S.A + d)); learnIso(); });
    $$('.iso-chips button').forEach(b => b.onclick = () => { S.A = +b.dataset.a; learnIso(); });
  }

  function learnMol() {
    const ex = ['H2O', 'CO2', 'NaCl', 'H2SO4', 'C6H12O6', 'Ca(OH)2', 'CuSO4·5H2O'];
    $('#card').innerHTML = `
      <input id="fml" class="big-input" autocomplete="off" spellcheck="false" value="${S.formula}" placeholder="${t('formulaHint')}">
      <div class="ex-row">${ex.map(f => `<button data-f="${f}">${fmtFormula(f)}</button>`).join('')}</div>
      <div class="opt-row"><span>${t('massesL')}</span>${seg('prec', S.precise ? 1 : 0, [[0, t('rounded')], [1, t('precise')]])}</div>
      <div id="out"></div>`;
    const inp = $('#fml');
    inp.oninput = () => { S.formula = inp.value; molOut(); };
    $$('.ex-row button').forEach(b => b.onclick = () => { S.formula = b.dataset.f; inp.value = S.formula; molOut(); });
    bindSeg('prec', v => { S.precise = v === '1'; learnMol(); });
    molOut();
  }
  function molOut() {
    // "2H2O": o 2 é quantidade de mols, não faz parte da massa molar
    const lead = S.formula.trim().match(/^(\d+)\s*(?=[A-Z(\[])/);
    const formula = lead ? S.formula.trim().slice(lead[0].length) : S.formula;
    const r = parseFormula(formula);
    if (r.error) { $('#out').innerHTML = `<div class="alert soft">${r.error}</div>`; return; }
    const d = S.precise ? 3 : 1;
    const rows = [...r.counts].map(([sym, n]) => ({ el: SYM[sym], n, m: massOf(SYM[sym].z, S.precise) }));
    const M = molarMass(r.counts, S.precise);
    $('#out').innerHTML = `
      <div class="answer"><span class="ans-f">${fmtFormula(formula.replace(/\s+/g, ''))}</span><span class="ans-eq">=</span><span class="ans-v">${fmtNum(M, d)} <small>g/mol</small></span></div>
      <div class="parts">${rows.map(x => `<span class="part"><b style="--c:${CATS[x.el.cat].color}">${x.el.sym}</b> ${x.n} × ${fmtNum(x.m, d)} = <strong>${fmtNum(x.n * x.m, d)}</strong></span>`).join('<span class="plus">+</span>')}</div>
      ${lead ? `<div class="note">💡 ${t('coefMol', lead[1], fmtFormula(formula.replace(/\s+/g, '')), fmtNum(M, d), fmtNum(M * +lead[1], d))}</div>` : ''}
      ${rows.some(x => RADIO.has(x.el.z)) ? `<div class="note">☢️ ${t('radioNote')}</div>` : ''}
      ${more(t('convert'), `<div class="conv"><input id="gIn" type="number" min="0" step="any" value="${S.grams}"><span>g</span><span class="eq">=</span><div id="convOut"></div></div><p class="muted">n = m ÷ M</p>`)}`;
    const g = $('#gIn');
    const conv = () => {
      S.grams = g.value;
      const n = (parseFloat(g.value) || 0) / M;
      const p = n * 6.022e23, ex = p > 0 ? Math.floor(Math.log10(p)) : 0;
      $('#convOut').innerHTML = `<b>${fmtNum(n, 4)} mol</b><small>≈ ${p > 0 ? `${fmtNum(p / 10 ** ex, 2)} × 10${sup(ex)}` : 0} ${t('particles')}</small>`;
    };
    g.oninput = conv; conv();
  }

  function learnBal() {
    const ex = ['H2 + O2 -> H2O', 'CH4 + O2 -> CO2 + H2O', 'Fe + O2 -> Fe2O3', 'Al + HCl -> AlCl3 + H2', 'KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O'];
    $('#card').innerHTML = `
      <input id="eqIn" class="big-input" autocomplete="off" spellcheck="false" value="${S.eq}" placeholder="${t('eqHint')}">
      <div class="ex-row">${ex.map(e => `<button data-e="${e}">${prettyEq(e)}</button>`).join('')}</div>
      <div id="out"></div>`;
    const inp = $('#eqIn');
    inp.oninput = () => { S.eq = inp.value; balOut(); };
    $$('.ex-row button').forEach(b => b.onclick = () => { S.eq = b.dataset.e; inp.value = S.eq; balOut(); });
    balOut();
  }
  const eqHtml = (comps, nL, coefs) => comps.map((c, i) => `${i === nL ? '<span class="arrow">→</span>' : i ? '<span class="plus">+</span>' : ''}<span class="comp"><b class="coef ${coefs[i] === 1 ? 'one' : ''}">${coefs[i]}</b>${fmtFormula(c.f)}</span>`).join('');
  const atomChips = (comps, nL, coefs, els, pending) => `<div class="atoms">${els.map(e => {
    const l = sideCount(comps, 0, nL, coefs, e), r = sideCount(comps, nL, comps.length, coefs, e);
    const st = pending ? 'wait' : l === r ? 'ok' : 'no';
    return `<span class="atom ${st}"><b>${e}</b> ${l} <i>${st === 'ok' ? '=' : st === 'no' ? '≠' : '·'}</i> ${r}</span>`;
  }).join('')}</div>`;
  function balOut() {
    const e = parseEquation(S.eq);
    if (e.error) { $('#out').innerHTML = `<div class="alert soft">${e.error}</div>`; return; }
    const b = balance(e.comps, e.nL);
    if (b.error) { $('#out').innerHTML = `<div class="alert soft">${b.error}</div>`; return; }
    $('#out').innerHTML = `
      <div class="equation">${eqHtml(e.comps, e.nL, b.coefs)}</div>
      ${atomChips(e.comps, e.nL, b.coefs, b.els)}
      ${e.stripped ? `<div class="note">${t('coefNote')}</div>` : ''}
      ${more(t('howBal'), `<p>${t('balMethod')}</p>`)}`;
  }

  /* ---------- praticar ---------- */
  function newQuestion() {
    for (let tries = 0; tries < 8; tries++) {
      const q = ({ ion: qIon, dist: qDist, iso: qIso, mol: qMol, bal: qBal })[S.tool]();
      if (q.key !== S.lastKey) { S.lastKey = q.key; return q; }
    }
    return ({ ion: qIon, dist: qDist, iso: qIso, mol: qMol, bal: qBal })[S.tool]();
  }
  function qIon() {
    const el = rnd(ELEMENTS.filter(e => e.z <= 56 && commonCharge(e)));
    const q = Math.random() < 0.75 ? commonCharge(el) : 0;
    const s = ionLabel(el, q), e = el.z - q, kind = q === 0 ? 'neutral' : q > 0 ? 'cation' : 'anion';
    const type = rnd(['electrons', 'electrons', 'protons', 'kind']);
    const key = s + type;
    if (type === 'kind') return { key, text: t('qKind', s), choices: ['cation', 'anion', 'neutral'].map(k => ({ v: k, label: t(k) })), answer: kind, show: t(kind), why: t('ionLine', el, q) };
    if (type === 'protons') return { key, text: t('qProtons', s), num: true, answer: String(el.z), show: el.z, why: `p⁺ = Z = ${el.z}` };
    return { key, text: t('qElectrons', s), num: true, answer: String(e), show: e, why: `e⁻ = ${el.z} − (${signed(q)}) = ${e}` };
  }
  function qDist() {
    const [a, b] = S.range.split('-').map(Number);
    // exceções ficam fora do treino: a resposta "certa" dependeria da prova
    const pool = ELEMENTS.filter(e => e.z >= a && e.z <= b && !EXC[e.z]);
    const el = rnd(pool);
    const cfg = fill(el.z), val = valence(cfg), last = lastSub(cfg);
    const type = rnd(['dist', 'dist', 'valence', 'last']);
    const key = el.z + type, why = energyTxt(cfg);
    if (type === 'valence') return { key, text: t('qValence', el), num: true, answer: String(val.e), show: `${val.e} (${SHELL[val.n - 1]})`, why };
    if (type === 'last') return { key, text: t('qLast', el), hint: t('lastHint'), answer: normAns(`${last.n}${LET[last.l]}${last.c}`), show: subTxt(last), why };
    const byShell = [...cfg].sort((x, y) => x.n - y.n || x.l - y.l);
    const flat = list => normAns(list.map(x => `${x.n}${LET[x.l]}${x.c}`).join(''));
    // vale tanto a ordem do diagrama quanto a ordem por camadas
    return { key, text: t('qDist', el), hint: t('distHint'), answers: [flat(cfg), flat(byShell)], show: energyTxt(cfg), why: '' };
  }
  function qIso() {
    const el = rnd(ELEMENTS.filter(e => e.z <= 56 && !RADIO.has(e.z)));
    const A = rnd(ISOTOPES[el.z] ? ISOTOPES[el.z].map(i => i[0]) : [defaultA(el.z)]), N = A - el.z;
    const type = rnd(['neutrons', 'neutrons', 'mass']);
    const key = el.z + '-' + A + type;
    if (type === 'mass') return { key, text: t('qMassNum', el, N), num: true, answer: String(A), show: A, why: `A = Z + N = ${el.z} + ${N} = ${A}` };
    return { key, text: t('qNeutrons', isoLabel(el, A)), num: true, answer: String(N), show: N, why: `N = A − Z = ${A} − ${el.z} = ${N}` };
  }
  function qMol() {
    const f = rnd(COMPOUNDS[S.level]);
    const counts = parseFormula(f).counts, M = molarMass(counts, false);
    const used = [...counts.keys()].map(sym => `${sym} = ${fmtNum(schoolMass(SYM[sym].z), 1)}`).join(' · ');
    return {
      key: f, text: t('qMolar', fmtFormula(f)), hint: t('molHint'), extra: `<div class="used">${t('use')}: ${used}</div>`,
      check: v => Math.abs(parseFloat(String(v).replace(',', '.')) - M) < 0.05, show: `${fmtNum(M, 1)} g/mol`,
      why: [...counts].map(([sym, n]) => `${n} × ${fmtNum(schoolMass(SYM[sym].z), 1)}`).join(' + ') + ` = ${fmtNum(M, 1)}`,
    };
  }
  function qBal() {
    const pool = EQS[S.level].filter(eq => !isTrivial(eq));
    const eq = rnd(pool), e = parseEquation(eq), b = balance(e.comps, e.nL);
    return { key: eq, bal: true, ...e, ...b, user: e.comps.map(() => '') };
  }

  function practice() {
    if (!S.pq) S.pq = newQuestion();
    const q = S.pq;
    let filter = '';
    if (S.tool === 'dist') filter = seg('range', S.range, [['1-20', '1→20'], ['1-36', '1→36'], ['1-54', '1→54'], ['1-86', '1→86']]);
    if (S.tool === 'mol' || S.tool === 'bal') filter = seg('level', S.level, Object.entries(t('levels')));
    $('#card').innerHTML = `
      <div class="prac-bar"><span class="score">${t('score', S.score, S.total)}</span>${filter}</div>
      <h2 class="question">${q.bal ? t('qBal') : terms(q.text)}</h2>
      ${q.extra || ''}
      ${q.bal ? balInputs(q) : q.choices
        ? `<div class="choices">${q.choices.map((c, i) => `<button class="choice" data-v="${c.v}"><kbd>${i + 1}</kbd>${c.label}</button>`).join('')}</div>`
        : `<div class="answer-row"><input id="pin" class="big-input" autocomplete="off" spellcheck="false" ${q.num ? 'inputmode="numeric"' : ''} placeholder="${q.hint || t('numHint')}"><button class="btn-y" id="pcheck">${t('check')}</button></div>`}
      ${q.done ? '' : `<div class="reveal-row"><button class="link-btn" id="preveal">${t('reveal')}</button></div>`}
      <div id="pfb"></div>`;
    bindSeg('range', v => { S.range = v; S.pq = null; practice(); });
    bindSeg('level', v => { S.level = v; S.pq = null; practice(); });
    const rv = $('#preveal'); if (rv) rv.onclick = () => answer(null);
    if (q.bal) return bindBal(q);
    if (q.choices) { $$('.choice').forEach(b => b.onclick = () => answer(b.dataset.v)); return; }
    const inp = $('#pin');
    inp.focus();
    inp.onkeydown = e => { if (e.key === 'Enter' && inp.value.trim()) answer(inp.value); };
    $('#pcheck').onclick = () => inp.value.trim() && answer(inp.value);
  }

  function balInputs(q) {
    return `<div class="equation fill">${q.comps.map((c, i) => `${i === q.nL ? '<span class="arrow">→</span>' : i ? '<span class="plus">+</span>' : ''}<span class="comp"><input class="coef-in" data-i="${i}" type="number" min="1" inputmode="numeric" value="${q.user[i]}" ${q.done ? 'disabled' : ''}>${fmtFormula(c.f)}</span>`).join('')}</div>
      <div id="live"></div>
      ${q.done ? '' : `<div class="answer-row center"><button class="btn-y" id="bcheck">${t('check')}</button></div><p class="muted center">${t('balTip')}</p>`}`;
  }
  function bindBal(q) {
    const live = () => {
      const coefs = q.user.map(v => parseInt(v, 10) || 0);
      $('#live').innerHTML = atomChips(q.comps, q.nL, coefs, q.els, coefs.some(v => !(v > 0)));
    };
    $$('.coef-in').forEach(inp => {
      inp.oninput = () => { q.user[+inp.dataset.i] = inp.value; live(); };
      inp.onkeydown = e => { if (e.key === 'Enter') answer('bal'); };
    });
    live();
    const bc = $('#bcheck'); if (bc) bc.onclick = () => answer('bal');
    if (!q.done) $('.coef-in').focus();
  }

  function answer(v) {
    const q = S.pq;
    if (q.done) return;
    let ok = false, msg = '';
    if (q.bal) {
      const coefs = q.user.map(x => parseInt(x, 10));
      if (v !== null && coefs.some(x => !(x > 0))) return toast(t('balFill'));
      if (v !== null) {
        ok = q.els.every(e => sideCount(q.comps, 0, q.nL, coefs, e) === sideCount(q.comps, q.nL, q.comps.length, coefs, e));
        const g = coefs.reduce(gcd);
        if (ok && g > 1) msg = t('balNotMin', g);
      }
      if (!ok) q.user = q.coefs.map(String);
    } else {
      ok = v != null && (q.check ? q.check(v) : q.choices ? v === q.answer : q.answers ? q.answers.includes(normAns(v)) : normAns(v) === q.answer);
    }
    q.done = true;
    S.total++; if (ok) S.score++;
    if (q.bal) practice();
    else {
      $$('.choice').forEach(b => { b.disabled = true; if (b.dataset.v === q.answer) b.classList.add('right'); else if (b.dataset.v === v) b.classList.add('wrong'); });
      const inp = $('#pin');
      if (inp) { inp.disabled = true; inp.classList.add(ok ? 'right' : 'wrong'); $('#pcheck').disabled = true; }
      $('#preveal')?.remove();
      $('.score').innerHTML = t('score', S.score, S.total);
    }
    $('#pfb').innerHTML = `
      <div class="feedback ${ok ? 'good' : 'bad'}">
        <div class="fb-main"><b>${ok ? t('right') : t('wrong')}</b>${!ok && !q.bal ? `<span>${t('answerIs')}: <strong>${q.show}</strong></span>` : ''}</div>
        ${q.bal ? `<div class="equation small">${eqHtml(q.comps, q.nL, q.coefs)}</div>` : ''}
        ${msg || q.why ? `<p>${msg ? msg : terms(q.why)}</p>` : ''}
        <button class="btn-y" id="pnext">${t('next')}</button>
      </div>`;
    const nx = $('#pnext');
    nx.onclick = () => { S.pq = null; practice(); };
    setTimeout(() => nx.focus(), 50);
  }

  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'toast'; el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }

  document.addEventListener('keydown', e => {
    if (S.mode !== 'practice' || !S.pq || S.pq.done || !S.pq.choices) return;
    const b = $$('.choice')[+e.key - 1];
    if (b) b.click();
  });

  // o glossário fecha ao clicar fora dele
  document.addEventListener('click', e => {
    const g = $('.glossary');
    if (g && g.open && !g.contains(e.target)) g.open = false;
  });

  applyLang();
  render();
})();
