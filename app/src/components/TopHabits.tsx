import { getHabitRankings } from '@/data/mockData';

export default function TopHabits() {
  const rankings = getHabitRankings();

  return (
    <div className="border border-[#444444] bg-[#111111] p-3">
      <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider mb-3">Top Habits</h3>
      <div className="space-y-1.5">
        {rankings.map((habit, index) => (
          <div key={habit.name} className="flex items-center gap-2">
            <span
              className={`text-xs font-bold w-4 text-right ${
                index < 3 ? 'text-[#2F80FF]' : 'text-[#444444]'
              }`}
            >
              {index + 1}
            </span>
            <span className="text-xs text-white flex-1 truncate">{habit.name}</span>
            <span className="text-[10px] text-[#CFCFCF]">{habit.completion}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
