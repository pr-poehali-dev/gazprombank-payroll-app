import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  'Когда придёт зарплата?',
  'Как рассчитать НДФЛ?',
  'Что такое аванс?',
  'Как оформить вычет?',
];

const BOT_ANSWERS: Record<string, string> = {
  'Когда придёт зарплата?': 'Ваша следующая выплата — **1 апреля 2026** (аванс, 32 000 ₽). Основная зарплата поступит **15 апреля**. Деньги зачисляются до 09:30 по московскому времени.',
  'Как рассчитать НДФЛ?': 'НДФЛ = 13% от налогооблагаемого дохода. При вашем окладе 85 400 ₽ — это **13 100 ₽** ежемесячно. Если у вас есть дети или медицинские расходы — налоговая база уменьшается. Используйте раздел «Калькулятор» для точного расчёта.',
  'Что такое аванс?': 'Аванс — это первая часть зарплаты, которую выплачивают в начале месяца (обычно 1–5 числа). Составляет около 40% от оклада. Остаток — основная зарплата — приходит 15–20 числа.',
  'Как оформить вычет?': 'Для оформления налогового вычета вам понадобится:\n1. Справка 2-НДФЛ (раздел «Профиль → Документы»)\n2. Декларация 3-НДФЛ (через сайт nalog.ru)\n3. Подтверждающие документы (чеки, договоры)\n\nВычет на детей оформляется через HR-отдел вашей компании.',
};

function getAnswer(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('зарплат') || lower.includes('выплат') || lower.includes('аванс') && lower.includes('когда')) {
    return BOT_ANSWERS['Когда придёт зарплата?'];
  }
  if (lower.includes('ндфл') || lower.includes('налог') || lower.includes('рассчита')) {
    return BOT_ANSWERS['Как рассчитать НДФЛ?'];
  }
  if (lower.includes('аванс')) {
    return BOT_ANSWERS['Что такое аванс?'];
  }
  if (lower.includes('вычет') || lower.includes('возврат')) {
    return BOT_ANSWERS['Как оформить вычет?'];
  }
  if (lower.includes('кэшбэк') || lower.includes('cashback')) {
    return 'Кэшбэк начисляется ежемесячно 1-го числа. Вы выбрали 3 бесплатные категории. Накоплено за апрель: **342 ₽**. Для увеличения кэшбэка подключите одну из подписок в разделе «Кэшбэк».';
  }
  if (lower.includes('карт') || lower.includes('блокир')) {
    return 'Для блокировки карты перейдите в раздел «Карта» → «Блокировка», или позвоните на горячую линию **8 800 100-07-01** (бесплатно, круглосуточно).';
  }
  if (lower.includes('баланс') || lower.includes('сколько')) {
    return 'Текущий баланс вашего зарплатного счёта: **142 830 ₽**. Ближайшая выплата — аванс 32 000 ₽ (1 апреля).';
  }
  if (lower.includes('смен') || lower.includes('график')) {
    return 'В апреле у вас запланировано **19 смен**, осталось **4**. Следующая дневная смена — завтра, 08:00–16:00. Подробный график доступен в разделе «График».';
  }
  if (lower.includes('привет') || lower.includes('здравствуй') || lower.includes('добрый')) {
    return 'Привет, Артур Арменович! 👋 Я ваш персональный финансовый помощник ГПБ. Могу помочь с вопросами о зарплате, налогах, кэшбэке и картах. Что вас интересует?';
  }

  return 'Понял ваш вопрос. Уточню информацию по вашему аккаунту... Для получения точного ответа рекомендую обратиться в службу поддержки через раздел «Поддержка» или позвонить на горячую линию **8 800 100-07-01**.';
}

function formatTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

function renderText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-bold text-foreground">{part}</strong>
      : <span key={i}>{part}</span>
  );
}

export default function AiAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      text: 'Привет, Артур Арменович! Я ваш персональный финансовый помощник ГПБ. Помогу разобраться с зарплатой, налогами, кэшбэком и любыми вопросами по банку.',
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim(), time: formatTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = getAnswer(text);
      const botMsg: Message = { id: Date.now() + 1, role: 'assistant', text: answer, time: formatTime() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
              <Icon name="Bot" size={22} className="text-white" fallback="MessageCircle" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gpb-blue"></div>
          </div>
          <div>
            <p className="text-white font-bold text-base">ГПБ Ассистент</p>
            <p className="text-emerald-300 text-xs font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span>
              Онлайн · отвечает мгновенно
            </p>
          </div>
          <div className="ml-auto bg-white/10 rounded-xl px-3 py-1.5">
            <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wide">ИИ</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gpb-blue flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name="Bot" size={14} className="text-white" fallback="MessageCircle" />
              </div>
            )}
            <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-gpb-blue text-white rounded-tr-sm'
                    : 'bg-white gpb-card-shadow text-foreground rounded-tl-sm'
                }`}
              >
                {msg.role === 'assistant' ? renderText(msg.text) : msg.text}
              </div>
              <span className="text-[10px] text-muted-foreground px-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5 animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-gpb-blue flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name="Bot" size={14} className="text-white" fallback="MessageCircle" />
            </div>
            <div className="bg-white gpb-card-shadow rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1">
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex-shrink-0">
          <p className="text-xs text-muted-foreground mb-2 px-1">Частые вопросы:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="bg-white border border-border rounded-full px-3 py-1.5 text-xs font-medium text-foreground hover:border-gpb-blue hover:text-gpb-blue transition-colors gpb-card-shadow"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Задайте вопрос..."
            className="flex-1 bg-gpb-surface rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gpb-blue"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 bg-gpb-blue rounded-2xl flex items-center justify-center disabled:opacity-40 transition-opacity flex-shrink-0"
          >
            <Icon name="Send" size={17} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}