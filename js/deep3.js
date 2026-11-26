// Grimório → "📖 Aprofundando", parte 3: eletroquímica, química orgânica, química ambiental,
// núcleo e radioatividade.

/* ===================== ELETROQUÍMICA ===================== */
deep('ec-nox',
  ['calma', ['Regras práticas para achar o Nox, na ordem de prioridade:',
    '<ol class="fl-list"><li>Substância simples (O₂, Fe, Cl₂): <b>0</b>.</li><li>Íon de um átomo só: Nox = carga (Na⁺ = +1, S²⁻ = −2).</li><li>Metais alcalinos (grupo 1): <b>+1</b>; alcalino-terrosos (grupo 2): <b>+2</b>; alumínio: +3.</li><li>Flúor: sempre <b>−1</b>.</li><li>Hidrogênio: <b>+1</b> (exceto ligado a metal, nos hidretos como NaH: −1).</li><li>Oxigênio: <b>−2</b> (exceto peróxidos como H₂O₂: −1; e com flúor).</li><li>A soma de todos os Nox = carga total (0 na molécula, a carga do íon num íon).</li></ol>',
    'Todas essas regras saem da mesma ideia: em cada ligação, os elétrons vão para quem puxa mais. O oxigênio quase sempre ganha a disputa (só perde para o flúor), por isso costuma ser −2.']],
  ['ex', ['<b>Ache o Nox do cromo no K₂Cr₂O₇ (dicromato de potássio).</b>',
    '<ul class="fl-list"><li>K: +1, dois deles → +2.</li><li>O: −2, sete deles → −14.</li><li>Soma zero: +2 + 2x − 14 = 0 → 2x = 12 → <b>x = +6</b>.</li></ul>',
    '<b>Quem oxidou em Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂ (alto-forno)?</b> Fe: +3 → 0 (reduziu). C: +2 no CO → +4 no CO₂ (oxidou). O CO é o agente redutor que tira o oxigênio do minério.']],
  ['err', ['<ul class="fl-list"><li>❌ Achar que o Nox é a carga real do átomo. É uma contabilidade; na água, o O não tem carga −2 de verdade.</li><li>❌ Esquecer de multiplicar pelo índice (O₇ são 7 oxigênios).</li><li>❌ Usar −2 para o oxigênio da água oxigenada (lá é −1).</li></ul>']],
  ['dia', ['O dicromato era usado nos bafômetros antigos: ele é reduzido pelo álcool e muda de laranja (Cr +6) para verde (Cr +3). E a ferrugem, a fotossíntese, a respiração e as pilhas são todas leituras de Nox subindo e descendo.']]);

deep('ec-cell',
  ['calma', ['Cada semirreação tem um <b>potencial padrão de redução (E°)</b>, medido em relação ao eletrodo de hidrogênio (que vale 0 por definição). Quanto maior o E°, mais aquela espécie "quer" ser reduzida.',
    'Numa pilha, o par de <b>maior E°</b> é o cátodo (sofre redução, polo +) e o de <b>menor E°</b> é o ânodo (sofre oxidação, polo −). A força eletromotriz é:',
    '<p class="al-formula">ΔE° = E°(cátodo) − E°(ânodo)</p>',
    'Se ΔE° é positivo, a reação acontece sozinha (é espontânea). A ponte salina é essencial: sem ela, um lado acumularia carga positiva e o outro negativa, e a corrente pararia em instantes. Os íons da ponte (geralmente KCl ou KNO₃) vão neutralizando os dois lados.',
    'A notação de pilha escreve o ânodo à esquerda: <span class="mono">Zn | Zn²⁺ || Cu²⁺ | Cu</span>.']],
  ['ex', ['<b>Pilha de alumínio e prata.</b> E°(Al³⁺/Al) = −1,66 V; E°(Ag⁺/Ag) = +0,80 V.',
    '<ul class="fl-list"><li>Ânodo (menor E°): alumínio. Al → Al³⁺ + 3e⁻.</li><li>Cátodo (maior E°): prata. Ag⁺ + e⁻ → Ag (×3 para igualar os elétrons).</li><li>Global: Al + 3 Ag⁺ → Al³⁺ + 3 Ag.</li><li>ΔE° = 0,80 − (−1,66) = <b>2,46 V</b>. Atenção: multiplicar a semirreação por 3 <b>não</b> multiplica o potencial.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Multiplicar o E° pelo coeficiente ao balancear.</li><li>❌ Trocar os polos: na pilha, o ânodo é o negativo (na eletrólise, é o positivo).</li><li>❌ "Os elétrons passam pela ponte salina." Pelo fio passam elétrons; pela ponte, íons.</li></ul>']],
  ['dia', ['Pilhas alcalinas (zinco e dióxido de manganês, 1,5 V), baterias de carro (chumbo e ácido sulfúrico, 2 V por célula, 6 células = 12 V), baterias de lítio dos celulares (3,7 V) e a dor de morder papel-alumínio com obturação de amálgama: você forma uma pilha na boca!']]);

