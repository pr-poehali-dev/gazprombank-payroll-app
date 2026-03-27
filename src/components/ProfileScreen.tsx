import Icon from '@/components/ui/icon';

const profileItems = [
  { icon: 'User', label: 'Личные данные', sub: 'ФИО, дата рождения, ИНН' },
  { icon: 'Building2', label: 'Место работы', sub: 'ООО «Газпром Нефть»' },
  { icon: 'BadgeRuble', label: 'Налоговые данные', sub: 'НДФЛ, вычеты, удержания' },
  { icon: 'FileText', label: 'Трудовой договор', sub: '№ 2845 от 12.04.2022' },
  { icon: 'Shield', label: 'Безопасность', sub: 'Пароль, биометрия' },
  { icon: 'Bell', label: 'Уведомления', sub: 'Push, SMS, Email' },
];

export default function ProfileScreen() {
  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-10">
        <h1 className="text-white text-xl font-bold mb-6">Профиль</h1>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">АП</span>
          </div>
          <div>
            <p className="text-white text-lg font-bold">Алексей Петров</p>
            <p className="text-blue-200 text-sm">Старший менеджер</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span className="text-blue-200 text-xs">Зарплатный клиент с 2022</span>
            </div>
          </div>
        </div>
      </div>

      {/* Employment info */}
      <div className="px-5 -mt-4 mb-4">
        <div className="bg-white rounded-2xl gpb-card-shadow p-4 grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">4 г.</p>
            <p className="text-xs text-muted-foreground">Стаж</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-lg font-bold text-foreground">5-й</p>
            <p className="text-xs text-muted-foreground">Разряд</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">ООО</p>
            <p className="text-xs text-muted-foreground">Форма</p>
          </div>
        </div>
      </div>

      {/* Profile sections */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-2xl gpb-card-shadow overflow-hidden">
          {profileItems.map((item, idx) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gpb-surface transition-colors text-left ${idx < profileItems.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gpb-surface flex items-center justify-center">
                  <Icon name={item.icon} size={17} className="text-gpb-blue" fallback="User" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-5 mb-8">
        <button className="w-full bg-red-50 border border-red-100 text-red-600 rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Icon name="LogOut" size={16} />
          Выйти из приложения
        </button>
      </div>
    </div>
  );
}
