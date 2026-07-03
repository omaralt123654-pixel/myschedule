import { useEffect, useState } from 'react';
import type { DayStats } from '@/types';

interface DailyProgressGraphProps {
  dayStats: DayStats[];
}

export default function DailyProgressGraph({ dayStats }: DailyProgressGraphProps) {
  const [animated, setAnimated] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [dayStats]);

  return (
    <div className="border-t border-[#444444] bg-[#111111] p-4">
      <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider mb-3">Daily Completion %</h3>
      <div className="flex items-end gap-[3px] h-24 relative">
        {dayStats.map((day) => (
          <div
            key={day.day}
            className="flex-1 flex flex-col items-center gap-1 relative"
            onMouseEnter={() => setHoveredDay(day.day)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            {hoveredDay === day.day && (
              <div className="absolute bottom-full mb-1 bg-[#444444] px-2 py-1 text-[10px] text-white whitespace-nowrap z-10">
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
