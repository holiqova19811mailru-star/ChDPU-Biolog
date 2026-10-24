export interface SpeciesInfo {
  id: string;
  nameUz: string;
  scientificName: string;
  status: 'Qizil kitob (CR)' | 'Qizil kitob (EN)' | 'Qizil kitob (VU)' | 'Endemik' | 'Keng tarqalgan';
  habitat: string;
  region: string;
  description: string;
  ecologicalRole: string;
  adaptation: string;
  threats: string[];
}

export const uzbekistanSpecies: SpeciesInfo[] = [
  {
    id: 'spec-snow-leopard',
    nameUz: 'Qor barsi (Ilvirs)',
    scientificName: 'Panthera uncia',
    status: 'Qizil kitob (EN)',
    habitat: 'Alp va subalp mintaqasi qoyalari (2500 - 4500 m)',
    region: 'G\'arbiy Tyan-Shan (Chotqol, Piskom tizmalari), Hisor qo\'riqxonasi',
    description: 'Qalin junli, oq-kulrang dog\'dor yirtqich. O\'zbekistonning eng yuqori trofik darajadagi noyob sutemizuvchisi.',
    ecologicalRole: 'Tog\' ekotizimida yuqori konsument; tog\' echkilari va sug\'urlar populyatsiyasini tabiiy nazorat qiladi.',
    adaptation: 'Katta ko\'krak qafasi siyrak tog\' havosidan kislorod olishga, keng panjalari qorda sirpanmaslikka moslashgan.',
    threats: ['Ozuqa bazasining kamayishi', 'Noqonuniy ov (brakonyerlik)', 'Iqlim isishi va muzliklar chekinishi']
  },
  {
    id: 'spec-bukhara-deer',
    nameUz: 'Buxoro bug\'usi (Xongul)',
    scientificName: 'Cervus hanglu bactrianus',
    status: 'Qizil kitob (VU)',
    habitat: 'Daryo bo\'yi to\'qayzorlari va qamishzorlar',
    region: 'Zarafshon milliy bog\'i, Quyi Amudaryo biosfera rezervati',
    description: 'O\'rta Osiyo daryolari to\'qay ekotizimining ramzi bo\'lgan go\'zal jufttuyoqli o\'txo\'r hayvon.',
    ecologicalRole: 'To\'qay o\'simliklarining qalin qoplamini tartibga soladi, urug\'larning tarqalishiga xizmat qiladi.',
    adaptation: 'To\'qay chakalakzorlarida tez harakatlanish va suvda yaxshi suzish qobiliyati.',
    threats: ['To\'qay o\'rmonlarining kesilishi', 'Daryo oqimining kamayishi va qurg\'oqchilik']
  },
  {
    id: 'spec-greig-tulip',
    nameUz: 'Lola greyg (Greig lolasi)',
    scientificName: 'Tulipa greigii Regel',
    status: 'Qizil kitob (VU)',
    habitat: 'Toshloq va unumdor mayda tuproqli tog\' yonbag\'irlari',
    region: 'Chotqol, Qurama, Ugom tog\' tizmalari',
    description: 'Barglarida to\'q binafsharang chiziqlar bo\'lgan, gulbarglari yirik, qizil va sariq tusli dunyoga mashhur yovvoyi lola turi.',
    ecologicalRole: 'Bahorgi changlatuvchi hasharotlar (asalarilar, arilar) uchun nektar va chang manbai.',
    adaptation: 'Piyozboshisi yer ostida qishki qattiq sovuqdan himoyalangan, efemeroid sifatida erta bahorda tez urug\'laydi.',
    threats: ['Gullarning tartibsiz uzilishi', 'Chorva mollarining haddan tashqari boqilishi']
  },
  {
    id: 'spec-black-saxaul',
    nameUz: 'Qora saksovul',
    scientificName: 'Haloxylon aphyllum',
    status: 'Endemik',
    habitat: 'Cho\'l, qumloq va sho\'rxok biotoplar',
    region: 'Qizilqum, Orolqum, Ustyurt platosi',
    description: 'Cho\'l zonasidagi poyasi qattiq, barglari mayda tangachalarga aylangan kserogalofit buta yoki past bo\'yli daraxt.',
    ecologicalRole: 'Qum ko\'chishini to\'xtatadi, qum bo\'ronlari paytida tuproq eroziyasini 80% gacha kamaytiradi.',
    adaptation: 'Ildiz tizimi 15-20 metrgacha boradi; hujayra shirasida osmotik faol erigan tuzlar yuqori konsentratsiyada to\'planadi.',
    threats: ['O\'tin sifatida noqonuniy kesilish', 'Cho\'llanish sur\'atining ortishi']
  },
  {
    id: 'spec-severtzov-sheep',
    nameUz: 'Severtsov qo\'yi (Qizilqum arxari)',
    scientificName: 'Ovis vignei severtzovi',
    status: 'Qizil kitob (EN)',
    habitat: 'Toshli past tog\' tizmalari va daralar',
    region: 'Nurota tog\' tizmasi, Tomditog\'',
    description: 'O\'zbekistonning tor arealga ega endemik yovvoyi qo\'yi; faqat Nurota tog\'lari va unga tutash qoyalarda saqlanib qolgan.',
    ecologicalRole: 'Tog\'li o\'tloqlarning florasini me\'yorda saqlovchi o\'txo\'r.',
    adaptation: 'Tik qoyalarda tez harakatlanish va kserofit butalar bilan oziqlanishga moslashgan tish tuzilishi.',
    threats: ['Yashash maydonlarining chorva tomonidan egallanishi', 'Brakonyerlik']
  }
];