deep('ec-elec',
  ['calma', ['A eletrólise usa uma fonte externa para forçar uma reação não espontânea. A fonte puxa elétrons do <b>ânodo</b> (agora o polo +, onde ocorre oxidação) e empurra para o <b>cátodo</b> (polo −, onde ocorre redução). Os nomes "ânodo = oxidação" e "cátodo = redução" valem sempre; só os sinais se invertem em relação à pilha.',
    'Em solução aquosa, há uma disputa: a água também pode ser reduzida (vira H₂) ou oxidada (vira O₂). Quem ganha depende da facilidade de cada um. Por isso, eletrolisar NaCl dissolvido em água dá H₂ no cátodo (e não sódio!) e Cl₂ no ânodo; para obter sódio metálico, é preciso eletrolisar o sal <b>derretido</b>, sem água.',
    'A quantidade de produto segue as <b>leis de Faraday</b>: a carga Q = i·t (corrente × tempo), e 1 mol de elétrons carrega 96.500 C (a constante de Faraday).']],
  ['ex', ['<b>Quanto cobre se deposita com 2 A durante 1 hora?</b>',
    '<ul class="fl-list"><li>Q = 2 A × 3.600 s = 7.200 C.</li><li>Mols de elétrons: 7.200 ÷ 96.500 ≈ 0,0746 mol.</li><li>Cu²⁺ + 2e⁻ → Cu: precisa de 2 elétrons por átomo → 0,0373 mol de Cu.</li><li>Massa: 0,0373 × 63,5 ≈ <b>2,37 g de cobre</b>.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Achar que NaCl em água dá sódio metálico no cátodo.</li><li>❌ Esquecer quantos elétrons cada íon precisa (Cu²⁺ pede 2, Al³⁺ pede 3).</li><li>❌ Usar o tempo em minutos em vez de segundos.</li></ul>']],
  ['dia', ['O alumínio de latas e aviões, o cloro e a soda cáustica (da eletrólise da salmoura), o cobre puríssimo dos fios elétricos (refino eletrolítico), joias banhadas a ouro, a anodização (camada protetora colorida em peças de alumínio) e o hidrogênio verde.']]);

/* ===================== QUÍMICA ORGÂNICA ===================== */
deep('o-carbon',
  ['calma', ['O carbono no meio da tabela tem eletronegatividade média (2,55): não é ganancioso nem generoso. Ele forma ligações covalentes fortes com ele mesmo (348 kJ/mol) e com H, O, N. O silício, logo abaixo, também faz 4 ligações, mas Si–Si é bem mais fraca e Si–O muito mais forte: o silício prefere virar rocha (SiO₂), não cadeias.',
    'Cada carbono pode estar em três "modos", que decidem a geometria:',
    '<ul class="fl-list"><li>Só ligações simples (sp³): tetraédrico, 109,5°. Ex.: metano, etano.</li><li>Uma dupla (sp²): plano, 120°. Ex.: eteno.</li><li>Uma tripla ou duas duplas (sp): linear, 180°. Ex.: etino.</li></ul>',
    'Classificações de cadeia: <b>aberta</b> ou <b>fechada</b> (anel); <b>normal</b> (reta) ou <b>ramificada</b>; <b>saturada</b> (só simples) ou <b>insaturada</b> (com dupla ou tripla); <b>homogênea</b> (só C na cadeia) ou <b>heterogênea</b> (O, N no meio). E o anel especial do benzeno (C₆H₆), com elétrons espalhados pelo anel todo, define os compostos <b>aromáticos</b>.']],
  ['ex', ['<b>Dê o nome de CH₃–CH₂–CH=CH–CH₃.</b>',
    '<ul class="fl-list"><li>5 carbonos → <b>pent</b>.</li><li>Uma dupla → <b>en</b>.</li><li>Numerando pela ponta mais perto da dupla, ela fica entre o C2 e o C3 → posição 2.</li><li>Nome: <b>pent-2-eno</b>. Fórmula: C₅H₁₀.</li></ul>',
    '<b>Com ramificação:</b> CH₃–CH(CH₃)–CH₃ tem cadeia principal de 3 carbonos com um CH₃ (metil) no meio → <b>metilpropano</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ Desenhar um carbono com 5 ligações.</li><li>❌ Numerar a cadeia pelo lado errado (a dupla deve ganhar o menor número).</li><li>❌ Achar que "orgânico" quer dizer "natural" ou "de ser vivo": plástico, gasolina e muitos remédios sintéticos também são orgânicos.</li></ul>']],
  ['dia', ['Petróleo e gás natural são misturas de hidrocarbonetos. O gás de cozinha (GLP) é propano e butano; a gasolina tem cadeias de 5 a 10 carbonos; o diesel, de 12 a 20; a parafina, acima de 20. Quanto maior a cadeia, mais "grudenta" e menos volátil.']]);

