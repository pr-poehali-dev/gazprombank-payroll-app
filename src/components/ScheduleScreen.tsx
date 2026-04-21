import { useState } from 'react';
import Icon from '@/components/ui/icon';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// March 2026: starts on Sunday (idx 6)
const shifts: Record<number, string> = {
  2: 'day', 3: 'day', 4: 'night', 6: 'off',
  9: 'day', 10: 'day', 11: 'night', 13: 'off',
  16: 'day', 17: 'day', 18: 'night', 20: 'off',
  23: 'day', 24: 'day', 25: 'night', 27: 'off',
  30: 'day', 31: 'day',
};

const shiftConfig: Record<string, { label: string; color: string; bg: string; hours: number }> = {
  day: { label: 'Дневная', color: 'text-blue-700', bg: 'bg-blue-100', hours: 8 },
  night: { label: 'Ночная', color: 'text-indigo-700', bg: 'bg-indigo-100', hours: 12 },
  off: { label: 'Выходной', color: 'text-emerald-700', bg: 'bg-emerald-100', hours: 0 },
};

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<number | null>(27);
  const year = 2026;
  const month = 2; // March

  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const totalHours = Object.entries(shifts).reduce((acc, [, type]) => acc + (shiftConfig[type]?.hours || 0), 0);
  const dayShifts = Object.values(shifts).filter(s => s === 'day').length;
  const nightShifts = Object.values(shifts).filter(s => s === 'night').length;

  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-5 pt-14 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white text-xl font-bold">График смен</h1>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Icon name="ChevronLeft" size={16} className="text-white" />
            </button>
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Icon name="ChevronRight" size={16} className="text-white" />
            </button>
          </div>
        </div>
        <p className="text-blue-200 text-sm">{MONTHS[month]} {year}</p>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-4 mb-4">
        <div className="bg-card rounded-2xl gpb-card-shadow p-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xl font-bold text-foreground">{totalHours}</p>
            <p className="text-xs text-muted-foreground">Часов</p>
          </div>
          <div className="border-x border-border">
            <p className="text-xl font-bold text-foreground">{dayShifts}</p>
            <p className="text-xs text-muted-foreground">Дневных</p>
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">{nightShifts}</p>
            <p className="text-xs text-muted-foreground">Ночных</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-5 mb-4">
        <div className="bg-card rounded-2xl gpb-card-shadow p-4">
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;
              const shift = shifts[day];
              const cfg = shift ? shiftConfig[shift] : null;
              const isSelected = selectedDay === day;
              const isToday = day === 27;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  className={`
                    aspect-square rounded-xl flex flex-col items-center justify-center transition-all text-xs
                    ${isSelected ? 'bg-gpb-blue text-white ring-2 ring-gpb-blue ring-offset-1' : ''}
                    ${!isSelected && cfg ? `${cfg.bg} ${cfg.color}` : ''}
                    ${!isSelected && !cfg ? 'text-foreground hover:bg-gpb-surface' : ''}
                  `}
                >
                  <span className={`font-semibold ${isToday && !isSelected ? 'underline decoration-gpb-gold decoration-2' : ''}`}>{day}</span>
                  {cfg && <span className="text-[8px] mt-0.5 leading-none opacity-80">{cfg.hours > 0 ? `${cfg.hours}ч` : '⊘'}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-5 mb-4">
        <div className="bg-card rounded-2xl gpb-card-shadow p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Легенда</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(shiftConfig).map(([key, cfg]) => (
              <div key={key} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${cfg.bg}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${cfg.color.replace('text-', 'bg-')}`}></div>
                <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDay && shifts[selectedDay] && (
        <div className="px-5 mb-6 animate-scale-in">
          <div className="bg-card rounded-2xl gpb-card-shadow p-4 border-l-4 border-gpb-blue">
            <p className="text-xs font-semibold text-muted-foreground mb-2">{selectedDay} {MONTHS[month]}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">{shiftConfig[shifts[selectedDay]].label} смена</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {shifts[selectedDay] === 'day' ? '08:00 — 16:00' : shifts[selectedDay] === 'night' ? '20:00 — 08:00' : 'Нерабочий день'}
                </p>
              </div>
              <div className={`px-3 py-1.5 rounded-xl ${shiftConfig[shifts[selectedDay]].bg}`}>
                <span className={`text-sm font-bold ${shiftConfig[shifts[selectedDay]].color}`}>
                  {shiftConfig[shifts[selectedDay]].hours > 0 ? `${shiftConfig[shifts[selectedDay]].hours} ч` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}