import { useState } from 'react';
import Icon from '@/components/ui/icon';
import HomeScreen from '@/components/HomeScreen';
import ProfileScreen from '@/components/ProfileScreen';
import ScheduleScreen from '@/components/ScheduleScreen';
import CalculatorScreen from '@/components/CalculatorScreen';
import CardScreen from '@/components/CardScreen';
import HistoryScreen from '@/components/HistoryScreen';
import NotificationsScreen from '@/components/NotificationsScreen';
import SupportScreen from '@/components/SupportScreen';
import CashbackScreen from '@/components/CashbackScreen';

type Page = 'home' | 'profile' | 'schedule' | 'calculator' | 'card' | 'history' | 'notifications' | 'support' | 'cashback';

const NAV_TABS: { id: Page; icon: string; label: string }[] = [
  { id: 'home', icon: 'Home', label: 'Главная' },
  { id: 'schedule', icon: 'CalendarDays', label: 'График' },
  { id: 'cashback', icon: 'Percent', label: 'Кэшбэк' },
  { id: 'card', icon: 'CreditCard', label: 'Карта' },
  { id: 'profile', icon: 'User', label: 'Профиль' },
];

const NAV_IDS = NAV_TABS.map(t => t.id);

export default function Index() {
  const [activePage, setActivePage] = useState<Page>('home');

  const navigate = (page: string) => setActivePage(page as Page);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomeScreen onNavigate={navigate} />;
      case 'profile': return <ProfileScreen />;
      case 'schedule': return <ScheduleScreen />;
      case 'calculator': return <CalculatorScreen />;
      case 'card': return <CardScreen />;
      case 'history': return <HistoryScreen />;
      case 'notifications': return <NotificationsScreen />;
      case 'support': return <SupportScreen />;
      case 'cashback': return <CashbackScreen />;
      default: return <HomeScreen onNavigate={navigate} />;
    }
  };

  const showBackButton = !NAV_IDS.includes(activePage);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto">
        {showBackButton && (
          <button
            onClick={() => navigate('home')}
            className="fixed top-4 left-4 z-50 w-9 h-9 bg-black/20 backdrop-blur rounded-full flex items-center justify-center"
          >
            <Icon name="ArrowLeft" size={18} className="text-white" />
          </button>
        )}
        {renderPage()}
      </div>

      <div
        className="flex-shrink-0 bg-white border-t border-border"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center">
          {NAV_TABS.map(tab => {
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all relative ${isActive ? 'tab-active' : ''}`}
              >
                <div className={`w-7 h-7 flex items-center justify-center rounded-xl transition-all ${isActive ? 'bg-gpb-blue' : ''}`}>
                  <Icon
                    name={tab.icon}
                    size={18}
                    className={isActive ? 'text-white' : 'text-muted-foreground'}
                    fallback="Circle"
                  />
                </div>
                <span className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-gpb-blue' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
