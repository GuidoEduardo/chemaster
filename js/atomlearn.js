// Estudar → "Por dentro do átomo": explicações ilustradas e interativas sobre prótons, nêutrons,
// elétrons, camadas, isótopos, íons, estabilidade, radioatividade e meia-vida.
// Usa miniAtom / nucInfo / isoName / decayTo / halfLife / shellsOf / chargeTxt de nuclear.js.

// isótopo mais comum de cada elemento leve (para desenhar)
const COMMON_A = [0, 1, 4, 7, 9, 11, 12, 14, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 40, 39, 40];
const AL_STATE = { timers: [] };
function atomLearnStop() { AL_STATE.timers.forEach(clearInterval); AL_STATE.timers = []; }

const AL = {
  pt: {
    tabTable: '📋 Tabela', tabAtom: '⚛️ Por dentro do átomo',
    title: 'Por dentro do átomo',
    lead: 'O que tem dentro de um átomo, por que alguns são radioativos e como um elemento vira outro. Mexa em tudo: quase todo desenho aqui é interativo! 👆',
    toc: 'Nesta página',
    quick: 'Teste rápido', right: 'Isso! ', wrongA: 'Quase! ',
    s1: 'As 3 peças do átomo',
    s1t: 'Todo átomo, de qualquer elemento, é feito de só três tipos de partícula. Prótons e nêutrons ficam bem juntinhos no centro, o <b>núcleo</b>. Os elétrons ficam em volta, numa região chamada <b>eletrosfera</b>. <b>Toque numa partícula</b> para achá-la no desenho.',
    parts: [
      ['p', 'Próton', 'carga +', 'Fica no núcleo. <b>Define qual é o elemento.</b>'],
      ['n', 'Nêutron', 'sem carga', 'Fica no núcleo. É a "cola" do núcleo. <b>Define o isótopo.</b>'],
      ['e', 'Elétron', 'carga −', 'Fica em volta. <b>Define se é íon</b> e faz as ligações químicas.'],
    ],
    massT: 'Quanto pesa cada um? (em "elétrons")',
    massRows: [['Próton', '1.836'], ['Nêutron', '1.839'], ['Elétron', '1']],
    massN: 'Um próton pesa quase <b>2 mil elétrons</b>. Por isso quase toda a massa do átomo está no núcleo, e os elétrons praticamente não contam na massa.',
    scale: '🏟️ Se o átomo fosse um estádio de futebol, o núcleo seria uma ervilha no meio do campo, e a nuvem dos elétrons ocuparia o estádio inteiro, até as arquibancadas. Ou seja: o átomo é quase todo <b>espaço vazio</b>!',
    quarks: '🔬 E dá para dividir mais? Prótons e nêutrons são feitos de partículas ainda menores, os <b>quarks</b> (3 em cada). Os elétrons, até onde se sabe, não se dividem.',
    s2: 'Prótons: a identidade do elemento',
    s2t: 'O número de prótons é o <b>número atômico (Z)</b>, o "RG" do elemento. Todo átomo com 6 prótons é carbono; com 79, é ouro. <b>Mudou o número de prótons, mudou o elemento.</b> Teste aqui:',
    s2w: (z, n) => `<b>${z}</b> próton${z > 1 ? 's' : ''} = <b>${n}</b>`,
    s2n: 'Repare: o átomo neutro tem o mesmo número de elétrons e de prótons. A tabela periódica é exatamente essa lista, em ordem de prótons: 1, 2, 3… até 118. (O desenho aparece até o cálcio; depois o núcleo fica grande demais para desenhar.)',
    q2: ['Um átomo tem 8 prótons, 9 nêutrons e 8 elétrons. Que elemento é?', ['Oxigênio', 'Flúor', 'Nitrogênio'], 0, 'Quem decide é o número de prótons: 8 = oxigênio. Os 9 nêutrons só mudam o isótopo (oxigênio-17).'],
    s3: 'Camadas de elétrons',
    s3t: 'Os elétrons não ficam de qualquer jeito: eles se organizam em <b>camadas</b> (K, L, M, N…), cada vez mais longe do núcleo. A primeira cabe só 2; as seguintes, 8 (no modelo simples, que funciona até o cálcio).',
    s3pick: 'Elemento:',
    s3val: (v, g) => `Elétrons na última camada (<b>valência</b>): <b>${v}</b>${g ? ` · ele fica no grupo ${g}` : ''}`,
    s3n: [
      'São os elétrons da <b>última camada</b> que participam das reações. Por isso elementos da mesma coluna, com a mesma valência, se comportam parecido.',
      'Os gases nobres têm a última camada <b>cheia</b>. É por isso que quase não reagem.',
      'Os outros átomos "querem" ficar como um gás nobre, com 8 na última camada: é a <b>regra do octeto</b>.',
    ],
    s4: 'Nêutrons: os isótopos',
    s4t: 'Átomos do mesmo elemento podem ter números de nêutrons diferentes. Cada versão é um <b>isótopo</b>. Eles reagem praticamente igual, mas têm massas diferentes, e alguns são radioativos. Monte isótopos:',
    s4f: '<b>Número de massa (A) = prótons + nêutrons.</b> É o número que vem no nome: urânio-235 = 92 prótons + 143 nêutrons.',
    s4h: 'Só o hidrogênio tem nomes especiais (prótio, deutério e trítio). Os outros usam o número de massa: carbono-14, urânio-238…',
    st: { stable: 'estável', radio: 'radioativo', unbound: 'não existe' },
    s4info: { stable: 'Estável: essa combinação dura para sempre.', unbound: 'Não existe: o núcleo se desfaz na mesma hora.', radio: (h, d, to) => `Radioativo, ${h}. Decai por ${d} e vira ${to}.` },
    halfOf: h => `meia-vida de ${h}`, halfShort: 'meia-vida curta',
    dl: { a: 'alfa (α)', 'b-': 'beta menos (β⁻)', 'b+': 'beta mais (β⁺)', g: 'gama (γ)' },
    q4: ['O que o carbono-12 e o carbono-14 têm de diferente?', ['O número de nêutrons', 'O número de prótons', 'O número de elétrons'], 0, 'Os dois têm 6 prótons (são carbono). O 14 tem 8 nêutrons e o 12 tem 6.'],
    s5: 'Elétrons: os íons',
    s5t: 'Um átomo <b>neutro</b> tem elétrons = prótons e as cargas se cancelam. Mas ele pode ganhar ou perder elétrons e virar um <b>íon</b>, sem deixar de ser o mesmo elemento. <b>Carga = prótons − elétrons.</b>',
    s5pick: 'Elemento:',
    neutral: 'átomo neutro', cation: 'cátion (+)', anion: 'ânion (−)',
    s5noble: n => `✨ Com essa quantidade de elétrons, ele fica igual ao <b>${n}</b> (gás nobre): é por isso que esse íon é tão comum!`,
    s5why: 'Por que os átomos fazem isso? Para ficar com a última camada completa, como um gás nobre. O sódio tem 1 elétron sobrando: é mais fácil <b>perder</b> 1 do que ganhar 7. O cloro tem 7: é mais fácil <b>ganhar</b> 1.',
    s5play: '▶ Ver o sódio dar o elétron ao cloro', s5again: '↺ De novo',
    nacl: 'O sódio <b>dá</b> o elétron, os dois viram íons de cargas opostas e se atraem como ímãs: é a <b>ligação iônica</b> do sal de cozinha (NaCl).',
    q5: ['O íon Mg²⁺ tem 12 prótons. Quantos elétrons ele tem?', ['10', '12', '14'], 0, 'Carga +2 = perdeu 2 elétrons: 12 − 2 = 10.'],
    s6: 'Por que alguns núcleos são instáveis?',
    forces: [['⚡ Repulsão', 'Os prótons têm carga + e se empurram. Quanto mais prótons, mais forte o empurrão.'], ['🧲 Força forte', 'Uma força fortíssima, mas de curtíssimo alcance, cola prótons e nêutrons.']],
    s6t: 'Os nêutrons ajudam a colar <b>sem</b> aumentar a repulsão. Com nêutrons de menos ou demais, o equilíbrio falha e o núcleo se desfaz: é a <b>radioatividade</b>.',
    s6map: 'Mapa dos núcleos: cada quadradinho é um isótopo (prótons ↑, nêutrons →). Toque para ver.',
    s6tap: 'Toque num quadradinho do mapa.',
    s6n: [
      'Veja a faixa verde: nos átomos leves ela segue a diagonal <b>nêutrons ≈ prótons</b>. Os pesados precisam de bem mais nêutrons: o chumbo-208 tem 82 prótons e 126 nêutrons.',
      'Números <b>pares</b> de prótons e nêutrons são mais estáveis (eles formam pares).',
      'Depois do chumbo (82), <b>nenhum</b> elemento tem isótopo estável. No meio da tabela, o tecnécio (43) e o promécio (61) também não.',
    ],
    s7: 'Os tipos de decaimento',
    s7t: 'Quando o núcleo é instável, ele se transforma soltando radiação. Escolha um núcleo e aplique decaimentos para ver as regras na prática:',
    decays: [
      ['a', 'α', 'Alfa', 'Sai um pacote de 2 prótons + 2 nêutrons (um núcleo de hélio). Z cai 2, A cai 4.'],
      ['b-', 'β⁻', 'Beta menos', 'Um nêutron vira próton e solta um elétron (e um antineutrino). Z sobe 1, A igual.'],
      ['b+', 'β⁺', 'Beta mais', 'Um próton vira nêutron e solta um pósitron (um "elétron positivo") e um neutrino. Z desce 1, A igual.'],
      ['g', 'γ', 'Gama', 'Só sai energia (luz fortíssima). Z e A não mudam: o núcleo só fica mais calmo.'],
    ],
    s7real: x => `Na natureza, esse núcleo decai por <b>${x}</b>.`, s7stable: 'Esse núcleo é estável: na natureza, ele não decai.', s7none: 'Esse núcleo não existe na natureza.',
    s7reset: '↺ Voltar ao início',
    s7pen: 'O que cada radiação atravessa?',
    pen: [['α', 'Para numa folha de papel (e até na pele).'], ['β', 'Atravessa papel, para numa placa fina de alumínio.'], ['γ', 'Atravessa quase tudo: precisa de chumbo ou concreto grosso.']],
    penW: ['papel', 'alumínio', 'chumbo'],
    s7fis: '✂️ <b>Fissão:</b> núcleos muito pesados, como o urânio-235, podem se partir em dois pedaços sorteados (ex.: bário + criptônio) e soltar nêutrons, que partem outros núcleos: a <b>reação em cadeia</b> das usinas.',
    s7fus: '☀️ <b>Fusão:</b> o contrário. Núcleos pequenos se juntam. É o que o Sol faz, transformando hidrogênio em hélio.',
    q7: ['O urânio-238 (Z = 92) solta uma partícula alfa. Vira…', ['Tório-234 (Z = 90)', 'Protactínio-238 (Z = 91)', 'Urânio-234 (Z = 92)'], 0, 'Alfa leva 2 prótons e 2 nêutrons: Z 92 → 90 e A 238 → 234.'],
    s8: 'Meia-vida',
    s8t: 'Não dá para saber quando <i>um</i> átomo vai decair: é sorte. Mas com muitos átomos dá para saber quanto tempo leva para <b>metade</b> deles decair: a <b>meia-vida</b>. Rode a simulação com 100 átomos:',
    s8go: '▶ Simular', s8stop: '⏸ Pausar', s8reset: '↺',
    s8left: 'restam', s8time: 'tempo', s8hl: 'meias-vidas',
    s8n: 'Repare: depois de 1 meia-vida sobram ~50; depois de 2, ~25; depois de 3, ~12. Nunca é exato, porque cada átomo "tira a sorte". A linha tracejada é o valor ideal.',
    s8c14: '🦴 <b>Como funciona a datação:</b> todo ser vivo absorve carbono-14 enquanto está vivo. Quando morre, para de absorver, e o carbono-14 vai sumindo. Medindo quanto sobrou, dá para saber a idade: se sobrou metade, ele morreu há uns 5.730 anos.',
    s9: 'A alquimia de verdade',
    s9t: 'Os alquimistas queriam transformar um elemento em outro, e isso acontece de verdade, só que no núcleo. O urânio-238 vai decaindo sozinho, passo a passo, até virar chumbo. Ande pela cadeia:',
    s9next: 'Próximo passo ▶', s9reset: '↺ Recomeçar', s9end: '🏁 Chegou no chumbo-206, que é estável. Fim da linha!',
    s9step: (a, b, d) => `<b>${a}</b> → <b>${b}</b> por ${d}`,
    s9n: [
      'É por isso que existe <b>radônio</b> nos porões: ele é um passo dessa cadeia, saindo do urânio das rochas.',
      'Fazer ouro também dá, num acelerador de partículas. Em 1980 transformaram bismuto em ouro, mas foram só alguns átomos, a um custo muito maior que o do ouro.',
      'Numa reação química comum isso <b>nunca</b> acontece: as reações só mexem nos elétrons.',
    ],
    s10: 'A massa da tabela é uma média',
    s10t: 'O cloro aparece na tabela com massa 35,45 porque a natureza mistura dois isótopos. Arraste para mudar a mistura:',
    s10real: 'Usar a mistura da natureza', s10avg: 'Massa média',
    s11: 'História, usos e curiosidades',
    hist: [
      ['1896', 'Henri Becquerel percebe que sais de urânio marcam filmes fotográficos no escuro: a radioatividade é descoberta.'],
      ['1898', 'Marie e Pierre Curie descobrem o polônio e o rádio. Marie é a única pessoa com Nobel em duas ciências diferentes (Física e Química).'],
      ['1911', 'Ernest Rutherford descobre que o átomo tem um núcleo pequeno e denso.'],
      ['1932', 'James Chadwick descobre o nêutron.'],
    ],
    uses: [
      ['🏥', 'Medicina', 'O flúor-18 é usado em exames PET; o iodo-131 trata a tireoide; o cobalto-60 é usado contra o câncer.'],
      ['⚡', 'Energia', 'Usinas nucleares usam a fissão do urânio-235 para ferver água e gerar eletricidade.'],
      ['🦴', 'Arqueologia', 'O carbono-14 data ossos, madeira e tecidos de até uns 50 mil anos.'],
      ['🚨', 'Segurança', 'Muitos detectores de fumaça usam um pouquinho de amerício-241.'],
    ],
    facts: [
      '🍌 Bananas têm um pouquinho de potássio-40, que é radioativo. Seu corpo também tem, e não há problema nenhum nisso.',
      '💧 A "água pesada" é feita com deutério no lugar do hidrogênio comum.',
      '⏳ O bismuto-209 é radioativo, mas a meia-vida dele é 1 bilhão de vezes a idade do universo.',
      '🌍 O calor de dentro da Terra vem, em boa parte, do decaimento de urânio, tório e potássio-40.',
    ],
    ctaTitle: 'Agora é com você!', ctaLab: '🔬 Monte átomos no simulador', ctaGames: 'Jogos para treinar:',
  },
  en: {
    tabTable: '📋 Table', tabAtom: '⚛️ Inside the atom',
    title: 'Inside the atom',
    lead: 'What is inside an atom, why some are radioactive and how one element turns into another. Play with everything: almost every drawing here is interactive! 👆',
    toc: 'On this page',
    quick: 'Quick check', right: 'Yes! ', wrongA: 'Almost! ',
    s1: 'The 3 parts of an atom',
    s1t: 'Every atom, of any element, is made of just three kinds of particle. Protons and neutrons are packed in the center, the <b>nucleus</b>. Electrons move around it, in the <b>electron cloud</b>. <b>Tap a particle</b> to find it in the drawing.',
    parts: [
      ['p', 'Proton', 'charge +', 'In the nucleus. <b>Decides which element it is.</b>'],
      ['n', 'Neutron', 'no charge', 'In the nucleus. The nucleus "glue". <b>Decides the isotope.</b>'],
      ['e', 'Electron', 'charge −', 'Around the nucleus. <b>Decides if it is an ion</b> and makes chemical bonds.'],
    ],
    massT: 'How much does each one weigh? (in "electrons")',
    massRows: [['Proton', '1,836'], ['Neutron', '1,839'], ['Electron', '1']],
    massN: 'A proton weighs almost <b>2,000 electrons</b>. That is why nearly all of an atom\'s mass is in the nucleus, and electrons barely count.',
    scale: '🏟️ If an atom were a football stadium, the nucleus would be a pea in the middle of the field, and the electron cloud would fill the whole stadium, up to the stands. So an atom is almost all <b>empty space</b>!',
    quarks: '🔬 Can you split them further? Protons and neutrons are made of even smaller particles, <b>quarks</b> (3 in each). Electrons, as far as we know, cannot be split.',
    s2: 'Protons: the element\'s identity',
    s2t: 'The number of protons is the <b>atomic number (Z)</b>, the element\'s ID. Every atom with 6 protons is carbon; with 79, it is gold. <b>Change the protons and you change the element.</b> Try it:',
    s2w: (z, n) => `<b>${z}</b> proton${z > 1 ? 's' : ''} = <b>${n}</b>`,
    s2n: 'Notice: a neutral atom has as many electrons as protons. The periodic table is exactly this list, in order of protons: 1, 2, 3… up to 118. (The drawing goes up to calcium; after that the nucleus is too big to draw.)',
    q2: ['An atom has 8 protons, 9 neutrons and 8 electrons. Which element is it?', ['Oxygen', 'Fluorine', 'Nitrogen'], 0, 'The proton count decides: 8 = oxygen. The 9 neutrons only change the isotope (oxygen-17).'],
    s3: 'Electron shells',
    s3t: 'Electrons are not scattered randomly: they organize into <b>shells</b> (K, L, M, N…), each farther from the nucleus. The first holds only 2; the next ones, 8 (in the simple model, which works up to calcium).',
    s3pick: 'Element:',
    s3val: (v, g) => `Electrons in the outer shell (<b>valence</b>): <b>${v}</b>${g ? ` · it is in group ${g}` : ''}`,
    s3n: [
      'The <b>outer-shell</b> electrons are the ones that take part in reactions. That is why elements in the same column, with the same valence, behave alike.',
      'Noble gases have a <b>full</b> outer shell. That is why they barely react.',
      'Other atoms "want" to look like a noble gas, with 8 in the outer shell: the <b>octet rule</b>.',
    ],
    s4: 'Neutrons: the isotopes',
    s4t: 'Atoms of the same element can have different numbers of neutrons. Each version is an <b>isotope</b>. They react almost the same, but have different masses, and some are radioactive. Build isotopes:',
    s4f: '<b>Mass number (A) = protons + neutrons.</b> It is the number in the name: uranium-235 = 92 protons + 143 neutrons.',
    s4h: 'Only hydrogen has special names (protium, deuterium and tritium). The rest use the mass number: carbon-14, uranium-238…',
    st: { stable: 'stable', radio: 'radioactive', unbound: 'can\'t exist' },
    s4info: { stable: 'Stable: this combination lasts forever.', unbound: 'Can\'t exist: the nucleus falls apart instantly.', radio: (h, d, to) => `Radioactive, ${h}. It decays by ${d} and becomes ${to}.` },
    halfOf: h => `half-life of ${h}`, halfShort: 'short half-life',
    dl: { a: 'alpha (α)', 'b-': 'beta minus (β⁻)', 'b+': 'beta plus (β⁺)', g: 'gamma (γ)' },
    q4: ['What is different between carbon-12 and carbon-14?', ['The number of neutrons', 'The number of protons', 'The number of electrons'], 0, 'Both have 6 protons (they are carbon). Carbon-14 has 8 neutrons and carbon-12 has 6.'],
    s5: 'Electrons: the ions',
    s5t: 'A <b>neutral</b> atom has electrons = protons, so the charges cancel out. But it can gain or lose electrons and become an <b>ion</b>, while staying the same element. <b>Charge = protons − electrons.</b>',
    s5pick: 'Element:',
    neutral: 'neutral atom', cation: 'cation (+)', anion: 'anion (−)',
    s5noble: n => `✨ With this many electrons it looks just like <b>${n}</b> (a noble gas): that is why this ion is so common!`,
    s5why: 'Why do atoms do this? To end up with a full outer shell, like a noble gas. Sodium has 1 electron to spare: it is easier to <b>lose</b> 1 than gain 7. Chlorine has 7: it is easier to <b>gain</b> 1.',
    s5play: '▶ Watch sodium give its electron to chlorine', s5again: '↺ Again',
    nacl: 'Sodium <b>gives</b> its electron away, both become ions with opposite charges and attract like magnets: that is the <b>ionic bond</b> in table salt (NaCl).',
    q5: ['The Mg²⁺ ion has 12 protons. How many electrons does it have?', ['10', '12', '14'], 0, 'Charge +2 = it lost 2 electrons: 12 − 2 = 10.'],
    s6: 'Why are some nuclei unstable?',
    forces: [['⚡ Repulsion', 'Protons have a + charge and push each other away. More protons, stronger push.'], ['🧲 Strong force', 'A super strong but super short-range force glues protons and neutrons.']],
    s6t: 'Neutrons help glue things <b>without</b> adding repulsion. With too few or too many, the balance breaks and the nucleus falls apart: that is <b>radioactivity</b>.',
    s6map: 'Map of nuclei: every square is an isotope (protons ↑, neutrons →). Tap one.',
    s6tap: 'Tap a square on the map.',
    s6n: [
      'See the green band: in light atoms it follows the diagonal <b>neutrons ≈ protons</b>. Heavy ones need many more neutrons: lead-208 has 82 protons and 126 neutrons.',
      '<b>Even</b> numbers of protons and neutrons are more stable (they pair up).',
      'After lead (82), <b>no</b> element has a stable isotope. In the middle of the table, technetium (43) and promethium (61) have none either.',
    ],
    s7: 'Types of decay',
    s7t: 'When a nucleus is unstable, it transforms by giving off radiation. Pick a nucleus and apply decays to see the rules in action:',
    decays: [
      ['a', 'α', 'Alpha', 'A packet of 2 protons + 2 neutrons (a helium nucleus) leaves. Z drops 2, A drops 4.'],
      ['b-', 'β⁻', 'Beta minus', 'A neutron turns into a proton and an electron (plus an antineutrino) leaves. Z goes up 1, A stays.'],
      ['b+', 'β⁺', 'Beta plus', 'A proton turns into a neutron and a positron (a "positive electron") plus a neutrino leave. Z goes down 1, A stays.'],
      ['g', 'γ', 'Gamma', 'Only energy leaves (super strong light). Z and A stay the same: the nucleus just calms down.'],
    ],
    s7real: x => `In nature, this nucleus decays by <b>${x}</b>.`, s7stable: 'This nucleus is stable: in nature, it does not decay.', s7none: 'This nucleus does not exist in nature.',
    s7reset: '↺ Back to start',
    s7pen: 'What can each kind of radiation get through?',
    pen: [['α', 'Stopped by a sheet of paper (even by skin).'], ['β', 'Goes through paper, stopped by thin aluminium.'], ['γ', 'Goes through almost anything: needs lead or thick concrete.']],
    penW: ['paper', 'aluminium', 'lead'],
    s7fis: '✂️ <b>Fission:</b> very heavy nuclei, like uranium-235, can split into two random pieces (e.g. barium + krypton) and release neutrons that split more nuclei: the <b>chain reaction</b> in power plants.',
    s7fus: '☀️ <b>Fusion:</b> the opposite. Small nuclei join together. That is what the Sun does, turning hydrogen into helium.',
    q7: ['Uranium-238 (Z = 92) gives off an alpha particle. It becomes…', ['Thorium-234 (Z = 90)', 'Protactinium-238 (Z = 91)', 'Uranium-234 (Z = 92)'], 0, 'Alpha takes 2 protons and 2 neutrons: Z 92 → 90 and A 238 → 234.'],
    s8: 'Half-life',
    s8t: 'You cannot know when <i>one</i> atom will decay: it is pure chance. But with many atoms you can know how long it takes for <b>half</b> of them to decay: the <b>half-life</b>. Run the simulation with 100 atoms:',
    s8go: '▶ Simulate', s8stop: '⏸ Pause', s8reset: '↺',
    s8left: 'left', s8time: 'time', s8hl: 'half-lives',
    s8n: 'Notice: after 1 half-life about 50 are left; after 2, about 25; after 3, about 12. It is never exact, because each atom "rolls the dice". The dashed line is the ideal value.',
    s8c14: '🦴 <b>How dating works:</b> every living thing takes in carbon-14 while it is alive. When it dies, it stops, and the carbon-14 slowly disappears. Measure how much is left and you get the age: if half is left, it died about 5,730 years ago.',
    s9: 'Real alchemy',
    s9t: 'Alchemists wanted to turn one element into another, and it really happens, inside the nucleus. Uranium-238 decays on its own, step by step, until it becomes lead. Walk the chain:',
    s9next: 'Next step ▶', s9reset: '↺ Restart', s9end: '🏁 It reached lead-206, which is stable. End of the line!',
    s9step: (a, b, d) => `<b>${a}</b> → <b>${b}</b> by ${d}`,
    s9n: [
      'That is why there is <b>radon</b> in basements: it is one step of this chain, coming from uranium in rocks.',
      'Making gold is possible too, in a particle accelerator. In 1980 bismuth was turned into gold, but only a few atoms, at a cost far above the gold itself.',
      'An ordinary chemical reaction <b>never</b> does this: reactions only move electrons around.',
    ],
    s10: 'The mass on the table is an average',
    s10t: 'Chlorine shows a mass of 35.45 on the table because nature mixes two isotopes. Drag to change the mix:',
    s10real: 'Use nature\'s mix', s10avg: 'Average mass',
    s11: 'History, uses and fun facts',
    hist: [
      ['1896', 'Henri Becquerel notices uranium salts fog photographic film in the dark: radioactivity is discovered.'],
      ['1898', 'Marie and Pierre Curie discover polonium and radium. Marie is the only person with Nobel Prizes in two different sciences (Physics and Chemistry).'],
      ['1911', 'Ernest Rutherford finds that the atom has a tiny, dense nucleus.'],
      ['1932', 'James Chadwick discovers the neutron.'],
    ],
    uses: [
      ['🏥', 'Medicine', 'Fluorine-18 is used in PET scans; iodine-131 treats the thyroid; cobalt-60 is used against cancer.'],
      ['⚡', 'Energy', 'Nuclear power plants use uranium-235 fission to boil water and make electricity.'],
      ['🦴', 'Archaeology', 'Carbon-14 dates bones, wood and fabric up to about 50,000 years old.'],
      ['🚨', 'Safety', 'Many smoke detectors use a tiny bit of americium-241.'],
    ],
    facts: [
      '🍌 Bananas contain a tiny bit of potassium-40, which is radioactive. So does your body, and that is perfectly fine.',
      '💧 "Heavy water" uses deuterium instead of ordinary hydrogen.',
      '⏳ Bismuth-209 is radioactive, but its half-life is a billion times the age of the universe.',
      '🌍 Much of the heat inside the Earth comes from uranium, thorium and potassium-40 decaying.',
    ],
    ctaTitle: 'Your turn!', ctaLab: '🔬 Build atoms in the simulator', ctaGames: 'Games to practice:',
  },
};