deep('o-groups',
  ['calma', ['O grupo funcional é onde a molécula "acontece", porque é ali que estão os átomos que puxam elétrons (O, N, halogênios) e as ligações duplas reativas. A cadeia de carbonos quase só dá tamanho e forma.',
    'As famílias com C=O (a <b>carbonila</b>) são parentes próximos: aldeído (C=O na ponta), cetona (no meio), ácido carboxílico (C=O + OH no mesmo carbono), éster (C=O + O ligado a outra cadeia) e amida (C=O + N). Elas se transformam umas nas outras por reações de oxidação e substituição:',
    '<p class="al-formula">álcool → (oxida) → aldeído → (oxida) → ácido carboxílico</p>',
    'É por isso que o vinho que fica aberto vira vinagre: bactérias oxidam o etanol a ácido acético.']],
  ['ex', ['<b>Identifique a função de cada parte da aspirina</b> (ácido acetilsalicílico): ela tem um anel aromático, um grupo <b>COOH</b> (ácido carboxílico) e um grupo <b>–O–CO–CH₃</b> (éster). Uma só molécula pode ter várias funções: as moléculas de remédios costumam ter 3 ou 4.',
    '<b>E o nome do éster CH₃–COO–CH₂–CH₃?</b> Parte do ácido: 2 carbonos (etan<b>oato</b>); parte do álcool: 2 carbonos (et<b>ila</b>) → <b>etanoato de etila</b> (o acetato de etila, solvente de esmalte com cheiro de fruta).']],
  ['err', ['<ul class="fl-list"><li>❌ Chamar de álcool um OH ligado direto no anel benzênico (é fenol).</li><li>❌ Confundir éster (–COO–) com éter (–O–).</li><li>❌ Confundir amina (só N) com amida (N junto de C=O).</li></ul>']],
  ['dia', ['Vinagre (ácido acético), acetona (cetona), formol (aldeído), essências de fruta (ésteres), cheiro de peixe (aminas), proteínas (amidas, as ligações peptídicas), e o etanol do combustível e das bebidas.']]);

deep('o-props',
  ['calma', ['Três propriedades físicas que você deduz olhando a molécula:',
    '<ul class="fl-list"><li>🌡️ <b>Ponto de ebulição</b>: sobe com o tamanho (mais London) e com grupos polares, principalmente os que fazem ligação de hidrogênio (OH, NH, COOH). Ramificar abaixa: moléculas mais "redondas" encostam menos.</li><li>💧 <b>Solubilidade em água</b>: cabeças polares ajudam; caudas apolares longas atrapalham. Regra prática: até uns 3–4 carbonos por grupo OH, dissolve bem.</li><li>🧪 <b>Acidez</b>: ácidos carboxílicos soltam H⁺ porque a carga do ânion se espalha pelos dois oxigênios (fica estável); álcoois quase não soltam.</li></ul>',
    'Os ácidos carboxílicos fervem ainda mais alto que álcoois do mesmo tamanho porque formam <b>pares</b> (dímeros) unidos por duas ligações de hidrogênio.']],
  ['ex', ['<b>Ordene pelo ponto de ebulição: propano, etanol, ácido acético, éter dimetílico.</b> (todos com massa perto de 44–60)',
    '<ul class="fl-list"><li>Propano (−42 °C): apolar, só London.</li><li>Éter dimetílico (−24 °C): polar, mas sem O–H.</li><li>Etanol (78 °C): ligação de hidrogênio.</li><li>Ácido acético (118 °C): ligação de hidrogênio em dobro (dímeros).</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Tem OH, então dissolve em água." Depende do tamanho da cauda (o octanol quase não dissolve).</li><li>❌ Comparar pontos de ebulição só pela massa molar.</li></ul>']],
  ['dia', ['O álcool em gel evapora rápido da mão (etanol, pequeno) e o óleo de cozinha, não (cadeias enormes). O metanol e o etanol se misturam com a gasolina em pequenas quantidades, mas uma gasolina "batizada" com muita água separa em duas fases: o teste da proveta no posto usa exatamente isso.']]);

