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
  salary: 'bg-emerald-50 text-emerald-600',
  alert: 'bg-amber-50 text-amber-600',
  tax: 'bg-red-50 text-red-600',
  info: 'bg-blue-50 text-blue-600',
};

export default function NotificationsScreen() {
  const [items, setItems] = useState(notifications);

  const unread = items.filter(n => !n.read).length;

  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setItems(items.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold">Уведомления</h1>
            {unread > 0 && (
              <p className="text-blue-200 text-sm mt-1">{unread} непрочитанных</p>
            )}
          </div>
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="bg-white/10 text-white text-xs font-medium px-3 py-2 rounded-xl"
            >
              Прочитать все
            </button>
          )}
        </div>
      </div>

      {/* Alerts first */}
      {items.filter(n => n.urgent && !n.read).length > 0 && (
        <div className="px-5 mt-4 mb-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Требуют внимания</p>
          {items.filter(n => n.urgent && !n.read).map(n => (
            <div key={n.id} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Icon name={n.icon} size={16} className="text-amber-600" fallback="AlertCircle" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All notifications */}
      <div className="px-5 mt-2 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Все уведомления</p>
        <div className="bg-card rounded-2xl gpb-card-shadow overflow-hidden">
          {items.map((n, idx) => (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`w-full flex items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-gpb-surface ${idx < items.length - 1 ? 'border-b border-border' : ''} ${!n.read ? 'bg-blue-50/50' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[n.type] || 'bg-gpb-surface text-gpb-blue'}`}>
                <Icon name={n.icon} size={16} fallback="Bell" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${!n.read ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>{n.title}</p>
                  {!n.read && <div className="w-2 h-2 bg-gpb-blue rounded-full flex-shrink-0 mt-1"></div>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{n.body}</p>
                <p className="text-xs text-muted-foreground mt-1.5">{n.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}