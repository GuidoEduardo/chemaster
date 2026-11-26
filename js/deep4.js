// Grimório → "📖 Aprofundando", parte 4: quântica (ensino médio e faculdade) e partículas.

/* ===================== QUÂNTICA · ENSINO MÉDIO ===================== */
deep('qatom',
  ['calma', ['O modelo quântico se apoia em três descobertas do começo do século XX:',
    '<ul class="fl-list"><li><b>Energia em pacotes</b> (Planck, 1900; Einstein, 1905): a luz troca energia em quantidades fixas, os fótons, com E = h·f.</li><li><b>Matéria é onda</b> (de Broglie, 1924): toda partícula tem comprimento de onda λ = h / (m·v). Para um elétron no átomo, essa onda tem o tamanho do próprio átomo, então o comportamento de onda domina.</li><li><b>A equação de Schrödinger</b> (1926): diz quais ondas são possíveis num átomo e com que energia. As soluções são os <b>orbitais</b>.</li></ul>',
    'O orbital não é um caminho: é uma função de onda ψ, e o quadrado dela, |ψ|², dá a <b>probabilidade</b> de encontrar o elétron em cada ponto. Os desenhos de orbital mostram a região onde a chance de encontrá-lo é de uns 90%.',
    'Um subnível cheio tem simetria esférica: os três orbitais p somados (px² + py² + pz²) dão uma esfera. É por isso que átomos de gás nobre e íons com camada fechada se comportam como bolinhas redondas.']],
  ['ex', ['<b>Por que uma bola de futebol não se comporta como onda?</b>',
    'λ = h / (m·v). Para uma bola de 0,4 kg a 20 m/s: λ = 6,6 × 10⁻³⁴ / 8 ≈ 8 × 10⁻³⁵ m, trilhões de trilhões de vezes menor que um próton: impossível de notar.',
    'Para um elétron no átomo (massa 9,1 × 10⁻³¹ kg, cerca de 2 × 10⁶ m/s): λ ≈ 0,36 nm, do tamanho do átomo. Ali a onda manda.']],
  ['err', ['<ul class="fl-list"><li>❌ "O orbital é a trajetória do elétron."</li><li>❌ "No modelo quântico, o elétron está em todo lugar ao mesmo tempo." Ele tem uma distribuição de probabilidades; uma medição o encontra num lugar.</li><li>❌ "O modelo quântico é só uma teoria, não foi comprovado." É a teoria mais bem testada da ciência; o transistor do seu celular só funciona por causa dela.</li></ul>']],
  ['dia', ['Transistores, lasers, LEDs, ressonância magnética, painéis solares e relógios atômicos (que sincronizam o GPS) foram todos projetados com o modelo quântico.']]);

