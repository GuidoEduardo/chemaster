// Dados da tabela periódica (118 elementos)
const CATS = {
  am: { name: 'Metal alcalino',         color: '#ff8c7a' },
  at: { name: 'Metal alcalino-terroso', color: '#ffc15e' },
  tr: { name: 'Metal de transição',     color: '#ffadc9' },
  pt: { name: 'Outros metais',          color: '#a8dcc0' },
  sm: { name: 'Semimetal',              color: '#d6e86a' },
  nm: { name: 'Não metal',              color: '#7fd1ff' },
  ha: { name: 'Halogênio',              color: '#5fe3c6' },
  ng: { name: 'Gás nobre',              color: '#bca4ff' },
  la: { name: 'Lantanídeo',             color: '#ffd9a8' },
  ac: { name: 'Actinídeo',              color: '#f3b8f0' },
};

const RAW = `H Hidrogênio nm
He Hélio ng
Li Lítio am
Be Berílio at
B Boro sm
C Carbono nm
N Nitrogênio nm
O Oxigênio nm
F Flúor ha
Ne Neônio ng
Na Sódio am
Mg Magnésio at
Al Alumínio pt
Si Silício sm
P Fósforo nm
S Enxofre nm
Cl Cloro ha
Ar Argônio ng
K Potássio am
Ca Cálcio at
Sc Escândio tr
Ti Titânio tr
V Vanádio tr
Cr Cromo tr
Mn Manganês tr
Fe Ferro tr
Co Cobalto tr
Ni Níquel tr
Cu Cobre tr
Zn Zinco tr
Ga Gálio pt
Ge Germânio sm
As Arsênio sm
Se Selênio nm
Br Bromo ha
Kr Criptônio ng
Rb Rubídio am
Sr Estrôncio at
Y Ítrio tr
Zr Zircônio tr
Nb Nióbio tr
Mo Molibdênio tr
Tc Tecnécio tr
Ru Rutênio tr
Rh Ródio tr
Pd Paládio tr
Ag Prata tr
Cd Cádmio tr
In Índio pt
Sn Estanho pt
Sb Antimônio sm
Te Telúrio sm
I Iodo ha
Xe Xenônio ng
Cs Césio am
Ba Bário at
La Lantânio la
Ce Cério la
Pr Praseodímio la
Nd Neodímio la
Pm Promécio la
Sm Samário la
Eu Európio la
Gd Gadolínio la
Tb Térbio la
Dy Disprósio la
Ho Hólmio la
Er Érbio la
Tm Túlio la
Yb Itérbio la
Lu Lutécio la
Hf Háfnio tr
Ta Tântalo tr
W Tungstênio tr
Re Rênio tr
Os Ósmio tr
Ir Irídio tr
Pt Platina tr
Au Ouro tr
Hg Mercúrio tr
Tl Tálio pt
Pb Chumbo pt
Bi Bismuto pt
Po Polônio pt
At Astato ha
Rn Radônio ng
Fr Frâncio am
Ra Rádio at
Ac Actínio ac
Th Tório ac
Pa Protactínio ac
U Urânio ac
Np Netúnio ac
Pu Plutônio ac
Am Amerício ac
Cm Cúrio ac
Bk Berquélio ac
Cf Califórnio ac
Es Einstênio ac
Fm Férmio ac
Md Mendelévio ac
No Nobélio ac
Lr Laurêncio ac
Rf Rutherfórdio tr
Db Dúbnio tr
Sg Seabórgio tr
Bh Bóhrio tr
Hs Hássio tr
Mt Meitnério tr
Ds Darmstádtio tr
Rg Roentgênio tr
Cn Copernício tr
Nh Nihônio pt
Fl Fleróvio pt
Mc Moscóvio pt
Lv Livermório pt
Ts Tenesso ha
Og Oganessônio ng`;

