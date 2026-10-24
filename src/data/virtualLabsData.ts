export interface LabInfo {
  id: string;
  nameKey: string;
  descKey: string;
  icon: string;
  difficulty: 'boshlang\'ich' | 'o\'rta' | 'yuqori';
  durationMinutes: number;
  learningOutcomes: string[];
}

export const virtualLabsCatalog: LabInfo[] = [
  {
    id: 'cell-lab',
    nameKey: 'labCellName',
    descKey: 'labCellDesc',
    icon: 'Sparkles',
    difficulty: 'boshlang\'ich',
    durationMinutes: 15,
    learningOutcomes: [
      'O\'simlik va hayvon hujayrasining o\'ziga xos va umumiy organoidlarini solishtirish',
      'Plastidalar, vakuolalar va hujayra devori biologik ahamiyatini o\'rganish',
      'Organoidlar va ularning biokimyoviy vazifalarini to\'g\'ri moslashtirish'
    ]
  },
  {
    id: 'mitosis-lab',
    nameKey: 'labMitosisName',
    descKey: 'labMitosisDesc',
    icon: 'GitFork',
    difficulty: 'o\'rta',
    durationMinutes: 20,
    learningOutcomes: [
      'Profaza, metafaza, anafaza va telofaza morfolokiyasini mikroskopik aniqlash',
      'Xromosomalar kondensatsiyasi va bo\'linish duki harakatini modellashtirish',
      'Karyotip tahlili uchun eng maqbul bosqichni hisoblash'
    ]
  },
  {
    id: 'microscope-lab',
    nameKey: 'labMicroscopeName',
    descKey: 'labMicroscopeDesc',
    icon: 'Maximize2',
    difficulty: 'boshlang\'ich',
    durationMinutes: 15,
    learningOutcomes: [
      'Yorug\'lik mikroskopi okulyari va obyektivlarining kattalashtirish karraligini hisoblash',
      'Mikropreparatlarda makrovint va mikrovint yordamida o\'tkir fokusni sozlash',
      'Piyoz po\'sti, elodeya, inson qon surtmasi va ildiz meristemasini tekshirish'
    ]
  },
  {
    id: 'photosynthesis-lab',
    nameKey: 'labPhotosynthesisName',
    descKey: 'labPhotosynthesisDesc',
    icon: 'Sun',
    difficulty: 'o\'rta',
    durationMinutes: 25,
    learningOutcomes: [
      'Yorug\'lik intensivligining fotoliz va O2 ajralishiga miqdoriy bog\'liqligini aniqlash',
      'CO2 konsentratsiyasining Kalvin sikli to\'yinish nuqtasiga ta\'sirini o\'lchash',
      'Ekstremal haroratda (+42°C dan yuqori) fermentativ denaturatsiya hodisasini kuzatish'
    ]
  },
  {
    id: 'genetics-lab',
    nameKey: 'labGeneticsName',
    descKey: 'labGeneticsDesc',
    icon: 'Dna',
    difficulty: 'o\'rta',
    durationMinutes: 20,
    learningOutcomes: [
      'Ota-ona genotiplari bo\'yicha gametalarni shakllantirish',
      'Pennet katagini to\'ldirish va avlodlarda genotipik va fenotipik nisbatlarni aniqlash',
      'To\'liq dominantlik, oraliq irsiylanish va tahliliy chatishtirishni tekshirish'
    ]
  },
  {
    id: 'ecosystem-lab',
    nameKey: 'labEcosystemName',
    descKey: 'labEcosystemDesc',
    icon: 'Trees',
    difficulty: 'yuqori',
    durationMinutes: 25,
    learningOutcomes: [
      'Produtsentlar, 1- va 2-tartib konsumentlar va redutsentlar populyatsiyasi balansini modellashtirish',
      'Yirtqich-o\'lja (Lotka-Volterra) dinamikasidagi tebranishlarni tahlil qilish',
      'Tashqi antropogen va iqlimiy omillar ta\'sirida ekotizim barqarorligini baholash'
    ]
  },
  {
    id: 'heart-lab',
    nameKey: 'labHeartName',
    descKey: 'labHeartDesc',
    icon: 'Heart',
    difficulty: 'boshlang\'ich',
    durationMinutes: 15,
    learningOutcomes: [
      'Yurakning 4 kamerasi, bo\'lmachalararo va qorinchalararo to\'siqlar anatomiyasini bilish',
      'Katta va kichik qon aylanish doiralaridagi qon oqim yo\'nalishini interaktiv kuzatish',
      'Yurak avtomatizmi va puls chastotasi o\'zgarishini o\'rganish'
    ]
  },
  {
    id: 'plant-anatomy-lab',
    nameKey: 'labPlantName',
    descKey: 'labPlantDesc',
    icon: 'Layers',
    difficulty: 'o\'rta',
    durationMinutes: 20,
    learningOutcomes: [
      'O\'simlik ildizi, poyasi va bargining ko\'ndalang qirqimini tahlil qilish',
      'Ksilema va floemaning o\'tkazuvchi to\'plamlardagi joylashuvini ko\'rish',
      'Stomata teshiklarining ochilishi va transpiratsiya jadalligini sozlash'
    ]
  }
];

