// Estudar → "Por que as coisas reagem?": energia, ligações, alcalinos na água, polaridade,
// sabão e micelas, velocidade das reações. Tudo com partes interativas.

const RL_STATE = { timers: [], raf: 0, alive: false };
function reactLearnStop() {
  RL_STATE.timers.forEach(t => { clearInterval(t); clearTimeout(t); });
  RL_STATE.timers = []; RL_STATE.alive = false; cancelAnimationFrame(RL_STATE.raf);
}

const RL = {
  pt: {
    tab: '⚗️ Por que as coisas reagem?',
    title: 'Por que as coisas reagem?',
    lead: 'Por que o sódio explode na água, por que o fogo precisa de um fósforo e como o sabão tira a gordura. A resposta curta: <b>tudo busca o arranjo mais estável</b>, com menos energia.',
    toc: 'Nesta página', quick: 'Teste rápido', right: 'Isso! ', wrongA: 'Quase! ',
    s1: 'Tudo busca o mais estável',
    s1t: 'Numa reação, os átomos <b>trocam de parceiros</b>. Se o arranjo novo tem <b>menos energia</b> (é mais estável), a sobra sai como calor ou luz. É como uma bola no alto de uma rampa: ela "quer" descer.',
    s1t2: 'Mas quase sempre existe uma <b>colina no meio</b>: a <b>energia de ativação</b>. Por isso a madeira não pega fogo sozinha na mesa: ela precisa do fósforo para passar a colina. Depois, o calor da própria reação mantém tudo andando.',
    push: '👉 Empurrãozinho', spark: '🔥 Faísca!', exo: 'Exotérmica (libera calor)', endo: 'Endotérmica (absorve calor)',
    react: 'reagentes', prod: 'produtos', ea: 'energia de ativação',
    pushMsg: 'Faltou energia para passar a colina: a bola voltou. Nada aconteceu.',
    sparkExo: '🔥 Passou a colina e desceu: a diferença de energia saiu como calor. Exemplos: fogo, explosões, a "bolsa quente" de emergência.',
    sparkEndo: '🧊 Passou, mas os produtos ficaram mais altos: a reação precisou <b>absorver</b> energia. Exemplos: cozinhar um ovo, a fotossíntese, a "bolsa fria" de emergência.',
    q1: ['Por que um papel não pega fogo sozinho, mesmo que queimar libere energia?', ['Falta a energia de ativação', 'O papel não tem energia', 'Queimar absorve calor'], 0, 'A combustão libera energia, mas precisa de um empurrão inicial (a chama) para passar a "colina".'],
    s2: 'Quebrar custa, formar libera',
    s2t: 'Toda ligação química guarda energia. <b>Quebrar</b> uma ligação <b>custa</b> energia; <b>formar</b> uma ligação <b>libera</b> energia. A reação libera calor quando as ligações novas são mais fortes que as antigas. Veja na reação que faz a água:',
    s2steps: ['Reagentes: 2 H₂ + O₂', '1) Quebrar as ligações', '2) Formar as ligações novas', 'Resultado: 2 H₂O'],
    s2cost: 'gasta para quebrar', s2gain: 'libera ao formar', s2net: 'sobra (sai como calor)',
    s2next: 'Próximo passo ▶', s2reset: '↺ Recomeçar',
    s2n: 'Saldo: quebrar custou <b>1.370 kJ</b>, formar devolveu <b>1.852 kJ</b>. Sobram <b>482 kJ</b> de calor. É por isso que hidrogênio com oxigênio é explosivo (e é o que move alguns foguetes).',
    s3: 'Por que os alcalinos explodem na água?',
    s3t: 'Os metais alcalinos têm <b>1 elétron sozinho</b> na última camada, preso fraquinho. Ao tocar a água, eles entregam esse elétron, e os produtos são muito mais estáveis. A sobra de energia sai de uma vez:',
    s3eq: m => `2 ${m} + 2 H₂O → 2 ${m}OH + H₂ + muito calor`,
    s3drop: '💧 Jogar na água', s3reset: '↺',
    s3fx: {
      Li: 'Lítio: borbulha devagar, soltando hidrogênio. Bem calminho.',
      Na: 'Sódio: chia, derrete numa bolinha e sai correndo pela água. Às vezes o hidrogênio pega fogo.',
      K: 'Potássio: pega fogo na hora, com chama lilás, e pode estourar.',
      Cs: 'Césio: explode na hora! Tão violento que quebra o recipiente.',
    },
    s3why: 'Por que piora ao descer o grupo? Cada linha a mais é uma camada a mais: o elétron de fora fica <b>mais longe</b> do núcleo e sai mais fácil, então a reação é mais rápida e mais violenta.',
    s3dist: 'Distância do elétron de fora',
    s3fun: '📸 Curiosidade: câmeras ultrarrápidas mostraram que, no primeiro milésimo de segundo, os elétrons saem tão rápido que o metal fica carregado positivamente e <b>se repele sozinho</b>, abrindo "espinhos" que expõem mais metal à água.',
    q3: ['Por que o potássio reage com a água mais forte que o lítio?', ['O elétron de fora dele está mais longe do núcleo', 'Ele tem mais elétrons na última camada', 'Ele é mais leve'], 0, 'Os dois têm 1 elétron na última camada, mas no potássio ele está 2 camadas mais longe, preso mais fraco.'],
    s4: 'Polar e apolar: quem gosta de quem',
    s4t: 'A molécula de água é <b>polar</b>: o oxigênio puxa os elétrons para perto dele e fica levemente negativo (δ−), e os hidrogênios ficam levemente positivos (δ+). Por isso as moléculas de água se grudam umas nas outras (as <b>ligações de hidrogênio</b>).',
    s4t2: 'O óleo é <b>apolar</b>: não tem esses lados carregados e não consegue entrar nessa "roda" da água. A água prefere ficar grudada nela mesma e <b>espreme o óleo para fora</b>. Regra de ouro: <b>semelhante dissolve semelhante</b>.',
    shake: '🫙 Agitar o pote', water: 'água', oil: 'óleo',
    s4n: 'Repare: por mais que você agite, o óleo volta a se separar e, por ser menos denso, sobe.',
    s5: 'Como o sabão tira a gordura',
    s5t: 'A molécula de sabão tem <b>duas pontas diferentes</b>: uma <b>cabeça com carga</b>, que adora água, e uma <b>cauda comprida</b> de carbono e hidrogênio, parecida com óleo, que foge da água.',
    head: 'cabeça (gosta de água)', tail: 'cauda (gosta de óleo)',
    addSoap: '🧼 Adicionar sabão', rinse: '🚿 Enxaguar', s5reset: '↺',
    s5steps: ['Uma gota de gordura presa na água (ou na roupa).', 'As caudas mergulham na gordura; as cabeças ficam viradas para a água. Formou uma <b>micela</b>!', 'Por fora, a micela é toda "cabeça", que gosta de água: a água leva a gordura embora. 🎉'],
    s5n: 'Repare que isso <b>não é uma reação química</b>: nenhuma ligação se quebra. É só cada ponta da molécula ficando perto de quem ela gosta.',
    q5: ['Qual parte do sabão fica dentro da gota de gordura?', ['A cauda (apolar)', 'A cabeça (com carga)', 'As duas'], 0, 'A cauda é parecida com óleo, então mergulha na gordura. A cabeça fica para fora, na água.'],
    s6: 'O que deixa uma reação mais rápida?',
    s6t: 'Para reagir, as partículas precisam <b>se chocar</b> com força suficiente (passar a colina). Tudo que aumenta os choques fortes acelera a reação. Mexa nos controles:',
    temp: '🌡️ Temperatura', conc: '🧪 Concentração', cat: '⚗️ Catalisador', simReset: '↺ Recomeçar',
    made: 'produtos formados',
    factors: [
      ['🌡️', 'Temperatura', 'Mais quente = partículas mais rápidas = mais choques fortes. Comida estraga mais devagar na geladeira.'],
      ['🧪', 'Concentração', 'Mais partículas no mesmo espaço = mais encontros.'],
      ['🔪', 'Superfície de contato', 'Pedaços menores reagem mais rápido: palha de aço pega fogo, um prego não.'],
      ['⚗️', 'Catalisador', 'Abaixa a colina sem ser gasto. As enzimas do seu corpo são catalisadores.'],
    ],
    ctaTitle: 'Continue explorando!', ctaAtom: '⚛️ Por dentro do átomo', ctaQuiz: '💡 Perguntas de Química',
  },
  en: {
    tab: '⚗️ Why do things react?',
    title: 'Why do things react?',
    lead: 'Why sodium explodes in water, why fire needs a match and how soap removes grease. The short answer: <b>everything seeks the most stable arrangement</b>, with less energy.',
    toc: 'On this page', quick: 'Quick check', right: 'Yes! ', wrongA: 'Almost! ',
    s1: 'Everything seeks stability',
    s1t: 'In a reaction, atoms <b>swap partners</b>. If the new arrangement has <b>less energy</b> (is more stable), the leftover comes out as heat or light. Like a ball at the top of a slope: it "wants" to roll down.',
    s1t2: 'But there is almost always a <b>hill in the way</b>: the <b>activation energy</b>. That is why wood does not catch fire by itself on your desk: it needs a match to get over the hill. After that, the reaction\'s own heat keeps it going.',
    push: '👉 Small push', spark: '🔥 Spark!', exo: 'Exothermic (releases heat)', endo: 'Endothermic (absorbs heat)',
    react: 'reactants', prod: 'products', ea: 'activation energy',
    pushMsg: 'Not enough energy to get over the hill: the ball rolled back. Nothing happened.',
    sparkExo: '🔥 It got over the hill and rolled down: the energy difference came out as heat. Examples: fire, explosions, emergency hot packs.',
    sparkEndo: '🧊 It got over, but the products ended up higher: the reaction had to <b>absorb</b> energy. Examples: cooking an egg, photosynthesis, emergency cold packs.',
    q1: ['Why doesn\'t paper catch fire by itself, even though burning releases energy?', ['It lacks the activation energy', 'Paper has no energy', 'Burning absorbs heat'], 0, 'Combustion releases energy, but needs an initial push (the flame) to get over the "hill".'],
    s2: 'Breaking costs, forming releases',
    s2t: 'Every chemical bond stores energy. <b>Breaking</b> a bond <b>costs</b> energy; <b>forming</b> a bond <b>releases</b> energy. A reaction gives off heat when the new bonds are stronger than the old ones. See it in the reaction that makes water:',
    s2steps: ['Reactants: 2 H₂ + O₂', '1) Break the bonds', '2) Form the new bonds', 'Result: 2 H₂O'],
    s2cost: 'spent to break', s2gain: 'released when forming', s2net: 'left over (comes out as heat)',
    s2next: 'Next step ▶', s2reset: '↺ Restart',
    s2n: 'Balance: breaking cost <b>1,370 kJ</b>, forming gave back <b>1,852 kJ</b>. That leaves <b>482 kJ</b> of heat. That is why hydrogen with oxygen is explosive (and it powers some rockets).',
    s3: 'Why do alkali metals explode in water?',
    s3t: 'Alkali metals have <b>1 lonely electron</b> in the outer shell, weakly held. When they touch water they hand over that electron, and the products are far more stable. The extra energy comes out all at once:',
    s3eq: m => `2 ${m} + 2 H₂O → 2 ${m}OH + H₂ + lots of heat`,
    s3drop: '💧 Drop it in water', s3reset: '↺',
    s3fx: {
      Li: 'Lithium: bubbles slowly, giving off hydrogen. Pretty calm.',
      Na: 'Sodium: fizzes, melts into a ball and zooms around. Sometimes the hydrogen catches fire.',
      K: 'Potassium: bursts into a lilac flame right away and may pop.',
      Cs: 'Caesium: explodes instantly! So violent it can shatter the container.',
    },
    s3why: 'Why does it get worse going down the group? Each row adds a shell: the outer electron is <b>farther</b> from the nucleus and leaves more easily, so the reaction is faster and more violent.',
    s3dist: 'Distance of the outer electron',
    s3fun: '📸 Fun fact: high-speed cameras showed that in the first millisecond the electrons leave so fast the metal becomes positively charged and <b>repels itself</b>, bursting into "spikes" that expose more metal to the water.',
    q3: ['Why does potassium react with water more strongly than lithium?', ['Its outer electron is farther from the nucleus', 'It has more outer electrons', 'It is lighter'], 0, 'Both have 1 outer electron, but in potassium it is 2 shells farther away, held more weakly.'],
    s4: 'Polar and nonpolar: who likes whom',
    s4t: 'A water molecule is <b>polar</b>: oxygen pulls the electrons close and becomes slightly negative (δ−), while the hydrogens become slightly positive (δ+). That is why water molecules stick to each other (<b>hydrogen bonds</b>).',
    s4t2: 'Oil is <b>nonpolar</b>: it has no charged sides and cannot join water\'s "circle". Water prefers to stick to itself and <b>squeezes the oil out</b>. Golden rule: <b>like dissolves like</b>.',
    shake: '🫙 Shake the jar', water: 'water', oil: 'oil',
    s4n: 'Notice: no matter how much you shake, the oil separates again and, being less dense, floats up.',
    s5: 'How soap removes grease',
    s5t: 'A soap molecule has <b>two different ends</b>: a <b>charged head</b> that loves water, and a <b>long tail</b> of carbon and hydrogen, like oil, that avoids water.',
    head: 'head (likes water)', tail: 'tail (likes oil)',
    addSoap: '🧼 Add soap', rinse: '🚿 Rinse', s5reset: '↺',
    s5steps: ['A drop of grease stuck in water (or on clothes).', 'The tails dive into the grease; the heads face the water. A <b>micelle</b> formed!', 'From outside, the micelle is all "heads", which like water: the water carries the grease away. 🎉'],
    s5n: 'Notice this is <b>not a chemical reaction</b>: no bond breaks. Each end of the molecule just stays close to what it likes.',
    q5: ['Which part of the soap goes inside the grease drop?', ['The tail (nonpolar)', 'The head (charged)', 'Both'], 0, 'The tail is like oil, so it dives into the grease. The head stays outside, in the water.'],
    s6: 'What makes a reaction faster?',
    s6t: 'To react, particles must <b>collide</b> hard enough (get over the hill). Anything that increases strong collisions speeds the reaction up. Play with the controls:',
    temp: '🌡️ Temperature', conc: '🧪 Concentration', cat: '⚗️ Catalyst', simReset: '↺ Restart',
    made: 'products made',
    factors: [
      ['🌡️', 'Temperature', 'Hotter = faster particles = more strong collisions. Food spoils more slowly in the fridge.'],
      ['🧪', 'Concentration', 'More particles in the same space = more encounters.'],
      ['🔪', 'Surface area', 'Smaller pieces react faster: steel wool burns, a nail does not.'],
      ['⚗️', 'Catalyst', 'Lowers the hill without being used up. The enzymes in your body are catalysts.'],
    ],
    ctaTitle: 'Keep exploring!', ctaAtom: '⚛️ Inside the atom', ctaQuiz: '💡 Chemistry Questions',
  },
};
const rlT = () => RL[LANG] || RL.pt;
const rlQuick = (id, q) => `<div class="al-quiz" data-q="${id}"><b>✏️ ${rlT().quick}</b><p>${q[0]}</p>
  <div class="al-qopts">${q[1].map((o, i) => `<button data-i="${i}">${o}</button>`).join('')}</div><div class="al-qfb"></div></div>`;

