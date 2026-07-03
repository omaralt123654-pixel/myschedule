import { useEffect, useState } from 'react';
import type { WeekStats } from '@/types';

interface WeeklyProgressProps {
  weekStats: WeekStats[];
}

export default function WeeklyProgress({ weekStats }: WeeklyProgressProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, [weekStats]);

  const maxCompleted = Math.max(1, ...weekStats.map(w => w.completed));

  return (
    <div className="border border-[#444444] bg-[#111111] p-3">
      <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider mb-3">Weekly Progress</h3>
      <div className="space-y-2">
        {weekStats.map(week => {
          const percentage = (week.completed / maxCompleted) * 100;
          return (
            <div key={week.week} className="flex items-center gap-2">
              <span className="text-[10px] text-[#CFCFCF] w-12">Week {week.week}</span>
              <div className="flex-1 h-3 bg-[#444444] relative overflow-hidden">
                <div
                  className="h-full bg-[#2F80FF] transition-all duration-500 ease-out"
                  style={{ width: animated ? `${percentage}%` : '0%' }}
                />
              </div>
              <span className="text-[10px] text-white w-6 text-right">{week.completed}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
