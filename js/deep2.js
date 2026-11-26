// Grimório → "📖 Aprofundando", parte 2: funções inorgânicas, reações, estequiometria e
// soluções, gases/misturas/coligativas, energia e equilíbrio.

/* ===================== FUNÇÕES INORGÂNICAS ===================== */
deep('i-func',
  ['calma', ['Essas 4 "caixas" (as funções de Arrhenius) vêm do comportamento na <b>água</b>:',
    '<ul class="fl-list"><li>🍋 <b>Ácido</b>: na água, se ioniza e libera H⁺ (que vira H₃O⁺). HCl → H⁺ + Cl⁻.</li><li>🧼 <b>Base</b>: na água, se dissocia e libera OH⁻. NaOH → Na⁺ + OH⁻.</li><li>🧂 <b>Sal</b>: produto da neutralização; na água, se separa em cátion e ânion. NaCl → Na⁺ + Cl⁻.</li><li>🔥 <b>Óxido</b>: composto binário com oxigênio (e o O é o mais eletronegativo dos dois).</li></ul>',
    'Repare na diferença de verbo: ácidos se <b>ionizam</b> (são moléculas que, na água, se quebram em íons); bases de metal e sais se <b>dissociam</b> (os íons já existiam no cristal, só se separam).',
    'A neutralização no fundo é uma reação só: <b>H⁺ + OH⁻ → H₂O</b>. O resto (os íons do sal) só acompanha. Quando a quantidade de H⁺ e de OH⁻ é igual, a neutralização é <b>total</b>; se sobra H⁺, forma-se um sal ácido (como o NaHSO₄, que ainda tem um H).']],
  ['ex', ['<b>Monte a fórmula do sal entre o Ca(OH)₂ e o H₃PO₄.</b>',
    '<ul class="fl-list"><li>Íons: Ca²⁺ e PO₄³⁻.</li><li>MMC das cargas: 6. Precisa de 3 Ca²⁺ (+6) e 2 PO₄³⁻ (−6) → <b>Ca₃(PO₄)₂</b>.</li><li>Atalho: as cargas "cruzam" e viram índices (2 vai para o fosfato, 3 vai para o cálcio).</li><li>Equação: 2 H₃PO₄ + 3 Ca(OH)₂ → Ca₃(PO₄)₂ + 6 H₂O (6 H⁺ encontram 6 OH⁻).</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Todo composto que começa com H é ácido." CH₄ e H₂O não são ácidos de Arrhenius (o H não sai como H⁺).</li><li>❌ "Todo composto com OH é base." O etanol (C₂H₅OH) tem OH ligado a carbono e não solta OH⁻.</li><li>❌ Esquecer os parênteses: Ca(OH)₂ tem 2 grupos OH; CaOH₂ seria outra coisa.</li></ul>']],
  ['dia', ['Fermento químico é bicarbonato (NaHCO₃) com um ácido em pó: com água, os dois reagem e soltam CO₂, que faz a massa crescer. A cal (CaO) corrige a acidez do solo na agricultura, e o soro caseiro mistura sal e açúcar para repor íons.']]);

deep('i-name',
  ['calma', ['A lógica dos nomes é a da <b>quantidade de oxigênio</b> do mesmo elemento. Para o cloro, por exemplo, existe uma família inteira:',
    '<table class="fl-tb"><tr><th>Ácido</th><th>Nome</th><th>Ânion</th></tr><tr><td>HClO</td><td>hipocloroso</td><td>hipoclorito</td></tr><tr><td>HClO₂</td><td>cloroso</td><td>clorito</td></tr><tr><td>HClO₃</td><td>clórico</td><td>clorato</td></tr><tr><td>HClO₄</td><td>perclórico</td><td>perclorato</td></tr></table>',
    'Do menos para o mais oxigenado: <b>hipo…oso → …oso → …ico → per…ico</b>. E o ânion troca o final: -oso → -ito, -ico → -ato (os prefixos ficam).',
    'Para metais com mais de uma carga possível, o número romano diz a carga: ferro(II) = Fe²⁺, ferro(III) = Fe³⁺. Antigamente se usava -oso para a menor e -ico para a maior (ferroso e férrico), e esses nomes ainda aparecem.']],
  ['ex', ['<b>Dê nome ao Fe₂(SO₄)₃.</b>',
    '<ul class="fl-list"><li>O sulfato é SO₄²⁻. Três sulfatos = carga −6.</li><li>Dois ferros têm que somar +6 → cada um é Fe³⁺.</li><li>Nome: <b>sulfato de ferro(III)</b> (ou sulfato férrico).</li></ul>',
    '<b>E o KNO₂?</b> NO₂⁻ vem do ácido nitroso (HNO₂) → -oso vira -ito → <b>nitrito de potássio</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ Trocar nitrato (NO₃⁻) por nitrito (NO₂⁻). Mais oxigênio = -ato.</li><li>❌ Usar prefixos (di, tri) em compostos iônicos: é cloreto de cálcio, não "dicloreto de cálcio".</li><li>❌ Esquecer o número romano no ferro, cobre e chumbo, que têm mais de uma carga.</li></ul>']],
  ['dia', ['Rótulos estão cheios desses nomes: "nitrito de sódio" (conservante de embutidos), "hipoclorito de sódio" (água sanitária), "bicarbonato de sódio" (fermento), "sulfato ferroso" (remédio contra anemia), "fosfato de cálcio" (ossos e dentes).']]);

