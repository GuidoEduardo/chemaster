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
    questions: 'Perguntas', elements: 'Elementos', all: 'Todos', allQ: 'Todas', nElements: n => n === 1 ? '1 elemento' : `${n} elementos`,
    hTo: (a, b) => `${a} até ${b}`, customFrom: 'ou escolha: do nº', customTo: 'até o nº',
    mode: 'Modo', timer: 'Tempo por pergunta', on: 'Ligado', off: 'Desligado',
    next: 'Próxima pergunta', auto: 'Automática', manual: 'Manual', manualSub: 'Toque para seguir',
    nQuestions: n => `${n} perguntas`, byNumber: '🔢 Por número', byCategory: '🧪 Por categoria', pickCat: 'Escolha uma ou mais categorias',
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
      name: ['Contagem Inicial', 'Fila Indiana', 'Procissão Atômica', 'Maratona de Nomes', 'CheMaster da Sequência'],
      sym: ['Primeiras Siglas', 'Sigla em Sigla', 'Alfabeto Químico', 'Código Periódico', 'CheMaster das Siglas'],
      both: ['Dupla Dinâmica', 'Ficha Dupla', 'Duplo Desafio', 'Memória de Elefante', 'CheMaster Completo'],
      define: ['Aprendiz de Químico', 'Ficha Técnica', 'Raio-X Atômico', 'Enciclopédia Viva', 'CheMaster Absoluto'],
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
    topics: 'Temas', pickTopic: 'Escolha um ou mais temas', quizQ: 'Pergunta de química',
    quizLvl: ['Só as perguntas básicas. Para aquecer!', 'Básicas e médias, de todos os temas.', 'Todas as perguntas, inclusive as difíceis!'],
    quizLvlNames: ['Teoria na Ponta da Língua', 'Professor Substituto', 'Enciclopédia Química'],
    ofElements: n => `de ${n} elementos`, fillPh: 'Digite o nome de qualquer elemento', fillPhSym: ' (ou símbolo + Enter)',
    giveUp: 'Desistir', already: n => `${n} já foi! 😉`, missingHint: 'Os que faltaram estão em <span class="r">vermelho</span> na tabela.',
    learnTitle: 'Estudar a Tabela', learnLead: 'Toque em um elemento para ver os detalhes. Toque em uma categoria para destacá-la.',
    symbol: 'Símbolo', atomicNo: 'Nº atômico', category: 'Categoria', atomicNumber: 'Número atômico',
    emptyPool: 'Nenhum elemento nessa faixa para este jogo.',
    phName: 'Digite o nome do elemento', phSym: 'Digite o símbolo', phNum: 'Digite o número', phGroup: 'Digite o número do grupo',
    phPeriod: 'Digite o número do período', phFull: 'Digite o nome completo',
    qDefine: 'Defina o elemento', defSym: 'Símbolo', defZ: 'Número atômico', defZHint: 'Z = nº de prótons',
    defLoc: 'Lugar na tabela', defLocHint: '👉 Clique na casa certa na tabela', confirm: 'Confirmar',
    zoomHint: 'Arraste para mover · roda do mouse ou pinça para dar zoom',
    wName: 'Nome', wNameSub: 'Ex.: Hidrogênio', wSym: 'Símbolo', wSymSub: 'Ex.: H', wBoth: 'Símbolo + Nome', wBothSub: 'Os dois, nessa ordem',
    seqWrite: 'O que escrever', seqPh: (w, z) => `${w} do nº ${z}`, seqHint: 'Só entra a resposta certa · Pular conta como erro no final',
    seqSkipped: 'Pulados', seqListTitle: 'A lista completa', seqLegend: ['acertou', 'pulou', 'não chegou'],
    seqDesc: (n, m) => `Do 1 ao ${n} em ordem, em até ${m}.`,
    chSeq: '♾️ Sem vidas: só o relógio manda, e cada pulo conta como erro', chWinSeq: '🏆 Chegue ao fim no tempo com no máximo 10% pulados',
    fBlock: 'linha de baixo (bloco f)', pickCatOne: 'Escolha a categoria',
    partSym: 'Símbolo', partZ: 'Nº atômico', partLoc: 'Lugar', mDefine: 'Definir', mDefineSub: 'Símbolo, nº, lugar e categoria', sDefine: 'Definir',
    qWhere: 'Onde fica este elemento?', qSym: 'Qual elemento tem este símbolo?', qSymOf: 'Qual é o símbolo deste elemento?',
    qZ: 'Qual é o número atômico?', qWhoZ: z => `Qual elemento tem número atômico ${z}?`, qMystery: 'Qual é o elemento destacado?',
    qCategory: 'A qual categoria ele pertence?', qFamily: 'Em qual família ele está?',
    famNames: { 1: '1A · Metais alcalinos', 2: '2A · Metais alcalino-terrosos', 13: '3A · Família do boro', 14: '4A · Família do carbono', 15: '5A · Família do nitrogênio', 16: '6A · Calcogênios', 17: '7A · Halogênios', 18: '8A · Gases nobres' }, qLetters: 'Complete o nome do elemento', qGroup: 'Em qual grupo (coluna) ele está?',
    qPeriod: 'Em qual período (linha) ele está?', qBig: 'Qual tem o MAIOR número atômico?', qSmall: 'Qual tem o MENOR número atômico?',
    games: {
      table: ['Tabela Periódica', 'A tabela está em branco. Cadê cada elemento?', 'A tabela está vazia e o desafio é seu: ache o lugar certinho de cada elemento. Bora?'],
      sequence: ['Em Ordem', 'Do 1 em diante: quem vem agora?', 'Escreva os elementos na ordem do número atômico, um atrás do outro: o nome, o símbolo ou os dois. Só entra a resposta certa. Travou? Pode pular, mas no final o pulo aparece como erro na lista completa.'],
      define: ['Definir Elemento', 'Símbolo, número, lugar e categoria. Modo hard! 🔥', 'Aparece só o nome. Você escreve o símbolo e o número atômico (o número de prótons), marca a casa na tabela (dá para arrastar e dar zoom) e escolhe a categoria. Só vale o ponto se acertar tudo!'],
      fill: ['Preencher a Tabela', 'Escreva nomes e veja a tabela ganhar cor!', 'Digite qualquer elemento, na ordem que quiser, e veja a tabela se pintar inteira. Quantos você lembra de cabeça?'],
      symbols: ['Símbolos', 'Duas letrinhas, um elemento. Quem é?', 'Aparece o símbolo, você diz o nome. Parece fácil… até aparecerem os esquisitos!'],
      names: ['Nome → Símbolo', 'Do nome pro símbolo, sem colar!', 'Aparece o nome do elemento e você manda o símbolo. Atenção às maiúsculas!'],
      'atomic-number': ['Número Atômico', 'Quantos prótons ele tem? Chuta não!', 'Aparece o elemento, você diz o número atômico (Z). Seu cérebro vai virar uma tabela!'],
      'who-is': ['Quem é o Nº?', 'Um número aparece. Que elemento é esse?', 'Aparece um número atômico e você descobre o dono dele. Dá pra responder clicando na tabela também!'],
      mystery: ['Elemento Misterioso', 'Uma casinha acende. Quem mora ali?', 'Uma casa se ilumina na tabela vazia. Descubra qual elemento mora nesse endereço!'],
      families: ['Famílias', 'Da 1A à 8A: em qual família ele está?', 'Cada coluna da tabela é uma família, da 1A à 8A. Diga a família de cada elemento e aprenda onde cada uma fica!'],
      categories: ['Categorias', 'Cada elemento tem sua turma. Qual é?', 'Metais alcalinos, não metais, gases nobres… Coloque cada elemento na categoria certa!'],
      letters: ['Letras Sumidas', 'Umas letras fugiram. Complete o nome!', 'Algumas letras deram no pé. Escreva o nome inteiro do elemento e traga elas de volta!'],
      groups: ['Grupos', 'Em que coluna esse elemento mora?', 'Diga o grupo (coluna 1 a 18) de cada elemento. Lantanídeos e actinídeos ficam de folga.'],
      periods: ['Períodos', 'Em que andar da tabela ele está?', 'Diga o período (linha 1 a 7) de cada elemento. Sobe e desce na tabela!'],
      quiz: ['Perguntas de Química', 'Quem explode na água? Quem nunca reage? Responda!', 'Grave como cada família se comporta: quem reage com a água, quem forma sal, quem brilha no letreiro, quem enferruja… Cada resposta vem com uma explicação curtinha.'],
      duel: ['Duelo Atômico', 'Dois elementos, uma briga: quem é maior?', 'Dois elementos entram no ringue. Quem tem o maior (ou menor) número atômico vence!'],
    },
  },
  en: {
    navGames: 'Games', navStudy: 'Learn', footer: 'CheMaster · made by Guido ⚛',
    docTitle: 'CheMaster | Learn the Periodic Table',
    heroKicker: '118 elements. Zero boredom. Let’s play! ⚡', heroTitle: 'Play Chemistry. Master the Table.',
    explore: 'Explore Games', studyTable: '📖 Learn the Table', trending: 'Games',
    practice: '📗 Practice', challenge: '🔥 Challenge',
    questions: 'Questions', elements: 'Elements', all: 'All', allQ: 'All', nElements: n => n === 1 ? '1 element' : `${n} elements`,
    hTo: (a, b) => `${a} to ${b}`, customFrom: 'or choose: from no.', customTo: 'to no.',
    mode: 'Mode', timer: 'Time limit', on: 'On', off: 'Off',
    next: 'Next question', auto: 'Auto', manual: 'Manual', manualSub: 'Tap to continue',
    nQuestions: n => `${n} questions`, byNumber: '🔢 By number', byCategory: '🧪 By category', pickCat: 'Pick one or more categories',
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
      name: ['Countdown Rookie', 'Single File', 'Atomic Parade', 'Name Marathon', 'Sequence CheMaster'],
      sym: ['First Symbols', 'Symbol by Symbol', 'Chemical Alphabet', 'Periodic Code', 'Symbol CheMaster'],
      both: ['Dynamic Duo', 'Double Sheet', 'Double Trouble', 'Elephant Memory', 'Complete CheMaster'],
      define: ['Chem Apprentice', 'Spec Sheet', 'Atomic X-Ray', 'Living Encyclopedia', 'Absolute CheMaster'],
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
    topics: 'Topics', pickTopic: 'Pick one or more topics', quizQ: 'Chemistry question',
    quizLvl: ['Only the basic questions. Warm up!', 'Basic and medium, from every topic.', 'Every question, hard ones included!'],
    quizLvlNames: ['Theory Rookie', 'Substitute Teacher', 'Walking Encyclopedia'],
    ofElements: n => `of ${n} elements`, fillPh: 'Type the name of any element', fillPhSym: ' (or symbol + Enter)',
    giveUp: 'Give up', already: n => `${n} is already done! 😉`, missingHint: 'The ones you missed are in <span class="r">red</span> on the table.',
    learnTitle: 'Learn the Table', learnLead: 'Tap an element to see its details. Tap a category to highlight it.',
    symbol: 'Symbol', atomicNo: 'Atomic no.', category: 'Category', atomicNumber: 'Atomic number',
    emptyPool: 'No elements in that range for this game.',
    phName: 'Type the element name', phSym: 'Type the symbol', phNum: 'Type the number', phGroup: 'Type the group number',
    phPeriod: 'Type the period number', phFull: 'Type the full name',
    qDefine: 'Define the element', defSym: 'Symbol', defZ: 'Atomic number', defZHint: 'Z = number of protons',
    defLoc: 'Spot on the table', defLocHint: '👉 Tap the right square on the table', confirm: 'Confirm',
    zoomHint: 'Drag to move · mouse wheel or pinch to zoom',
    wName: 'Name', wNameSub: 'e.g. Hydrogen', wSym: 'Symbol', wSymSub: 'e.g. H', wBoth: 'Symbol + Name', wBothSub: 'Both, in that order',
    seqWrite: 'What to type', seqPh: (w, z) => `${w} of no. ${z}`, seqHint: 'Only the right answer goes in · Skips count as mistakes at the end',
    seqSkipped: 'Skipped', seqListTitle: 'The full list', seqLegend: ['correct', 'skipped', 'not reached'],
    seqDesc: (n, m) => `From 1 to ${n} in order, within ${m}.`,
    chSeq: '♾️ No lives: only the clock rules, and every skip counts as a mistake', chWinSeq: '🏆 Reach the end in time with at most 10% skipped',
    fBlock: 'bottom row (f-block)', pickCatOne: 'Pick the category',
    partSym: 'Symbol', partZ: 'Atomic no.', partLoc: 'Spot', mDefine: 'Define', mDefineSub: 'Symbol, number, spot & category', sDefine: 'Define',
    qWhere: 'Where is this element?', qSym: 'Which element has this symbol?', qSymOf: "What is this element's symbol?",
    qZ: 'What is the atomic number?', qWhoZ: z => `Which element has atomic number ${z}?`, qMystery: 'Which element is highlighted?',
    qCategory: 'Which category does it belong to?', qFamily: 'Which family is it in?',
    famNames: { 1: 'Group 1 · Alkali metals', 2: 'Group 2 · Alkaline earth metals', 13: 'Group 13 · Boron group', 14: 'Group 14 · Carbon group', 15: 'Group 15 · Nitrogen group', 16: 'Group 16 · Chalcogens', 17: 'Group 17 · Halogens', 18: 'Group 18 · Noble gases' }, qLetters: 'Complete the element name', qGroup: 'Which group (column) is it in?',
    qPeriod: 'Which period (row) is it in?', qBig: 'Which has the HIGHER atomic number?', qSmall: 'Which has the LOWER atomic number?',
    games: {
      table: ['Periodic Table', 'The table is blank. Where does each one go?', 'The table is empty and it is all on you: drop every element in its exact spot. Ready?'],
      sequence: ['In Order', 'From 1 onward: who comes next?', 'Type the elements in atomic number order, one after another: the name, the symbol or both. Only the right answer goes in. Stuck? You can skip, but skips show up as mistakes in the full list at the end.'],
      define: ['Define the Element', 'Symbol, number, spot and category. Hard mode! 🔥', 'Only the name shows up. Type the symbol and the atomic number (the number of protons), mark its square on a table you can drag and zoom, and pick its category. You only score if everything is right!'],
      fill: ['Fill the Table', 'Type names and watch the table light up!', 'Type any element, in any order, and watch the whole table fill with color. How many can you recall?'],
      symbols: ['Symbols', 'Two little letters, one element. Who is it?', 'A symbol pops up, you name the element. Easy… until the weird ones show up!'],
      names: ['Name → Symbol', 'From name to symbol, no peeking!', 'An element name shows up and you fire back its symbol. Mind the capital letters!'],
      'atomic-number': ['Atomic Number', 'How many protons? No guessing!', 'An element shows up, you give its atomic number (Z). Your brain is about to become a table!'],
      'who-is': ['Who is No.?', 'A number appears. Which element owns it?', 'An atomic number pops up and you find its owner. You can even answer by tapping the table!'],
      mystery: ['Mystery Element', 'A square lights up. Who lives there?', 'One square glows on the blank table. Figure out which element lives at that address!'],
      families: ['Families', 'Group 1 to 18: which family is it in?', 'Each column of the table is a family, from group 1 to 18. Name the family of each element and learn where each one sits!'],
      categories: ['Categories', 'Every element has a crew. Which one?', 'Alkali metals, nonmetals, noble gases… Send each element home to the right category!'],
      letters: ['Runaway Letters', 'Some letters ran off. Bring them back!', 'A few letters escaped from the name. Type the full element name and catch them!'],
      groups: ['Groups', 'Which column does it live in?', 'Name the group (column 1 to 18) of each element. Lanthanides and actinides get the day off.'],
      periods: ['Periods', 'Which floor of the table is it on?', 'Name the period (row 1 to 7) of each element. Up and down the table!'],
      quiz: ['Chemistry Questions', 'Who explodes in water? Who never reacts? Answer!', 'Learn how each family behaves: who reacts with water, who forms salts, who glows in signs, who rusts… Every answer comes with a short explanation.'],
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
// a janela de valores é sorteada em volta da resposta, assim a certa não fica sempre "no meio"
function numOpts(ans, min, max, f = String) {
  const W = Math.min(9, max - min + 1);
  const lo = Math.max(min, ans - W + 1), hi = Math.min(ans, max - W + 1);
  const start = lo + rand(hi - lo + 1);
  const others = [];
  for (let v = start; v < start + W; v++) if (v !== ans) others.push(v);
  return shuffle([ans, ...shuffle(others).slice(0, 3)]).map(f);
}
function zOpts(z, pool) {
  const zs = pool.map(e => e.z), lo = Math.min(...zs), hi = Math.max(...zs);
  return hi - lo >= 3 ? numOpts(z, lo, hi) : numOpts(z, 1, 118);
}
function valueOpts(ans, values, f, fallback) {
  const others = [...new Set(values)].filter(v => v !== ans);
  if (others.length < 3) return fallback();
  return shuffle([ans, ...shuffle(others).slice(0, 3)]).map(f);
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
  name:   { label: () => t('wName'), sub: () => t('wNameSub'), icon: '🔤', short: () => t('wName') },
  sym:    { label: () => t('wSym'),  sub: () => t('wSymSub'),  icon: '🅰️', short: () => t('wSym') },
  both:   { label: () => t('wBoth'), sub: () => t('wBothSub'), icon: '🧩', short: () => t('wBoth') },
  define: { label: () => t('mDefine'), sub: () => t('mDefineSub'), icon: '🧾', short: () => t('sDefine') },
};

const FAMILY_GROUPS = [1, 2, 13, 14, 15, 16, 17, 18];

const GAMES = [
  {
    id: 'table', modes: ['click'],
    bg: '#1ccaf7', thumb: () => mini(e => e.z === 26 || e.z === 79 ? 'hl-red' : ''),
    make: el => ({ heading: t('qWhere'), visual: nameCard(el.name), answer: el.name }),
  },
  {
    id: 'define', modes: ['define'], qTimer: 45, limitMul: 2.5,
    bg: '#14304a', thumb: () => `<div class="t-def"><b>${byZ(26).name}</b><span>Fe · 26</span></div>`,
    // Categoria: só pergunta se as questões tiverem mais de uma categoria
    // (no Treino "por categoria" com uma só, a resposta seria óbvia)
    make: (el, pool) => {
      const cats = CAT_KEYS.filter(k => pool.some(e => e.cat === k));
      const ask = cats.length > 1;
      return {
        heading: t('qDefine'), catOpts: ask ? cats : null,
        answer: `${el.sym} · ${el.z}${ask ? ` · ${CATS[el.cat].name}` : ''}`,
      };
    },
  },
  {
    id: 'sequence', kind: 'seq', modes: ['name', 'sym', 'both'], noCategory: true,
    bg: '#ffd84d', thumb: () => `<div class="t-seq"><span>43</span><b>44</b><span>45</span></div>`,
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
      answer: el.sym, accept: [el.sym], exact: el.sym, placeholder: t('phSym'),
      options: mode === 'choice' && elOpts(el, pool, e => e.sym),
    }),
  },
  {
    id: 'atomic-number', modes: ['choice', 'type'],
    bg: 'linear-gradient(135deg,#5ee0a0,#1fae6b)', thumb: () => `<div class="t-tile"><small>?</small>O</div>`,
    make: (el, pool) => ({
      heading: t('qZ'), visual: bigTile(el, { z: true, hideZ: true }),
      answer: String(el.z), accept: [String(el.z)], placeholder: t('phNum'),
      options: zOpts(el.z, pool), inputmode: 'numeric',
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
    // só elementos que pertencem a uma família (o H fica de fora: não tem família)
    id: 'families', modes: ['choice'], noCategory: true, filter: e => FAMILY_GROUPS.includes(e.group) && e.z !== 1,
    bg: 'linear-gradient(135deg,#ffe46b,#ffb238)',
    thumb: () => mini(e => FAMILY_GROUPS.includes(e.group) && e.z !== 1 ? 'hl' : ''),
    make: (el, pool) => {
      const ans = t('famNames')[el.group];
      const options = valueOpts(el.group, pool.map(e => e.group), g => t('famNames')[g],
        () => shuffle([ans, ...shuffle(FAMILY_GROUPS.filter(g => g !== el.group)).slice(0, 3).map(g => t('famNames')[g])]));
      return { heading: t('qFamily'), visual: bigTile(el), answer: ans, options };
    },
  },
  {
    id: 'categories', modes: ['choice'], noCategory: true,
    bg: 'linear-gradient(135deg,#ff9ec4,#e8579a)',
    thumb: () => `<div class="t-grid">${[11, 17, 10, 26].map(z => `<div class="t-mini" style="background:${CATS[byZ(z).cat].color}">${byZ(z).sym}</div>`).join('')}</div>`,
    make: (el, pool) => {
      const ans = CATS[el.cat].name;
      const options = valueOpts(el.cat, pool.map(e => e.cat), k => CATS[k].name,
        () => shuffle([ans, ...shuffle(Object.values(CATS).map(c => c.name).filter(n => n !== ans)).slice(0, 3)]));
      return { heading: t('qCategory'), visual: bigTile(el), answer: ans, options };
    },
  },
  {
    id: 'letters', modes: ['type'],
    bg: '#1ccaf7',
    thumb: () => `<div class="letters t-letters">${(LANG === 'en' ? ['I', '', 'O', ''] : ['F', '', 'R', 'R', '']).map(c => `<span class="${c ? '' : 'hole'}">${c}</span>`).join('')}</div>`,
    make: el => ({ heading: t('qLetters'), visual: letters(el.name), answer: el.name, accept: names(el), placeholder: t('phFull') }),
  },
  {
    id: 'groups', modes: ['choice', 'type'], noCategory: true, filter: e => e.group,
    bg: 'linear-gradient(135deg,#43d9c6,#139e8f)', thumb: () => mini(e => e.group === 17 ? 'hl' : ''),
    make: (el, pool) => ({
      heading: t('qGroup'), visual: bigTile(el),
      answer: `${t('group')} ${el.group}`, accept: [String(el.group), 'grupo' + el.group, 'group' + el.group], placeholder: t('phGroup'),
      options: valueOpts(el.group, pool.map(e => e.group), n => `${t('group')} ${n}`, () => numOpts(el.group, 1, 18, n => `${t('group')} ${n}`)), inputmode: 'numeric',
    }),
  },
  {
    id: 'periods', modes: ['choice', 'type'], hideCats: ['la', 'ac'],
    bg: 'linear-gradient(135deg,#c3b1ff,#8a6cf0)', thumb: () => mini(e => e.row === 4 ? 'hl' : ''),
    make: (el, pool) => ({
      heading: t('qPeriod'), visual: bigTile(el),
      answer: `${t('period')} ${el.period}`, accept: [String(el.period), 'periodo' + el.period, 'period' + el.period], placeholder: t('phPeriod'),
      options: valueOpts(el.period, pool.map(e => e.period), n => `${t('period')} ${n}`, () => numOpts(el.period, 1, 7, n => `${t('period')} ${n}`)), inputmode: 'numeric',
    }),
  },
  {
    id: 'quiz', kind: 'quiz', modes: ['choice'],
    bg: 'linear-gradient(135deg,#ffe46b,#ff9ec4)',
    thumb: () => `<div class="t-card t-quiz">${LANG === 'en' ? 'Na + H₂O = 💥?' : 'Na + H₂O = 💥?'}</div>`,
    make: item => {
      const L = item[LANG] || item.pt, topic = QUIZ_TOPICS[item.topic];
      return {
        heading: L.q, answer: L.a, options: shuffle([L.a, ...L.wrong]), note: L.note,
        visual: `<div class="quiz-topic">${topic.icon} ${topic[LANG] || topic.pt}</div>`,
        el: item.z ? byZ(item.z) : null, reveal: item.z ? [byZ(item.z)] : [], quiz: true,
      };
    },
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
const SEQ_LEVELS = [
  { ...LEVELS[0], to: 20, limit: 150 },
  { ...LEVELS[1], to: 36, limit: 300 },
  { ...LEVELS[2], to: 54, limit: 480 },
  { ...LEVELS[3], to: 86, limit: 780 },
  { ...LEVELS[4], to: 118, limit: 1080 },
];
const seqLimit = (L, mode) => Math.round(L.limit * (mode === 'both' ? 1.7 : 1));
const FILL_LEVELS = [
  { ...LEVELS[0], to: 20, limit: 180 },
  { ...LEVELS[1], to: 36, limit: 420 },
  { ...LEVELS[2], to: 54, limit: 660 },
  { ...LEVELS[3], to: 86, limit: 900 },
  { ...LEVELS[4], to: 118, limit: 900 },
];

const QUIZ_LEVELS = [
  { ...LEVELS[0], d: 1, count: 15, limit: 240 },
  { ...LEVELS[1], d: 2, count: 30, limit: 480 },
  { ...LEVELS[2], d: 3, count: 50, limit: 780 },
];
const quizPool = (topics, d = 3) => QUIZ.filter(x => x.d <= d && (!topics || topics.includes(x.topic)));
const topicCount = k => QUIZ.filter(x => x.topic === k).length;

function poolOf(g, from, to) {
  return ELEMENTS.filter(e => e.z >= from && e.z <= to && (!g.filter || g.filter(e)));
}

function buildQ(g, el, pool, mode) {
  const q = g.make(el, pool, mode);
  if (g.kind !== 'quiz') q.el = q.el || el; q.mode = mode; q.game = g;
  if (q.accept) q.accept = q.accept.map(norm);
  if (mode === 'click' || mode === 'define') q.target = q.el.z;
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
const ICONS = { table: '📍', define: '🧾', sequence: '🔢', fill: '✍️', symbols: 'Au', names: 'Na', 'atomic-number': 'Z', 'who-is': '#', mystery: '?', families: '🧬', categories: '🎨', letters: 'A_', groups: '↕', periods: '↔', quiz: '💡', duel: '⚖️' };

/* ---------- roteamento ---------- */
let G = null; // jogo em andamento

function stopGame() {
  if (G) { clearInterval(G.iv); clearTimeout(G.to); if (G.abort) G.abort.abort(); }
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
// categorias da tabela (as mesmas cores da página Estudar), na ordem das cores da legenda
const CAT_KEYS = Object.keys(CATS);
const gameOk = (g, e) => !g.filter || g.filter(e);
const catCount = (g, k) => (g.hideCats || []).includes(k) ? 0 : ELEMENTS.filter(e => e.cat === k && gameOk(g, e)).length;

// elementos do treino: por faixa de número ou pelas categorias escolhidas
function practicePool(g, s) {
  if (g.kind === 'quiz') return quizPool(s.topics);
  if (s.by === 'category') return ELEMENTS.filter(e => s.cats.includes(e.cat) && gameOk(g, e));
  const [a, b] = s.range.split('-').map(Number);
  return poolOf(g, a, b);
}

function defaultSettings(g) {
  if (g.kind === 'seq') return { by: 'range', range: '1-20', cats: ['am'], mode: 'name', limit: '0' };
  return g.kind === 'fill'
    ? { by: 'range', range: '1-118', cats: ['am'], limit: '900', symbols: 'no' }
    : { by: 'range', range: '1-118', cats: ['am'], count: '10', mode: g.modes[0], timer: '0', next: 'auto' };
}
function getSettings(g) {
  const saved = (store.get().settings || {})[g.id] || {};
  const s = { ...defaultSettings(g), ...saved };
  if (g.kind === 'quiz') {
    s.mode = 'choice';
    s.topics = (Array.isArray(s.topics) ? s.topics : []).filter(k => QUIZ_TOPICS[k]);
    if (!s.topics.length) s.topics = Object.keys(QUIZ_TOPICS);
    s.count = fitCount(g, s);
    return s;
  }
  if (s.mode && !g.modes.includes(s.mode)) s.mode = g.modes[0];
  if (!['1-20', '1-36', '1-54', '1-118'].includes(s.range)) s.range = '1-118';
  if (s.by !== 'category' || g.noCategory) s.by = 'range';
  // só categorias que existem neste jogo (ex.: Grupos não tem lantanídeos)
  s.cats = (Array.isArray(s.cats) ? s.cats : []).filter(k => CATS[k] && catCount(g, k) > 0);
  if (!s.cats.length) s.cats = ['am'];
  delete s.fams;
  if (g.kind !== 'fill' && g.kind !== 'seq') s.count = fitCount(g, s);
  return s;
}
function saveSettings(g, s) {
  const d = store.get(); d.settings = d.settings || {};
  if (s) d.settings[g.id] = s; else delete d.settings[g.id];
  store.set(d);
}

function optGroup(label, key, cur, opts) {
  return `<div class="og">${label ? `<div class="og-label">${label}</div>` : ''}<div class="opts">
    ${opts.map(o => `<button class="opt ${String(cur) === String(o.v) ? 'on' : ''}" data-k="${key}" data-v="${o.v}">${o.label}${o.sub ? `<small>${o.sub}</small>` : ''}</button>`).join('')}
  </div></div>`;
}

function topicsGroup(s) {
  return `<div class="og"><div class="og-label">${t('topics')}</div>
    <div class="fam-hint">${t('pickTopic')}</div>
    <div class="fam-grid">${Object.entries(QUIZ_TOPICS).map(([k, tp]) => `<button class="opt fam ${s.topics.includes(k) ? 'on' : ''}" data-topic="${k}"><span class="cat-name">${tp.icon} ${tp[LANG] || tp.pt}</span><small>${t('nQuestions', topicCount(k))}</small></button>`).join('')}</div></div>`;
}

function elementsGroup(s, g) {
  const by = `<div class="by-switch">
    <button class="by-btn ${s.by === 'range' ? 'on' : ''}" data-by="range">${t('byNumber')}</button>
    <button class="by-btn ${s.by === 'category' ? 'on' : ''}" data-by="category">${t('byCategory')}</button></div>`;
  if (g.noCategory) return rangeGroup(s, g);
  if (s.by !== 'category') return `<div class="og-head"><div class="og-label">${t('elements')}</div>${by}</div>` + rangeGroup(s, g, true);
  const cats = CAT_KEYS.filter(k => catCount(g, k) > 0);
  return `<div class="og"><div class="og-head"><div class="og-label">${t('elements')}</div>${by}</div>
    <div class="fam-hint">${t('pickCat')}</div>
    <div class="fam-grid">${cats.map(k => `<button class="opt fam ${s.cats.includes(k) ? 'on' : ''}" data-cat="${k}"><span class="cat-name"><i class="cat-dot" style="--c:${CATS[k].color}"></i>${CATS[k].name}</span><small>${t('nElements', catCount(g, k))}</small></button>`).join('')}</div></div>`;
}

function rangeGroup(s, g, noLabel = false) {
  return optGroup(noLabel ? '' : t('elements'), 'range', s.range, [
    { v: '1-20', label: '1 → 20', sub: t('nElements', g ? poolSize(g, '1-20') : 20) },
    { v: '1-36', label: '1 → 36', sub: t('nElements', g ? poolSize(g, '1-36') : 36) },
    { v: '1-54', label: '1 → 54', sub: t('nElements', g ? poolSize(g, '1-54') : 54) },
    { v: '1-118', label: t('all'), sub: t('nElements', g ? poolSize(g, '1-118') : 118) },
  ]);
}

const poolSize = (g, range) => { const [a, b] = range.split('-').map(Number); return poolOf(g, a, b).length; };
const countOpts = (g, s) => [10, 20, 30, 50].filter(n => n < practicePool(g, s).length);
// se a quantidade escolhida não cabe na faixa nova, vira "Todas"
function fitCount(g, s) {
  if (s.count === 'all') return 'all';
  return countOpts(g, s).includes(+s.count) ? String(s.count) : 'all';
}
function countGroup(g, s) {
  const size = practicePool(g, s).length;
  return optGroup(t('questions'), 'count', s.count, [
    ...countOpts(g, s).map(n => ({ v: String(n), label: String(n) })),
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
  if (g.kind === 'seq') {
    h += rangeGroup(s, g);
    h += optGroup(t('seqWrite'), 'mode', s.mode, g.modes.map(m => ({ v: m, label: `${MODES[m].icon} ${MODES[m].label()}`, sub: MODES[m].sub() })));
    h += optGroup(t('totalTime'), 'limit', s.limit, [
      { v: '300', label: '5 min' }, { v: '600', label: '10 min' }, { v: '900', label: '15 min' }, { v: '0', label: t('noLimit') },
    ]);
  } else if (g.kind === 'fill') {
    h += elementsGroup(s, g);
    h += optGroup(t('totalTime'), 'limit', s.limit, [
      { v: '300', label: '5 min' }, { v: '600', label: '10 min' }, { v: '900', label: '15 min' }, { v: '0', label: t('noLimit') },
    ]);
    h += optGroup(t('acceptSym'), 'symbols', s.symbols, [
      { v: 'no', label: t('onlyNames'), sub: t('exName') }, { v: 'yes', label: t('namesSyms'), sub: t('symEnter') },
    ]);
  } else {
    h += g.kind === 'quiz' ? topicsGroup(s) : elementsGroup(s, g);
    h += countGroup(g, s);
    if (g.modes.length > 1) h += optGroup(t('mode'), 'mode', s.mode, g.modes.map(m => ({ v: m, label: `${MODES[m].icon} ${MODES[m].label()}`, sub: MODES[m].sub() })));
    h += `<div class="og-row">
      ${optGroup(t('timer'), 'timer', s.timer, [{ v: '15', label: t('on'), sub: (g.qTimer || 15) + 's' }, { v: '0', label: t('off') }])}
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

  const changed = () => { if (g.kind !== 'fill' && g.kind !== 'seq') s.count = fitCount(g, s); saveSettings(g, s); renderPractice(g); };
  $$('.opt[data-k]', panel).forEach(b => b.onclick = () => { s[b.dataset.k] = b.dataset.v; changed(); });
  $$('.by-btn', panel).forEach(b => b.onclick = () => { s.by = b.dataset.by; changed(); });
  $$('.opt[data-cat]', panel).forEach(b => b.onclick = () => {
    const k = b.dataset.cat;
    if (s.cats.includes(k)) { if (s.cats.length > 1) s.cats = s.cats.filter(x => x !== k); }
    else s.cats = [...s.cats, k];
    changed();
  });
  $$('.opt[data-topic]', panel).forEach(b => b.onclick = () => {
    const k = b.dataset.topic;
    if (s.topics.includes(k)) { if (s.topics.length > 1) s.topics = s.topics.filter(x => x !== k); }
    else s.topics = [...s.topics, k];
    changed();
  });
  $('#resetSet').onclick = () => { saveSettings(g, null); renderPractice(g); };
  $('#goChallenge').onclick = () => renderGamePage(g.id, 'c');
  $('#start').onclick = () => g.kind === 'fill' ? startFillPractice(g, s) : g.kind === 'seq' ? startSeqPractice(g, s) : startPractice(g, s);
}

function renderChallenge(g) {
  const best = (store.get().best || {})[g.id] || {};
  const fill = g.kind === 'fill';
  const modes = fill ? ['type'] : g.modes;
  const quiz = g.kind === 'quiz', seq = g.kind === 'seq';
  const levels = fill ? FILL_LEVELS : quiz ? QUIZ_LEVELS : seq ? SEQ_LEVELS : LEVELS;
  const label = m => MODES[m].label();
  const limited = seq ? [] : modes.filter(m => m !== 'type');
  const rules = [t('chTime')];
  if (limited.length) rules.push(t('chLives', limited.map(label).join(' / ')));
  if (modes.includes('type')) rules.push(t('chInf', label('type')));
  if (seq) rules.push(t('chSeq'));
  rules.push(t(fill ? 'chWinFill' : seq ? 'chWinSeq' : 'chWin'));

  let h = `<div class="ch-rules"><div class="ch-title">${t('chRulesTitle')}</div>
    <div class="ch-list">${rules.map(r => `<span>${r}</span>`).join('')}</div></div>`;
  for (const mode of modes) {
    const inf = mode === 'type' || seq;
    h += `<div class="mode-head"><span class="mode-ic">${MODES[mode].icon}</span><b>${label(mode)}</b>
      <span class="mode-lives ${inf ? 'inf' : ''}">${inf ? '♾️ ' + t('livesInf') : '❤️ ' + t('lives3')}</span></div>`;
    // jogos com poucos elementos (ex.: Famílias) podem ter dois níveis com as mesmas perguntas: fica só o primeiro
    const sizes = levels.map(L => fill || seq ? L.to : Math.min(L.count, quiz ? quizPool(null, L.d).length : poolOf(g, 1, L.to).length));
    h += levels.map((L, i) => {
      if (i > 0 && sizes[i] === sizes[i - 1]) return '';
      const key = `${mode}-${i}`;
      const mins = Math.round((seq ? seqLimit(L, mode) : L.limit * (g.limitMul || 1)) / 60) + ' min';
      const n = sizes[i];
      const desc = fill ? t('fillDesc', L.to, Math.round(L.limit / 60)) : seq ? t('seqDesc', L.to, mins) : quiz ? t('quizLvl')[i] : t('lvlDesc', n, L.to);
      const info = [
        fill || seq ? ['🧪', n, t('sElements')] : ['📋', n, t('sQuestions')],
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
          <h3>${quiz ? t('quizLvlNames')[i] : t('lvlNames')[mode][i]}</h3><p>${desc}</p>
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
    : seq ? startSeqChallenge(g, +btn.dataset.lvl, btn.dataset.mode)
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
  const pool = practicePool(g, s);
  if (!pool.length) return toast(t('emptyPool'));
  const list = shuffle(pool).slice(0, s.count === 'all' ? pool.length : Math.min(+s.count, pool.length));
  startGame({
    questions: list.map(el => buildQ(g, el, pool, s.mode)),
    timer: +s.timer ? (g.qTimer || +s.timer) : 0, next: s.next, lives: 0, limit: 0,
    back: () => renderGamePage(g.id, 'p'), replay: () => startPractice(g, s),
  });
}

function startChallenge(g, li, mode) {
  const quiz = g.kind === 'quiz';
  const L = (quiz ? QUIZ_LEVELS : LEVELS)[li];
  const pool = quiz ? quizPool(null, L.d) : poolOf(g, 1, L.to);
  const list = shuffle(pool).slice(0, Math.min(L.count, pool.length));
  const lives = mode === 'type' ? 0 : 3; // digitar: vidas infinitas
  startGame({
    questions: list.map(el => buildQ(g, el, pool, mode)),
    timer: 0, next: 'auto', lives, maxLives: lives, limit: L.limit * (g.limitMul || 1), challenge: true,
    back: () => renderGamePage(g.id, 'c'), replay: () => startChallenge(g, li, mode),
    onFinish: r => saveBest(g.id, `${mode}-${li}`, r.score, r.total, r.passed),
  });
}

/* ---------- tabela com zoom e arraste (jogo Definir) ---------- */
function setupZoom(box, inner, onPick) {
  let s = 1, x = 0, y = 0, fit = 1, moved = false, last = null, pinch = 0;
  const pts = new Map();
  const iw = () => inner.offsetWidth, ih = () => inner.offsetHeight;
  const clamp = () => {
    const bw = box.clientWidth, bh = box.clientHeight, w = iw() * s, h = ih() * s, m = 60;
    x = Math.min(Math.max(x, Math.min(0, bw - w) - m), Math.max(0, bw - w) + m);
    y = Math.min(Math.max(y, Math.min(0, bh - h) - m), Math.max(0, bh - h) + m);
  };
  const apply = () => { clamp(); inner.style.transform = `translate(${x}px,${y}px) scale(${s})`; };
  const reset = () => {
    fit = Math.min(box.clientWidth / iw(), box.clientHeight / ih());
    s = fit; x = (box.clientWidth - iw() * s) / 2; y = (box.clientHeight - ih() * s) / 2; apply();
  };
  const zoomAt = (k, cx, cy) => {
    const ns = Math.min(Math.max(s * k, fit * 0.9), Math.max(fit * 5, 2.5));
    x = cx - (cx - x) * ns / s; y = cy - (cy - y) * ns / s; s = ns; apply();
  };
  const local = e => { const r = box.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  box.addEventListener('wheel', e => { e.preventDefault(); const [cx, cy] = local(e); zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, cx, cy); }, { passive: false });
  box.addEventListener('pointerdown', e => {
    box.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, local(e));
    if (pts.size === 1) { moved = false; last = local(e); }
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = Math.hypot(a[0] - b[0], a[1] - b[1]); moved = true; }
  });
  box.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    const p = local(e); pts.set(e.pointerId, p);
    if (pts.size === 1) {
      const dx = p[0] - last[0], dy = p[1] - last[1];
      if (!moved && Math.hypot(dx, dy) < 5) return;
      moved = true; box.classList.add('dragging');
      x += dx; y += dy; last = p; apply();
    } else if (pts.size === 2) {
      const [a, b] = [...pts.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (pinch) zoomAt(d / pinch, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
      pinch = d;
    }
  });
  const up = e => {
    if (!pts.has(e.pointerId)) return;
    pts.delete(e.pointerId);
    if (pts.size === 1) { last = [...pts.values()][0]; pinch = 0; }
    if (pts.size === 0) {
      box.classList.remove('dragging');
      if (!moved && e.type === 'pointerup') {
        const c = document.elementFromPoint(e.clientX, e.clientY);
        const cell = c && c.closest('.pc[data-z]');
        if (cell) onPick(+cell.dataset.z);
      }
    }
  };
  box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
  box.addEventListener('dblclick', e => { const [cx, cy] = local(e); zoomAt(1.8, cx, cy); });
  box.parentElement.querySelectorAll('[data-zm]').forEach(b => b.onclick = () => {
    const cx = box.clientWidth / 2, cy = box.clientHeight / 2;
    if (b.dataset.zm === 'fit') reset(); else zoomAt(b.dataset.zm === 'in' ? 1.35 : 1 / 1.35, cx, cy);
  });
  requestAnimationFrame(reset);
  return {
    focus(el) {
      const r = el.getBoundingClientRect(), ir = inner.getBoundingClientRect();
      const cx = (r.left - ir.left + r.width / 2) / s, cy = (r.top - ir.top + r.height / 2) / s;
      if (s < fit * 1.6) s = fit * 1.6;
      x = box.clientWidth / 2 - cx * s; y = box.clientHeight / 2 - cy * s;
      inner.style.transition = 'transform .35s'; apply(); setTimeout(() => inner.style.transition = '', 400);
    },
  };
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
  <section class="stage play ${G.questions[0] && G.questions[0].mode === 'define' ? 'wide' : ''}">
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
  // Definir: o relógio para enquanto você confere a resposta
  if (G.locked && !G.fill && G.questions[G.i] && G.questions[G.i].mode === 'define') return;
  G.elapsed += dt;
  if (G.fill || G.seq) {
    if (G.limit && G.elapsed >= G.limit) return G.seq ? finishSeq('time') : finishFill('time');
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
  else if (G.seq) bar.style.width = (G.limit ? 100 * (1 - G.elapsed / G.limit) : 100 * G.idx / G.pool.length) + '%';
  else if (G.timer) bar.style.width = Math.max(0, 100 * (1 - G.qTime / G.timer)) + '%';
  else if (G.limit) bar.style.width = Math.max(0, 100 * (1 - G.elapsed / G.limit)) + '%';
  else bar.style.width = (100 * G.i / G.questions.length) + '%';
  const lv = $('#lives');
  if (lv) lv.innerHTML = '<span>❤️</span>'.repeat(G.lives) + '<span class="lost">🤍</span>'.repeat(G.maxLives - G.lives);
}

const skipBtn = () => `<button class="skip-btn" id="skip">${t('skip')} ⏭</button>`;

function renderQuestion() {
  const q = G.questions[G.i];
  G.qTime = 0; G.locked = false; G.pick = null;
  if (G.abort) { G.abort.abort(); G.abort = null; }
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
    inp.oninput = () => { if (typedOk(q, inp.value)) answer(inp.value); };
    inp.onkeydown = e => { if (e.key === 'Enter' && inp.value.trim()) answer(inp.value); };
    inp.focus();
  } else if (q.mode === 'define') {
    ans.innerHTML = `<div class="def">
      <div class="def-form">
        <div class="def-name">${q.el.name}</div>
        <label class="def-f"><span>${t('defSym')}</span><input id="dsym" class="tin" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="3" placeholder="?"></label>
        <label class="def-f"><span>${t('defZ')} <small>${t('defZHint')}</small></span><input id="dz" class="tin" inputmode="numeric" autocomplete="off" maxlength="3" placeholder="?"></label>
        <div class="def-f"><span>${t('defLoc')}</span><div class="def-loc" id="dloc">${t('defLocHint')}</div></div>
        ${q.catOpts ? `<div class="def-f"><span>${t('category')}</span>
          <div class="csel" id="csel">
            <button type="button" class="csel-btn" id="cselBtn"><i class="cat-dot"></i><span id="cselTxt">${t('pickCatOne')}</span><b class="csel-arr">▾</b></button>
            <div class="csel-list" id="cselList" hidden>${q.catOpts.map(k => `<button type="button" class="csel-opt" data-cat="${k}" style="--c:${CATS[k].color}"><i class="cat-dot"></i>${CATS[k].name}</button>`).join('')}</div>
            <div class="csel-right" id="cselRight" hidden></div>
          </div></div>` : ''}
        <div class="def-btns"><button class="btn-y" id="dok">${t('confirm')} <span>→</span></button>${skipBtn()}</div>
      </div>
      <div class="zwrap">
        <div class="zoombox" id="zbox"><div class="zoomin" id="zin">${ptable(e => G.marked.has(e.z) ? { cls: G.marked.get(e.z), style: `--c:${CATS[e.cat].color}`, html: cellHtml(e) } : { cls: 'blank' }, { cls: 'click-t def-t' })}</div></div>
        <div class="zctl"><button data-zm="in" title="Zoom +">+</button><button data-zm="out" title="Zoom −">−</button><button data-zm="fit" title="↺">⤢</button></div>
        <div class="zhint">${t('zoomHint')}</div>
      </div>
    </div>`;
    G.zoom = setupZoom($('#zbox'), $('#zin'), z => {
      if (G.locked) return;
      const prev = $('.def-t .pc.pick'); if (prev) { prev.classList.remove('pick'); prev.classList.add('blank'); }
      const c = $(`.def-t .pc[data-z="${z}"]`);
      if (!c || !c.classList.contains('blank')) { G.pick = null; return; }
      c.classList.remove('blank'); c.classList.add('pick');
      G.pick = z;
      const e = byZ(z);
      $('#dloc').innerHTML = `📍 <b>${t('period')} ${e.period}${e.group ? ` · ${t('group')} ${e.group}` : ` · ${t('fBlock')}`}</b>`;
      $('#dloc').classList.add('on');
    });
    G.cat = null;
    if (q.catOpts) {
      const btn = $('#cselBtn'), list = $('#cselList');
      const open = on => { list.hidden = !on; btn.classList.toggle('open', on); if (on) { const cur = $('.csel-opt.on', list) || $('.csel-opt', list); cur.focus(); } };
      btn.onclick = e => { e.stopPropagation(); if (!G.locked) open(list.hidden); };
      $$('.csel-opt', list).forEach(o => {
        o.onclick = e => {
          e.stopPropagation();
          G.cat = o.dataset.cat;
          $$('.csel-opt', list).forEach(x => x.classList.toggle('on', x === o));
          btn.classList.add('chosen'); btn.style.setProperty('--c', CATS[G.cat].color);
          $('#cselTxt').textContent = CATS[G.cat].name;
          open(false); btn.focus();
        };
        o.onkeydown = e => {
          const all = $$('.csel-opt', list), i = all.indexOf(o);
          if (e.key === 'ArrowDown') { e.preventDefault(); (all[i + 1] || all[0]).focus(); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); (all[i - 1] || all[all.length - 1]).focus(); }
          else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); open(false); btn.focus(); }
          else if (e.key === 'Enter') { e.stopPropagation(); }
        };
      });
      btn.onkeydown = e => { if (e.key === 'ArrowDown') { e.preventDefault(); open(true); } };
      document.addEventListener('click', () => open(false), { signal: (G.abort = new AbortController()).signal });
    }
    const submit = () => {
      if (!$('#dsym').value.trim() && !$('#dz').value.trim() && !G.pick && !G.cat) return;
      answer({ sym: $('#dsym').value, z: $('#dz').value, loc: G.pick, cat: G.cat });
    };
    $('#dok').onclick = submit;
    $$('#dsym, #dz').forEach(i => i.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    $('#dsym').focus();
  } else {
    // Todos os elementos já perguntados ficam marcados: acertou = cor da categoria (fixação), errou = vermelho
    ans.innerHTML = `<div class="skip-row top">${skipBtn()}</div>
      <div class="board">${ptable(e => G.marked.has(e.z) ? { cls: G.marked.get(e.z), style: `--c:${CATS[e.cat].color}`, html: cellHtml(e) } : { cls: 'blank' }, { cls: 'click-t' })}</div>`;
    $$('.click-t .pc.blank', ans).forEach(c => c.onclick = () => answer(+c.dataset.z));
  }
  $('#skip').onclick = () => answer(null, 'skip');
  updateHud();
}

// símbolos precisam da maiúscula certa (Co ≠ CO); nomes aceitam sem acento e sem maiúscula
const typedOk = (q, v) => q.exact ? String(v).trim() === q.exact : q.accept.includes(norm(v));

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
    ok = v != null && typedOk(q, v);
    const inp = $('#tin');
    inp.disabled = true; inp.classList.add(ok ? 'right' : 'wrong');
    if (!ok) inp.value = q.answer;
  } else if (q.mode === 'define') {
    const a = v || {};
    const symOk = String(a.sym || '').trim() === q.el.sym;
    const zOk = String(a.z || '').trim() === String(q.el.z);
    const locOk = a.loc === q.target;
    q.parts = [[t('partSym'), symOk], [t('partZ'), zOk], [t('partLoc'), locOk]];
    let catOk = true;
    if (q.catOpts) {
      catOk = a.cat === q.el.cat;
      q.parts.push([t('category'), catOk]);
      const btn = $('#cselBtn');
      btn.disabled = true; $('#cselList').hidden = true; btn.classList.remove('open');
      btn.classList.add(catOk ? 'right' : 'wrong');
      if (!catOk) {
        const r = $('#cselRight');
        r.hidden = false; r.style.setProperty('--c', CATS[q.el.cat].color);
        r.innerHTML = `<i class="cat-dot"></i>✓ ${CATS[q.el.cat].name}`;
        if (!a.cat) $('#cselTxt').textContent = '—';
      }
    }
    ok = symOk && zOk && locOk && catOk;
    [['#dsym', symOk, q.el.sym], ['#dz', zOk, q.el.z]].forEach(([id, good, right]) => {
      const inp = $(id); inp.disabled = true; inp.classList.add(good ? 'right' : 'wrong'); if (!good) inp.value = right;
    });
    $('#dok').disabled = true;
    const cell = $(`.def-t .pc[data-z="${q.target}"]`);
    cell.classList.remove('blank', 'pick'); cell.classList.add(locOk ? 'done' : 'reveal'); cell.style.setProperty('--c', CATS[q.el.cat].color); cell.innerHTML = cellHtml(q.el);
    if (!locOk && a.loc) { const m = $(`.def-t .pc[data-z="${a.loc}"]`); m.classList.remove('pick'); m.classList.add('miss'); }
    G.marked.set(q.target, ok ? 'done' : 'wrong');
    if (!locOk && G.zoom) G.zoom.focus(cell);
    v = null; // o resumo final não mostra o objeto
  } else {
    ok = v === q.target;
    $$('.click-t .pc').forEach(c => c.onclick = null);
    const cell = $(`.click-t .pc[data-z="${q.target}"]`);
    cell.classList.remove('blank'); cell.classList.add(ok ? 'done' : 'reveal'); cell.style.setProperty('--c', CATS[q.el.cat].color); cell.innerHTML = cellHtml(q.el);
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
    if (G.lives <= 0) { G.over = true; G.to = setTimeout(() => finish('lives'), q.mode === 'define' ? 4000 : 1100); return; }
  }
  // Definir: bem mais tempo para conferir (principalmente quando erra)
  const wait = q.mode === 'define' ? (ok ? 1500 : 6000) : (ok ? 650 : 1100);
  if (G.next !== 'manual') G.to = setTimeout(nextQ, wait);
}

// Popup animado de acerto/erro
function showPop(ok, how, q) {
  const title = ok ? pickOne(t('yay')) : how === 'timeout' ? t('timeout') : how === 'skip' ? t('skipped') : t('wrong');
  const icon = ok ? DOODLE.check : how === 'skip' ? '⏭' : how === 'timeout' ? '⏰' : DOODLE.cross;
  const manual = G.next === 'manual' && !G.over;
  const wrap = document.createElement('div');
  wrap.id = 'pop';
  wrap.className = `pop-wrap ${q.mode === 'click' ? 'pop-top' : q.mode === 'define' ? 'pop-def' : ''}`;
  wrap.innerHTML = `<div class="pop ${ok ? 'good' : 'bad'}">
    <div class="pop-ic">${icon}</div>
    <div class="pop-title">${title}</div>
    ${q.parts ? `<div class="pop-parts">${q.parts.map(([l, k]) => `<span class="${k ? 'ok' : 'no'}">${l} ${k ? '✓' : '✗'}</span>`).join('')}</div>` : ''}
    ${ok ? '' : `<div class="pop-ans">${t('answer')}: <b>${q.answer}</b></div>`}
    ${q.note ? `<div class="pop-note">💡 ${q.note}</div>` : ''}
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
    if (!G.fill && !G.seq && G.locked && G.next !== 'manual') G.to = setTimeout(nextQ, 600);
    const inp = $('#tin') || $('#fin'); if (inp && !inp.disabled) inp.focus();
  }
}

document.addEventListener('keydown', e => {
  if (!G) return;
  if (e.key === 'Escape') return togglePause();
  if (G.fill || G.seq || G.paused) return;
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
      <div class="review">${wrong.map(r => `<div class="rv">${r.q.quiz ? `<div class="rv-ic">💡</div>` : tile(r.q.el, { size: 'sm', name: false })}<div>
        <b>${r.q.quiz ? r.q.heading : r.q.el.name}</b>${r.q.quiz ? (r.q.note ? `<small>${r.q.note}</small>` : '') : `<small>${r.q.heading}</small>`}
        <small>${t('answer')}: <b class="g">${r.q.answer}</b>${typeof r.given === 'string' ? ` · ${t('you')}: <span class="r">${esc(r.given)}</span>` : ''}</small>
      </div></div>`).join('')}</div>` : ''}
  </section>`;
  window.scrollTo(0, 0);
  $('#again').onclick = g.replay;
  $('#back').onclick = g.back;
}

/* ---------- Em Ordem ---------- */
const SEQ_STEPS = { name: ['name'], sym: ['sym'], both: ['sym', 'name'] };

function startSeqPractice(g, s) {
  const [a, b] = s.range.split('-').map(Number);
  startSeq({ from: a, to: b, write: s.mode, limit: +s.limit, back: () => renderGamePage(g.id, 'p'), replay: () => startSeqPractice(g, s) });
}
function startSeqChallenge(g, li, mode) {
  const L = SEQ_LEVELS[li];
  startSeq({
    from: 1, to: L.to, write: mode, limit: seqLimit(L, mode), challenge: true,
    back: () => renderGamePage(g.id, 'c'), replay: () => startSeqChallenge(g, li, mode),
    onFinish: r => saveBest(g.id, `${mode}-${li}`, r.score, r.total, r.passed),
  });
}

function startSeq(cfg) {
  stopGame();
  const pool = ELEMENTS.filter(e => e.z >= cfg.from && e.z <= cfg.to);
  // res[i]: 'ok' (escreveu) | 'skip' (pulou)
  G = { ...cfg, seq: true, pool, idx: 0, step: 0, res: [], elapsed: 0, paused: false, last: performance.now() };
  app.innerHTML = `
  <section class="stage play seq-stage">
    <div class="hud">
      <div class="clock"><small>${G.limit ? t('left') : t('time')}</small><b id="clock">0:00</b></div>
      <div class="bars"><div class="fill-count"><b id="fcount">0</b> ${t('ofElements', pool.length)}</div><div class="qbar"><span id="qbar"></span></div></div>
      ${hudButtons()}
    </div>
    <div class="seq-main" id="smain">
      <div class="seq-track" id="strack"></div>
      <div class="seq-side">
        <div class="seq-input" id="sbar">
          <input id="fin" class="tin" autocomplete="off" autocapitalize="off" spellcheck="false">
          <button class="btn-w" id="sskip">${t('skip')} ⏭</button>
        </div>
        <div class="seq-hint" id="shint">${t('seqHint')}</div>
      </div>
    </div>
    <div id="sres"></div>
  </section>`;
  const inp = $('#fin');
  inp.oninput = () => { if (seqMatch(inp.value)) seqAdvance(); };
  inp.onkeydown = e => {
    if (e.key !== 'Enter') return;
    if (seqMatch(inp.value)) seqAdvance();
    else { inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); }
  };
  $('#sskip').onclick = () => { seqSkip(); inp.focus(); };
  bindHud();
  renderSeq(false);
  inp.focus();
  updateHud();
  G.iv = setInterval(tick, 100);
}

const seqWant = () => SEQ_STEPS[G.write][G.step];
function seqMatch(v) {
  const e = G.pool[G.idx], n = norm(v);
  if (!e || !n) return false;
  return seqWant() === 'sym' ? n === norm(e.sym) : names(e).some(x => norm(x) === n);
}
function seqNext(mark) {
  $('#fin').classList.remove('shake');
  G.res[G.idx] = mark; G.idx++; G.step = 0;
  $('#fcount').textContent = G.res.filter(r => r === 'ok').length;
  if (G.idx >= G.pool.length) return finishSeq('done');
  renderSeq(true);
}
function seqAdvance() {
  $('#fin').value = '';
  G.step++;
  if (G.step >= SEQ_STEPS[G.write].length) seqNext('ok');
  else renderSeq(false);
}
function seqSkip() {
  if (!G || G.over || !G.seq) return;
  $('#fin').value = '';
  seqNext('skip');
}

function renderSeq(shift) {
  const steps = SEQ_STEPS[G.write];
  const done = (e, cls, pos) => `<div class="srow ${pos} ${cls}"><span class="sz">${e.z}</span><b class="ssym">${e.sym}</b><span class="snm">${e.name}</span></div>`;
  const row = (i, pos) => {
    const e = G.pool[i];
    if (!e) return `<div class="srow ${pos} empty"></div>`;
    if (i < G.idx) return done(e, G.res[i], pos);
    if (i > G.idx) return `<div class="srow ${pos} todo"><span class="sz">${e.z}</span><b class="ssym">—</b><span class="snm">———</span></div>`;
    const slots = steps.map((w, k) => {
      const st = k < G.step ? 'done' : k === G.step ? 'act' : '';
      const val = k < G.step ? (w === 'sym' ? e.sym : e.name) : '…';
      return `<span class="slot ${w} ${st}">${val}</span>`;
    }).join('');
    return `<div class="srow cur"><span class="sz">${e.z}</span><div class="slots">${slots}</div></div>`;
  };
  const tr = $('#strack');
  tr.innerHTML = [row(G.idx - 2, 'p2'), row(G.idx - 1, 'p1'), row(G.idx, 'cur'), row(G.idx + 1, 'n1'), row(G.idx + 2, 'n2')].join('');
  if (shift) { tr.classList.remove('anim'); void tr.offsetWidth; tr.classList.add('anim'); }
  const e = G.pool[G.idx];
  $('#fin').placeholder = t('seqPh', seqWant() === 'sym' ? t('wSym') : t('wName'), e.z);
}

function finishSeq(reason) {
  const g = G;
  clearInterval(g.iv);
  g.over = true;
  const total = g.pool.length;
  const score = g.res.filter(r => r === 'ok').length;
  const skipped = g.res.filter(r => r === 'skip').length;
  const pct = Math.round(100 * score / total);
  const passed = reason === 'done' && skipped <= Math.floor(total * 0.1);
  if (g.onFinish) g.onFinish({ score, total, passed });
  let [emoji, title] = resultTitle(pct);
  if (reason === 'time') [emoji, title] = t('rTime');
  $('#smain').remove();
  const L = t('seqLegend');
  $('#sres').innerHTML = `<div class="res-card inline">
    <div class="res-emoji">${emoji}</div><h1>${title}</h1>
    <div class="res-stats">
      <div><b>${score}/${total}</b><small>${t('correct')}</small></div>
      <div><b>${skipped}</b><small>${t('seqSkipped')}</small></div>
      <div><b>${fmt(g.elapsed)}</b><small>${t('tTime')}</small></div>
    </div>
    <div class="res-actions"><button class="btn-y" id="again">${t('again')}</button><button class="btn-w" id="back">${t('back')}</button></div>
  </div>
  <h3 class="rv-title">${t('seqListTitle')}</h3>
  <div class="seq-legend"><span class="sl ok">${L[0]}</span><span class="sl skip">${L[1]}</span><span class="sl miss">${L[2]}</span></div>
  <div class="seq-list">${g.pool.map((e, i) => `<div class="sl ${g.res[i] || 'miss'}"><span class="z">${e.z}</span><b>${e.sym}</b><span>${e.name}</span></div>`).join('')}</div>`;
  $('#again').onclick = () => { stopGame(); g.replay(); };
  $('#back').onclick = () => { stopGame(); g.back(); };
  window.scrollTo(0, 0);
}

/* ---------- Preencher a Tabela ---------- */
function startFillPractice(g, s) {
  startFill({ pool: practicePool(g, s), limit: +s.limit, symbols: s.symbols === 'yes', back: () => renderGamePage(g.id, 'p'), replay: () => startFillPractice(g, s) });
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
  const pool = cfg.pool || ELEMENTS.filter(e => e.z >= cfg.from && e.z <= cfg.to);
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
        <span>${t('category')} <b>${CATS[e.cat].name}</b></span><span>${t('group')} <b>${e.group || '-'}</b></span><span>${t('period')} <b>${e.period}</b></span></div>
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
