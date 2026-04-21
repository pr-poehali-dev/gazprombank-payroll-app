import { useState } from 'react';
import Icon from '@/components/ui/icon';

const transactions = [
  { id: 1, date: '15 марта', type: 'income', category: 'Зарплата', desc: 'Выплата за февраль', amount: 85400 },
  { id: 2, date: '15 марта', type: 'debit', category: 'НДФЛ', desc: 'Налог на доходы физ. лиц', amount: -13100 },
  { id: 3, date: '15 марта', type: 'debit', category: 'ПФР', desc: 'Пенсионные взносы', amount: -0, employer: true },
  { id: 4, date: '1 марта', type: 'income', category: 'Аванс', desc: 'Аванс за март', amount: 32000 },
  { id: 5, date: '15 февраля', type: 'income', category: 'Зарплата', desc: 'Выплата за январь', amount: 85400 },
  { id: 6, date: '15 февраля', type: 'debit', category: 'НДФЛ', desc: 'Налог на доходы физ. лиц', amount: -13100 },
  { id: 7, date: '15 февраля', type: 'debit', category: 'Удержание', desc: 'Алименты', amount: -15000 },
  { id: 8, date: '1 февраля', type: 'income', category: 'Аванс', desc: 'Аванс за февраль', amount: 32000 },
  { id: 9, date: '15 января', type: 'income', category: 'Зарплата', desc: 'Выплата за декабрь', amount: 85400 },
  { id: 10, date: '15 января', type: 'debit', category: 'НДФЛ', desc: 'Налог на доходы физ. лиц', amount: -13100 },
];

const filters = ['Все', 'Начисления', 'Удержания'];

const categoryIcons: Record<string, string> = {
  'Зарплата': 'Wallet',
  'Аванс': 'Wallet',
  'НДФЛ': 'Landmark',
  'ПФР': 'Shield',
  'Удержание': 'AlertCircle',
};

const categoryColors: Record<string, string> = {
  'Зарплата': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  'Аванс': 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  'НДФЛ': 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  'ПФР': 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  'Удержание': 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
};

export default function HistoryScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter(t => {
    if (activeFilter === 1 && t.type !== 'income') return false;
    if (activeFilter === 2 && t.type !== 'debit') return false;
    if (searchQuery && !t.desc.toLowerCase().includes(searchQuery.toLowerCase()) && !t.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalDebit = Math.abs(transactions.filter(t => t.type === 'debit' && t.amount !== 0).reduce((s, t) => s + t.amount, 0));

  const fmt = (n: number) => Math.abs(n).toLocaleString('ru-RU');

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-4 pt-14 pb-10">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Обзор</p>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-5">История операций</h1>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-2xl bg-emerald-400/20 flex items-center justify-center">
                <Icon name="TrendingUp" size={15} className="text-emerald-300" />
              </div>
              <p className="text-white/60 text-xs">Начислено</p>
            </div>
            <p className="text-white text-xl font-black tracking-tight">{fmt(totalIncome)} ₽</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-2xl bg-red-400/20 flex items-center justify-center">
                <Icon name="TrendingDown" size={15} className="text-red-300" />
              </div>
              <p className="text-white/60 text-xs">Удержано</p>
            </div>
            <p className="text-white text-xl font-black tracking-tight">{fmt(totalDebit)} ₽</p>
          </div>
        </div>
      </div>

      {/* Search + Filter — pulled up */}
      <div className="px-4 -mt-5 mb-4">
        <div className="bg-card rounded-3xl gpb-card-shadow-md p-4">
          <div className="relative mb-3">
            <Icon name="Search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск по операциям..."
              className="w-full pl-10 pr-4 py-2.5 bg-gpb-surface rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gpb-blue/40 transition-shadow"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f, idx) => (
              <button
                key={f}
                onClick={() => setActiveFilter(idx)}
                className={`flex-1 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  activeFilter === idx
                    ? 'bg-gpb-blue text-white shadow-sm'
                    : 'bg-gpb-surface text-muted-foreground hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions list */}
      <div className="px-4 mb-6">
        <div className="bg-card rounded-3xl gpb-card-shadow-md overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-14 text-center text-muted-foreground">
              <Icon name="SearchX" size={34} className="mx-auto mb-3 opacity-30" fallback="Search" />
              <p className="text-sm font-medium">Операции не найдены</p>
            </div>
          ) : (
            filtered.map((t, idx) => (
              <div
                key={t.id}
                className={`flex items-center gap-3 px-4 py-4 ${
                  idx < filtered.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    categoryColors[t.category] || 'bg-gpb-surface text-gpb-blue'
                  }`}
                >
                  <Icon name={categoryIcons[t.category] || 'CreditCard'} size={17} fallback="CreditCard" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{t.desc}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{t.date}</span>
                    {t.employer && (
                      <span className="text-xs text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded-lg font-medium">
                        Работодатель
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {t.amount === 0 ? (
                    <span className="text-sm font-semibold text-muted-foreground">—</span>
                  ) : (
                    <span
                      className={`text-sm font-bold ${
                        t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
                      }`}
                    >
                      {t.type === 'income' ? '+' : '−'}{fmt(t.amount)} ₽
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
