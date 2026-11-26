// Grimório → "📖 Aprofundando": explicações mais longas para cada lição (em português).
// Cada seção: [tipo, html ou lista de parágrafos]. Tipos: calma, ex, err, dia.
// Parte 1: o átomo e suas peças + o porquê de tudo.

const FL_DEEP = {};
const DEEP_T = { calma: '🔍 Explicando com calma', ex: '✏️ Exemplo resolvido', err: '⚠️ Erros comuns', dia: '🌍 No dia a dia' };
const deep = (id, ...secs) => { FL_DEEP[id] = secs; };
const dp = x => Array.isArray(x) ? x.map(p => /^\s*<(ul|div|p|ol|table)/.test(p) ? p : `<p>${p}</p>`).join('') : x;
function flDeep(l) {
  const d = FL_DEEP[l.id];
  if (!d || LANG !== 'pt') return '';
  return `<section class="fl-deep"><h2>📖 Aprofundando</h2>${d.map(([k, h]) => `<div class="fl-dk ${k}"><h3>${DEEP_T[k]}</h3>${dp(h)}</div>`).join('')}</section>`;
}

/* ===================== O ÁTOMO E SUAS PEÇAS ===================== */
deep('a-parts',
  ['calma', ['O próton e o elétron têm cargas de <b>mesmo tamanho</b> e sinais opostos: 1,602 × 10⁻¹⁹ coulomb cada. Por isso um átomo com o mesmo número de prótons e elétrons é <b>neutro</b>: as cargas se cancelam exatamente. O nêutron não tem carga nenhuma.',
    'As massas são bem diferentes: próton e nêutron pesam quase o mesmo (cerca de 1 unidade de massa atômica, <b>u</b>), e o elétron pesa umas 1.836 vezes menos. Então, para a <b>massa</b>, só o núcleo conta; para o <b>tamanho</b> e para a <b>química</b>, só os elétrons contam. O núcleo tem cerca de 10⁻¹⁵ m e o átomo inteiro, cerca de 10⁻¹⁰ m: 100 mil vezes maior.',
    'Se os prótons se repelem, o que segura o núcleo? A <b>força forte</b>, que atua entre prótons e nêutrons a distâncias minúsculas e é muito mais forte que a repulsão elétrica nessa escala. É por isso que os nêutrons são importantes: eles colaboram com a cola sem acrescentar repulsão.']],
  ['ex', ['<b>Quantas partículas tem o sódio-23?</b>',
    '<ul class="fl-list"><li>O sódio é o elemento 11 da tabela → <b>11 prótons</b>.</li><li>Número de massa 23 = prótons + nêutrons → 23 − 11 = <b>12 nêutrons</b>.</li><li>Átomo neutro → elétrons = prótons = <b>11 elétrons</b>.</li><li>Massa: ≈ 23 u. Os 11 elétrons somam só 11 × 0,00055 ≈ 0,006 u, uns 0,03% do total.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "O elétron gira em órbita como um planeta." Ele é uma nuvem de probabilidade (veja a trilha de quântica).</li><li>❌ "O nêutron é um próton grudado num elétron." O nêutron é uma partícula própria, feita de quarks (udd).</li><li>❌ "O átomo é uma bolinha maciça." Quase todo o volume é a nuvem eletrônica; a massa está concentrada num núcleo minúsculo.</li></ul>']],
  ['dia', ['Quando você encosta a mão na mesa, nada "toca" de verdade: as nuvens de elétrons da mão e da mesa se repelem. E na eletricidade estática (pente que atrai papel) o que muda de lugar são <b>elétrons</b>; os prótons, presos no núcleo, nunca saem.']]);

deep('a-protons',
  ['calma', ['Por que o número de prótons define o elemento, e não o de elétrons? Porque os elétrons <b>vêm e vão</b> (é isso que é uma reação química), mas os prótons ficam presos no núcleo. E é a carga do núcleo (Z prótons) que decide quantos elétrons o átomo segura quando neutro e com que força. Ou seja: Z decide toda a química do elemento.',
    'Mudar Z exige mexer no núcleo, numa <b>reação nuclear</b>. A diferença de energia é gigantesca: uma reação química troca alguns elétron-volts por átomo; uma reação nuclear troca milhões. É por isso que a alquimia com fogo e ácidos nunca funcionou.',
    'Atenção aos dois números do núcleo: <b>Z (número atômico)</b> = prótons, e <b>A (número de massa)</b> = prótons + nêutrons. Na notação ¹⁴₆C, o 6 embaixo é Z e o 14 em cima é A.']],
  ['ex', ['<b>Um íon tem 26 prótons e 23 elétrons. Quem é ele?</b>',
    'Z = 26 → é <b>ferro</b> (Fe), não importa quantos elétrons tenha. Carga = 26 − 23 = +3. Então é o íon <b>Fe³⁺</b>, o ferro da ferrugem.']],
  ['err', ['<ul class="fl-list"><li>❌ Confundir Z com A: o carbono-14 tem Z = 6 (é carbono) e A = 14.</li><li>❌ Achar que um íon é outro elemento: Na⁺ continua sendo sódio.</li><li>❌ "Elementos de Z maior são sempre maiores." O tamanho depende das camadas e da puxada do núcleo, não só de Z.</li></ul>']],
  ['dia', ['Todos os elementos além do hidrogênio e do hélio foram fabricados mudando Z: a fusão dentro das estrelas cola núcleos leves em núcleos mais pesados (até o ferro), e explosões de supernovas e colisões de estrelas de nêutrons fazem os mais pesados, como o ouro. O ouro da sua aliança veio de um evento desses.']]);