/* ===================== POR QUE AS COISAS REAGEM ===================== */
deep('r-energy',
  ['calma', ['O calor trocado numa reação se chama <b>variação de entalpia (ΔH)</b>: ΔH = H(produtos) − H(reagentes). Se os produtos têm menos energia, ΔH é <b>negativo</b> e a reação é <b>exotérmica</b> (solta calor). Se têm mais, ΔH é positivo e ela é <b>endotérmica</b> (absorve calor).',
    'A <b>energia de ativação (Eₐ)</b> é outra coisa: é a altura da colina entre os dois. Ela não muda o ΔH, mas decide a <b>velocidade</b>. Uma reação pode liberar muita energia e mesmo assim ficar parada por anos, se a colina for alta: é o caso do papel no ar, da gasolina no tanque e do diamante virando grafite.',
    'Lá em cima da colina fica o <b>complexo ativado</b>: um arranjo instável em que as ligações velhas estão meio quebradas e as novas, meio formadas.']],
  ['ex', ['<b>Leia o diagrama:</b> reagentes em 100 kJ, topo da colina em 180 kJ, produtos em 40 kJ.',
    '<ul class="fl-list"><li>ΔH = 40 − 100 = <b>−60 kJ</b> → exotérmica.</li><li>Eₐ (ida) = 180 − 100 = <b>80 kJ</b>.</li><li>Eₐ (volta) = 180 − 40 = <b>140 kJ</b>: a reação inversa é bem mais difícil.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Exotérmica = rápida." Rapidez depende da Eₐ, não do ΔH.</li><li>❌ Errar o sinal: ΔH negativo é liberar calor (o sistema perde energia).</li><li>❌ "A faísca fornece a energia da reação." Ela só ajuda a passar a colina; a energia que sai vem das ligações.</li></ul>']],
  ['dia', ['Bolsas de gel quentes (de cristalização) e frias (nitrato de amônio dissolvendo na água) usam exatamente essas ideias. E o palito de fósforo é desenhado para ter a Eₐ certa: o atrito na lixa fornece o empurrão inicial.']]);

deep('r-bonds',
  ['calma', ['A conta de energia de ligação é: <b>ΔH ≈ Σ (ligações quebradas) − Σ (ligações formadas)</b>. Quebrar entra com sinal +, formar entra com sinal −. Se o que se forma é mais forte, o resultado é negativo (exotérmica).',
    'Por que "≈"? As energias de ligação das tabelas são <b>médias</b>: uma ligação C–H no metano não é idêntica a uma C–H no etanol. A conta é uma ótima estimativa, não um valor exato. Para valores exatos usam-se as entalpias de formação (tópico de energia e equilíbrio).']],
  ['ex', ['<b>Estime o ΔH da queima do metano:</b> CH₄ + 2 O₂ → CO₂ + 2 H₂O. Energias (kJ/mol): C–H 413, O=O 498, C=O (no CO₂) 799, O–H 463.',
    '<ul class="fl-list"><li>Quebradas: 4 C–H + 2 O=O = 4 × 413 + 2 × 498 = 1.652 + 996 = <b>2.648 kJ</b>.</li><li>Formadas: 2 C=O + 4 O–H = 2 × 799 + 4 × 463 = 1.598 + 1.852 = <b>3.450 kJ</b>.</li><li>ΔH ≈ 2.648 − 3.450 = <b>−802 kJ</b> (o valor medido, com água vapor, é −802; com água líquida, −890).</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Fazer "formadas − quebradas" e errar o sinal.</li><li>❌ Esquecer os coeficientes: 2 O₂ são 2 ligações O=O.</li><li>❌ Contar só um lado da molécula (o CH₄ tem 4 ligações C–H).</li></ul>']],
  ['dia', ['É essa conta que explica por que hidrogênio e metano são bons combustíveis (formam O–H e C=O, ligações fortíssimas) e por que o N₂ do ar é tão inerte (para reagir, primeiro precisa quebrar 945 kJ).']]);

