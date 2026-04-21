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
  day: { label: 'Дневная', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', hours: 8 },
  night: { label: 'Ночная', color: 'text-indigo-700 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30', hours: 12 },
  off: { label: 'Выходной', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30', hours: 0 },
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

  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-4 pt-14 pb-10">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Расписание</p>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">График смен</h1>
            <p className="text-white/60 text-sm mt-0.5">{MONTHS[month]} {year}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-2xl glass-card flex items-center justify-center">
              <Icon name="ChevronLeft" size={16} className="text-white" />
            </button>
            <button className="w-9 h-9 rounded-2xl glass-card flex items-center justify-center">
              <Icon name="ChevronRight" size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats — pulled up */}
      <div className="px-4 -mt-5 mb-4">
        <div className="bg-card rounded-3xl gpb-card-shadow-md p-4 grid grid-cols-3 gap-1">
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Icon name="Clock" size={17} className="text-gpb-blue" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-foreground leading-tight">{totalHours}</p>
              <p className="text-xs text-muted-foreground">Часов</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 py-1 border-x border-border">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
              <Icon name="Sun" size={17} className="text-orange-500" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-foreground leading-tight">{dayShifts}</p>
              <p className="text-xs text-muted-foreground">Дневных</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
              <Icon name="Moon" size={17} className="text-indigo-500" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-foreground leading-tight">{nightShifts}</p>
              <p className="text-xs text-muted-foreground">Ночных</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-3xl gpb-card-shadow-md p-4">
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
      <div className="px-4 mb-4">
        <div className="bg-card rounded-3xl gpb-card-shadow-md p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">Легенда</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(shiftConfig).map(([key, cfg]) => (
              <div key={key} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${cfg.bg}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${cfg.color.replace('text-', 'bg-').split(' ')[0]}`}></div>
                <span className={`text-xs font-medium ${cfg.color.split(' ')[0]}`}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDay && shifts[selectedDay] && (
        <div className="px-4 mb-6 animate-scale-in">
          <div className="bg-card rounded-3xl gpb-card-shadow-md p-4 border-l-4 border-gpb-blue">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              {selectedDay} {MONTHS[month]}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">{shiftConfig[shifts[selectedDay]].label} смена</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {shifts[selectedDay] === 'day'
                    ? '08:00 — 16:00'
                    : shifts[selectedDay] === 'night'
                    ? '20:00 — 08:00'
                    : 'Нерабочий день'}
                </p>
              </div>
              <div className={`px-4 py-2 rounded-2xl ${shiftConfig[shifts[selectedDay]].bg}`}>
                <span className={`text-sm font-bold ${shiftConfig[shifts[selectedDay]].color.split(' ')[0]}`}>
                  {shiftConfig[shifts[selectedDay]].hours > 0
                    ? `${shiftConfig[shifts[selectedDay]].hours} ч`
                    : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