// Data for Cell Lab Organelles
export interface OrganelleItem {
  id: string;
  name: string;
  latinName: string;
  foundIn: 'both' | 'plant-only' | 'animal-only';
  functionUz: string;
  color: string;
  icon: string;
}

export const cellOrganelles: OrganelleItem[] = [
  {
    id: 'nucleus',
    name: 'Yadro va yadrocha',
    latinName: 'Nucleus et nucleolus',
    foundIn: 'both',
    functionUz: 'Irsiy axborot (DNK)ni saqlash, replikatsiya va ribosoma subbirliklarini yig\'ish.',
    color: '#8B5CF6',
    icon: 'CircleDot'
  },
  {
    id: 'mitochondria',
    name: 'Mitoxondriya',
    latinName: 'Mitochondrion',
    foundIn: 'both',
    functionUz: 'Hujayraning energetik stansiyasi — Krebs sikli va oksidlovchi fosforillanish orqali ATF sintezi.',
    color: '#EF4444',
    icon: 'Zap'
  },
  {
    id: 'chloroplast',
    name: 'Xloroplast',
    latinName: 'Chloroplastus',
    foundIn: 'plant-only',
    functionUz: 'Fotosintez orqali quyosh energiyasini glyukoza kimyoviy energiyasiga aylantirish.',
    color: '#10B981',
    icon: 'Sun'
  },
  {
    id: 'cell-wall',
    name: 'Hujayra qobig\'i (devori)',
    latinName: 'Murus cellulae',
    foundIn: 'plant-only',
    functionUz: 'Selluloza mikrofibrillalardan iborat qattiq tayanch va turgor bosimini ta\'minlash.',
    color: '#059669',
    icon: 'Shield'
  },
  {
    id: 'vacuole-central',
    name: 'Markaziy vakuola',
    latinName: 'Vacuola centralis',
    foundIn: 'plant-only',
    functionUz: 'Hujayra shirasini saqlash, osmotik turgor bosimini boshqarish va zaxira moddalar jamlash.',
    color: '#06B6D4',
    icon: 'Droplet'
  },
  {
    id: 'centrosome',
    name: 'Hujayra markazi (Sentriolalar)',
    latinName: 'Centrosoma',
    foundIn: 'animal-only',
    functionUz: 'Hujayra bo\'linishida duk mikronaychalarini tashkil qilish va qutblarni belgilash.',
    color: '#F59E0B',
    icon: 'Crosshair'
  },
  {
    id: 'lysosome',
    name: 'Lizosoma',
    latinName: 'Lysosoma',
    foundIn: 'both',
    functionUz: 'Gidrolitik fermentlar saqlab, hujayra ichki hazmini (autofagiya va fagotsitoz) amalga oshirish.',
    color: '#EC4899',
    icon: 'Trash2'
  },
  {
    id: 'ribosome',
    name: 'Ribosoma',
    latinName: 'Ribosoma',
    foundIn: 'both',
    functionUz: 'mRNK asosida aminokislotalardan polipeptid zanjirlarini (oqsil translatsiyasi) sintez qilish.',
    color: '#3B82F6',
    icon: 'Grid'
  },
  {
    id: 'endoplasmic-reticulum',
    name: 'Endoplazmatik to\'r (silliq va donador)',
    latinName: 'Reticulum endoplasmicum',
    foundIn: 'both',
    functionUz: 'Donador qismi oqsillarni modifikatsiyalaydi, silliq qismi lipidlar va steroid gormonlarni sintezlaydi.',
    color: '#6366F1',
    icon: 'Layers'
  },
  {
    id: 'golgi',
    name: 'Golji majmuasi',
    latinName: 'Complexus golgiensis',
    foundIn: 'both',
    functionUz: 'Oqsillarni saralash, glikozillash, vezikulalarga qadoqlash va sekretor transport.',
    color: '#14B8A6',
    icon: 'Package'
  }
];

