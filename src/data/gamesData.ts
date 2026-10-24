export interface GameMeta {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  difficulty: 'Oson' | 'O\'rta' | 'Qiyin';
  badgeName: string;
}

export const gamesCatalog: GameMeta[] = [
  {
    id: 'game-organelle',
    titleKey: 'gameOrganelle',
    descKey: 'Hujayra organoidi tasviri va vazifasi bo\'yicha to\'g\'ri nomini toping.',
    icon: 'Sparkles',
    difficulty: 'Oson',
    badgeName: 'Hujayra Ustasi'
  },
  {
    id: 'game-domino',
    titleKey: 'gameDomino',
    descKey: 'Biologik atamalar va ularning qonuniyatlarini domino zanjiridek ulang.',
    icon: 'Layers',
    difficulty: 'O\'rta',
    badgeName: 'Domino Strategi'
  },
  {
    id: 'game-speed',
    titleKey: 'gameSpeed',
    descKey: '60 soniya ichida eng ko\'p to\'g\'ri biologik savollarga javob bering.',
    icon: 'Zap',
    difficulty: 'O\'rta',
    badgeName: 'Chaqmoq Fikr'
  },
  {
    id: 'game-sequence',
    titleKey: 'gameSequence',
    descKey: 'Oqsil biosintezi, mitoz, Krebs sikli bosqichlarini xatosiz tartiblang.',
    icon: 'ListOrdered',
    difficulty: 'Qiyin',
    badgeName: 'Molekulyar Arxitektor'
  },
  {
    id: 'game-whoami',
    titleKey: 'gameWhoAmI',
    descKey: 'Qisqa belgilar va maslahatlar orqali sirli biologik organizm yoki organni toping.',
    icon: 'HelpCircle',
    difficulty: 'O\'rta',
    badgeName: 'Tiriklik Bilimdoni'
  },
  {
    id: 'game-detective',
    titleKey: 'gameDetective',
    descKey: 'Ekologik falokat sabablarini tahlil qiling va ekotizimni qutqaring.',
    icon: 'Compass',
    difficulty: 'Qiyin',
    badgeName: 'Biyo-Detektiv'
  }
];

// 1. Organelle Game Questions
export interface OrganelleQuestion {
  id: string;
  prompt: string;
  clues: string[];
  options: string[];
  correctAnswer: string;
  explanation: string;
  icon: string;
}