deep('a-isotopes',
  ['calma', ['Isótopos têm o mesmo número de prótons, então a <b>mesma nuvem de elétrons</b> e praticamente a mesma química. O que muda é a massa (e a estabilidade do núcleo). A massa extra muda um pouco a velocidade com que as moléculas se movem e reagem: a água com deutério (água pesada) ferve a 101,4 °C e é levemente tóxica em grande quantidade.',
    'Se um isótopo é estável ou radioativo depende do equilíbrio entre prótons e nêutrons: nêutrons de menos ou de mais desequilibram o núcleo (veja o tópico de núcleo e radioatividade). Dos 118 elementos, só cerca de 80 têm algum isótopo estável.']],
  ['ex', ['<b>Compare o cloro-35 e o cloro-37.</b>',
    '<ul class="fl-list"><li>Os dois têm Z = 17 → <b>17 prótons</b> e, neutros, 17 elétrons.</li><li>Cloro-35: 35 − 17 = <b>18 nêutrons</b>. Cloro-37: 37 − 17 = <b>20 nêutrons</b>.</li><li>Reagem igual: os dois formam NaCl, HCl…</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Isótopos são elementos diferentes." São o mesmo elemento com massas diferentes.</li><li>❌ "Todo isótopo é radioativo." O carbono-12 e o carbono-13 são estáveis; só o 14 é radioativo.</li><li>❌ "Isótopo com mais nêutrons é mais reativo." A química depende dos elétrons, que são iguais.</li></ul>']],
  ['dia', ['O urânio natural tem só 0,7% de urânio-235 (o que faz fissão). Para usinas, ele é <b>enriquecido</b> para 3 a 5%; como a química dos isótopos é igual, a separação é feita pela pequena diferença de massa, em centrífugas. O carbono-14 data fósseis, e a razão entre oxigênio-18 e oxigênio-16 no gelo da Antártida revela a temperatura de centenas de milhares de anos atrás.']]);

deep('a-mass',
  ['calma', ['A unidade de massa atômica (<b>u</b>) é definida como 1/12 da massa de um átomo de carbono-12. A massa que aparece na tabela é a <b>média ponderada</b> das massas dos isótopos, cada uma multiplicada pela sua abundância na natureza:',
    '<p class="al-formula">massa média = Σ (abundância × massa do isótopo)</p>',
    'E por que nem a massa de um isótopo é inteira (o cloro-35 tem 34,969 u e não 35)? Porque prótons e nêutrons soltos pesam um pouco mais que 1 u (1,007 e 1,009), e ao se juntarem no núcleo uma parte da massa vira <b>energia de ligação</b> (E = mc²). É o "defeito de massa".']],
  ['ex', ['<b>Calcule a massa do cloro.</b> Cloro-35: 34,969 u, 75,76%. Cloro-37: 36,966 u, 24,24%.',
    '0,7576 × 34,969 = 26,492 &nbsp; + &nbsp; 0,2424 × 36,966 = 8,961 &nbsp; = &nbsp; <b>35,45 u</b> ✔',
    '<b>Outro:</b> boro-10 (10,013 u, 19,9%) e boro-11 (11,009 u, 80,1%): 1,993 + 8,818 = <b>10,81 u</b>. Como o boro-11 é bem mais comum, a média fica perto de 11.']],
  ['err', ['<ul class="fl-list"><li>❌ "Um átomo de cloro pesa 35,45 u." Nenhum átomo pesa isso: cada um pesa ≈ 35 ou ≈ 37. 35,45 é a média de muitos.</li><li>❌ Usar a porcentagem como número inteiro: 75,76% = 0,7576 na conta.</li><li>❌ Fazer a média simples (35 + 37)/2 = 36, ignorando que um é muito mais comum.</li></ul>']],
  ['dia', ['Os espectrômetros de massa separam os isótopos pelo peso e medem as abundâncias. Com isso dá para descobrir de onde veio um alimento, um vinho ou uma droga apreendida (a "assinatura isotópica" muda de lugar para lugar) e detectar doping com testosterona sintética.']]);