deep('o-isomer',
  ['calma', ['Isomeria se divide em dois grandes grupos:',
    '<ul class="fl-list"><li><b>Plana (constitucional)</b>: os átomos estão ligados em ordens diferentes. Dá para ver no desenho plano: de cadeia, de posição, de função, de compensação (metameria) e tautomeria (dois isômeros que se convertem um no outro sozinhos, em equilíbrio).</li><li><b>Espacial (estereoisomeria)</b>: a ordem das ligações é a mesma, mas a arrumação no espaço é diferente: <b>geométrica</b> (cis-trans) e <b>óptica</b>.</li></ul>',
    'A <b>cis-trans</b> exige uma ligação que não gira (dupla ou anel) e dois grupos diferentes em cada carbono da dupla. A <b>óptica</b> aparece quando há um <b>carbono quiral</b> (assimétrico): ligado a 4 grupos diferentes. As duas versões (enantiômeros) giram a luz polarizada para lados opostos, e é daí que vem o nome "óptica".']],
  ['ex', ['<b>O ácido lático, CH₃–CH(OH)–COOH, tem isomeria óptica?</b>',
    'O carbono do meio está ligado a: H, OH, CH₃ e COOH → 4 grupos diferentes → <b>é quiral</b>. Existem o ácido L-lático (o dos músculos) e o D-lático (de algumas bactérias), imagens no espelho um do outro.',
    '<b>Quantos isômeros ópticos com n carbonos quirais?</b> Até 2ⁿ. Com 2 carbonos quirais, até 4.']],
  ['err', ['<ul class="fl-list"><li>❌ Procurar cis-trans numa ligação simples (ela gira; não há isômeros fixos).</li><li>❌ Marcar como quiral um carbono com dois grupos iguais (dois H, por exemplo).</li><li>❌ "Isômeros ópticos têm propriedades físicas diferentes." Pontos de fusão e ebulição são iguais; muda o desvio da luz e a interação com outras moléculas quirais.</li></ul>']],
  ['dia', ['A talidomida, nos anos 1950–60: uma versão aliviava o enjoo, e a outra causava malformações em bebês (e o corpo converte uma na outra). Desde então, remédios quirais são estudados versão por versão. O limoneno da laranja e do limão e o aspartame (um enantiômero é doce, o outro amargo) são outros exemplos.']]);

deep('o-react',
  ['calma', ['Os principais tipos de reação orgânica, e quem faz cada um:',
    '<ul class="fl-list"><li>🔥 <b>Combustão</b>: qualquer orgânico + O₂ → CO₂ + H₂O (completa).</li><li>➕ <b>Adição</b>: típica de ligações duplas e triplas. A ligação π (a "extra") se abre e recebe H₂, H₂O, HCl, Br₂… Ex.: eteno + H₂O → etanol.</li><li>🔁 <b>Substituição</b>: típica de alcanos e do anel aromático (que não gosta de perder a estabilidade). Um H sai e outro grupo entra. Ex.: metano + Cl₂ → CH₃Cl + HCl (com luz).</li><li>➖ <b>Eliminação</b>: o contrário da adição; forma uma dupla e solta uma molécula pequena. Ex.: etanol → eteno + água (com ácido e calor).</li><li>🍌 <b>Esterificação</b>: ácido + álcool ⇌ éster + água (e o contrário é a hidrólise).</li><li>⚡ <b>Oxidação</b>: álcool → aldeído → ácido.</li></ul>']],
  ['ex', ['<b>Balanceie a combustão completa do propano.</b> C₃H₈ + O₂ → CO₂ + H₂O.',
    '<ul class="fl-list"><li>Carbono: 3 → 3 CO₂.</li><li>Hidrogênio: 8 → 4 H₂O.</li><li>Oxigênio do lado direito: 3 × 2 + 4 × 1 = 10 → 5 O₂.</li><li><b>C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O</b>.</li></ul>',
    'Regra geral para alcanos CₙH₂ₙ₊₂: precisa de (3n + 1)/2 mols de O₂.']],
  ['err', ['<ul class="fl-list"><li>❌ Esquecer de balancear o oxigênio por último (ele aparece em dois produtos).</li><li>❌ "A combustão incompleta só produz menos energia." Ela produz CO, que é venenoso.</li></ul>']],
  ['dia', ['Margarina (adição de H₂ a óleos), álcool combustível feito de eteno (adição de água), cheiros artificiais (esterificação), biodiesel (transesterificação de óleo com metanol ou etanol) e o bafômetro moderno (que oxida o álcool numa célula de combustível e mede a corrente gerada).']]);

