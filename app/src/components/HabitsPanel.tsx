import { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { dateKey } from '@/lib/dateUtils';
import type { Habit } from '@/types';

interface HabitsPanelProps {
  habits: Habit[];
  selectedHabit: string | null;
  onSelectHabit: (id: string | null) => void;
  onAddHabit: (name: string) => void;
  onDeleteHabit: (id: string) => void;
  onToggleToday: (habitId: string, date: string) => void;
}

export default function HabitsPanel({
  habits,
  selectedHabit,
  onSelectHabit,
  onAddHabit,
  onDeleteHabit,
  onToggleToday,
}: HabitsPanelProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  const now = new Date();
  const todayKey = dateKey(now.getFullYear(), now.getMonth(), now.getDate());

  const submitNewHabit = () => {
    if (newHabitName.trim()) {
      onAddHabit(newHabitName);
    }
    setNewHabitName('');
    setIsAdding(false);
  };

  return (
    <div className="w-[220px] border-r border-[#444444] bg-[#111111] flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#444444] flex items-center justify-between">
        <h2 className="text-white text-xs font-semibold uppercase tracking-wider">My Habits</h2>
        <button
          onClick={() => setIsAdding(true)}
          title="Add habit"
          className="w-5 h-5 flex items-center justify-center text-[#CFCFCF] hover:text-[#2F80FF] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {habits.length === 0 && !isAdding && (
          <div className="px-4 py-6 text-center text-[#666666] text-xs">
            No habits yet. Tap + to add one.
          </div>
        )}

        {habits.map(habit => {
          const isSelected = selectedHabit === habit.id;
          const isCheckedToday = (habit.completions[todayKey] || 0) >= 1;
          return (
            <div
              key={habit.id}
              onClick={() => onSelectHabit(isSelected ? null : habit.id)}
              className={`flex items-center justify-between px-4 py-2.5 border-b border-[#444444] cursor-pointer transition-all duration-150 group ${
                isSelected
                  ? 'border-l-[3px] border-l-[#2F80FF] bg-[#1a1a2e]'
                  : 'border-l-[3px] border-l-transparent hover:bg-[#1a1a1a]'
              }`}
            >
              <span className={`text-sm truncate ${isSelected ? 'text-[#2F80FF]' : 'text-white'}`}>
                {habit.name}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteHabit(habit.id);
                  }}
                  title="Delete habit"
                  className="w-4 h-4 flex items-center justify-center text-transparent group-hover:text-[#666666] hover:!text-[#ff5555] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleToday(habit.id, todayKey);
                  }}
                  title="Toggle today's completion"
                  className={`w-4 h-4 border flex items-center justify-center transition-all duration-150 ${
                    isCheckedToday
                      ? 'bg-[#2F80FF] border-[#2F80FF]'
                      : 'border-[#444444] group-hover:border-[#2F80FF]'
                  }`}
                >
                  {isCheckedToday && <Check className="w-3 h-3 text-white" />}
                </button>
              </div>
            </div>
          );
        })}

        {isAdding && (
          <div className="px-4 py-2.5 border-b border-[#444444] flex items-center gap-2">
            <input
              autoFocus
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitNewHabit();
                if (e.key === 'Escape') { setIsAdding(false); setNewHabitName(''); }
              }}
              onBlur={submitNewHabit}
              placeholder="New habit name"
              className="flex-1 bg-[#0a0a0a] border border-[#444444] text-white text-sm px-2 py-1 outline-none focus:border-[#2F80FF]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
