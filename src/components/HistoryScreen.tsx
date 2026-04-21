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
  'Зарплата': 'bg-emerald-50 text-emerald-600',
  'Аванс': 'bg-blue-50 text-blue-600',
  'НДФЛ': 'bg-red-50 text-red-600',
  'ПФР': 'bg-orange-50 text-orange-600',
  'Удержание': 'bg-red-50 text-red-600',
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
      <div className="gpb-gradient px-5 pt-14 pb-6">
        <h1 className="text-white text-xl font-bold mb-4">История операций</h1>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-2xl p-3">
            <p className="text-blue-200 text-xs mb-1">Начислено (март)</p>
            <p className="text-white font-bold text-lg">{fmt(totalIncome)} ₽</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <p className="text-blue-200 text-xs mb-1">Удержано (март)</p>
            <p className="text-white font-bold text-lg">{fmt(totalDebit)} ₽</p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="px-5 -mt-4 mb-4">
        <div className="bg-card rounded-2xl gpb-card-shadow p-3">
          <div className="relative mb-3">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск по операциям..."
              className="w-full pl-9 pr-4 py-2.5 bg-gpb-surface rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gpb-blue"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f, idx) => (
              <button
                key={f}
                onClick={() => setActiveFilter(idx)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${activeFilter === idx ? 'bg-gpb-blue text-white' : 'bg-gpb-surface text-muted-foreground'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions list */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl gpb-card-shadow overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Icon name="SearchX" size={32} className="mx-auto mb-2 opacity-40" fallback="Search" />
              <p className="text-sm">Операции не найдены</p>
            </div>
          ) : (
            filtered.map((t, idx) => (
              <div key={t.id} className={`flex items-center gap-3 px-4 py-3.5 ${idx < filtered.length - 1 ? 'border-b border-border' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${categoryColors[t.category] || 'bg-gpb-surface text-gpb-blue'}`}>
                  <Icon name={categoryIcons[t.category] || 'CreditCard'} size={16} fallback="CreditCard" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{t.desc}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{t.date}</span>
                    {t.employer && <span className="text-xs text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded font-medium">Работодатель</span>}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {t.amount === 0 ? (
                    <span className="text-sm font-semibold text-muted-foreground">—</span>
                  ) : (
                    <span className={`text-sm font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
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