deep('o-poly',
  ['calma', ['Dois jeitos de fazer polímeros:',
    '<ul class="fl-list"><li><b>Adição</b>: monômeros com dupla ligação se abrem e se encadeiam, sem perder nenhum átomo. Polietileno, PVC, polipropileno, poliestireno, teflon.</li><li><b>Condensação</b>: dois monômeros diferentes, cada um com dois grupos reativos nas pontas, se unem soltando uma molécula pequena (geralmente água). PET (poliéster), náilon (poliamida), baquelite.</li></ul>',
    'As propriedades dependem de como as cadeias se arrumam: cadeias longas e retas se alinham e formam regiões cristalinas (plástico mais duro e opaco); ramificadas ficam bagunçadas (mais flexível e transparente). Se as cadeias forem ligadas umas às outras por pontes (<b>reticulação</b>), o material vira um <b>termofixo</b>: não amolece com calor e não pode ser derretido para reciclar (pneus, resinas). Sem pontes, é <b>termoplástico</b>: derrete e pode ser remoldado.']],
  ['ex', ['<b>Um polietileno tem massa molar de 280.000 g/mol. Quantos monômeros?</b>',
    'Cada unidade de eteno pesa 28 g/mol → 280.000 ÷ 28 = <b>10.000 unidades</b>.',
    '<b>Por que o PET é de condensação?</b> Ele junta um ácido com dois COOH (ácido tereftálico) e um álcool com dois OH (etilenoglicol). Cada ligação éster nova solta uma água.']],
  ['err', ['<ul class="fl-list"><li>❌ "Todo plástico é reciclável do mesmo jeito." Termofixos não derretem.</li><li>❌ "Polímero é sempre sintético." Celulose, amido, proteínas, borracha natural e DNA são polímeros naturais.</li></ul>']],
  ['dia', ['O número dentro do triângulo de reciclagem identifica o plástico (1 PET, 2 PEAD, 3 PVC, 4 PEBD, 5 PP, 6 PS). Os microplásticos, pedacinhos que não se degradam, já foram encontrados no oceano profundo e no sangue humano.']]);

/* ===================== QUÍMICA AMBIENTAL ===================== */
deep('env-green',
  ['calma', ['Por que só algumas moléculas absorvem o infravermelho? A radiação infravermelha tem a energia certa para fazer as ligações <b>vibrarem</b>. Mas só é absorvida se a vibração mudar o <b>momento de dipolo</b> da molécula (lição de polaridade). O CO₂ é apolar parado, mas quando dobra ou estica de forma assimétrica, surge um dipolo: absorve. N₂ e O₂, com átomos iguais, vibram sem criar dipolo nenhum: são transparentes.',
    'O vapor de água é o maior gás estufa, mas a quantidade dele no ar é controlada pela temperatura (chove o excesso). O CO₂ e o metano ficam anos ou séculos no ar, e por isso <b>controlam</b> o termostato: mais CO₂ → mais quente → mais vapor de água → mais quente ainda (uma retroalimentação).',
    'O metano retém cerca de 80 vezes mais calor que o CO₂ em 20 anos, mas some em cerca de uma década; o CO₂ fica por séculos.']],
  ['ex', ['<b>Quanto CO₂ sai de 1 litro de gasolina?</b> (aproximando gasolina por octano, densidade 0,74 kg/L)',
    '<ul class="fl-list"><li>740 g ÷ 114 g/mol ≈ 6,5 mol de C₈H₁₈.</li><li>Cada mol dá 8 mols de CO₂ → 52 mol × 44 g/mol ≈ <b>2,3 kg de CO₂</b>.</li><li>Sai mais massa de CO₂ do que de gasolina porque o oxigênio vem do ar.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "O efeito estufa é ruim." Sem ele, a Terra teria −18 °C de média; o problema é o excesso.</li><li>❌ Confundir efeito estufa com buraco na camada de ozônio. São problemas diferentes, com moléculas diferentes.</li></ul>']],
  ['dia', ['A média de CO₂ no ar passou de 280 ppm antes de 1850 para mais de 420 ppm hoje, medida desde 1958 no observatório de Mauna Loa (a "curva de Keeling"). O aquecimento observado até agora é de cerca de 1,2 °C.']]);