deep('a-ions',
  ['calma', ['Quando o sódio encontra o cloro, por que o elétron vai do sódio para o cloro? Arrancar o elétron do sódio <b>custa</b> 5,1 eV; o cloro, ao receber, <b>devolve</b> 3,6 eV. Sozinha, a troca ainda sairia "no prejuízo" (1,5 eV). O que paga a conta é a <b>atração</b> entre o Na⁺ e o Cl⁻ que se formam, e no cristal de sal cada íon é cercado por vários de carga oposta. No saldo, o cristal libera muita energia: por isso o sal é tão estável.',
    'Íons mudam de tamanho: o <b>cátion encolhe</b> (perdeu elétrons, às vezes uma camada inteira, e o núcleo puxa os que sobraram com mais força) e o <b>ânion incha</b> (mais elétrons se repelindo com a mesma carga no núcleo). O Na⁺ é bem menor que o Na; o Cl⁻ é maior que o Cl.']],
  ['ex', ['<b>Monte o O²⁻ e o Al³⁺.</b>',
    '<ul class="fl-list"><li>O²⁻: 8 prótons, carga −2 → ganhou 2 → <b>10 elétrons</b>.</li><li>Al³⁺: 13 prótons, carga +3 → perdeu 3 → <b>10 elétrons</b>.</li><li>Os dois ficam com 10 elétrons, igual ao neônio: são <b>isoeletrônicos</b>. Mesmo assim, o Al³⁺ é bem menor, porque tem 13 prótons puxando os mesmos 10 elétrons.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "O cátion ganhou prótons." Íons só ganham ou perdem elétrons.</li><li>❌ Errar o sinal: perder elétron (negativo) deixa o átomo <b>positivo</b>.</li><li>❌ "O átomo quer ter 8 elétrons." Não há vontade: o arranjo com camada fechada só tem menos energia.</li></ul>']],
  ['dia', ['Seus nervos funcionam com íons: Na⁺ e K⁺ atravessam a membrana das células e geram os impulsos elétricos. O "isotônico" repõe esses íons. E sal dissolvido conduz eletricidade porque os íons, soltos na água, carregam a corrente; o sal sólido não conduz, porque os íons estão presos no cristal.']]);

/* ===================== O PORQUÊ DE TUDO ===================== */
deep('attract',
  ['calma', ['A força entre duas cargas é a <b>lei de Coulomb</b>:',
    '<p class="al-formula">F = k · q₁ · q₂ / r² &nbsp; (k ≈ 9 × 10⁹ N·m²/C²)</p>',
    'Por que r² no denominador? Imagine a "influência" de uma carga se espalhando igualmente em todas as direções. A uma distância r, ela está espalhada pela superfície de uma esfera de área 4πr². Dobrou a distância, a área ficou 4 vezes maior, então a influência em cada ponto cai 4 vezes. A gravidade segue a mesma regra pelo mesmo motivo.',
    'Na química, mais útil que a força é a <b>energia</b> entre as cargas: E = k·q₁·q₂ / r. Cargas opostas dão energia <b>negativa</b> (é preciso gastar energia para separá-las), e ela fica mais negativa quanto mais perto. "Tudo desce a ladeira" (ideia 2) significa justamente ir para onde essa energia é a menor.',
    'E a força elétrica é absurdamente mais forte que a gravidade: entre um próton e um elétron, cerca de 10³⁹ vezes. Por isso a gravidade não tem nenhum papel na química.']],
  ['ex', ['<b>Na⁺ e Cl⁻ estão a 0,28 nm. Se chegassem a 0,14 nm, quanto mudaria?</b>',
    'A distância caiu pela metade → a força fica 2² = <b>4 vezes maior</b> e a energia de atração fica <b>2 vezes maior</b> (porque energia cai com 1/r, não 1/r²). Na prática eles não chegam tão perto: as nuvens de elétrons de dentro se repelem.']],
  ['err', ['<ul class="fl-list"><li>❌ Confundir força (1/r²) com energia (1/r).</li><li>❌ "Átomos neutros não se atraem." Eles se atraem fracamente, porque as nuvens de elétrons se deformam (forças de London).</li><li>❌ "Cargas iguais nunca ficam juntas." No núcleo, os prótons ficam juntos por causa da força forte.</li></ul>']],
  ['dia', ['Roupa grudando ao sair da secadora, balão que gruda no cabelo, a tela do celular que detecta o seu dedo (touch capacitivo) e a impressora a laser (o toner gruda nas partes carregadas do cilindro): tudo é Coulomb.']]);

deep('nofall',
  ['calma', ['A física clássica previa o desastre: uma carga girando irradia luz, perde energia e cai em espiral. A saída veio da física quântica, com o <b>princípio da incerteza</b>: não dá para saber ao mesmo tempo, com precisão, onde o elétron está (Δx) e com que velocidade (Δp). Quanto mais preso, mais "agitado":',
    '<p class="al-formula">Δx · Δp ≥ ħ/2</p>',
    'Se o elétron estiver confinado numa região de tamanho r, sua energia de movimento é da ordem de ħ²/(2m r²), que cresce com <b>1/r²</b>. A atração do núcleo vale −k e²/r, que cresce (em módulo) com <b>1/r</b>. Somando:',
    '<p class="al-formula">E(r) ≈ ħ²/(2m r²) − k e²/r</p>',
    'Para r grande, a atração domina e o elétron "quer" chegar perto. Para r pequeno, o termo 1/r² domina e a energia dispara. O mínimo fica em r = ħ²/(m k e²) ≈ 0,053 nm: o <b>raio de Bohr</b>. A energia nesse ponto é −13,6 eV: exatamente a energia do elétron do hidrogênio no estado fundamental.']],
  ['ex', ['<b>Por que essa conta funciona tão bem?</b> Ela usa só três constantes: a massa do elétron, a carga elementar e a constante de Planck. Dela saem o <b>tamanho do átomo</b> (≈ 0,05 nm) e a <b>energia para arrancar o elétron</b> (13,6 eV, o que se mede no laboratório). O tamanho de toda a matéria comum é decidido por essa briga.']],
  ['err', ['<ul class="fl-list"><li>❌ "O elétron não cai porque gira muito rápido (força centrífuga)." Esse era o modelo antigo, que justamente não explicava nada: carga girando perde energia.</li><li>❌ "O núcleo repele o elétron quando ele chega perto." O núcleo sempre atrai; quem "empurra" é o custo de confinar a onda.</li><li>❌ "O elétron fica parado no ponto de mínimo." Ele é uma nuvem espalhada em volta desse tamanho típico.</li></ul>']],
  ['dia', ['É por isso que a matéria tem volume e é estável: sem esse "custo de espremer", tudo colapsaria. O mesmo efeito, numa escala maior, segura as estrelas anãs brancas (elétrons espremidos resistindo à gravidade) e explica por que objetos sólidos não atravessam uns aos outros.']]);

