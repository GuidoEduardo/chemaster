// Dados de núcleos (isótopos) usados nos jogos, no Estudar e no Lab (Criar Átomo).
// Faixas aproximadas: do isótopo mais leve ao mais pesado já observado de cada elemento.
// Precisa de ELEMENTS (data.js) carregado antes.

// z: [isótopos estáveis, A mínimo, A máximo, A que "não existem" dentro da faixa]
const NUC = {
  1: [[1, 2], 1, 3, []],
  2: [[3, 4], 3, 8, [5, 7]],
  3: [[6, 7], 6, 11, [10]],
  4: [[9], 7, 14, [8, 13]],
  5: [[10, 11], 8, 19, [9, 16, 18]],
  6: [[12, 13], 9, 22, [21]],
  7: [[14, 15], 12, 23, []],
  8: [[16, 17, 18], 13, 24, []],
  9: [[19], 17, 31, [28, 30]],
  10: [[20, 21, 22], 17, 34, []],
  11: [[23], 20, 39, []],
  12: [[24, 25, 26], 20, 40, []],
  13: [[27], 22, 42, []],
  14: [[28, 29, 30], 22, 44, []],
  15: [[31], 26, 46, []],
  16: [[32, 33, 34, 36], 27, 49, []],
  17: [[35, 37], 30, 51, []],
  18: [[36, 38, 40], 31, 53, []],
  19: [[39, 41], 34, 56, []],
  20: [[40, 42, 43, 44, 46, 48], 35, 58, []],
  26: [[54, 56, 57, 58], 45, 74, []],
  27: [[59], 50, 78, []],
  28: [[58, 60, 61, 62, 64], 48, 79, []],
  29: [[63, 65], 52, 84, []],
  30: [[64, 66, 67, 68, 70], 54, 85, []],
  35: [[79, 81], 68, 101, []],
  38: [[84, 86, 87, 88], 73, 108, []],
  43: [[], 85, 120, []],
  47: [[107, 109], 92, 132, []],
  53: [[127], 108, 147, []],
  55: [[133], 112, 152, []],
  61: [[], 126, 163, []],
  79: [[197], 169, 210, []],
  82: [[204, 206, 207, 208], 178, 220, []],
  83: [[], 184, 224, []],
  84: [[], 186, 227, []],
  86: [[], 193, 231, []],
  88: [[], 201, 234, []],
  90: [[], 207, 238, []],
  92: [[], 214, 242, []],
  94: [[], 226, 247, []],
};

// meias-vidas famosas [pt, en]
const HALF = {
  '1-3': ['12,3 anos', '12.3 years'], '4-7': ['53 dias', '53 days'], '4-10': ['1,4 milhão de anos', '1.4 million years'],
  '6-11': ['20 minutos', '20 minutes'], '6-14': ['5.730 anos', '5,730 years'], '7-13': ['10 minutos', '10 minutes'],
  '8-15': ['2 minutos', '2 minutes'], '9-18': ['110 minutos', '110 minutes'], '11-22': ['2,6 anos', '2.6 years'],
  '11-24': ['15 horas', '15 hours'], '12-28': ['21 horas', '21 hours'], '13-26': ['717 mil anos', '717 thousand years'],
  '14-32': ['153 anos', '153 years'], '15-32': ['14 dias', '14 days'], '16-35': ['87 dias', '87 days'],
  '17-36': ['301 mil anos', '301 thousand years'], '18-37': ['35 dias', '35 days'], '18-39': ['269 anos', '269 years'],
  '19-40': ['1,25 bilhão de anos', '1.25 billion years'], '20-41': ['99 mil anos', '99 thousand years'], '20-45': ['163 dias', '163 days'],
  '26-55': ['2,7 anos', '2.7 years'], '26-59': ['44 dias', '44 days'], '26-60': ['2,6 milhões de anos', '2.6 million years'],
  '27-60': ['5,3 anos', '5.3 years'], '38-90': ['29 anos', '29 years'], '43-98': ['4,2 milhões de anos', '4.2 million years'],
  '43-99': ['211 mil anos', '211 thousand years'], '53-131': ['8 dias', '8 days'], '55-137': ['30 anos', '30 years'],
  '61-145': ['17,7 anos', '17.7 years'], '61-147': ['2,6 anos', '2.6 years'], '79-198': ['2,7 dias', '2.7 days'],
  '82-210': ['22 anos', '22 years'], '82-214': ['27 minutos', '27 minutes'],
  '83-209': ['20 bilhões de bilhões de anos (1 bilhão de vezes a idade do universo)', '20 billion billion years (a billion times the age of the universe)'],
  '83-210': ['5 dias', '5 days'], '84-210': ['138 dias', '138 days'], '84-218': ['3 minutos', '3 minutes'],
  '86-222': ['3,8 dias', '3.8 days'], '88-226': ['1.600 anos', '1,600 years'], '88-228': ['5,8 anos', '5.8 years'],
  '90-232': ['14 bilhões de anos', '14 billion years'], '90-234': ['24 dias', '24 days'], '92-234': ['245 mil anos', '245 thousand years'],
  '92-235': ['700 milhões de anos', '700 million years'], '92-238': ['4,5 bilhões de anos', '4.5 billion years'],
  '94-239': ['24 mil anos', '24 thousand years'], '94-244': ['80 milhões de anos', '80 million years'],
};