deep('r-alkali',
  ['calma', ['A reação é uma oxirredução: o metal perde o elétron (oxida) e a água ganha (o H⁺ dela vira H₂). Por exemplo: <b>2 Na + 2 H₂O → 2 NaOH + H₂</b>. Por isso a água fica <b>básica</b> (o NaOH é uma base forte, e a fenolftaleína fica rosa).',
    'Descendo o grupo, a energia de ionização cai (Li 5,4 eV → Cs 3,9 eV): o elétron sai cada vez mais fácil. Além disso, os metais mais pesados derretem com o próprio calor da reação (o césio derrete a 28 °C, quase na temperatura da mão), expondo mais superfície. E o H₂ que se forma, com o calor e o oxigênio do ar, pode pegar fogo: é ele que faz a "explosão".',
    'Curiosidade: o lítio tem energia de ionização maior, mas, em termos de energia total liberada, é até um dos que mais libera (o Li⁺, pequeno, é muito bem "abraçado" pelas moléculas de água). Ele é calmo porque a reação é <b>lenta</b>, não porque libera pouco. É o mesmo aviso da energia de ativação: liberar muita energia não significa reagir rápido.']],
  ['ex', ['<b>Quanto hidrogênio sai de 4,6 g de sódio?</b>',
    '<ul class="fl-list"><li>4,6 g ÷ 23 g/mol = 0,2 mol de Na.</li><li>Proporção: 2 Na dão 1 H₂ → 0,2 mol de Na dão <b>0,1 mol de H₂</b>.</li><li>Volume a 25 °C: 0,1 × 24,5 ≈ <b>2,45 L</b> de gás.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "O sódio explode porque é muito pesado." Ele é tão leve que flutua; a "explosão" vem do H₂ e do calor.</li><li>❌ "O metal se dissolve como o açúcar." Ele reage e vira outra substância (NaOH).</li></ul>']],
  ['dia', ['Por isso esses metais são guardados no óleo e nunca se apaga fogo de sódio com água. As baterias de íon-lítio usam justamente a facilidade do lítio em perder o elétron, e também são perigosas se perfuradas.']]);

deep('r-polar',
  ['calma', ['A regra "semelhante dissolve semelhante" tem um porquê de energia. Para dissolver, é preciso <b>separar</b> as moléculas do soluto e abrir espaço entre as do solvente (custa energia) e depois <b>juntar</b> soluto com solvente (libera energia). Dissolve bem quando o que se ganha no final compensa o que se gastou.',
    'Com água e óleo, colocar óleo no meio da água quebra várias ligações de hidrogênio água-água, e a atração óleo-água, fraca, não compensa. Ainda tem um efeito de <b>organização</b>: as moléculas de água em volta do óleo ficam "presas" numa arrumação rígida, o que o sistema evita. Juntar todo o óleo numa gota só minimiza esse contato: é o <b>efeito hidrofóbico</b>.']],
  ['ex', ['<b>Quem dissolve em quê?</b>',
    '<ul class="fl-list"><li>Sal na água: os íons são cercados pelos lados opostos das moléculas de água (o lado δ− no Na⁺, o δ+ no Cl⁻) → dissolve.</li><li>Iodo (I₂, apolar) na água: quase nada. No álcool ou no óleo: bem mais.</li><li>Etanol na água: dissolve em qualquer proporção (ligação de hidrogênio dos dois lados).</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "O óleo flutua porque não se mistura." Ele não se mistura por polaridade e flutua por ser menos denso: são dois motivos diferentes.</li><li>❌ "Água e óleo se repelem." Eles se atraem um pouco; só que a água se atrai muito mais a si mesma.</li></ul>']],
  ['dia', ['Manchas de gordura não saem só com água, a vinagrete se separa se você parar de mexer, e vitaminas A, D, E e K (apolares) são absorvidas junto com gordura, enquanto as vitaminas B e C (polares) se dissolvem na água e sobram na urina.']]);

deep('r-soap',
  ['calma', ['Sabão é o sal de um <b>ácido graxo</b> (uma cadeia longa de carbono com um COO⁻ na ponta), feito aquecendo gordura com uma base forte: é a <b>saponificação</b>. A cabeça COO⁻Na⁺ é iônica e adora água; a cauda de 12 a 18 carbonos é apolar e adora gordura. Moléculas assim se chamam <b>anfifílicas</b>.',
    'Na água, acima de uma certa concentração, as moléculas de sabão se juntam sozinhas em <b>micelas</b> (bolinhas com as caudas para dentro e as cabeças para fora). A gordura entra no "miolo" apolar da micela, e a micela, por fora toda polar, vai embora com a água.',
    'Detergentes sintéticos fazem o mesmo, mas a cabeça é um grupo sulfonato (SO₃⁻), que funciona melhor em água "dura" (com muito Ca²⁺ e Mg²⁺). Com o sabão comum, esses íons formam um sal insolúvel: a "nata" que fica na banheira.']],
  ['ex', ['<b>Saponificação simplificada:</b> gordura (um triéster) + 3 NaOH → glicerol + 3 sabões (R–COO⁻Na⁺).',
    'Cada "braço" de ácido graxo da gordura vira uma molécula de sabão. Por isso, de 1 mol de gordura saem 3 mols de sabão. É a mesma química do sabão caseiro feito com óleo usado e soda cáustica.']],
  ['err', ['<ul class="fl-list"><li>❌ "O sabão destrói a gordura." Ele só a envolve e carrega; nenhuma ligação se quebra.</li><li>❌ "Quanto mais espuma, mais limpa." A espuma não tem relação direta com o poder de limpeza.</li></ul>']],
  ['dia', ['Lavar as mãos destrói até alguns vírus: o envelope deles é uma camada de gordura, que o sabão desmancha. A bile do seu fígado faz o mesmo papel do sabão no intestino, quebrando a gordura dos alimentos em gotinhas para ser digerida.']]);

