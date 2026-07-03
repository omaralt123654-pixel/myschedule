import { useEffect, useState } from 'react';
import { DAY_STATS } from '@/data/mockData';

export default function DailyProgressGraph() {
  const [animated, setAnimated] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border-t border-[#444444] bg-[#111111] p-4">
      <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider mb-3">Daily Completion %</h3>
      <div className="flex items-end gap-[3px] h-24">
        {DAY_STATS.map((day) => (
          <div
            key={day.day}
            className="flex-1 flex flex-col items-center gap-1"
            onMouseEnter={() => setHoveredDay(day.day)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            {/* Tooltip */}
            {hoveredDay === day.day && (
              <div className="absolute -mt-8 bg-[#444444] px-2 py-1 text-[10px] text-white animate-fade-in z-10">
                {day.progress}%
              </div>
            )}
            <div
              className="w-full transition-all duration-500 ease-out cursor-pointer"
              style={{
                height: animated ? `${day.progress}%` : '0%',
                backgroundColor: hoveredDay === day.day ? '#2F80FF' : '#FFFFFF',
                minHeight: day.progress > 0 ? '2px' : '0',
              }}
            />
            <span className="text-[8px] text-[#444444]">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
