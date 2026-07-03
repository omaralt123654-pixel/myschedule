import { useEffect, useState } from 'react';
import { WEEK_STATS } from '@/data/mockData';

export default function WeeklyProgress() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const maxCompleted = Math.max(...WEEK_STATS.map(w => w.completed));

  return (
    <div className="border border-[#444444] bg-[#111111] p-3">
      <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider mb-3">Weekly Progress</h3>
      <div className="space-y-2">
        {WEEK_STATS.map(week => {
          const percentage = maxCompleted > 0 ? (week.completed / maxCompleted) * 100 : 0;
          return (
            <div key={week.week} className="flex items-center gap-2">
              <span className="text-[10px] text-[#CFCFCF] w-12">Week {week.week}</span>
              <div className="flex-1 h-3 bg-[#444444] relative overflow-hidden">
                <div
                  className="h-full bg-[#2F80FF] transition-all duration-500 ease-out"
                  style={{
                    width: animated ? `${percentage}%` : '0%',
                  }}
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
