import { useState } from 'react';
import Icon from '@/components/ui/icon';

const notifications = [
  {
    id: 1, type: 'salary', icon: 'Wallet', title: 'Зарплата зачислена',
    body: 'На ваш счёт зачислена зарплата в размере 85 400 ₽ за февраль 2026 г.',
    time: '15 мар, 09:12', read: false, urgent: false,
  },
  {
    id: 2, type: 'alert', icon: 'AlertTriangle', title: 'Изменение графика',
    body: 'Ваш работодатель изменил график смен на 20 марта. Дневная смена отменена.',
    time: '18 мар, 14:30', read: false, urgent: true,
  },
  {
    id: 3, type: 'tax', icon: 'Landmark', title: 'НДФЛ удержан',
    body: 'Удержан налог на доходы физических лиц: 13 100 ₽.',
    time: '15 мар, 09:12', read: true, urgent: false,
  },
  {
    id: 4, type: 'info', icon: 'Info', title: 'Справка 2-НДФЛ готова',
    body: 'Справка о доходах за 2025 год доступна в разделе «Документы».',
    time: '10 мар, 11:00', read: true, urgent: false,
  },
  {
    id: 5, type: 'salary', icon: 'Wallet', title: 'Аванс зачислен',
    body: 'На ваш счёт зачислен аванс в размере 32 000 ₽ за март 2026 г.',
    time: '1 мар, 09:08', read: true, urgent: false,
  },
  {
    id: 6, type: 'alert', icon: 'Shield', title: 'Безопасность',
    body: 'Выполнен вход в приложение с нового устройства. Это были вы?',
    time: '28 фев, 18:45', read: true, urgent: true,
  },
];

const typeColors: Record<string, string> = {
  salary: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
  alert: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600',
  tax: 'bg-red-50 dark:bg-red-900/20 text-red-500',
  info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
};

export default function NotificationsScreen() {
  const [items, setItems] = useState(notifications);

  const unread = items.filter(n => !n.read).length;
  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setItems(items.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-4 pt-14 pb-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Входящие</p>
            <h1 className="text-white text-2xl font-bold tracking-tight">Уведомления</h1>
            {unread > 0 && (
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-2 h-2 bg-gpb-gold rounded-full"></div>
                <p className="text-white/70 text-sm">{unread} непрочитанных</p>
              </div>
            )}
          </div>
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="glass-card text-white text-xs font-semibold px-3 py-2 rounded-2xl mt-1"
            >
              Прочитать все
            </button>
          )}
        </div>
      </div>

      {/* Urgent alerts */}
      {items.filter(n => n.urgent && !n.read).length > 0 && (
        <div className="px-4 -mt-4 mb-3">
          <div className="bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-800/30 rounded-3xl p-4 gpb-card-shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-amber-100 dark:bg-amber-800/30 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={12} className="text-amber-600" />
              </div>
              <p className="text-xs font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest">Требуют внимания</p>
            </div>
            {items.filter(n => n.urgent && !n.read).map(n => (
              <div key={n.id} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={n.icon} size={16} className="text-amber-600" fallback="AlertCircle" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All notifications */}
      <div className="px-4 mt-1 mb-6">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Все уведомления</p>
        <div className="bg-card rounded-3xl gpb-card-shadow overflow-hidden">
          {items.map((n, idx) => (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`w-full flex items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-gpb-surface ${idx < items.length - 1 ? 'border-b border-border' : ''} ${!n.read ? 'bg-gpb-blue/[0.03]' : ''}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${typeColors[n.type] || 'bg-gpb-surface text-gpb-blue'}`}>
                <Icon name={n.icon} size={17} fallback="Bell" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${!n.read ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>{n.title}</p>
                  {!n.read && <div className="w-2 h-2 bg-gpb-blue rounded-full flex-shrink-0 mt-1.5"></div>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{n.body}</p>
                <p className="text-[11px] text-muted-foreground/70 mt-1.5">{n.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
