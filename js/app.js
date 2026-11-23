'use strict';

/* ---------- utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $('#app');
const byZ = z => ELEMENTS[z - 1];
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const rand = n => Math.floor(Math.random() * n);
const pickOne = a => a[rand(a.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = sec => { sec = Math.max(0, Math.ceil(sec)); return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`; };

function shuffle(a) {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const store = {
  get() { try { return JSON.parse(localStorage.getItem('chemaster')) || {}; } catch (e) { return {}; } },
  set(d) { try { localStorage.setItem('chemaster', JSON.stringify(d)); } catch (e) {} },
};

function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

/* ---------- idiomas ---------- */
const I18N = {
  pt: {
    navGames: 'Jogos', navStudy: 'Estudar', footer: 'CheMaster · feito por Guido ⚛',
    docTitle: 'CheMaster | Aprenda a Tabela Periódica',
    heroKicker: '118 elementos. Zero tédio. Bora jogar! ⚡', heroTitle: 'Jogue Química. Domine a Tabela.',
    explore: 'Explorar Jogos', studyTable: '📖 Estudar a Tabela', trending: 'Jogos',
    practice: '📗 Treino', challenge: '🔥 Desafio',
    questions: 'Perguntas', elements: 'Elementos', all: 'Todos', allQ: 'Todas', nElements: n => `${n} elementos`,
    hTo: (a, b) => `${a} até ${b}`, customFrom: 'ou escolha: do nº', customTo: 'até o nº',
    mode: 'Modo', timer: 'Tempo por pergunta', on: 'Ligado', off: 'Desligado',
    next: 'Próxima pergunta', auto: 'Automática', manual: 'Manual', manualSub: 'Toque para seguir',
    nQuestions: n => `${n} perguntas`,
    totalTime: 'Tempo total', noLimit: 'Sem limite', acceptSym: 'Aceitar símbolos',
    onlyNames: 'Só nomes', exName: 'Ex.: Ferro', namesSyms: 'Nomes e símbolos', symEnter: 'Símbolo + Enter',
    start: 'COMEÇAR', study: '📖 ESTUDAR', resetSettings: '↺ Restaurar opções padrão',
    mChoice: 'Alternativas', mChoiceSub: 'Escolha entre 4', mType: 'Digitar', mTypeSub: 'Escreva a resposta',
    mClick: 'Clicar', mClickSub: 'Toque na tabela', sChoice: 'Escolha', sType: 'Digitar', sClick: 'Clicar',
    lvlTags: ['INICIANTE', 'FÁCIL', 'MÉDIO', 'DIFÍCIL', 'MESTRE'],
    lvlNames: {
      choice: ['Novato do Lab', 'Béquer Borbulhando', 'Modo Reação', 'Caçador de Elementos', 'CheMaster Supremo'],
      type: ['Primeiras Letras', 'Dedos Rápidos', 'Químico do Teclado', 'Alquimista da Escrita', 'CheMaster das Teclas'],
      click: ['Explorador Novato', 'Desbravador da Tabela', 'Mira Certeira', 'Navegador da Grade', 'CheMaster do Alvo'],
    },
    lvlDesc: (n, to) => to === 118 ? `${n} perguntas, a tabela inteira. Sem dó!` : `${n} perguntas do elemento 1 ao ${to}. Aquece aí!`,
    fillDesc: (n, m) => `Preencha do 1 ao ${n} antes que ${m} minutos acabem!`,
    chRulesTitle: 'Como funciona o Desafio',
    chTime: '⏱️ Um tempo total para a fase inteira, não por pergunta!',
    chLives: m => `❤️ ${m}: 3 vidas, cada erro custa uma`, chInf: m => `♾️ ${m}: vidas infinitas, só o relógio manda`,
    chWin: '🏆 Responda tudo antes do tempo acabar e vença', chWinFill: '🏆 Preencha todos antes do tempo acabar e vença',
    lives3: '3 vidas', livesInf: 'Vidas infinitas',
    ctaTitle: 'Já treinou? Hora do Desafio! 🔥', ctaSub: 'Tempo total, níveis para cada modo e muito orgulho em jogo.', ctaBtn: 'Ir para o Desafio →',
    sQuestions: 'Perguntas', sTime: 'Tempo total', sMode: 'Modo', sLives: 'Vidas', sElements: 'Elementos',
    completed: '✅ Concluído', best: 'Melhor', resetProgress: '↺ Resetar progresso deste jogo',
    confirmReset: 'Apagar o progresso dos desafios deste jogo?', progressReset: 'Progresso apagado!',
    time: 'TEMPO', left: 'RESTAM', qOf: (i, n) => `Pergunta <b>${i}</b> de ${n}`,
    skip: 'Pular', restart: 'Recomeçar', pause: 'Pausar',
    yay: ['Isso aí!', 'Correto!', 'Mandou bem!', 'Perfeito!', 'Boa!'], wrong: 'Errou!', timeout: 'Tempo esgotado!', skipped: 'Pulou!',
    answer: 'Resposta', nextBtn: 'Próxima', tapNext: 'toque para continuar',
    no: 'Nº', group: 'Grupo', period: 'Período',
    paused: 'Pausado', resume: 'Continuar', quit: 'Sair',
    rPerfect: ['🏆', 'Perfeito!', 'Você acertou tudo. Incrível!'], rGreat: ['🌟', 'Excelente!', 'Você está quase dominando.'],
    rGood: ['👍', 'Bom trabalho!', 'Mais um pouco de treino e fica perfeito.'], rKeep: ['📚', 'Continue praticando!', 'Cada rodada fixa um pouco mais.'],
    rLives: ['💔', 'Acabaram as vidas!', 'Revise os erros abaixo e tente de novo.'], rTime: ['⏰', 'O tempo acabou!', 'Foi por pouco! Tenta de novo.'],
    levelDone: 'Fase concluída! ',
    correct: 'Acertos', score: 'Aproveitamento', tTime: 'Tempo', again: 'Jogar de novo ↻', back: 'Voltar',
    review: n => `Para revisar (${n})`, you: 'você',
    ofElements: n => `de ${n} elementos`, fillPh: 'Digite o nome de qualquer elemento', fillPhSym: ' (ou símbolo + Enter)',
    giveUp: 'Desistir', already: n => `${n} já foi! 😉`, missingHint: 'Os que faltaram estão em <span class="r">vermelho</span> na tabela.',
    learnTitle: 'Estudar a Tabela', learnLead: 'Toque em um elemento para ver os detalhes. Toque em uma família para destacá-la.',
    symbol: 'Símbolo', atomicNo: 'Nº atômico', family: 'Família', atomicNumber: 'Número atômico',
    emptyPool: 'Nenhum elemento nessa faixa para este jogo.',
    phName: 'Digite o nome do elemento', phSym: 'Digite o símbolo', phNum: 'Digite o número', phGroup: 'Digite o número do grupo',
    phPeriod: 'Digite o número do período', phFull: 'Digite o nome completo',
    qWhere: 'Onde fica este elemento?', qSym: 'Qual elemento tem este símbolo?', qSymOf: 'Qual é o símbolo deste elemento?',
    qZ: 'Qual é o número atômico?', qWhoZ: z => `Qual elemento tem número atômico ${z}?`, qMystery: 'Qual é o elemento destacado?',
    qFamily: 'A qual família ele pertence?', qLetters: 'Complete o nome do elemento', qGroup: 'Em qual grupo (coluna) ele está?',
    qPeriod: 'Em qual período (linha) ele está?', qBig: 'Qual tem o MAIOR número atômico?', qSmall: 'Qual tem o MENOR número atômico?',
    games: {
      table: ['Tabela Periódica', 'A tabela está em branco. Cadê cada elemento?', 'A tabela está vazia e o desafio é seu: ache o lugar certinho de cada elemento. Bora?'],
      fill: ['Preencher a Tabela', 'Escreva nomes e veja a tabela ganhar cor!', 'Digite qualquer elemento, na ordem que quiser, e veja a tabela se pintar inteira. Quantos você lembra de cabeça?'],
      symbols: ['Símbolos', 'Duas letrinhas, um elemento. Quem é?', 'Aparece o símbolo, você diz o nome. Parece fácil… até aparecerem os esquisitos!'],
      names: ['Nome → Símbolo', 'Do nome pro símbolo, sem colar!', 'Aparece o nome do elemento e você manda o símbolo. Atenção às maiúsculas!'],
      'atomic-number': ['Número Atômico', 'Quantos prótons ele tem? Chuta não!', 'Aparece o elemento, você diz o número atômico (Z). Seu cérebro vai virar uma tabela!'],
      'who-is': ['Quem é o Nº?', 'Um número aparece. Que elemento é esse?', 'Aparece um número atômico e você descobre o dono dele. Dá pra responder clicando na tabela também!'],
      mystery: ['Elemento Misterioso', 'Uma casinha acende. Quem mora ali?', 'Uma casa se ilumina na tabela vazia. Descubra qual elemento mora nesse endereço!'],
      families: ['Famílias', 'Cada elemento tem sua turma. Qual é?', 'Alcalinos, halogênios, gases nobres… Coloque cada elemento na família certa!'],
      letters: ['Letras Sumidas', 'Umas letras fugiram. Complete o nome!', 'Algumas letras deram no pé. Escreva o nome inteiro do elemento e traga elas de volta!'],
      groups: ['Grupos', 'Em que coluna esse elemento mora?', 'Diga o grupo (coluna 1 a 18) de cada elemento. Lantanídeos e actinídeos ficam de folga.'],
      periods: ['Períodos', 'Em que andar da tabela ele está?', 'Diga o período (linha 1 a 7) de cada elemento. Sobe e desce na tabela!'],
      duel: ['Duelo Atômico', 'Dois elementos, uma briga: quem é maior?', 'Dois elementos entram no ringue. Quem tem o maior (ou menor) número atômico vence!'],
    },
  },
  en: {
    navGames: 'Games', navStudy: 'Learn', footer: 'CheMaster · made by Guido ⚛',
    docTitle: 'CheMaster | Learn the Periodic Table',
    heroKicker: '118 elements. Zero boredom. Let’s play! ⚡', heroTitle: 'Play Chemistry. Master the Table.',
    explore: 'Explore Games', studyTable: '📖 Learn the Table', trending: 'Games',
    practice: '📗 Practice', challenge: '🔥 Challenge',
    questions: 'Questions', elements: 'Elements', all: 'All', allQ: 'All', nElements: n => `${n} elements`,
    hTo: (a, b) => `${a} to ${b}`, customFrom: 'or choose: from no.', customTo: 'to no.',
    mode: 'Mode', timer: 'Time limit', on: 'On', off: 'Off',
    next: 'Next question', auto: 'Auto', manual: 'Manual', manualSub: 'Tap to continue',
    nQuestions: n => `${n} questions`,
    totalTime: 'Total time', noLimit: 'No limit', acceptSym: 'Accept symbols',
    onlyNames: 'Names only', exName: 'e.g. Iron', namesSyms: 'Names & symbols', symEnter: 'Symbol + Enter',
    start: 'START', study: '📖 LEARN', resetSettings: '↺ Reset to default options',
    mChoice: 'Multiple choice', mChoiceSub: 'Pick from 4', mType: 'Type', mTypeSub: 'Type the answer',
    mClick: 'Pin', mClickSub: 'Tap the table', sChoice: 'Choice', sType: 'Type', sClick: 'Pin',
    lvlTags: ['BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'MASTER'],
    lvlNames: {
      choice: ['Lab Rookie', 'Bubbling Beaker', 'Chain Reaction', 'Element Hunter', 'Supreme CheMaster'],
      type: ['Ink Starter', 'Quick Fingers', 'Keyboard Chemist', 'Spelling Alchemist', 'Typing CheMaster'],
      click: ['Map Rookie', 'Table Explorer', 'Sharp Shooter', 'Grid Navigator', 'Pinpoint CheMaster'],
    },
    lvlDesc: (n, to) => to === 118 ? `${n} questions, the whole table. No mercy!` : `${n} questions, elements 1 to ${to}. Warm up!`,
    fillDesc: (n, m) => `Fill elements 1 to ${n} before ${m} minutes run out!`,
    chRulesTitle: 'How Challenge works',
    chTime: '⏱️ One total time for the whole level, not per question!',
    chLives: m => `❤️ ${m}: 3 lives, every mistake costs one`, chInf: m => `♾️ ${m}: infinite lives, only the clock can stop you`,
    chWin: '🏆 Answer everything before time runs out to win', chWinFill: '🏆 Fill them all before time runs out to win',
    lives3: '3 lives', livesInf: 'Infinite lives',
    ctaTitle: 'Practiced enough? Challenge time! 🔥', ctaSub: 'Total time, levels for every mode and bragging rights.', ctaBtn: 'Go to Challenge →',
    sQuestions: 'Questions', sTime: 'Total time', sMode: 'Mode', sLives: 'Lives', sElements: 'Elements',
    completed: '✅ Completed', best: 'Best', resetProgress: '↺ Reset progress for this game',
    confirmReset: 'Erase challenge progress for this game?', progressReset: 'Progress erased!',
    time: 'TIME', left: 'LEFT', qOf: (i, n) => `Question <b>${i}</b> of ${n}`,
    skip: 'Skip', restart: 'Restart', pause: 'Pause',
    yay: ['Nice!', 'Correct!', 'Well done!', 'Perfect!', 'Great!'], wrong: 'Wrong!', timeout: "Time's up!", skipped: 'Skipped!',
    answer: 'Answer', nextBtn: 'Next', tapNext: 'tap to continue',
    no: 'No.', group: 'Group', period: 'Period',
    paused: 'Paused', resume: 'Resume', quit: 'Quit',
    rPerfect: ['🏆', 'Perfect!', 'You got everything right. Amazing!'], rGreat: ['🌟', 'Excellent!', "You're almost there."],
    rGood: ['👍', 'Good job!', 'A bit more practice and it will be perfect.'], rKeep: ['📚', 'Keep practicing!', 'Every round helps it stick.'],
    rLives: ['💔', 'Out of lives!', 'Review your mistakes below and try again.'], rTime: ['⏰', "Time's up!", 'So close! Give it another go.'],
    levelDone: 'Level complete! ',
    correct: 'Correct', score: 'Score', tTime: 'Time', again: 'Play again ↻', back: 'Back',
    review: n => `To review (${n})`, you: 'you',
    ofElements: n => `of ${n} elements`, fillPh: 'Type the name of any element', fillPhSym: ' (or symbol + Enter)',
    giveUp: 'Give up', already: n => `${n} is already done! 😉`, missingHint: 'The ones you missed are in <span class="r">red</span> on the table.',
    learnTitle: 'Learn the Table', learnLead: 'Tap an element to see its details. Tap a family to highlight it.',
    symbol: 'Symbol', atomicNo: 'Atomic no.', family: 'Family', atomicNumber: 'Atomic number',
    emptyPool: 'No elements in that range for this game.',
    phName: 'Type the element name', phSym: 'Type the symbol', phNum: 'Type the number', phGroup: 'Type the group number',
    phPeriod: 'Type the period number', phFull: 'Type the full name',
    qWhere: 'Where is this element?', qSym: 'Which element has this symbol?', qSymOf: "What is this element's symbol?",
    qZ: 'What is the atomic number?', qWhoZ: z => `Which element has atomic number ${z}?`, qMystery: 'Which element is highlighted?',
    qFamily: 'Which family does it belong to?', qLetters: 'Complete the element name', qGroup: 'Which group (column) is it in?',
    qPeriod: 'Which period (row) is it in?', qBig: 'Which has the HIGHER atomic number?', qSmall: 'Which has the LOWER atomic number?',
    games: {
      table: ['Periodic Table', 'The table is blank. Where does each one go?', 'The table is empty and it is all on you: drop every element in its exact spot. Ready?'],
      fill: ['Fill the Table', 'Type names and watch the table light up!', 'Type any element, in any order, and watch the whole table fill with color. How many can you recall?'],
      symbols: ['Symbols', 'Two little letters, one element. Who is it?', 'A symbol pops up, you name the element. Easy… until the weird ones show up!'],
      names: ['Name → Symbol', 'From name to symbol, no peeking!', 'An element name shows up and you fire back its symbol. Mind the capital letters!'],
      'atomic-number': ['Atomic Number', 'How many protons? No guessing!', 'An element shows up, you give its atomic number (Z). Your brain is about to become a table!'],
      'who-is': ['Who is No.?', 'A number appears. Which element owns it?', 'An atomic number pops up and you find its owner. You can even answer by tapping the table!'],
      mystery: ['Mystery Element', 'A square lights up. Who lives there?', 'One square glows on the blank table. Figure out which element lives at that address!'],
      families: ['Families', 'Every element has a crew. Which one?', 'Alkali metals, halogens, noble gases… Send each element home to the right family!'],
      letters: ['Runaway Letters', 'Some letters ran off. Bring them back!', 'A few letters escaped from the name. Type the full element name and catch them!'],
      groups: ['Groups', 'Which column does it live in?', 'Name the group (column 1 to 18) of each element. Lanthanides and actinides get the day off.'],
      periods: ['Periods', 'Which floor of the table is it on?', 'Name the period (row 1 to 7) of each element. Up and down the table!'],
      duel: ['Atomic Duel', 'Two elements, one fight: who is bigger?', 'Two elements step into the ring. The higher (or lower) atomic number wins!'],
    },
  },
};

let LANG = store.get().lang || 'en';
const t = (k, ...a) => { const v = I18N[LANG][k] ?? I18N.pt[k] ?? k; return typeof v === 'function' ? v(...a) : v; };
const gt = (g, i) => t('games')[g.id][i]; // 0 título, 1 descrição curta, 2 descrição longa

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
  applyLang();
  route();
};

