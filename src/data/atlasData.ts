import { AtlasModel } from '../types';

export const atlasModels: AtlasModel[] = [
  {
    id: 'model-cell',
    name: 'Eukariot Hujayra Ultra-tuzilishi',
    scientificName: 'Cellula eucaryotica',
    category: 'cellular',
    description: 'Hujayraning 3D hajmiy modeli: endomembrana tizimi, genetik apparat va quvvat stansiyalari interaktiv xaritasi.',
    parts: [
      { id: 'c-nuc', name: 'Yadro va Xromatin', latinName: 'Nucleus et chromatinum', functionDesc: 'DNK replikatsiyasi va genlar transkripsiyasi markazi.', color: '#8B5CF6', x: 50, y: 50, z: 0 },
      { id: 'c-mito', name: 'Mitoxondriya', latinName: 'Mitochondrion', functionDesc: 'Oksidlovchi fosforillanish orqali ATF ishlab chiqarish.', color: '#EF4444', x: 26, y: 68, z: 20 },
      { id: 'c-er', name: 'Donador Endoplazmatik To\'r', latinName: 'Reticulum endoplasmicum granulosum', functionDesc: 'Membrana va sekretor oqsillarni sintezlash va modifikatsiyalash.', color: '#3B82F6', x: 68, y: 38, z: -15 },
      { id: 'c-golgi', name: 'Golji Kompleksi', latinName: 'Apparatus golgiensis', functionDesc: 'Oqsillarni glikozillash, saralash va lizosomalarga yo\'naltirish.', color: '#10B981', x: 74, y: 65, z: 10 },
      { id: 'c-lyso', name: 'Lizosoma', latinName: 'Lysosoma', functionDesc: 'Kislotali gidrolazalar bilan hujayra ichki hazmini amalga oshirish.', color: '#F59E0B', x: 30, y: 32, z: -25 },
      { id: 'c-cyto', name: 'Mikronaychalar va Sitoskelet', latinName: 'Cytoskeleton', functionDesc: 'Hujayra shaklini tutib turish va ichki motor transporti (kinezin, dinein).', color: '#06B6D4', x: 45, y: 80, z: 5 }
    ]
  },
  {
    id: 'model-dna',
    name: 'DNK Qo\'sh Spirali (B-shakl)',
    scientificName: 'Acidum desoxyribonucleinicum',
    category: 'molecular',
    description: 'Uotson-Krik modeli: o\'ngga burilgan qo\'sh spiral, antiparallel zanjirlar va vodorod bog\'lari.',
    parts: [
      { id: 'd-bb', name: 'Fosfat-dezoksiriboza skeleti', latinName: 'Sceletum saccharo-phosphaticum', functionDesc: 'Fosfodiefir bog\'lari orqali kovalent bog\'langan tashqi mustahkam ustun.', color: '#10B981', x: 35, y: 30, z: 0 },
      { id: 'd-at', name: 'Adenin — Timin juftligi (A=T)', latinName: 'Par Adeninum-Thyminum', functionDesc: '2 ta vodorod bog\'i orqali o\'zaro bog\'langan komplementar asoslar.', color: '#F59E0B', x: 50, y: 45, z: 15 },
      { id: 'd-gc', name: 'Guanin — Sitozin juftligi (G≡C)', latinName: 'Par Guaninum-Cytosinum', functionDesc: '3 ta mustahkam vodorod bog\'i bilan bog\'langan asoslar (erish harorati yuqori).', color: '#EF4444', x: 50, y: 65, z: -15 },
      { id: 'd-mg', name: 'Katta egatcha (Major groove)', latinName: 'Sulcus major', functionDesc: 'Transkripsiya omillari va restriktazalar spetsifik DNK ketma-ketligini taniydigan qism.', color: '#3B82F6', x: 65, y: 35, z: 25 },
      { id: 'd-mn', name: 'Kichik egatcha (Minor groove)', latinName: 'Sulcus minor', functionDesc: 'Giston oqsillari nukleosomani o\'rashda o\'zaro ta\'sirlashuvchi tor spiral oraliq.', color: '#8B5CF6', x: 38, y: 78, z: -20 }
    ]
  },
  {
    id: 'model-heart',
    name: 'Inson Yuragi: Morfologiya va Gemodinamika',
    scientificName: 'Cor humanum',
    category: 'organ',
    description: 'Yurakning 4 kamerasi, yirik magistral tomirlar (aorta, o\'pka poyasi) va klapan apparati.',
    parts: [
      { id: 'h-lv', name: 'Chap qorincha', latinName: 'Ventriculus sinister', functionDesc: 'Eng qalin miokard devoriga ega bo\'lib, qonni 120 mm sim.ust. bosim bilan aortaga haydaydi.', color: '#DC2626', x: 62, y: 65, z: 10 },
      { id: 'h-rv', name: 'O\'ng qorincha', latinName: 'Ventriculus dexter', functionDesc: 'Venoz qonni o\'pka poyasiga haydab, o\'pka doirasiga yo\'naltiradi.', color: '#2563EB', x: 38, y: 65, z: 15 },
      { id: 'h-la', name: 'Chap bo\'lmacha', latinName: 'Atrium sinistrum', functionDesc: 'O\'pka venalaridan kislorodga to\'yingan arterial qonni qabul qiladi.', color: '#EF4444', x: 60, y: 35, z: -10 },
      { id: 'h-ra', name: 'O\'ng bo\'lmacha', latinName: 'Atrium dextrum', functionDesc: 'Yuqori va pastki kovak venalardan butun tananing venoz qonini to\'playdi.', color: '#3B82F6', x: 35, y: 35, z: -5 },
      { id: 'h-ao', name: 'Aorta ravog\'i', latinName: 'Arcus aortae', functionDesc: 'Organizmning eng yirik elastik arteriyasi, bosh va tana a\'zolariga tarmoqlanadi.', color: '#B91C1C', x: 50, y: 18, z: 0 },
      { id: 'h-mv', name: 'Bikuspidal (Mitral) klapan', latinName: 'Valva mitralis', functionDesc: 'Chap bo\'lmachadan chap qorinchaga qon o\'tkazadi va sistolada teskari oqishni to\'sadi.', color: '#F59E0B', x: 55, y: 50, z: 5 }
    ]
  },
  {
    id: 'model-brain',
    name: 'Bosh Miya: Anatomik Bo\'laklar',
    scientificName: 'Encephalon',
    category: 'organ',
    description: 'Katta yarimsharlar po\'stlog\'i, miyacha, gipotalamus va miya ustuni integrativ markazi.',
    parts: [
      { id: 'b-front', name: 'Peshona bo\'lagi (Lobus frontalis)', latinName: 'Lobus frontalis', functionDesc: 'Ixtiyoriy harakatlar (motorika), rejalashtirish, xatti-harakat va nutqning Broka markazi.', color: '#3B82F6', x: 30, y: 40, z: 15 },
      { id: 'b-pariet', name: 'Tepa bo\'lagi (Lobus parietalis)', latinName: 'Lobus parietalis', functionDesc: 'Teri sezgisi, propriosepsiya va fazoviy orientatsiya markazlari.', color: '#10B981', x: 55, y: 30, z: 20 },
      { id: 'b-occip', name: 'Ensa bo\'lagi (Lobus occipitalis)', latinName: 'Lobus occipitalis', functionDesc: 'Birlamchi va ikkilamchi ko\'rish po\'stloq markazi.', color: '#8B5CF6', x: 75, y: 45, z: 0 },
      { id: 'b-temp', name: 'Chakka bo\'lagi (Lobus temporalis)', latinName: 'Lobus temporalis', functionDesc: 'Eshitish, xotira konsolidatsiyasi (gipokamp) va nutqni tushunish (Vernike markazi).', color: '#F59E0B', x: 45, y: 58, z: -15 },
      { id: 'b-cereb', name: 'Miyacha (Cerebellum)', latinName: 'Cerebellum', functionDesc: 'Muvozanat, harakatlar koordinatsiyasi va mushak tonusini boshqarish.', color: '#EC4899', x: 68, y: 72, z: -20 },
      { id: 'b-stem', name: 'Miya ustuni (Uzunchoq miya va ko\'prik)', latinName: 'Truncus encephali', functionDesc: 'Nafas olish, yurak urishi, yutish va qon bosimi kabi hayotiy vegetativ reflekslar markazi.', color: '#6B7280', x: 52, y: 82, z: -10 }
    ]
  },
  {
    id: 'model-plant-leaf',
    name: 'O\'simlik Bargining Ichki Anatomiyasi',
    scientificName: 'Anatomia folii',
    category: 'botanical',
    description: 'Mezofill to\'qimasi, ustki va ostki epidermis, stomatalar hamda o\'tkazuvchi to\'plam (tomir).',
    parts: [
      { id: 'l-cut', name: 'Kutikula va Ustki Epidermis', latinName: 'Epidermis superior cum cuticula', functionDesc: 'Suvning noo\'rin bug\'lanishidan saqlovchi mumli himoya qatlami.', color: '#059669', x: 50, y: 18, z: 0 },
      { id: 'l-pal', name: 'Ustunsimon parenxima (Xlorenxima)', latinName: 'Parenchyma palisadicum', functionDesc: 'Xloroplastlarga juda boy qavat, asosiy fotosintez shu yerda kechadi.', color: '#10B981', x: 50, y: 36, z: 5 },
      { id: 'l-spong', name: 'G\'ovak parenxima', latinName: 'Parenchyma spongiosum', functionDesc: 'Keng hujayralararo bo\'shliqlarga ega bo\'lib, gaz almashinuvini ta\'minlaydi.', color: '#34D399', x: 50, y: 58, z: -5 },
      { id: 'l-vein', name: 'O\'tkazuvchi to\'p (Tomir — Ksilema va Floema)', latinName: 'Fasciculus vascularis', functionDesc: 'Ksilema suv keltiradi, floema fotosintez mahsulotlarini o\'simlikka tarqatadi.', color: '#F59E0B', x: 50, y: 50, z: 15 },
      { id: 'l-stoma', name: 'Stomata (Og\'izcha apparati)', latinName: 'Apparatus stomatalis', functionDesc: 'Ikkita qoplag\'ich hujayra orqali CO2 kirishi va transpiratsiyani boshqarish.', color: '#06B6D4', x: 50, y: 82, z: 0 }
    ]
  }
];