/* ---------- pedacinhos ---------- */
const alT = () => AL[LANG] || AL.pt;
const alEl = z => ELEMENTS[z - 1];
const alNum = (x, d = 2) => x.toLocaleString(LANG === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const alQuick = (id, q) => `<div class="al-quiz" data-q="${id}"><b>✏️ ${alT().quick}</b><p>${q[0]}</p>
  <div class="al-qopts">${q[1].map((o, i) => `<button data-i="${i}">${o}</button>`).join('')}</div><div class="al-qfb"></div></div>`;
const alTile = (z, a, q = 0) => { const e = alEl(z); return `<div class="al-tile big" style="--c:${CATS[e.cat].color}"><small>${a || z}</small>${a ? `<em>${z}</em>` : ''}<b>${e.sym}</b>${q ? `<i>${chargeTxt(q)}</i>` : ''}<span>${e.name}</span></div>`; };
const stChip = k => `<span class="al-st ${k}">${{ stable: '✅', radio: '☢️', unbound: '💥' }[k] || ''} ${alT().st[k] || ''}</span>`;
const alElOpts = (list, cur) => list.map(z => `<option value="${z}" ${z === cur ? 'selected' : ''}>${alEl(z).sym} · ${alEl(z).name}</option>`).join('');
const AL_STARTS = [[6, 14], [6, 11], [92, 238], [19, 40], [1, 3], [8, 16]];
const AL_CHAIN = [[92, 238, 'a'], [90, 234, 'b-'], [91, 234, 'b-'], [92, 234, 'a'], [90, 230, 'a'], [88, 226, 'a'], [86, 222, 'a'], [84, 218, 'a'], [82, 214, 'b-'], [83, 214, 'b-'], [84, 214, 'a'], [82, 210, 'b-'], [83, 210, 'b-'], [84, 210, 'a'], [82, 206, null]];

function atomLearnHtml() {
  const T = alT();
  const secs = [];
  const sec = (id, title, body) => { secs.push([id, title]); return `<section class="al-sec" id="al-${id}"><h2><span class="al-n">${secs.length}</span>${title}</h2>${body}</section>`; };

  const s1 = sec('parts', T.s1, `<div class="al-row"><div class="al-big" id="alBig">${miniAtom(3, 4, 3, { size: 200 })}</div>
    <div class="al-col"><p>${T.s1t}</p>
      <div class="al-parts">${T.parts.map(([k, n, c, d]) => `<button class="al-part ${k}" data-k="${k}"><i></i><div><b>${n}</b> <small>${c}</small><p>${d}</p></div></button>`).join('')}</div>
    </div></div>
    <h3 class="al-h3">${T.massT}</h3>
    <div class="al-mass">${T.massRows.map(([n, v], i) => `<div><span>${n}</span><div class="al-mbar"><i class="${['p', 'n', 'e'][i]}" style="width:${i === 2 ? 0.6 : i === 1 ? 100 : 99.8}%"></i></div><b>${v}</b></div>`).join('')}</div>
    <p>${T.massN}</p><p class="al-note">${T.scale}</p><p class="al-note blue">${T.quarks}</p>`);

  const s2 = sec('protons', T.s2, `<p>${T.s2t}</p>
    <div class="al-play" id="alZ">
      <div class="al-ctl"><button data-d="-1">−</button><input type="range" min="1" max="118" value="6" id="alZr"><button data-d="1">+</button></div>
      <div class="al-out" id="alZout"></div>
    </div><p>${T.s2n}</p>${alQuick('q2', T.q2)}`);

  const s3 = sec('shells', T.s3, `<p>${T.s3t}</p>
    <div class="al-play" id="alSh"><div class="al-ctl"><label>${T.s3pick}</label><input type="range" min="1" max="20" value="11" id="alShr"><b id="alShName"></b></div>
      <div class="al-out" id="alShOut"></div></div>
    <ul class="al-list">${T.s3n.map(x => `<li>${x}</li>`).join('')}</ul>`);

  const s4 = sec('isotopes', T.s4, `<p>${T.s4t}</p>
    <div class="al-play" id="alIso">
      <div class="al-ctl"><label>${T.s5pick}</label><select id="alIsoEl">${alElOpts(Array.from({ length: 20 }, (_, i) => i + 1), 6)}</select>
        <span class="al-step"><button data-d="-1">− n</button><span id="alIsoN"></span><button data-d="1">+ n</button></span></div>
      <div class="al-out" id="alIsoOut"></div>
    </div>
    <p class="al-formula">${T.s4f}</p><p>${T.s4h}</p>
    <div class="al-figs">${[1, 2, 3].map(a => `<figure class="al-fig">${miniAtom(1, a - 1, 1, { size: 110 })}<figcaption><b>${isoName(1, a, LANG)}</b><small>1p · ${a - 1}n</small></figcaption></figure>`).join('')}</div>
    ${alQuick('q4', T.q4)}`);

  const ionEls = [3, 7, 8, 9, 11, 12, 13, 15, 16, 17, 19, 20];
  const s5 = sec('ions', T.s5, `<p>${T.s5t}</p>
    <div class="al-play" id="alIon">
      <div class="al-ctl"><label>${T.s5pick}</label><select id="alIonEl">${alElOpts(ionEls, 11)}</select>
        <span class="al-step"><button data-d="-1">− e⁻</button><span id="alIonE"></span><button data-d="1">+ e⁻</button></span></div>
      <div class="al-out" id="alIonOut"></div>
    </div>
    <p>${T.s5why}</p>
    <div class="al-nacl" id="alNacl">
      <figure class="al-fig" id="naFig">${miniAtom(11, 12, 11, { size: 110 })}<figcaption><b>Na</b><small>11p · 11e</small></figcaption></figure>
      <div class="al-track"><span class="al-flyE"></span></div>
      <figure class="al-fig" id="clFig">${miniAtom(17, 18, 17, { size: 110 })}<figcaption><b>Cl</b><small>17p · 17e</small></figcaption></figure>
      <span class="al-heart">🧲</span>
    </div>
    <div class="al-center"><button class="btn-y" id="alNaclGo">${T.s5play}</button></div>
    <p>${T.nacl}</p>${alQuick('q5', T.q5)}`);

  let map = '<div class="al-map-wrap"><div class="al-map">';
  for (let z = 20; z >= 1; z--) {
    map += `<span class="al-mz">${alEl(z).sym}</span>`;
    for (let n = 0; n <= 28; n++) map += `<button class="al-mc ${nucInfo(z, z + n).kind}" data-z="${z}" data-a="${z + n}" title="${isoName(z, z + n, LANG)}"></button>`;
  }
  map += `<span></span>${Array.from({ length: 29 }, (_, n) => `<span class="al-mn">${n % 4 === 0 ? n : ''}</span>`).join('')}</div></div>`;
  const s6 = sec('stability', T.s6, `<div class="al-forces">${T.forces.map(([h, d]) => `<div><b>${h}</b><p>${d}</p></div>`).join('')}</div>
    <p>${T.s6t}</p><p class="al-sub">${T.s6map}</p>${map}
    <div class="al-legend">${['stable', 'radio', 'unbound'].map(stChip).join('')}</div>
    <div class="al-mapinfo" id="alMapInfo">${T.s6tap}</div>
    <ul class="al-list">${T.s6n.map(x => `<li>${x}</li>`).join('')}</ul>`);

  const s7 = sec('decay', T.s7, `<p>${T.s7t}</p>
    <div class="al-play" id="alDec">
      <div class="al-chips" id="alDecStart">${AL_STARTS.map(([z, a], i) => `<button data-i="${i}" class="${i ? '' : 'on'}">${isoName(z, a, LANG)}</button>`).join('')}</div>
      <div class="al-out" id="alDecOut"></div>
      <div class="al-decbtns">${T.decays.map(([k, s, n]) => `<button class="al-dbtn" data-m="${k}"><span>${s}</span>${n}</button>`).join('')}</div>
      <div class="al-dec-rules">${T.decays.map(([k, s, n, d]) => `<div><b>${s} ${n}</b><small>${d}</small></div>`).join('')}</div>
    </div>
    <h3 class="al-h3">${T.s7pen}</h3>
    <div class="al-pen">${T.pen.map(([s, d], i) => `<div class="al-penrow"><span class="al-sym">${s}</span><div class="al-ray r${i}"><i></i>${T.penW.map((w, j) => `<em class="w${j}">${w}</em>`).join('')}</div><small>${d}</small></div>`).join('')}</div>
    <p class="al-note">${T.s7fis}</p><p class="al-note">${T.s7fus}</p>${alQuick('q7', T.q7)}`);

  const s8 = sec('halflife', T.s8, `<p>${T.s8t}</p>
    <div class="al-play" id="alHl">
      <div class="al-chips" id="alHlIso">${[[6, 14], [53, 131], [86, 222]].map(([z, a], i) => `<button data-z="${z}" data-a="${a}" class="${i ? '' : 'on'}">${isoName(z, a, LANG)} · ${halfLife(z, a, LANG)}</button>`).join('')}</div>
      <div class="al-hl-row"><div class="al-dots" id="alDots">${'<i></i>'.repeat(100)}</div>
        <div class="al-hl-side"><svg viewBox="0 0 200 116" class="al-chart"><path d="M0 110 H200 M0 60 H200" class="ax"/><path d="" id="alIdeal" class="id"/><path d="" id="alCurve" class="cv"/></svg>
          <div class="al-hl-stats"><div><b id="alLeft">100</b><small>${T.s8left}</small></div><div><b id="alHls">0</b><small>${T.s8hl}</small></div><div><b id="alTime">0</b><small>${T.s8time}</small></div></div>
          <div class="al-center"><button class="btn-y" id="alHlGo">${T.s8go}</button><button class="btn-w" id="alHlReset">${T.s8reset}</button></div></div></div>
    </div><p>${T.s8n}</p><p class="al-note">${T.s8c14}</p>`);

  const s9 = sec('alchemy', T.s9, `<p>${T.s9t}</p>
    <div class="al-play" id="alChain"><div class="al-chain" id="alChainRow"></div><div class="al-chainmsg" id="alChainMsg"></div>
      <div class="al-center"><button class="btn-y" id="alChainNext">${T.s9next}</button><button class="btn-w" id="alChainReset">${T.s9reset}</button></div></div>
    <ul class="al-list">${T.s9n.map(x => `<li>${x}</li>`).join('')}</ul>`);

  const s10 = sec('mass', T.s10, `<p>${T.s10t}</p>
    <div class="al-play" id="alMix"><div class="al-mix"><div id="alMix35"></div><div id="alMix37"></div></div>
      <input type="range" min="0" max="100" step="0.1" value="50" id="alMixR">
      <div class="al-mixout" id="alMixOut"></div><div class="al-center"><button class="btn-w" id="alMixReal">${T.s10real}</button></div></div>`);

  const s11 = sec('history', T.s11, `<div class="al-time">${T.hist.map(([y, d]) => `<div><b>${y}</b><p>${d}</p></div>`).join('')}</div>
    <div class="al-uses">${T.uses.map(([i, n, d]) => `<div><span>${i}</span><b>${n}</b><p>${d}</p></div>`).join('')}</div>
    <ul class="al-facts">${T.facts.map(f => `<li>${f}</li>`).join('')}</ul>`);

  const cta = `<div class="al-cta"><b>${T.ctaTitle}</b>
    <a class="btn-y" href="lab/atom.html">${T.ctaLab} <span>→</span></a>
    <div class="al-games"><small>${T.ctaGames}</small>${['xray', 'boom', 'decay'].map(id => `<a class="btn-w" href="#/game/${id}">${gt(gameById(id), 0)}</a>`).join('')}</div></div>`;

  const toc = `<nav class="al-toc"><b>${T.toc}</b>${secs.map(([id, t], i) => `<a href="#" data-go="al-${id}">${i + 1}. ${t}</a>`).join('')}</nav>`;
  return `<h1 class="page-title">${T.title}</h1><p class="lead">${T.lead}</p>${toc}${s1}${s2}${s3}${s4}${s5}${s6}${s7}${s8}${s9}${s10}${s11}${cta}`;
}

/* ---------- interações ---------- */
function atomLearnInit() {
  atomLearnStop();
  const T = alT(), $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const halfTxt = info => info.half ? T.halfOf(info.half[LANG === 'pt' ? 0 : 1]) : T.halfShort;
  const infoTxt = (z, a, info) => {
    if (info.kind !== 'radio') return T.s4info[info.kind] || '';
    const to = decayTo(z, a, info.decay);
    return T.s4info.radio(halfTxt(info), T.dl[info.decay], isoName(to.z, to.a, LANG));
  };

  // índice: rola até a seção sem mexer no endereço (#/learn/atom)
  $$('.al-toc a').forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById(a.dataset.go).scrollIntoView({ behavior: 'smooth' }); });

  // testes rápidos
  $$('.al-quiz').forEach(box => {
    const q = T[box.dataset.q];
    box.querySelectorAll('.al-qopts button').forEach(b => b.onclick = () => {
      const ok = +b.dataset.i === q[2];
      box.querySelectorAll('.al-qopts button').forEach(x => { x.disabled = true; if (+x.dataset.i === q[2]) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      box.querySelector('.al-qfb').innerHTML = (ok ? T.right : T.wrongA) + q[3];
    });
  });

  // 1. destacar partícula
  $$('.al-part').forEach(b => b.onclick = () => {
    const big = $('#alBig'), k = b.dataset.k, on = big.dataset.hl === k;
    big.dataset.hl = on ? '' : k;
    big.className = 'al-big' + (on ? '' : ' hl-' + k);
    $$('.al-part').forEach(x => x.classList.toggle('on', !on && x === b));
  });

  // 2. prótons → elemento
  const zr = $('#alZr');
  const drawZ = () => {
    const z = +zr.value, e = alEl(z);
    $('#alZout').innerHTML = `<div class="al-zrow">${z <= 20 ? miniAtom(z, COMMON_A[z] - z, z, { size: 150 }) : ''}${alTile(z)}
      <div class="al-ztxt"><p>${T.s2w(z, e.name)}</p>
        <div class="al-znear">${[z - 1, z + 1].filter(x => x >= 1 && x <= 118).map(x => `<button data-z="${x}">${x < z ? '−1 p' : '+1 p'} → ${alEl(x).name}</button>`).join('')}</div></div></div>`;
    $$('#alZout .al-znear button').forEach(b => b.onclick = () => { zr.value = b.dataset.z; drawZ(); });
  };
  zr.oninput = drawZ;
  $$('#alZ .al-ctl button').forEach(b => b.onclick = () => { zr.value = Math.max(1, Math.min(118, +zr.value + +b.dataset.d)); drawZ(); });
  drawZ();

  // 3. camadas
  const shr = $('#alShr');
  const drawSh = () => {
    const z = +shr.value, e = alEl(z), sh = shellsOf(z), caps = [2, 8, 8, 8];
    $('#alShName').textContent = `${e.sym} · ${e.name}`;
    $('#alShOut').innerHTML = `<div class="al-zrow">${miniAtom(z, COMMON_A[z] - z, z, { size: 170 })}
      <div class="al-ztxt"><div class="al-shells">${['K', 'L', 'M', 'N'].map((L, i) => `<div class="${i < sh.length ? 'on' : ''} ${i === sh.length - 1 ? 'last' : ''}"><b>${L}</b>
        <span>${Array.from({ length: caps[i] }, (_, j) => `<i class="${j < (sh[i] || 0) ? 'f' : ''}"></i>`).join('')}</span><small>${sh[i] || 0}/${caps[i]}</small></div>`).join('')}</div>
        <p>${T.s3val(sh[sh.length - 1], e.group)}</p></div></div>`;
  };
  shr.oninput = drawSh; drawSh();

  // 4. isótopos
  const isoS = { z: 6, n: 8 };
  const drawIso = () => {
    const { z, n } = isoS, a = z + n, info = nucInfo(z, a);
    $('#alIsoN').textContent = `${n} n`;
    $('#alIsoOut').innerHTML = `<div class="al-zrow ${info.kind}">${miniAtom(z, n, z, { size: 150 })}${alTile(z, a)}
      <div class="al-ztxt"><div class="xr-name">${isoName(z, a, LANG)}</div>${stChip(info.kind)}<p>${infoTxt(z, a, info)}</p><small class="al-muted">${z}p + ${n}n = A ${a}</small></div></div>`;
  };
  $('#alIsoEl').onchange = e => { isoS.z = +e.target.value; isoS.n = COMMON_A[isoS.z] - isoS.z; drawIso(); };
  $$('#alIso .al-step button').forEach(b => b.onclick = () => { isoS.n = Math.max(0, Math.min(30, isoS.n + +b.dataset.d)); drawIso(); });
  drawIso();

  // 5. íons
  const NOBLE = { 2: 2, 10: 10, 18: 18 };
  const ionS = { z: 11, e: 11 };
  const drawIon = () => {
    const { z, e } = ionS, q = z - e, el = alEl(z);
    $('#alIonE').textContent = `${e} e⁻`;
    const kind = q === 0 ? T.neutral : q > 0 ? T.cation : T.anion;
    const noble = q !== 0 && NOBLE[e] ? `<p class="al-good">${T.s5noble(alEl(NOBLE[e]).name)}</p>` : '';
    $('#alIonOut').innerHTML = `<div class="al-zrow">${miniAtom(z, COMMON_A[z] - z, e, { size: 150 })}${alTile(z, 0, q)}
      <div class="al-ztxt"><div class="xr-name">${el.sym}${chargeTxt(q)}</div><span class="al-st ${q > 0 ? 'pos' : q < 0 ? 'neg' : ''}">${kind}</span>
        <p>${z} p⁺ − ${e} e⁻ = <b>${q > 0 ? '+' + q : q}</b></p>${noble}</div></div>`;
  };
  $('#alIonEl').onchange = ev => { ionS.z = +ev.target.value; ionS.e = ionS.z; drawIon(); };
  $$('#alIon .al-step button').forEach(b => b.onclick = () => { ionS.e = Math.max(0, Math.min(ionS.z + 3, ionS.e + +b.dataset.d)); drawIon(); });
  drawIon();
  const naclReset = () => {
    $('#alNacl').classList.remove('go', 'done');
    $('#naFig').innerHTML = `${miniAtom(11, 12, 11, { size: 110 })}<figcaption><b>Na</b><small>11p · 11e</small></figcaption>`;
    $('#clFig').innerHTML = `${miniAtom(17, 18, 17, { size: 110 })}<figcaption><b>Cl</b><small>17p · 17e</small></figcaption>`;
    $('#alNaclGo').textContent = T.s5play;
  };
  $('#alNaclGo').onclick = () => {
    const box = $('#alNacl');
    if (box.classList.contains('done')) return naclReset();
    if (box.classList.contains('go')) return;
    box.classList.add('go');
    setTimeout(() => {
      $('#naFig').innerHTML = `${miniAtom(11, 12, 10, { size: 110 })}<figcaption><b class="pos">Na⁺</b><small>11p · 10e</small></figcaption>`;
      $('#clFig').innerHTML = `${miniAtom(17, 18, 18, { size: 110 })}<figcaption><b class="neg">Cl⁻</b><small>17p · 18e</small></figcaption>`;
      box.classList.add('done'); $('#alNaclGo').textContent = T.s5again;
    }, 1300);
  };

  // 6. mapa
  $$('.al-mc').forEach(c => c.onclick = () => {
    $$('.al-mc.sel').forEach(x => x.classList.remove('sel')); c.classList.add('sel');
    const z = +c.dataset.z, a = +c.dataset.a, info = nucInfo(z, a);
    $('#alMapInfo').innerHTML = `<b>${isoName(z, a, LANG)}</b> · ${z}p + ${a - z}n ${stChip(info.kind)}<br><small>${infoTxt(z, a, info)}</small>`;
  });

  // 7. laboratório de decaimentos
  let dec = [AL_STARTS[0]];
  const drawDec = flash => {
    const [z, a] = dec[dec.length - 1];
    const ok = z >= 1 && z <= 118 && a >= z;
    const info = ok ? nucInfo(z, a) : { kind: 'unbound' };
    const real = !ok || info.kind === 'unbound' ? T.s7none : info.kind === 'radio' ? T.s7real(T.dl[info.decay]) : info.kind === 'stable' ? T.s7stable : '';
    const trail = dec.map(([hz, ha], i) => `${i ? '<span>→</span>' : ''}<b>${hz >= 1 && hz <= 118 ? `<sup>${ha}</sup>${alEl(hz).sym}` : '?'}</b>`).join('');
    $('#alDecOut').innerHTML = `<div class="al-zrow ${flash ? 'flash' : ''}">${ok ? alTile(z, a) : '<div class="al-tile big"><b>?</b></div>'}
      <div class="al-ztxt"><div class="xr-name">${ok ? isoName(z, a, LANG) : '—'}</div>${ok && info.kind !== 'unknown' ? stChip(info.kind) : ''}<p>${real}</p>
      <div class="al-trail">${trail}</div>${dec.length > 1 ? `<button class="link-btn" id="alDecBack">${T.s7reset}</button>` : ''}</div></div>`;
    const back = $('#alDecBack'); if (back) back.onclick = () => { dec = [dec[0]]; drawDec(); };
    $$('.al-dbtn').forEach(b => b.disabled = !ok);
  };
  $$('#alDecStart button').forEach(b => b.onclick = () => {
    $$('#alDecStart button').forEach(x => x.classList.toggle('on', x === b));
    dec = [AL_STARTS[+b.dataset.i]]; drawDec();
  });
  $$('.al-dbtn').forEach(b => b.onclick = () => {
    const [z, a] = dec[dec.length - 1], to = decayTo(z, a, b.dataset.m);
    dec.push([to.z, to.a]); if (dec.length > 7) dec.splice(1, 1);
    drawDec(true);
  });
  drawDec();

  // 8. meia-vida
  const dots = $$('#alDots i');
  const UNIT = { '6-14': [5730, ['anos', 'years']], '53-131': [8, ['dias', 'days']], '86-222': [3.8, ['dias', 'days']] };
  const hl = { z: 6, a: 14, alive: [], t: 0, run: false, pts: [] };
  const drawHl = () => {
    const left = hl.alive.filter(Boolean).length, [hv, unit] = UNIT[`${hl.z}-${hl.a}`];
    $('#alLeft').textContent = left;
    $('#alHls').textContent = alNum(hl.t, 1);
    $('#alTime').textContent = `${alNum(hl.t * hv, hv >= 100 ? 0 : 1)} ${unit[LANG === 'pt' ? 0 : 1]}`;
    const X = t => (t / 6) * 200, Y = v => 110 - v;
    $('#alCurve').setAttribute('d', hl.pts.map(([t, v], i) => `${i ? 'L' : 'M'}${X(t).toFixed(1)} ${Y(v).toFixed(1)}`).join(' '));
    $('#alIdeal').setAttribute('d', Array.from({ length: 61 }, (_, i) => `${i ? 'L' : 'M'}${X(i / 10).toFixed(1)} ${Y(100 * Math.pow(0.5, i / 10)).toFixed(1)}`).join(' '));
  };
  const resetHl = () => {
    hl.alive = dots.map(() => true); hl.t = 0; hl.pts = [[0, 100]]; hl.run = false;
    dots.forEach(d => d.className = '');
    $('#alHlGo').textContent = T.s8go; drawHl();
  };
  AL_STATE.timers.push(setInterval(() => {
    if (!hl.run || !document.getElementById('alDots')) return;
    const dtH = 0.05, p = 1 - Math.pow(0.5, dtH);
    hl.alive.forEach((on, i) => { if (on && Math.random() < p) { hl.alive[i] = false; dots[i].className = 'gone'; } });
    hl.t += dtH;
    hl.pts.push([hl.t, hl.alive.filter(Boolean).length]);
    drawHl();
    if (hl.t >= 6 - 1e-9 || !hl.alive.some(Boolean)) { hl.run = false; $('#alHlGo').textContent = T.s8go; }
  }, 90));
  $('#alHlGo').onclick = () => {
    if (hl.t >= 6 - 1e-9 || !hl.alive.some(Boolean)) resetHl();
    hl.run = !hl.run; $('#alHlGo').textContent = hl.run ? T.s8stop : T.s8go;
  };
  $('#alHlReset').onclick = resetHl;
  $$('#alHlIso button').forEach(b => b.onclick = () => {
    $$('#alHlIso button').forEach(x => x.classList.toggle('on', x === b));
    hl.z = +b.dataset.z; hl.a = +b.dataset.a; resetHl();
  });
  resetHl();

  // 9. cadeia do urânio
  let ci = 0;
  const drawChain = () => {
    $('#alChainRow').innerHTML = AL_CHAIN.map(([z, a], i) => `${i ? `<span class="${i <= ci ? 'on' : ''}">${AL_CHAIN[i - 1][2] === 'a' ? 'α' : 'β⁻'}</span>` : ''}<b class="${i < ci ? 'past' : i === ci ? 'cur' : ''} ${i === AL_CHAIN.length - 1 ? 'end' : ''} ${[88, 86].includes(z) ? 'hot' : ''}"><sup>${a}</sup>${alEl(z).sym}</b>`).join('');
    const [z, a] = AL_CHAIN[ci], h = halfLife(z, a, LANG);
    $('#alChainMsg').innerHTML = ci === 0 ? `<b>${isoName(z, a, LANG)}</b>${h ? ` · ${T.halfOf(h)}` : ''}`
      : ci === AL_CHAIN.length - 1 ? T.s9end
      : T.s9step(isoName(AL_CHAIN[ci - 1][0], AL_CHAIN[ci - 1][1], LANG), isoName(z, a, LANG), T.dl[AL_CHAIN[ci - 1][2]]) + (h ? ` · ${T.halfOf(h)}` : '');
    $('#alChainNext').disabled = ci === AL_CHAIN.length - 1;
  };
  $('#alChainNext').onclick = () => { ci = Math.min(AL_CHAIN.length - 1, ci + 1); drawChain(); };
  $('#alChainReset').onclick = () => { ci = 0; drawChain(); };
  drawChain();

  // 10. mistura do cloro
  const mr = $('#alMixR');
  const drawMix = () => {
    const p = +mr.value / 100, m = p * 34.969 + (1 - p) * 36.966;
    $('#alMix35').style.flex = String(Math.max(0.0001, p)); $('#alMix37').style.flex = String(Math.max(0.0001, 1 - p));
    $('#alMix35').innerHTML = p > 0.12 ? `<b>${isoName(17, 35, LANG)}</b><small>${alNum(p * 100, 1)}%</small>` : '';
    $('#alMix37').innerHTML = p < 0.88 ? `<b>${isoName(17, 37, LANG)}</b><small>${alNum((1 - p) * 100, 1)}%</small>` : '';
    $('#alMixOut').innerHTML = `${T.s10avg}: <b>${alNum(m, 2)}</b>${Math.abs(m - 35.45) < 0.01 ? ' ✅' : ''}`;
  };
  mr.oninput = drawMix;
  $('#alMixReal').onclick = () => { mr.value = 75.8; drawMix(); };
  drawMix();
}
