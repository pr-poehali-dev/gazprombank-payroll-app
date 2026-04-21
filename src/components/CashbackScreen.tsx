import { useState } from 'react';
import Icon from '@/components/ui/icon';

const FREE_CATEGORIES = [
  { id: 'all', icon: 'ShoppingBag', label: 'Все покупки', pct: 1, color: 'bg-slate-100 text-slate-600', accent: '#64748b' },
  { id: 'super', icon: 'ShoppingCart', label: 'Супермаркеты', pct: 5, color: 'bg-emerald-50 text-emerald-600', accent: '#10b981' },
  { id: 'market', icon: 'Package', label: 'Маркетплейсы', pct: 2, color: 'bg-orange-50 text-orange-600', accent: '#f97316' },
  { id: 'pharma', icon: 'Pill', label: 'Аптеки', pct: 5, color: 'bg-red-50 text-red-600', accent: '#ef4444' },
  { id: 'gas', icon: 'Fuel', label: 'АЗС', pct: 3, color: 'bg-yellow-50 text-yellow-600', accent: '#eab308' },
  { id: 'utility', icon: 'Zap', label: 'ЖКХ', pct: 2, color: 'bg-blue-50 text-blue-600', accent: '#3b82f6' },
];

const PLANS = [
  {
    id: 'family',
    icon: 'Users',
    name: 'Семейный',
    price: 750,
    tagline: 'Для семьи с детьми',
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    categories: [
      { icon: 'Baby', label: 'Детские товары', pct: 3 },
      { icon: 'Pencil', label: 'Канцтовары', pct: 5 },
      { icon: 'Palmtree', label: 'Отдых', pct: 3 },
      { icon: 'ShoppingCart', label: 'Супермаркеты', pct: 5 },
      { icon: 'Hammer', label: 'Дом и ремонт', pct: 3 },
    ],
  },
  {
    id: 'invest',
    icon: 'TrendingUp',
    name: 'Инвестиционный',
    price: 2000,
    tagline: 'Для роста капитала',
    gradient: 'from-gpb-blue to-blue-700',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    categories: [
      { icon: 'PiggyBank', label: 'Накопительный счёт', pct: 1 },
      { icon: 'GraduationCap', label: 'Обучение', pct: 3 },
      { icon: 'Plane', label: 'Поездки', pct: 3 },
      { icon: 'MonitorPlay', label: 'Фин. вебинары', pct: 5 },
      { icon: 'Gift', label: 'Возврат с 1-й инвестиции', pct: 0, special: 'до 5 000 ₽' },
    ],
  },
  {
    id: 'health',
    icon: 'Heart',
    name: 'Здоровье',
    price: 1500,
    tagline: 'Для активной жизни',
    gradient: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    categories: [
      { icon: 'Shield', label: 'ДМС', pct: 0, special: 'скидка 10%' },
      { icon: 'TreePine', label: 'Санатории', pct: 3 },
      { icon: 'Dumbbell', label: 'Активный отдых', pct: 3 },
      { icon: 'Stethoscope', label: 'Мед. центры', pct: 5 },
      { icon: 'Eye', label: 'Оптика', pct: 1 },
    ],
  },
];