deep('env-acid',
  ['calma', ['Três fontes de acidez na chuva:',
    '<ul class="fl-list"><li><b>CO₂</b> (natural): CO₂ + H₂O ⇌ H₂CO₃, ácido fraco → pH ≈ 5,6.</li><li><b>Óxidos de enxofre</b>: da queima de carvão e combustíveis com enxofre. SO₂ → SO₃ → H₂SO₄ (forte).</li><li><b>Óxidos de nitrogênio (NOₓ)</b>: formados no calor dos motores, quando o N₂ e o O₂ do próprio ar reagem. NO₂ + água → HNO₃ (forte).</li></ul>',
    'Os ácidos fortes descem o pH para 4 ou menos. Raios também formam NOₓ, e vulcões soltam SO₂: a chuva ácida tem fontes naturais, mas as humanas dominam nas cidades e regiões industriais.']],
  ['ex', ['<b>Quanto mais ácida é uma chuva de pH 4,0 em relação à natural (5,6)?</b>',
    'Diferença de 1,6 unidade → 10¹·⁶ ≈ <b>40 vezes</b> mais H⁺.',
    '<b>O mármore reage:</b> CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂. O CaSO₄ (gesso) é mais solúvel e se desfaz com a chuva: as estátuas perdem os detalhes.']],
  ['err', ['<ul class="fl-list"><li>❌ "Toda chuva tem pH 7." A chuva natural já é levemente ácida.</li><li>❌ "Chuva ácida queima a pele." Na concentração real, o dano é lento: acumula em lagos, solos, florestas e construções.</li></ul>']],
  ['dia', ['Em Cubatão (SP), nos anos 1980, a poluição industrial era tanta que a cidade foi chamada de "Vale da Morte", com chuva ácida destruindo a mata da Serra do Mar. Filtros nas chaminés e o diesel com menos enxofre reduziram muito o problema.']]);

deep('env-ozone',
  ['calma', ['O ozônio na estratosfera vive num ciclo natural (o ciclo de Chapman): a luz UV forte quebra o O₂ em dois O, cada O se junta a um O₂ formando O₃, e o O₃ absorve UV e se quebra de novo. Esse ciclo transforma a radiação UV perigosa em calor, e mantém uma quantidade estável de ozônio.',
    'Os CFCs são tão estáveis que ninguém os destrói na baixa atmosfera: eles sobem por anos até a estratosfera, onde o UV forte finalmente quebra a ligação C–Cl. Cada Cl solto vira um catalisador. Sobre a Antártida, o problema é pior porque no inverno polar se formam nuvens de gelo onde o cloro fica "armazenado", e na primavera, com a volta do Sol, é liberado de uma vez: daí o buraco aparecer em setembro e outubro.',
    'Cuidado com a confusão: perto do chão, o ozônio é um <b>poluente</b> (irrita os pulmões, faz parte do smog). O ozônio "bom" é o lá de cima.']],
  ['ex', ['<b>Some as etapas do ciclo do cloro:</b>',
    '<ul class="fl-list"><li>Cl + O₃ → ClO + O₂</li><li>ClO + O → Cl + O₂</li><li>Somando e cortando o que aparece dos dois lados (Cl e ClO): <b>O₃ + O → 2 O₂</b>.</li><li>O cloro não aparece no saldo: é a assinatura de um catalisador.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "O buraco na camada de ozônio causa o aquecimento global." São fenômenos diferentes (embora os CFCs também sejam gases estufa).</li><li>❌ "Ozônio é sempre bom." Perto do chão é poluente.</li></ul>']],
  ['dia', ['Os CFCs foram substituídos por outros gases nas geladeiras e sprays. O Protocolo de Montreal é considerado o acordo ambiental mais bem-sucedido da história: o buraco está diminuindo e deve fechar por volta de 2066. Os protetores solares e o índice UV da previsão do tempo existem por causa dessa história.']]);