deep('r-speed',
  ['calma', ['A <b>teoria das colisões</b>: para reagir, as partículas precisam (1) se chocar, (2) com energia suficiente (acima da Eₐ) e (3) na orientação certa. Tudo que aumenta os choques úteis acelera a reação.',
    'A temperatura tem um efeito desproporcional: num gás, as moléculas têm várias velocidades, e só a "cauda" mais rápida passa da colina. Aquecer um pouco aumenta muito essa cauda. Uma regra prática: <b>10 °C a mais costuma dobrar a velocidade</b> de muitas reações (equação de Arrhenius: k = A·e^(−Eₐ/RT)).',
    'O <b>catalisador</b> abre um caminho alternativo com colina mais baixa. Ele participa da reação mas sai intacto no fim, e <b>não muda o ΔH</b> nem o equilíbrio: só faz chegar lá mais rápido.']],
  ['ex', ['<b>Uma reação leva 40 minutos a 20 °C. E a 40 °C?</b>',
    'Pela regra prática, a cada 10 °C a velocidade dobra: 20 → 30 °C dobra, 30 → 40 °C dobra de novo → 4 vezes mais rápida → cerca de <b>10 minutos</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ "O catalisador fornece energia." Ele baixa a colina; não muda a energia de reagentes nem de produtos.</li><li>❌ "O catalisador é consumido." Ele é regenerado no fim.</li><li>❌ "Aquecer só funciona para reações endotérmicas." Acelera as exotérmicas também.</li></ul>']],
  ['dia', ['Geladeira (menos temperatura → comida estraga devagar), panela de pressão (mais temperatura → cozinha rápido), catalisador do escapamento dos carros (transforma CO e NOₓ em CO₂ e N₂), enzimas digestivas e o pó de serra que pode explodir num silo (superfície enorme).']]);

/* ===================== ESTEQUIOMETRIA E SOLUÇÕES ===================== */
deep('s-ratio',
  ['calma', ['O roteiro de toda conta estequiométrica tem 4 passos:',
    '<ol class="fl-list"><li><b>Balancear</b> a equação (os coeficientes são a receita em mols).</li><li><b>Converter</b> o que foi dado para mols (gramas ÷ massa molar; litros de gás ÷ 24,5).</li><li><b>Usar a proporção</b> dos coeficientes para achar os mols do que se pede.</li><li><b>Converter de volta</b> para a unidade pedida.</li></ol>',
    'Se forem dados dois reagentes, descubra antes qual é o <b>limitante</b>: divida os mols de cada um pelo seu coeficiente. O menor resultado é o limitante, e é ele que manda na conta.']],
  ['ex', ['<b>Quanta água se forma com 10 g de H₂ e 64 g de O₂?</b> (2 H₂ + O₂ → 2 H₂O)',
    '<ul class="fl-list"><li>H₂: 10 ÷ 2 = 5 mol → ÷ coeficiente 2 = 2,5.</li><li>O₂: 64 ÷ 32 = 2 mol → ÷ coeficiente 1 = 2.</li><li>O menor é o do O₂ → <b>O₂ é o limitante</b>.</li><li>2 mol de O₂ formam 4 mol de H₂O = 4 × 18 = <b>72 g de água</b>.</li><li>Gastou 4 mol de H₂ (8 g); sobram <b>2 g de H₂</b>. Conferência: 10 + 64 = 74 g = 72 + 2 ✔</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Usar a proporção em <b>gramas</b>: 2 H₂ + O₂ não quer dizer 2 g + 1 g.</li><li>❌ Escolher como limitante o reagente com menos mols, sem dividir pelo coeficiente.</li><li>❌ Começar sem balancear a equação.</li></ul>']],
  ['dia', ['Fábricas usam de propósito um reagente <b>em excesso</b>, geralmente o mais barato, para garantir que o caro seja todo aproveitado. É o caso do ar (oxigênio de graça) na queima de combustíveis.']]);

