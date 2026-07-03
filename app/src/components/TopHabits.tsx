interface TopHabitsProps {
  rankings: { id: string; name: string; completion: number }[];
}

export default function TopHabits({ rankings }: TopHabitsProps) {
  return (
    <div className="border border-[#444444] bg-[#111111] p-3">
      <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider mb-3">Top Habits</h3>
      {rankings.length === 0 ? (
        <p className="text-[10px] text-[#666666]">No habits yet.</p>
      ) : (
        <div className="space-y-1.5">
          {rankings.map((habit, index) => (
            <div key={habit.id} className="flex items-center gap-2">
              <span className={`text-xs font-bold w-4 text-right ${index < 3 ? 'text-[#2F80FF]' : 'text-[#444444]'}`}>
                {index + 1}
              </span>
              <span className="text-xs text-white flex-1 truncate">{habit.name}</span>
              <span className="text-[10px] text-[#CFCFCF]">{habit.completion}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
