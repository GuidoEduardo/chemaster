// Estudar → 📖 Grimório: junta todas as aulas numa trilha só, organizada por tópicos.
// - Traz as seções de "Por dentro do átomo" (atomlearn.js) e "Por que as coisas reagem?" (reactlearn.js)
//   como lições (ext), mostrando só a seção escolhida da página original.
// - Acrescenta um "como usar" (how) em cada lição interativa.
// - Define a ordem dos tópicos e reordena FL_LESSONS.

Object.assign(FL.pt, {
  tab: '📖 Grimório', title: 'Grimório: o porquê de tudo',
  lead: 'Todas as aulas do CheMaster, em ordem. Nada de decoreba: cada lição sai da anterior, e com <b>3 ideias simples</b> dá para entender por que a química é do jeito que é.',
});
Object.assign(FL.en, {
  tab: '📖 Grimoire', title: 'Grimoire: the why of everything',
  lead: 'All CheMaster lessons, in order. No memorizing: each lesson comes from the previous one, and with <b>3 simple ideas</b> you can understand why chemistry is the way it is.',
});
FL.pt.how = '👆 Como usar:'; FL.en.how = '👆 How to use:';

const GR_TRACKS = ['pieces', 'base', 'inorg', 'react', 'calc', 'phys', 'eq', 'echem', 'org', 'env', 'nuc', 'q1', 'q2', 'sm'];
FL.pt.tracks = { pieces: '🧱 O átomo e suas peças', base: '🧭 O porquê de tudo', inorg: '🧂 Funções inorgânicas', react: '⚗️ Por que as coisas reagem?', calc: '🧮 Estequiometria e soluções', phys: '💨 Gases, misturas e coligativas', eq: '⚖️ Energia e equilíbrio', echem: '🔋 Eletroquímica', org: '🌿 Química orgânica', env: '🌍 Química ambiental', nuc: '☢️ Núcleo e radioatividade', q1: FL.pt.tracks.q1, q2: FL.pt.tracks.q2, sm: FL.pt.tracks.sm };
FL.en.tracks = { pieces: '🧱 The atom and its parts', base: '🧭 The why of everything', inorg: '🧂 Inorganic functions', react: '⚗️ Why do things react?', calc: '🧮 Stoichiometry and solutions', phys: '💨 Gases, mixtures and colligative properties', eq: '⚖️ Energy and equilibrium', echem: '🔋 Electrochemistry', org: '🌿 Organic chemistry', env: '🌍 Environmental chemistry', nuc: '☢️ Nucleus and radioactivity', q1: FL.en.tracks.q1, q2: FL.en.tracks.q2, sm: FL.en.tracks.sm };
Object.assign(FL.pt.trackLead, {
  pieces: 'Comece aqui: prótons, nêutrons e elétrons, elementos, isótopos e íons.',
  base: 'O porquê de tudo, com as 3 ideias-mestras: do elétron preso ao núcleo até ácidos, pilhas e o mol.',
  react: 'Energia, ligações que quebram e se formam, água e óleo, sabão e a velocidade das reações.',
  nuc: 'Por que alguns núcleos se desfazem: decaimentos, meia-vida e a alquimia de verdade.',
  inorg: 'Ácidos, bases, sais e óxidos: reconhecer pela fórmula, montar sais e dar nome.',
  calc: 'As contas da química: proporção, reagente limitante, pureza, rendimento, concentração e diluição.',
  phys: 'Gases como bolinhas batendo, separação de misturas e por que o sal derrete o gelo.',
  eq: 'Lei de Hess, combustíveis, equilíbrio químico e o tampão do sangue.',
  echem: 'Nox, pilhas e eletrólise: elétrons descendo e subindo ladeiras.',
  org: 'Por que o carbono forma milhões de moléculas: cadeias, funções, isomeria, reações e plásticos.',
  env: 'Efeito estufa, chuva ácida e camada de ozônio, explicados pela química.',
});
Object.assign(FL.en.trackLead, {
  pieces: 'Start here: protons, neutrons and electrons, elements, isotopes and ions.',
  base: 'The why of everything, with the 3 master ideas: from the electron held by the nucleus to acids, batteries and the mole.',
  react: 'Energy, bonds breaking and forming, water and oil, soap and reaction speed.',
  nuc: 'Why some nuclei fall apart: decays, half-life and real alchemy.',
  inorg: 'Acids, bases, salts and oxides: spot them from the formula, build salts and name them.',
  calc: 'The math of chemistry: ratios, limiting reagent, purity, yield, concentration and dilution.',
  phys: 'Gases as bouncing balls, separating mixtures and why salt melts ice.',
  eq: 'Hess\'s law, fuels, chemical equilibrium and the blood buffer.',
  echem: 'Oxidation numbers, batteries and electrolysis: electrons going downhill and uphill.',
  org: 'Why carbon forms millions of molecules: chains, functions, isomerism, reactions and plastics.',
  env: 'Greenhouse effect, acid rain and the ozone layer, explained by chemistry.',
});

