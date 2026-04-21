import { useState } from 'react';
import Icon from '@/components/ui/icon';

const transactions = [
  { id: 1, text: 'Зарплата зачислена', amount: '+85 400 ₽', time: '15 мар', type: 'success' },
  { id: 2, text: 'Аванс зачислен', amount: '+32 000 ₽', time: '1 мар', type: 'success' },
  { id: 3, text: 'Удержание НДФЛ', amount: '-13 100 ₽', time: '15 мар', type: 'debit' },
];

const quickActions = [
  { icon: 'Calculator', label: 'Калькулятор', page: 'calculator' },
  { icon: 'CalendarDays', label: 'График смен', page: 'schedule' },
  { icon: 'FileText', label: 'Документы', page: 'documents' },
  { icon: 'History', label: 'История', page: 'history' },
];

const monthlyData = [
  { month: 'Окт', amount: 81200 },
  { month: 'Ноя', amount: 85400 },
  { month: 'Дек', amount: 94800 },
  { month: 'Янв', amount: 85400 },
  { month: 'Фев', amount: 85400 },
  { month: 'Мар', amount: 85400 },
];

interface Props {
  onNavigate: (page: string) => void;
}

export default function HomeScreen({ onNavigate }: Props) {
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState('32000');
  const [advanceSent, setAdvanceSent] = useState(false);

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  const handleAdvanceRequest = () => {
    setAdvanceSent(true);
    setTimeout(() => {
      setShowAdvanceModal(false);
      setAdvanceSent(false);
    }, 1800);
  };

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-200 text-sm font-medium">Добрый день,</p>
            <h1 className="text-white text-xl font-bold">Артур Арменович</h1>
          </div>
          <button
            onClick={() => onNavigate('notifications')}
            className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <Icon name="Bell" size={20} className="text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gpb-gold rounded-full"></span>
          </button>
        </div>

        {/* Salary card */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/15">
          <p className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">Ближайшая выплата</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white text-3xl font-bold tracking-tight">85 400 <span className="text-xl">₽</span></p>
              <p className="text-blue-200 text-sm mt-1">1 апреля 2026</p>
            </div>
            <div className="text-right">
              <button
                onClick={() => setShowAdvanceModal(true)}
                className="bg-gpb-gold/20 border border-gpb-gold/40 rounded-lg px-3 py-1.5 text-left hover:bg-gpb-gold/30 transition-colors"
              >
                <p className="text-gpb-gold text-xs font-semibold">Аванс</p>
                <p className="text-white text-sm font-bold">32 000 ₽</p>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-blue-100 text-xs">Зарплатный счёт активен</span>
            </div>
            <span className="text-blue-200 text-xs">•••• 4821</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 -mt-4">
        <div className="bg-card rounded-2xl gpb-card-shadow p-4 grid grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.page}
              onClick={() => onNavigate(action.page)}
              className="flex flex-col items-center gap-2 py-2 rounded-xl hover:bg-gpb-surface transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-gpb-surface flex items-center justify-center">
                <Icon name={action.icon} size={20} className="text-gpb-blue" />
              </div>
              <span className="text-xs text-foreground font-medium text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl gpb-card-shadow p-4">
          <p className="text-muted-foreground text-xs mb-1">Отработано часов</p>
          <p className="text-2xl font-bold text-foreground">156</p>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <Icon name="TrendingUp" size={12} />
            Март 2026
          </p>
        </div>
        <div className="bg-card rounded-2xl gpb-card-shadow p-4">
          <p className="text-muted-foreground text-xs mb-1">Смены в месяце</p>
          <p className="text-2xl font-bold text-foreground">19</p>
          <p className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
            <Icon name="Calendar" size={12} />
            Осталось 4
          </p>
        </div>
      </div>

      {/* Income chart */}
      <div className="px-5 mt-4">
        <div className="bg-card rounded-2xl gpb-card-shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-foreground">Динамика дохода</p>
              <p className="text-xs text-muted-foreground">За последние 6 месяцев</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg px-2 py-1 flex items-center gap-1">
              <Icon name="TrendingUp" size={12} className="text-emerald-600" />
              <span className="text-emerald-600 text-xs font-semibold">+5.2%</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-1.5 h-20">
            {monthlyData.map((d, i) => {
              const heightPct = (d.amount / maxAmount) * 100;
              const isLast = i === monthlyData.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end" style={{ height: '64px' }}>
                    <div
                      className={`w-full rounded-t-md transition-all ${isLast ? 'bg-gpb-blue' : 'bg-gpb-surface dark:bg-gpb-surface'}`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-medium ${isLast ? 'text-gpb-blue' : 'text-muted-foreground'}`}>{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-border flex justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Средний доход</p>
              <p className="text-sm font-bold text-foreground">86 267 ₽</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Максимум</p>
              <p className="text-sm font-bold text-foreground">94 800 ₽</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="px-5 mt-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">Последние операции</h2>
          <button onClick={() => onNavigate('history')} className="text-gpb-blue text-xs font-medium">
            Все операции
          </button>
        </div>
        <div className="bg-card rounded-2xl gpb-card-shadow overflow-hidden">
          {transactions.map((item, idx) => (
            <div key={item.id} className={`flex items-center justify-between px-4 py-3.5 ${idx < transactions.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${item.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  <Icon name={item.type === 'success' ? 'ArrowDownLeft' : 'ArrowUpRight'} size={16} className={item.type === 'success' ? 'text-emerald-600' : 'text-red-500'} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${item.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Advance modal */}
      {showAdvanceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowAdvanceModal(false)}>
          <div
            className="w-full max-w-[430px] mx-auto bg-card rounded-t-3xl p-6 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            {advanceSent ? (
              <div className="flex flex-col items-center py-6 gap-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                  <Icon name="CheckCircle" size={36} className="text-emerald-500" />
                </div>
                <p className="text-lg font-bold text-foreground">Заявка отправлена</p>
                <p className="text-sm text-muted-foreground text-center">Аванс будет зачислен на карту •••• 4821 в течение 15 минут</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-foreground">Запрос аванса</h2>
                  <button onClick={() => setShowAdvanceModal(false)} className="w-8 h-8 rounded-full bg-gpb-surface flex items-center justify-center">
                    <Icon name="X" size={16} className="text-muted-foreground" />
                  </button>
                </div>

                <div className="bg-gpb-surface rounded-2xl p-4 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Доступно к выплате</p>
                  <p className="text-2xl font-bold text-foreground">32 000 ₽</p>
                  <p className="text-xs text-muted-foreground mt-1">50% от оклада · до зарплаты 15 дней</p>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Сумма аванса</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={advanceAmount}
                      onChange={e => setAdvanceAmount(e.target.value)}
                      className="w-full bg-gpb-surface border border-border rounded-xl px-4 py-3 text-lg font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-gpb-blue pr-10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">₽</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[10000, 20000, 32000].map(v => (
                      <button
                        key={v}
                        onClick={() => setAdvanceAmount(String(v))}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${String(v) === advanceAmount ? 'bg-gpb-blue text-white border-gpb-blue' : 'border-border text-muted-foreground hover:border-gpb-blue'}`}
                      >
                        {v.toLocaleString('ru')} ₽
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gpb-surface rounded-xl p-3 mb-5 flex items-center gap-2">
                  <Icon name="Info" size={14} className="text-muted-foreground flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">Сумма будет вычтена из ближайшей выплаты 1 апреля 2026</p>
                </div>

                <button
                  onClick={handleAdvanceRequest}
                  className="w-full bg-gpb-blue text-white rounded-xl py-4 text-sm font-bold"
                >
                  Получить аванс
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