deep('address',
  ['calma', ['Os quatro números quânticos e os valores permitidos:',
    '<ul class="fl-list"><li><b>n</b> (principal): 1, 2, 3… → camada (tamanho e energia).</li><li><b>l</b> (secundário ou azimutal): de 0 até n − 1 → subnível (forma). 0 = s, 1 = p, 2 = d, 3 = f.</li><li><b>m</b> (magnético): de −l até +l → qual orbital do subnível (orientação). s: só 0; p: −1, 0, +1; d: −2 a +2.</li><li><b>s</b> (spin): +½ ou −½.</li></ul>',
    'As regras de quantos cabem saem disso: no subnível l há 2l + 1 orbitais, cada um com 2 elétrons → s 2, p 6, d 10, f 14. Na camada n há n² orbitais → 2n² elétrons.',
    'Duas regras para encher: o <b>princípio de exclusão de Pauli</b> (nenhum par de elétrons com os 4 números iguais) e a <b>regra de Hund</b> (num subnível, primeiro um elétron em cada orbital, todos com o mesmo spin, e só depois formam pares).']],
  ['ex', ['<b>Os 4 números quânticos do último elétron do oxigênio (Z = 8).</b>',
    '<ul class="fl-list"><li>Distribuição: 1s² 2s² 2p⁴.</li><li>No 2p, os três orbitais (m = −1, 0, +1) recebem um elétron ↑ cada; o 4º elétron volta ao primeiro, agora ↓.</li><li>Último elétron: n = 2, l = 1, m = −1, s = −½ (usando a convenção de começar pelo m = −1 e de ↑ = +½).</li></ul>',
    'Repare: as convenções variam entre livros (começar por −1 ou por +1, qual spin é positivo). O importante é a lógica, não decorar o sinal.']],
  ['err', ['<ul class="fl-list"><li>❌ Dar l = n (o maior l possível é n − 1: não existe "2d").</li><li>❌ Emparelhar elétrons antes de ocupar todos os orbitais do subnível (contra a regra de Hund).</li><li>❌ Achar que o spin é o elétron "girando" de verdade. É uma propriedade quântica, um ímã intrínseco, sem equivalente exato no mundo comum.</li></ul>']],
  ['dia', ['O spin é a base da ressonância magnética: o aparelho lê como os spins dos núcleos de hidrogênio do corpo respondem a um ímã forte. E elétrons desemparelhados (pela regra de Hund) é o que deixa o ferro magnético.']]);

deep('pauling',
  ['calma', ['O diagrama de Pauling é a regra de <b>n + l</b> (regra de Madelung): os subníveis enchem em ordem crescente de n + l, e, no empate, primeiro o de menor n. O 4s tem n + l = 4; o 3d tem 3 + 2 = 5 → o 4s vem antes.',
    'O porquê físico é a <b>penetração</b>: os orbitais s têm uma parte da nuvem que chega muito perto do núcleo, por dentro das camadas internas. Ali, o elétron sente quase a carga inteira do núcleo, e a energia cai. Os orbitais d e f ficam mais "de fora" e são mais blindados. Para o potássio e o cálcio, essa diferença basta para o 4s ficar abaixo do 3d.',
    'Uma sutileza: depois que o 3d começa a encher, ele "desce" e fica abaixo do 4s. É por isso que os metais de transição, ao virarem íons, perdem primeiro os elétrons <b>4s</b>, não os 3d.']],
  ['ex', ['<b>Distribuição do ferro (Z = 26) e do Fe²⁺.</b>',
    '<ul class="fl-list"><li>Pela ordem de Pauling: 1s² 2s² 2p⁶ 3s² 3p⁶ <b>4s² 3d⁶</b> (2 + 2 + 6 + 2 + 6 + 2 + 6 = 26 ✔).</li><li>Em ordem de camadas: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s². Por camada: K 2, L 8, M 14, N 2.</li><li>Fe²⁺: saem os 2 elétrons do <b>4s</b> → [Ar] 3d⁶.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ Encher a camada M até 18 antes de começar a N (2-8-18 para o potássio).</li><li>❌ Tirar os elétrons do 3d primeiro ao formar íons de metais de transição.</li><li>❌ Aplicar a ordem sem exceção: o cromo fica 4s¹ 3d⁵ e o cobre 4s¹ 3d¹⁰, porque subníveis d meio cheios ou cheios são especialmente estáveis.</li></ul>']],
  ['dia', ['As cores dos compostos de metais de transição (o azul do sulfato de cobre, o verde das esmeraldas, o vermelho dos rubis) vêm de elétrons pulando entre orbitais d com energias pouco diferentes: os saltos caem na luz visível.']]);

