import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';

const DEDUCTION_STANDARD = 1400; // standard child deduction

export default function CalculatorScreen() {
  const [grossSalary, setGrossSalary] = useState('100000');
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenCount, setChildrenCount] = useState(1);
  const [hasMedInsurance, setHasMedInsurance] = useState(false);
  const [pensionExtra, setPensionExtra] = useState('0');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calc = useMemo(() => {
    const gross = parseFloat(grossSalary) || 0;
    const children = hasChildren ? childrenCount : 0;
    const childDeduction = children * DEDUCTION_STANDARD;
    const medDeduction = hasMedInsurance ? 15000 : 0;

    const taxBase = Math.max(0, gross - childDeduction - medDeduction);
    const ndfl = Math.round(taxBase * 0.13);
    const pfr = Math.round(gross * 0.22); // employer: pension
    const oms = Math.round(gross * 0.051); // employer: med
    const fss = Math.round(gross * 0.029); // employer: social

    const pensionExtraVal = parseFloat(pensionExtra) || 0;
    const totalDeductions = ndfl + pensionExtraVal;
    const net = Math.round(gross - totalDeductions);
    const totalEmployerCost = gross + pfr + oms + fss;

    return { gross, ndfl, pfr, oms, fss, childDeduction, medDeduction, taxBase, pensionExtraVal, totalDeductions, net, totalEmployerCost };
  }, [grossSalary, hasChildren, childrenCount, hasMedInsurance, pensionExtra]);

  const fmt = (n: number) => n.toLocaleString('ru-RU');

  return (
    <div className="flex flex-col min-h-full animate-fade-in">
      {/* Header */}
      <div className="gpb-gradient px-4 pt-14 pb-10">
        <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Инструменты</p>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-0.5">Калькулятор зарплаты</h1>
        <p className="text-white/60 text-sm">Расчёт с учётом налогов и удержаний</p>
      </div>

      {/* Salary input — pulled up */}
      <div className="px-4 -mt-5 mb-4">
        <div className="bg-card rounded-3xl gpb-card-shadow-md p-4">
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-widest">
            Оклад до вычета налогов
          </label>
          <div className="relative">
            <input
              type="number"
              value={grossSalary}
              onChange={e => setGrossSalary(e.target.value)}
              className="w-full text-2xl font-bold text-foreground bg-gpb-surface rounded-2xl px-4 py-3 pr-10 border border-transparent focus:border-gpb-blue focus:outline-none transition-colors"
              placeholder="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground font-bold">₽</span>
          </div>
        </div>
      </div>

      {/* Result card */}
      <div className="px-4 mb-4">
        <div className="gpb-gradient rounded-3xl p-5">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">К выдаче на руки</p>
          <p className="text-white text-4xl font-black tracking-tight">
            {fmt(calc.net)} <span className="text-2xl font-bold">₽</span>
          </p>
          <div className="mt-4 flex items-stretch gap-2">
            <div className="flex-1 glass-card rounded-2xl px-3 py-2.5 text-center">
              <p className="text-white/60 text-xs mb-0.5">НДФЛ</p>
              <p className="text-white font-semibold text-sm">−{fmt(calc.ndfl)} ₽</p>
            </div>
            {calc.pensionExtraVal > 0 && (
              <div className="flex-1 glass-card rounded-2xl px-3 py-2.5 text-center">
                <p className="text-white/60 text-xs mb-0.5">Доп. пенсия</p>
                <p className="text-white font-semibold text-sm">−{fmt(calc.pensionExtraVal)} ₽</p>
              </div>
            )}
            <div className="flex-1 rounded-2xl px-3 py-2.5 text-center bg-gpb-gold/20 border border-gpb-gold/30">
              <p className="text-gpb-gold-light text-xs mb-0.5">Удержания</p>
              <p className="text-white font-semibold text-sm">−{fmt(calc.totalDeductions)} ₽</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deductions & toggles */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-3xl gpb-card-shadow-md overflow-hidden">
          <div className="px-4 py-3.5 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Вычеты и удержания</p>
          </div>

          {/* Children */}
          <div className="px-4 py-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
                <Icon name="Baby" size={17} className="text-violet-500" fallback="Users" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Вычет на детей</p>
                {hasChildren && (
                  <p className="text-xs text-muted-foreground">−{fmt(calc.childDeduction)} ₽/мес с налог. базы</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setHasChildren(!hasChildren)}
              className={`w-14 h-7 rounded-full transition-colors relative flex-shrink-0 ${hasChildren ? 'bg-gpb-blue' : 'bg-border'}`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  hasChildren ? 'translate-x-8' : 'translate-x-1'
                }`}
              ></div>
            </button>
          </div>

          {hasChildren && (
            <div className="px-4 py-3.5 border-b border-border bg-gpb-surface flex items-center justify-between">
              <span className="text-sm text-foreground">Количество детей</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setChildrenCount(Math.max(1, childrenCount - 1))}
                  className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="text-base font-bold w-4 text-center">{childrenCount}</span>
                <button
                  onClick={() => setChildrenCount(Math.min(5, childrenCount + 1))}
                  className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Medical insurance */}
          <div className="px-4 py-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <Icon name="Heart" size={17} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">ДМС вычет</p>
                {hasMedInsurance && (
                  <p className="text-xs text-muted-foreground">−15 000 ₽/год с налог. базы</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setHasMedInsurance(!hasMedInsurance)}
              className={`w-14 h-7 rounded-full transition-colors relative flex-shrink-0 ${hasMedInsurance ? 'bg-gpb-blue' : 'bg-border'}`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  hasMedInsurance ? 'translate-x-8' : 'translate-x-1'
                }`}
              ></div>
            </button>
          </div>

          {/* Extra pension */}
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Icon name="PiggyBank" size={17} className="text-emerald-600 dark:text-emerald-400" fallback="Wallet" />
              </div>
              <p className="text-sm font-medium text-foreground">Доп. пенсионные взносы</p>
            </div>
            <div className="relative">
              <input
                type="number"
                value={pensionExtra}
                onChange={e => setPensionExtra(e.target.value)}
                className="w-full bg-gpb-surface rounded-2xl px-4 py-2.5 pr-8 text-sm font-semibold text-foreground border border-transparent focus:border-gpb-blue focus:outline-none transition-colors"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₽</span>
            </div>
          </div>
        </div>
      </div>

      {/* Employer burden */}
      <div className="px-4 mb-6">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className={`w-full bg-card gpb-card-shadow-md p-4 flex items-center justify-between transition-all ${
            showBreakdown ? 'rounded-t-3xl rounded-b-none' : 'rounded-3xl'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
              <Icon name="Building2" size={17} className="text-orange-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Страховые взносы работодателя</p>
              <p className="text-xs text-muted-foreground">{fmt(calc.pfr + calc.oms + calc.fss)} ₽ / месяц</p>
            </div>
          </div>
          <Icon name={showBreakdown ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-muted-foreground" />
        </button>
        {showBreakdown && (
          <div className="bg-card rounded-b-3xl border-t border-border px-4 pb-4 animate-fade-in gpb-card-shadow-md">
            {[
              { label: 'Пенсионный фонд (ПФР)', val: calc.pfr, pct: '22%' },
              { label: 'Медицинское страхование (ОМС)', val: calc.oms, pct: '5.1%' },
              { label: 'Соц. страхование (ФСС)', val: calc.fss, pct: '2.9%' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.pct} от оклада</p>
                </div>
                <span className="text-sm font-semibold text-red-500">−{fmt(item.val)} ₽</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 mt-1">
              <p className="text-sm font-bold text-foreground">Итого расход работодателя</p>
              <p className="text-sm font-bold text-gpb-blue">{fmt(calc.totalEmployerCost)} ₽</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