export const organelleGameQuestions: OrganelleQuestion[] = [
  {
    id: 'org-1',
    prompt: 'Men ikki qavatli membranaga egaman. Ichki membranada kristalar mavjud. ATF sintezlayman. Men kimman?',
    clues: ['Ikki qavatli membrana', 'O\'zining halqasimon DNKsi va ribosomasi bor', 'Krebs sikli va oksidlovchi fosforillanish'],
    options: ['Mitoxondriya', 'Xloroplast', 'Golji majmuasi', 'Lizosoma'],
    correctAnswer: 'Mitoxondriya',
    explanation: 'Mitoxondriyalar hujayraning quvvat manbai bo\'lib, ichki kristalarda ATF-sintaza majmualari joylashgan.',
    icon: 'Zap'
  },
  {
    id: 'org-2',
    prompt: 'Men yashil plastidaman. Quyosh nuri energiyasini yutib, suvni fotoliz qilaman va glyukoza hosil qilaman. Men kimman?',
    clues: ['Tilakoidlar va granalar mavjud', 'Xlorofill pigmentiga ega', 'Faqat o\'simlik va ayrim evglenalarda bo\'ladi'],
    options: ['Leykoplast', 'Xromoplast', 'Xloroplast', 'Vakuola'],
    correctAnswer: 'Xloroplast',
    explanation: 'Xloroplastlar tilakoidlarida fotokimyoviy reaksiyalar va stromasida Kalvin sikli kechadi.',
    icon: 'Sun'
  },
  {
    id: 'org-3',
    prompt: 'Men kislotali muhitda ishlovchi gidrolitik fermentlarga to\'laman. Hujayraning eskirgan qismlarini hazm qilaman.',
    clues: ['Bitta membrana bilan o\'ralgan', 'Gidrolazalarga boy (pH ~4.5-5.0)', 'Autofagiya va apoptozda ishtirok etadi'],
    options: ['Peroksisoma', 'Lizosoma', 'Ribosoma', 'Sentrosoma'],
    correctAnswer: 'Lizosoma',
    explanation: 'Lizosomalar gidrolitik fermentlar saqlab, hujayra ichki tozalash xizmatini bajaradi.',
    icon: 'Trash2'
  },
  {
    id: 'org-4',
    prompt: 'Menda membrana yo\'q. Katta va kichik subbirliklardan iboratman. rRNK va oqsillardan tuzilganman.',
    clues: ['Membranasiz organoid', 'Translatsiya (oqsil sintezi) markazi', 'Eukariotlarda 80S, prokariotlarda 70S'],
    options: ['Ribosoma', 'Sentriola', 'Yadrocha', 'Mikronaycha'],
    correctAnswer: 'Ribosoma',
    explanation: 'Ribosoma mRNK kodonlariga mos tRNK antikodonlarini tanib, polipeptid zanjirini sintezlaydi.',
    icon: 'Cpu'
  },
  {
    id: 'org-5',
    prompt: 'Men yassi sisternalar va vezikulalardan iboratman. Oqsillarni saralayman va glikozillayman.',
    clues: ['Sekretor vezikulalar hosil qiladi', 'Lizosomalarning birlamchi shakllanish joyi', 'Kamillo Golji tomonidan kashf etilgan'],
    options: ['Endoplazmatik to\'r', 'Golji majmuasi', 'Sitolizoma', 'Plazmalemma'],
    correctAnswer: 'Golji majmuasi',
    explanation: 'Golji majmuasi endoplazmatik to\'rdan kelgan oqsillarni modifikatsiyalab, maqsadli manzillarga yo\'naltiradi.',
    icon: 'Package'
  }
];

// 2. Domino Game Data
export interface DominoCard {
  id: string;
  leftTerm: string;
  rightMatch: string;
}

export const dominoPairs: Array<{ term: string; match: string; relation: string }> = [
  { term: 'DNK-polimeraza', match: 'Replikatsiya zanjirini uzaytirish', relation: 'Ferment va uning vazifasi' },
  { term: 'Mitoxondriya kristalari', match: 'ATF-sintaza kompleksi', relation: 'Organoid tuzilishi va oqsili' },
  { term: 'RuBisCO', match: 'Kalvin siklida CO2 fiksatsiyasi', relation: 'Fotosintez fermenti' },
  { term: 'Ksilema traxeidlari', match: 'Suv va tuzlar ko\'tarilishi', relation: 'O\'simlik to\'qimasi va oqimi' },
  { term: 'Trikuspidal klapan', match: 'O\'ng bo\'lmacha va qorincha orasi', relation: 'Yurak anatomiyasi' },
  { term: 'CRISPR-Cas9', match: 'Genomni maqsadli tahrirlash', relation: 'Biotexnologik vosita' },
  { term: 'Meyoz I profazasi', match: 'Krossingover va xiazmalar', relation: 'Genetik xilma-xillik fazasi' }
];