/* ===================== QUÂNTICA · FACULDADE ===================== */
deep('ring',
  ['calma', ['Para a onda caber numa volta de raio r, o perímetro precisa ser um número inteiro de comprimentos de onda: <b>2πr = n·λ</b>. Usando λ = h/(m·v) de de Broglie, sai que o momento angular só pode valer múltiplos de ħ: <b>m·v·r = n·ħ</b>. Era exatamente a regra que Bohr tinha chutado em 1913 para explicar o espectro do hidrogênio, sem saber o porquê.',
    'Juntando com a atração do núcleo, saem os raios e as energias permitidos: rₙ = n²·a₀ e Eₙ = −13,6 eV/n². Ou seja, o tamanho do átomo cresce com n² e os degraus ficam cada vez mais juntinhos no alto.',
    'Esse modelo de "onda no anel" é uma ponte: ele acerta as energias do hidrogênio, mas a imagem do anel é simplificada demais. A versão completa (a equação de Schrödinger em 3D) dá as mesmas energias e as formas certas dos orbitais.']],
  ['ex', ['<b>Raio da camada n = 3 no hidrogênio.</b>',
    'r₃ = 3² × 0,053 nm = <b>0,48 nm</b>, nove vezes o raio do estado fundamental. E a energia: E₃ = −13,6 / 9 ≈ <b>−1,51 eV</b>.']],
  ['err', ['<ul class="fl-list"><li>❌ Achar que o elétron anda no anel como um trem. A onda "ocupa" o anel inteiro.</li><li>❌ "Valores fracionários de n são proibidos por uma lei." Eles não são proibidos: simplesmente se cancelam sozinhos por interferência.</li></ul>']],
  ['dia', ['O mesmo princípio de ondas estacionárias decide as notas de um violão, de uma flauta e de um sino, e as frequências que um forno de micro-ondas aquece melhor (por isso o prato gira: para fugir dos pontos frios, os nós).']]);

deep('cloud',
  ['calma', ['A função de onda ψ do elétron é um número que varia de ponto a ponto, podendo ser positivo ou negativo (como a onda de uma corda que sobe e desce). A probabilidade é |ψ|². Os <b>nós</b> são lugares onde ψ = 0 (passa de + para −), e ali o elétron nunca é encontrado.',
    'A conta de nós ajuda a reconhecer orbitais: um orbital tem <b>n − 1 nós no total</b>, sendo <b>l</b> deles planos (angulares) e n − l − 1 esféricos (radiais). O 2s: 1 nó esférico; o 2p: 1 plano; o 3p: 1 plano e 1 esférico; o 3d: 2 planos.',
    'Os sinais da onda importam para as ligações: quando dois orbitais se sobrepõem com o <b>mesmo sinal</b>, as ondas se somam (ligante); com sinais opostos, se cancelam e criam um nó entre os núcleos (antiligante). É a lição de ligações vista "por dentro".']],
  ['ex', ['<b>Onde é mais provável achar o elétron do 1s do hidrogênio?</b>',
    'A densidade |ψ|² é máxima <b>no núcleo</b>. Mas há pouquíssimo volume ali. Somando por cascas esféricas (densidade × área 4πr²), a distância mais provável é exatamente o raio de Bohr, 0,053 nm. Os dois resultados são verdadeiros: depende se a pergunta é "em qual pontinho" ou "a que distância".']],
  ['err', ['<ul class="fl-list"><li>❌ "O lóbulo do p é onde o elétron gira." É uma região de probabilidade.</li><li>❌ "Os dois lóbulos do p são dois elétrons." É um orbital só (pode ter 1 ou 2 elétrons), com duas partes de sinais opostos.</li><li>❌ "O elétron atravessa o nó para ir de um lóbulo ao outro." A pergunta não faz sentido quântico: não há trajetória.</li></ul>']],
  ['dia', ['Os microscópios de tunelamento conseguem "ver" a densidade eletrônica de átomos individuais numa superfície, e já fotografaram orbitais de moléculas. A química computacional calcula essas nuvens para projetar remédios e materiais.']]);