deep('s-yield',
  ['calma', ['Duas porcentagens diferentes aparecem nas contas da indústria:',
    '<ul class="fl-list"><li><b>Pureza</b>: quanto da amostra é de fato o reagente. Aplica-se <b>antes</b> da conta: massa útil = massa total × pureza.</li><li><b>Rendimento</b>: quanto do produto possível foi de fato obtido. Aplica-se <b>depois</b>: produto real = produto teórico × rendimento.</li></ul>',
    'O rendimento é menor que 100% por vários motivos: reações que não vão até o fim (equilíbrio), reações paralelas que geram outros produtos, perdas na filtração, na transferência entre frascos, na purificação.']],
  ['ex', ['<b>500 g de calcário com 90% de CaCO₃, rendimento de 80%. Quanto CaO sai?</b>',
    '<ul class="fl-list"><li>Parte pura: 500 × 0,9 = 450 g de CaCO₃ → 450 ÷ 100 = 4,5 mol.</li><li>CaCO₃ → CaO + CO₂ (1 : 1) → 4,5 mol de CaO teóricos → 4,5 × 56 = 252 g.</li><li>Rendimento: 252 × 0,8 = <b>201,6 g de CaO</b>.</li></ul>',
    '<b>Caminho inverso:</b> obtive 42 g de CaO quando o teórico era 56 g → rendimento = 42 ÷ 56 = <b>75%</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ Aplicar a pureza no produto, ou o rendimento no reagente.</li><li>❌ Multiplicar pelo número da porcentagem inteiro (90 em vez de 0,9).</li></ul>']],
  ['dia', ['Na indústria farmacêutica, um remédio pode passar por 10 etapas com 80% de rendimento cada. O rendimento total é 0,8¹⁰ ≈ 11%: por isso alguns medicamentos são tão caros.']]);

deep('s-conc',
  ['calma', ['As formas de expressar concentração mais usadas:',
    '<ul class="fl-list"><li><b>Concentração comum (g/L)</b>: C = m(soluto) / V(solução).</li><li><b>Molaridade (mol/L)</b>: M = n(soluto) / V(solução) = m / (massa molar × V).</li><li><b>Título ou porcentagem</b>: massa do soluto ÷ massa da solução (ex.: vinagre 4%).</li><li><b>ppm</b> (partes por milhão): para coisas muito diluídas, como poluentes e flúor na água; 1 ppm ≈ 1 mg por litro de água.</li></ul>',
    'Atenção: o volume é o da <b>solução</b> pronta, não o do solvente. Dissolver 58,5 g de sal em 1 L de água dá um pouco mais de 1 L de solução.']],
  ['ex', ['<b>Quanto sal para 500 mL de soro fisiológico (9 g/L)? E qual a molaridade?</b>',
    '<ul class="fl-list"><li>m = C × V = 9 g/L × 0,5 L = <b>4,5 g de NaCl</b>.</li><li>M = 9 g/L ÷ 58,5 g/mol = <b>0,154 mol/L</b>.</li></ul>',
    '<b>Passando de uma para a outra:</b> C (g/L) = M (mol/L) × massa molar (g/mol).']],
  ['err', ['<ul class="fl-list"><li>❌ Usar mL na fórmula em vez de L (500 mL = 0,5 L).</li><li>❌ Confundir concentração (g/L) com densidade da solução (também g/L ou g/mL, mas é a massa de toda a solução).</li></ul>']],
  ['dia', ['O teor de álcool de bebidas (% em volume), o flúor na água tratada (cerca de 0,7 ppm), o nível de glicose do sangue (mg/dL) e os limites de poluentes no ar: tudo é concentração.']]);

deep('s-dilute',
  ['calma', ['Na diluição, só se acrescenta solvente: a quantidade de soluto não muda. Então n = C₁·V₁ = C₂·V₂. Vale em g/L ou em mol/L, desde que dos dois lados.',
    'O caso oposto é a <b>mistura de soluções</b> do mesmo soluto: somam-se as quantidades e os volumes. C_final = (C₁V₁ + C₂V₂) / (V₁ + V₂). Se os solutos forem diferentes e reagirem entre si (ácido com base), aí é estequiometria.']],
  ['ex', ['<b>Quanto da solução estoque de 2 mol/L preciso para 250 mL de solução 0,1 mol/L?</b>',
    'C₁V₁ = C₂V₂ → 2 × V₁ = 0,1 × 0,25 → V₁ = 0,0125 L = <b>12,5 mL</b>. Pega-se 12,5 mL do estoque e completa-se com água até 250 mL.',
    '<b>Mistura:</b> 100 mL de suco a 50 g/L + 300 mL a 10 g/L → (5 g + 3 g) / 0,4 L = <b>20 g/L</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ Usar V₂ como o volume de água adicionado. V₂ é o volume <b>final</b> (V₁ + água).</li><li>❌ Fazer média simples das concentrações numa mistura de volumes diferentes.</li></ul>']],
  ['dia', ['Diluir água sanitária para limpar, preparar leite em pó e o suco concentrado, e a homeopatia (diluída tantas vezes que, matematicamente, não sobra nem uma molécula do soluto original).']]);

