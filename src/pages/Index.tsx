import { useState } from 'react';
import Icon from '@/components/ui/icon';
import PinScreen from '@/components/PinScreen';
import HomeScreen from '@/components/HomeScreen';
import ProfileScreen from '@/components/ProfileScreen';
import ScheduleScreen from '@/components/ScheduleScreen';
import CalculatorScreen from '@/components/CalculatorScreen';
import CardScreen from '@/components/CardScreen';
import HistoryScreen from '@/components/HistoryScreen';
import NotificationsScreen from '@/components/NotificationsScreen';
import SupportScreen from '@/components/SupportScreen';
import CashbackScreen from '@/components/CashbackScreen';
import AiAssistantScreen from '@/components/AiAssistantScreen';
import DocumentsScreen from '@/components/DocumentsScreen';

type Page = 'home' | 'profile' | 'schedule' | 'calculator' | 'card' | 'history' | 'notifications' | 'support' | 'cashback' | 'ai' | 'documents';

const NAV_TABS: { id: Page; icon: string; label: string }[] = [
  { id: 'home', icon: 'Home', label: 'Главная' },
  { id: 'cashback', icon: 'Percent', label: 'Кэшбэк' },
  { id: 'ai', icon: 'Bot', label: 'ИИ' },
  { id: 'card', icon: 'CreditCard', label: 'Карта' },
  { id: 'profile', icon: 'User', label: 'Профиль' },
];

const NAV_IDS = NAV_TABS.map(t => t.id);

export default function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [activePage, setActivePage] = useState<Page>('home');

  const navigate = (page: string) => setActivePage(page as Page);

  if (!unlocked) {
    return <PinScreen onSuccess={() => setUnlocked(true)} />;
  }

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
      case 'ai': return <AiAssistantScreen />;
      case 'documents': return <DocumentsScreen />;
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
            className="fixed top-4 left-4 z-50 w-10 h-10 bg-black/25 backdrop-blur-md rounded-2xl flex items-center justify-center"
          >
            <Icon name="ArrowLeft" size={18} className="text-white" />
          </button>
        )}
        {renderPage()}
      </div>

      <div
        className="flex-shrink-0 bg-card/95 backdrop-blur-xl border-t border-border"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center px-2">
          {NAV_TABS.map(tab => {
            const isActive = activePage === tab.id;
            const isAi = tab.id === 'ai';
            return (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 pt-3 pb-2.5 transition-all relative ${isActive ? 'tab-active' : ''}`}
              >
                {isAi ? (
                  <div className="w-11 h-7 bg-gradient-to-br from-gpb-blue to-blue-400 rounded-xl flex items-center justify-center shadow-sm">
                    <Icon name="Bot" size={17} className="text-white" fallback="Circle" />
                  </div>
                ) : (
                  <div className={`w-10 h-7 flex items-center justify-center rounded-xl transition-all ${isActive ? 'bg-gpb-surface' : ''}`}>
                    <Icon
                      name={tab.icon}
                      size={19}
                      className={isActive ? 'text-gpb-blue' : 'text-muted-foreground'}
                      fallback="Circle"
                    />
                  </div>
                )}
                <span className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-gpb-blue' : isAi ? 'text-gpb-blue' : 'text-muted-foreground'}`}>
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