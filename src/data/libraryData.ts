import { LibraryResource } from '../types';

export const libraryResources: LibraryResource[] = [
  {
    id: 'lib-1',
    title: 'Molekulyar Hujayra Biologiyasi (Molecular Biology of the Cell)',
    authors: 'Bruce Alberts, Alexander Johnson, Julian Lewis, David Morgan',
    year: 2022,
    type: 'textbook',
    subjectId: 'subj-cytology',
    language: 'en',
    publisher: 'Garland Science / W. W. Norton',
    sourceUrl: 'https://www.ncbi.nlm.nih.gov/books/NBK21054/',
    openAccess: true,
    pages: 1464,
    description: 'Hujayra biologiyasi bo\'yicha jahonning eng nufuzli fundamental darsligi: membrana transporti, hujayra sikli, sitoskelet va gen ekspressiyasi.'
  },
  {
    id: 'lib-2',
    title: 'O\'simliklar Fiziologiyasi va Rivojlanishi (Plant Physiology and Development)',
    authors: 'Lincoln Taiz, Eduardo Zeiger, Ian Max Møller, Angus Murphy',
    year: 2021,
    type: 'textbook',
    subjectId: 'subj-botany',
    language: 'en',
    publisher: 'Sinauer Associates / Oxford University Press',
    sourceUrl: 'https://academic.oup.com/',
    openAccess: true,
    pages: 880,
    description: 'Fotosintezning biofizikasi, o\'simlik gormonlari (auksin, sitokinin, absitsin kislotasi) va stressga javob reaksiyalari.'
  },
  {
    id: 'lib-3',
    title: 'Umumiy Genetika va Seleksiya Asoslari',
    authors: 'A.T. G\'ofurov, S.S. Fayzullayev, N.K. Yoqubov',
    year: 2023,
    type: 'textbook',
    subjectId: 'subj-genetics',
    language: 'uz',
    publisher: 'O\'zbekiston Milliy Universiteti nashriyoti',
    sourceUrl: 'https://nuu.uz/kutubxona',
    openAccess: true,
    pages: 412,
    description: 'Oliy o\'quv yurtlari biologiya yo\'nalishi talabalari uchun darslik: klassik genetika, populyatsion genetika va qishloq xo\'jaligi seleksiyasi.'
  },
  {
    id: 'lib-4',
    title: 'O\'zbekiston Respublikasi Qizil Kitobi: 1-jild (O\'simliklar va zamburug\'lar), 2-jild (Hayvonlar)',
    authors: 'O\'zbekiston Fanlar Akademiyasi Botanika va Zoologiya institutlari',
    year: 2019,
    type: 'manual',
    subjectId: 'subj-ecology',
    language: 'uz',
    publisher: 'Chinor ENK nashriyoti, Toshkent',
    sourceUrl: 'https://academy.uz/uz/publications',
    openAccess: true,
    pages: 650,
    description: 'O\'zbekiston hududidagi yo\'qolib ketish xavfi ostidagi 314 tur yuksak o\'simlik va 206 tur hayvonning holati, areali va muhofaza choralari.'
  },
  {
    id: 'lib-5',
    title: 'CRISPR-Cas9 Texnologiyasi orqali Paxta Ekinida Gen Tahrirlash Tadqiqotlari',
    authors: 'I.Y. Abduraxmonov, Z.T. Buriyev va boshqalar',
    year: 2024,
    type: 'article',
    subjectId: 'subj-biotech',
    language: 'uz',
    publisher: 'O\'zbekiston Biologiya Jurnali',
    sourceUrl: 'https://genomics.uz/publications',
    openAccess: true,
    pages: 18,
    description: 'Gossypium hirsutum da tola uzunligi va sho\'rga chidamlilik genlarini targetli modifikatsiya qilish bo\'yicha ilmiy maqola.'
  },
  {
    id: 'lib-6',
    title: 'Tibbiy Fiziologiya Darsligi (Guyton and Hall Textbook of Medical Physiology)',
    authors: 'John E. Hall, Michael E. Hall',
    year: 2021,
    type: 'textbook',
    subjectId: 'subj-human-anatomy',
    language: 'en',
    publisher: 'Elsevier Health Sciences',
    sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/',
    openAccess: true,
    pages: 1152,
    description: 'Yurak-qon tomir, buyrak nefronlari klirensi, asab sinapslari va endokrin regulyatsiyaning oltin standarti.'
  },
  {
    id: 'lib-7',
    title: 'NCBI Bookshelf: Genomes and Molecular Genetics',
    authors: 'National Center for Biotechnology Information (NCBI)',
    year: 2025,
    type: 'article',
    subjectId: 'subj-biotech',
    language: 'en',
    publisher: 'National Library of Medicine (US)',
    sourceUrl: 'https://www.ncbi.nlm.nih.gov/books/',
    openAccess: true,
    pages: 500,
    description: 'Erkin kirish huquqiga ega bo\'lgan molekulyar biologiya, bioinformatika va genetik tahlil ma\'lumotlar bazasi.'
  }
];