/* ===================== GASES, MISTURAS, COLIGATIVAS ===================== */
deep('g-gas',
  ['calma', ['A equação dos gases ideais junta tudo: <b>P·V = n·R·T</b>, com R = 0,082 atm·L/(mol·K) e T sempre em kelvin. Daí saem as leis com uma das variáveis fixa:',
    '<ul class="fl-list"><li><b>Boyle</b> (T fixa): P·V = constante.</li><li><b>Charles</b> (P fixa): V / T = constante.</li><li><b>Gay-Lussac</b> (V fixo): P / T = constante.</li><li>Juntando: P₁V₁/T₁ = P₂V₂/T₂ (para a mesma quantidade de gás).</li></ul>',
    'A teoria cinética mostra o porquê: a energia média de movimento das moléculas é proporcional a T (em kelvin). O "gás ideal" supõe moléculas sem tamanho e sem atração entre si; isso funciona bem com pressão baixa e temperatura alta. Gases reais desviam quando muito comprimidos ou frios, perto de virarem líquido.']],
  ['ex', ['<b>Um pneu tem 2 atm a 27 °C. Depois de rodar, chega a 57 °C. Qual a pressão?</b> (volume quase fixo)',
    'T₁ = 27 + 273 = 300 K; T₂ = 57 + 273 = 330 K. P₂ = P₁ × T₂/T₁ = 2 × 330/300 = <b>2,2 atm</b>.',
    '<b>Quantos mols de ar num quarto de 30 m³ (30.000 L) a 1 atm e 25 °C?</b> n = PV/RT = (1 × 30.000) / (0,082 × 298) ≈ <b>1.228 mol</b> (cerca de 35 kg de ar!).']],
  ['err', ['<ul class="fl-list"><li>❌ Usar °C nas fórmulas: dobrar de 10 °C para 20 °C não dobra nada (é 283 K → 293 K).</li><li>❌ Esquecer de manter as unidades de R coerentes (atm com litros).</li></ul>']],
  ['dia', ['Calibrar o pneu "a frio" (a leitura muda depois de rodar), o balão de ar quente (ar quente é menos denso e sobe), o desodorante que gela a lata ao sair (expansão rápida resfria) e a respiração (o diafragma aumenta o volume do pulmão, a pressão cai e o ar entra).']]);

deep('g-mix',
  ['calma', ['Primeiro classifique: <b>substância pura</b> (um tipo de molécula só, com ponto de ebulição fixo) ou <b>mistura</b>. Misturas podem ser <b>homogêneas</b> (uma fase só) ou <b>heterogêneas</b> (mais de uma fase visível).',
    'Para heterogêneas, os métodos são <b>mecânicos</b> e baratos: catação, peneiração, filtração, decantação, centrifugação (que acelera a decantação), separação magnética. Para homogêneas, é preciso mudar de estado: evaporação, destilação, ou métodos como a cromatografia (que separa pela diferença de "grude" com um material).',
    'Na prática, combinam-se vários: na estação de tratamento de água, a sujeira é agrupada em flocos (floculação), decantada, filtrada e só então a água é desinfetada com cloro.']],
  ['ex', ['<b>Como separar sal, areia e água?</b>',
    '<ol class="fl-list"><li><b>Filtração</b>: a areia fica no papel; o sal passa dissolvido.</li><li><b>Evaporação</b> (ou destilação, se quiser a água de volta) do que passou: sobra o sal.</li></ol>',
    '<b>E uma mistura de água e álcool, o que ferve a 78,2 °C?</b> Nem a destilação fracionada passa de ~95,6% de álcool: essa mistura forma um <b>azeótropo</b>, que ferve como se fosse uma substância só.']],
  ['err', ['<ul class="fl-list"><li>❌ "Homogêneo = substância pura." Água com sal é homogênea e é mistura.</li><li>❌ Filtrar uma solução esperando separar o sal dissolvido.</li></ul>']],
  ['dia', ['Coar o café (filtração e extração), o filtro de barro, a centrífuga da máquina de lavar, a refinaria de petróleo (destilação fracionada) e o exame de sangue (o sangue é centrifugado para separar o plasma das células).']]);

deep('g-coll',
  ['calma', ['As propriedades coligativas dependem do <b>número</b> de partículas dissolvidas, não da sua natureza. As fórmulas para soluções diluídas em água:',
    '<p class="al-formula">ΔT_eb = 0,52 · i · m &nbsp;&nbsp; ΔT_cong = 1,86 · i · m</p>',
    'onde m é a molalidade (mol de soluto por kg de água) e i é o <b>fator de van \'t Hoff</b>: quantas partículas cada fórmula gera (açúcar 1, NaCl 2, CaCl₂ 3).',
    'O porquê, pela pressão de vapor: com partículas de soluto na superfície, menos moléculas de água escapam. Para ferver, é preciso esquentar mais até a pressão de vapor chegar à pressão do ar. No congelamento, o soluto atrapalha a arrumação do cristal de gelo.',
    'A quarta propriedade é a <b>osmose</b>: a água atravessa uma membrana do lado diluído para o concentrado, tentando igualar. A pressão que precisa ser feita para impedir isso é a pressão osmótica.']],
  ['ex', ['<b>Quanto abaixa o congelamento de 1 kg de água com 117 g de NaCl?</b>',
    '117 ÷ 58,5 = 2 mol de NaCl → m = 2 mol/kg; i = 2 → ΔT = 1,86 × 2 × 2 = <b>7,44 °C</b>. A água congela a cerca de −7,4 °C.',
    '<b>E o sal no macarrão?</b> Uma colher (10 g) em 2 L: 0,17 mol / 2 kg ≈ 0,085 mol/kg × 2 × 0,52 ≈ <b>0,09 °C</b> a mais. Quase nada.']],
  ['err', ['<ul class="fl-list"><li>❌ Esquecer o i: 1 mol de NaCl tem efeito de 2 mols de partículas.</li><li>❌ "Água com sal ferve mais rápido." Ela ferve a uma temperatura um pouco <b>maior</b>.</li></ul>']],
  ['dia', ['Anticongelante no radiador, sal derretendo gelo na estrada, peixes de água doce que morrem no mar (a água sai das células por osmose), conservas em sal e açúcar (bactérias desidratam) e a dessalinização por osmose reversa.']]);