export default function CashbackScreen() {
  const [selectedFree, setSelectedFree] = useState<string[]>(['super', 'pharma', 'gas']);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const MAX_FREE = 3;

  const toggleFree = (id: string) => {
    setSelectedFree(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_FREE) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const totalEarned = 1284;
  const pendingCashback = 342;

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-12 -translate-x-8" />

        <div className="relative">
          <h1 className="text-white text-xl font-bold mb-1">Кэшбэк</h1>
          <p className="text-blue-200 text-sm mb-5">Апрель 2026</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/12 backdrop-blur rounded-2xl p-4 border border-white/10">
              <p className="text-blue-200 text-xs mb-1">Начислено</p>
              <p className="text-white text-2xl font-bold">{totalEarned} <span className="text-base">₽</span></p>
              <p className="text-emerald-300 text-xs mt-1 flex items-center gap-1">
                <Icon name="TrendingUp" size={11} className="text-emerald-300" />
                +18% к марту
              </p>
            </div>
            <div className="bg-gpb-gold/20 border border-gpb-gold/30 rounded-2xl p-4">
              <p className="text-gpb-gold-light text-xs mb-1">Ожидается</p>
              <p className="text-white text-2xl font-bold">{pendingCashback} <span className="text-base">₽</span></p>
              <p className="text-blue-200 text-xs mt-1">Зачислится 1 мая</p>
            </div>
          </div>
        </div>
      </div>

      {/* Free categories */}
      <div className="px-5 -mt-4 mb-5">
        <div className="bg-card rounded-2xl gpb-card-shadow p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold text-foreground">Бесплатные категории</p>
            <span className="text-xs font-semibold text-muted-foreground bg-gpb-surface px-2 py-0.5 rounded-full">
              {selectedFree.length}/{MAX_FREE}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Выберите 3 категории для повышенного кэшбэка</p>

          <div className="grid grid-cols-3 gap-2">
            {FREE_CATEGORIES.map(cat => {
              const isSelected = selectedFree.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleFree(cat.id)}
                  className={`
                    relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all
                    ${isSelected
                      ? 'border-gpb-blue bg-gpb-blue/5 scale-[1.02]'
                      : 'border-transparent bg-gpb-surface hover:border-border'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-gpb-blue rounded-full flex items-center justify-center">
                      <Icon name="Check" size={9} className="text-white" />
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                    <Icon name={cat.icon} size={18} fallback="Tag" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-semibold text-foreground leading-tight">{cat.label}</p>
                    <p className={`text-sm font-black mt-0.5 ${isSelected ? 'text-gpb-blue' : 'text-muted-foreground'}`}>
                      {cat.pct}%
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedFree.length === MAX_FREE && (
            <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 flex items-center gap-2">
              <Icon name="CheckCircle2" size={15} className="text-emerald-600 flex-shrink-0" fallback="Check" />
              <p className="text-xs text-emerald-700 font-medium">Категории выбраны. Кэшбэк активен!</p>
            </div>
          )}
        </div>
      </div>

      {/* Subscriptions */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-foreground">Подписки</p>
          <span className="text-xs text-muted-foreground">Расширенный кэшбэк</span>
        </div>

        <div className="space-y-3">
          {PLANS.map(plan => {
            const isActive = activePlan === plan.id;
            const isExpanded = expandedPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`bg-card rounded-2xl gpb-card-shadow overflow-hidden border-2 transition-all ${isActive ? 'border-gpb-blue' : 'border-transparent'}`}
              >
                {/* Plan header */}
                <button
                  className="w-full"
                  onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
                >
                  <div className={`bg-gradient-to-r ${plan.gradient} px-4 py-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon name={plan.icon} size={20} className="text-white" fallback="Star" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-base">{plan.name}</p>
                        <p className="text-white/70 text-xs">{plan.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="bg-gpb-gold text-gpb-blue text-[10px] font-black px-2 py-0.5 rounded-full">
                          АКТИВЕН
                        </span>
                      )}
                      <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                        <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="p-4 animate-fade-in">
                    <div className="space-y-2 mb-4">
                      {plan.categories.map((cat, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-xl ${plan.lightBg} flex items-center justify-center`}>
                              <Icon name={cat.icon} size={15} className={plan.textColor} fallback="Tag" />
                            </div>
                            <span className="text-sm text-foreground font-medium">{cat.label}</span>
                          </div>
                          {cat.special ? (
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${plan.lightBg} ${plan.textColor} border ${plan.borderColor}`}>
                              {cat.special}
                            </span>
                          ) : (
                            <span className={`text-base font-black ${plan.textColor}`}>{cat.pct}%</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className={`rounded-xl p-3 ${plan.lightBg} border ${plan.borderColor} flex items-center justify-between`}>
                      <div>
                        <p className="text-xs text-muted-foreground">Стоимость</p>
                        <p className={`text-lg font-black ${plan.textColor}`}>{plan.price.toLocaleString('ru-RU')} ₽<span className="text-xs font-semibold text-muted-foreground"> /мес</span></p>
                      </div>
                      <button
                        onClick={() => setActivePlan(isActive ? null : plan.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-white border border-border text-muted-foreground'
                            : `bg-gradient-to-r ${plan.gradient} text-white shadow-sm`
                        }`}
                      >
                        {isActive ? 'Отключить' : 'Подключить'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="px-5 mb-6">
        <div className="bg-gpb-surface rounded-2xl p-4 flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Кэшбэк начисляется бонусными рублями 1-го числа следующего месяца. Максимальный кэшбэк по подписке суммируется с базовыми категориями.
          </p>
        </div>
      </div>
    </div>
  );
}