/* ===================== NÚCLEO E RADIOATIVIDADE ===================== */
deep('n-stability',
  ['calma', ['Dentro do núcleo, duas forças brigam: a <b>repulsão elétrica</b> entre os prótons, que alcança o núcleo inteiro, e a <b>força forte</b>, muito mais intensa, mas que só atua entre vizinhos colados. Em núcleos grandes, cada próton sente a repulsão de <b>todos</b> os outros, mas a atração só dos vizinhos. Por isso núcleos pesados precisam de nêutrons extras (que colam sem repelir).',
    'A medida da estabilidade é a <b>energia de ligação por núcleon</b>: quanto de energia se libera, por partícula, ao montar o núcleo. Ela cresce rápido nos leves, atinge o máximo no <b>ferro-56</b> e no níquel-62 (os núcleos mais estáveis de todos) e cai devagar nos pesados. Daí saem as duas fontes de energia nuclear: <b>fundir</b> núcleos leves (sobe na curva) e <b>partir</b> núcleos pesados (também sobe).',
    'Existem também os "números mágicos" (2, 8, 20, 28, 50, 82, 126): prótons ou nêutrons nesses números fecham "camadas" no núcleo, como os gases nobres na eletrosfera. O chumbo-208 é "duplamente mágico" (82 prótons e 126 nêutrons): extremamente estável.']],
  ['ex', ['<b>Por que o carbono-14 é radioativo e o 12 não?</b>',
    'O carbono-12 tem 6 prótons e 6 nêutrons, na faixa de estabilidade (n ≈ p nos leves). O carbono-14 tem 8 nêutrons para 6 prótons: nêutrons <b>demais</b>. Ele se corrige transformando um nêutron em próton (β⁻) e vira nitrogênio-14 (7 p, 7 n), que é estável.']],
  ['err', ['<ul class="fl-list"><li>❌ "Mais nêutrons = sempre mais estável." Nêutrons demais também desequilibram.</li><li>❌ "Radioativo = artificial." Existem isótopos radioativos naturais em tudo: rochas, alimentos, no seu corpo.</li></ul>']],
  ['dia', ['O ferro no núcleo das estrelas massivas marca o fim da linha: fundir ferro não libera energia, a estrela perde o "combustível" e colapsa numa supernova. Por isso o ferro é tão abundante no Universo (e no núcleo da Terra).']]);

deep('n-decay',
  ['calma', ['Em todo decaimento, duas coisas se conservam: o <b>número de massa total</b> (A) e a <b>carga total</b> (Z). Escrevendo as partículas com A em cima e Z embaixo, as contas fecham:',
    '<ul class="fl-list"><li>α = ⁴₂He: A −4, Z −2. Típico de núcleos pesados demais.</li><li>β⁻ = ⁰₋₁e: A igual, Z +1. Típico de núcleos com nêutrons demais.</li><li>β⁺ = ⁰₊₁e: A igual, Z −1. Típico de núcleos com prótons demais (assim como a captura eletrônica).</li><li>γ: nada muda em A e Z; é o núcleo soltando energia extra depois de outro decaimento.</li></ul>',
    'O poder de penetração é o contrário do poder de causar dano por contato: a α, grande e com carga +2, para numa folha de papel mas, se o material for <b>engolido ou inalado</b>, causa muito dano às células próximas. A γ atravessa quase tudo e é perigosa de longe.']],
  ['ex', ['<b>O rádio-226 sofre decaimento α. Quem ele vira?</b>',
    '²²⁶₈₈Ra → ⁴₂He + ? → A = 226 − 4 = 222; Z = 88 − 2 = 86 → <b>radônio-222</b>.',
    '<b>O fósforo-32 sofre β⁻:</b> ³²₁₅P → ⁰₋₁e + ³²₁₆S (enxofre-32). A soma de cima: 32 = 0 + 32 ✔; a de baixo: 15 = −1 + 16 ✔.']],
  ['err', ['<ul class="fl-list"><li>❌ "A partícula beta é um elétron da eletrosfera." Ela é criada no núcleo, quando um nêutron vira próton.</li><li>❌ Esquecer que na β⁻ o Z <b>aumenta</b> (o núcleo ganhou um próton).</li><li>❌ "Radiação deixa as coisas radioativas." A exposição a γ ou β não torna um alimento radioativo; isso só acontece com nêutrons ou contaminação.</li></ul>']],
  ['dia', ['Alimentos e materiais hospitalares são esterilizados com radiação γ (sem ficar radioativos), o PET-scan usa β⁺ (o pósitron se aniquila com um elétron e solta dois fótons γ que o aparelho detecta), e o radônio (α) que sai do solo é a segunda causa de câncer de pulmão depois do cigarro.']]);

deep('n-halflife',
  ['calma', ['O decaimento é aleatório para cada átomo, mas a <b>probabilidade</b> de decair por segundo é fixa para cada isótopo. Com muitos átomos, isso dá uma curva previsível, a exponencial:',
    '<p class="al-formula">N = N₀ · (1/2)^(t / t½)</p>',
    'onde N₀ é a quantidade inicial e t½ a meia-vida. Depois de 1 meia-vida, sobra 1/2; de 2, 1/4; de 3, 1/8; de 10, cerca de 1/1000.',
    'A meia-vida não depende de temperatura, pressão nem reação química: o núcleo não "sabe" o que acontece com os elétrons. É por isso que funciona como relógio.']],
  ['ex', ['<b>Um osso tem 1/8 do carbono-14 de um ser vivo. Qual a idade?</b> (t½ = 5.730 anos)',
    '1/8 = (1/2)³ → passaram <b>3 meias-vidas</b> → 3 × 5.730 ≈ <b>17.200 anos</b>.',
    '<b>Iodo-131 (t½ = 8 dias):</b> de 80 mg, quanto sobra em 24 dias? 24/8 = 3 meias-vidas → 80 → 40 → 20 → <b>10 mg</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ "Depois de 2 meias-vidas, acaba tudo." Sobra 1/4.</li><li>❌ "Esquentar ou dissolver acelera o decaimento." Não muda nada.</li><li>❌ Usar carbono-14 para datar rochas de milhões de anos: depois de uns 50 mil anos sobra muito pouco para medir. Para isso usa-se urânio-chumbo ou potássio-argônio.</li></ul>']],
  ['dia', ['Datação de múmias, do Sudário de Turim e de pinturas rupestres (carbono-14); idade da Terra, 4,5 bilhões de anos (urânio-chumbo); escolha de isótopos para exames médicos com meia-vida curta (horas ou dias), para o paciente não ficar radioativo por muito tempo.']]);