deep('levels',
  ['calma', ['No hidrogênio, as energias permitidas seguem uma fórmula simples:',
    '<p class="al-formula">E_n = −13,6 eV / n² &nbsp; (n = 1, 2, 3…)</p>',
    'Quando o elétron desce do degrau m para o degrau n, sai um fóton com energia igual à diferença ΔE. A energia do fóton decide a cor (o comprimento de onda λ):',
    '<p class="al-formula">λ (em nm) ≈ 1240 / ΔE (em eV)</p>',
    'Os saltos que terminam em n = 2 caem na luz visível (série de Balmer); os que terminam em n = 1 são ultravioleta; os que terminam em n = 3 são infravermelho. O contrário também acontece: se um fóton com a energia <b>exata</b> de um salto chegar, o elétron o absorve e sobe. Por isso cada elemento tem linhas escuras (absorção) e claras (emissão) nas mesmas posições.']],
  ['ex', ['<b>Qual a cor do salto 3 → 2 no hidrogênio?</b>',
    'ΔE = 13,6 × (1/2² − 1/3²) = 13,6 × (0,25 − 0,111) = <b>1,89 eV</b>.',
    'λ = 1240 / 1,89 ≈ <b>656 nm</b> → vermelho. É a famosa linha H-alfa, que dá o tom vermelho das nebulosas nas fotos astronômicas.']],
  ['err', ['<ul class="fl-list"><li>❌ "Degrau mais alto dá luz mais azul." O que decide é o <b>tamanho do salto</b>.</li><li>❌ "A cor da chama vem da temperatura." A temperatura excita os átomos, mas a cor vem dos degraus de cada elemento.</li><li>❌ "O elétron viaja devagar de um degrau para o outro." A transição é um salto: não existe posição intermediária permitida.</li></ul>']],
  ['dia', ['Lâmpadas de sódio dos postes antigos (amarelo de 589 nm), letreiros de neônio, fogos de artifício (estrôncio vermelho, bário verde, cobre azul-esverdeado), o teste de chama no laboratório e a descoberta do hélio: ele foi achado primeiro no <b>espectro do Sol</b>, em 1868, antes de ser encontrado na Terra.']]);

deep('shells',
  ['calma', ['Por que exatamente 8 (ou 2) é tão estável? Numa camada, os subníveis s e p juntos têm 4 orbitais × 2 elétrons = <b>8 lugares</b>. Quando eles enchem (ns² np⁶, o arranjo dos gases nobres), o <b>próximo</b> elétron teria de ir para uma camada nova, bem mais longe e com muito mais energia. Esse "degrau grande" é o que deixa a configuração de gás nobre especial: tirar um elétron dela custa muito, e colocar um a mais quase não compensa.',
    'Os elétrons de dentro ficam escondidos e "blindam" a carga do núcleo. Só os da última camada (a <b>camada de valência</b>) encostam nos vizinhos. Por isso os elementos de uma mesma coluna se parecem: mesmo número de elétrons de valência, mesma maneira de reagir.',
    'Um jeito prático de desenhar isso é a <b>estrutura de Lewis</b>: o símbolo do elemento cercado por pontinhos, um para cada elétron de valência (o oxigênio tem 6, o carbono tem 4).']],
  ['ex', ['<b>O que fazem o enxofre (16) e o magnésio (12)?</b>',
    '<ul class="fl-list"><li>S: 2-8-6 → faltam 2 para fechar 8 → tende a <b>ganhar 2</b> → S²⁻ (ou compartilhar 2 pares, como no H₂S).</li><li>Mg: 2-8-2 → é mais barato perder 2 do que ganhar 6 → <b>perde 2</b> → Mg²⁺, ficando 2-8 como o neônio.</li><li>Juntos formam MgS, com cargas +2 e −2 que se cancelam.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Aplicar 2-8-8-18 para tudo. O modelo simples de camadas funciona até o cálcio; depois, o recheio vai para os subníveis d (veja o diagrama de Pauling).</li><li>❌ "Toda molécula obedece ao octeto." Há exceções: o boro no BF₃ fica com 6, o enxofre no SF₆ tem 12 em volta.</li><li>❌ Esquecer que hidrogênio e hélio fecham com <b>2</b>, não 8.</li></ul>']],
  ['dia', ['O lítio, o sódio e o potássio são guardados mergulhados em óleo, porque o elétron sozinho deles reage até com a umidade do ar. Já o hélio, com a camada fechada, é tão inerte que enche balões com segurança, e o argônio protege a solda e o filamento das lâmpadas antigas.']]);

