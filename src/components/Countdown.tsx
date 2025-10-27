
import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return <div className="text-center font-bold text-xl text-red-400">Die Aktion ist beendet!</div>;
  }

  const timeParts = [
    { label: 'Tage', value: days },
    { label: 'Stunden', value: hours },
    { label: 'Minuten', value: minutes },
    { label: 'Sekunden', value: seconds },
  ];

  return (
    <div>
      <p className="text-center text-lg font-medium mb-4">Nur noch für kurze Zeit:</p>
      <div className="flex justify-center items-center space-x-2 md:space-x-4">
        {timeParts.map((part, index) => (
          <React.Fragment key={part.label}>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold tracking-tighter">
                {String(part.value).padStart(2, '0')}
              </div>
              <div className="text-xs md:text-sm uppercase text-slate-300">{part.label}</div>
            </div>
            {index < timeParts.length - 1 && <div className="text-3xl md:text-5xl font-bold">:</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