const RL_METALS = [['Li', 3, 2], ['Na', 11, 3], ['K', 19, 4], ['Cs', 55, 6]];

function reactLearnHtml() {
  const T = rlT();
  const secs = [];
  const sec = (id, title, body) => { secs.push([id, title]); return `<section class="al-sec" id="rl-${id}"><h2><span class="al-n">${secs.length}</span>${title}</h2>${body}</section>`; };

  const s1 = sec('energy', T.s1, `<p>${T.s1t}</p><p>${T.s1t2}</p>
    <div class="al-play">
      <div class="al-chips" id="rlMode"><button data-m="exo" class="on">${T.exo}</button><button data-m="endo">${T.endo}</button></div>
      <svg viewBox="0 0 400 210" class="rl-energy" id="rlEnergy">
        <path id="rlCurve" class="rl-curve" d=""/>
        <text x="40" y="200" class="rl-lbl">${T.react}</text><text x="330" y="200" class="rl-lbl">${T.prod}</text>
        <text x="200" y="14" class="rl-lbl ea">${T.ea}</text>
        <circle id="rlBall" r="11" class="rl-ball"/>
        <text id="rlFire" x="330" y="80" class="rl-fire"></text>
      </svg>
      <div class="al-center"><button class="btn-w" id="rlPush">${T.push}</button><button class="btn-y" id="rlSpark">${T.spark}</button></div>
      <div class="rl-msg" id="rlEMsg"></div>
    </div>${rlQuick('q1', T.q1)}`);

  const s2 = sec('bonds', T.s2, `<p>${T.s2t}</p>
    <div class="al-play">
      <div class="rl-steps" id="rlSteps">${T.s2steps.map((x, i) => `<span class="${i ? '' : 'on'}">${x}</span>`).join('')}</div>
      <div class="rl-mols" id="rlMols"></div>
      <div class="rl-bars" id="rlBars"></div>
      <div class="al-center"><button class="btn-y" id="rlNext">${T.s2next}</button><button class="btn-w" id="rlBReset">${T.s2reset}</button></div>
    </div><p>${T.s2n}</p>`);

  const s3 = sec('alkali', T.s3, `<p>${T.s3t}</p>
    <div class="al-play">
      <div class="al-chips" id="rlMetal">${RL_METALS.map(([s, z], i) => `<button data-i="${i}" class="${i === 1 ? 'on' : ''}">${s} · ${ELEMENTS[z - 1].name}</button>`).join('')}</div>
      <div class="rl-eq" id="rlEq"></div>
      <div class="rl-tank" id="rlTank"><div class="rl-water"></div><div class="rl-metal" id="rlChunk"></div><div class="rl-boom" id="rlBoom"></div></div>
      <div class="al-center"><button class="btn-y" id="rlDrop">${T.s3drop}</button><button class="btn-w" id="rlTankReset">${T.s3reset}</button></div>
      <div class="rl-msg" id="rlAMsg"></div>
      <h3 class="al-h3">${T.s3dist}</h3>
      <div class="rl-dist">${RL_METALS.map(([s, z, sh]) => `<div><b>${s}</b><span>${Array.from({ length: sh }, (_, i) => `<i class="${i === sh - 1 ? 'last' : ''}"></i>`).join('')}</span><small>${sh}</small></div>`).join('')}</div>
    </div>
    <p>${T.s3why}</p><p class="al-note">${T.s3fun}</p>${rlQuick('q3', T.q3)}`);

  const s4 = sec('polar', T.s4, `<div class="al-row"><svg viewBox="0 0 170 130" class="rl-h2o" width="170">
      <line x1="85" y1="55" x2="38" y2="95"/><line x1="85" y1="55" x2="132" y2="95"/>
      <circle cx="85" cy="55" r="30" class="o"/><text x="85" y="61">O</text><text x="85" y="18" class="d">δ−</text>
      <circle cx="38" cy="95" r="18" class="h"/><text x="38" y="101">H</text><text x="14" y="125" class="d">δ+</text>
      <circle cx="132" cy="95" r="18" class="h"/><text x="132" y="101">H</text><text x="156" y="125" class="d">δ+</text></svg>
    <div class="al-col"><p>${T.s4t}</p></div></div><p>${T.s4t2}</p>
    <div class="al-play"><div class="rl-jar" id="rlJar"><span class="rl-jl w">${T.water}</span><span class="rl-jl o">${T.oil}</span>${'<i></i>'.repeat(14)}</div>
      <div class="al-center"><button class="btn-y" id="rlShake">${T.shake}</button></div></div><p>${T.s4n}</p>`);

  const soap = (x, y, a, cls = '') => `<g class="rl-soap ${cls}" style="transform:translate(${x}px,${y}px) rotate(${a}deg)"><polyline points="7,0 13,-4 19,4 25,-4 31,4 37,0"/><circle r="7"/></g>`;
  const s5 = sec('soap', T.s5, `<p>${T.s5t}</p>
    <div class="rl-legend"><svg viewBox="-10 -12 60 24" width="90">${soap(0, 0, 0).replace('style="transform:translate(0px,0px) rotate(0deg)"', '')}</svg><span><b class="h">●</b> ${T.head}</span><span><b class="t">〰</b> ${T.tail}</span></div>
    <div class="al-play"><svg viewBox="0 0 400 230" class="rl-soapscene" id="rlScene"><g id="rlMicelle"><circle cx="200" cy="115" r="42" class="rl-grease" id="rlGrease"/><g id="rlSoaps"></g></g></svg>
      <div class="rl-msg" id="rlSMsg"></div>
      <div class="al-center"><button class="btn-y" id="rlAddSoap">${T.addSoap}</button><button class="btn-y" id="rlRinse" disabled>${T.rinse}</button><button class="btn-w" id="rlSReset">${T.s5reset}</button></div></div>
    <p>${T.s5n}</p>${rlQuick('q5', T.q5)}`);

  const s6 = sec('speed', T.s6, `<p>${T.s6t}</p>
    <div class="al-play"><div class="rl-sim"><canvas id="rlCanvas" width="420" height="240"></canvas>
      <div class="rl-simctl">
        <label>${T.temp}<input type="range" id="rlTemp" min="1" max="10" value="4"></label>
        <label>${T.conc}<input type="range" id="rlConc" min="4" max="24" value="10"></label>
        <label class="rl-check"><input type="checkbox" id="rlCat"> ${T.cat}</label>
        <div class="rl-made"><b id="rlMade">0</b><small>${T.made}</small></div>
        <button class="btn-w" id="rlSimReset">${T.simReset}</button>
      </div></div></div>
    <div class="al-uses">${T.factors.map(([i, n, d]) => `<div><span>${i}</span><b>${n}</b><p>${d}</p></div>`).join('')}</div>`);

  const cta = `<div class="al-cta"><b>${T.ctaTitle}</b><div class="al-games"><a class="btn-y" href="#/learn/atom">${T.ctaAtom}</a><a class="btn-w" href="#/game/quiz">${T.ctaQuiz}</a></div></div>`;
  const toc = `<nav class="al-toc"><b>${T.toc}</b>${secs.map(([id, t], i) => `<a href="#" data-go="rl-${id}">${i + 1}. ${t}</a>`).join('')}</nav>`;
  return `<h1 class="page-title">${T.title}</h1><p class="lead">${T.lead}</p>${toc}${s1}${s2}${s3}${s4}${s5}${s6}${cta}`;
}

