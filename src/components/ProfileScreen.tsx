import Icon from '@/components/ui/icon';
import { useTheme } from '@/context/ThemeContext';

const profileItems = [
  { icon: 'User', label: 'Личные данные', sub: 'ФИО, дата рождения, ИНН', color: 'bg-blue-50 dark:bg-blue-900/20 text-gpb-blue' },
  { icon: 'Building2', label: 'Место работы', sub: 'ООО «Газпром Нефть»', color: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600' },
  { icon: 'BadgeRuble', label: 'Налоговые данные', sub: 'НДФЛ, вычеты, удержания', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' },
  { icon: 'FileText', label: 'Трудовой договор', sub: '№ 2845 от 12.04.2022', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' },
  { icon: 'Shield', label: 'Безопасность', sub: 'Пароль, биометрия', color: 'bg-red-50 dark:bg-red-900/20 text-red-500' },
  { icon: 'Bell', label: 'Уведомления', sub: 'Push, SMS, Email', color: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600' },
];

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-12">
        <h1 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">Профиль</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-18 h-18 rounded-3xl bg-white/15 border-2 border-white/25 flex items-center justify-center w-[72px] h-[72px]">
              <span className="text-white text-2xl font-black">АА</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white/30"></div>
          </div>
          <div>
            <p className="text-white text-xl font-bold tracking-tight">Артур Арменович</p>
            <p className="text-white/60 text-sm mt-0.5">Старший менеджер</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="bg-white/15 rounded-full px-2.5 py-0.5">
                <span className="text-white/80 text-[11px] font-semibold">Клиент с 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employment stats */}
      <div className="px-4 -mt-5 mb-3">
        <div className="bg-card rounded-3xl gpb-card-shadow-md p-4 grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xl font-black text-foreground">4 г.</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Стаж</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-xl font-black text-foreground">5-й</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Разряд</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-foreground">ООО</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Форма</p>
          </div>
        </div>
      </div>

      {/* Profile sections */}
      <div className="px-4 mb-3">
        <div className="bg-card rounded-3xl gpb-card-shadow overflow-hidden">
          {profileItems.map((item, idx) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-gpb-surface transition-colors text-left ${idx < profileItems.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <Icon name={item.icon} size={16} fallback="User" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={15} className="text-muted-foreground/50" />
            </button>
          ))}
        </div>
      </div>

      {/* Theme toggle */}
      <div className="px-4 mb-3">
        <div className="bg-card rounded-3xl gpb-card-shadow p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${isDark ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500' : 'bg-amber-50 text-amber-500'}`}>
              <Icon name={isDark ? 'Moon' : 'Sun'} size={17} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Тёмная тема</p>
              <p className="text-xs text-muted-foreground">{isDark ? 'Включена' : 'Выключена'}</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`w-13 h-7 rounded-full relative transition-colors duration-300 flex items-center px-0.5 ${isDark ? 'bg-gpb-blue' : 'bg-border'}`}
            style={{width: 52}}
          >
            <span className={`w-6 h-6 rounded-full bg-card shadow-sm transition-transform duration-300 ${isDark ? 'translate-x-[26px]' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mb-8">
        <button className="w-full bg-red-50 dark:bg-red-900/15 border border-red-100 dark:border-red-900/30 text-red-600 rounded-3xl py-4 text-sm font-bold flex items-center justify-center gap-2">
          <Icon name="LogOut" size={16} />
          Выйти из приложения
        </button>
      </div>
    </div>
  );
}
