import { useState, useEffect } from 'react';
import { HABITS, DAYS_OF_WEEK } from '@/data/mockData';

interface HabitGridProps {
  selectedHabit: string | null;
}

export default function HabitGrid({ selectedHabit }: HabitGridProps) {
  const [animatedCells, setAnimatedCells] = useState<Set<string>>(new Set());
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // January 2026 starts on Thursday (4)
  const startDayOfWeek = 4;
  const daysInMonth = 31;

  const habits = selectedHabit
    ? HABITS.filter(h => h.id === selectedHabit)
    : HABITS;

  const getCellColor = (habitId: string, day: number): string => {
    const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
    const habit = HABITS.find(h => h.id === habitId);
    if (!habit) return '#111111';
    const completion = habit.completions[dateStr];
    if (completion === 1) return '#2F80FF';
    if (completion === 0.5) return '#2F80FF80';
    return '#111111';
  };

  const getCellOpacity = (habitId: string, day: number): number => {
    const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
    const habit = HABITS.find(h => h.id === habitId);
    if (!habit) return 1;
    const completion = habit.completions[dateStr];
    if (completion === 1) return 1;
    if (completion === 0.5) return 0.5;
    return 1;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const cells = new Set<string>();
      for (let day = 1; day <= daysInMonth; day++) {
        for (const habit of habits) {
          const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
          if (habit.completions[dateStr]) {
            cells.add(`${habit.id}-${day}`);
          }
        }
      }
      setAnimatedCells(cells);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedHabit]);

  return (
    <div className="flex-1 bg-[#111111] p-4 overflow-auto">
      <div className="mb-3">
        <h2 className="text-white text-sm font-semibold">
          {selectedHabit
            ? HABITS.find(h => h.id === selectedHabit)?.name
            : 'All Habits'}
          {' — January 2026'}
        </h2>
      </div>

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

        {/* Empty cells for days before month start */}
        {habits.map((habit, habitIndex) => (
          <div key={habit.id} className={`flex ${habitIndex < habits.length - 1 ? 'border-b border-[#444444]' : ''}`}>
            {/* Habit name cell */}
            <div className="w-36 border-r border-[#444444] px-3 py-2 flex items-center bg-[#111111]">
              <span className="text-xs text-white truncate">{habit.name}</span>
            </div>

            {/* Empty prefix cells */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="flex-1 border-r border-[#444444] last:border-r-0 bg-[#0a0a0a]" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, day) => {
              const cellKey = `${habit.id}-${day}`;
              const isAnimated = animatedCells.has(cellKey);
              const isHovered = hoveredCell === cellKey;
              const bgColor = getCellColor(habit.id, day + 1);
              const opacity = getCellOpacity(habit.id, day + 1);

              return (
                <div
                  key={day}
                  className="flex-1 border-r border-[#444444] last:border-r-0 transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: isHovered ? '#2F80FF4D' : bgColor,
                    opacity: isAnimated ? opacity : 0.3,
                    minHeight: '28px',
                  }}
                  onMouseEnter={() => setHoveredCell(cellKey)}
                  onMouseLeave={() => setHoveredCell(null)}
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
