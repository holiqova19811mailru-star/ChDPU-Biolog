import React, { useState } from 'react';
import { useTranslation } from '../../locales';
import { useAuth } from '../../context/AuthContext';
import { Brain, Send, Sparkles, AlertCircle, Copy, Check, RotateCcw, Bot, User, BookOpen } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  source?: string;
  timestamp: string;
}

export const AITutor: React.FC = () => {
  const { t, language } = useTranslation();
  const { currentUser } = useAuth();

  const [inputQuestion, setInputQuestion] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Sitologiya va Biokimyo');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Salom, **${currentUser.name}**! Men BioLab universitet platformasining **AI Ustoz** maslahatchisiman.

Sizga biologiyaning molekulyar, hujayraviy, genetik yoki ekologik jarayonlarini ilmiy asosda tushuntirib berishim mumkin. 
*Quyidagi tezkor savollardan birini tanlashingiz yoki o'zingizni qiziqtirgan savolni yozishingiz mumkin:*`,
      source: 'BioLab Expert Engine',
      timestamp: 'Hozir'
    }
  ]);

  const quickPrompts = [
    'Fotosintezning Kalvin siklida RuBisCO fermenti vazifasi nimadan iborat?',
    'Meyoz I profazasidagi krossingover qanday biologik ahamiyatga ega?',
    'Orolqum cho\'lida qora saksovul qurg\'oqchilik va sho\'rlanishga qanday moslashgan?',
    'CRISPR-Cas9 tizimi yordamida o\'simliklarda qanday gen tahrirlanadi?'
  ];

  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          language,
          topic: selectedTopic,
          context: `Foydalanuvchi: ${currentUser.name}, ${currentUser.specialty}`
        })
      });

      const data = await res.json();
      if (data && data.answer) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.answer,
          source: data.source === 'gemini-ai' ? `Gemini 3.8 Flash (${data.model})` : 'BioLab Ilmiy Bilimlar Bazasi',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || 'Javob olib bo\'lmadi');
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Kechirasiz, tarmoq ulanishida vaqtinchalik xatolik yuz berdi. Iltimos, qaytadan savol bering.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Brain className="w-3.5 h-3.5" />
          <span>Universitet Ilmiy Maslahatchisi</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t('aiTutorTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-3xl leading-relaxed">
          {t('aiTutorDesc')}
        </p>
      </div>

      {/* Safety & Medical Disclaimer as required */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-stone-700 dark:text-stone-300 flex items-center space-x-2.5">
        <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <p>{t('aiDisclaimer')}</p>
      </div>

      {/* Main Chat Interface */}
      <div className="rounded-3xl bg-white dark:bg-[#162420] border border-emerald-900/10 dark:border-emerald-800/60 shadow-xl overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#176B4D] to-[#2D9B75] flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-900 dark:text-white">AI Ustoz</span>
              <span className="text-[10px] text-stone-500 block">Biologiya ilmiy yo\'nalishi</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-stone-500">Mavzu:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="p-1.5 rounded-lg text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200"
            >
              <option value="Sitologiya va Biokimyo">Sitologiya va Biokimyo</option>
              <option value="Botanika va Fotosintez">Botanika va Fotosintez</option>
              <option value="Genetika va Biotexnologiya">Genetika va Biotexnologiya</option>
              <option value="Ekologiya va O'zbekiston tabiati">Ekologiya va O'zbekiston tabiati</option>
            </select>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[520px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#176B4D] text-white rounded-br-xs'
                    : 'bg-stone-50 dark:bg-stone-900/60 border border-stone-200/70 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line space-y-2">{msg.text}</div>

                <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] opacity-70">
                  <span>{msg.source || msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:opacity-100 flex items-center space-x-1"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Nusxalandi' : 'Nusxa olish'}</span>
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/70 dark:border-stone-800 text-xs text-stone-500 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>{t('aiTutorThinking')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts Chips */}
        <div className="px-4 py-2 bg-stone-50/50 dark:bg-stone-900/30 border-t border-stone-100 dark:border-stone-800/60 overflow-x-auto flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-stone-400 shrink-0">Namuna:</span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              disabled={loading}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-[#162420] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-500 shrink-0 transition-colors"
            >
              {p.slice(0, 45)}...
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-[#162420]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder={t('aiTutorInputPlaceholder')}
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              disabled={loading}
              className="flex-1 p-3 rounded-2xl text-xs bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={loading || !inputQuestion.trim()}
              className="px-5 py-3 rounded-2xl bg-[#176B4D] hover:bg-[#104C36] disabled:opacity-40 text-white font-bold text-xs flex items-center space-x-2 shadow-xs transition-colors"
            >
              <span>{t('aiTutorAskBtn')}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