// 3. Speed 60s Questions
export interface SpeedQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const speedQuestionsPool: SpeedQuestion[] = [
  { question: 'Odam somatik hujayrasida nechta xromosoma mavjud?', options: ['23 ta', '46 ta', '48 ta', '92 ta'], correctIndex: 1 },
  { question: 'DNK dagi Adeninga komplementar bo\'lgan azot asosi qaysi?', options: ['Guanin', 'Sitozin', 'Timin', 'Urasil'], correctIndex: 2 },
  { question: 'Qaysi qon guruhi universal donor hisoblanadi?', options: ['I (0) guruhi', 'II (A) guruhi', 'III (B) guruhi', 'IV (AB) guruhi'], correctIndex: 0 },
  { question: 'O\'simliklarda fotosintez natijasida qanday gaz ajraladi?', options: ['CO2', 'O2', 'N2', 'CH4'], correctIndex: 1 },
  { question: 'Bakteriyalar xromosomasi qanday shaklda bo\'ladi?', options: ['Chiziqli', 'Halqasimon', 'Tarmoqlangan', 'Spiral'], correctIndex: 1 },
  { question: 'Oqsil sintezining boshlanish (start) kodoni qaysi?', options: ['UAA', 'AUG', 'UGA', 'UAG'], correctIndex: 1 },
  { question: 'Orol dengizining qurigan tubida vujudga kelgan cho\'l qanday ataladi?', options: ['Qizilqum', 'Qoraqum', 'Orolqum', 'Mirzacho\'l'], correctIndex: 2 },
  { question: 'Odam yuragi necha kameradan iborat?', options: ['2 ta', '3 ta', '4 ta', '5 ta'], correctIndex: 2 },
  { question: 'Birlamchi organik modda hosil qiluvchi organizmlar guruhi?', options: ['Konsumentlar', 'Produtsentlar', 'Redutsentlar', 'Detritofaglar'], correctIndex: 1 },
  { question: 'Xlorofill molekulasining markazida qaysi metall ioni turadi?', options: ['Temir (Fe)', 'Magniy (Mg)', 'Mis (Cu)', 'Sink (Zn)'], correctIndex: 1 },
  { question: 'Odam organizmidagi eng yirik bez qaysi?', options: ['Oshqozonosti bezi', 'Jigar', 'Qalqonsimon bez', 'Buyrakusti bezi'], correctIndex: 1 },
  { question: 'O\'simlik bargidagi gaz almashinuvi teshikchalari nima deyiladi?', options: ['Gidatoda', 'Stomata (og\'izcha)', 'Traxea', 'Ksilema'], correctIndex: 1 }
];

// 4. Sequencing Challenges
export interface SequenceChallenge {
  id: string;
  title: string;
  description: string;
  steps: string[];
  correctOrder: number[]; // 0-based indices in correct order
  explanation: string;
}

export const sequenceChallenges: SequenceChallenge[] = [
  {
    id: 'seq-protein',
    title: 'Oqsil biosintezi (Markaziy dogma) ketma-ketligi',
    description: 'DNK dan funksional oqsil molekulasigacha bo\'lgan bosqichlarni to\'g\'ri joylashtiring.',
    steps: [
      'Ribosomaga mRNK va boshlang\'ich Met-tRNK birikadi (Initsiatsiya)',
      'Yadroda DNK matritsasida mRNK transkripsiyasi amalga oshadi',
      'Stop-kodon (UAA/UAG/UGA) kelganda polipeptid ajraladi (Terminatsiya)',
      'mRNK yadrodan sitoplazmaga teshiklar orqali chiqadi',
      'Peptidiltransferaza kovalent peptid bog\'larini hosil qiladi (Elongatsiya)'
    ],
    correctOrder: [1, 3, 0, 4, 2],
    explanation: 'Transkripsiya (1) -> mRNK transporti (3) -> Translatsiya initsiatsiyasi (0) -> Elongatsiya (4) -> Terminatsiya (2).'
  },
  {
    id: 'seq-mitosis',
    title: 'Mitoz bosqichlari ketma-ketligi',
    description: 'Eukariotik somatik hujayra bo\'linishi fazalarini to\'g\'ri tartibga soling.',
    steps: [
      'Xromosomalar hujayra ekvatorida tekislanadi (Metafaza)',
      'Yangi yadro qobiqlari tiklanadi va sitokinez kechadi (Telofaza)',
      'Xromatin zichlashadi, yadro qobig\'i parchalanadi (Profaza)',
      'Qiz xromatidalar qutblarga qarab ajraladi (Anafaza)'
    ],
    correctOrder: [2, 0, 3, 1],
    explanation: 'Profaza (2) -> Metafaza (0) -> Anafaza (3) -> Telofaza (1).'
  },
  {
    id: 'seq-circulation',
    title: 'Katta qon aylanish doirasi yo\'nalishi',
    description: 'Qonning chap qorinchadan o\'ng bo\'lmachagacha harakatlanish zanjirini tuzing.',
    steps: [
      'To\'qima kapillyarlarida gaz va moddalar almashinuvi',
      'Chap qorincha qisqarib qonni aortaga haydaydi',
      'Yuqori va pastki kovak venalar orqali o\'ng bo\'lmachaga quyiladi',
      'Arteriyalar va arteriolalar bo\'ylab a\'zolarga tarqalish',
      'Venulalar va yirik venalarga qonning yig\'ilishi'
    ],
    correctOrder: [1, 3, 0, 4, 2],
    explanation: 'Chap qorincha/Aorta (1) -> Arteriyalar (3) -> Kapillyarlar (0) -> Venalar (4) -> Kovak venalar/O\'ng bo\'lmacha (2).'
  }
];