/* ===================== ENERGIA E EQUILÍBRIO ===================== */
deep('t-hess',
  ['calma', ['A lei de Hess vale porque a entalpia é uma <b>função de estado</b>: o valor depende só de onde o sistema está, não de como chegou. Como altitude: se você sobe e desce morros entre duas cidades, a diferença de altura entre elas é a mesma.',
    'Na prática, monta-se um quebra-cabeça de equações conhecidas que, somadas, dão a equação desejada. As regras:',
    '<ul class="fl-list"><li>Inverter a equação → inverter o sinal do ΔH.</li><li>Multiplicar a equação por um número → multiplicar o ΔH pelo mesmo número.</li><li>Substâncias que aparecem dos dois lados se cancelam.</li></ul>']],
  ['ex', ['<b>Calcule o ΔH de C + ½ O₂ → CO</b> (difícil de medir, porque parte sempre vira CO₂). Dados: (1) C + O₂ → CO₂, ΔH = −394 kJ; (2) CO + ½ O₂ → CO₂, ΔH = −283 kJ.',
    '<ul class="fl-list"><li>Mantém (1): C + O₂ → CO₂ (−394).</li><li>Inverte (2): CO₂ → CO + ½ O₂ (+283).</li><li>Soma: C + O₂ + CO₂ → CO₂ + CO + ½ O₂ → cancela CO₂ e ½ O₂ → <b>C + ½ O₂ → CO</b>.</li><li>ΔH = −394 + 283 = <b>−111 kJ</b>.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Inverter a equação e esquecer de trocar o sinal.</li><li>❌ Multiplicar a equação e não o ΔH.</li><li>❌ Esquecer o estado físico: H₂O líquida e gasosa têm ΔH diferentes (a diferença é o calor de vaporização).</li></ul>']],
  ['dia', ['É assim que se conhecem energias de reações perigosas, lentas ou impossíveis de medir diretamente, e é a base dos cálculos de combustíveis e da nutrição: uma caloria de glicose rende o mesmo queimada num calorímetro ou "queimada" devagar nas suas células.']]);

deep('t-fuel',
  ['calma', ['A <b>entalpia de formação padrão (ΔH°f)</b> é o ΔH para formar 1 mol de uma substância a partir dos seus elementos na forma mais estável, a 25 °C e 1 atm. Por definição, os elementos nessa forma (O₂, H₂, C grafite) valem <b>zero</b>.',
    'Com uma tabela de ΔH°f, qualquer reação sai de uma conta só: <b>ΔH = Σ ΔH°f(produtos) − Σ ΔH°f(reagentes)</b>, multiplicando cada um pelo seu coeficiente. É a lei de Hess automatizada: é como se todos os reagentes fossem desmontados em elementos e remontados em produtos.',
    'Para comparar combustíveis, duas medidas importam: a energia <b>por massa</b> (quanto pesa carregar) e por <b>volume</b> (quanto espaço ocupa). O hidrogênio é campeão por massa, mas, sendo um gás levíssimo, é péssimo por volume: precisa ser comprimido a 700 atm ou resfriado a −253 °C.']],
  ['ex', ['<b>Calcule a queima do etanol:</b> C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O(l). ΔH°f: etanol −278; CO₂ −394; H₂O(l) −286; O₂ 0 (kJ/mol).',
    '<ul class="fl-list"><li>Produtos: 2 × (−394) + 3 × (−286) = −788 − 858 = −1.646.</li><li>Reagentes: −278 + 0 = −278.</li><li>ΔH = −1.646 − (−278) = <b>−1.368 kJ/mol</b>.</li><li>Por grama: 1.368 ÷ 46 ≈ <b>29,7 kJ/g</b> (a gasolina dá cerca de 48 kJ/g).</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Inverter a ordem (reagentes − produtos).</li><li>❌ Esquecer os coeficientes ou achar que o O₂ tem ΔH°f diferente de zero.</li></ul>']],
  ['dia', ['É por isso que o carro a álcool faz menos quilômetros por litro que a gasolina (menos energia por litro), e por que o etanol ainda assim é vantajoso: o CO₂ que ele solta foi tirado do ar pela cana. Esse balanço de carbono é o centro da discussão sobre combustíveis.']]);