// tipo de decaimento quando a regra geral erra (ou para os pesados que não fazem alfa)
const DECAY_FIX = {
  '17-36': 'b-', '19-40': 'b-', '43-98': 'b-', '43-99': 'b-', '61-147': 'b-', '79-198': 'b-', '82-210': 'b-', '82-214': 'b-', '83-210': 'b-', '83-214': 'b-',
  '88-228': 'b-', '90-234': 'b-', '91-234': 'b-', '92-239': 'b-', '93-239': 'b-', '94-241': 'b-',
};

// Z mais estável para cada A (aproximação do "vale de estabilidade")
const valleyZ = a => a / (1.98 + 0.0155 * Math.pow(a, 2 / 3));

const nucKey = (z, a) => z + '-' + a;
const halfLife = (z, a, lang) => { const h = HALF[nucKey(z, a)]; return h ? h[lang === 'pt' ? 0 : 1] : null; };

// isótopos estáveis do 21 ao 81 que não estão em NUC (dados reais)
const STABLE_MORE = {
  21: [45], 22: [46, 47, 48, 49, 50], 23: [51], 24: [50, 52, 53, 54], 25: [55], 31: [69, 71], 32: [70, 72, 73, 74, 76], 33: [75],
  34: [74, 76, 77, 78, 80], 36: [78, 80, 82, 83, 84, 86], 37: [85], 39: [89], 40: [90, 91, 92, 94, 96], 41: [93],
  42: [92, 94, 95, 96, 97, 98, 100], 44: [96, 98, 99, 100, 101, 102, 104], 45: [103], 46: [102, 104, 105, 106, 108, 110],
  48: [106, 108, 110, 111, 112, 114], 49: [113], 50: [112, 114, 115, 116, 117, 118, 119, 120, 122, 124], 51: [121, 123],
  52: [120, 122, 123, 124, 125, 126], 54: [124, 126, 128, 129, 130, 131, 132, 134, 136], 56: [130, 132, 134, 135, 136, 137, 138],
  57: [139], 58: [136, 138, 140, 142], 59: [141], 60: [142, 143, 145, 146, 148, 150], 62: [144, 149, 150, 152, 154], 63: [151, 153],
  64: [154, 155, 156, 157, 158, 160], 65: [159], 66: [156, 158, 160, 161, 162, 163, 164], 67: [165], 68: [162, 164, 166, 167, 168, 170],
  69: [169], 70: [168, 170, 171, 172, 173, 174, 176], 71: [175], 72: [176, 177, 178, 179, 180], 73: [181], 74: [182, 183, 184, 186],
  75: [185], 76: [184, 187, 188, 189, 190, 192], 77: [191, 193], 78: [192, 194, 195, 196, 198], 80: [196, 198, 199, 200, 201, 202, 204],
  81: [203, 205],
};
const stableOf = z => NUC[z] ? NUC[z][0] : STABLE_MORE[z] || [];

// Fórmula da energia de ligação (Bethe–Weizsäcker): estima se um núcleo pesado "segura" as partículas.
// Usada só onde não há dados reais de quais isótopos existem.
function semfB(z, n) {
  const a = z + n;
  if (a < 2 || z < 0 || n < 0) return 0;
  let b = 15.75 * a - 17.8 * Math.pow(a, 2 / 3) - 0.711 * z * (z - 1) / Math.pow(a, 1 / 3) - 23.7 * (n - z) * (n - z) / a;
  const d = 11.18 / Math.sqrt(a);
  if (z % 2 === 0 && n % 2 === 0) b += d; else if (z % 2 === 1 && n % 2 === 1) b -= d;
  return b;
}
// segura se tirar um nêutron ou um próton custar energia (senão ele escapa sozinho)
const semfBound = (z, n) => z >= 1 && n >= 1 && semfB(z, n) - semfB(z, n - 1) > 0 && semfB(z, n) - semfB(z - 1, n) > 0;
// A "ideal" (meio do vale de estabilidade) para um Z
function valleyA(z) { let best = z, bd = Infinity; for (let a = z; a <= 3 * z + 10; a++) { const d = Math.abs(valleyZ(a) - z); if (d < bd) { bd = d; best = a; } } return best; }

