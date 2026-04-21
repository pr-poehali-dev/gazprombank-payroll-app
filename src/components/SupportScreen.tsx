import { useState } from 'react';
import Icon from '@/components/ui/icon';

const faqItems = [
  {
    q: 'Когда придёт зарплата?',
    a: 'Зарплата начисляется 15-го числа каждого месяца, аванс — 1-го числа. Точные даты зависят от вашего работодателя.',
  },
  {
    q: 'Как изменить реквизиты для перечисления?',
    a: 'Для смены реквизитов обратитесь в HR-отдел вашей компании с письменным заявлением.',
  },
  {
    q: 'Что такое вычет на детей?',
    a: 'Стандартный налоговый вычет 1 400 ₽ на каждого ребёнка до 18 лет снижает налогооблагаемую базу по НДФЛ.',
  },
  {
    q: 'Как получить справку 2-НДФЛ?',
    a: 'Справка формируется автоматически в разделе «Документы». Также вы можете запросить её у бухгалтера компании.',
  },
  {
    q: 'Что делать при утере карты?',
    a: 'Немедленно заблокируйте карту через раздел «Управление картой» или позвоните на горячую линию.',
  },
];

const contacts = [
  { icon: 'Phone', label: 'Горячая линия', value: '8 800 100-07-01', sub: 'Бесплатно по России', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' },
  { icon: 'MessageCircle', label: 'Онлайн-чат', value: 'Начать чат', sub: 'Ответ за 2 минуты', color: 'bg-blue-50 dark:bg-blue-900/20 text-gpb-blue' },
  { icon: 'Mail', label: 'Электронная почта', value: 'support@gazprombank.ru', sub: 'Ответ до 24 часов', color: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600' },
];

export default function SupportScreen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-4 pt-14 pb-10">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Помощь</p>
        <h1 className="text-white text-2xl font-bold tracking-tight mb-0.5">Поддержка</h1>
        <p className="text-white/60 text-sm">Ответим на любой вопрос</p>
      </div>

      {/* Contacts */}
      <div className="px-4 -mt-5 mb-3">
        <div className="bg-card rounded-3xl gpb-card-shadow-md overflow-hidden">
          {contacts.map((c, idx) => (
            <button
              key={c.label}
              className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-gpb-surface transition-colors ${idx < contacts.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${c.color}`}>
                <Icon name={c.icon} size={18} fallback="Phone" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[11px] text-muted-foreground">{c.label}</p>
                <p className="text-sm font-bold text-foreground">{c.value}</p>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">{c.sub}</p>
              </div>
              <Icon name="ChevronRight" size={15} className="text-muted-foreground/50" />
            </button>
          ))}
        </div>
      </div>

      {/* Write message */}
      <div className="px-4 mb-3">
        <div className="bg-card rounded-3xl gpb-card-shadow p-5">
          <p className="text-sm font-bold text-foreground mb-3">Написать обращение</p>
          {sent ? (
            <div className="py-6 text-center animate-scale-in">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Icon name="CheckCircle2" size={28} className="text-emerald-600" fallback="Check" />
              </div>
              <p className="text-sm font-bold text-foreground">Обращение отправлено</p>
              <p className="text-xs text-muted-foreground mt-1">Мы ответим в течение 24 часов</p>
              <button onClick={() => setSent(false)} className="mt-4 bg-gpb-surface text-gpb-blue text-sm font-semibold px-4 py-2 rounded-2xl">Новое обращение</button>
            </div>
          ) : (
            <>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Опишите ваш вопрос или проблему..."
                rows={4}
                className="w-full bg-gpb-surface rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gpb-blue/40 resize-none"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-full mt-3 bg-gpb-blue text-white rounded-2xl py-3.5 text-sm font-bold disabled:opacity-40 transition-opacity flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={15} className="text-white" />
                Отправить обращение
              </button>
            </>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-4 mb-6">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Частые вопросы</p>
        <div className="bg-card rounded-3xl gpb-card-shadow overflow-hidden">
          {faqItems.map((item, idx) => (
            <div key={idx} className={idx < faqItems.length - 1 ? 'border-b border-border' : ''}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gpb-surface transition-colors"
              >
                <span className="text-sm font-semibold text-foreground pr-3">{item.q}</span>
                <div className={`w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === idx ? 'bg-gpb-blue' : 'bg-gpb-surface'}`}>
                  <Icon name={openFaq === idx ? 'ChevronUp' : 'ChevronDown'} size={14} className={openFaq === idx ? 'text-white' : 'text-muted-foreground'} />
                </div>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 animate-fade-in">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
