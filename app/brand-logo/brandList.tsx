export interface IBrands {
  name: string
  id: string
  logo: string
  background?: string
}

const brandList: IBrands[] = [
  {
    name: 'Alain Mikli',
    id: 'a0',
    logo: '/images/brands/alan-mikli.svg',
  },
  {
    name: 'A New Day',
    id: 'a3',
    logo: '/images/brands/a-new-day.svg',
  },
  {
    name: 'Armani Exchange',
    id: 'ax',
    logo: '/images/brands/armani-exchange.svg',
  },
  {
    name: 'Arnette',
    id: 'an',
    logo: '/images/brands/arnette.svg',
  },
  {
    name: 'Balenciaga',
    id: '6e',
    logo: '/images/brands/balenciaga.svg',
  },
  {
    name: 'Bottega Veneta',
    id: '6j',
    logo: '/images/brands/bottega-veneta.svg',
  },
  {
    name: 'Boucheron',
    id: 'bu',
    logo: '/images/brands/boucheron.svg',
  },
  {
    name: 'Burberry',
    id: 'be',
    logo: '/images/brands/burberry.svg',
  },
  {
    name: 'Bulgari',
    id: 'bv',
    logo: '/images/brands/bulgari.svg',
  },
  {
    name: 'Calvin Klein',
    id: 'cq',
    logo: '/images/brands/calvin_klein.svg',
  },
  {
    name: 'CHANEL',
    id: 'ch',
    logo: '/images/brands/chanel.svg',
  },
  {
    name: 'Chaps',
    id: 'cp',
    logo: '/images/brands/chaps.svg',
  },
  {
    name: 'Coach',
    id: 'hc',
    logo: '/images/brands/coach.svg',
  },
  {
    name: 'Costa',
    id: '6s',
    logo: '/images/brands/costa_bl.svg',
  },
  {
    name: 'Costa del Mar',
    id: '6s',
    logo: '/images/brands/costa_bl.svg',
  },
  {
    name: 'Christian Dior',
    id: 'cd',
    logo: '/images/brands/dior-homme.svg',
  },
  {
    name: 'David Clulow',
    id: 'dc',
    logo: '/images/brands/david-clulow.svg',
  },
  {
    name: 'DIOR',
    id: 'cd',
    logo: '/images/brands/dior-homme.svg',
  },
  {
    name: 'Dolcegabbana',
    id: 'dg',
    logo: '/images/brands/dolce-and-gabbana.svg',
  },
  {
    name: 'Donna Karan New York',
    id: 'dy',
    logo: '/images/brands/dkny.svg',
  },
  {
    name: 'Dita',
    id: 'd4',
    logo: '/images/brands/dita.svg',
  },
  {
    name: 'Emporio Armani',
    id: 'ea',
    logo: '/images/brands/emporio-armani.svg',
  },
  {
    name: 'ESS',
    id: 'ee',
    logo: '/images/brands/ees.svg',
  },
  {
    name: 'Fendi',
    id: 'fn',
    logo: '/images/brands/fendi.svg',
  },
  {
    name: 'Ferragamo',
    id: 'fe',
    logo: '/images/brands/salvatore-ferragamo.svg',
  },
  {
    name: 'Furla',
    id: 'fu',
    logo: '/images/brands/furla.svg',
  },
  {
    name: 'Giorgio Armani',
    id: 'ar',
    logo: '/images/brands/giorgio-armani.svg',
  },
  {
    name: 'Gucci',
    id: 'gc',
    logo: '/images/brands/gucci.svg',
  },
  {
    name: 'Guess',
    id: 'gu',
    logo: '/images/brands/guess.svg',
  },
  {
    name: 'Goodfellow & Co',
    id: 'go',
    logo: '/images/brands/goodfellow-and-co.svg',
  },
  {
    name: 'Jimmy Choo',
    id: 'jc',
    logo: '/images/brands/jimmy-choo-logo.svg',
  },
  {
    name: 'Le Specs',
    id: 'l5',
    logo: '/images/brands/le-specs.svg',
  },
  {
    name: 'Loewe',
    id: 'e4',
    logo: '/images/brands/loewe.svg',
  },
  {
    name: 'Luxottica',
    id: 'lu',
    logo: '/images/brands/luxottica.jpg',
  },
  {
    name: 'Maui Jim',
    id: 'mj',
    logo: '/images/brands/maui-jim.svg',
  },
  {
    name: 'Michael Kors',
    id: 'mk',
    logo: '/images/brands/michael-kors.svg',
  },
  {
    name: 'Miu Miu',
    id: 'mu',
    logo: '/images/brands/miu-miu.svg',
  },
  {
    name: 'Oakley',
    id: 'oo',
    logo: '/images/brands/oakley.svg',
    background: 'banner-oakley.png',
  },
  {
    name: 'Oakley Goggles',
    id: 'oz',
    logo: '/images/brands/oakley.svg',
  },
  {
    name: 'Oakley MX Goggles',
    id: 'om',
    logo: '/images/brands/oakley.svg',
  },
  {
    name: 'Oakley Optical',
    id: 'ox',
    logo: '/images/brands/oakley.svg',
  },
  {
    name: 'Oakley Youth',
    id: 'oj',
    logo: '/images/brands/oakley-youth.svg',
  },
  {
    name: 'Oakley Youth Optical',
    id: 'oy',
    logo: '/images/brands/oakley-youth.svg',
  },
  {
    name: 'Oakley Youth Sun',
    id: 'oj',
    logo: '/images/brands/oakley-youth.svg',
  },
  {
    name: 'Oliver Peoples',
    id: 'ov',
    logo: '/images/brands/oliver-peoples.svg',
  },
  {
    name: 'Polaroid',
    id: 'p4',
    logo: '/images/brands/polaroid.svg',
  },
  {
    name: 'Polo Ralph Lauren',
    id: 'ph',
    logo: '/images/brands/polo-ralph-lauren.svg',
  },
  {
    name: 'Prada',
    id: 'pr',
    logo: '/images/brands/prada.svg',
  },
  {
    name: 'Prada Linea Rossa',
    id: 'ps',
    logo: '/images/brands/prada-linea-rossa.svg',
  },
  {
    name: 'Persol',
    id: 'po',
    logo: '/images/brands/persol.svg',
  },
  {
    name: 'Polo Prep',
    id: 'pp',
    logo: '/images/brands/polo-prep.svg',
  },
  {
    name: 'Ralph',
    id: 'ra',
    logo: '/images/brands/ralph.svg',
  },
  {
    name: 'Ralph Lauren',
    id: 'rl',
    logo: '/images/brands/ralph-lauren.svg',
  },
  {
    name: 'Ray-Ban',
    id: 'rb',
    logo: '/images/brands/ray-ban.svg',
  },
  {
    name: 'Ray-Ban Stories',
    id: 'rw',
    logo: '/images/brands/rw.svg',
  },
  {
    name: 'Ray-Ban Jr',
    id: 'rj',
    logo: '/images/brands/ray-ban-jr.svg',
  },
  {
    name: 'Ray-Ban Junior',
    id: 'rj',
    logo: '/images/brands/ray-ban-jr.svg',
  },
  {
    name: 'Ray-Ban Junior Optical',
    id: 'ry',
    logo: '/images/brands/ray-ban-jr.svg',
  },
  {
    name: 'Ray-Ban Optical',
    id: 'rx',
    logo: '/images/brands/ray-ban.svg',
  },
  {
    name: 'Revo',
    id: 're',
    logo: '/images/brands/revo.svg',
  },
  {
    name: 'Scuderia Ferrari',
    id: 'fr',
    logo: '/images/brands/scuderia-ferrari-logo.svg',
  },
  {
    name: 'Sferoflex',
    id: 'sf',
    logo: '/images/brands/sferoflex.svg',
  },
  {
    name: 'Starck',
    id: 'sh',
    logo: '/images/brands/starck-eyes.svg',
  },
  {
    name: 'Starck Eyes',
    id: 'sh',
    logo: '/images/brands/starck-eyes.svg',
  },
  {
    name: 'Stella McCartney',
    id: 'sm',
    logo: '/images/brands/stella-mccartney.svg',
  },
  {
    name: 'Sunglass Hut',
    id: 'hu',
    logo: '/images/brands/sunglasshut.svg',
  },
  {
    name: 'Thom-Browne',
    id: 'tz',
    logo: '/images/brands/thom-browne.svg',
  },
  {
    name: 'Tiffany',
    id: 'tf',
    logo: '/images/brands/tiffany.svg',
  },
  {
    name: 'Tiffany & Co.',
    id: 'tf',
    logo: '/images/brands/tiffany.svg',
  },
  {
    name: 'Tom Ford',
    id: 'tr',
    logo: '/images/brands/tom-ford.svg',
  },
  {
    name: 'Tory Burch',
    id: 'ty',
    logo: '/images/brands/tory-burch.svg',
  },
  {
    name: 'Unofficial',
    id: 'un',
    logo: '/images/brands/unofficial.svg',
  },
  {
    name: 'Valentino',
    id: 'va',
    logo: '/images/brands/valentino.svg',
  },
  {
    name: 'Versace',
    id: 've',
    logo: '/images/brands/versace.svg',
  },
  {
    name: 'Vogue',
    id: 'vo',
    logo: '/images/brands/vogue.svg',
  },
  {
    name: 'Vogue Junior',
    id: 'vj',
    logo: '/images/brands/vogue-junior.svg',
  },
  {
    name: 'Vogue Eyewear',
    id: 'vy',
    logo: '/images/brands/vogue.svg',
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
    logo: '/images/brands/brooks_brothers.svg',
  },
  {
    name: 'Cartier',
    id: '6l',
    logo: '/images/brands/cartier.svg',
  },
  {
    name: 'Celine',
    id: 'cl',
    logo: '/images/brands/celine.svg',
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
    logo: '/images/brands/dbyd.svg',
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
    logo: '/images/brands/salmoiraghi.svg',
  },
  {
    name: 'Saint Laurent',
    id: 'sl',
    logo: '/images/brands/saint-laurent.svg',
  },
  {
    name: 'Seen',
    id: 'se',
    logo: '/images/brands/seen.svg',
  },
  {
    name: 'Senninha',
    id: 's9',
    logo: '',
  },
  {
    name: 'Silhouette',
    id: 'si',
    logo: '/images/brands/silhouette.svg',
  },
  {
    name: 'Swarovski',
    id: 'sw',
    logo: '/images/brands/swarovski.svg',
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
    logo: '/images/brands/saint-laurent.svg',
  },
  {
    name: 'Zoom',
    id: '1d',
    logo: '',
  },
  {
    name: 'Native',
    id: 'xd',
    logo: '/images/brands/xd.svg',
  },
  {
    name: 'Chloe',
    id: '6n',
    logo: '/images/brands/chloe.svg',
  },
  {
    name: 'Marni',
    id: '7r',
    logo: '',
  },
  {
    name: 'Moncler',
    id: 'mo',
    logo: '/images/brands/moncler.svg',
  },
  {
    name: 'Diesel',
    id: 'di',
    logo: '/images/brands/diesel.svg',
  },
]

export default brandList