// Specimens for Microscope Simulator
export interface MicroscopeSlide {
  id: string;
  name: string;
  latinName: string;
  category: 'botany' | 'zoology' | 'histology' | 'cytology';
  description: string;
  baseMagnification: number;
  structures: Array<{ name: string; x: number; y: number; desc: string }>;
  accentColor: string;
}

export const microscopeSlides: MicroscopeSlide[] = [
  {
    id: 'slide-onion',
    name: 'Piyoz po\'sti epidermisi (Allii cepa)',
    latinName: 'Epidermis bulbi Allii cepae',
    category: 'botany',
    description: 'Yod eritmasi bilan bo\'yalgan o\'simlik hujayralari: selluloza devor, aniq ko\'rinadigan yadro va yadrochalar.',
    baseMagnification: 100,
    accentColor: '#176B4D',
    structures: [
      { name: 'Hujayra devori', x: 28, y: 35, desc: 'Sellulozadan iborat qattiq to\'siq' },
      { name: 'Yadro', x: 50, y: 52, desc: 'Yod bilan to\'q jigarrang bo\'yalgan sharsimon yadro' },
      { name: 'Sitoplazma', x: 65, y: 45, desc: 'Parietal sitoplazmatik qavat' }
    ]
  },
  {
    id: 'slide-blood',
    name: 'Inson qon surtmasi (Eritrotsitlar va leykotsitlar)',
    latinName: 'Fusus sanguinis humani',
    category: 'histology',
    description: 'Romanovskiy-Gimza usulida bo\'yalgan: yadrosiz ikki tomoni botiq disk shaklidagi eritrotsitlar va segment-yadroli neytrofillar.',
    baseMagnification: 400,
    accentColor: '#DC2626',
    structures: [
      { name: 'Eritrotsit', x: 40, y: 45, desc: 'Yadrosiz gemoglobin saqlovchi qizil qon tanachasi' },
      { name: 'Neytrofil leykotsit', x: 62, y: 58, desc: 'Segmentlangan yadroli fagotsitar oq qon tanachasi' },
      { name: 'Qon plazmasi', x: 20, y: 70, desc: 'Hujayralararo suyuq matritsa' }
    ]
  },
  {
    id: 'slide-elodea',
    name: 'Elodeya barg hujayrasi (Xloroplastlar harakati)',
    latinName: 'Elodea canadensis folium',
    category: 'botany',
    description: 'Tirik suv o\'simligi bargida sitoplazmaning aylanma harakati (sikloz) va yashil xloroplastlar.',
    baseMagnification: 400,
    accentColor: '#10B981',
    structures: [
      { name: 'Xloroplast', x: 45, y: 38, desc: 'Xlorofill pigmentli disk shaklidagi organoid' },
      { name: 'Vakuola', x: 55, y: 60, desc: 'Hujayra markazidagi katta osmotik pufak' },
      { name: 'Selluloza qobiq', x: 30, y: 25, desc: 'Yashil rangni ushlab turuvchi shaffof devor' }
    ]
  },
  {
    id: 'slide-root-tip',
    name: 'Piyoz ildiz uchi: Mitoz zonalari',
    latinName: 'Apex radicis Allii — mitosis',
    category: 'cytology',
    description: 'Apikal meristema: hujayra siklining barcha fazalari — profaza, metafaza, anafaza va telofazadagi xromosomalar.',
    baseMagnification: 1000,
    accentColor: '#8B5CF6',
    structures: [
      { name: 'Metafaza plastinkasi', x: 48, y: 42, desc: 'Ekvatorda qator tizilgan xromosomalar' },
      { name: 'Anafaza', x: 70, y: 65, desc: 'Qutblarga qarab ajralayotgan xromatidalar' },
      { name: 'Interfaza yadrosi', x: 25, y: 48, desc: 'G\'ovak xromatinli tinchlik yadrosi' }
    ]
  }
];
