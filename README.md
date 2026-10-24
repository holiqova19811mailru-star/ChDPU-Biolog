# BioLab — Interactive Biology Learning Platform
> **“Biologiyani ko'rib, sinab, o'rganing!”** / *“Explore. Experiment. Understand.”*

BioLab — universitet talabalari, magistrantlar, biologiya o'qituvchilari va mustaqil tadqiqotchilar uchun mo'ljallangan zamonaviy, to'liq funksional, interaktiv biologiya ta'lim platformasi.

---

## 🔬 Loyiha Xususiyatlari

1. **4 Tilli To'liq Mahalliylashtirilgan Interfeys**:
   - 🇺🇿 O'zbekcha (Lotin) — `uz-Latn`
   - 🇺🇿 Ўзбекча (Кирилл) — `uz-Cyrl`
   - 🇷🇺 Русский язык — `ru`
   - 🇬🇧 English — `en`

2. **8 Ta To'liq Funksional Virtual Laboratoriya**:
   - **Hujayra laboratoriyasi**: O'simlik va hayvon hujayralari organoidlarini o'rganish, solishtirish va vazifalarni moslashtirish.
   - **Mitoz laboratoriyasi**: Profaza, Metafaza, Anafaza, Telofaza bosqichlarini tartiblash, xromosoma formulalarini tekshirish.
   - **Mikroskop simulyatori**: 40x, 100x, 400x, 1000x (moyli immersion) obyektivlar, makro/mikrovint fokuslash, piyoz po'sti, inson qon surtmasi, elodeya va ildiz uchi preparatlari.
   - **Fotosintez tajribasi**: Yorug'lik (Lux), CO2 va harorat slayderlari orqali real vaqtda kislorod pufakchalari va glyukoza sintezini hisoblash; termik denaturatsiya ogohlantirishi.
   - **Genetika laboratoriyasi**: Pennet katagi (2x2 va 4x4 diduragay), genotipik va fenotipik ehtimolliklarni avtomatik hisoblash.
   - **Ekotizim simulyatsiyasi**: Produtsentlar, o'txo'rlar, yirtqichlar va redutsentlar o'rtasidagi Lotka-Volterra populyatsiyalar dinamikasi, qurg'oqchilik va qo'riqxona rejimi ssenariylari.
   - **Yurak va qon aylanishi**: 4 ta kamera (LV, RV, LA, RA), qon bosimi, katta va kichik qon aylanish doiralari oqimi, yurak urishi (BPM) sozlagichi.
   - **O'simlik anatomiyasi**: Ildiz, poya, barg qirqimlari, ksilema va floema to'plamlari, stomata ochilishi va transpiratsiya so'rish kuchi.

3. **6 Ta Interaktiv Biologik O'yin**:
   - **Organoidni top**: Maslahatlar va belgilar asosida organoidni aniqlash.
   - **Biologik domino**: Atamalar va biokimyoviy jarayonlarni zanjirdek ulash.
   - **Tezkor 60 soniya**: 60 soniya ichida chaqqon biologik blits-savollarga javob berish.
   - **Jarayonni tartibla**: Oqsil biosintezi, mitoz va qon aylanish bosqichlarini xatosiz tartiblash.
   - **Kimman? (Biologik topishmoq)**: Maslahatlar soni bo'yicha ball yig'ish.
   - **Ekologik detektiv**: Orolbo'yi va suv evtrofikatsiyasi falokatlari sabablarini ilmiy tahlil qilish.

4. **3D Biologik Atlas**:
   - Eukariot hujayra, DNK qo'sh spirali, inson yuragi, bosh miya va o'simlik barg anatomiyasi.
   - Aylantirish (360°), yaqinlashtirish/uzoqlashtirish, qismlar ustiga bosib lotincha nomlari va ilmiy vazifalarini ko'rish.

5. **AI Ustoz (Biologiya Maslahatchisi)**:
   - Server-side Gemini API integratsiyasi (`/api/ai/ask`).
   - Boy ilmiy bilimlar bazasi va O'zbekiston sharoitiga mos tushuntirishlar.
   - Xavfsizlik: Tibbiy retsept bermaydi, xavfli patogenlar bo'yicha yo'riqnoma taqiqlangan.

6. **O'zbekiston Biologik Xilma-xilligi & Tabiat Tadqiqotchisi**:
   - Qizil kitob turlari (Ilvirs, Buxoro bug'usi, Severtsov qo'yi, Lola greyg, Qora saksovul).
   - Chotqol, Qizilqum, Orolqum va To'qay ekotizimlari.
   - Citizen science (kuzatuv qo'shish va jamoaviy tahlil).

7. **3 Ta Rolga Ega Shaxsiy Kabinetlar**:
   - **Talaba**: 7 kunlik uzluksiz marafon, o'quv natijalari, yutuq nishonlari, xatolar tahlili.
   - **O'qituvchi**: Guruhlar monitoringi, topshiriq belgilash, hisobotlarni tekshirish.
   - **Administrator**: Tizim auditi, xavfsizlik jurnallari, ilmiy manbalar siyosati.

---

## 🛠️ Texnologik Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express, tsx.
- **AI Integratsiya**: Google GenAI SDK (`@google/genai`) Gemini 3.8 Flash.
- **Dizayn**: Minimalistik ilmiy ranglar palitrasi (Primary `#176B4D`, Secondary `#2D9B75`, Accent `#62C9A5`, Dark `#101916`).

---

## 🚀 Ishga Tushirish

```bash
# Kutubxonalarni o'rnatish
npm install

# Dasturni ishlab chiqish rejimida ishga tushirish (Port 3000)
npm run dev

# TypeScript tekshiruvi (lint)
npm run lint

# Production build tayyorlash
npm run build

# Production serverni ishga tushirish
npm run start
```
