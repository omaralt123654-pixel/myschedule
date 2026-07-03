import { useState } from 'react';
import { DAYS_OF_WEEK, MONTHS } from '@/lib/stats';
import { dateKey, getDaysInMonth, getFirstWeekday, isSameDay } from '@/lib/dateUtils';
import type { Habit } from '@/types';

interface CalendarViewProps {
  habits: Habit[];
  year: number;
  month: number;
  onCycleCompletion: (habitId: string, date: string) => void;
}

export default function CalendarView({ habits, year, month, onCycleCompletion }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const startDayOfWeek = getFirstWeekday(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const today = new Date();

  const getDayCompletion = (day: number): number => {
    if (habits.length === 0) return 0;
    const key = dateKey(year, month, day);
    let completed = 0;
    habits.forEach(habit => {
      completed += habit.completions[key] || 0;
    });
    return completed / habits.length;
  };

  return (
    <div className="flex-1 bg-[#111111] p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-white text-sm font-semibold mb-4">{MONTHS[month]} {year}</h2>

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
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square border-r border-b border-[#444444] bg-[#0a0a0a]" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected = selectedDay === dayNum;
              const isToday = isSameDay(year, month, dayNum, today);
              const completion = getDayCompletion(dayNum);
              const hasAny = completion > 0;
              const fullyDone = completion === 1;

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDay(isSelected ? null : dayNum)}
                  className={`aspect-square border-r border-b border-[#444444] flex flex-col items-center justify-center cursor-pointer transition-all duration-150 relative ${
                    isSelected ? 'bg-[#2F80FF]' : 'hover:bg-[#1a1a1a]'
                  } ${isToday && !isSelected ? 'border-[#2F80FF]' : ''}`}
                >
                  <span className={`text-sm ${isSelected ? 'text-white font-bold' : 'text-white'}`}>
                    {dayNum}
                  </span>
                  {hasAny && !isSelected && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${fullyDone ? 'bg-[#2F80FF]' : 'bg-[#2F80FF80]'}`}
                    />
                  )}
                </div>
              );
            })}

            {Array.from({ length: (7 - ((startDayOfWeek + daysInMonth) % 7)) % 7 }).map((_, i) => (
              <div key={`suffix-${i}`} className="aspect-square border-r border-b border-[#444444] bg-[#0a0a0a]" />
            ))}
          </div>
        </div>

        {/* Selected day details */}
        {selectedDay && (
          <div className="mt-4 border border-[#444444] bg-[#111111] p-4 animate-fade-slide-up">
            <h3 className="text-white text-sm font-semibold mb-3">{MONTHS[month]} {selectedDay}, {year}</h3>
            {habits.length === 0 ? (
              <p className="text-xs text-[#666666]">No habits yet — add one from the left panel.</p>
            ) : (
              <div className="space-y-2">
                {habits.map(habit => {
                  const key = dateKey(year, month, selectedDay);
                  const completion = habit.completions[key] || 0;
                  return (
                    <div
                      key={habit.id}
                      onClick={() => onCycleCompletion(habit.id, key)}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <span className="text-xs text-white group-hover:text-[#2F80FF] transition-colors">{habit.name}</span>
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
                <p className="text-[10px] text-[#666666] pt-1">Tap a habit to cycle its status for this day.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