/* ---------- componentes ---------- */
function tile(el, { name = true, z = true, size = 'md', neutral = false, hideZ = false } = {}) {
  return `<div class="tile tile-${size} ${neutral ? 'neutral' : ''}" style="--c:${CATS[el.cat].color}">
    ${z ? `<span class="tz">${hideZ ? '?' : el.z}</span>` : ''}
    <span class="ts">${el.sym}</span>
    ${name ? `<span class="tn">${el.name}</span>` : ''}
  </div>`;
}

function cellHtml(e, withName = false) {
  return `<span class="z">${e.z}</span><b>${e.sym}</b>${withName ? `<span class="n">${e.name}</span>` : ''}`;
}

// Desenha a tabela periódica; cellFn decide classe/conteúdo de cada célula
function ptable(cellFn, { cls = '', ph = true, phHtml = ['', ''] } = {}) {
  let h = `<div class="ptable ${cls}">`;
  for (const el of ELEMENTS) {
    const c = cellFn(el) || {};
    h += `<div class="pc ${c.cls || ''}" data-z="${el.z}" style="grid-row:${el.row};grid-column:${el.col};${c.style || ''}">${c.html || ''}</div>`;
  }
  if (ph) {
    h += `<div class="pc ph" style="grid-row:6;grid-column:3">${phHtml[0]}</div>`;
    h += `<div class="pc ph" style="grid-row:7;grid-column:3">${phHtml[1]}</div>`;
  }
  return h + '</div>';
}
const mini = clsFn => ptable(e => ({ cls: clsFn(e) || '' }), { cls: 'mini', ph: false });