deep('n-alchemy',
  ['calma', ['Uma <b>série radioativa</b> é a sequência de decaimentos de um núcleo pesado até um estável. Existem três séries naturais: a do urânio-238 (termina no chumbo-206), a do urânio-235 (termina no chumbo-207) e a do tório-232 (termina no chumbo-208).',
    'Como só a α muda A (de 4 em 4), todos os membros de uma série têm A com o mesmo resto na divisão por 4. Dá para contar quantas α e β aconteceram só olhando o começo e o fim:',
    '<ul class="fl-list"><li>Nº de α = (A inicial − A final) ÷ 4.</li><li>Cada α baixa Z em 2; cada β⁻ sobe Z em 1. Então: Z final = Z inicial − 2·(nº de α) + (nº de β).</li></ul>']],
  ['ex', ['<b>Do urânio-238 (Z = 92) ao chumbo-206 (Z = 82): quantas α e β?</b>',
    '<ul class="fl-list"><li>α = (238 − 206) ÷ 4 = <b>8</b>.</li><li>Z: 82 = 92 − 2 × 8 + β → 82 = 76 + β → <b>β = 6</b>.</li><li>Exatamente o que aparece na cadeia da lição: 8 α e 6 β⁻.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Achar que as reações nucleares seguem as regras de balanceamento de átomos das reações químicas. Os elementos mudam; o que se conserva é A e Z.</li></ul>']],
  ['dia', ['A transmutação artificial é feita em reatores e aceleradores: assim se produzem o tecnécio-99m (o isótopo mais usado em medicina nuclear), o plutônio e todos os elementos depois do urânio na tabela. O elemento 118, o oganessônio, foi feito átomo por átomo, colidindo cálcio contra califórnio.']]);

deep('n-history',
  ['calma', ['A radioatividade mudou a física em poucos anos. Becquerel achou a radiação do urânio por acaso (1896). Marie Curie mediu que a intensidade dependia só da quantidade de urânio, não da forma química: concluiu que a radiação vinha de <b>dentro do átomo</b>, uma ideia revolucionária. Rutherford separou os tipos α e β e, com a α, descobriu o núcleo (1911). Chadwick achou o nêutron (1932), e em 1938 Hahn, Strassmann e Meitner descobriram a fissão.',
    'Medir radiação usa duas grandezas diferentes: a <b>atividade</b> (decaimentos por segundo, em becquerel, Bq) e a <b>dose</b> absorvida pelo corpo, considerando o tipo de radiação (em sievert, Sv). Uma pessoa recebe, em média, uns 2 a 3 mSv por ano de fontes naturais.']],
  ['ex', ['<b>Comparando doses:</b>',
    '<ul class="fl-list"><li>Comer uma banana: ~0,0001 mSv.</li><li>Raio X do tórax: ~0,02 mSv.</li><li>Voo de 10 horas: ~0,05 mSv (mais radiação cósmica lá em cima).</li><li>Tomografia: ~2 a 10 mSv.</li><li>Dose que causa doença aguda: acima de ~1.000 mSv de uma vez.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Qualquer radiação é perigosa." Tudo depende da dose; vivemos o tempo todo com a radiação natural.</li><li>❌ "O micro-ondas e o celular emitem radiação nuclear." Emitem ondas de rádio, que não têm energia para arrancar elétrons (radiação não ionizante).</li></ul>']],
  ['dia', ['No Brasil, o acidente com césio-137 em Goiânia (1987) começou com um aparelho de radioterapia abandonado: o pó brilhante foi espalhado por curiosidade, contaminou centenas de pessoas e matou quatro. Ele mostrou a importância de controlar fontes radioativas, e é estudado no mundo inteiro.']]);