deep('box',
  ['calma', ['A equação de Schrödinger independente do tempo, em uma dimensão:',
    '<p class="al-formula">−(ħ²/2m) · ψ″ + V·ψ = E·ψ</p>',
    'Lendo em português: a "curvatura" da onda (ψ″, energia de movimento) mais a energia potencial V dá a energia total E. Numa caixa de largura L, com V = 0 dentro e paredes infinitas, a onda precisa ser zero nas paredes. As únicas soluções são senoides que cabem um número inteiro de meias-ondas:',
    '<p class="al-formula">ψₙ = sen(nπx/L) &nbsp;&nbsp; Eₙ = n²·h² / (8·m·L²)</p>',
    'Daí saem as três lições: só certos n existem; E cresce com n²; e E cresce com 1/L² (espremer custa caro). Repare também: o menor n é 1, não 0, então a energia mínima não é zero. Mesmo no zero absoluto, uma partícula presa continua "agitada": é a energia de ponto zero.']],
  ['ex', ['<b>Um elétron numa caixa de 1 nm salta de n = 1 para n = 2. Que luz ele absorve?</b>',
    '<ul class="fl-list"><li>E₁ = h²/(8mL²) = (6,63 × 10⁻³⁴)² / (8 × 9,11 × 10⁻³¹ × (10⁻⁹)²) ≈ 6,0 × 10⁻²⁰ J ≈ <b>0,38 eV</b>.</li><li>E₂ = 4 × E₁ = 1,50 eV. Salto: ΔE = 3 × 0,38 = <b>1,13 eV</b>.</li><li>λ = 1240 / 1,13 ≈ <b>1.100 nm</b> (infravermelho). Com caixa menor, a luz fica mais azul.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "A energia mínima é zero." É E₁, maior que zero.</li><li>❌ "Caixa maior, energia maior." É o contrário: E cai com 1/L².</li></ul>']],
  ['dia', ['Os <b>pontos quânticos</b> (quantum dots) são cristais de poucos nanômetros que funcionam como caixas: mudando o tamanho, muda a cor da luz que emitem. São usados nas TVs "QLED" e renderam o Nobel de Química de 2023. As moléculas coloridas da cenoura (betacaroteno) também se explicam assim: elétrons numa "caixa" do tamanho da molécula.']]);

/* ===================== PARTÍCULAS · O MODELO PADRÃO ===================== */
deep('zoom',
  ['calma', ['As escalas, em potências de 10:',
    '<ul class="fl-list"><li>Célula: 10⁻⁵ m · Molécula de água: ~3 × 10⁻¹⁰ m · Átomo: ~10⁻¹⁰ m.</li><li>Núcleo: 10⁻¹⁵ a 10⁻¹⁴ m · Próton: ~0,84 × 10⁻¹⁵ m.</li><li>Quark e elétron: nenhum tamanho detectado, menor que 10⁻¹⁸ m.</li></ul>',
    'Como se "vê" algo tão pequeno? Batendo nele. Para enxergar detalhes de um tamanho, é preciso uma sonda com comprimento de onda desse tamanho, e, pela relação de de Broglie (λ = h/p), isso exige muita <b>energia</b>. A luz visível enxerga células; elétrons acelerados enxergam átomos; para ver dentro do próton são precisos aceleradores de quilômetros. Foi assim que, nos anos 1960, elétrons ricocheteando dentro de prótons (no acelerador SLAC) revelaram que eles têm partes: os quarks.']],
  ['ex', ['<b>Se o núcleo de hidrogênio fosse uma bola de gude de 1 cm, qual seria o tamanho do átomo?</b>',
    'A razão é cerca de 10⁻¹⁰ / 10⁻¹⁵ = 100.000 → o átomo teria <b>1 km</b> de raio. Toda a massa na bolinha, e o resto, nuvem de elétrons.']],
  ['err', ['<ul class="fl-list"><li>❌ "O átomo é vazio, então dá para atravessar as coisas." O "vazio" é ocupado pela nuvem de elétrons, que repele outras nuvens.</li><li>❌ "Elétrons e quarks são bolinhas minúsculas." Não têm tamanho medido; se comportam como pontos com propriedades de onda.</li></ul>']],
  ['dia', ['Microscópios eletrônicos usam elétrons em vez de luz justamente para ter comprimento de onda menor e ver vírus e proteínas. E o LHC, no CERN, é um anel de 27 km que acelera prótons para "ver" (e criar) as partículas mais pesadas.']]);