deep('pull',
  ['calma', ['O que o elétron de fora sente é a <b>carga nuclear efetiva</b>: Z_ef ≈ Z − (blindagem dos elétrons de dentro). A conta "prótons − elétrons de dentro" é uma aproximação; na real, os elétrons da mesma camada também blindam um pouco, e as nuvens se misturam. Mas a tendência é a que importa:',
    '<ul class="fl-list"><li>➡️ Na mesma linha, Z sobe 1 a cada elemento, mas a blindagem quase não muda (os elétrons novos estão na mesma camada) → Z_ef sobe → átomo encolhe, segura mais forte.</li><li>⬇️ Descendo a coluna, a camada nova fica mais longe e é blindada por uma camada inteira → puxada mais fraca.</li></ul>',
    'Três propriedades saem disso: o <b>raio atômico</b>, a <b>energia de ionização</b> (o custo de arrancar o elétron de fora) e a <b>eletronegatividade</b> (o quanto o átomo puxa o par de elétrons numa ligação). Há pequenas exceções nos dados reais (o boro tem ionização menor que o berílio; o oxigênio, menor que o nitrogênio), causadas pelos subníveis, que a trilha de quântica explica.']],
  ['ex', ['<b>Sódio contra cloro, na mesma linha (3º período):</b>',
    '<ul class="fl-list"><li>Carga efetiva aproximada: Na ≈ 11 − 10 = 1; Cl ≈ 17 − 10 = 7.</li><li>Energia de ionização real: Na 5,1 eV; Cl 13,0 eV (mais de 2,5 vezes).</li><li>Raio: Na ≈ 186 pm; Cl ≈ 100 pm. O cloro, com mais prótons, é <b>menor</b>.</li><li>Eletronegatividade: Na 0,93; Cl 3,16.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Mais elétrons = átomo maior." Na mesma linha é o contrário: o átomo encolhe.</li><li>❌ Confundir eletronegatividade (puxada dentro de uma ligação) com afinidade eletrônica (energia liberada ao ganhar um elétron isolado).</li><li>❌ Achar que os gases nobres têm eletronegatividade alta. Eles quase não fazem ligações, então a escala de Pauling geralmente nem dá valor para eles.</li></ul>']],
  ['dia', ['O flúor, o maior "ladrão", forma ligações tão fortes com o carbono que o Teflon das panelas quase não reage com nada. Já o césio solta o elétron tão fácil que, com luz, ele sai: o césio é usado em células fotoelétricas.']]);

deep('bond',
  ['calma', ['A ligação existe porque os dois elétrons, ficando <b>entre</b> os dois núcleos, são atraídos pelos dois ao mesmo tempo. Isso abaixa a energia. A curva da lição (a <b>curva de Morse</b>) tem três partes: longe, quase nada; no vale, a ligação; perto demais, a repulsão entre os núcleos domina.',
    'E por que não existe He₂? A quântica diz que, quando dois átomos se aproximam, seus orbitais se combinam em dois: um <b>ligante</b> (mais baixo, com o elétron entre os núcleos) e um <b>antiligante</b> (mais alto, com um nó no meio). O H₂ tem 2 elétrons: os dois vão para o ligante → ligação. O He₂ teria 4: 2 no ligante e 2 no antiligante, que desfaz o ganho → sem ligação.',
    'Ligações múltiplas (duplas e triplas) põem mais elétrons entre os núcleos: ficam <b>mais curtas e mais fortes</b>. C–C: 154 pm e 348 kJ/mol; C=C: 134 pm e 614 kJ/mol; C≡C: 120 pm e 839 kJ/mol.']],
  ['ex', ['<b>Quanta energia para quebrar todas as ligações de 4 g de H₂?</b>',
    '4 g ÷ 2 g/mol = 2 mol de H₂. Cada mol pede 436 kJ → 2 × 436 = <b>872 kJ</b>. É a mesma energia que sai quando 4 g de H₂ se formam a partir de átomos soltos.']],
  ['err', ['<ul class="fl-list"><li>❌ "Formar uma ligação gasta energia." Formar <b>libera</b>; quebrar é que custa.</li><li>❌ "A energia está guardada dentro da ligação e sai quando ela quebra." O calor de uma reação vem de as ligações <b>novas</b> serem mais fortes que as antigas.</li><li>❌ "Os átomos se ligam para completar o octeto." O octeto é um atalho para prever onde fica o vale de energia, não a causa.</li></ul>']],
  ['dia', ['O ar é 78% N₂, e quase nada reage com ele porque a ligação tripla N≡N é fortíssima (945 kJ/mol). Por isso as plantas precisam de bactérias (ou de adubo industrial) para "quebrar" o nitrogênio. E toda a energia dos alimentos e combustíveis é a diferença entre as ligações que se quebram e as que se formam.']]);