/* lições trazidas das páginas antigas: [id, ext, seção, trilha, ícone, ideia, título pt/en (chave em AL/RL), lead pt, lead en, so pt, so en] */
const GR_EXT = [
  ['a-parts', 'atom', 'parts', 'pieces', '🧩', 0, 's1', 'Prótons, nêutrons e elétrons: quem é quem e quanto pesa cada um.', 'Protons, neutrons and electrons: who is who and how much each weighs.',
    'cada peça tem um papel. A primeira delas, o <b>próton</b>, decide sozinha qual elemento o átomo é.', 'each part has a job. The first one, the <b>proton</b>, alone decides which element the atom is.'],
  ['a-protons', 'atom', 'protons', 'pieces', '🪪', 0, 's2', 'O número de prótons é o "RG" do elemento.', 'The number of protons is the element\'s "ID".',
    'mudar os prótons muda o elemento. E se mudarmos os <b>nêutrons</b>? O elemento continua o mesmo, mas vira outro <b>isótopo</b>.', 'changing the protons changes the element. What if we change the <b>neutrons</b>? The element stays the same, but becomes another <b>isotope</b>.'],
  ['a-isotopes', 'atom', 'isotopes', 'pieces', '⚖️', 0, 's4', 'Mesmo elemento, massas diferentes.', 'Same element, different masses.',
    'na natureza, cada elemento vem com seus isótopos misturados. Então qual massa aparece na tabela periódica?', 'in nature, each element comes with its isotopes mixed together. So which mass shows up on the periodic table?'],
  ['a-mass', 'atom', 'mass', 'pieces', '📊', 0, 's10', 'Por que a massa do cloro é 35,45 e não um número inteiro.', 'Why chlorine\'s mass is 35.45 and not a whole number.',
    'os nêutrons mudam a massa. E os <b>elétrons</b>? Ganhar ou perder elétrons não muda o elemento, mas muda a <b>carga</b>.', 'neutrons change the mass. And the <b>electrons</b>? Gaining or losing electrons does not change the element, but it changes the <b>charge</b>.'],
  ['a-ions', 'atom', 'ions', 'pieces', '⚡', 0, 's5', 'Ganhar ou perder elétrons muda a carga, não o elemento.', 'Gaining or losing electrons changes the charge, not the element.',
    'você já conhece as peças. Agora vem o porquê de tudo: por que o sódio <b>perde</b> e o cloro <b>ganha</b>? Tudo começa numa regra simples: <b>opostos se atraem</b>.', 'you know the parts now. Next comes the why of everything: why does sodium <b>lose</b> and chlorine <b>gain</b>? It all starts with one simple rule: <b>opposites attract</b>.'],
  ['r-energy', 'react', 'energy', 'react', '⛰️', 1, 's1', 'Por que algumas reações soltam calor, e por que quase todas precisam de um empurrão.', 'Why some reactions give off heat, and why almost all need a push.',
    'a energia que sai (ou entra) numa reação vem das <b>ligações</b>: quebrar custa, formar libera. Vamos fazer as contas.', 'the energy that comes out (or goes in) in a reaction comes from the <b>bonds</b>: breaking costs, forming releases. Let us do the math.'],
  ['r-bonds', 'react', 'bonds', 'react', '🔨', 1, 's2', 'De onde vem o calor de uma reação.', 'Where the heat of a reaction comes from.',
    'quanto mais fácil um átomo solta o elétron, mais violenta pode ser a reação. Os campeões disso são os <b>metais alcalinos</b>.', 'the more easily an atom lets go of its electron, the more violent the reaction can be. The champions are the <b>alkali metals</b>.'],
  ['r-alkali', 'react', 'alkali', 'react', '💥', 2, 's3', 'Lítio borbulha, césio explode. Por quê?', 'Lithium bubbles, caesium explodes. Why?',
    'nem tudo é reação: às vezes as moléculas só se misturam ou se separam. Por que água e óleo não se misturam?', 'not everything is a reaction: sometimes molecules just mix or separate. Why do water and oil not mix?'],
  ['r-polar', 'react', 'polar', 'react', '🫙', 0, 's4', 'Semelhante dissolve semelhante.', 'Like dissolves like.',
    'se água e óleo não se misturam, como o <b>sabão</b> consegue tirar a gordura?', 'if water and oil do not mix, how does <b>soap</b> remove grease?'],
  ['r-soap', 'react', 'soap', 'react', '🧼', 0, 's5', 'Uma molécula com duas pontas diferentes resolve o problema.', 'A molecule with two different ends solves the problem.',
    'falta uma peça: o que deixa uma reação <b>rápida ou lenta</b>?', 'one piece is missing: what makes a reaction <b>fast or slow</b>?'],
  ['r-speed', 'react', 'speed', 'react', '🏎️', 1, 's6', 'Temperatura, concentração, superfície e catalisador.', 'Temperature, concentration, surface and catalyst.',
    'você já sabe por que e quão rápido as coisas reagem. Agora, as contas: <b>quanto</b> de cada coisa usar e quanto produto sai. É a estequiometria.', 'you know why and how fast things react. Now the math: <b>how much</b> of each thing to use and how much product comes out. That is stoichiometry.'],
  ['n-stability', 'atom', 'stability', 'nuc', '🧲', 0, 's6', 'A briga entre a repulsão dos prótons e a força forte.', 'The fight between proton repulsion and the strong force.',
    'quando o núcleo é instável, ele se transforma soltando radiação. De que jeitos?', 'when a nucleus is unstable, it transforms by giving off radiation. In which ways?'],
  ['n-decay', 'atom', 'decay', 'nuc', '☢️', 1, 's7', 'Alfa, beta e gama: o que sai do núcleo e o que muda.', 'Alpha, beta and gamma: what leaves the nucleus and what changes.',
    'cada átomo instável decai num momento sorteado. Mas, com muitos átomos, dá para prever: é a <b>meia-vida</b>.', 'each unstable atom decays at a random moment. But with many atoms you can predict it: that is the <b>half-life</b>.'],
  ['n-halflife', 'atom', 'halflife', 'nuc', '⏳', 1, 's8', 'Ninguém sabe quando um átomo vai decair, mas metade decai sempre no mesmo tempo.', 'Nobody knows when one atom will decay, but half of them always decay in the same time.',
    'decaimento atrás de decaimento, um elemento pode virar outro várias vezes seguidas. É a alquimia de verdade.', 'decay after decay, one element can turn into another several times in a row. That is real alchemy.'],
  ['n-alchemy', 'atom', 'alchemy', 'nuc', '🪄', 1, 's9', 'O urânio vira chumbo sozinho, passo a passo.', 'Uranium turns into lead by itself, step by step.',
    'quem descobriu tudo isso, e para que usamos a radioatividade hoje?', 'who discovered all this, and what do we use radioactivity for today?'],
  ['n-history', 'atom', 'history', 'nuc', '📜', 0, 's11', 'Quem descobriu e para que serve a radioatividade.', 'Who discovered radioactivity and what it is used for.',
    'agora vamos olhar os <b>elétrons</b> de perto: o modelo quântico do átomo, o "endereço" de cada elétron e por que as camadas enchem do jeito que enchem.', 'now let us look at the <b>electrons</b> up close: the quantum model of the atom, each electron\'s "address" and why shells fill the way they do.'],
];
GR_EXT.forEach(([id, ext, sec, track, icon, m, key, lp, le, sp, se]) => {
  const src = ext === 'atom' ? AL : RL;
  FL_LESSONS.push({ id, ext, sec, track, icon, m, pt: { t: src.pt[key], lead: lp, so: sp, ui: {} }, en: { t: src.en[key], lead: le, so: se, ui: {} } });
});

