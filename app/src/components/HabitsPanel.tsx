import { useState } from 'react';
import { Check } from 'lucide-react';
import { HABITS } from '@/data/mockData';

interface HabitsPanelProps {
  selectedHabit: string | null;
  onSelectHabit: (id: string | null) => void;
}

export default function HabitsPanel({ selectedHabit, onSelectHabit }: HabitsPanelProps) {
  const [checkedHabits, setCheckedHabits] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedHabits(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-[220px] border-r border-[#444444] bg-[#111111] flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[#444444]">
        <h2 className="text-white text-xs font-semibold uppercase tracking-wider">My Habits</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {HABITS.map(habit => {
          const isSelected = selectedHabit === habit.id;
          const isChecked = checkedHabits[habit.id];
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
              <span className={`text-sm ${isSelected ? 'text-[#2F80FF]' : 'text-white'}`}>
                {habit.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCheck(habit.id);
                }}
                className={`w-4 h-4 border flex items-center justify-center transition-all duration-150 ${
                  isChecked
                    ? 'bg-[#2F80FF] border-[#2F80FF]'
                    : 'border-[#444444] group-hover:border-[#2F80FF]'
                }`}
              >
                {isChecked && <Check className="w-3 h-3 text-white" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