deep('spectrum',
  ['calma', ['Numa ligação polar, o par de elétrons fica deslocado e surgem cargas parciais δ+ e δ−. O tamanho desse desequilíbrio é o <b>momento de dipolo</b>. Dá para estimar a "porcentagem iônica" de uma ligação pela diferença de eletronegatividade: com ΔEN ≈ 1,7, a ligação é mais ou menos metade iônica.',
    'Cada tipo dá um material diferente:',
    '<ul class="fl-list"><li>🧂 <b>Iônico</b>: não forma moléculas, e sim um <b>cristal</b> gigante de íons alternados. Duro, quebradiço, ponto de fusão alto, conduz eletricidade só derretido ou dissolvido.</li><li>💧 <b>Covalente molecular</b>: moléculas separadas, presas umas às outras por forças fracas. Geralmente gases, líquidos ou sólidos moles.</li><li>🔩 <b>Metálico</b>: íons positivos num "mar" de elétrons livres. Conduz eletricidade e calor, é brilhante e maleável (as camadas de íons escorregam sem quebrar, porque o mar de elétrons acompanha).</li></ul>']],
  ['ex', ['<b>Classifique pelas eletronegatividades:</b>',
    '<ul class="fl-list"><li>C–H: 2,55 e 2,20 → Δ = 0,35 → praticamente apolar.</li><li>H–Cl: 2,20 e 3,16 → Δ = 0,96 → covalente polar.</li><li>Na–F: 0,93 e 3,98 → Δ = 3,05 → iônica.</li><li>Al–Cl: 1,61 e 3,16 → Δ = 1,55 → no meio do caminho! O AlCl₃ se comporta mais como molecular, mesmo sendo "metal + não metal".</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Metal + não metal é sempre iônico." O AlCl₃ mostra que não.</li><li>❌ "O NaCl é uma molécula." É um cristal: a fórmula só diz a proporção 1:1.</li><li>❌ Tratar 0,4 e 1,7 como fronteiras exatas. A escala é contínua.</li></ul>']],
  ['dia', ['O sal só conduz eletricidade dissolvido (os íons ficam livres); um fio de cobre conduz sólido (os elétrons do mar são livres); o açúcar dissolvido não conduz (moléculas inteiras, sem carga). É um teste fácil para descobrir o tipo de ligação de uma substância.']]);

deep('shape',
  ['calma', ['A teoria se chama <b>VSEPR</b> (repulsão dos pares de elétrons da camada de valência). Conte os <b>domínios</b> em volta do átomo central: cada ligação conta 1 (dupla e tripla também contam só 1!) e cada par livre conta 1. Os domínios se afastam ao máximo:',
    '<ul class="fl-list"><li>2 domínios → linear, 180°</li><li>3 → trigonal plano, 120°</li><li>4 → tetraédrico, 109,5°</li><li>5 → bipirâmide trigonal</li><li>6 → octaédrico, 90°</li></ul>',
    'A <b>forma</b> que se enxerga considera só os átomos. Com 4 domínios: 0 pares livres = tetraedro (CH₄); 1 par livre = pirâmide (NH₃, 107°); 2 pares livres = angular (H₂O, 104,5°). Os ângulos diminuem porque os pares livres, presos só a um núcleo, são mais "gordos" e empurram mais.']],
  ['ex', ['<b>Qual a forma do CO₂ e do SO₂?</b>',
    '<ul class="fl-list"><li>CO₂: o carbono faz duas ligações duplas e não tem par livre → <b>2 domínios</b> → <b>linear</b> (O=C=O).</li><li>SO₂: o enxofre faz duas ligações e tem <b>1 par livre</b> → 3 domínios → <b>angular</b> (≈ 119°).</li><li>Fórmulas parecidas, formas diferentes. E isso muda tudo: o CO₂ é apolar e o SO₂ é polar.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Contar a ligação dupla como 2 domínios.</li><li>❌ Esquecer os pares livres (eles não aparecem na fórmula, mas empurram).</li><li>❌ Achar que a molécula é plana como o desenho no papel. O CH₄ é um tetraedro 3D.</li></ul>']],
  ['dia', ['O formato decide o encaixe: remédios funcionam encaixando em proteínas como chave em fechadura, e o olfato reconhece cheiros pela forma. E é a forma angular da água que faz o gelo montar uma rede hexagonal cheia de espaços: por isso o gelo é menos denso e flutua, e os lagos congelam de cima para baixo.']]);

