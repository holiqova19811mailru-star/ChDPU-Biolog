import { Subject } from '../types';

export const subjectsData: Subject[] = [
  {
    id: 'subj-cytology',
    slug: 'sitologiya',
    titleKey: 'Sitologiya va Hujayra Biologiyasi',
    descriptionKey: 'Hujayraning ultrastrukturasi, organoidlar biogenezi va membrana transporti qonuniyatlari.',
    iconName: 'Sparkles',
    color: '#176B4D',
    topicsCount: 3,
    category: 'fundamental',
    topics: [
      {
        id: 'topic-cyto-1',
        subjectId: 'subj-cytology',
        title: 'Hujayra membranasi: Suyuq-mozaik model va passiv/aktiv transport',
        objective: 'Biologik membranalarning fosfolipid biqavati tuzilishi, oqsil turlari va moddalar selektiv o\'tkazuvchanlik mexanizmlarini tushunish.',
        expectedOutcomes: [
          'Singor va Nikolsonning suyuq-mozaik modelini tushuntira olish',
          'Passiv diffuziya, osonlashtirilgan diffuziya va osmos jarayonlarini farqlash',
          'Kaliy-natriy nasosi (Na+/K+-ATFaza) misolida birlamchi aktiv transportni tahlil qilish',
          'Hujayra gipotonik, gipertonik va izotonik eritmalarga tushgandagi o\'zgarishlarni bashorat qilish'
        ],
        keyTerms: [
          { term: 'Fosfolipid biqavat', definition: 'Gidrofil fosfat qutbli boshcha va gidrofob yog\' kislotali dumlardan tashkil topgan ikki qavatli membrana skeleti.' },
          { term: 'Na+/K+-ATFaza', definition: '1 ta ATF molekulasi hisobiga hujayradan 3 ta Na+ chiqarib, hujayraga 2 ta K+ kirituvchi elektrogen transmembrana nasosi.' },
          { term: 'Plazmoliz', definition: 'O\'simlik hujayrasi gipertonik eritmaga tushganda protoplastning hujayra qobig\'idan ajralishi va siqilishi.' },
          { term: 'Akvaporin', definition: 'Suv molekulalarining membrana orqali tez o\'tishini ta\'minlovchi integral kanal oqsili.' }
        ],
        shortLecture: 'Biologik membranalar hujayrani tashqi muhitdan ajratib turuvchi va ichki kompartmentlarni hosil qiluvchi yarim o\'tkazuvchan to\'siqdir. Suyuq-mozaik modelga ko\'ra, lipidlar lateral harakatlanuvchi suyuq matritsani hosil qiladi, unga integral va periferik oqsillar botib kirgan.',
        detailedContent: `1. Membrana tarkibi:
- Fosfolipidlar (fosfatidilxolin, fosfatidiletanolamin) va xolesterin (hayvonlarda membrana oquvchanligini saqlovchi tampon).
- Integral oqsillar transmembrana kanallar, tashuvchilar va retseptorlar rolini o'ynaydi.
- Glikokaliks (glikolipid va glikoproteinlar) hujayralararo tanishuv va immun javobda ishtirok etadi.

2. Membrana transport mexanizmlari:
- Passiv transport (konsentratsiya gradiyenti bo'yicha, energiya sarflanmaydi):
  * Oddiy diffuziya (gazlar: O2, CO2; kichik noqutbli molekulalar).
  * Osonlashtirilgan diffuziya (ion kanallari va tashuvchi oqsillar: masalan, GLUT glyukoza tashuvchisi).
  * Osmos (yarim o'tkazuvchan membrana orqali suv oqimi).
- Aktiv transport (gradiyentga qarshi, energiya sarflanadi):
  * Birlamchi aktiv transport (Na+/K+ nasosi, Ca2+-nasosi).
  * Ikkilamchi aktiv transport (simport va antiport, masalan, ichak epiteliysida Na+/glyukoza simporti).
  * Vezikulyar transport (endositoz va ekzositoz).`,
        diagramType: 'cell',
        realLifeExample: 'Dengiz suvi ichilganda inson nima sababdan suvsizlanadi? Chunki dengiz suvi qon plazmasiga nisbatan gipertonik bo\'lib, osmos qonuniga binoan suv hujayralardan tashqariga chiqadi va plazmoliz/kretsentratsiya yuz beradi.',
        uzbekistanContext: 'O\'zbekistonning Orolbo\'yi va Mirzacho\'l hududlaridagi sho\'rlangan tuproqlarda o\'suvchi galofit o\'simliklar (Haloxylon, Salsola, Suaeda) ildiz hujayralarida maxsus Na+/H+ antiport (SOS1) nasoslari faollashib, toksik natriy ionlarini vakuolaga haydaydi va hujayra ichki osmotik bosimini saqlaydi.',
        interactiveExercise: {
          question: 'O\'simlik hujayrasi toza distillangan suvga (gipotonik eritma) solinganda nima sodir bo\'ladi?',
          options: [
            'Hujayra yorilib ketadi (lizis)',
            'Suv hujayraga kirib, turgor bosimi hosil bo\'ladi, qattiq qobiq uni yorilishdan saqlaydi',
            'Suv hujayradan chiqib ketib plazmoliz ro\'y beradi',
            'Hech qanday o\'zgarish kuzatilmaydi'
          ],
          correctIndex: 1,
          explanation: 'O\'simlik hujayrasi sellulozali qattiq devorga ega bo\'lgani sababli, gipotonik eritmada suv vakuolaga kirib turgor bosimini oshiradi, biroq hujayra hayvon hujayrasidek yorilmaydi.'
        },
        quiz: [
          {
            id: 'q-cyto-1',
            question: 'Kaliy-natriy nasosi 1 molekula ATF sarflaganda ionlarni qaysi nisbatda ko\'chiradi?',
            type: 'single',
            options: ['3 ta Na+ tashqariga, 2 ta K+ ichkariga', '2 ta Na+ tashqariga, 3 ta K+ ichkariga', '3 ta K+ tashqariga, 2 ta Na+ ichkariga', '1 ta Na+ va 1 ta K+ qarama-qarshi'],
            correctAnswers: [0],
            explanation: 'Na+/K+-ATFaza 3 ta natriyni hujayradan chiqaradi va 2 ta kaliyni hujayraga kiritadi, bu membranada manfiy potensial yaratadi.',
            difficulty: 'medium'
          },
          {
            id: 'q-cyto-2',
            question: 'Quyidagi moddalardan qaysilari membrana orqali oson erkin diffuziya bilan o\'ta oladi?',
            type: 'multiple',
            options: ['Kislorod (O2)', 'Karbonat angidrid (CO2)', 'Katta zaryadlangan ionlar (Ca2+)', 'Oqsillar'],
            correctAnswers: [0, 1],
            explanation: 'O2 va CO2 kichik va qutbsiz gazlar bo\'lgani sababli lipid biqavatidan erkin o\'tadi. Ionlar va oqsillarga maxsus kanallar yoki endositoz kerak.',
            difficulty: 'easy'
          }
        ],
        independentWork: 'Eritrositlar turli konsentratsiyadagi (0.1%, 0.9%, 5% li NaCl) eritmalariga solingandagi turgor va osmotik gemoliz jarayonlari bo\'yicha diagramma tuzing.',
        references: ['Alberts B. et al. Molecular Biology of the Cell (6th ed.)', 'G\'ofurov A.T. Sitologiya asoslari (O\'zMU darsligi)']
      },
      {
        id: 'topic-cyto-2',
        subjectId: 'subj-cytology',
        title: 'Mitoz va meyoz: Hujayra sikli va genetik rekombinatsiya',
        objective: 'Eukariot hujayralar bo\'linishi mexanizmlari, interfaza davrlari va meyozdagi krossingover ahamiyatini o\'rganish.',
        expectedOutcomes: [
          'Hujayra siklining G1, S, G2 fazalari va tekshiruv nazorat nuqtalarini (checkpoints) tushuntirish',
          'Mitozning 4 bosqichi va xromatidalarning ajralish mexanizmini bayon qilish',
          'Meyoz I da gomologik xromosomalar kon\'yugatsiyasi va krossingover hodisasini tahlil qilish'
        ],
        keyTerms: [
          { term: 'Krossingover', definition: 'Meyoz I profazasining paxitena bosqichida gomologik xromosomalar o\'rtasida noqiz xromatidalar uchastkalarining o\'zaro almashinishi.' },
          { term: 'Kinetoxor', definition: 'Xromosoma sentromerasida joylashgan, bo\'linish duki mikronaychalarini biriktiruvchi murakkab oqsil majmuasi.' },
          { term: 'Interfaza', definition: 'Hujayra bo\'linishlari orasidagi davr bo\'lib, G1 (o\'sish), S (DNK replikatsiyasi) va G2 (bo\'linishga tayyorgarlik) fazalarini o\'z ichiga oladi.' }
        ],
        shortLecture: 'Mitoz tana (somatik) hujayralarining ko\'payishini ta\'minlab, genetik jihatdan ona hujayraga aynan o\'xshash diploid hujayralarni hosil qiladi. Meyoz esa jinsiy hujayralar (gametalar) shakllanishida xromosoma to\'plamini ikki barobar kamaytiradi (haploid) va genetik xilma-xillikni kafolatlaydi.',
        detailedContent: `Hujayra sikli va uning regulyatsiyasi:
- G1 fazasi: Hujayra o'sadi, oqsillar va organoidlar sintezlanadi.
- S fazasi: DNK replikatsiyasi (2n2c dan 2n4c ga o'tadi).
- G2 fazasi: Tubulin oqsili sintezi, ATF jamg'arilishi, sentrosomalar duplikatsiyasi.
- M fazasi (Mitoz):
  * Profaza: Xromatin spirallashadi, yadrocha yo'qoladi.
  * Metafaza: Xromosomalar ekvatorga tiziladi.
  * Anafaza: Qiz xromatidalar mustaqil xromosomaga aylanib qutblarga tortiladi.
  * Telofaza: Yadro qobig'i qayta tiklanadi va sitokinez ro'y beradi.`,
        diagramType: 'mitosis',
        realLifeExample: 'Kanserogenez (saraton) hujayra siklining G1/S yoki G2/M nazorat nuqtalari (masalan, p53 va retinoblastoma oqsillari) mutatsiyaga uchrashi oqibatida boshqaruvsiz mitoz boshlanishi natijasida kelib chiqadi.',
        uzbekistanContext: 'Toshkent Farmatsevtika instituti va O\'simlik moddalari kimyosi instituti olimlari kolxisin alkaloidi yordamida o\'simliklarda bo\'linish dukini to\'xtatib, serhosil poliploid bug\'doy va dorivor o\'simlik navlarini yaratishgan.',
        interactiveExercise: {
          question: 'Mitozning anafaza bosqichida har bir qutbga nechta xromatida tortiladi va hujayrada qanday xromosoma formulasi bo\'ladi?',
          options: [
            '2n2c',
            '4n4c (har bir qutbda 2n2c)',
            '1n1c',
            '2n4c'
          ],
          correctIndex: 1,
          explanation: 'Sentromeralar bo\'linishi hisobiga xromatidalar mustaqil xromosomalarga aylanadi va vaqtincha hujayrada 4n4c formula yuzaga keladi, so\'ng sitokinezda har bir qiz hujayra 2n2c oladi.'
        },
        quiz: [
          {
            id: 'q-cyto-3',
            question: 'DNK replikatsiyasi hujayra siklining qaysi davrida amalga oshadi?',
            type: 'single',
            options: ['G1 davrida', 'S (sintetik) davrida', 'Mitoz profazasida', 'G2 davrida'],
            correctAnswers: [1],
            explanation: 'DNK sintezi va replikatsiyasi interfaza sintetik (S) bosqichida to\'liq yakunlanadi.',
            difficulty: 'easy'
          }
        ],
        independentWork: 'Mitoz va meyoz jarayonlarini 5 ta mezon (bo\'linishlar soni, krossingover, qiz hujayralar soni, ploidlik, biologik rol) bo\'yicha qiyosiy jadvalini tuzing.',
        references: ['Karp G. Cell and Molecular Biology', 'O\'zbekiston Milliy Ensiklopediyasi: Sitogenetika']
      }
    ]
  },
  {
    id: 'subj-botany',
    slug: 'botanika',
    titleKey: 'Botanika va O\'simliklar Fiziologiyasi',
    descriptionKey: 'O\'simlik to\'qimalari, suv rejimi, fotosintez, transpiratsiya va floraning morfologik xususiyatlari.',
    iconName: 'Leaf',
    color: '#2D9B75',
    topicsCount: 2,
    category: 'fundamental',
    topics: [
      {
        id: 'topic-bot-1',
        subjectId: 'subj-botany',
        title: 'Fotosintez: Yorug\'lik va qorong\'ulik (Kalvin sikli) fazalari',
        objective: 'Fotonlar yutilishi, suv fotolizi, tilakoid membranadagi ATF sintezi va stomata orqali CO2 fiksatsiyasini o\'rganish.',
        expectedOutcomes: [
          'Fotosistema II va I ning pigment majmualari vazifalarini bayon qilish',
          'Suv fotolizi va kislorod hosil bo\'lish reaksiyasini yozish',
          'RuBisCO fermentining roli va C3, C4, CAM yo\'llarining farqlarini tahlil qilish'
        ],
        keyTerms: [
          { term: 'RuBisCO', definition: 'Ribulozo-1,5-bisfosfat karboksilaza/oksigenaza — biosferadagi eng ko\'p tarqalgan va fotosintezda CO2 ni biriktiruvchi asosiy ferment.' },
          { term: 'Suv fotolizi', definition: 'Yorug\'lik ta\'sirida Fotosistema II dagi marganes klasteri yordamida suv molekulasining protonlar, elektronlar va molekulyar O2 ga parchalanishi.' },
          { term: 'Tilakoid', definition: 'Xloroplast stromatici ichidagi membranali qopcha, uning yuzasida yorug\'likka bog\'liq reaksiyalar kechadi.' }
        ],
        shortLecture: 'Fotosintez quyosh nuri energiyasini kimyoviy organik birikmalar energiyasiga aylantiruvchi yagona global jarayondir. Reaksiya ikki bosqichdan iborat: tilakoidlarda yorug\'likka bog\'liq reaksiya va stromada qorong\'ulik reaksiyasi (Kalvin-Benson sikli).',
        detailedContent: `1. Yorug'lik reaksiyalari:
- Xlorofill fotonni yutib, elektronni qo'zg'atadi.
- FS II (P680) elektron beradi va suv fotolizi hisobiga tiklanadi:
  2H2O -> 4H+ + 4e- + O2.
- Elektronlar sitoxrom b6f majmuasi orqali FS I (P700) ga uzatiladi.
- Proton gradiyenti hisobiga ATF-sintaza fermenti ATF ishlab chiqaradi; NADF+ tiklanib NADFH ga aylanadi.

2. Qorong'ulik bosqichi (Kalvin sikli):
- Karboksillanish: CO2 + RuBP -> 2 ta 3-fosfoglitserat (3-PGA).
- Qaytarilish: 3-PGA ATF va NADFH sarflab triozofosfatlarga (G3P) aylanadi.
- Regeneratsiya: G3P ning bir qismi glyukozaga, qolgani RuBP ni qayta tiklashga sarflanadi.`,
        diagramType: 'photosynthesis',
        realLifeExample: 'Issiqxonalarda CO2 generatorlari o\'rnatilganda hosildorlik 20-30% ga ortadi, chunki atmosfera havosi (0.04% CO2) fotosintez uchun to\'yinish chegarasidan past hisoblanadi.',
        uzbekistanContext: 'O\'zbekiston paxtachiligida g\'o\'zaning (Gossypium hirsutum) barglarida fotosintez tezligini oshirish va suv sarfini optimallashtirish bo\'yicha tomchilatib sug\'orish tizimi joriy etilmoqda.',
        interactiveExercise: {
          question: 'Fotosintez jarayonida biosferaga ajralib chiqadigan kislorod (O2) qaysi birikmaning parchalanishidan hosil bo\'ladi?',
          options: ['Karbonat angidrid (CO2)', 'Suv (H2O)', 'Glyukoza (C6H12O6)', 'Ribulozo-1,5-bisfosfat'],
          correctIndex: 1,
          explanation: 'Ruben va Kamen tajribalari hamda izotop tahlili shuni ko\'rsatdiki, fotosintezda ajraladigan kislorod faqat suvning fotolizidan kelib chiqadi.'
        },
        quiz: [
          {
            id: 'q-bot-1',
            question: 'Kalvin siklida 1 molekula glyukoza sintezlanishi uchun necha molekula CO2 talab etiladi?',
            type: 'single',
            options: ['1 ta', '3 ta', '6 ta', '12 ta'],
            correctAnswers: [2],
            explanation: 'Glyukoza (C6H12O6) 6 ta uglerod atomiga ega bo\'lgani uchun Kalvin siklida 6 marta CO2 fiksatsiyasi aylanishi lozim.',
            difficulty: 'easy'
          }
        ],
        independentWork: 'C3, C4 (makkajo\'xori) va CAM (kaktuslar, yantoq) o\'simliklarining qurg\'oqchil sharoitda suv tejash mexanizmlari bo\'yicha referat tayyorlang.',
        references: ['Taiz L., Zeiger E. Plant Physiology and Development', 'Zakirov Q.Z. O\'zbekiston florasi va o\'simliklar fiziologiyasi']
      },
      {
        id: 'topic-bot-2',
        subjectId: 'subj-botany',
        title: 'O\'simlik to\'qimalari: Ksilema, floema va mexanik to\'qimalar',
        objective: 'O\'simliklarning o\'tkazuvchi to\'qimalari orqali suv, mineral moddalar va organik assimilyatlarning ko\'chishini tushunish.',
        expectedOutcomes: [
          'Ksilema (naylar va traxeidlar) tuzilishini tushuntirish',
          'Floema (elaksimon naylar va yo\'ldosh hujayralar) bo\'ylab mass-oqim mexanizmini tahlil qilish',
          'Kollenxima va sklerenximaning mexanik tayanch rolini o\'rganish'
        ],
        keyTerms: [
          { term: 'Ksilema', definition: 'Suv va unda erigan mineral tuzlarni ildizdan barglarga ko\'taruvchi o\'lik hujayrali o\'tkazuvchi to\'qima.' },
          { term: 'Floema', definition: 'Barglarda sintezlangan organik moddalarni (saxaroza) pastga va yuqoriga tashuvchi tirik hujayrali to\'qima.' },
          { term: 'Transpiratsiya', definition: 'O\'simlik barglari stomatalari orqali suvning bug\'lanishi bo\'lib, u ildiz bosimi bilan birga yuqori suv tortuvchi kuchni ta\'minlaydi.' }
        ],
        shortLecture: 'Yuksak o\'simliklar quruqlik muhitiga moslashish jarayonida maxsus o\'tkazuvchi tizimni rivojlantirgan. Ksilema orqali yuqoriga o\'rlaydigan suv oqimi (kogeziya-adgeziya kuchi hisobiga), floema orqali esa tushuvchi va ko\'tariluvchi organik oziq oqimi amalga oshadi.',
        detailedContent: `O'tkazuvchi to'qimalarning mikroskopik tuzilishi va farqlari...`,
        diagramType: 'plant',
        realLifeExample: 'Qayin va teraklarda erta bahorda po\'stloq ostidagi floema va ksilema orqali shira harakati boshlanishi (bahorgi shira harakati).',
        uzbekistanContext: 'O\'zbekiston cho\'llaridagi saksovul (Haloxylon) va yantoq (Alhagi) o\'simliklarining chuqur ildiz ksilemasi orqali 15-20 metr chuqurlikdagi grunt suvlarini so\'rib oladi.',
        interactiveExercise: {
          question: 'Quyidagilardan qaysi biri o\'simlik floemasining xarakterli belgisi hisoblanadi?',
          options: [
            'Hujayralari o\'lik va ligninlangan devorga ega',
            'Elaksimon naylar tirik, biroq yetuk holatda yadrosini yo\'qotgan bo\'lib, yo\'ldosh hujayra bilan bog\'langan',
            'Faqat suv va mineral tuzlarni tashiydi',
            'Hujayra ichki bo\'shlig\'i havoga to\'la'
          ],
          correctIndex: 1,
          explanation: 'Floemaning elaksimon naylari tirik protoplastga ega, lekin vakuola va yadrosi reduksiyalangan; ularning metabolik faoliyatini yadroviy yo\'ldosh hujayralar boshqaradi.'
        },
        quiz: [
          {
            id: 'q-bot-2',
            question: 'Suvning 100 metr balandlikdagi sekvoyalar uchigacha ko\'tarilishida qaysi fizik kuchlar hal qiluvchi rol o\'ynaydi?',
            type: 'single',
            options: ['Faqat ildiz bosimi', 'Kogeziya (suv molekulalari o\'zaro tortishuvi) va transpiratsion so\'rish', 'Faqat atmosfera bosimi', 'Mexanik shamol kuchi'],
            correctAnswers: [1],
            explanation: 'Dixon-Joli kogeziya-adgeziya-transpiratsiya nazariyasiga ko\'ra, barglardagi bug\'lanish yuqori tortish kuchini hosil qiladi, suv molekulalari esa vodorod bog\'lari orqali uzluksiz ustun hosil qiladi.',
            difficulty: 'medium'
          }
        ],
        independentWork: 'Barg kesmasi preparatining mikroskopik tuzilishi (kutikula, ustki epidermis, ustunsimon va g\'ovak parenxima, o\'tkazuvchi to\'p) sxemasini chizing.',
        references: ['Evert R.F. Esau\'s Plant Anatomy', 'Tojiyev S. Botanika kursi']
      }
    ]
  },
  {
    id: 'subj-genetics',
    slug: 'genetika',
    titleKey: 'Genetika va Seleksiya Asoslari',
    descriptionKey: 'Mendel qonuniyatlari, allellararo ta\'sir, xromosoma nazariyasi va genetik injiniring.',
    iconName: 'Dna',
    color: '#176B4D',
    topicsCount: 2,
    category: 'fundamental',
    topics: [
      {
        id: 'topic-gen-1',
        subjectId: 'subj-genetics',
        title: 'Mendel qonuniyatlari va Pennet katagi',
        objective: 'Monoduragay va diduragay chatishtirishda dominantlik, ajralish va mustaqil taqsimlanish qonunlarini o\'zlashtirish.',
        expectedOutcomes: [
          'G. Mendelning 1-, 2- va 3-qonunlarini tushuntirish',
          'Pennet katagi (Punnett square) yordamida genotiplar va fenotiplar nisbatini hisoblash',
          'Tahliliy chatishtirish (testcross) orqali noma\'lum genotipni aniqlash'
        ],
        keyTerms: [
          { term: 'Allel genlar', definition: 'Gomologik xromosomalarning bir xil lokuslarida joylashgan va bir muayyan belgining rivojlanishiga javob beruvchi genlar jufti.' },
          { term: 'Monoduragay chatishtirish', definition: 'Faqat bitta juft alternativ belgi (masalan, no\'xat rangi) bo\'yicha farq qiluvchi organizmlarni chatishtirish.' },
          { term: 'Pennet katagi', definition: 'Chatishtirishda ota-ona gametalarining barcha ehtimoliy qo\'shilish kombinatsiyalarini hisoblash uchun foydalaniladigan katakli jadval.' }
        ],
        shortLecture: 'Gregor Mendel 1865 yilda no\'xat o\'simligida o\'tkazgan tajribalari bilan zamonaviy genetika poydevorini qo\'ydi. U dominant va retsessiv belgilar, gametalar sofligi qoidasi va belgilarni erkin kombinatsiyalanishini isbotlab berdi.',
        detailedContent: `1. Mendelning 1-qonuni (Bir xillik qoidasi):
AA x aa -> barcha F1 duragaylari Aa (100% bir xil dominant fenotip).

2. Mendelning 2-qonuni (Belgilarning ajralishi):
F1 dagi duragaylar o'zaro chatishtirilganda (Aa x Aa):
- Genotip bo'yicha: 1 AA : 2 Aa : 1 aa (1:2:1).
- Fenotip bo'yicha: 3 dominant : 1 retsessiv (3:1).

3. Mendelning 3-qonuni (Mustaqil taqsimlanish):
Nogomologik xromosomalarda joylashgan genlar avlodlarga bir-biriga bog'liq bo'lmagan holda mustaqil taqsimlanadi. Diduragayda F2 fenotipik nisbati 9:3:3:1 bo'ladi.`,
        diagramType: 'dna',
        realLifeExample: 'Odamlarda ko\'z rangi (jigarrang ko\'z zangori ustidan dominant) va qon guruhlarining (AB0 tizimi) irsiylanishi to\'liq genetik qonuniyatlarga bo\'ysunadi.',
        uzbekistanContext: 'O\'zbekiston Fanlar Akademiyasi Genetika va o\'simliklar eksperimental biologiyasi instituti olimlari g\'o\'zaning tola sifati va vilt (fusarium) kasalligiga chidamlilik genlarini xaritalashgan.',
        interactiveExercise: {
          question: 'Ikkita geterozigota (Aa x Aa) chatishtirilganda, avlodda retsessiv fenotipli (aa) nasl chiqish ehtimoli necha foizni tashkil qiladi?',
          options: ['100%', '75%', '50%', '25%'],
          correctIndex: 3,
          explanation: 'Pennet katagi bo\'yicha kombinatsiyalar: AA, Aa, Aa, aa. Demak, 4 tadan 1 tasi (25%) retsessiv gomoziqota (aa) bo\'ladi.'
        },
        quiz: [
          {
            id: 'q-gen-1',
            question: 'Diduragay geterozigotalar (AaBb x AaBb) chatishtirilganda F2 da fenotip bo\'yicha qanday nisbat kutiladi?',
            type: 'single',
            options: ['3:1', '1:2:1', '9:3:3:1', '1:1:1:1'],
            correctAnswers: [2],
            explanation: 'Ikki juft mustaqil belgilar bo\'yicha geterozigotalar chatishtirilganda (3+1)x(3+1) = 9:3:3:1 fenotipik ajralish yuz beradi.',
            difficulty: 'easy'
          }
        ],
        independentWork: 'Inson qon guruhlarining irsiylanishi bo\'yicha (I^A, I^B kodominantlik va i^0 retsessivlik) 3 ta oilaviy genetik masalani yeching.',
        references: ['Griffiths A.J. Introduction to Genetic Analysis', 'Genetika va seleksiya asoslari (ToshDAU darsligi)']
      }
    ]
  },
  {
    id: 'subj-human-anatomy',
    slug: 'odam-anatomiyasi',
    titleKey: 'Odam Anatomiyasi va Fiziologiyasi',
    descriptionKey: 'Yurak-qon tomir, asab, nafas olish, endokrin va tayanch-harakat tizimlari fiziologiyasi.',
    iconName: 'Activity',
    color: '#176B4D',
    topicsCount: 2,
    category: 'fundamental',
    topics: [
      {
        id: 'topic-anat-1',
        subjectId: 'subj-human-anatomy',
        title: 'Yurak anatomiyasi va qon aylanish doiralari',
        objective: 'Inson yuragining 4 kamerali tuzilishi, klapanlar ishi va katta/kichik qon aylanish doiralaridagi gemodinamikani o\'rganish.',
        expectedOutcomes: [
          'O\'ng va chap bo\'lmachalar hamda qorinchalar vazifalarini ko\'rsatish',
          'Tavaqali (mitral, trikuspidal) va yarimoy klapanlarning ishlash mexanizmini tahlil qilish',
          'Katta qon aylanish doirasi va o\'pka (kichik) qon aylanish doirasi yo\'llarini ketma-ket bayon qilish'
        ],
        keyTerms: [
          { term: 'Miokard', definition: 'Yurak devorining qisqaruvchan qalin mushak qavati bo\'lib, o\'ziga xos avtomatizm va o\'tkazuvchi tizimga ega.' },
          { term: 'Katta qon aylanish doirasi', definition: 'Chap qorinchadan aortaga boshlanib, butun tana a\'zolariga kislorodli qon yetkazib, o\'ng bo\'lmachaga qaytuvchi qon yo\'li.' },
          { term: 'Kichik qon aylanish doirasi', definition: 'O\'ng qorinchadan o\'pka poyasi orqali boshlanib, o\'pkada gazlar almashinib, chap bo\'lmachaga to\'rtta o\'pka venasi orqali quyiluvchi yo\'l.' }
        ],
        shortLecture: 'Inson yuragi 4 kameradan iborat bo\'lib, chap va o\'ng tomonlari butunlay yaxlit to\'siq bilan ajratilgan. Bu arterial va venoz qonning aralashmasligini ta\'minlaydi va issiqqonlilikni kafolatlaydi.',
        detailedContent: `Yurak sikli: sistola va diastola bosqichlari, EKG tahlili va gemodinamika...`,
        diagramType: 'heart',
        realLifeExample: 'Sportchilarda chap qorincha miokardining gipertrofiyasi yuzaga kelib, bir qisqarishda chiqariladigan qon hajmi (zarb hajmi) tinch holatda 100-120 ml ga yetadi, tomir urishi esa 50 tagacha tushadi (fiziologik bradikardiya).',
        uzbekistanContext: 'Respublika ixtisoslashtirilgan Kardiologiya ilmiy-amaliy tibbiyot markazida yurak klapanlarini almashtirish va koronar qon tomirlarini stentlash bo\'yicha zamonaviy biotibbiy texnologiyalar qo\'llanilmoqda.',
        interactiveExercise: {
          question: 'O\'pka venalari orqali qanday qon oqadi va u yurakning qaysi kamerasiga quyiladi?',
          options: [
            'Venoz qon, o\'ng bo\'lmachaga',
            'Kislorodga boy arterial qon, chap bo\'lmachaga',
            'Venoz qon, o\'ng qorinchaga',
            'Arterial qon, chap qorinchaga'
          ],
          correctIndex: 1,
          explanation: 'Nomiga qaramasdan, o\'pka venalari o\'pkada kislorodga to\'yingan toza arterial qonni yurakning chap bo\'lmachasiga keltiradi.'
        },
        quiz: [
          {
            id: 'q-anat-1',
            question: 'Yurakning qaysi kamerasi devori eng qalin hisoblanadi va nega?',
            type: 'single',
            options: ['O\'ng bo\'lmacha', 'O\'ng qorincha', 'Chap qorincha', 'Chap bo\'lmacha'],
            correctAnswers: [2],
            explanation: 'Chap qorincha devori 10-15 mm qalinlikda bo\'lib, butun tana katta doirasiga (yuqori qarshilikka qarshi) qon haydash uchun eng kuchli miokardga ega.',
            difficulty: 'easy'
          }
        ],
        independentWork: 'Qonning katta va kichik aylanish doiralari bo\'yicha ketma-ket tomirlar sxemasini chizing (Aorta -> Arteriyalar -> Kapillyarlar -> Venalar -> Kovak venalar).',
        references: ['Guyton and Hall Textbook of Medical Physiology', 'Ahmedov N.K. Odam anatomiyasi']
      }
    ]
  },
  {
    id: 'subj-ecology',
    slug: 'ekologiya',
    titleKey: 'Ekologiya va Tabiatni Muhofaza Qilish',
    descriptionKey: 'Ekotizimlar dinamikasi, oziq zanjiri, Orol dengizi muammolari va biomonitoring.',
    iconName: 'Globe',
    color: '#2D9B75',
    topicsCount: 2,
    category: 'ecological',
    topics: [
      {
        id: 'topic-eco-1',
        subjectId: 'subj-ecology',
        title: 'Ekotizimlar tuzilishi: Trofik darajalar va energiya piramidasi',
        objective: 'Produtsentlar, konsumentlar va redutsentlarning o\'zaro bog\'liqligi hamda Lindeman 10% qoidasini o\'rganish.',
        expectedOutcomes: [
          'Oziq to\'ri va oziq zanjirini tuzish',
          'Lindemanning ekologik energiya piramidasi qoidasini hisoblash',
          'Biologik akkumulyatsiya (toksik moddalarning yuqori bo\'g\'inlarda to\'planishi) xavfini tahlil qilish'
        ],
        keyTerms: [
          { term: 'Produtsentlar', definition: 'Quyosh energiyasidan foydalanib noorganik moddalardan birlamchi organik modda hosil qiluvchi avtotrof organizmlar (yashil o\'simliklar).' },
          { term: 'Lindeman qoidasi (10% qoidasi)', definition: 'Bir trofik darajadan keyingi yuqori trofik darajaga energiyaning o\'rtacha faqat 10% qismi o\'tadi, qolgan 90% esa nafas olish va issiqlik sifatida yo\'qotiladi.' },
          { term: 'Redutsentlar', definition: 'O\'lik organik qoldiqlarni noorganik minerallargacha parchalovchi saprofit bakteriyalar va zamburug\'lar.' }
        ],
        shortLecture: 'Ekotizim tirik organizmlar jamoasi (biotsenoz) va ularning yashash muhiti (biotop)ning yagona moddalar aylanishi va energiya oqimi orqali bog\'langan funksional birligidir.',
        detailedContent: `Trofik darajalar, oziq zanjiri turlari (yaylov va detrit), Lotka-Volterra yirtqich-o'lja modeli...`,
        diagramType: 'cycle',
        realLifeExample: 'DDT yoki og\'ir metallar suv o\'simliklarida kam miqdorda bo\'lsa ham, oziq zanjirining eng yuqori bo\'g\'inida (baliqxo\'r qushlar va inson) minglab marta konsentratsiyalanadi.',
        uzbekistanContext: 'Orol dengizi qurishi natijasida 5.5 mln gektar maydonda vujudga kelgan Orolqum sahrosida fitomelioratsiya: qora saksovul, qandim va cherkess ekish orqali ekologik zanjirni tiklash ishlari olib borilmoqda.',
        interactiveExercise: {
          question: 'Agar o\'tlar (produtsentlar) 100 000 kJ energiya to\'plagan bo\'lsa, Lindeman qoidasiga ko\'ra 3-tartib konsumenti (burgut)ga necha kJ energiya yetib boradi?',
          options: ['10 000 kJ', '1 000 kJ', '100 kJ', '10 kJ'],
          correctIndex: 2,
          explanation: 'O\'tlar (100 000 kJ) -> Quyon 1-konsument (10 000 kJ) -> Tulki 2-konsument (1 000 kJ) -> Burgut 3-konsument (100 kJ).'
        },
        quiz: [
          {
            id: 'q-eco-1',
            question: 'Detrit oziq zanjirining boshlang\'ich bo\'g\'inini nima tashkil etadi?',
            type: 'single',
            options: ['Tirik yashil o\'simliklar', 'O\'lik organik qoldiqlar (chirindi)', 'Yirtqich hayvonlar', 'Quyosh nurlari'],
            correctAnswers: [1],
            explanation: 'Yaylov zanjiri tirik o\'simliklardan boshlansa, detrit zanjiri o\'lik organik chirindidan (detrit) boshlanadi.',
            difficulty: 'easy'
          }
        ],
        independentWork: 'O\'zbekistonning Zarafshon to\'qay ekotizimi uchun 4 bosqichli oziq zanjirini tuzing.',
        references: ['Begon M., Townsend C. Ecology: From Individuals to Ecosystems', 'Ergashev A. Umumiy ekologiya']
      }
    ]
  },
  {
    id: 'subj-biotech',
    slug: 'biotexnologiya',
    titleKey: 'Biotexnologiya va Bioinformatika',
    descriptionKey: 'Gen injiniringi, rekombinant DNK, fermentatsiya texnologiyalari va genomik tahlil.',
    iconName: 'Cpu',
    color: '#176B4D',
    topicsCount: 1,
    category: 'applied',
    topics: [
      {
        id: 'topic-bio-1',
        subjectId: 'subj-biotech',
        title: 'Genetik modifikatsiyalangan ekinlar va CRISPR-Cas9 texnologiyasi',
        objective: 'Rekombinant plazmidlar yordamida gen ko\'chirish, seleksiya va genom tahrirlash tamoyillarini o\'rganish.',
        expectedOutcomes: [
          'Restriktaza va ligaza fermentlari yordamida rekombinant DNK hosil qilish bosqichlarini tasvirlash',
          'Agrobacterium tumefaciens orqali o\'simliklarga gen kiritishni tushuntirish',
          'CRISPR-Cas9 tizimining molekulyar qaychi sifatida ishlash mexanizmini tahlil qilish'
        ],
        keyTerms: [
          { term: 'Restriktaza', definition: 'DNK molekulasidagi o\'ziga xos palindrom ketma-ketliklarni tanib, uni aniq joyidan kesuvchi ferment.' },
          { term: 'CRISPR-Cas9', definition: 'Yo\'naltiruvchi RNK (gRNA) yordamida genomning aniq lokusini topib, ikki zanjirli uzilish hosil qiluvchi va nuqtali tahrirlovchi vosita.' }
        ],
        shortLecture: 'Zamonaviy biotexnologiya an\'anaviy seleksiyani molekulyar darajaga ko\'tardi. Rekombinant texnologiyalar va CRISPR-Cas9 yordamida oziq-ovqat xavfsizligini ta\'minlash, qurg\'oqchilik va zararkunandalarga chidamli navlar yaratish mumkin.',
        detailedContent: `Biotexnologik jarayonlar va bioxavfsizlik mezonlari...`,
        diagramType: 'dna',
        realLifeExample: 'Inson insulin gormoni ilgari qoramol oshqozonosti bezidan olingan bo\'lsa, hozirda E. coli bakteriyalariga inson insulini geni kiritilib, bioreaktorlarda toza shaklda sintezlanadi.',
        uzbekistanContext: 'O\'zbekiston Fanlar akademiyasi Genomika va bioinformatika markazi tomonidan yaratilgan "Porloq" seriyasidagi transgen paxta navlari hosildorligi yuqori va tola sifati jahon standartlariga to\'liq javob beradi.',
        interactiveExercise: {
          question: 'CRISPR-Cas9 tizimida Cas9 oqsilining asosiy fermentativ vazifasi nimadan iborat?',
          options: [
            'DNK polimeraza kabi yangi zanjir sintezlash',
            'Endonukleoza kabi maqsadli DNK zanjirini kesish',
            'Ribosoma kabi oqsil translatsiyasini amalga oshirish',
            'Lipidlarni eritish'
          ],
          correctIndex: 1,
          explanation: 'Cas9 molekulyar qaychi (endonukleoza) bo\'lib, gRNA ko\'rsatgan aniq nuqtada DNK zanjirlarini kesadi.'
        },
        quiz: [
          {
            id: 'q-bio-1',
            question: 'DNK bo\'laklarini bir-biriga kovalent fosfodiefir bog\'i bilan ulovchi ferment qaysi?',
            type: 'single',
            options: ['DNK-ligaza', 'DNK-polimeraza', 'Helikaza', 'Topoizomeraza'],
            correctAnswers: [0],
            explanation: 'DNK-ligaza Okazaki bo\'laklarini yoki restriksiya natijasida hosil bo\'lgan yopishqoq/to\'mtoq uchlarni o\'zaro tikadi.',
            difficulty: 'easy'
          }
        ],
        independentWork: 'O\'zbekistonda yaratilgan "Porloq-1", "Porloq-2" paxta navlarining genetik xususiyatlari bo\'yicha ma\'lumot to\'plang.',
        references: ['Primrose S.B. Principles of Gene Manipulation and Genomics', 'Genomika va bioinformatika markazi hisobotlari']
      }
    ]
  }
];