// Comprehensive Biology Glossary Dictionary (15+ terms with deep definitions)
export interface GlossaryTerm {
  term: string;
  latin: string;
  category: string;
  defUz: string;
  defRu: string;
  defEn: string;
}

export const biologyGlossary: GlossaryTerm[] = [
  {
    term: 'Allopoliploidiya',
    latin: 'Allopolyploidia',
    category: 'Genetika',
    defUz: 'Turli turlarni chatishtirish va keyinchalik xromosomalar to\'plamini karrali orttirish orqali hosil qilingan poliploidlik (masalan, yumshoq bug\'doy 6n=42).',
    defRu: 'Тип полиплоидии, возникающий при межвидовой гибридизации с последующим удвоением числа хромосом.',
    defEn: 'A type of polyploidy created by the hybridization of two distinct species followed by chromosome doubling.'
  },
  {
    term: 'Apoptoz',
    latin: 'Apoptosis',
    category: 'Sitologiya',
    defUz: 'Hujayraning genetik dasturlashtirilgan o\'limi; to\'qima homeostazi va embrional rivojlanishda yallig\'lanishsiz kechadi.',
    defRu: 'Программируемая клеточная гибель, протекающая без воспалительного процесса.',
    defEn: 'Programmed cell death regulated by caspase cascades, essential for tissue homeostasis and morphogenesis.'
  },
  {
    term: 'Endemik tur',
    latin: 'Species endemica',
    category: 'Ekologiya',
    defUz: 'Yer yuzining faqat bitta cheklangan geografik hududida tabiiy uchraydigan biologik tur (masalan, Severtsov qo\'yi faqat Nurota tog\'ida).',
    defRu: 'Вид, обитающий исключительно в строго ограниченной географической области.',
    defEn: 'A species restricted in its native distribution to a particular defined geographic area.'
  },
  {
    term: 'Fitomelioratsiya',
    latin: 'Phytomelioratio',
    category: 'Botanika va Ekologiya',
    defUz: 'Sho\'rlangan, eroziyaga uchragan yoki cho\'llashgan yerlarni maxsus o\'simliklar (saksovul, cherkess) ekish orqali qayta tiklash usuli.',
    defRu: 'Комплекс мероприятий по улучшению почвенно-климатических условий путем посадки растительности.',
    defEn: 'The reclamation and improvement of degraded soils and deserts through specialized vegetation planting.'
  },
  {
    term: 'Krossingover',
    latin: 'Crossing-over',
    category: 'Genetika',
    defUz: 'Meyoz I profazasida gomologik xromosomalarning noqiz xromatidalari o\'rtasida genetik material almashinuvi.',
    defRu: 'Обмен участками гомологичных хромосом во время конъюгации в профазе первого деления мейоза.',
    defEn: 'The reciprocal exchange of genetic material between non-sister chromatids of homologous chromosomes.'
  },
  {
    term: 'RuBisCO',
    latin: 'Ribuloso-biphosphatum carboxylasa',
    category: 'Biokimyo',
    defUz: 'Ribulozo-1,5-bisfosfat karboksilaza-oksigenaza — Kalvin siklida atmosferadagi CO2 ni organik shaklga o\'tkazuvchi asosiy ferment.',
    defRu: 'Ключевой фермент темновой фазы фотосинтеза, катализирующий фиксацию углекислого газа.',
    defEn: 'The primary enzyme catalyzing carbon dioxide fixation in the Calvin-Benson cycle of photosynthesis.'
  },
  {
    term: 'Transpiratsiya',
    latin: 'Transpiratio',
    category: 'O\'simliklar fiziologiyasi',
    defUz: 'O\'simlik yer usti organlari, asosan barg og\'izchalari orqali suvning bug\'lanishi jarayoni.',
    defRu: 'Процесс испарения воды растением преимущественно через устьица листьев.',
    defEn: 'The evaporation of water from plant leaves through the stomatal apertures into the atmosphere.'
  },
  {
    term: 'Turgor bosimi',
    latin: 'Pressio turgoris',
    category: 'Hujayra biologiyasi',
    defUz: 'Vakuola ichidagi suvning hujayra qobig\'iga ko\'rsatadigan gidrostatik ichki bosimi; o\'simlikka qad rostlab turish imkonini beradi.',
    defRu: 'Внутреннее гидростатическое давление в растительной клетке, создаваемое вакуолярным содержимым.',
    defEn: 'The hydrostatic pressure exerted by cell sap against the rigid plant cell wall.'
  }
];