deep('e-eq',
  ['calma', ['No equilíbrio, as velocidades de ida e de volta são iguais, e as concentrações ficam constantes. A relação entre elas é fixa para cada temperatura: a <b>constante de equilíbrio K</b>. Para aA + bB ⇌ cC + dD:',
    '<p class="al-formula">K = [C]ᶜ · [D]ᵈ / ([A]ᵃ · [B]ᵇ)</p>',
    'K grande (≫ 1) → no equilíbrio predominam os produtos; K pequeno (≪ 1) → predominam os reagentes. Sólidos e líquidos puros não entram na expressão. Só a <b>temperatura</b> muda o valor de K; concentração e pressão deslocam o equilíbrio, mas K continua o mesmo. O catalisador não desloca nada, só faz chegar mais rápido.',
    'Le Chatelier, caso a caso: mexer na concentração ou na pressão desequilibra a fração; o sistema reage até que ela volte a valer K. Mexer na temperatura muda o próprio K: aquecer favorece o sentido endotérmico.']],
  ['ex', ['<b>Na síntese da amônia</b> (N₂ + 3 H₂ ⇌ 2 NH₃, ΔH = −92 kJ), o que aumenta a produção?',
    '<ul class="fl-list"><li>Pressão alta: 4 moléculas de gás viram 2 → desloca para a amônia ✔</li><li>Retirar NH₃ conforme se forma ✔</li><li>Temperatura <b>baixa</b> favorece a amônia (a ida é exotérmica)… mas deixa a reação lentíssima.</li><li>Solução industrial (processo Haber-Bosch): ~450 °C (meio-termo), 200 atm e catalisador de ferro.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "No equilíbrio a reação parou." As duas continuam, na mesma velocidade.</li><li>❌ "No equilíbrio as concentrações são iguais." Elas são constantes, não necessariamente iguais.</li><li>❌ "O catalisador aumenta o rendimento." Ele só faz chegar ao equilíbrio mais depressa.</li></ul>']],
  ['dia', ['O adubo nitrogenado do processo Haber-Bosch alimenta cerca de metade da humanidade. O refrigerante fechado está em equilíbrio entre CO₂ dissolvido e CO₂ gasoso: abriu, a pressão cai, o equilíbrio se desloca e o gás escapa. A hemoglobina pega O₂ nos pulmões (muito O₂) e solta nos tecidos (pouco O₂): Le Chatelier dentro de você.']]);

deep('e-buffer',
  ['calma', ['Um ácido fraco HA fica em equilíbrio: HA ⇌ H⁺ + A⁻, com constante <b>Ka</b>. Quanto maior o Ka, mais forte o ácido (o acético tem Ka = 1,8 × 10⁻⁵; usa-se também pKa = −log Ka = 4,74).',
    'Num tampão há muito HA e muito A⁻ ao mesmo tempo. Ácido que chega é "comido" pelo A⁻ (A⁻ + H⁺ → HA); base que chega é neutralizada pelo HA (HA + OH⁻ → A⁻ + H₂O). O pH só depende da <b>razão</b> entre os dois, pela equação de <b>Henderson-Hasselbalch</b>:',
    '<p class="al-formula">pH = pKa + log([A⁻] / [HA])</p>',
    'Com quantidades iguais, pH = pKa. O tampão funciona bem até cerca de 1 unidade de pH para cada lado do pKa, e aguenta mais quanto mais concentrado for (é a <b>capacidade</b> do tampão).']],
  ['ex', ['<b>Tampão com 0,10 mol/L de ácido acético e 0,10 mol/L de acetato. Pinga-se 0,01 mol/L de HCl.</b>',
    '<ul class="fl-list"><li>Antes: pH = 4,74 + log(0,10/0,10) = <b>4,74</b>.</li><li>O H⁺ transforma acetato em ácido: [A⁻] = 0,09 e [HA] = 0,11.</li><li>Depois: pH = 4,74 + log(0,09/0,11) = 4,74 − 0,09 = <b>4,65</b>.</li><li>Na água pura, o mesmo HCl levaria o pH de 7 a <b>2</b>.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Tampão tem pH 7." Cada tampão tem o pH do seu pKa (acetato ≈ 4,7; fosfato ≈ 7,2; amônia ≈ 9,25).</li><li>❌ "O tampão aguenta qualquer quantidade." Ele esgota quando acaba o HA ou o A⁻.</li></ul>']],
  ['dia', ['O sangue usa o par ácido carbônico / bicarbonato (com o CO₂ da respiração entrando no equilíbrio), e o pulmão e o rim ajustam o tampão o tempo todo. Xampus e cremes "pH balanceado", colírios e soluções de laboratório também são tamponados.']]);