/* "como usar" de cada lição interativa */
const GR_HOW = {
  attract: ['Toque em cada carga (A ou B) para trocar entre + e −. Depois arraste a barra de distância e veja a força mudar.', 'Tap each charge (A or B) to switch between + and −. Then drag the distance bar and watch the force change.'],
  nofall: ['Arraste a barra para apertar ou soltar a nuvem do elétron e acompanhe as curvas do gráfico. A linha preta (energia total) tem um ponto mais baixo: tente achá-lo, ou toque em "Deixar a natureza escolher".', 'Drag the bar to squeeze or loosen the electron cloud and follow the curves on the graph. The black line (total energy) has a lowest point: try to find it, or tap "Let nature choose".'],
  levels: ['Toque num degrau de cima para o elétron subir. Depois toque num degrau mais baixo: ele desce e solta luz. Cada cor que aparece fica marcada na barra do espectro, embaixo.', 'Tap a high step to lift the electron. Then tap a lower step: it drops and gives off light. Each color that shows up is marked on the spectrum bar below.'],
  shells: ['Use − / + ou arraste a barra para trocar de elemento (do 1 ao 20). Veja quantos elétrons ficam na última camada e o que o átomo tende a fazer.', 'Use − / + or drag the bar to change the element (1 to 20). See how many electrons are in the last shell and what the atom tends to do.'],
  pull: ['Mexa nas duas barras (carga que o elétron sente e camada) e veja a força da puxada mudar. Na tabela de baixo, troque o modo para comparar o nosso modelo simples com os dados reais.', 'Move the two bars (charge the electron feels and shell) and watch the pull change. In the table below, switch the mode to compare our simple model with real data.'],
  bond: ['Arraste a barra para aproximar ou afastar os dois átomos de hidrogênio e veja a energia no gráfico. Ou toque em "Soltar os átomos" e deixe eles acharem o fundo do vale sozinhos.', 'Drag the bar to bring the two hydrogen atoms closer or farther and watch the energy on the graph. Or tap "Let go of the atoms" and let them find the bottom of the valley.'],
  spectrum: ['Toque num exemplo pronto (como H–Cl ou Na–Cl) ou mexa nas duas barras de puxada. Veja o par de elétrons mudar de lugar e o tipo de ligação mudar junto.', 'Tap a ready example (like H–Cl or Na–Cl) or move the two pull bars. Watch the electron pair move and the bond type change with it.'],
  shape: ['Escolha quantos pares de elétrons ficam em volta do átomo central e quantos deles são livres. Arraste a molécula para girá-la em 3D.', 'Pick how many electron pairs surround the central atom and how many of them are lone pairs. Drag the molecule to spin it in 3D.'],
  polar: ['Escolha uma molécula e toque em "Somar as setas". Se as setas se cancelarem, ela é apolar; se sobrar uma seta, é polar.', 'Pick a molecule and tap "Add the arrows". If the arrows cancel out, it is nonpolar; if an arrow is left over, it is polar.'],
  boil: ['Arraste o termômetro de −200 °C até 120 °C e veja cada substância virar sólido, líquido ou gás.', 'Drag the thermometer from −200 °C to 120 °C and watch each substance turn solid, liquid or gas.'],
  acid: ['Toque numa substância para colocá-la na água. Veja se ela entrega ou pega H⁺, quantas de cada 100 moléculas fazem a troca e onde ela fica na escala de pH.', 'Tap a substance to put it in water. See whether it gives or takes H⁺, how many out of 100 molecules make the swap and where it sits on the pH scale.'],
  redox: ['Escolha uma placa de metal e o íon da solução e toque em "Mergulhar". Teste vários pares e descubra quem rouba elétrons de quem.', 'Pick a metal plate and the ion in the solution and tap "Dip". Try several pairs and find out who steals electrons from whom.'],
  mole: ['Escolha uma substância e arraste a barra para mudar quantos gramas tem na balança. Veja quantos mols e quantas partículas isso dá.', 'Pick a substance and drag the bar to change how many grams are on the scale. See how many moles and particles that is.'],
  qatom: ['Escolha um elemento (− / + ou a lista). Depois toque num subnível (1s, 2p…) para ver só a nuvem dele; "todos" volta a mostrar o átomo inteiro.', 'Pick an element (− / + or the list). Then tap a subshell (1s, 2p…) to see only its cloud; "all" shows the whole atom again.'],
  address: ['Escolha um elemento. Toque numa setinha ↑ ou ↓ dentro das caixinhas para ver os 4 números quânticos daquele elétron.', 'Pick an element. Tap an arrow ↑ or ↓ inside the boxes to see the 4 quantum numbers of that electron.'],
  pauling: ['Toque em "Encher um passo" para ir enchendo os subníveis na ordem das setas, ou arraste a barra para escolher direto quantos elétrons. "Encher tudo" vai até o fim; ↺ recomeça.', 'Tap "Fill one step" to fill the subshells in the order of the arrows, or drag the bar to pick the number of electrons. "Fill everything" goes to the end; ↺ starts over.'],
  ring: ['Arraste a barra para mudar quantas ondas cabem numa volta. Com número quebrado (2,6), a onda não fecha; com número inteiro (1, 2, 3…), fecha. O botão 🎯 pula para o inteiro mais próximo.', 'Drag the bar to change how many waves fit in one lap. With a fraction (2.6) the wave does not close; with a whole number (1, 2, 3…) it does. The 🎯 button jumps to the nearest whole number.'],
  cloud: ['Escolha um orbital e espere os pontos aparecerem (ou toque em "Rápido"). As linhas tracejadas marcam os nós, onde o elétron nunca aparece.', 'Pick an orbital and wait for the dots to appear (or tap "Fast"). The dashed lines mark the nodes, where the electron never shows up.'],
  box: ['Escolha o estado (n = 1 a 4) e arraste a barra para estreitar ou alargar a caixa. Compare o número de nós e a energia.', 'Pick the state (n = 1 to 4) and drag the bar to make the box narrower or wider. Compare the number of nodes and the energy.'],
  zoom: ['Toque em "Mais zoom" para descer um nível (ou toque direto num nível na fileira de cima). Cada nível mostra o tamanho e o que tem dentro.', 'Tap "Zoom in" to go down one level (or tap a level in the top row). Each level shows the size and what is inside.'],
  quarks: ['Toque nos cartões dos sabores para colocar quarks nos 3 espaços; toque num espaço para esvaziá-lo. Tente montar o próton (u, u, d) e o nêutron (u, d, d).', 'Tap the flavor cards to put quarks in the 3 slots; tap a slot to empty it. Try to build the proton (u, u, d) and the neutron (u, d, d).'],
  color: ['Parte 1: toque em cada quark para trocar a cor, até o centro ficar branco. Parte 2: arraste a barra "Puxar" até o fim e veja o que acontece com a corda.', 'Part 1: tap each quark to change its color until the center turns white. Part 2: drag the "Pull" bar all the way and see what happens to the string.'],
  leptons: ['Os múons (pontinhos roxos) caem do alto. Troque entre "Sem relatividade" e "Com relatividade" e compare quantos chegam ao chão. A porcentagem se estabiliza depois de alguns segundos.', 'Muons (purple dots) fall from the top. Switch between "Without relativity" and "With relativity" and compare how many reach the ground. The percentage settles after a few seconds.'],
  neutrino: ['Toque em "Decair 1 nêutron" para ver um decaimento. Depois toque em "Decair mais 200" e veja no gráfico que a energia do elétron muda a cada vez.', 'Tap "Decay 1 neutron" to watch one decay. Then tap "Decay 200 more" and see on the graph that the electron energy changes every time.'],
  model: ['Toque numa partícula para ver a ficha dela. Toque numa força (na fileira de cima) para acender só as partículas que a sentem.', 'Tap a particle to see its card. Tap a force (in the top row) to light up only the particles that feel it.'],
};
FL_LESSONS.forEach(l => { const h = GR_HOW[l.id]; if (h) { l.pt.how = h[0]; l.en.how = h[1]; } });

// ordem final: por tópico (dentro de cada tópico, a ordem em que foram declaradas)
const GR_ORD = new Map(FL_LESSONS.map((l, i) => [l, i]));
FL_LESSONS.sort((a, b) => GR_TRACKS.indexOf(a.track) - GR_TRACKS.indexOf(b.track) || GR_ORD.get(a) - GR_ORD.get(b));
