import { useEffect, useState } from 'react';
import { DAYS_OF_WEEK, MONTHS } from '@/lib/stats';
import { dateKey, getDaysInMonth, getFirstWeekday, isSameDay } from '@/lib/dateUtils';
import type { Habit } from '@/types';

interface HabitGridProps {
  habits: Habit[];
  selectedHabit: string | null;
  year: number;
  month: number;
  onCellClick: (habitId: string, date: string) => void;
}

export default function HabitGrid({ habits, selectedHabit, year, month, onCellClick }: HabitGridProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  const startDayOfWeek = getFirstWeekday(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const today = new Date();

  const visibleHabits = selectedHabit ? habits.filter(h => h.id === selectedHabit) : habits;

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 60);
    return () => clearTimeout(timer);
  }, [year, month]);

  const getCompletion = (habit: Habit, day: number): number => {
    return habit.completions[dateKey(year, month, day)] || 0;
  };

  const getCellColor = (completion: number): string => {
    if (completion === 1) return '#2F80FF';
    if (completion === 0.5) return '#2F80FF80';
    return '#111111';
  };

  return (
    <div className="flex-1 bg-[#111111] p-4 overflow-auto">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-white text-sm font-semibold">
          {selectedHabit ? habits.find(h => h.id === selectedHabit)?.name : 'All Habits'}
          {` — ${MONTHS[month]} ${year}`}
        </h2>
        <span className="text-[10px] text-[#666666]">Click a cell to cycle: empty → half → done</span>
      </div>

      {visibleHabits.length === 0 ? (
        <div className="text-[#666666] text-sm py-8 text-center">
          Add a habit from the left panel to start tracking.
        </div>
      ) : (
        <div className="border border-[#444444]">
          {/* Header row */}
          <div className="flex border-b border-[#444444]">
            <div className="w-36 border-r border-[#444444] bg-[#1a1a1a]" />
            {DAYS_OF_WEEK.map(day => (
              <div
                key={day}
                className="flex-1 text-center py-1.5 text-[10px] text-[#CFCFCF] uppercase tracking-wider border-r border-[#444444] last:border-r-0 bg-[#1a1a1a]"
              >
                {day}
              </div>
            ))}
          </div>

          {visibleHabits.map((habit, habitIndex) => (
            <div key={habit.id} className={`flex ${habitIndex < visibleHabits.length - 1 ? 'border-b border-[#444444]' : ''}`}>
              {/* Habit name cell */}
              <div className="w-36 border-r border-[#444444] px-3 py-2 flex items-center bg-[#111111]">
                <span className="text-xs text-white truncate">{habit.name}</span>
              </div>

              {/* Empty prefix cells */}
              {Array.from({ length: startDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1 border-r border-[#444444] last:border-r-0 bg-[#0a0a0a]" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const cellKey = `${habit.id}-${day}`;
                const isHovered = hoveredCell === cellKey;
                const completion = getCompletion(habit, day);
                const bgColor = getCellColor(completion);
                const isToday = isSameDay(year, month, day, today);

                return (
                  <div
                    key={day}
                    onClick={() => onCellClick(habit.id, dateKey(year, month, day))}
                    className={`flex-1 border-r border-[#444444] last:border-r-0 transition-all duration-200 cursor-pointer ${
                      isToday ? 'ring-1 ring-inset ring-[#2F80FF]' : ''
                    }`}
                    style={{
                      backgroundColor: isHovered ? '#2F80FF4D' : bgColor,
                      opacity: animate ? 1 : 0.3,
                      minHeight: '28px',
                    }}
                    onMouseEnter={() => setHoveredCell(cellKey)}
                    onMouseLeave={() => setHoveredCell(null)}
                    title={`Day ${day}: ${completion === 1 ? 'Done' : completion === 0.5 ? 'Half' : 'Missed'}`}
                  />
                );
              })}

              {/* Empty suffix cells to fill the week */}
              {Array.from({ length: (7 - ((startDayOfWeek + daysInMonth) % 7)) % 7 }).map((_, i) => (
                <div key={`suffix-${i}`} className="flex-1 border-r border-[#444444] last:border-r-0 bg-[#0a0a0a]" />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#2F80FF]" />
          <span className="text-[10px] text-[#CFCFCF]">Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#2F80FF80]" />
          <span className="text-[10px] text-[#CFCFCF]">Partial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 border border-[#444444] bg-[#111111]" />
          <span className="text-[10px] text-[#CFCFCF]">Missed</span>
        </div>
      </div>
    </div>
  );
}