const bigTile = (el, o = {}) => tile(el, { size: 'xl', neutral: true, ...o });
const nameCard = s => `<div class="vis-name">${s}</div>`;
const bigNum = z => `<div class="vis-num"><small>${t('atomicNumber')}</small>${z}</div>`;

function letters(name) {
  const chars = [...name];
  const idx = chars.map((c, i) => i).filter(i => i > 0);
  const hide = new Set(shuffle(idx).slice(0, Math.max(1, Math.round(chars.length * 0.4))));
  return `<div class="letters">${chars.map((c, i) => `<span class="${hide.has(i) ? 'hole' : ''}">${hide.has(i) ? '' : c.toUpperCase()}</span>`).join('')}</div>`;
}

/* ---------- geradores de alternativas ---------- */
function elOpts(el, pool, f) {
  const labels = new Set([f(el)]);
  const src = pool.length >= 8 ? pool : ELEMENTS;
  for (const o of shuffle(src)) { if (labels.size >= 4) break; if (o !== el) labels.add(f(o)); }
  return shuffle([...labels]);
}
function numOpts(ans, min, max, f = String) {
  const s = new Set([ans]);
  for (let i = 0; s.size < 4 && i < 200; i++) {
    const d = ans + rand(11) - 5;
    if (d >= min && d <= max) s.add(d);
  }
  return shuffle([...s]).map(f);
}
function otherEl(el, pool) {
  const src = pool.length >= 2 ? pool : ELEMENTS;
  let o; do { o = pickOne(src); } while (o === el);
  return o;
}
// Nomes aceitos ao digitar: nos dois idiomas
const names = el => [el.namePt, el.nameEn, ...el.altsPt, ...el.altsEn];

/* ---------- jogos ---------- */
const MODES = {
  choice: { label: () => t('mChoice'), sub: () => t('mChoiceSub'), icon: '🔘', short: () => t('sChoice') },
  type:   { label: () => t('mType'),   sub: () => t('mTypeSub'),   icon: '⌨️', short: () => t('sType') },
  click:  { label: () => t('mClick'),  sub: () => t('mClickSub'),  icon: '📍', short: () => t('sClick') },
};

