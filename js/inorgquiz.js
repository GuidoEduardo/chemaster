// Jogo "Funções inorgânicas": banco de perguntas gerado a partir de uma lista de substâncias
// (função, nome e fórmula) + algumas perguntas de raciocínio. Mesmo formato de QUIZ (quiz.js).

const INQ_TOPICS = {
  acid:  { icon: '🍋', pt: 'Ácidos', en: 'Acids' },
  base:  { icon: '🧼', pt: 'Bases', en: 'Bases' },
  salt:  { icon: '🧂', pt: 'Sais', en: 'Salts' },
  oxide: { icon: '🔥', pt: 'Óxidos', en: 'Oxides' },
  mix:   { icon: '🧠', pt: 'Reações e raciocínio', en: 'Reactions & reasoning' },
};

// [fórmula, função, nome pt, nome en, curiosidade pt, curiosidade en]
const INQ_SUBS = [
  ['HCl', 'acid', 'ácido clorídrico', 'hydrochloric acid', 'Está no suco do estômago.', 'It is in stomach juice.'],
  ['HF', 'acid', 'ácido fluorídrico', 'hydrofluoric acid', 'Corrói até vidro.', 'It even etches glass.'],
  ['HBr', 'acid', 'ácido bromídrico', 'hydrobromic acid', '', ''],
  ['H₂S', 'acid', 'ácido sulfídrico', 'hydrosulfuric acid', 'Cheiro de ovo podre.', 'Smells like rotten eggs.'],
  ['HNO₃', 'acid', 'ácido nítrico', 'nitric acid', 'Usado em fertilizantes e explosivos.', 'Used in fertilizers and explosives.'],
  ['HNO₂', 'acid', 'ácido nitroso', 'nitrous acid', '', ''],
  ['H₂SO₄', 'acid', 'ácido sulfúrico', 'sulfuric acid', 'O mais produzido no mundo; está na bateria de carro.', 'The most produced in the world; it is in car batteries.'],
  ['H₂SO₃', 'acid', 'ácido sulfuroso', 'sulfurous acid', '', ''],
  ['H₃PO₄', 'acid', 'ácido fosfórico', 'phosphoric acid', 'Está nos refrigerantes de cola.', 'It is in cola drinks.'],
  ['H₂CO₃', 'acid', 'ácido carbônico', 'carbonic acid', 'Faz as bolhas do refrigerante (vira CO₂ + água).', 'Makes soda fizz (it becomes CO₂ + water).'],
  ['HClO₄', 'acid', 'ácido perclórico', 'perchloric acid', '', ''],
  ['HClO', 'acid', 'ácido hipocloroso', 'hypochlorous acid', 'Desinfeta a água das piscinas.', 'Disinfects pool water.'],
  ['NaOH', 'base', 'hidróxido de sódio', 'sodium hydroxide', 'Soda cáustica: desentope pias.', 'Caustic soda: unclogs drains.'],
  ['KOH', 'base', 'hidróxido de potássio', 'potassium hydroxide', '', ''],
  ['Ca(OH)₂', 'base', 'hidróxido de cálcio', 'calcium hydroxide', 'Cal hidratada, usada em obras.', 'Slaked lime, used in construction.'],
  ['Mg(OH)₂', 'base', 'hidróxido de magnésio', 'magnesium hydroxide', 'Leite de magnésia: antiácido.', 'Milk of magnesia: an antacid.'],
  ['Al(OH)₃', 'base', 'hidróxido de alumínio', 'aluminium hydroxide', 'Também é usado em antiácidos.', 'Also used in antacids.'],
  ['NH₄OH', 'base', 'hidróxido de amônio', 'ammonium hydroxide', 'Amônia dissolvida em água.', 'Ammonia dissolved in water.'],
  ['Fe(OH)₃', 'base', 'hidróxido de ferro(III)', 'iron(III) hydroxide', '', ''],
  ['Ba(OH)₂', 'base', 'hidróxido de bário', 'barium hydroxide', '', ''],
  ['NaCl', 'salt', 'cloreto de sódio', 'sodium chloride', 'Sal de cozinha.', 'Table salt.'],
  ['KCl', 'salt', 'cloreto de potássio', 'potassium chloride', 'Sal "light".', '"Lite" salt.'],
  ['KNO₃', 'salt', 'nitrato de potássio', 'potassium nitrate', 'Salitre: fertilizante e pólvora.', 'Saltpeter: fertilizer and gunpowder.'],
  ['CaCO₃', 'salt', 'carbonato de cálcio', 'calcium carbonate', 'Calcário, mármore, casca de ovo.', 'Limestone, marble, eggshell.'],
  ['NaHCO₃', 'salt', 'bicarbonato de sódio', 'sodium bicarbonate', 'Fermento e antiácido.', 'Baking soda and antacid.'],
  ['Na₂CO₃', 'salt', 'carbonato de sódio', 'sodium carbonate', 'Barrilha, usada para fazer vidro.', 'Soda ash, used to make glass.'],
  ['Na₂SO₄', 'salt', 'sulfato de sódio', 'sodium sulfate', '', ''],
  ['CaSO₄', 'salt', 'sulfato de cálcio', 'calcium sulfate', 'Gesso.', 'Plaster (gypsum).'],
  ['CuSO₄', 'salt', 'sulfato de cobre(II)', 'copper(II) sulfate', 'Cristais azuis; combate fungos.', 'Blue crystals; fights fungi.'],
  ['NaClO', 'salt', 'hipoclorito de sódio', 'sodium hypochlorite', 'Água sanitária.', 'Household bleach.'],
  ['NH₄Cl', 'salt', 'cloreto de amônio', 'ammonium chloride', '', ''],
  ['AgNO₃', 'salt', 'nitrato de prata', 'silver nitrate', '', ''],
  ['Ca₃(PO₄)₂', 'salt', 'fosfato de cálcio', 'calcium phosphate', 'Está nos ossos e dentes.', 'It is in bones and teeth.'],
  ['NaNO₂', 'salt', 'nitrito de sódio', 'sodium nitrite', 'Conservante de embutidos.', 'Preservative in cured meats.'],
  ['FeS', 'salt', 'sulfeto de ferro(II)', 'iron(II) sulfide', '', ''],
  ['CO₂', 'oxide', 'dióxido de carbono', 'carbon dioxide', 'Gás do efeito estufa.', 'A greenhouse gas.'],
  ['CO', 'oxide', 'monóxido de carbono', 'carbon monoxide', 'Tóxico e sem cheiro.', 'Toxic and odorless.'],
  ['SO₂', 'oxide', 'dióxido de enxofre', 'sulfur dioxide', 'Causa chuva ácida.', 'Causes acid rain.'],
  ['SO₃', 'oxide', 'trióxido de enxofre', 'sulfur trioxide', '', ''],
  ['NO₂', 'oxide', 'dióxido de nitrogênio', 'nitrogen dioxide', 'Gás marrom da poluição.', 'The brown gas in smog.'],
  ['CaO', 'oxide', 'óxido de cálcio', 'calcium oxide', 'Cal virgem.', 'Quicklime.'],
  ['MgO', 'oxide', 'óxido de magnésio', 'magnesium oxide', '', ''],
  ['Na₂O', 'oxide', 'óxido de sódio', 'sodium oxide', '', ''],
  ['Fe₂O₃', 'oxide', 'óxido de ferro(III)', 'iron(III) oxide', 'Ferrugem.', 'Rust.'],
  ['Al₂O₃', 'oxide', 'óxido de alumínio', 'aluminium oxide', 'Bauxita; o rubi e a safira também são Al₂O₃.', 'Bauxite; ruby and sapphire are Al₂O₃ too.'],
  ['SiO₂', 'oxide', 'dióxido de silício', 'silicon dioxide', 'Areia e quartzo.', 'Sand and quartz.'],
];