// Situação de um núcleo: estável, radioativo (com o tipo de decaimento) ou "não existe"
function nucInfo(z, a) {
  const n = a - z;
  if (z === 0) return { kind: n ? 'neutron' : 'empty' };
  if (z > 118 || n < 0) return { kind: 'unknown' };
  const d = NUC[z], stable = stableOf(z);
  if (stable.includes(a)) return { kind: 'stable' };
  const ref = stable.length ? stable.reduce((s, x) => s + x, 0) / stable.length : d ? (d[1] + d[2]) / 2 : valleyA(z);
  const out = d ? (a < d[1] || a > d[2] || d[3].includes(a)) : !semfBound(z, n);
  if (out) {
    if (z === 4 && a === 8) return { kind: 'unbound', why: 'split' };
    return { kind: 'unbound', why: a < ref ? 'few' : 'many' };
  }
  const k = nucKey(z, a);
  const decay = DECAY_FIX[k] || (z > 82 ? (z < valleyZ(a) - 2 ? 'b-' : 'a') : z < valleyZ(a) ? 'b-' : 'b+');
  return { kind: 'radio', decay, half: HALF[k] || null };
}

// Elétrons por camada na ordem real de energia (diagrama de Pauling): ex. Fe = 2, 8, 14, 2
const MADELUNG = [[1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [4, 0], [3, 2], [4, 1], [5, 0], [4, 2], [5, 1], [6, 0], [4, 3], [5, 2], [6, 1], [7, 0], [5, 3], [6, 2], [7, 1]];
function shellCounts(e) {
  const by = [];
  for (const [n, l] of MADELUNG) {
    if (e <= 0) break;
    const c = Math.min(e, 4 * l + 2);
    by[n - 1] = (by[n - 1] || 0) + c; e -= c;
  }
  if (e > 0) by[6] = (by[6] || 0) + e;
  return Array.from(by, x => x || 0);
}
// isótopo "típico" de um elemento: o estável mais perto da massa da tabela (ou o mais estável, se nenhum for estável)
function typicalA(z) {
  const st = stableOf(z), m = typeof MASSES !== 'undefined' ? MASSES[z] : valleyA(z);
  if (st.length) return st.reduce((b, x) => Math.abs(x - m) < Math.abs(b - m) ? x : b, st[0]);
  return Math.round(m);
}

// isótopos radioativos famosos de um elemento (os que têm meia-vida na lista)
const famousA = z => Object.keys(HALF).filter(k => +k.split('-')[0] === z).map(k => +k.split('-')[1]);
// um A "de verdade" para usar nas perguntas: quase sempre um estável, às vezes um radioativo famoso
function nucPickA(z, radioChance = 0.2) {
  const st = NUC[z][0], fam = famousA(z);
  const any = list => list[Math.floor(Math.random() * list.length)];
  if (!st.length || (fam.length && Math.random() < radioChance)) return any(fam.length ? fam : [Math.round((NUC[z][1] + NUC[z][2]) / 2)]);
  return any(st);
}

// decaimentos famosos usados no jogo Transmutação: [Z, A, tipo]
const DECAYS = [
  [1, 3, 'b-'], [4, 10, 'b-'], [6, 11, 'b+'], [6, 14, 'b-'], [7, 13, 'b+'], [8, 15, 'b+'], [9, 18, 'b+'], [11, 22, 'b+'],
  [11, 24, 'b-'], [15, 32, 'b-'], [16, 35, 'b-'], [19, 40, 'b-'], [26, 59, 'b-'], [27, 60, 'b-'], [38, 90, 'b-'], [43, 99, 'b-'],
  [53, 131, 'b-'], [55, 137, 'b-'], [79, 198, 'b-'], [82, 210, 'b-'], [83, 210, 'b-'], [84, 210, 'a'], [86, 222, 'a'],
  [88, 226, 'a'], [90, 232, 'a'], [90, 234, 'b-'], [92, 235, 'a'], [92, 238, 'a'], [94, 239, 'a'], [95, 241, 'a'],
];

// para onde o núcleo vai depois de decair
function decayTo(z, a, mode) {
  if (mode === 'b-') return { z: z + 1, a };
  if (mode === 'b+') return { z: z - 1, a };
  if (mode === 'a') return { z: z - 2, a: a - 4 };
  return { z, a };
}

// Nome do isótopo: só o hidrogênio tem nomes próprios
const H_NAMES = { 1: ['Prótio', 'Protium'], 2: ['Deutério', 'Deuterium'], 3: ['Trítio', 'Tritium'] };
function isoName(z, a, lang) {
  if (z === 1 && H_NAMES[a]) return H_NAMES[a][lang === 'pt' ? 0 : 1];
  const e = ELEMENTS[z - 1];
  return e ? `${e.name}-${a}` : '?';
}

// Carga mais comum do íon de cada elemento (0 = não costuma formar íon simples)
const ION_FIX = { 13: 3, 24: 3, 25: 2, 26: 3, 27: 2, 28: 2, 29: 2, 30: 2, 47: 1, 50: 2, 82: 2 };
function ionCharge(e) {
  if (ION_FIX[e.z] != null) return ION_FIX[e.z];
  if (e.group === 1 && e.z > 1) return 1;
  if (e.group === 2) return 2;
  if ([7, 15].includes(e.z)) return -3;
  if ([8, 16, 34].includes(e.z)) return -2;
  if ([9, 17, 35, 53].includes(e.z)) return -1;
  return 0;
}

const NUC_SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '-': '⁻' };
const supTxt = s => String(s).split('').map(c => NUC_SUP[c] || c).join('');
const chargeTxt = q => q === 0 ? '' : supTxt((Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '-'));