deep('quarks',
  ['calma', ['Partículas feitas de quarks se chamam <b>hádrons</b>, e há dois tipos: <b>bárions</b> (3 quarks: próton, nêutron, Λ, Ω…) e <b>mésons</b> (quark + antiquark: píons, káons…). Para cada quark existe um <b>antiquark</b> com carga oposta (o anti-up tem −⅔).',
    'A massa do próton (938 MeV) é quase toda <b>energia</b>: os quarks lá dentro se movem quase à velocidade da luz, e o campo de glúons que os prende guarda uma energia enorme. Pela relação E = mc², essa energia "pesa". A massa dos próprios quarks up e down (uns 9 MeV no total) é só 1%. Ou seja: a massa do seu corpo vem quase inteira de energia de movimento e de ligação dentro dos prótons e nêutrons.',
    'Os sabores mais pesados (s, c, b, t) só existem por instantes: decaem pela força fraca, que muda o sabor, até virarem up e down.']],
  ['ex', ['<b>Monte a carga dos mésons píon:</b>',
    '<ul class="fl-list"><li>π⁺ = u + anti-d: +⅔ + ⅓ = <b>+1</b>.</li><li>π⁻ = d + anti-u: −⅓ − ⅔ = <b>−1</b>.</li><li>π⁰ = mistura de u + anti-u e d + anti-d: <b>0</b>.</li></ul>',
    'Os píons foram descobertos em raios cósmicos em 1947. São eles que fazem a "cola" entre prótons e nêutrons dentro do núcleo.']],
  ['err', ['<ul class="fl-list"><li>❌ "A massa do próton é a soma das massas dos quarks."</li><li>❌ "Existem só up e down." Existem 6 sabores; só os 2 mais leves são estáveis.</li><li>❌ Escrever as cargas dos quarks como inteiros.</li></ul>']],
  ['dia', ['Toda a matéria que você vê (você, a Terra, o Sol) é feita de up, down e elétrons. Os outros quarks são criados em aceleradores e nas colisões de raios cósmicos com a atmosfera, milhares de vezes por segundo sobre a sua cabeça.']]);

deep('color',
  ['calma', ['A teoria da força forte se chama <b>cromodinâmica quântica</b> (QCD). A "cor" é uma carga com três valores (e três anticores), e só podem existir sozinhos os estados neutros de cor. Os <b>glúons</b> carregam cor também (uma cor e uma anticor), o que torna a força forte muito diferente da elétrica: o fóton não tem carga, mas o glúon tem, e glúons atraem glúons.',
    'É isso que forma o "tubo" ou "corda" de força entre quarks: as linhas de campo, em vez de se espalharem (como no campo elétrico, que cai com 1/r²), ficam espremidas num tubo. A energia guardada cresce <b>proporcional à distância</b>, cerca de 1 GeV por fermi (10⁻¹⁵ m). Quando a energia passa da necessária para criar um par quark-antiquark (algumas centenas de MeV), a corda arrebenta.',
    'O outro lado da moeda é a <b>liberdade assintótica</b> (Nobel de 2004): muito de perto, os quarks quase não sentem a força, e andam quase livres dentro do próton.']],
  ['ex', ['<b>Por que o nêutron (udd) existe se tem dois quarks iguais?</b>',
    'O que precisa ser diferente é a <b>cor</b>: o u, um d e o outro d têm cores diferentes (vermelho, verde, azul). Sem a carga de cor, dois quarks iguais não poderiam ocupar o mesmo estado (princípio de Pauli). Foi esse quebra-cabeça (a partícula Δ⁺⁺, uuu) que levou os físicos a inventar a cor nos anos 1960.']],
  ['err', ['<ul class="fl-list"><li>❌ "Os quarks são coloridos de verdade." A cor é só o nome de uma carga.</li><li>❌ "A força forte segura o núcleo igual segura os quarks." No núcleo age só o "resto" dela, transmitido por píons, e com alcance curtíssimo.</li></ul>']],
  ['dia', ['Nos grandes aceleradores, quando um quark é arrancado de um próton, a corda arrebenta várias vezes e aparece um "jato" de dezenas de partículas na mesma direção. Os detectores do LHC registram esses jatos o tempo todo: é o confinamento acontecendo ao vivo.']]);

