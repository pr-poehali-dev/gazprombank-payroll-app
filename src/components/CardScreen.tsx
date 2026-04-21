import { useState } from 'react';
import Icon from '@/components/ui/icon';

const actions = [
  { icon: 'Smartphone', label: 'СБП' },
  { icon: 'ArrowUpRight', label: 'Перевод' },
  { icon: 'Landmark', label: 'Реквизиты' },
  { icon: 'Lock', label: 'Блокировка' },
];

const limits = [
  { label: 'Снятие наличных', current: 50000, max: 150000 },
  { label: 'Безналичная оплата', current: 120000, max: 300000 },
  { label: 'Переводы', current: 80000, max: 200000 },
];

export default function CardScreen() {
  const [showNumber, setShowNumber] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'limits' | 'services'>('info');

  const tabs = [
    { id: 'info', label: 'Карта' },
    { id: 'limits', label: 'Лимиты' },
    { id: 'services', label: 'Услуги' },
  ] as const;

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-6">
        <h1 className="text-white text-xl font-bold mb-6">Зарплатная карта</h1>

        {/* Card visual */}
        <div className="relative h-48 rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a2a5e 0%, #1a4a8a 50%, #0d3870 100%)' }}>
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5"></div>
          <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-white/5"></div>

          {/* GPB logo area */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gpb-gold flex items-center justify-center">
              <span className="text-gpb-blue-dark text-xs font-black">ГПБ</span>
            </div>
            <span className="text-white text-xs font-semibold opacity-80">Газпромбанк</span>
          </div>
          <div className="absolute top-5 right-5">
            <span className="text-white/60 text-xs">ЗАРПЛАТНАЯ</span>
          </div>

          {/* Card number */}
          <div className="absolute bottom-14 left-5">
            <p className="text-white/60 text-xs mb-1">Номер карты</p>
            <p className="text-white font-mono text-base tracking-widest">
              {showNumber ? '5469 3800 4821 7392' : '•••• •••• •••• 7392'}
            </p>
          </div>

          {/* Bottom row */}
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <div>
              <p className="text-white/60 text-[10px] mb-0.5">ДЕРЖАТЕЛЬ</p>
              <p className="text-white text-sm font-semibold tracking-wide">A. AVAGYAN</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-[10px] mb-0.5">ДЕЙСТВУЕТ ДО</p>
              <p className="text-white text-sm font-semibold">03/28</p>
            </div>
            <div className="w-10 h-6 flex items-center">
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-6 h-6 rounded-full bg-gpb-gold absolute top-0 left-3 mix-blend-multiply opacity-90"></div>
              </div>
            </div>
          </div>

          {/* Eye button */}
          <button
            onClick={() => setShowNumber(!showNumber)}
            className="absolute bottom-14 right-5 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"
          >
            <Icon name={showNumber ? 'EyeOff' : 'Eye'} size={14} className="text-white" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {actions.map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-1.5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                <Icon name={a.icon} size={18} className="text-white" fallback="Star" />
              </div>
              <span className="text-xs text-blue-200">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Balance */}
      <div className="px-5 -mt-4 mb-4">
        <div className="bg-card rounded-2xl gpb-card-shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Баланс счёта</p>
            <p className="text-2xl font-bold text-foreground">142 830 <span className="text-lg">₽</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Счёт</p>
            <p className="text-sm font-mono text-foreground">•••• 3827</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="bg-card rounded-2xl gpb-card-shadow overflow-hidden">
          <div className="flex border-b border-border">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === tab.id ? 'text-gpb-blue border-b-2 border-gpb-blue' : 'text-muted-foreground'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'info' && (
            <div className="p-4 space-y-3">
              {[
                { label: 'Тип карты', val: 'Mastercard Debit' },
                { label: 'Зарплатный проект', val: 'ООО «Газпром Нефть»' },
                { label: 'Дата открытия', val: '12 апреля 2022' },
                { label: 'Валюта', val: 'Российский рубль (RUB)' },
                { label: 'Статус', val: '✓ Активна', green: true },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-1">
                  <span className="text-sm text-muted-foreground">{row.label}</span>
                  <span className={`text-sm font-semibold ${row.green ? 'text-emerald-600' : 'text-foreground'}`}>{row.val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'limits' && (
            <div className="p-4 space-y-4">
              {limits.map(lim => (
                <div key={lim.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-foreground font-medium">{lim.label}</span>
                    <span className="text-xs text-muted-foreground">{lim.current.toLocaleString('ru-RU')} / {lim.max.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="h-2 bg-gpb-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gpb-blue rounded-full transition-all"
                      style={{ width: `${(lim.current / lim.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="p-4 space-y-2">
              {[
                { label: 'СМС-информирование', enabled: true },
                { label: 'Автоплатёж ЖКХ', enabled: false },
                { label: 'Копилка', enabled: true },
                { label: 'Защита покупок', enabled: false },
              ].map(svc => (
                <div key={svc.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm font-medium text-foreground">{svc.label}</span>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${svc.enabled ? 'bg-gpb-blue' : 'bg-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-card rounded-full shadow transition-transform ${svc.enabled ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}