// Grafias alternativas aceitas ao digitar
const ALTS = {
  'Nitrogênio': ['azoto'],
  'Neônio': ['neon'],
  'Argônio': ['argon'],
  'Criptônio': ['kriptonio', 'cripton', 'kripton', 'kriptônio'],
  'Xenônio': ['xenon'],
  'Radônio': ['radon'],
  'Arsênio': ['arsenico'],
  'Tântalo': ['tantalio'],
  'Tungstênio': ['volframio', 'wolframio', 'wolfrâmio'],
  'Astato': ['astatinio', 'astatino'],
  'Netúnio': ['neptunio'],
  'Protactínio': ['protoactinio'],
  'Einstênio': ['einsteinio'],
  'Laurêncio': ['lawrencio'],
  'Rutherfórdio': ['ruterfordio'],
  'Tenesso': ['tennessino', 'tenessino', 'tennesso', 'tenesso'],
  'Oganessônio': ['oganesson', 'oganessonio'],
};

function elementPos(z) {
  let period, group = null;
  if (z === 1) { period = 1; group = 1; }
  else if (z === 2) { period = 1; group = 18; }
  else if (z <= 10) { period = 2; group = z <= 4 ? z - 2 : z + 8; }
  else if (z <= 18) { period = 3; group = z <= 12 ? z - 10 : z; }
  else if (z <= 36) { period = 4; group = z - 18; }
  else if (z <= 54) { period = 5; group = z - 36; }
  else if (z <= 86) { period = 6; group = z <= 56 ? z - 54 : (z <= 71 ? null : z - 68); }
  else { period = 7; group = z <= 88 ? z - 86 : (z <= 103 ? null : z - 100); }
  // Lantanídeos e actinídeos ficam nas duas linhas separadas embaixo
  if (group === null) {
    return { period, group, row: period === 6 ? 9 : 10, col: z - (period === 6 ? 57 : 89) + 3 };
  }
  return { period, group, row: period, col: group };
}

const EN_NAMES = `Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon
Sodium Magnesium Aluminum Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium
Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc
Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium
Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin
Antimony Tellurium Iodine Xenon Cesium Barium Lanthanum Cerium Praseodymium Neodymium
Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium
Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury
Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium
Protactinium Uranium Neptunium Plutonium Americium Curium Berkelium Californium Einsteinium Fermium
Mendelevium Nobelium Lawrencium Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium
Roentgenium Copernicium Nihonium Flerovium Moscovium Livermorium Tennessine Oganesson`.split(/\s+/);

const ALTS_EN = {
  'Aluminum': ['aluminium'], 'Sulfur': ['sulphur'], 'Cesium': ['caesium'], 'Tungsten': ['wolfram'],
};

const CATS_EN = {
  am: 'Alkali metal', at: 'Alkaline earth metal', tr: 'Transition metal', pt: 'Post-transition metal', sm: 'Metalloid',
  nm: 'Nonmetal', ha: 'Halogen', ng: 'Noble gas', la: 'Lanthanide', ac: 'Actinide',
};
for (const k in CATS) { CATS[k].pt = CATS[k].name; CATS[k].en = CATS_EN[k]; }

const ELEMENTS = RAW.trim().split('\n').map((line, i) => {
  const [sym, namePt, cat] = line.trim().split(' ');
  const z = i + 1, nameEn = EN_NAMES[i];
  return {
    z, sym, cat, namePt, nameEn, name: namePt, alts: [],
    altsPt: ALTS[namePt] || [], altsEn: ALTS_EN[nameEn] || [],
    ...elementPos(z),
  };
});

// Troca o idioma dos nomes dos elementos e das famílias
function applyDataLang(lang) {
  for (const e of ELEMENTS) {
    e.name = lang === 'en' ? e.nameEn : e.namePt;
    e.alts = lang === 'en' ? e.altsEn : e.altsPt;
  }
  for (const k in CATS) CATS[k].name = CATS[k][lang];
}