const INQ_FN = { acid: ['Ácido', 'Acid'], base: ['Base', 'Base'], salt: ['Sal', 'Salt'], oxide: ['Óxido', 'Oxide'] };
const INQ_WHY = {
  acid: ['Começa com H, que sai como H⁺ na água.', 'It starts with H, which leaves as H⁺ in water.'],
  base: ['Tem OH⁻ (hidroxila) ligado a um metal ou ao NH₄⁺.', 'It has OH⁻ (hydroxide) bound to a metal or NH₄⁺.'],
  salt: ['É metal (ou NH₄⁺) + o ânion de um ácido, sem H⁺ ou OH⁻ sobrando.', 'It is a metal (or NH₄⁺) + an acid anion, with no H⁺ or OH⁻ left over.'],
  oxide: ['Tem só dois elementos, e um deles é o oxigênio.', 'Only two elements, one of them oxygen.'],
};

// perguntas de raciocínio: 'PT: pergunta|resposta|errada|errada|errada|explicação'
const INQ_EXTRA = [
  ['mix', 1, 'Ácido + base forma…|Sal + água|Óxido + hidrogênio|Só água|Outro ácido|É a neutralização: H⁺ + OH⁻ viram água, e os íons que sobram formam o sal.', 'Acid + base gives…|Salt + water|Oxide + hydrogen|Only water|Another acid|That is neutralization: H⁺ + OH⁻ become water, and the leftover ions form the salt.'],
  ['mix', 2, 'O ácido sulfúrico vira qual ânion no sal?|Sulfato|Sulfito|Sulfeto|Sulfúrico|-ico vira -ato.', 'Sulfuric acid becomes which anion in a salt?|Sulfate|Sulfite|Sulfide|Sulfuric|-ic becomes -ate.'],
  ['mix', 2, 'O ácido sulfídrico (H₂S) vira qual ânion?|Sulfeto|Sulfato|Sulfito|Sulfúrico|-ídrico vira -eto.', 'Hydrosulfuric acid (H₂S) becomes which anion?|Sulfide|Sulfate|Sulfite|Sulfuric|hydro-…-ic becomes -ide.'],
  ['mix', 2, 'O ácido nitroso vira qual ânion?|Nitrito|Nitrato|Nitreto|Nítrico|-oso vira -ito.', 'Nitrous acid becomes which anion?|Nitrite|Nitrate|Nitride|Nitric|-ous becomes -ite.'],
  ['mix', 2, 'CaO + H₂O → ?|Ca(OH)₂, uma base|H₂CaO₂, um ácido|CaCl₂, um sal|CaO₂, outro óxido|Óxido de metal + água = base. É o que acontece ao "apagar" a cal virgem.', 'CaO + H₂O → ?|Ca(OH)₂, a base|H₂CaO₂, an acid|CaCl₂, a salt|CaO₂, another oxide|Metal oxide + water = base. That is what happens when quicklime is "slaked".'],
  ['mix', 2, 'CO₂ + H₂O → ?|H₂CO₃, um ácido|Uma base|Um sal|Nada, não reagem|Óxido de não metal + água = ácido. É por isso que a chuva é levemente ácida.', 'CO₂ + H₂O → ?|H₂CO₃, an acid|A base|A salt|Nothing, they do not react|Nonmetal oxide + water = acid. That is why rain is slightly acidic.'],
  ['mix', 1, 'Uma solução de NaOH tem pH…|Maior que 7|Menor que 7|Igual a 7|Igual a 0|É uma base: solta OH⁻ e deixa o pH alto.', 'An NaOH solution has pH…|Above 7|Below 7|Equal to 7|Equal to 0|It is a base: it releases OH⁻ and raises the pH.'],
  ['mix', 2, 'Por que o bicarbonato de sódio alivia a azia?|Neutraliza o excesso de ácido do estômago|Mata as bactérias do estômago|Esfria o estômago|Dissolve a comida|O bicarbonato reage com o HCl do estômago e solta CO₂ (o arroto).', 'Why does baking soda relieve heartburn?|It neutralizes excess stomach acid|It kills stomach bacteria|It cools the stomach|It dissolves food|Bicarbonate reacts with stomach HCl and releases CO₂ (the burp).'],
  ['mix', 3, 'Qual a fórmula do sulfato de alumínio?|Al₂(SO₄)₃|AlSO₄|Al₃(SO₄)₂|Al(SO₄)₂|Al³⁺ e SO₄²⁻: 2 × (+3) = +6 e 3 × (−2) = −6.', 'What is the formula of aluminium sulfate?|Al₂(SO₄)₃|AlSO₄|Al₃(SO₄)₂|Al(SO₄)₂|Al³⁺ and SO₄²⁻: 2 × (+3) = +6 and 3 × (−2) = −6.'],
  ['mix', 3, 'Qual óxido causa chuva ácida?|SO₂|CaO|Na₂O|MgO|SO₂ é óxido de não metal (ácido). CaO, Na₂O e MgO são óxidos básicos.', 'Which oxide causes acid rain?|SO₂|CaO|Na₂O|MgO|SO₂ is a nonmetal (acidic) oxide. CaO, Na₂O and MgO are basic oxides.'],
];