deep('leptons',
  ['calma', ['A <b>dilatação do tempo</b> da relatividade especial: um relógio que se move com velocidade v anda mais devagar, por um fator γ (gama):',
    '<p class="al-formula">γ = 1 / √(1 − v²/c²)</p>',
    'Para v = 0,998·c: γ = 1 / √(1 − 0,996) = 1 / √0,004 ≈ <b>15,8</b>. O múon vive 2,2 μs no relógio dele, mas, para nós, 2,2 × 15,8 ≈ 35 μs, tempo suficiente para percorrer uns 10 km.',
    'Do ponto de vista do múon, quem muda é a distância: a atmosfera, passando por ele quase na velocidade da luz, fica "encolhida" pelo mesmo fator (contração do espaço). Os dois jeitos de ver dão o mesmo resultado: muitos múons chegam ao chão.',
    'O múon decai assim: <b>μ⁻ → e⁻ + ν̄ₑ + ν_μ</b>. O "sabor" do lépton se conserva: entra um múon, sai um neutrino do múon; sai um elétron, sai junto um antineutrino do elétron.']],
  ['ex', ['<b>Que fração de múons chega ao chão vinda de 15 km, com e sem relatividade?</b>',
    '<ul class="fl-list"><li>Sem relatividade: distância média = c × 2,2 μs ≈ 660 m. Fração = e^(−15.000/660) ≈ e^(−22,7) ≈ 1 em 7 bilhões.</li><li>Com relatividade: distância média ≈ 660 × 15,8 ≈ 10,4 km. Fração = e^(−15/10,4) ≈ <b>24%</b>.</li></ul>',
    'Medir quantos múons chegam ao topo e ao pé de uma montanha foi um dos primeiros testes diretos da relatividade (experimento de Rossi e Hall, 1941).']],
  ['err', ['<ul class="fl-list"><li>❌ "O múon é um elétron rápido." É outra partícula, 207 vezes mais pesada.</li><li>❌ "A relatividade só importa no espaço." Ela atua em cada múon que atravessa você e nos satélites de GPS (que precisam corrigir os relógios).</li></ul>']],
  ['dia', ['A muografia já foi usada para olhar dentro de pirâmides, vulcões e até do reator destruído de Fukushima. E o GPS do seu celular erraria vários quilômetros por dia sem as correções da relatividade.']]);