function reactLearnInit() {
  reactLearnStop();
  RL_STATE.alive = true;
  const T = rlT(), $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const later = (fn, ms) => RL_STATE.timers.push(setTimeout(fn, ms));
  $$('.al-toc a').forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById(a.dataset.go).scrollIntoView({ behavior: 'smooth' }); });
  $$('.al-quiz').forEach(box => {
    const q = T[box.dataset.q];
    box.querySelectorAll('.al-qopts button').forEach(b => b.onclick = () => {
      const ok = +b.dataset.i === q[2];
      box.querySelectorAll('.al-qopts button').forEach(x => { x.disabled = true; if (+x.dataset.i === q[2]) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      box.querySelector('.al-qfb').innerHTML = (ok ? T.right : T.wrongA) + q[3];
    });
  });

  /* 1. diagrama de energia */
  let mode = 'exo', anim = 0;
  const curve = $('#rlCurve'), ball = $('#rlBall');
  const drawCurve = () => {
    const end = mode === 'exo' ? 165 : 70;
    curve.setAttribute('d', `M20 120 L120 120 C170 120 170 30 200 30 C230 30 240 ${end} 290 ${end} L380 ${end}`);
    setBall(0.06);
  };
  const setBall = t => {
    const L = curve.getTotalLength(), p = curve.getPointAtLength(L * t);
    ball.setAttribute('cx', p.x); ball.setAttribute('cy', p.y - 11);
  };
  const run = (keys, ms, done) => {
    cancelAnimationFrame(anim);
    const t0 = performance.now();
    const step = now => {
      const k = Math.min(1, (now - t0) / ms), seg = k * (keys.length - 1), i = Math.min(keys.length - 2, Math.floor(seg)), f = seg - i;
      const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      setBall(keys[i] + (keys[i + 1] - keys[i]) * e);
      if (k < 1) anim = requestAnimationFrame(step); else if (done) done();
    };
    anim = requestAnimationFrame(step);
  };
  $$('#rlMode button').forEach(b => b.onclick = () => {
    $$('#rlMode button').forEach(x => x.classList.toggle('on', x === b));
    mode = b.dataset.m; $('#rlFire').textContent = ''; $('#rlEMsg').innerHTML = ''; drawCurve();
  });
  $('#rlPush').onclick = () => { $('#rlFire').textContent = ''; run([0.06, 0.3, 0.06], 1400, () => $('#rlEMsg').innerHTML = T.pushMsg); };
  $('#rlSpark').onclick = () => {
    $('#rlFire').textContent = '';
    run([0.06, 0.5, 0.94], 1500, () => { $('#rlFire').textContent = mode === 'exo' ? '🔥' : '🧊'; $('#rlEMsg').innerHTML = mode === 'exo' ? T.sparkExo : T.sparkEndo; });
  };
  drawCurve();

  /* 2. quebrar e formar ligações */
  let bs = 0;
  const atom = (cls, x, y, l) => `<span class="rl-at ${cls}" style="left:${x}%;top:${y}%">${l}</span>`;
  const MOLS = [
    // reagentes: 2 H2 + O2
    [['h', 8, 30], ['h', 15, 30], ['h', 8, 62], ['h', 15, 62], ['o', 44, 42], ['o', 53, 42]],
    // átomos soltos
    [['h', 6, 20], ['h', 22, 70], ['h', 14, 46], ['h', 30, 22], ['o', 52, 30], ['o', 60, 66]],
    // 2 H2O
    [['h', 66, 26], ['h', 82, 26], ['o', 74, 40], ['h', 66, 62], ['h', 82, 62], ['o', 74, 76]],
    [['h', 66, 26], ['h', 82, 26], ['o', 74, 40], ['h', 66, 62], ['h', 82, 62], ['o', 74, 76]],
  ];
  const drawBonds = () => {
    $$('#rlSteps span').forEach((s, i) => s.classList.toggle('on', i === bs));
    $('#rlMols').innerHTML = MOLS[bs].map(([c, x, y]) => atom(c, x, y, c === 'h' ? 'H' : 'O')).join('') + (bs === 3 ? '<span class="rl-heat">🔥 +482 kJ</span>' : '');
    const bar = (v, max, cls, lbl) => `<div class="rl-bar ${cls}"><span>${lbl}</span><div><i style="width:${(v / max) * 100}%"></i></div><b>${v.toLocaleString(LANG === 'pt' ? 'pt-BR' : 'en-US')} kJ</b></div>`;
    $('#rlBars').innerHTML = (bs >= 1 ? bar(1370, 1852, 'cost', T.s2cost) : '') + (bs >= 2 ? bar(1852, 1852, 'gain', T.s2gain) : '') + (bs >= 3 ? bar(482, 1852, 'net', T.s2net) : '');
    $('#rlNext').disabled = bs === 3;
  };
  $('#rlNext').onclick = () => { bs = Math.min(3, bs + 1); drawBonds(); };
  $('#rlBReset').onclick = () => { bs = 0; drawBonds(); };
  drawBonds();

  /* 3. alcalinos na água */
  let mi = 1;
  const tank = $('#rlTank');
  const resetTank = () => {
    tank.className = 'rl-tank'; tank.querySelectorAll('.rl-bub').forEach(b => b.remove());
    $('#rlBoom').textContent = ''; $('#rlAMsg').innerHTML = '';
    const [s] = RL_METALS[mi]; $('#rlChunk').textContent = s; $('#rlEq').textContent = T.s3eq(s);
    $('#rlDrop').disabled = false;
  };
  $$('#rlMetal button').forEach(b => b.onclick = () => { $$('#rlMetal button').forEach(x => x.classList.toggle('on', x === b)); mi = +b.dataset.i; resetTank(); });
  $('#rlDrop').onclick = () => {
    const [s] = RL_METALS[mi];
    resetTank(); $('#rlDrop').disabled = true;
    tank.classList.add('in', 'm' + mi);
    const nBub = [10, 24, 34, 40][mi];
    later(() => {
      for (let i = 0; i < nBub; i++) later(() => {
        const b = document.createElement('i'); b.className = 'rl-bub';
        b.style.left = (40 + Math.random() * 20 + (mi >= 1 ? (Math.random() - 0.5) * 40 : 0)) + '%';
        b.style.animationDuration = (1.6 - mi * 0.3 + Math.random() * 0.5) + 's';
        tank.appendChild(b); later(() => b.remove(), 2000);
      }, i * (220 - mi * 50));
      if (mi === 2) later(() => { $('#rlBoom').textContent = '🔥'; tank.classList.add('flame'); }, 400);
      if (mi === 3) later(() => { $('#rlBoom').textContent = '💥'; tank.classList.add('boom'); }, 250);
      $('#rlAMsg').innerHTML = T.s3fx[s];
    }, 700);
  };
  resetTank();

  /* 4. pote de água e óleo */
  const drops = $$('#rlJar i');
  const settle = () => drops.forEach((d, i) => { d.style.left = (8 + (i % 7) * 13) + '%'; d.style.top = (6 + Math.floor(i / 7) * 9) + '%'; d.classList.add('top'); });
  $('#rlShake').onclick = () => {
    const jar = $('#rlJar'); jar.classList.remove('shake'); void jar.offsetWidth; jar.classList.add('shake');
    drops.forEach(d => { d.classList.remove('top'); d.style.transition = 'none'; d.style.left = (6 + Math.random() * 84) + '%'; d.style.top = (30 + Math.random() * 60) + '%'; });
    later(() => { drops.forEach(d => { d.style.transition = ''; }); settle(); }, 900);
  };
  settle();

  /* 5. sabão e micelas */
  const N = 14;
  const soapG = (x, y, a) => `<g class="rl-soap" style="transform:translate(${x}px,${y}px) rotate(${a}deg)"><polyline points="7,0 13,-4 19,4 25,-4 31,4 37,0"/><circle r="7"/></g>`;
  const scene = { stage: 0 };
  const resetSoap = () => {
    scene.stage = 0;
    $('#rlSoaps').innerHTML = ''; $('#rlMicelle').style.transform = ''; $('#rlMicelle').style.opacity = 1;
    $('#rlSMsg').innerHTML = T.s5steps[0]; $('#rlAddSoap').disabled = false; $('#rlRinse').disabled = true;
  };
  $('#rlAddSoap').onclick = () => {
    if (scene.stage) return;
    scene.stage = 1; $('#rlAddSoap').disabled = true;
    // espalhadas pela água
    $('#rlSoaps').innerHTML = Array.from({ length: N }, () => soapG(20 + Math.random() * 360, 15 + Math.random() * 200, Math.random() * 360)).join('');
    later(() => {
      $$('#rlSoaps .rl-soap').forEach((g, i) => {
        const th = (i / N) * Math.PI * 2, R = 42 + 32;
        const x = 200 + R * Math.cos(th), y = 115 + R * Math.sin(th);
        g.style.transform = `translate(${x}px,${y}px) rotate(${(th * 180) / Math.PI + 180}deg)`;
      });
      later(() => { $('#rlSMsg').innerHTML = T.s5steps[1]; $('#rlRinse').disabled = false; }, 1300);
    }, 500);
  };
  $('#rlRinse').onclick = () => {
    $('#rlRinse').disabled = true;
    const m = $('#rlMicelle'); m.style.transform = 'translate(260px, 0)'; m.style.opacity = 0;
    later(() => { $('#rlSMsg').innerHTML = T.s5steps[2]; }, 900);
  };
  $('#rlSReset').onclick = resetSoap;
  resetSoap();

  /* 6. velocidade das reações (choques) */
  const cv = $('#rlCanvas'), ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height, R = 7;
  let ps = [], made = 0, flashes = [];
  const reset6 = () => {
    const n = +$('#rlConc').value; ps = []; made = 0; flashes = [];
    for (let i = 0; i < n * 2; i++) ps.push({ t: i % 2 ? 'B' : 'A', x: R + Math.random() * (W - 2 * R), y: R + Math.random() * (H - 2 * R), a: Math.random() * 6.28, sp: 0.6 + Math.random() * 0.8 });
    $('#rlMade').textContent = 0;
  };
  $('#rlConc').oninput = reset6;
  $('#rlSimReset').onclick = reset6;
  reset6();
  let last = performance.now();
  const COL = { A: '#ff6b6b', B: '#4f8dff', C: '#9b59ff' };
  const loop = now => {
    if (!RL_STATE.alive || !document.getElementById('rlCanvas')) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const temp = +$('#rlTemp').value, cat = $('#rlCat').checked;
    const v = 18 + temp * 14, need = cat ? 0.9 : 2.0; // energia do choque necessária (relativa)
    for (const p of ps) {
      p.x += Math.cos(p.a) * p.sp * v * dt; p.y += Math.sin(p.a) * p.sp * v * dt;
      if (p.x < R || p.x > W - R) { p.a = Math.PI - p.a; p.x = Math.max(R, Math.min(W - R, p.x)); }
      if (p.y < R || p.y > H - R) { p.a = -p.a; p.y = Math.max(R, Math.min(H - R, p.y)); }
    }
    for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
      const a = ps[i], b = ps[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d >= 2 * R) continue;
      // energia do choque ~ velocidade relativa
      const rel = Math.hypot(Math.cos(a.a) * a.sp - Math.cos(b.a) * b.sp, Math.sin(a.a) * a.sp - Math.sin(b.a) * b.sp) * (v / 80);
      if (((a.t === 'A' && b.t === 'B') || (a.t === 'B' && b.t === 'A')) && rel > need) {
        a.t = b.t = 'C'; made++; $('#rlMade').textContent = made; flashes.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, k: 0 });
      }
      const ang = Math.atan2(b.y - a.y, b.x - a.x); a.a = ang + Math.PI; b.a = ang;
      a.x -= Math.cos(ang) * 1.5; a.y -= Math.sin(ang) * 1.5; b.x += Math.cos(ang) * 1.5; b.y += Math.sin(ang) * 1.5;
    }
    ctx.clearRect(0, 0, W, H);
    for (const f of flashes) { f.k += dt * 2; ctx.beginPath(); ctx.arc(f.x, f.y, 6 + f.k * 22, 0, 6.28); ctx.strokeStyle = `rgba(255,200,40,${1 - f.k})`; ctx.lineWidth = 3; ctx.stroke(); }
    flashes = flashes.filter(f => f.k < 1);
    for (const p of ps) { ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, 6.28); ctx.fillStyle = COL[p.t]; ctx.fill(); ctx.lineWidth = 1.6; ctx.strokeStyle = '#111'; ctx.stroke(); }
    RL_STATE.raf = requestAnimationFrame(loop);
  };
  RL_STATE.raf = requestAnimationFrame(loop);
}
