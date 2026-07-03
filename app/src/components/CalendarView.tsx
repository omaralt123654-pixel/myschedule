import { useState } from 'react';
import { HABITS, DAYS_OF_WEEK } from '@/data/mockData';

export default function CalendarView() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // January 2026 starts on Thursday (4)
  const startDayOfWeek = 4;
  const daysInMonth = 31;

  const getDayCompletion = (day: number): number => {
    const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
    let total = 0;
    let completed = 0;
    HABITS.forEach(habit => {
      total += 1;
      completed += habit.completions[dateStr] || 0;
    });
    return total > 0 ? completed / total : 0;
  };

  const hasAnyCompletion = (day: number): boolean => {
    return getDayCompletion(day) > 0;
  };

  const isFullyCompleted = (day: number): boolean => {
    return getDayCompletion(day) === 1;
  };

  return (
    <div className="flex-1 bg-[#111111] p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-white text-sm font-semibold mb-4">January 2026</h2>

        <div className="border border-[#444444]">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-[#444444]">
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="text-center py-2 text-[10px] text-[#CFCFCF] uppercase tracking-wider bg-[#1a1a1a]">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {/* Empty cells before month start */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square border-r border-b border-[#444444] bg-[#0a0a0a]" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, day) => {
              const dayNum = day + 1;
              const isSelected = selectedDay === dayNum;
              const isToday = dayNum === 4; // Mock "today" as the 4th
              const completed = hasAnyCompletion(dayNum);
              const fullyDone = isFullyCompleted(dayNum);

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDay(isSelected ? null : dayNum)}
                  className={`aspect-square border-r border-b border-[#444444] flex flex-col items-center justify-center cursor-pointer transition-all duration-150 relative ${
                    isSelected
                      ? 'bg-[#2F80FF]'
                      : 'hover:bg-[#1a1a1a]'
                  } ${isToday && !isSelected ? 'border-[#2F80FF]' : ''}`}
                >
                  <span className={`text-sm ${isSelected ? 'text-white font-bold' : 'text-white'}`}>
                    {dayNum}
                  </span>
                  {completed && !isSelected && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        fullyDone ? 'bg-[#2F80FF]' : 'bg-[#2F80FF80]'
                      }`}
                    />
                  )}
                </div>
              );
            })}

            {/* Empty cells after month end */}
            {Array.from({ length: (7 - ((startDayOfWeek + daysInMonth) % 7)) % 7 }).map((_, i) => (
              <div key={`suffix-${i}`} className="aspect-square border-r border-b border-[#444444] bg-[#0a0a0a]" />
            ))}
          </div>
        </div>

        {/* Selected day details */}
        {selectedDay && (
          <div className="mt-4 border border-[#444444] bg-[#111111] p-4 animate-fade-slide-up">
            <h3 className="text-white text-sm font-semibold mb-3">January {selectedDay}, 2026</h3>
            <div className="space-y-2">
              {HABITS.map(habit => {
                const dateStr = `2026-01-${selectedDay.toString().padStart(2, '0')}`;
                const completion = habit.completions[dateStr] || 0;
                return (
                  <div key={habit.id} className="flex items-center justify-between">
                    <span className="text-xs text-white">{habit.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-[#444444] overflow-hidden">
                        <div
                          className="h-full bg-[#2F80FF] transition-all duration-300"
                          style={{ width: `${completion * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#CFCFCF] w-8 text-right">
                        {completion === 1 ? 'Done' : completion === 0.5 ? 'Half' : '—'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