deep('neutrino',
  ['calma', ['No decaimento β, a energia liberada (782 keV no nêutron livre) é dividida entre três partículas: o próton (quase nada, por ser pesado), o elétron e o antineutrino. Como a divisão é aleatória, o elétron sai com qualquer energia entre 0 e 782 keV. Se fossem só duas partículas, a conservação de energia e de momento obrigaria o elétron a sair sempre com a mesma energia. O espectro contínuo foi a prova indireta do neutrino.',
    'Neutrinos interagem tão pouco que, para parar metade de um feixe de neutrinos do Sol, seria preciso uma parede de chumbo de mais de um ano-luz de espessura. Os detectores são tanques gigantes (o Super-Kamiokande, no Japão, tem 50 mil toneladas de água) que registram umas poucas colisões por dia.',
    'A <b>oscilação</b>: os sabores (νₑ, ν_μ, ν_τ) não são os estados de massa definida, e sim misturas deles. Como cada estado de massa viaja com uma fase um pouco diferente, a mistura muda ao longo do caminho, e o sabor detectado "oscila". Se os neutrinos não tivessem massa, isso não aconteceria.']],
  ['ex', ['<b>Balanceie o β⁺ do carbono-11 por dentro:</b>',
    '<ul class="fl-list"><li>No núcleo: um próton vira nêutron → p → n + e⁺ + νₑ.</li><li>Nos quarks: um up vira down → u → d + W⁺ → d + e⁺ + νₑ.</li><li>Cargas: +⅔ = −⅓ + 1 + 0 ✔.</li><li>Resultado: ¹¹C → ¹¹B + e⁺ + νₑ. É um dos isótopos usados em PET-scan.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "Neutrino e nêutron são a mesma coisa." O nêutron é pesado e feito de quarks; o neutrino é elementar e quase sem massa.</li><li>❌ "A força fraca é fraca, então não importa." Sem ela, o Sol não queimaria hidrogênio (a primeira etapa transforma um próton em nêutron).</li></ul>']],
  ['dia', ['Na supernova de 1987, detectores no Japão e nos EUA registraram 25 neutrinos, horas antes da luz da explosão aparecer: eles escapam do núcleo da estrela direto, enquanto a luz fica presa um tempo. Hoje existem redes de alerta de supernova baseadas em neutrinos.']]);

deep('model',
  ['calma', ['As partículas se dividem em dois grandes grupos:',
    '<ul class="fl-list"><li><b>Férmions</b> (spin ½): quarks e léptons, a <b>matéria</b>. Obedecem a Pauli: não dividem o mesmo estado. É por isso que a matéria ocupa espaço e forma camadas.</li><li><b>Bósons</b> (spin inteiro): fóton, glúons, W, Z e Higgs, as <b>forças</b> (e o Higgs). Podem se amontoar no mesmo estado: é assim que funciona um laser.</li></ul>',
    'As forças acontecem por <b>troca</b> de bósons: duas cargas "jogam fótons" uma para a outra. O alcance depende da massa do bóson trocado: o fóton não tem massa (alcance infinito); W e Z são pesadíssimos (alcance de 10⁻¹⁸ m, por isso a força fraca é "fraca" na prática).',
    'O <b>campo de Higgs</b> preenche todo o espaço, e as partículas ganham massa ao interagir com ele: quanto mais interagem, mais pesadas (o top interage muito, o elétron pouco, o fóton nada). O bóson de Higgs é uma "onda" nesse campo, e encontrá-lo em 2012 confirmou que o campo existe.']],
  ['ex', ['<b>Conte as partículas do Modelo Padrão:</b>',
    '<ul class="fl-list"><li>6 quarks + 6 léptons = 12 férmions.</li><li>Fóton, glúon, Z, W, Higgs = 5 bósons (são 17 "tipos").</li><li>Contando antipartículas, as 3 cores de cada quark e as 8 combinações de glúon, o número de partículas diferentes passa de 60.</li></ul>']],
  ['err', ['<ul class="fl-list"><li>❌ "O Higgs dá toda a massa do Universo." Ele dá a massa das partículas elementares; a massa dos prótons, e portanto a nossa, vem quase toda da energia da força forte.</li><li>❌ "O Modelo Padrão explica tudo." Ficam de fora a gravidade, a matéria escura, a energia escura e o porquê de existir mais matéria que antimatéria.</li></ul>']],
  ['dia', ['A antimatéria é usada todo dia na medicina (os pósitrons do PET-scan). A internet (a World Wide Web) foi inventada no CERN, em 1989, para os físicos trocarem dados. E as previsões do Modelo Padrão já foram confirmadas com até 10 casas decimais de precisão.']]);