deep('polar',
  ['calma', ['Cada ligação polar é um <b>vetor</b> (o momento de dipolo), apontando para o átomo mais eletronegativo. A polaridade da molécula é a <b>soma vetorial</b>: setas iguais em direções opostas se anulam.',
    'Moléculas <b>simétricas</b> são apolares, mesmo com ligações polares: CO₂ (linear), BF₃ (trigonal plana), CH₄ e CCl₄ (tetraédricas). Basta quebrar a simetria para surgir um dipolo: o CHCl₃ (clorofórmio) é polar, porque um dos quatro braços é diferente.',
    'Isso decide como as moléculas se atraem: polares grudam pelos lados + e − (dipolo-dipolo); apolares só se atraem pelas forças de London, que vêm de flutuações momentâneas da nuvem de elétrons.']],
  ['ex', ['<b>Polar ou apolar?</b>',
    '<ul class="fl-list"><li>H₂O: angular → as duas setas O–H somam para o lado do O → <b>polar</b>.</li><li>NH₃: pirâmide → as três setas somam para o lado do N → <b>polar</b>.</li><li>BF₃: trigonal plana com 3 setas iguais a 120° → soma zero → <b>apolar</b>.</li><li>CCl₄: tetraedro com 4 setas iguais → soma zero → <b>apolar</b>.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Ligação polar ⇒ molécula polar." Depende da geometria.</li><li>❌ "Moléculas apolares não se atraem." Atraem pelas forças de London; senão o óleo seria gás.</li><li>❌ Somar polaridades como números, sem olhar as direções.</li></ul>']],
  ['dia', ['O micro-ondas esquenta a comida fazendo as moléculas de água (polares) girarem de um lado para o outro, seguindo o campo elétrico; gordura e prato de vidro quase não esquentam sozinhos. Acetona tira esmalte (as duas são pouco polares), e água tira sal e açúcar (polares).']]);

deep('boil',
  ['calma', ['Existem três atrações principais <b>entre</b> moléculas, da mais fraca para a mais forte:',
    '<ul class="fl-list"><li>🌫️ <b>London</b> (dipolo induzido): todas as moléculas têm, e cresce com o tamanho da nuvem de elétrons. É a única das apolares.</li><li>↔️ <b>Dipolo-dipolo</b>: entre moléculas polares.</li><li>💧 <b>Ligação de hidrogênio</b>: um H preso a N, O ou F (quase "pelado") grudado num par livre de N, O ou F de outra molécula.</li></ul>',
    'Mesmo a mais forte delas (≈ 20 kJ/mol) é umas 20 vezes mais fraca que uma ligação covalente (O–H: 463 kJ/mol). É por isso que ferver separa moléculas sem quebrá-las.',
    'O ponto de ebulição também depende da <b>pressão</b>: um líquido ferve quando a pressão do seu vapor iguala a pressão de fora. Menos pressão em volta, ferve mais frio.']],
  ['ex', ['<b>Compare:</b>',
    '<ul class="fl-list"><li>CH₄ (−161 °C) × octano C₈H₁₈ (126 °C): os dois apolares, mas o octano tem uma nuvem enorme → London muito maior.</li><li>H₂S (−60 °C) × H₂O (100 °C): tamanhos parecidos, mas só a água faz ligação de hidrogênio.</li><li>Etanol (78 °C) × éter dimetílico (−24 °C): mesma fórmula C₂H₆O; só o etanol tem O–H.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Na fervura, a água vira H₂ e O₂." As moléculas saem inteiras.</li><li>❌ "Ligação de hidrogênio é uma ligação covalente com o hidrogênio." É uma atração entre moléculas.</li><li>❌ "Quanto mais pesada a molécula, mais alto o ponto de ebulição", sem olhar as forças. A água (18 u) ferve muito acima do H₂S (34 u).</li></ul>']],
  ['dia', ['No alto do Everest, a água ferve a uns 70 °C (menos pressão) e o macarrão não cozinha direito. A panela de pressão faz o contrário: a pressão maior deixa a água ferver a cerca de 120 °C, e a comida cozinha mais rápido. E o suor resfria porque, para evaporar, a água "rouba" energia da pele para quebrar as ligações de hidrogênio.']]);

deep('acid',
  ['calma', ['A definição de <b>Brønsted-Lowry</b>: ácido <b>doa</b> H⁺, base <b>recebe</b> H⁺. Toda doação forma um <b>par conjugado</b>: quando o HCl doa H⁺, sobra o Cl⁻ (a base conjugada); quando a água recebe, vira H₃O⁺ (o ácido conjugado). Na água, o H⁺ nunca fica solto: ele gruda numa molécula de água e forma o íon hidrônio (H₃O⁺).',
    'O pH é uma régua logarítmica: <b>pH = −log[H⁺]</b>. Na água pura, [H⁺] = [OH⁻] = 10⁻⁷ mol/L, então pH = 7. Como [H⁺]·[OH⁻] = 10⁻¹⁴ sempre (a 25 °C), vale pH + pOH = 14.',
    '<b>Força</b> e <b>concentração</b> são coisas diferentes: força é a fração das moléculas que doa o H⁺; concentração é quanto ácido foi colocado. Um ácido forte bem diluído pode ser menos ácido que um fraco concentrado.']],
  ['ex', ['<b>Calcule o pH:</b>',
    '<ul class="fl-list"><li>HCl 0,01 mol/L (forte, solta tudo): [H⁺] = 10⁻² → <b>pH 2</b>.</li><li>Diluindo 10 vezes: [H⁺] = 10⁻³ → <b>pH 3</b>. Cada fator 10 muda o pH em 1.</li><li>NaOH 0,001 mol/L: [OH⁻] = 10⁻³ → pOH 3 → <b>pH 11</b>.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Ácido forte = ácido concentrado."</li><li>❌ "pH 4 é o dobro de ácido que pH 5." É <b>10 vezes</b>.</li><li>❌ "Ácido fraco não é perigoso." O ácido fluorídrico (HF) é fraco e é um dos mais perigosos do laboratório: atravessa a pele e ataca os ossos.</li></ul>']],
  ['dia', ['O suco gástrico tem pH entre 1,5 e 3,5; antiácidos são bases fracas que neutralizam o excesso. Piscinas são mantidas em pH ≈ 7,4 para o cloro funcionar e não irritar os olhos, e a chuva ácida chega a pH 4.']]);

