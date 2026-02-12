import React from 'react';

const CountdownItem = ({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl md:text-6xl font-bold mb-2 tabular-nums">
      {value.toString().padStart(label === 'Days' ? 3 : 2, '0')}
    </div>
    <div className="text-sm md:text-base text-white/70 uppercase tracking-wider">
      {label}
    </div>
  </div>
);

const Countdown = ({ timeLeft }) => {
  return (
    <div className="flex gap-6 md:gap-12 text-white animate-fade-in-delay">
      <CountdownItem value={timeLeft.days} label="Days" />
      <CountdownItem value={timeLeft.hours} label="Hours" />
      <CountdownItem value={timeLeft.minutes} label="Mins" />
      <CountdownItem value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