const GAMES = [
  {
    id: 'table', modes: ['click'],
    bg: '#1ccaf7', thumb: () => mini(e => e.z === 26 || e.z === 79 ? 'hl-red' : ''),
    make: el => ({ heading: t('qWhere'), visual: nameCard(el.name), answer: el.name }),
  },
  {
    id: 'fill', kind: 'fill',
    bg: 'linear-gradient(135deg,#ffe46b,#ffb238)', thumb: () => mini(e => e.z <= 44 ? 'cat-' + e.cat : ''),
  },
  {
    id: 'symbols', modes: ['choice', 'type'],
    bg: 'linear-gradient(135deg,#a78bfa,#6d4bd8)', thumb: () => `<div class="t-tile">Au</div>`,
    make: (el, pool, mode) => ({
      heading: t('qSym'), visual: bigTile(el, { name: false, z: false }),
      answer: el.name, accept: names(el), placeholder: t('phName'),
      options: mode === 'choice' && elOpts(el, pool, e => e.name),
    }),
  },
  {
    id: 'names', modes: ['choice', 'type'],
    bg: 'linear-gradient(135deg,#ffb36b,#ff7a45)', thumb: () => `<div class="t-card">${byZ(11).name}</div><span class="t-arrow">→</span><div class="t-tile sm">Na</div>`,
    make: (el, pool, mode) => ({
      heading: t('qSymOf'), visual: nameCard(el.name),
      answer: el.sym, accept: [el.sym], placeholder: t('phSym'),
      options: mode === 'choice' && elOpts(el, pool, e => e.sym),
    }),
  },
  {
    id: 'atomic-number', modes: ['choice', 'type'],
    bg: 'linear-gradient(135deg,#5ee0a0,#1fae6b)', thumb: () => `<div class="t-tile"><small>?</small>O</div>`,
    make: el => ({
      heading: t('qZ'), visual: bigTile(el, { z: true, hideZ: true }),
      answer: String(el.z), accept: [String(el.z)], placeholder: t('phNum'),
      options: numOpts(el.z, 1, 118), inputmode: 'numeric',
    }),
  },
  {
    id: 'who-is', modes: ['choice', 'type', 'click'],
    bg: 'linear-gradient(135deg,#4fc3ff,#2f6fd6)', thumb: () => `<div class="t-big">${t('no')} 79</div>`,
    make: (el, pool, mode) => ({
      heading: t('qWhoZ', el.z), visual: bigNum(el.z),
      answer: el.name, accept: names(el), placeholder: t('phName'),
      options: mode === 'choice' && elOpts(el, pool, e => e.name),
    }),
  },
  {
    id: 'mystery', modes: ['choice', 'type'],
    bg: '#14304a', thumb: () => mini(e => e.z === 35 ? 'hl' : 'dim'),
    make: (el, pool, mode) => ({
      heading: t('qMystery'), wide: true,
      visual: `<div class="mapbox">${ptable(e => e.z === el.z ? { cls: 'hl', html: '?' } : { cls: 'land' })}</div>`,
      answer: el.name, accept: names(el), placeholder: t('phName'),
      options: mode === 'choice' && elOpts(el, pool, e => e.name),
    }),
  },
  {
    id: 'families', modes: ['choice'],
    bg: 'linear-gradient(135deg,#ff9ec4,#e8579a)',
    thumb: () => `<div class="t-grid">${[11, 17, 10, 26].map(z => `<div class="t-mini" style="background:${CATS[byZ(z).cat].color}">${byZ(z).sym}</div>`).join('')}</div>`,
    make: el => {
      const ans = CATS[el.cat].name;
      const others = shuffle(Object.values(CATS).map(c => c.name).filter(n => n !== ans)).slice(0, 3);
      return { heading: t('qFamily'), visual: bigTile(el), answer: ans, options: shuffle([ans, ...others]) };
    },
  },
  {
    id: 'letters', modes: ['type'],
    bg: '#1ccaf7',
    thumb: () => `<div class="letters t-letters">${(LANG === 'en' ? ['I', '', 'O', ''] : ['F', '', 'R', 'R', '']).map(c => `<span class="${c ? '' : 'hole'}">${c}</span>`).join('')}</div>`,
    make: el => ({ heading: t('qLetters'), visual: letters(el.name), answer: el.name, accept: names(el), placeholder: t('phFull') }),
  },
  {
    id: 'groups', modes: ['choice', 'type'], filter: e => e.group,
    bg: 'linear-gradient(135deg,#43d9c6,#139e8f)', thumb: () => mini(e => e.group === 17 ? 'hl' : ''),
    make: el => ({
      heading: t('qGroup'), visual: bigTile(el),
      answer: `${t('group')} ${el.group}`, accept: [String(el.group), 'grupo' + el.group, 'group' + el.group], placeholder: t('phGroup'),
      options: numOpts(el.group, 1, 18, n => `${t('group')} ${n}`), inputmode: 'numeric',
    }),
  },
  {
    id: 'periods', modes: ['choice', 'type'],
    bg: 'linear-gradient(135deg,#c3b1ff,#8a6cf0)', thumb: () => mini(e => e.row === 4 ? 'hl' : ''),
    make: el => ({
      heading: t('qPeriod'), visual: bigTile(el),
      answer: `${t('period')} ${el.period}`, accept: [String(el.period), 'periodo' + el.period, 'period' + el.period], placeholder: t('phPeriod'),
      options: numOpts(el.period, 1, 7, n => `${t('period')} ${n}`), inputmode: 'numeric',
    }),
  },
  {
    id: 'duel', modes: ['choice'],
    bg: 'linear-gradient(90deg,#ff8c7a 50%,#7fd1ff 50%)', thumb: () => `<div class="t-tile sm">Na</div><span class="t-vs">VS</span><div class="t-tile sm">Cl</div>`,
    make: (el, pool) => {
      const o = otherEl(el, pool), big = Math.random() < 0.5;
      const ans = big ? (el.z > o.z ? el : o) : (el.z < o.z ? el : o);
      const pair = shuffle([el, o]);
      return {
        heading: big ? t('qBig') : t('qSmall'),
        visual: `<div class="vs">${tile(pair[0], { size: 'lg', neutral: true, z: false })}<span>VS</span>${tile(pair[1], { size: 'lg', neutral: true, z: false })}</div>`,
        answer: ans.name, options: pair.map(e => e.name), el: ans, reveal: pair,
      };
    },
  },
];
const gameById = id => GAMES.find(g => g.id === id);

const LEVELS = [
  { stars: 1, color: '#2e9e4f', soft: '#e9f7ee', count: 10, to: 20, limit: 180, icon: '🧪', bg: 'linear-gradient(135deg,#8ee8ff,#2fb6f0)' },
  { stars: 2, color: '#2f6fd6', soft: '#e9f1fd', count: 20, to: 36, limit: 360, icon: '⚗️', bg: 'linear-gradient(135deg,#ffcf6b,#ff8a3d)' },
  { stars: 3, color: '#c9970b', soft: '#fdf6e3', count: 30, to: 54, limit: 540, icon: '🔬', bg: 'linear-gradient(135deg,#9b7bff,#4b2fb8)' },
  { stars: 4, color: '#d63b3b', soft: '#fdecec', count: 50, to: 118, limit: 720, icon: '🔥', bg: 'linear-gradient(135deg,#ff6b6b,#7a0f1f)' },
  { stars: 5, color: '#6b3fd6', soft: '#f1ecfd', count: 118, to: 118, limit: 1200, icon: '👑', bg: 'linear-gradient(135deg,#3a2a0a,#c99a2e)' },
];
const FILL_LEVELS = [
  { ...LEVELS[0], to: 20, limit: 180 },
  { ...LEVELS[1], to: 36, limit: 420 },
  { ...LEVELS[2], to: 54, limit: 660 },
  { ...LEVELS[3], to: 86, limit: 900 },
  { ...LEVELS[4], to: 118, limit: 900 },
];

function poolOf(g, from, to) {
  return ELEMENTS.filter(e => e.z >= from && e.z <= to && (!g.filter || g.filter(e)));
}

function buildQ(g, el, pool, mode) {
  const q = g.make(el, pool, mode);
  q.el = q.el || el; q.mode = mode; q.game = g;
  if (q.accept) q.accept = q.accept.map(norm);
  if (mode === 'click') q.target = q.el.z;
  return q;
}