// 5. Who Am I Riddles
export interface WhoAmIRiddle {
  id: string;
  category: string;
  clues: string[];
  options: string[];
  correctAnswer: string;
  scientificFact: string;
}

export const whoAmIRiddles: WhoAmIRiddle[] = [
  {
    id: 'wai-1',
    category: 'Fauna (O\'zbekiston)',
    clues: [
      'Men mushuksimonlar oilasiga mansub kamyob yirtqichman.',
      'O\'zbekistonning Tyan-Shan va Pomir-Oloy qoyali baland tog\'larida yashayman.',
      'Qalin kulrang-oq junim va uzun qalin dumim qorli qoyalarda muvozanat saqlaydi.',
      'O\'zbekiston va Xalqaro Qizil kitobga kiritilganman.'
    ],
    options: ['Qoplon (Leopard)', 'Qor barsi (Ilvirs)', 'Silovsin (Rys)', 'Gepard'],
    correctAnswer: 'Qor barsi (Ilvirs)',
    scientificFact: 'Qor barsi (Panthera uncia) 2500 metrdan yuqori alp va subalp mintaqalarida tog\' echkilari (kiklar) bilan oziqlanadi.'
  },
  {
    id: 'wai-2',
    category: 'Flora (O\'zbekiston)',
    clues: [
      'Men Qizilqum va Orolqumning asosiy o\'simligiman.',
      'Mening barglarim juda mayda tangachalarga aylangan yoki deyarli yo\'q.',
      'Mening ildizlarim yer ostiga 15-20 metrgacha yetib boradi.',
      'Ko\'chma qumlarni mustahkamlab, qum bo\'ronlarini to\'xtataman.'
    ],
    options: ['Qora saksovul', 'Yantoq', 'Yulg\'un', 'Chul cherkesi'],
    correctAnswer: 'Qora saksovul',
    scientificFact: 'Qora saksovul (Haloxylon aphyllum) sho\'rlanish va jazirama issiqlikka juda chidamli bo\'lib, 1 gektar saksovulzor yiliga yuzlab tonna qumni ushlab qoladi.'
  },
  {
    id: 'wai-3',
    category: 'Inson a\'zosi',
    clues: [
      'Men organizmning eng yirik biokimyoviy laboratoriyasiman.',
      'Glukozani glikogen ko\'rinishida zaxiralayman.',
      'O\'t suyuqligi (safro) ishlab chiqarib yog\'larni emulsiyalayman.',
      'Alkogol va toksinlarni zararsizlantiraman, qon oqsillarini (albumin, fibrinogen) sintezlayman.'
    ],
    options: ['Oshqozon', 'Oshqozonosti bezi', 'Jigar', 'Taloq'],
    correctAnswer: 'Jigar',
    scientificFact: 'Jigar (Hepar) 500 dan ortiq hayotiy muhim biokimyoviy vazifalarni bajaradi va regeneratsiya qilish (qayta tiklanish) qobiliyatiga ega.'
  }
];

// 6. Ecological Detective Cases
export interface DetectiveCase {
  id: string;
  title: string;
  location: string;
  brief: string;
  symptoms: string[];
  cluesFound: string[];
  suspects: Array<{ name: string; description: string; isGuilty: boolean; explanation: string }>;
}

