import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Camera, Plus, MapPin, Calendar, User, Tag, CheckCircle2, Shield, AlertCircle } from 'lucide-react';

export const NatureObserver: React.FC = () => {
  const { t } = useTranslation();
  const { observations, addObservation, currentUser } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [speciesName, setSpeciesName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [category, setCategory] = useState<'flora' | 'fauna' | 'fungi' | 'microorganism'>('flora');
  const [region, setRegion] = useState('Toshkent viloyati (Chotqol tizmasi)');
  const [habitat, setHabitat] = useState('Tog\' yonbag\'ri, archazor');
  const [locationDetails, setLocationDetails] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!speciesName || !description) return;

    setSubmitting(true);
    await addObservation({
      speciesName,
      scientificName: scientificName || 'Aniqlanmagan tur (Incertae sedis)',
      category,
      region,
      locationDetails: locationDetails || 'Umumiy hudud',
      observerName: currentUser.name,
      description,
      habitat,
      tags: [category, region.split(' ')[0]]
    });

    setSubmitting(false);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setModalOpen(false);
      setSpeciesName('');
      setScientificName('');
      setDescription('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Citizen Science (Jamoaviy Ilm-fan)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t('observerTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-3xl leading-relaxed">
            {t('observerDesc')}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold text-xs flex items-center space-x-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addObservation')}</span>
        </button>
      </div>

      {/* Safety notice for endangered wildlife */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-center space-x-2.5">
        <Shield className="w-4 h-4 text-amber-600 shrink-0" />
        <p>
          <strong>Xavfsizlik eslatmasi:</strong> Qizil kitobga kiritilgan kamyob turlarning aniq GPS koordinatalari brakonyerlikdan himoya qilish maqsadida umumlashtirilib (viloyat/tizma darajasida) ko'rsatiladi.
        </p>
      </div>

      {/* Observations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {observations.map((obs) => (
          <div
            key={obs.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {obs.category}
                </span>
                <span className="text-[11px] text-stone-500 font-mono flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {obs.date}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-stone-900 dark:text-white">
                {obs.speciesName}
              </h3>
              <p className="text-xs italic text-stone-500 font-mono mb-2">
                {obs.scientificName}
              </p>

              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                {obs.description}
              </p>

              <div className="space-y-1 text-xs text-stone-500">
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                  <span>{obs.region} ({obs.habitat})</span>
                </div>
                <div className="flex items-center">
                  <User className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                  <span>Kuzatuvchi: {obs.observerName}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-xs">
              <span className="flex items-center font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Ilmiy tasdiqlangan
              </span>
              <div className="flex gap-1">
                {obs.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Observation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/20 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">
              Yangi Biologik Kuzatuv Qo'shish
            </h3>

            {successMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs text-center font-bold">
                Kuzatuv qabul qilindi va ilmiy ma'lumotlar bazasiga qo'shildi!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Tur nomi (O'zbekcha):</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Lola greyg, Zarafshon qirg'ovuli..."
                    value={speciesName}
                    onChange={(e) => setSpeciesName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Ilmiy nomi (Lotincha):</label>
                    <input
                      type="text"
                      placeholder="Masalan: Tulipa greigii..."
                      value={scientificName}
                      onChange={(e) => setScientificName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Kategoriya:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                    >
                      <option value="flora">Flora (O'simliklar)</option>
                      <option value="fauna">Fauna (Hayvonlar)</option>
                      <option value="fungi">Zamburug'lar</option>
                      <option value="microorganism">Mikroorganizmlar</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Viloyat / Hudud:</label>
                    <input
                      type="text"
                      required
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Yashash biotopi:</label>
                    <input
                      type="text"
                      value={habitat}
                      onChange={(e) => setHabitat(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Kuzatuv tavsifi va belgilari:</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Turni qayerda ko'rdingiz, qanday holatda edi (gullash, oziqlanish, bolalash)..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-stone-600 dark:text-stone-300 font-semibold hover:bg-stone-100"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-[#176B4D] hover:bg-[#104C36] text-white font-bold"
                  >
                    {submitting ? 'Saqlanmoqda...' : 'Yuborish'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