/* ---------- desenhos à mão ---------- */
const DOODLE = {
  q: `<svg class="dd dd-q" viewBox="0 0 120 170" aria-hidden="true"><path d="M22 52 C18 20 52 6 76 12 C104 20 112 50 92 70 C78 84 58 86 56 108 C55 118 60 122 60 122" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round"/><path d="M48 146 C40 140 46 128 58 130 C70 132 72 146 62 152 C54 156 46 152 48 146 Z" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round"/></svg>`,
  spark: `<svg class="dd dd-spark" viewBox="0 0 100 50" aria-hidden="true"><path d="M25 2 C27 18 32 23 48 25 C32 27 27 32 25 48 C23 32 18 27 2 25 C18 23 23 18 25 2Z" fill="currentColor"/><path d="M75 6 C77 19 81 23 94 25 C81 27 77 31 75 44 C73 31 69 27 56 25 C69 23 73 19 75 6Z" fill="currentColor"/></svg>`,
  check: `<svg class="dd dd-check" viewBox="0 0 60 50" aria-hidden="true"><path d="M5 26 C12 32 16 38 20 44 C30 26 42 13 56 4" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cross: `<svg class="dd dd-cross" viewBox="0 0 50 50" aria-hidden="true"><path d="M8 8 C20 20 30 30 42 42 M42 8 C30 20 20 30 8 42" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>`,
  swirl: `<svg class="dd dd-swirl" viewBox="0 0 160 50" aria-hidden="true"><path d="M4 38 C14 8 22 8 22 30 C22 44 30 10 38 10 C46 10 44 40 52 40 C60 40 60 12 68 12 C76 12 74 40 82 40 C90 40 92 16 100 18 C108 20 106 38 114 38 C122 38 126 26 156 30" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/></svg>`,
  grid: `<svg class="dd dd-grid" viewBox="0 0 300 220" aria-hidden="true"><g stroke="currentColor" stroke-width="2.5">${[0,1,2,3,4,5,6].map(i => `<line x1="${10 + i * 46}" y1="0" x2="${10 + i * 46}" y2="220"/>`).join('')}${[0,1,2,3,4].map(i => `<line x1="0" y1="${14 + i * 48}" x2="300" y2="${14 + i * 48}"/>`).join('')}</g></svg>`,
};
const THUMB_BG = ['#86d81c', '#ffd84d', '#7fd1ff', '#ff9ec4', '#bca4ff', '#5fe3c6'];
const ICONS = { table: '📍', fill: '✍️', symbols: 'Au', names: 'Na', 'atomic-number': 'Z', 'who-is': '#', mystery: '?', families: '🎨', letters: 'A_', groups: '↕', periods: '↔', duel: '⚖️' };

/* ---------- roteamento ---------- *//* ---------- roteamento ---------- */
let G = null; // jogo em andamento

function stopGame() {
  if (G) { clearInterval(G.iv); clearTimeout(G.to); }
  G = null;
  $$('#pause-ov, #pop').forEach(e => e.remove());
}

function route() {
  stopGame();
  const parts = (location.hash.slice(1) || '/').split('/').filter(Boolean);
  // endereços antigos (em português) redirecionam para os novos
  const OLD = { jogos: 'games', jogo: 'game', estudar: 'learn' };
  const OLD_IDS = {"tabela":"table","preencher":"fill","simbolos":"symbols","nomes":"names","numero":"atomic-number","quem":"who-is","misterio":"mystery","familias":"families","letras":"letters","grupos":"groups","periodos":"periods","maior":"duel"};
  if (OLD[parts[0]]) {
    const np = [OLD[parts[0]], ...(parts[1] ? [OLD_IDS[parts[1]] || parts[1]] : [])];
    location.replace('#/' + np.join('/'));
    return;
  }
  if (!parts.length) renderHome();
  else if (parts[0] === 'games') renderHome();
  else if (parts[0] === 'game') renderGamePage(parts[1]);
  else if (parts[0] === 'learn') renderLearn();
  else renderHome();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (a && a.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
});

/* ---------- página inicial ---------- */
function renderHome() {
  app.innerHTML = `
  <section class="stage home">
    ${DOODLE.grid}
    <div class="home-head">
      <p class="kicker">${t('heroKicker')}</p>
      <div class="title-row">
        <h1 class="title-box">${LANG === 'en' ? 'Chemistry' : 'Química'}</h1>
        ${DOODLE.q}
      </div>
      ${DOODLE.spark}
    </div>
    <div class="sec-head" id="games"><h2>${t('trending')}</h2>${DOODLE.swirl}</div>
    <div class="grid">
      ${GAMES.map((g, i) => `
        <a class="gcard" href="#/game/${g.id}">
          <div class="thumb" style="background:${THUMB_BG[i % THUMB_BG.length]}">${g.thumb()}<span class="num">${String(i + 1).padStart(2, '0')}</span></div>
          <div class="gbody"><h3>${gt(g, 0)}</h3><p>${gt(g, 1)}</p></div>
        </a>`).join('')}
    </div>
    <a class="study-link" href="#/learn">${t('studyTable')} →</a>
  </section>`;
}

/* ---------- página do jogo (Treino / Desafio) ---------- */
function defaultSettings(g) {
  return g.kind === 'fill'
    ? { range: '1-118', limit: '900', symbols: 'no' }
    : { range: '1-118', count: '10', mode: g.modes[0], timer: '0', next: 'auto' };
}
function getSettings(g) {
  const saved = (store.get().settings || {})[g.id] || {};
  const s = { ...defaultSettings(g), ...saved };
  if (s.mode && !g.modes.includes(s.mode)) s.mode = g.modes[0];
  if (!['1-20', '1-36', '1-54', '1-118'].includes(s.range)) s.range = '1-118';
  if (g.kind !== 'fill') s.count = fitCount(g, s);
  return s;
}
function saveSettings(g, s) {
  const d = store.get(); d.settings = d.settings || {};
  if (s) d.settings[g.id] = s; else delete d.settings[g.id];
  store.set(d);
}

function optGroup(label, key, cur, opts) {
  return `<div class="og"><div class="og-label">${label}</div><div class="opts">
    ${opts.map(o => `<button class="opt ${String(cur) === String(o.v) ? 'on' : ''}" data-k="${key}" data-v="${o.v}">${o.label}${o.sub ? `<small>${o.sub}</small>` : ''}</button>`).join('')}
  </div></div>`;
}

function rangeGroup(s, g) {
  return optGroup(t('elements'), 'range', s.range, [
    { v: '1-20', label: '1 → 20', sub: t('hTo', 'H', 'Ca') },
    { v: '1-36', label: '1 → 36', sub: t('hTo', 'H', 'Kr') },
    { v: '1-54', label: '1 → 54', sub: t('hTo', 'H', 'Xe') },
    { v: '1-118', label: t('all'), sub: t('nElements', g ? poolSize(g, '1-118') : 118) },
  ]);
}

const poolSize = (g, range) => { const [a, b] = range.split('-').map(Number); return poolOf(g, a, b).length; };
const countOpts = (g, range) => [10, 20, 30, 50].filter(n => n < poolSize(g, range));
// se a quantidade escolhida não cabe na faixa nova, vira "Todas"
function fitCount(g, s) {
  if (s.count === 'all') return 'all';
  return countOpts(g, s.range).includes(+s.count) ? String(s.count) : 'all';
}
function countGroup(g, s) {
  const size = poolSize(g, s.range);
  return optGroup(t('questions'), 'count', s.count, [
    ...countOpts(g, s.range).map(n => ({ v: String(n), label: String(n) })),
    { v: 'all', label: t('allQ'), sub: t('nQuestions', size) },
  ]);
}

function renderGamePage(id, tab = 'p') {
  const g = gameById(id);
  if (!g) return renderHome();
  const idx = GAMES.indexOf(g) + 1;
  app.innerHTML = `
  <section class="stage gp">
    <a class="back-link" href="#/">← ${t('navGames')}</a>
    <div class="round">
      <div class="round-num">${String(idx).padStart(2, '0')}</div>
      <div>
        <h1 class="round-title">${gt(g, 0)}</h1>
        <p class="lead">${gt(g, 2)}</p>
      </div>
      ${DOODLE.check}
    </div>
    <div class="tabs">
      <button class="tab ${tab === 'p' ? 'active' : ''}" data-tab="p">${t('practice')}</button>
      <button class="tab ${tab === 'c' ? 'active' : ''}" data-tab="c">${t('challenge')}</button>
    </div>
    <div class="panel" id="panel"></div>
  </section>`;
  $$('.tab').forEach(b => b.onclick = () => renderGamePage(id, b.dataset.tab));
  tab === 'p' ? renderPractice(g) : renderChallenge(g);
}

function renderPractice(g) {
  const s = getSettings(g);
  const panel = $('#panel');
  let h = '';
  if (g.kind === 'fill') {
    h += rangeGroup(s, g);
    h += optGroup(t('totalTime'), 'limit', s.limit, [
      { v: '300', label: '5 min' }, { v: '600', label: '10 min' }, { v: '900', label: '15 min' }, { v: '0', label: t('noLimit') },
    ]);
    h += optGroup(t('acceptSym'), 'symbols', s.symbols, [
      { v: 'no', label: t('onlyNames'), sub: t('exName') }, { v: 'yes', label: t('namesSyms'), sub: t('symEnter') },
    ]);
  } else {
    h += rangeGroup(s, g);
    h += countGroup(g, s);
    if (g.modes.length > 1) h += optGroup(t('mode'), 'mode', s.mode, g.modes.map(m => ({ v: m, label: `${MODES[m].icon} ${MODES[m].label()}`, sub: MODES[m].sub() })));
    h += `<div class="og-row">
      ${optGroup(t('timer'), 'timer', s.timer, [{ v: '15', label: t('on'), sub: '15s' }, { v: '0', label: t('off') }])}
      ${optGroup(t('next'), 'next', s.next, [{ v: 'auto', label: t('auto') }, { v: 'manual', label: t('manual'), sub: t('manualSub') }])}
    </div>`;
  }
  h += `<div class="panel-btns"><button class="btn-y wide" id="start">${t('start')} <span>→</span></button>
        <a class="btn-w wide" href="#/learn">${t('study')}</a>
        <button class="link-btn" id="resetSet">${t('resetSettings')}</button></div>
    <div class="cta">
      <div class="cta-txt"><b>${t('ctaTitle')}</b><span>${t('ctaSub')}</span></div>
      <button class="btn-y cta-btn" id="goChallenge">${t('ctaBtn')}</button>
    </div>`;
  panel.innerHTML = h;

  $$('.opt', panel).forEach(b => b.onclick = () => {
    s[b.dataset.k] = b.dataset.v;
    if (g.kind !== 'fill') s.count = fitCount(g, s);
    saveSettings(g, s); renderPractice(g);
  });
  $('#resetSet').onclick = () => { saveSettings(g, null); renderPractice(g); };
  $('#goChallenge').onclick = () => renderGamePage(g.id, 'c');
  $('#start').onclick = () => g.kind === 'fill' ? startFillPractice(g, s) : startPractice(g, s);
}

function renderChallenge(g) {
  const best = (store.get().best || {})[g.id] || {};
  const fill = g.kind === 'fill';
  const modes = fill ? ['type'] : g.modes;
  const levels = fill ? FILL_LEVELS : LEVELS;
  const label = m => MODES[m].label();
  const limited = modes.filter(m => m !== 'type');
  const rules = [t('chTime')];
  if (limited.length) rules.push(t('chLives', limited.map(label).join(' / ')));
  if (modes.includes('type')) rules.push(t('chInf', label('type')));
  rules.push(t(fill ? 'chWinFill' : 'chWin'));

  let h = `<div class="ch-rules"><div class="ch-title">${t('chRulesTitle')}</div>
    <div class="ch-list">${rules.map(r => `<span>${r}</span>`).join('')}</div></div>`;
  for (const mode of modes) {
    const inf = mode === 'type';
    h += `<div class="mode-head"><span class="mode-ic">${MODES[mode].icon}</span><b>${label(mode)}</b>
      <span class="mode-lives ${inf ? 'inf' : ''}">${inf ? '♾️ ' + t('livesInf') : '❤️ ' + t('lives3')}</span></div>`;
    h += levels.map((L, i) => {
      const key = `${mode}-${i}`;
      const mins = Math.round(L.limit / 60) + ' min';
      const n = fill ? L.to : Math.min(L.count, poolOf(g, 1, L.to).length);
      const desc = fill ? t('fillDesc', L.to, Math.round(L.limit / 60)) : t('lvlDesc', n, L.to);
      const info = [
        fill ? ['🧪', n, t('sElements')] : ['📋', n, t('sQuestions')],
        ['⏱️', mins, t('sTime')],
        [MODES[mode].icon, MODES[mode].short(), t('sMode')],
        inf ? ['♾️', '∞', t('sLives')] : ['❤️', 3, t('sLives')],
      ];
      const bst = best[key];
      const badge = bst ? (bst.passed ? `<span class="done-badge">${t('completed')}</span>` : `<span class="best-badge">${t('best')}: ${bst.score}</span>`) : '';
      return `<div class="lvl">
        <div class="lvl-img" style="background:${L.bg}">${L.icon}</div>
        <div class="lvl-body">
          <div class="lvl-top"><span class="lvl-tag" style="background:${L.color}">${t('lvlTags')[i]}</span><span class="stars">${'★'.repeat(L.stars)}</span>${badge}</div>
          <h3>${t('lvlNames')[mode][i]}</h3><p>${desc}</p>
          <div class="lvl-stats" style="background:${L.soft}">${info.map(([ic, v, l]) => `<div><b>${ic} ${v}</b><small>${l}</small></div>`).join('')}</div>
        </div>
        <div class="lvl-go"><button class="btn-y" data-mode="${mode}" data-lvl="${i}">${t('start')} <span>→</span></button></div>
      </div>`;
    }).join('');
  }
  if (Object.keys(best).length) h += `<div class="panel-btns"><button class="link-btn" id="resetProg">${t('resetProgress')}</button></div>`;
  $('#panel').innerHTML = h;
  $$('[data-lvl]').forEach(btn => btn.onclick = () => fill
    ? startFillChallenge(g, +btn.dataset.lvl)
    : startChallenge(g, +btn.dataset.lvl, btn.dataset.mode));
  const rp = $('#resetProg');
  if (rp) rp.onclick = () => {
    if (!confirm(t('confirmReset'))) return;
    const d = store.get(); if (d.best) delete d.best[g.id]; store.set(d);
    toast(t('progressReset')); renderChallenge(g);
  };
}

function saveBest(gid, key, score, total, passed) {
  const d = store.get(); d.best = d.best || {}; d.best[gid] = d.best[gid] || {};
  const prev = d.best[gid][key];
  const keepPrev = prev && prev.n > score;
  d.best[gid][key] = {
    score: keepPrev ? prev.score : `${score}/${total}`, n: keepPrev ? prev.n : score,
    passed: passed || !!(prev && prev.passed),
  };
  store.set(d);
}

/* ---------- iniciar partidas ---------- */
function startPractice(g, s) {
  const [from, to] = s.range.split('-').map(Number);
  const pool = poolOf(g, from, to);
  if (!pool.length) return toast(t('emptyPool'));
  const list = shuffle(pool).slice(0, s.count === 'all' ? pool.length : Math.min(+s.count, pool.length));
  startGame({
    questions: list.map(el => buildQ(g, el, pool, s.mode)),
    timer: +s.timer, next: s.next, lives: 0, limit: 0,
    back: () => renderGamePage(g.id, 'p'), replay: () => startPractice(g, s),
  });
}

function startChallenge(g, li, mode) {
  const L = LEVELS[li];
  const pool = poolOf(g, 1, L.to);
  const list = shuffle(pool).slice(0, Math.min(L.count, pool.length));
  const lives = mode === 'type' ? 0 : 3; // digitar: vidas infinitas
  startGame({
    questions: list.map(el => buildQ(g, el, pool, mode)),
    timer: 0, next: 'auto', lives, maxLives: lives, limit: L.limit, challenge: true,
    back: () => renderGamePage(g.id, 'c'), replay: () => startChallenge(g, li, mode),
    onFinish: r => saveBest(g.id, `${mode}-${li}`, r.score, r.total, r.passed),
  });
}

/* ---------- motor do quiz ---------- */
const hudButtons = () => `
  <button class="hud-btn" id="restart" title="${t('restart')}">↻</button>
  <button class="hud-btn" id="pause" title="${t('pause')} (Esc)">❚❚</button>`;

function bindHud() {
  $('#pause').onclick = togglePause;
  $('#restart').onclick = () => { const r = G.replay; stopGame(); r(); };
}

function startGame(cfg) {
  stopGame();
  // marked: z -> 'done' | 'wrong' (elementos já perguntados no modo clicar)
  G = { ...cfg, i: 0, score: 0, results: [], elapsed: 0, qTime: 0, paused: false, locked: false, marked: new Map(), last: performance.now() };
  app.innerHTML = `
  <section class="stage play">
    <div class="hud">
      <div class="clock"><small>${G.limit ? t('left') : t('time')}</small><b id="clock">0:00</b></div>
      <div class="bars"><div class="ticks" id="ticks">${G.questions.map(() => '<i></i>').join('')}</div><div class="qbar"><span id="qbar"></span></div></div>
      ${G.lives ? `<div class="lives" id="lives"></div>` : ''}
      ${hudButtons()}
    </div>
    <div class="qmeta" id="qmeta"></div>
    <div class="deco-l">${DOODLE.swirl}</div><div class="deco-r">${DOODLE.spark}</div>
    <h2 class="qhead" id="qhead"></h2>
    <div id="qvis"></div>
    <div id="qans"></div>
  </section>`;
  bindHud();
  renderQuestion();
  G.iv = setInterval(tick, 100);
}

function tick() {
  if (!G) return;
  const now = performance.now(), dt = (now - G.last) / 1000;
  G.last = now;
  if (G.paused || G.over) return;
  G.elapsed += dt;
  if (G.fill) {
    if (G.limit && G.elapsed >= G.limit) return finishFill('time');
  } else {
    if (!G.locked) {
      G.qTime += dt;
      if (G.timer && G.qTime >= G.timer) answer(null, 'timeout');
    }
    if (G.limit && G.elapsed >= G.limit) return finish('time');
  }
  updateHud();
}

function updateHud() {
  if (!G) return;
  $('#clock').textContent = fmt(G.limit ? G.limit - G.elapsed : G.elapsed);
  $('.clock').classList.toggle('hurry', !!G.limit && G.limit - G.elapsed <= 30);
  const bar = $('#qbar');
  if (G.fill) bar.style.width = (G.limit ? 100 * (1 - G.elapsed / G.limit) : 100 * G.found.size / G.pool.length) + '%';
  else if (G.timer) bar.style.width = Math.max(0, 100 * (1 - G.qTime / G.timer)) + '%';
  else if (G.limit) bar.style.width = Math.max(0, 100 * (1 - G.elapsed / G.limit)) + '%';
  else bar.style.width = (100 * G.i / G.questions.length) + '%';
  const lv = $('#lives');
  if (lv) lv.innerHTML = '<span>❤️</span>'.repeat(G.lives) + '<span class="lost">🤍</span>'.repeat(G.maxLives - G.lives);
}

const skipBtn = () => `<button class="skip-btn" id="skip">${t('skip')} ⏭</button>`;

function renderQuestion() {
  const q = G.questions[G.i];
  G.qTime = 0; G.locked = false;
  $$('#ticks i').forEach((tk, i) => tk.classList.toggle('cur', i === G.i));
  $('#qmeta').innerHTML = `${t('qOf', G.i + 1, G.questions.length)} <span class="ok-count">✔ ${G.score}</span>`;
  $('#qhead').textContent = q.heading;
  $('#qvis').innerHTML = q.visual ? `<div class="vis ${q.wide ? 'vis-wide' : ''} ${q.mode === 'click' ? 'vis-compact' : ''}">${q.visual}</div>` : '';
  const ans = $('#qans');
  if (q.mode === 'choice') {
    ans.innerHTML = `<div class="choices ${q.options.length === 2 ? 'two' : ''}">${q.options.map((o, i) => `<button class="choice" data-v="${esc(o)}"><kbd>${i + 1}</kbd>${o}</button>`).join('')}</div>
      <div class="skip-row">${skipBtn()}</div>`;
    $$('.choice', ans).forEach(b => b.onclick = () => answer(b.dataset.v));
  } else if (q.mode === 'type') {
    ans.innerHTML = `<div class="type-row"><input id="tin" class="tin" autocomplete="off" autocapitalize="off" spellcheck="false" ${q.inputmode ? `inputmode="${q.inputmode}"` : ''} placeholder="${q.placeholder || ''}">${skipBtn()}</div>`;
    const inp = $('#tin');
    inp.oninput = () => { if (q.accept.includes(norm(inp.value))) answer(inp.value); };
    inp.onkeydown = e => { if (e.key === 'Enter' && inp.value.trim()) answer(inp.value); };
    inp.focus();
  } else {
    // Todos os elementos já perguntados ficam marcados (verde = acertou, vermelho = errou)
    ans.innerHTML = `<div class="skip-row top">${skipBtn()}</div>
      <div class="board">${ptable(e => G.marked.has(e.z) ? { cls: G.marked.get(e.z), html: cellHtml(e) } : { cls: 'blank' }, { cls: 'click-t' })}</div>`;
    $$('.click-t .pc.blank', ans).forEach(c => c.onclick = () => answer(+c.dataset.z));
  }
  $('#skip').onclick = () => answer(null, 'skip');
  updateHud();
}

function factHtml(e) {
  return `<div class="fact">${tile(e, { size: 'sm', name: false })}<div><b>${e.name} (${e.sym})</b><small>${t('no')} ${e.z} · ${CATS[e.cat].name}${e.group ? ` · ${t('group')} ${e.group}` : ''} · ${t('period')} ${e.period}</small></div></div>`;
}

function answer(v, how) {
  if (!G || G.locked || G.over) return;
  G.locked = true;
  const q = G.questions[G.i];
  let ok = false;
  const sk = $('#skip'); if (sk) sk.disabled = true;
  if (q.mode === 'choice') {
    ok = v === q.answer;
    $$('.choice').forEach(b => {
      b.disabled = true;
      if (b.dataset.v === q.answer) b.classList.add('right');
      else if (b.dataset.v === v) b.classList.add('wrong');
    });
  } else if (q.mode === 'type') {
    ok = v != null && q.accept.includes(norm(v));
    const inp = $('#tin');
    inp.disabled = true; inp.classList.add(ok ? 'right' : 'wrong');
    if (!ok) inp.value = q.answer;
  } else {
    ok = v === q.target;
    $$('.click-t .pc').forEach(c => c.onclick = null);
    const cell = $(`.click-t .pc[data-z="${q.target}"]`);
    cell.classList.remove('blank'); cell.classList.add(ok ? 'done' : 'reveal'); cell.innerHTML = cellHtml(q.el);
    if (!ok && v) $(`.click-t .pc[data-z="${v}"]`).classList.add('miss');
    G.marked.set(q.target, ok ? 'done' : 'wrong');
  }
  if (ok) G.score++;
  G.results.push({ q, ok, given: v });
  $$('#ticks i')[G.i].className = ok ? 'ok' : 'no';
  $('#qmeta .ok-count').textContent = `✔ ${G.score}`;

  showPop(ok, how, q);

  if (!ok && G.lives) {
    G.lives--; updateHud();
    if (G.lives <= 0) { G.over = true; G.to = setTimeout(() => finish('lives'), 1100); return; }
  }
  if (G.next !== 'manual') G.to = setTimeout(nextQ, ok ? 650 : 1100);
}

// Popup animado de acerto/erro
function showPop(ok, how, q) {
  const title = ok ? pickOne(t('yay')) : how === 'timeout' ? t('timeout') : how === 'skip' ? t('skipped') : t('wrong');
  const icon = ok ? DOODLE.check : how === 'skip' ? '⏭' : how === 'timeout' ? '⏰' : DOODLE.cross;
  const manual = G.next === 'manual' && !G.over;
  const wrap = document.createElement('div');
  wrap.id = 'pop';
  wrap.className = `pop-wrap ${q.mode === 'click' ? 'pop-top' : ''}`;
  wrap.innerHTML = `<div class="pop ${ok ? 'good' : 'bad'}">
    <div class="pop-ic">${icon}</div>
    <div class="pop-title">${title}</div>
    ${ok ? '' : `<div class="pop-ans">${t('answer')}: <b>${q.answer}</b></div>`}
    <div class="facts">${(q.reveal || [q.el]).map(factHtml).join('')}</div>
    ${manual ? `<button class="btn-y" id="nextq">${t('nextBtn')} <span>→</span></button>` : `<div class="pop-hint">${t('tapNext')}</div>`}
  </div>`;
  document.body.appendChild(wrap);
  G.popAt = performance.now();
  wrap.onclick = () => { if (!G.over) nextQ(); };
}

function nextQ() {
  if (!G || G.over || !G.locked) return;
  if (performance.now() - (G.popAt || 0) < 250) return;
  clearTimeout(G.to);
  const pop = $('#pop'); if (pop) pop.remove();
  G.i++;
  if (G.i >= G.questions.length) finish('done'); else renderQuestion();
}

function togglePause() {
  if (!G || G.over) return;
  G.paused = !G.paused;
  if (G.paused) {
    clearTimeout(G.to);
    document.body.insertAdjacentHTML('beforeend', `<div class="overlay" id="pause-ov"><div class="ov-card">
      <div class="ov-emoji">⏸️</div><h2>${t('paused')}</h2>
      <button class="btn-y wide" id="resume">${t('resume')}</button>
      <button class="btn-w wide" id="restart2">${t('restart')} ↻</button>
      <button class="btn-w wide" id="quit">${t('quit')}</button></div></div>`);
    $('#resume').onclick = togglePause;
    $('#restart2').onclick = () => { const r = G.replay; stopGame(); r(); };
    $('#quit').onclick = () => { const b = G.back; stopGame(); b(); };
  } else {
    $('#pause-ov').remove();
    // se pausou durante o popup no modo automático, segue para a próxima
    if (!G.fill && G.locked && G.next !== 'manual') G.to = setTimeout(nextQ, 600);
    const inp = $('#tin') || $('#fin'); if (inp && !inp.disabled) inp.focus();
  }
}

document.addEventListener('keydown', e => {
  if (!G) return;
  if (e.key === 'Escape') return togglePause();
  if (G.fill || G.paused) return;
  if (G.locked) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextQ(); }
    return;
  }
  const q = G.questions[G.i];
  if (q.mode === 'choice' && /^[1-4]$/.test(e.key)) {
    const b = $$('.choice')[+e.key - 1];
    if (b) b.click();
  }
});

function resultTitle(pct) {
  if (pct === 100) return t('rPerfect');
  if (pct >= 80) return t('rGreat');
  if (pct >= 50) return t('rGood');
  return t('rKeep');
}

function finish(reason) {
  const g = G;
  stopGame();
  const total = g.questions.length, score = g.score;
  const pct = Math.round(100 * score / total);
  const passed = reason === 'done';
  let [emoji, title, sub] = resultTitle(pct);
  if (g.challenge) {
    if (reason === 'lives') [emoji, title, sub] = t('rLives');
    else if (reason === 'time') [emoji, title, sub] = t('rTime');
    else sub = t('levelDone') + sub;
  }
  if (g.onFinish) g.onFinish({ score, total, passed, reason });
  const wrong = g.results.filter(r => !r.ok);
  app.innerHTML = `
  <section class="stage results">
    <div class="res-card">
      ${DOODLE.spark}<div class="res-emoji">${emoji}</div>
      <h1>${title}</h1><p>${sub}</p>
      <div class="res-stats">
        <div><b>${score}/${total}</b><small>${t('correct')}</small></div>
        <div><b>${pct}%</b><small>${t('score')}</small></div>
        <div><b>${fmt(g.elapsed)}</b><small>${t('tTime')}</small></div>
      </div>
      <div class="res-actions"><button class="btn-y" id="again">${t('again')}</button><button class="btn-w" id="back">${t('back')}</button></div>
    </div>
    ${wrong.length ? `<h3 class="rv-title">${t('review', wrong.length)}</h3>
      <div class="review">${wrong.map(r => `<div class="rv">${tile(r.q.el, { size: 'sm', name: false })}<div>
        <b>${r.q.el.name}</b><small>${r.q.heading}</small>
        <small>${t('answer')}: <b class="g">${r.q.answer}</b>${typeof r.given === 'string' ? ` · ${t('you')}: <span class="r">${esc(r.given)}</span>` : ''}</small>
      </div></div>`).join('')}</div>` : ''}
  </section>`;
  window.scrollTo(0, 0);
  $('#again').onclick = g.replay;
  $('#back').onclick = g.back;
}

/* ---------- Preencher a Tabela ---------- */
function startFillPractice(g, s) {
  const [from, to] = s.range.split('-').map(Number);
  startFill({ from, to, limit: +s.limit, symbols: s.symbols === 'yes', back: () => renderGamePage(g.id, 'p'), replay: () => startFillPractice(g, s) });
}
function startFillChallenge(g, li) {
  const L = FILL_LEVELS[li];
  startFill({
    from: 1, to: L.to, limit: L.limit, symbols: false, challenge: true,
    back: () => renderGamePage(g.id, 'c'), replay: () => startFillChallenge(g, li),
    onFinish: r => saveBest(g.id, `type-${li}`, r.score, r.total, r.passed),
  });
}

function startFill(cfg) {
  stopGame();
  const pool = ELEMENTS.filter(e => e.z >= cfg.from && e.z <= cfg.to);
  G = { ...cfg, fill: true, pool, found: new Set(), elapsed: 0, paused: false, last: performance.now() };
  app.innerHTML = `
  <section class="stage play wide">
    <div class="hud">
      <div class="clock"><small>${G.limit ? t('left') : t('time')}</small><b id="clock">0:00</b></div>
      <div class="bars"><div class="fill-count"><b id="fcount">0</b> ${t('ofElements', pool.length)}</div><div class="qbar"><span id="qbar"></span></div></div>
      ${hudButtons()}
    </div>
    <div class="fill-input" id="fillbar">
      <input id="fin" class="tin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${t('fillPh')}${G.symbols ? t('fillPhSym') : ''}">
      <button class="btn-w" id="giveup">${t('giveUp')}</button>
    </div>
    <div id="fillres"></div>
    <div class="board">${ptable(e => pool.includes(e) ? { cls: 'blank' } : { cls: 'off' }, { cls: 'fill-t' })}</div>
  </section>`;
  const inp = $('#fin');
  const findBy = (v, useSym) => pool.find(e => names(e).some(n => norm(n) === v) || (useSym && norm(e.sym) === v));
  inp.oninput = () => {
    const hit = findBy(norm(inp.value), false);
    if (hit && !G.found.has(hit.z)) { fillCell(hit); inp.value = ''; }
  };
  inp.onkeydown = e => {
    if (e.key !== 'Enter') return;
    const hit = findBy(norm(inp.value), G.symbols);
    if (hit && !G.found.has(hit.z)) { fillCell(hit); inp.value = ''; }
    else { inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); if (hit) toast(t('already', hit.name)); }
  };
  $('#giveup').onclick = () => finishFill('giveup');
  bindHud();
  inp.focus();
  updateHud();
  G.iv = setInterval(tick, 100);
}

function fillCell(e) {
  G.found.add(e.z);
  const c = $(`.fill-t .pc[data-z="${e.z}"]`);
  c.className = 'pc got'; c.style.setProperty('--c', CATS[e.cat].color); c.innerHTML = cellHtml(e);
  $('#fcount').textContent = G.found.size;
  updateHud();
  if (G.found.size === G.pool.length) finishFill('done');
}

function finishFill(reason) {
  const g = G;
  clearInterval(g.iv);
  g.over = true;
  const score = g.found.size, total = g.pool.length;
  const pct = Math.round(100 * score / total);
  if (g.onFinish) g.onFinish({ score, total, passed: reason === 'done' });
  for (const e of g.pool) if (!g.found.has(e.z)) {
    const c = $(`.fill-t .pc[data-z="${e.z}"]`); c.className = 'pc missing'; c.innerHTML = cellHtml(e); c.title = e.name;
  }
  let [emoji, title] = resultTitle(pct);
  if (reason === 'time') [emoji, title] = t('rTime');
  $('#fillbar').remove();
  $('#fillres').innerHTML = `<div class="res-card inline">
    <div class="res-emoji">${emoji}</div><h1>${title}</h1>
    <div class="res-stats">
      <div><b>${score}/${total}</b><small>${t('sElements')}</small></div>
      <div><b>${pct}%</b><small>${t('score')}</small></div>
      <div><b>${fmt(g.elapsed)}</b><small>${t('tTime')}</small></div>
    </div>
    ${score < total ? `<p class="hint">${t('missingHint')}</p>` : ''}
    <div class="res-actions"><button class="btn-y" id="again">${t('again')}</button><button class="btn-w" id="back">${t('back')}</button></div>
  </div>`;
  $('#again').onclick = () => { stopGame(); g.replay(); };
  $('#back').onclick = () => { stopGame(); g.back(); };
}

/* ---------- Estudar ---------- */
function renderLearn() {
  app.innerHTML = `
  <section class="learn-page">
    <h1 class="page-title">${t('learnTitle')}</h1>
    <p class="lead">${t('learnLead')}</p>
    <div class="legend">${Object.entries(CATS).map(([k, c]) => `<button class="chip" data-cat="${k}" style="--c:${c.color}">${c.name}</button>`).join('')}</div>
    <div class="detail" id="detail"></div>
    <div class="board learn">${ptable(e => ({ cls: 'cat', style: `--c:${CATS[e.cat].color}`, html: cellHtml(e, true) }), { cls: 'learn-t', phHtml: ['57-71', '89-103'] })}</div>
  </section>`;
  const show = z => {
    const e = byZ(z);
    $$('.learn-t .pc').forEach(c => c.classList.toggle('sel', +c.dataset.z === z));
    $('#detail').innerHTML = `${tile(e, { size: 'lg' })}
      <div class="d-info"><h2>${e.name}</h2>
        <div class="d-tags"><span>${t('symbol')} <b>${e.sym}</b></span><span>${t('atomicNo')} <b>${e.z}</b></span>
        <span>${t('family')} <b>${CATS[e.cat].name}</b></span><span>${t('group')} <b>${e.group || '-'}</b></span><span>${t('period')} <b>${e.period}</b></span></div>
      </div>`;
  };
  $$('.learn-t .pc[data-z]').forEach(c => c.onclick = () => show(+c.dataset.z));
  let active = null;
  $$('.chip').forEach(ch => ch.onclick = () => {
    active = active === ch.dataset.cat ? null : ch.dataset.cat;
    $$('.chip').forEach(x => x.classList.toggle('on', x.dataset.cat === active));
    $$('.learn-t .pc[data-z]').forEach(c => c.classList.toggle('faded', !!active && byZ(+c.dataset.z).cat !== active));
  });
  show(1);
}

applyLang();
route();
