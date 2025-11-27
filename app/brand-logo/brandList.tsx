export interface IBrands {
  name: string
  id: string
  logo: string
  background?: string
}
// const BASE_URL = 'https://media.grandvision.it/cmsuat/'
const BASE_URL = 'https://www-gviuatlive.luxgroup.net/'

const brandList: IBrands[] = [
  {
    name: 'Alain Mikli',
    id: 'a0',
    logo: `${BASE_URL}images/brands/alan-mikli.svg`,
  },
  {
    name: 'A New Day',
    id: 'a3',
    logo: `${BASE_URL}images/brands/a-new-day.svg`,
  },
  {
    name: 'Armani Exchange',
    id: 'ax',
    logo: `${BASE_URL}images/brands/armani-exchange.svg`,
  },
  {
    name: 'Arnette',
    id: 'an',
    logo: `${BASE_URL}images/brands/arnette.svg`,
  },
  {
    name: 'Balenciaga',
    id: '6e',
    logo: `${BASE_URL}images/brands/balenciaga.svg`,
  },
  {
    name: 'Bottega Veneta',
    id: '6j',
    logo: `${BASE_URL}images/brands/bottega-veneta.svg`,
  },
  {
    name: 'Boucheron',
    id: 'bu',
    logo: `${BASE_URL}images/brands/boucheron.svg`,
  },
  {
    name: 'Burberry',
    id: 'be',
    logo: `${BASE_URL}images/brands/burberry.svg`,
  },
  {
    name: 'Bulgari',
    id: 'bv',
    logo: `${BASE_URL}images/brands/bulgari.svg`,
  },
  {
    name: 'Calvin Klein',
    id: 'cq',
    logo: `${BASE_URL}images/brands/calvin_klein.svg`,
  },
  {
    name: 'CHANEL',
    id: 'ch',
    logo: `${BASE_URL}images/brands/chanel.svg`,
  },
  {
    name: 'Chaps',
    id: 'cp',
    logo: `${BASE_URL}images/brands/chaps.svg`,
  },
  {
    name: 'Coach',
    id: 'hc',
    logo: `${BASE_URL}images/brands/coach.svg`,
  },
  {
    name: 'Costa',
    id: '6s',
    logo: `${BASE_URL}images/brands/costa_bl.svg`,
  },
  {
    name: 'Costa del Mar',
    id: '6s',
    logo: `${BASE_URL}images/brands/costa_bl.svg`,
  },
  {
    name: 'Christian Dior',
    id: 'cd',
    logo: `${BASE_URL}images/brands/dior-homme.svg`,
  },
  {
    name: 'David Clulow',
    id: 'dc',
    logo: `${BASE_URL}images/brands/david-clulow.svg`,
  },
  {
    name: 'DIOR',
    id: 'cd',
    logo: `${BASE_URL}images/brands/dior-homme.svg`,
  },
  {
    name: 'Dolcegabbana',
    id: 'dg',
    logo: `${BASE_URL}images/brands/dolce-and-gabbana.svg`,
  },
  {
    name: 'Donna Karan New York',
    id: 'dy',
    logo: `${BASE_URL}images/brands/dkny.svg`,
  },
  {
    name: 'Dita',
    id: 'd4',
    logo: `${BASE_URL}images/brands/dita.svg`,
  },
  {
    name: 'Emporio Armani',
    id: 'ea',
    logo: `${BASE_URL}images/brands/emporio-armani.svg`,
  },
  {
    name: 'ESS',
    id: 'ee',
    logo: `${BASE_URL}images/brands/ees.svg`,
  },
  {
    name: 'Fendi',
    id: 'fn',
    logo: `${BASE_URL}images/brands/fendi.svg`,
  },
  {
    name: 'Ferragamo',
    id: 'fe',
    logo: `${BASE_URL}images/brands/salvatore-ferragamo.svg`,
  },
  {
    name: 'Furla',
    id: 'fu',
    logo: `${BASE_URL}images/brands/furla.svg`,
  },
  {
    name: 'Giorgio Armani',
    id: 'ar',
    logo: `${BASE_URL}images/brands/giorgio-armani.svg`,
  },
  {
    name: 'Gucci',
    id: 'gc',
    logo: `${BASE_URL}images/brands/gucci.svg`,
  },
  {
    name: 'Guess',
    id: 'gu',
    logo: `${BASE_URL}images/brands/guess.svg`,
  },
  {
    name: 'Goodfellow & Co',
    id: 'go',
    logo: `${BASE_URL}images/brands/goodfellow-and-co.svg`,
  },
  {
    name: 'Jimmy Choo',
    id: 'jc',
    logo: `${BASE_URL}images/brands/jimmy-choo-logo.svg`,
  },
  {
    name: 'Le Specs',
    id: 'l5',
    logo: `${BASE_URL}images/brands/le-specs.svg`,
  },
  {
    name: 'Loewe',
    id: 'e4',
    logo: `${BASE_URL}images/brands/loewe.svg`,
  },
  {
    name: 'Maui Jim',
    id: 'mj',
    logo: `${BASE_URL}images/brands/maui-jim.svg`,
  },
  {
    name: 'Michael Kors',
    id: 'mk',
    logo: `${BASE_URL}images/brands/michael-kors.svg`,
  },
  {
    name: 'Miu Miu',
    id: 'mu',
    logo: `${BASE_URL}images/brands/miu-miu.svg`,
  },
  {
    name: 'Oakley',
    id: 'oo',
    logo: `${BASE_URL}images/brands/oakley.svg`,
    background: 'banner-oakley.png',
  },
  {
    name: 'Oakley Goggles',
    id: 'oz',
    logo: `${BASE_URL}images/brands/oakley.svg`,
  },
  {
    name: 'Oakley MX Goggles',
    id: 'om',
    logo: `${BASE_URL}images/brands/oakley.svg`,
  },
  {
    name: 'Oakley Optical',
    id: 'ox',
    logo: `${BASE_URL}images/brands/oakley.svg`,
  },
  {
    name: 'Oakley Youth',
    id: 'oj',
    logo: `${BASE_URL}images/brands/oakley-youth.svg`,
  },
  {
    name: 'Oakley Youth Optical',
    id: 'oy',
    logo: `${BASE_URL}images/brands/oakley-youth.svg`,
  },
  {
    name: 'Oakley Youth Sun',
    id: 'oj',
    logo: `${BASE_URL}images/brands/oakley-youth.svg`,
  },
  {
    name: 'Oliver Peoples',
    id: 'ov',
    logo: `${BASE_URL}images/brands/oliver-peoples.svg`,
  },
  {
    name: 'Polaroid',
    id: 'p4',
    logo: `${BASE_URL}images/brands/polaroid.svg`,
  },
  {
    name: 'Polo Ralph Lauren',
    id: 'ph',
    logo: `${BASE_URL}images/brands/polo-ralph-lauren.svg`,
  },
  {
    name: 'Prada',
    id: 'pr',
    logo: `${BASE_URL}images/brands/prada.svg`,
  },
  {
    name: 'Prada Linea Rossa',
    id: 'ps',
    logo: `${BASE_URL}images/brands/prada-linea-rossa.svg`,
  },
  {
    name: 'Persol',
    id: 'po',
    logo: `${BASE_URL}images/brands/persol.svg`,
  },
  {
    name: 'Polo Prep',
    id: 'pp',
    logo: `${BASE_URL}images/brands/polo-prep.svg`,
  },
  {
    name: 'Ralph',
    id: 'ra',
    logo: `${BASE_URL}images/brands/ralph.svg`,
  },
  {
    name: 'Ralph Lauren',
    id: 'rl',
    logo: `${BASE_URL}images/brands/ralph-lauren.svg`,
  },
  {
    name: 'Ray-Ban',
    id: 'rb',
    logo: `${BASE_URL}images/brands/ray-ban.svg`,
  },
  {
    name: 'Ray-Ban Stories',
    id: 'rw',
    logo: `${BASE_URL}images/brands/rw.svg`,
  },
  {
    name: 'Ray-Ban Jr',
    id: 'rj',
    logo: `${BASE_URL}images/brands/ray-ban-jr.svg`,
  },
  {
    name: 'Ray-Ban Junior',
    id: 'rj',
    logo: `${BASE_URL}images/brands/ray-ban-jr.svg`,
  },
  {
    name: 'Ray-Ban Junior Optical',
    id: 'ry',
    logo: `${BASE_URL}images/brands/ray-ban-jr.svg`,
  },
  {
    name: 'Ray-Ban Optical',
    id: 'rx',
    logo: `${BASE_URL}images/brands/ray-ban.svg`,
  },
  {
    name: 'Revo',
    id: 're',
    logo: `${BASE_URL}images/brands/revo.svg`,
  },
  {
    name: 'Scuderia Ferrari',
    id: 'fr',
    logo: `${BASE_URL}images/brands/scuderia-ferrari-logo.svg`,
  },
  {
    name: 'Sferoflex',
    id: 'sf',
    logo: `${BASE_URL}images/brands/sferoflex.svg`,
  },
  {
    name: 'Starck',
    id: 'sh',
    logo: `${BASE_URL}images/brands/starck-eyes.svg`,
  },
  {
    name: 'Starck Eyes',
    id: 'sh',
    logo: `${BASE_URL}images/brands/starck-eyes.svg`,
  },
  {
    name: 'Stella McCartney',
    id: 'sm',
    logo: `${BASE_URL}images/brands/stella-mccartney.svg`,
  },
  {
    name: 'Sunglass Hut',
    id: 'hu',
    logo: `${BASE_URL}images/brands/sunglasshut.svg`,
  },
  {
    name: 'Thom-Browne',
    id: 'tz',
    logo: `${BASE_URL}images/brands/thom-browne.svg`,
  },
  {
    name: 'Tiffany',
    id: 'tf',
    logo: `${BASE_URL}images/brands/tiffany.svg`,
  },
  {
    name: 'Tiffany & Co.',
    id: 'tf',
    logo: `${BASE_URL}images/brands/tiffany.svg`,
  },
  {
    name: 'Tom Ford',
    id: 'tr',
    logo: `${BASE_URL}images/brands/tom-ford.svg`,
  },
  {
    name: 'Tory Burch',
    id: 'ty',
    logo: `${BASE_URL}images/brands/tory-burch.svg`,
  },
  {
    name: 'Unofficial',
    id: 'un',
    logo: `${BASE_URL}images/brands/unofficial.svg`,
  },
  {
    name: 'Valentino',
    id: 'va',
    logo: `${BASE_URL}images/brands/valentino.svg`,
  },
  {
    name: 'Versace',
    id: 've',
    logo: `${BASE_URL}images/brands/versace.svg`,
  },
  {
    name: 'Vogue',
    id: 'vo',
    logo: `${BASE_URL}images/brands/vogue.svg`,
  },
  {
    name: 'Vogue Junior',
    id: 'vj',
    logo: `${BASE_URL}images/brands/vogue-junior.svg`,
  },
  {
    name: 'Vogue Eyewear',
    id: 'vy',
    logo: `${BASE_URL}images/brands/vogue.svg`,
  },
  {
    name: 'Accessories',
    id: 'os',
    logo: '',
  },
  {
    name: 'Adrienne Vittadini',
    id: 'av',
    logo: '',
  },
  {
    name: 'Anne Klein',
    id: 'ak',
    logo: '',
  },
  {
    name: 'Apparel',
    id: 'oa',
    logo: '',
  },
  {
    name: 'Art Collection',
    id: '1a',
    logo: '',
  },
  {
    name: 'Benetton',
    id: 'b9',
    logo: '',
  },
  {
    name: 'Brooks Brothers',
    id: 'bb',
    logo: `${BASE_URL}images/brands/brooks_brothers.svg`,
  },
  {
    name: 'Cartier',
    id: '6l',
    logo: `${BASE_URL}images/brands/cartier.svg`,
  },
  {
    name: 'Celine',
    id: 'cl',
    logo: `${BASE_URL}images/brands/celine.svg`,
  },
  {
    name: 'Club Monaco',
    id: 'cm',
    logo: '',
  },
  {
    name: 'Coach Poppy',
    id: 'cy',
    logo: '',
  },
  {
    name: 'Dbyd',
    id: 'db',
    logo: `${BASE_URL}images/brands/dbyd.svg`,
  },
  {
    name: 'Disney',
    id: '3e',
    logo: '',
  },
  {
    name: 'DNZ',
    id: '',
    logo: '',
  },
  {
    name: 'Footwear',
    id: 'of',
    logo: '',
  },
  {
    name: 'Giorgio Tesino',
    id: '2a',
    logo: '',
  },
  {
    name: 'Grazi Massafera',
    id: 'gz',
    logo: '',
  },
  {
    name: 'Jean Monnier',
    id: 'j8',
    logo: '',
  },
  {
    name: 'Killer Loop',
    id: 'kl',
    logo: '',
  },
  {
    name: 'Killer Loop Vista',
    id: 'kx',
    logo: '',
  },
  {
    name: 'Kipling',
    id: 'kp',
    logo: '',
  },
  {
    name: 'Leader Sport',
    id: 'ls',
    logo: '',
  },
  {
    name: 'Liu Jo',
    id: 'lq',
    logo: '',
  },
  {
    name: 'Luxloc',
    id: '3a',
    logo: '',
  },
  {
    name: 'Luxottica Collection',
    id: 'lc',
    logo: '',
  },
  {
    name: 'Luxottica Lx',
    id: 'lx',
    logo: '',
  },
  {
    name: 'Mega',
    id: '1b',
    logo: '',
  },
  {
    name: 'Mikli par Mikli',
    id: 'mm',
    logo: '',
  },
  {
    name: 'Mosley Tribes',
    id: 'mt',
    logo: '',
  },
  {
    name: 'New Trends',
    id: '88',
    logo: '',
  },
  {
    name: 'No brand',
    id: 'yy',
    logo: '',
  },
  {
    name: 'Optikus',
    id: '1e',
    logo: '',
  },
  {
    name: 'Optimor',
    id: '4a',
    logo: '',
  },
  {
    name: 'Optus',
    id: '2c',
    logo: '',
  },
  {
    name: 'Paul Smith',
    id: 'pm',
    logo: '',
  },
  {
    name: 'Pierre Cardin',
    id: 'p7',
    logo: '',
  },
  {
    name: 'Platini',
    id: 'p9',
    logo: '',
  },
  {
    name: 'Polo',
    id: 'ph',
    logo: '',
  },
  {
    name: 'Polo Prep',
    id: 'pp',
    logo: '',
  },
  {
    name: 'Puma',
    id: 'pu',
    logo: '',
  },
  {
    name: 'Purple label Ralph',
    id: 'pl',
    logo: '',
  },
  {
    name: 'Reed Krakoff',
    id: 'rk',
    logo: '',
  },
  {
    name: 'Salmoiraghi',
    id: 'sv',
    logo: `${BASE_URL}images/brands/salmoiraghi.svg`,
  },
  {
    name: 'Saint Laurent',
    id: 'sl',
    logo: `${BASE_URL}images/brands/saint-laurent.svg`,
  },
  {
    name: 'Seen',
    id: 'se',
    logo: `${BASE_URL}images/brands/seen.svg`,
  },
  {
    name: 'Senninha',
    id: 's9',
    logo: '',
  },
  {
    name: 'Silhouette',
    id: 'si',
    logo: `${BASE_URL}images/brands/silhouette.svg`,
  },
  {
    name: 'Swarovski',
    id: 'sw',
    logo: `${BASE_URL}images/brands/swarovski.svg`,
  },
  {
    name: 'Target',
    id: '2d',
    logo: '',
  },
  {
    name: 'Tecnol',
    id: 'tn',
    logo: '',
  },
  {
    name: 'Top Ten',
    id: '1c',
    logo: '',
  },
  {
    name: 'Turma Da Monica',
    id: 't9',
    logo: '',
  },
  {
    name: 'Versus',
    id: 'vr',
    logo: '',
  },
  {
    name: 'Yanks',
    id: '2e',
    logo: '',
  },
  {
    name: 'Yves Saint Laurent',
    id: 'ys',
    logo: `${BASE_URL}images/brands/saint-laurent.svg`,
  },
  {
    name: 'Zoom',
    id: '1d',
    logo: '',
  },
  {
    name: 'Native',
    id: 'xd',
    logo: `${BASE_URL}images/brands/xd.svg`,
  },
  {
    name: 'Chloe',
    id: '6n',
    logo: `${BASE_URL}images/brands/chloe.svg`,
  },
  {
    name: 'Marni',
    id: '7r',
    logo: '',
  },
  {
    name: 'Moncler',
    id: 'mo',
    logo: `${BASE_URL}images/brands/moncler.svg`,
  },
  {
    name: 'Diesel',
    id: 'di',
    logo: `${BASE_URL}images/brands/diesel.svg`,
  },
]

export default brandList