// Uzbekistan Ecosystems
export interface EcosystemZone {
  id: string;
  name: string;
  areaDesc: string;
  keyFlora: string[];
  keyFauna: string[];
  climateDetails: string;
  conservationStatus: string;
}

export const uzbekistanEcosystems: EcosystemZone[] = [
  {
    id: 'eco-chatkal',
    name: 'G\'arbiy Tyan-Shan va Chotqol Biosfera Rezervati',
    areaDesc: 'Baland tog\' archazorlari, yong\'oqzorlar, alp o\'tloqlari va karst g\'orlari.',
    keyFlora: ['Zarafshon archasi (Juniperus seravschanica)', 'Greig lolasi', 'Yovvoyi olma (Malus sieversii)', 'Yong\'oq (Juglans regia)'],
    keyFauna: ['Qor barsi', 'Tyan-Shan qo\'ng\'ir ayig\'i', 'Menzbir sug\'uri (endemik)', 'Burgut'],
    climateDetails: 'Kontinental tog\' iqlimi, qishi sovuq qorli, yozi salqin va toza.',
    conservationStatus: 'UNESCO Butunjahon tabiiy merosi obyekti.'
  },
  {
    id: 'eco-kyzylkum',
    name: 'Qizilqum Sahrosi va Orolqum',
    areaDesc: 'Qumli barxanlar, gipsli qirlar, sho\'rxok pastliklar va Orol dengizining qurigan tubi.',
    keyFlora: ['Qora saksovul', 'Qandim (Calligonum)', 'Yantoq (Alhagi)', 'Cherkess (Salsola richteri)'],
    keyFauna: ['Jayron (Gazella subgutturosa)', 'Cho\'l toshbaqasi', 'Quloqli tipratikan', 'Ilonko\'z kaltakesak'],
    climateDetails: 'Keskin kontinental cho\'l iqlimi: yozda havo +48°C gacha isiydi, yog\'ingarchilik 100-150 mm.',
    conservationStatus: 'Fitomelioratsiya hududi, Buxoro ixtisoslashtirilgan "Jayron" pitomnigi mavjud.'
  },
  {
    id: 'eco-tugay',
    name: 'Amudaryo va Zarafshon Daryolari To\'qay Ekotizimi',
    areaDesc: 'Daryo terrasalaridagi qalin to\'qay o\'rmonlari, qayirzorlar va ko\'llar tizimi.',
    keyFlora: ['Turang\'il (Populus pruinosa)', 'Yulg\'un (Tamarix)', 'Jiydazor (Elaeagnus)', 'Qamish (Phragmites)'],
    keyFauna: ['Buxoro bug\'usi (Xongul)', 'Zarafshon qirg\'ovuli', 'Chiyabo\'ri', 'To\'qay mushugi'],
    climateDetails: 'Nam daryo bo\'yi mikroiqlimi, mavsumiy toshqinlar ta\'siri ostida shakllanadi.',
    conservationStatus: 'Quyi Amudaryo davlat biosfera rezervati tomonidan muhofaza qilinadi.'
  }
];