const INQ = (() => {
  const out = [], split = s => { const [q, a, w1, w2, w3, note] = s.split('|'); return { q, a, wrong: [w1, w2, w3], note }; };
  const pick3 = (list, not) => { const l = list.filter(x => x !== not); for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return l.slice(0, 3); };
  INQ_SUBS.forEach(([f, fn, np, ne, cp, ce]) => {
    const same = INQ_SUBS.filter(s => s[1] === fn);
    const fns = Object.keys(INQ_FN).filter(k => k !== fn);
    const note = (i, extra) => `${INQ_WHY[fn][i]}${extra ? ' ' + extra : ''}`;
    out.push({ topic: fn, d: 1, z: 0,
      pt: { q: `Qual é a função inorgânica de ${f}?`, a: INQ_FN[fn][0], wrong: fns.map(k => INQ_FN[k][0]), note: note(0, cp) },
      en: { q: `Which inorganic function is ${f}?`, a: INQ_FN[fn][1], wrong: fns.map(k => INQ_FN[k][1]), note: note(1, ce) } });
    const wn = pick3(same, same.find(s => s[0] === f));
    out.push({ topic: fn, d: 2, z: 0,
      pt: { q: `Qual é o nome de ${f}?`, a: np, wrong: wn.map(s => s[2]), note: cp || INQ_WHY[fn][0] },
      en: { q: `What is the name of ${f}?`, a: ne, wrong: wn.map(s => s[3]), note: ce || INQ_WHY[fn][1] } });
    out.push({ topic: fn, d: 3, z: 0,
      pt: { q: `Qual é a fórmula do ${np}?`, a: f, wrong: wn.map(s => s[0]), note: cp || INQ_WHY[fn][0] },
      en: { q: `What is the formula of ${ne}?`, a: f, wrong: wn.map(s => s[0]), note: ce || INQ_WHY[fn][1] } });
  });
  INQ_EXTRA.forEach(([topic, d, pt, en]) => out.push({ topic, d, z: 0, pt: split(pt), en: split(en) }));
  return out.map((x, i) => ({ id: 'inq' + i, ...x }));
})();
