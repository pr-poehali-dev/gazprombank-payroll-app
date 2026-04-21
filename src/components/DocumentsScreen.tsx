import { useState } from 'react';
import Icon from '@/components/ui/icon';

const documents = [
  {
    id: 1,
    category: 'Справки о доходах',
    items: [
      { id: 'ndfl-2025', icon: 'FileText', title: '2-НДФЛ за 2025 год', sub: 'Справка о доходах и налогах', date: '31 янв 2026', size: '124 КБ', ready: true },
      { id: 'ndfl-2024', icon: 'FileText', title: '2-НДФЛ за 2024 год', sub: 'Справка о доходах и налогах', date: '31 янв 2025', size: '118 КБ', ready: true },
      { id: 'bank-cert', icon: 'FileCheck', title: 'Справка для банка', sub: 'Подтверждение дохода', date: '15 апр 2026', size: '87 КБ', ready: true },
    ],
  },
  {
    id: 2,
    category: 'Расчётные листки',
    items: [
      { id: 'pay-mar', icon: 'Receipt', title: 'Расчётный листок', sub: 'Март 2026', date: '15 мар 2026', size: '43 КБ', ready: true },
      { id: 'pay-feb', icon: 'Receipt', title: 'Расчётный листок', sub: 'Февраль 2026', date: '15 фев 2026', size: '41 КБ', ready: true },
      { id: 'pay-jan', icon: 'Receipt', title: 'Расчётный листок', sub: 'Январь 2026', date: '15 янв 2026', size: '44 КБ', ready: true },
      { id: 'pay-dec', icon: 'Receipt', title: 'Расчётный листок', sub: 'Декабрь 2025', date: '15 дек 2025', size: '46 КБ', ready: true },
    ],
  },
  {
    id: 3,
    category: 'Трудовые документы',
    items: [
      { id: 'contract', icon: 'FileBadge', title: 'Трудовой договор', sub: '№ 2845 от 12.04.2022', date: '12 апр 2022', size: '312 КБ', ready: true },
      { id: 'vacation', icon: 'CalendarCheck', title: 'График отпусков', sub: '2026 год', date: '15 янв 2026', size: '56 КБ', ready: true },
      { id: 'order-hire', icon: 'FileSignature', title: 'Приказ о приёме', sub: '№ 845 от 12.04.2022', date: '12 апр 2022', size: '78 КБ', ready: true },
    ],
  },
];

export default function DocumentsScreen() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      setDownloaded(prev => new Set([...prev, id]));
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      <div className="gpb-gradient px-5 pt-14 pb-8">
        <h1 className="text-white text-xl font-bold mb-1">Документы</h1>
        <p className="text-blue-200 text-sm">Справки, расчётные листки и договоры</p>
      </div>

      <div className="px-5 -mt-4 pb-8 flex flex-col gap-4">
        {/* Request new document */}
        <div className="bg-card rounded-2xl gpb-card-shadow p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gpb-surface flex items-center justify-center flex-shrink-0">
            <Icon name="FilePlus" size={20} className="text-gpb-blue" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Заказать справку</p>
            <p className="text-xs text-muted-foreground">Любой документ готов за 3 рабочих дня</p>
          </div>
          <button className="bg-gpb-blue text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
            Заказать
          </button>
        </div>

        {documents.map(group => (
          <div key={group.id}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{group.category}</p>
            <div className="bg-card rounded-2xl gpb-card-shadow overflow-hidden">
              {group.items.map((doc, idx) => (
                <div
                  key={doc.id}
                  className={`flex items-center gap-3 px-4 py-3.5 ${idx < group.items.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gpb-surface flex items-center justify-center flex-shrink-0">
                    <Icon name={doc.icon} size={18} className="text-gpb-blue" fallback="FileText" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">{doc.sub} · {doc.size}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                      downloaded.has(doc.id)
                        ? 'bg-emerald-50'
                        : 'bg-gpb-surface hover:bg-gpb-blue hover:text-white'
                    }`}
                  >
                    {downloading === doc.id ? (
                      <Icon name="Loader" size={16} className="text-gpb-blue animate-spin" />
                    ) : downloaded.has(doc.id) ? (
                      <Icon name="Check" size={16} className="text-emerald-600" />
                    ) : (
                      <Icon name="Download" size={16} className="text-gpb-blue" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}