// Desenho simples de um átomo (núcleo + camadas de elétrons) em SVG
const SHELL_CAP = [2, 8, 8, 8, 8];
function shellsOf(e) {
  const out = [];
  for (const c of SHELL_CAP) { if (e <= 0) break; out.push(Math.min(c, e)); e -= c; }
  return out;
}
// posições do núcleo em "girassol": fica redondinho com qualquer número de partículas
function nucleusLayout(p, n, r) {
  const total = p + n, pts = [];
  // intercala prótons e nêutrons na proporção certa
  const order = [];
  let placedP = 0;
  for (let i = 0; i < total; i++) {
    if (placedP < p && (placedP + 0.5) / (i + 1) <= p / total) { order.push('p'); placedP++; }
    else if (i - placedP < n) order.push('n');
    else { order.push('p'); placedP++; }
  }
  for (let i = 0; i < total; i++) {
    const rad = r * Math.sqrt(i + 0.5) * 0.92, ang = i * 2.39996;
    pts.push({ x: rad * Math.cos(ang), y: rad * Math.sin(ang), t: order[i] });
  }
  return pts.reverse(); // os de dentro por cima
}
function miniAtom(p, n, e, { size = 120, spin = true } = {}) {
  const c = size / 2, shells = shellsOf(e);
  const pr = Math.max(2.6, Math.min(7, size / 18 / Math.sqrt(Math.max(1, (p + n) / 4))));
  const nucR = pr * Math.sqrt(p + n + 1) * 1.05;
  const gap = (c - nucR - 8) / Math.max(1, shells.length || 1);
  let s = `<svg class="mini-atom ${spin ? 'spin' : ''}" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true">`;
  shells.forEach((cnt, i) => {
    const R = nucR + 8 + gap * (i + 0.8);
    s += `<circle cx="${c}" cy="${c}" r="${R}" class="ma-shell"/>`;
    s += `<g class="ma-orbit" style="animation-duration:${6 + i * 3}s;transform-origin:${c}px ${c}px">`;
    for (let k = 0; k < cnt; k++) {
      const ang = (k / cnt) * Math.PI * 2 + i;
      s += `<circle cx="${c + R * Math.cos(ang)}" cy="${c + R * Math.sin(ang)}" r="${Math.max(2.4, pr * 0.62)}" class="ma-e"/>`;
    }
    s += `</g>`;
  });
  for (const q of nucleusLayout(p, n, pr)) s += `<circle cx="${c + q.x}" cy="${c + q.y}" r="${pr}" class="ma-${q.t}"/>`;
  return s + '</svg>';
}
