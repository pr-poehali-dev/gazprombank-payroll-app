import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Props {
  onSuccess: () => void;
}

const CORRECT_PIN = '1234';

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', 'del'],
];

export default function PinScreen({ onSuccess }: Props) {
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        setTimeout(onSuccess, 200);
      } else {
        setShake(true);
        setError('Неверный PIN-код');
        setAttempts(a => a + 1);
        setTimeout(() => {
          setPin('');
          setShake(false);
          setError('');
        }, 700);
      }
    }
  }, [pin, onSuccess]);

  const press = (key: string) => {
    if (key === 'del') {
      setPin(p => p.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(p => p + key);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-background animate-fade-in">
      {/* Top */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16">
        {/* Logo */}
        <div className="w-20 h-20 rounded-3xl gpb-gradient flex items-center justify-center mb-7 gpb-card-shadow-md">
          <span className="text-white text-2xl font-black tracking-tight">ГПБ</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">Добро пожаловать</h1>
        <p className="text-muted-foreground text-sm mb-10">Артур Арменович</p>

        {/* Dots */}
        <div
          className={`flex items-center gap-5 mb-3 ${shake ? 'animate-[shake_0.5s_ease]' : ''}`}
          style={shake ? { animation: 'shake 0.5s ease' } : {}}
        >
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                i < pin.length
                  ? 'bg-gpb-blue scale-110 shadow-[0_0_10px_rgba(30,100,220,0.4)]'
                  : 'bg-transparent border-2 border-border'
              }`}
            />
          ))}
        </div>

        {error ? (
          <p className="text-red-500 text-xs font-semibold animate-fade-in mt-1">{error}</p>
        ) : (
          <p className="text-muted-foreground text-xs mt-1">Введите PIN-код</p>
        )}

        {attempts >= 3 && !error && (
          <button className="mt-4 flex items-center gap-1.5 text-gpb-blue text-xs font-semibold bg-gpb-surface px-3 py-2 rounded-xl">
            <Icon name="Fingerprint" size={14} />
            Войти по биометрии
          </button>
        )}
      </div>

      {/* Keypad */}
      <div className="w-full px-8 pb-14">
        <div className="flex justify-center mb-5">
          <button className="flex items-center gap-2 text-muted-foreground bg-gpb-surface px-4 py-2 rounded-2xl">
            <Icon name="Fingerprint" size={18} className="text-gpb-blue" fallback="Shield" />
            <span className="text-xs text-gpb-blue font-semibold">Войти по биометрии</span>
          </button>
        </div>

        <div className="space-y-3">
          {KEYS.map((row, ri) => (
            <div key={ri} className="grid grid-cols-3 gap-3">
              {row.map((key, ki) => {
                if (key === '') return <div key={ki} />;
                return (
                  <button
                    key={ki}
                    onClick={() => press(key)}
                    className={`
                      h-16 rounded-3xl text-xl font-bold transition-all active:scale-95
                      ${key === 'del'
                        ? 'flex items-center justify-center text-muted-foreground'
                        : 'bg-card gpb-card-shadow text-foreground hover:bg-gpb-surface'
                      }
                    `}
                  >
                    {key === 'del'
                      ? <Icon name="Delete" size={22} className="text-muted-foreground" fallback="X" />
                      : key
                    }
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 opacity-60">
          Подсказка: PIN-код <span className="font-mono font-bold tracking-widest">1234</span>
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