export const ecologicalDetectiveCases: DetectiveCase[] = [
  {
    id: 'case-aral',
    title: 'Ko\'lning qon yo\'qotishi: Baliqlar qirg\'ini',
    location: 'Orolbo\'yi va Janubiy Orol qo\'ltiqlari',
    brief: 'Mahalliy suv havzasida qisqa muddat ichida tikanli baliqlar va sudak nobud bo\'ldi, qirg\'oq bo\'ylab oq kristall qatlam paydo bo\'ldi.',
    symptoms: [
      'Suv sathi 2 oyda 1.5 metrga pasaygan',
      'Suvning sho\'rligi (minerallashuvi) 12 g/l dan 85 g/l gacha keskin ko\'tarilgan',
      'Chuchuk suv planktoni (dafniya, siklop) butunlay yo\'qolgan'
    ],
    cluesFound: [
      'Daryo oqimi (Amudaryo) sug\'orish kanallariga to\'liq burib yuborilgan',
      'Quyosh evaporatsiyasi yuqori bo\'lib, sho\'r qoldiq to\'plangan',
      'Baliqlarda osmotik suvsizlanish va jabralar gipertrofiyasi kuzatilgan'
    ],
    suspects: [
      {
        name: 'Ekstremal gipergalinlik va suv oqimi to\'xtatilishi',
        description: 'Chuchuk suv kirishi keskin kamayishi oqibatida bug\'lanish ustun kelib, tuz konsentratsiyasi ko\'tarilgan.',
        isGuilty: true,
        explanation: 'To\'g\'ri xulosa! Gipergalinizatsiya tufayli baliqlar gipertonik muhitda osmotik suv yo\'qotib ommaviy nobud bo\'lgan.'
      },
      {
        name: 'Virusli yuqumli baliq vabosi',
        description: 'Tashqi infektsiya suvga tushgan deb taxmin qilinmoqda.',
        isGuilty: false,
        explanation: 'Xato. Suv tahlili patogen bakteriya emas, balki tuz miqdori halokatli darajaga yetganini ko\'rsatdi.'
      },
      {
        name: 'Bakterial toksik sianotoksinlar',
        description: 'Moviy-yashil suvo\'tlar zaharli modda ajratgan.',
        isGuilty: false,
        explanation: 'Xato. Yuqori sho\'rlikda odatiy sianobakteriyalar ham rivojlana olmaydi.'
      }
    ]
  },
  {
    id: 'case-eutrophication',
    title: 'Yashil gilam siri: To\'g\'on suvi bo\'g\'ilishi',
    location: 'Chorvoq suv ombori quyilish soyi',
    brief: 'Yoz o\'rtasida sokin ko\'rfaz yuzasi qalin yashil ko\'pik bilan qoplandi, tunda suvda kislorod darajasi deyarli nolga tushdi.',
    symptoms: [
      'Suv rangi to\'q yashil va loyqa',
      'Erigan kislorod (DO) kechasi 0.8 mg/l gacha tushib ketgan',
      'Fosfor va azot konsentratsiyasi normadan 15 baravar yuqori'
    ],
    cluesFound: [
      'Yaqindagi qishloq xo\'jaligi dalalaridan sel bilan mineral o\'g\'itlar (selitra, superfosfat) oqib tushgan',
      'Sianobakteriyalar (Microcystis) portlovchi tezlikda ko\'paygan',
      'Redutsent bakteriyalar o\'lik suvo\'tlarni parchalash uchun barcha kislorodni sarflagan'
    ],
    suspects: [
      {
        name: 'Antropogen evtrofikatsiya (O\'g\'itlar oqishi)',
        description: 'Nitrat va fosfatlar ko\'lga oqishi oqibatida fitoplanktonning ommaviy "gullashi" va gipoksiya vujudga kelgan.',
        isGuilty: true,
        explanation: 'Aynan shunday! Evtrofikatsiya natijasida hosil bo\'lgan biotsenoz halokati zamonaviy ekologiyaning eng dolzarb muammolaridan biridir.'
      },
      {
        name: 'Suv osti vulqon gazi',
        description: 'Tubdan metan gazi sizib chiqqan.',
        isGuilty: false,
        explanation: 'Mintaqada faol vulqonlar mavjud emas va fosforning yuqori bo\'lishi agrar manbani ko\'rsatadi.'
      }
    ]
  }
];