deep('redox',
  ['calma', ['Na oxirredução, elétrons passam de uma espécie para outra. Os nomes confundem, então vale fixar:',
    '<ul class="fl-list"><li><b>Oxidação</b> = <b>perda</b> de elétrons. <b>Redução</b> = <b>ganho</b> (a carga "reduz", fica mais negativa).</li><li>Quem se oxida é o <b>agente redutor</b> (ele causa a redução do outro, entregando elétrons).</li><li>Quem se reduz é o <b>agente oxidante</b> (ele causa a oxidação do outro, roubando elétrons).</li></ul>',
    'O total de elétrons perdidos é sempre igual ao total de ganhos: elétrons não somem. É isso que se usa para balancear essas reações. Escrevendo as duas metades separadas (as <b>semirreações</b>), fica fácil contar.']],
  ['ex', ['<b>Zinco num banho de sulfato de cobre:</b> Zn + Cu²⁺ → Zn²⁺ + Cu',
    '<ul class="fl-list"><li>Zn → Zn²⁺ + 2e⁻ (oxidação: o Zn é o redutor)</li><li>Cu²⁺ + 2e⁻ → Cu (redução: o Cu²⁺ é o oxidante)</li><li>2 elétrons saem e 2 entram: já está balanceada.</li></ul>',
    '<b>Com o alumínio:</b> Al → Al³⁺ + 3e⁻ e Cu²⁺ + 2e⁻ → Cu. Para igualar os elétrons (MMC de 3 e 2 = 6): <b>2 Al + 3 Cu²⁺ → 2 Al³⁺ + 3 Cu</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ "Oxidação precisa de oxigênio." Basta perder elétrons; o Zn com Cu²⁺ não tem oxigênio nenhum.</li><li>❌ Trocar os nomes: o oxidante é o que <b>se reduz</b>.</li><li>❌ Balancear só os átomos e esquecer as cargas e os elétrons.</li></ul>']],
  ['dia', ['A respiração é uma oxirredução controlada: a glicose é oxidada e o O₂ é reduzido a água, liberando energia aos poucos. O aço galvanizado (coberto de zinco) não enferruja porque o zinco, mais fácil de oxidar, se sacrifica no lugar do ferro. E o bafômetro antigo detectava álcool por uma oxirredução que mudava de cor.']]);

deep('mole',
  ['calma', ['O mol é uma <b>contagem</b>, como a dúzia: 1 mol = 6,022 × 10²³ unidades (o <b>número de Avogadro</b>, N_A). Esse número foi escolhido para que <b>1 u por átomo vire 1 g por mol</b>: 1 g = 6,022 × 10²³ u. Por isso a massa molar (em g/mol) é numericamente igual à massa atômica ou molecular (em u).',
    'As três contas que você vai usar sempre:',
    '<p class="al-formula">n = m / M &nbsp;&nbsp;·&nbsp;&nbsp; N = n · N_A &nbsp;&nbsp;·&nbsp;&nbsp; (gases a 25 °C e 1 atm) V ≈ n · 24,5 L</p>',
    'onde n é o número de mols, m a massa em gramas, M a massa molar e N o número de partículas.']],
  ['ex', ['<b>Quantas moléculas há em 9 g de água?</b> M(H₂O) = 2 × 1 + 16 = 18 g/mol.',
    'n = 9 / 18 = <b>0,5 mol</b> → N = 0,5 × 6,022 × 10²³ = <b>3,01 × 10²³ moléculas</b>. E como cada molécula tem 3 átomos, são 9,03 × 10²³ átomos.',
    '<b>E num anel de 1 g de ouro?</b> n = 1 / 197 = 0,00508 mol → cerca de <b>3,06 × 10²¹ átomos</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ "Mol é uma unidade de massa." É uma quantidade de coisas; a massa de 1 mol depende da substância.</li><li>❌ Confundir mols de moléculas com mols de átomos: 1 mol de H₂O tem 2 mol de H e 1 mol de O.</li><li>❌ Usar 22,4 L/mol fora das condições certas (vale a 0 °C; a 25 °C são ≈ 24,5 L).</li></ul>']],
  ['dia', ['Rótulos de remédio e exames de sangue usam mmol/L; a glicose no sangue, por exemplo, fica em torno de 5 mmol/L. E na indústria, toda receita (adubo, remédio, combustível) é calculada em mols para não sobrar nem faltar reagente.']]);