// Daily Biology Facts
export const dailyBiologyFacts = [
  {
    id: 'fact-1',
    title: 'Hujayra ichidagi motor oqsillari',
    fact: 'Kinezin oqsillari yuklarni (vezikula va mitoxondriyalarni) mikronaychalar bo\'ylab xuddi "ikki oyoqda yurgandek" sekundiga 100 qadam tezlikda tashiydi va har qadamda bitta ATF sarflaydi.',
    source: 'Cell Biology Research (Nature 2024)'
  },
  {
    id: 'fact-2',
    title: 'Saksovulning mo\'jizaviy kuchi',
    fact: 'Bitta tup katta yoshli qora saksovul o\'z ildizlari bilan 4 tonnagacha ko\'chma qumni ushlab tura oladi va 100 metr kvadrat maydonda deflyatsiyani to\'xtatadi.',
    source: 'O\'zbekiston Fanlar Akademiyasi Botanika Instituti'
  },
  {
    id: 'fact-3',
    title: 'Inson DNKsining umumiy uzunligi',
    fact: 'Bitta inson organizmidagi barcha hujayralarning DNK zanjirlari bir-biriga ulansa, uning uzunligi Yer bilan Quyosh orasidagi masofadan (150 mln km) 50 martadan ko\'proq uzun bo\'ladi.',
    source: 'Human Genome Project'
  },
  {
    id: 'fact-4',
    title: 'RuBisCO — Sayyoramizdagi eng sekin, ammo eng ko\'p oqsil',
    fact: 'Fotosintezning asosiy fermenti RuBisCO sekundiga bor-yo\'g\'i 3-10 ta CO2 molekulasini bog\'laydi. Sekin ishlagani uchun o\'simliklar o\'z barglaridagi eruvchan oqsillarning 50% gachasini faqat RuBisCO dan iborat qiladi!',
    source: 'Biochemistry Journal'
  }
];

// Questions of the Day
export const questionsOfTheDay = [
  {
    id: 'qotd-1',
    question: 'Nima uchun dengiz yoki sho\'rxok hududda o\'suvchi o\'simliklar (galofitlar) sho\'r suvda qurib qolmaydi?',
    options: [
      'Ularning hujayralarida tuz o\'tmaydigan qo\'shimcha tosh qobiq bor',
      'Hujayralari vakuolalarida prolin va organik osmoprotektorlar to\'plab, ichki osmotik bosimni tashqi muhitdan yuqori ushlab turadi',
      'Ular umuman suv ichmaydi, faqat havodan namlik oladi',
      'Fotosintez o\'rniga fermentatsiya qiladi'
    ],
    correctIndex: 1,
    explanation: 'Galofitlar ildiz hujayralarida erigan organik birikmalar (prolin, betain) konsentratsiyasini oshirib, ichki osmotik so\'rish kuchini sho\'r tuproq bosimidan yuqori saqlaydi va osmos orqali suv oladi.'
  },
  {
    id: 'qotd-2',
    question: 'Eritrositlarda yadro va mitoxondriyalarning yo\'qligi qanday fiziologik afzallik beradi?',
    options: [
      'Ular tezroq bo\'linish imkoniyatiga ega bo\'ladi',
      'Ko\'proq gemoglobin joylashtirish va o\'zi tashiydigan kislorodni sarflamaslik (anaerob glikoliz orqali energiya olish)',
      'Oqsillarni sintezlash tezligini oshirish',
      'Immunitetni oshirish'
    ],
    correctIndex: 1,
    explanation: 'Eritrositlar mitoxondriyaga ega bo\'lmagani uchun tashiydigan kislorodini o\'zi ishlatmaydi va anaerob glikolizdan foydalanadi; yadroning yo\'qligi esa gemoglobin uchun maksimal hajm yaratadi.'
  }
];
