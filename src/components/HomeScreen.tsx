import Icon from '@/components/ui/icon';

const notifications = [
  { id: 1, text: 'Зарплата зачислена', amount: '+85 400 ₽', time: '15 мар', type: 'success' },
  { id: 2, text: 'Аванс зачислен', amount: '+32 000 ₽', time: '1 мар', type: 'success' },
  { id: 3, text: 'Удержание НДФЛ', amount: '-13 100 ₽', time: '15 мар', type: 'debit' },
];

const quickActions = [
  { icon: 'Calculator', label: 'Калькулятор', page: 'calculator' },
  { icon: 'CalendarDays', label: 'График смен', page: 'schedule' },
  { icon: 'CreditCard', label: 'Карта', page: 'card' },
  { icon: 'History', label: 'История', page: 'history' },
];

interface Props {
  onNavigate: (page: string) => void;
}

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-200 text-sm font-medium">Добрый день,</p>
            <h1 className="text-white text-xl font-bold">Алексей Петров</h1>
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
              <div className="bg-gpb-gold/20 border border-gpb-gold/40 rounded-lg px-3 py-1.5">
                <p className="text-gpb-gold text-xs font-semibold">Аванс</p>
                <p className="text-white text-sm font-bold">32 000 ₽</p>
              </div>
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
        <div className="bg-white rounded-2xl gpb-card-shadow p-4 grid grid-cols-4 gap-2">
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
        <div className="bg-white rounded-2xl gpb-card-shadow p-4">
          <p className="text-muted-foreground text-xs mb-1">Отработано часов</p>
          <p className="text-2xl font-bold text-foreground">156</p>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <Icon name="TrendingUp" size={12} />
            Март 2026
          </p>
        </div>
        <div className="bg-white rounded-2xl gpb-card-shadow p-4">
          <p className="text-muted-foreground text-xs mb-1">Смены в месяце</p>
          <p className="text-2xl font-bold text-foreground">19</p>
          <p className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
            <Icon name="Calendar" size={12} />
            Осталось 4
          </p>
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
        <div className="bg-white rounded-2xl gpb-card-shadow overflow-hidden">
          {notifications.map((item, idx) => (
            <div key={item.id} className={`flex items-center justify-between px-4 py-3.5 ${idx < notifications.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${item.type === 'success' ? 'bg-emerald-50' : 'bg-red-50'}`}>
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
    </div>
  );
}
